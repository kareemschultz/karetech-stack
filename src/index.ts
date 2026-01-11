#!/usr/bin/env bun

/**
 * create-karetech-stack
 * Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps built-in
 */

import { intro, outro, text, select, spinner, isCancel, cancel } from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

// Import our enhanced systems
import { ProjectConfig, CliOptions } from './types';
import { validateProjectName, validateDescription, validateAuthor, validateFullConfig, getValidationContext, generateTrackingRecommendations } from './validation';
import { exportConfig, importConfig, getDefaultConfigPath } from './config';
import { runEnvironmentCheck, printEnvironmentReport } from './utils/environment';
import { runEnhancedWizard } from './wizard';
import { generateBaseProject } from './generators/base';
import { generateTestingFramework } from './generators/testing';
import { generateDevOpsInfrastructure } from './generators/devops';
import { generatePBSTemplates } from './generators/pbs';
import { generateClaudeCodeConfiguration } from './generators/claude-code';
import { generateMcpConfiguration } from './generators/mcp';
import { generatePresetSystem } from './generators/presets';
import { presets } from './presets';

const VERSION = '0.0.1';

// Enhanced validation functions (using our validation system)
function validateProjectNamePrompt(value: string): string | void {
  const errors = validateProjectName(value);
  const criticalError = errors.find(e => e.severity === 'error');
  return criticalError ? criticalError.message : undefined;
}

function validateDescriptionPrompt(value: string): string | void {
  const errors = validateDescription(value);
  const criticalError = errors.find(e => e.severity === 'error');
  return criticalError ? criticalError.message : undefined;
}

function validateAuthorPrompt(value: string): string | void {
  const errors = validateAuthor(value);
  const criticalError = errors.find(e => e.severity === 'error');
  return criticalError ? criticalError.message : undefined;
}

// Configuration interfaces are now imported from ./types
// Presets are now imported from ./presets module

// CLI setup
const program = new Command()
  .name('create-karetech-stack')
  .description('Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps')
  .version(VERSION);

// Main command for creating projects
program
  .command('create [project-name]', { isDefault: true })
  .description('Create a new project')
  .option('--preset <preset>', 'Use a preset (saas, ecommerce, blog, devtool, portfolio, minimal)')
  .option('--theme <style>', 'Theme style (vega, nova, maia, lyra, mira)')
  .option('--color <color>', 'Accent color')
  .option('--config <path>', 'Load configuration from file')
  .option('--no-git', 'Skip git initialization')
  .option('--no-install', 'Skip dependency installation')
  .action(async (projectName, options) => {
    await createProject(projectName, options);
  });

// Environment check command
program
  .command('check-env')
  .description('Check development environment setup')
  .action(() => {
    const report = runEnvironmentCheck();
    printEnvironmentReport(report);
    process.exit(report.overall === 'fail' ? 1 : 0);
  });

// Config export command
program
  .command('export-config <project-name>')
  .description('Export current configuration to file')
  .option('--format <format>', 'Export format (json, yaml)', 'json')
  .option('--output <path>', 'Output file path')
  .action((projectName) => {
    console.log(`Config export functionality coming soon for ${projectName}`);
  });

program.parse();

async function createProject(projectName: string | undefined, options: CliOptions) {
  // Enhanced TTY and non-interactive detection
  const hasStdoutTty = process.stdout.isTTY || false;
  const hasStdinTty = process.stdin.isTTY || false;
  const isCI = process.env.CI === 'true' || process.env.NODE_ENV === 'test';
  const hasRequiredOptions = options.preset && projectName;
  
  const isNonInteractive = isCI || !hasStdoutTty || !hasStdinTty || 
    (hasRequiredOptions && (options.install === false || options.git === false));

  if (!isNonInteractive) {
    console.clear();
    intro(pc.bgCyan(pc.black(' create-karetech-stack ')));
  } else {
    console.log(pc.cyan('create-karetech-stack'));
  }

  // Initialize configuration
  const config: Partial<ProjectConfig> = {};

  // Check for preset first
  if (options.preset) {
    const preset = presets[options.preset as keyof typeof presets];
    if (preset) {
      console.log(pc.dim(`Using ${options.preset} preset: ${preset.description}`));
      Object.assign(config, preset);
    } else {
      console.log(pc.red(`Unknown preset: ${options.preset}`));
      process.exit(1);
    }
  }

  // Load config from file if specified
  let baseConfig: Partial<ProjectConfig> = {};
  if (options.config && existsSync(options.config)) {
    try {
      baseConfig = importConfig(options.config);
      console.log(pc.green(`✓ Loaded configuration from ${options.config}`));
    } catch (error) {
      console.log(pc.red(`Failed to load config: ${error}`));
      process.exit(1);
    }
  }

  // Step 1: Project Info
  let finalProjectName: string;
  if (projectName) {
    finalProjectName = projectName;
  } else if (isNonInteractive) {
    // Non-interactive mode: use default or config value
    finalProjectName = baseConfig.projectName || 'my-karetech-app';
    console.log(pc.dim(`Using project name: ${finalProjectName}`));
  } else {
    const namePrompt = await text({
      message: 'What is your project name?',
      placeholder: 'my-awesome-app',
      initialValue: baseConfig.projectName,
      validate: validateProjectNamePrompt,
    });

    if (isCancel(namePrompt)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    finalProjectName = namePrompt as string;
  }

  config.projectName = finalProjectName;

  if (!options.preset) {
    if (isNonInteractive) {
      // Non-interactive mode: use minimal preset by default
      const defaultPreset = 'minimal';
      const selectedPreset = presets[defaultPreset];
      Object.assign(config, selectedPreset);
      console.log(pc.dim(`Using default preset: ${defaultPreset}`));
      console.log(pc.dim(`  ${selectedPreset.description}`));
    } else {
      console.log(pc.dim('\n🚀 Choose a preset to quick-start your project, or customize everything yourself:'));

      // Generate preset options dynamically from preset system
      const presetOptions = [
        {
          value: 'saas',
          label: '🏢 SaaS Starter',
          hint: `${presets.saas.database} • Full Auth • Docker • CI/CD • ${presets.saas.pbsLevel?.toUpperCase() || 'FULL'} PBS`
        },
        {
          value: 'ecommerce',
          label: '🛒 E-commerce',
          hint: `${presets.ecommerce.database} • Stripe • Full Testing • Complete DevOps`
        },
        {
          value: 'blog',
          label: '📝 Blog/Publishing',
          hint: `${presets.blog.database} • Content-optimized • ${presets.blog.deployTarget} Deploy`
        },
        {
          value: 'devtool',
          label: '🔧 Developer Tool',
          hint: `${presets.devtool.database} • GitHub Auth • Testing Focus`
        },
        {
          value: 'portfolio',
          label: '👤 Portfolio',
          hint: `${presets.portfolio.database} • Minimal • Personal Sites`
        },
        {
          value: 'minimal',
          label: '⚡ Minimal',
          hint: `${presets.minimal.database} • Basic Setup • Simple Apps`
        },
        {
          value: 'custom',
          label: '⚙️  Custom Setup',
          hint: 'Configure everything step-by-step'
        }
      ];

      const preset = await select({
        message: 'Select a preset:',
        options: presetOptions,
      });

      if (isCancel(preset)) {
        cancel('Operation cancelled');
        process.exit(0);
      }

      if (preset !== 'custom') {
        const selectedPreset = presets[preset as keyof typeof presets];
        Object.assign(config, selectedPreset);
        console.log(pc.green(`✓ Applied ${preset} preset`));
        console.log(pc.dim(`  ${selectedPreset.description}`));
      } else {
        console.log(pc.dim('  Custom setup selected - you\'ll configure everything step by step'));
      }
    }
  }

  let description: string;
  if (options.preset && config.description) {
    // Use preset description or generate default
    description = config.description || `A ${config.projectName?.replace(/-/g, ' ')} application`;
  } else if (isNonInteractive) {
    // Non-interactive mode: use default description
    description = baseConfig.description || 
      (config.projectName ? `A ${config.projectName.replace(/-/g, ' ')} application` : 
       'A modern web application built with Better-T-Stack');
    console.log(pc.dim(`Using description: ${description}`));
  } else {
    const descPrompt = await text({
      message: 'Project description:',
      placeholder: 'A modern web application built with Better-T-Stack',
      initialValue: baseConfig.description || (config.projectName ? `A ${config.projectName.replace(/-/g, ' ')} application` : ''),
      validate: validateDescriptionPrompt,
    });

    if (isCancel(descPrompt)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    description = descPrompt as string;
  }

  config.description = description;

  // Try to get git user name as default
  let defaultAuthor = 'Your Name';
  try {
    defaultAuthor = execSync('git config user.name', { encoding: 'utf8' }).trim();
  } catch {
    // Git config not available, use default
  }

  let author: string;
  if (options.preset && defaultAuthor !== 'Your Name') {
    // Use git config author for preset mode
    author = baseConfig.author || defaultAuthor;
  } else if (options.preset || isNonInteractive) {
    // Use default for preset mode or non-interactive mode when no git config
    author = baseConfig.author || defaultAuthor;
    if (isNonInteractive) {
      console.log(pc.dim(`Using author: ${author}`));
    }
  } else {
    const authorPrompt = await text({
      message: 'Author name:',
      placeholder: defaultAuthor,
      initialValue: baseConfig.author || (defaultAuthor !== 'Your Name' ? defaultAuthor : ''),
      validate: validateAuthorPrompt,
    });

    if (isCancel(authorPrompt)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    author = authorPrompt as string;
  }

  config.author = author;

  // Use enhanced wizard for configuration
  if (!options.preset || options.preset === 'custom') {
    if (!isNonInteractive) {
      console.log(pc.dim('\n🧙‍♂️ Running enhanced configuration wizard...'));

      // Run the enhanced wizard with all smart features
      const wizardConfig = await runEnhancedWizard(config, options.preset, { isNonInteractive: !!isNonInteractive });

      // Merge wizard results into config
      Object.assign(config, wizardConfig);
    } else {
      console.log(pc.dim('\n🧙‍♂️ Skipping wizard in non-interactive mode, using defaults...'));
    }
  }

  // Validate complete configuration
  const validationContext = getValidationContext();
  const configValidation = validateFullConfig(config, validationContext);

  // Show warnings if any
  const warnings = configValidation.filter(v => v.severity === 'warning');
  if (warnings.length > 0) {
    console.log(pc.yellow('\n⚠️  Configuration Warnings:'));
    warnings.forEach(warning => {
      console.log(pc.yellow(`   • ${warning.message}`));
    });
    console.log();
  }

  // Check for critical errors
  const errors = configValidation.filter(v => v.severity === 'error');
  if (errors.length > 0) {
    console.log(pc.red('\n❌ Configuration Errors:'));
    errors.forEach(error => {
      console.log(pc.red(`   • ${error.message}`));
    });
    console.log('\nPlease fix these errors and try again.');
    process.exit(1);
  }

  // Export configuration for template generation
  const configPath = getDefaultConfigPath(config.projectName!);
  try {
    exportConfig(config as ProjectConfig, configPath);
    console.log(pc.dim(`\n📄 Configuration saved to ${configPath}`));
  } catch (error) {
    console.log(pc.yellow(`Warning: Could not save configuration: ${error}`));
  }

  // Fill in any missing configuration with defaults
  const completeConfig: ProjectConfig = {
      projectName: config.projectName!,
      description: config.description!,
      author: config.author!,
      preset: options.preset,
      database: config.database || 'sqlite',
      auth: config.auth || ['email'],
      apiStyle: config.apiStyle || 'orpc',
      componentLibrary: config.componentLibrary || 'base-ui',
      uiStyle: config.uiStyle || 'maia',
      baseColor: config.baseColor || 'zinc',
      accentColor: config.accentColor || 'blue',
      font: config.font || 'figtree',
      icons: config.icons || 'hugeicons',
      borderRadius: config.borderRadius || 'default',
      menuAccent: config.menuAccent || 'subtle',
      testing: config.testing || [],
      unitTesting: config.unitTesting !== undefined ? config.unitTesting : true,
      exampleTests: config.exampleTests !== undefined ? config.exampleTests : true,
      docker: config.docker || false,
      cicd: config.cicd || 'vercel',
      deployTarget: config.deployTarget || 'vercel',
      pbsLevel: config.pbsLevel || 'minimal',
      beadsIntegration: config.beadsIntegration || false,
      claudeCodeHooks: config.claudeCodeHooks || false,
      mcpServers: config.mcpServers || [],
      pwa: config.pwa || false,
      analytics: config.analytics || 'none',
      email: config.email || 'none',
      errorTracking: config.errorTracking || 'none',
      featureFlags: config.featureFlags || false
    };

  // Generate project using integrated parallel systems
  const s = spinner();
  s.start('Generating your project...');

  try {
    s.message('Creating base project structure...');

    // System 1: Generate base project (src/generators/base.ts)
    await generateBaseProject(completeConfig);

    s.message('Setting up testing framework...');

    // System 2: Generate testing configuration (src/generators/testing.ts)
    if (completeConfig.testing.length > 0 || completeConfig.unitTesting) {
      const projectDir = resolve(process.cwd(), completeConfig.projectName);
      await generateTestingFramework(projectDir, completeConfig);
    }

    s.message('Configuring DevOps infrastructure...');

    // System 3: Generate DevOps infrastructure (src/generators/devops.ts)
    if (completeConfig.docker || completeConfig.cicd !== 'none' || completeConfig.deployTarget !== 'manual') {
      const projectDir = resolve(process.cwd(), completeConfig.projectName);
      await generateDevOpsInfrastructure(projectDir, completeConfig);
    }

    s.message('Generating PBS documentation and AI workflow...');

    // Terminal 1 System: Generate PBS documentation templates (src/generators/pbs.ts)
    if (completeConfig.pbsLevel !== 'none') {
      const projectDir = resolve(process.cwd(), completeConfig.projectName);
      await generatePBSTemplates(projectDir, completeConfig);
    }

    // Terminal 1 System: Generate Claude Code configuration (src/generators/claude-code.ts)
    if (completeConfig.pbsLevel !== 'none') {
      const projectDir = resolve(process.cwd(), completeConfig.projectName);
      await generateClaudeCodeConfiguration(projectDir, completeConfig);
    }

    s.message('Configuring MCP servers...');

    // Task 1.4: Generate MCP server configuration (src/generators/mcp.ts)
    if (completeConfig.mcpServers && completeConfig.mcpServers.length > 0) {
      const projectDir = resolve(process.cwd(), completeConfig.projectName);
      await generateMcpConfiguration(projectDir, completeConfig);
    }

    s.message('Setting up preset system and final configuration...');

    // Terminal 2 System: Generate enhanced preset system (src/generators/presets.ts)
    const projectDir = resolve(process.cwd(), completeConfig.projectName);
    await generatePresetSystem(projectDir, completeConfig);

    s.message('Finalizing project setup...');

    // Optional: Run post-generation steps  
    if (options.git !== false) {
      try {
        const projectDir = resolve(process.cwd(), completeConfig.projectName);
        execSync('git init', { cwd: projectDir, stdio: 'ignore' });
        execSync('git add .', { cwd: projectDir, stdio: 'ignore' });
        execSync('git commit -m "Initial commit from create-karetech-stack"', { cwd: projectDir, stdio: 'ignore' });
      } catch (error) {
        console.log(pc.yellow('\n⚠️  Git initialization failed, but project was created successfully'));
      }
    }

    // Optional: Install dependencies
    if (options.install !== false) {
      try {
        const projectDir = resolve(process.cwd(), completeConfig.projectName);
        s.message('Installing dependencies...');
        execSync('bun install', { cwd: projectDir, stdio: 'ignore' });
      } catch (error) {
        console.log(pc.yellow('\n⚠️  Dependency installation failed, run "bun install" manually'));
      }
    }

    s.stop('Project generated successfully!');
  } catch (error) {
    s.stop('Project generation failed');
    console.log(pc.red(`\n❌ Error: ${error}`));
    process.exit(1);
  }

  // Display enhanced configuration summary with tracking information
  console.log(pc.dim('\nProject Configuration:'));
  console.log(pc.dim(`• Name: ${config.projectName}`));
  console.log(pc.dim(`• Database: ${config.database || 'Not specified'}`));
  console.log(pc.dim(`• Auth: ${config.auth?.join(', ') || 'None'}`));
  console.log(pc.dim(`• UI Style: ${config.uiStyle || 'Default'}`));
  console.log(pc.dim(`• Testing: ${config.testing?.join(', ') || 'None'}`));
  console.log(pc.dim(`• Docker: ${config.docker ? 'Yes' : 'No'}`));
  console.log(pc.dim(`• CI/CD: ${config.cicd || 'None'}`));
  console.log(pc.dim(`• PBS Level: ${config.pbsLevel || 'None'}`));

  // Enhanced tracking information
  console.log(pc.dim(`• Beads Integration: ${config.beadsIntegration ? 'Yes' : 'No'}`));
  console.log(pc.dim(`• Claude Code Hooks: ${config.claudeCodeHooks ? 'Yes' : 'No'}`));
  console.log(pc.dim(`• MCP Servers: ${config.mcpServers?.join(', ') || 'None'}`));

  // Display tracking recommendations
  try {
    const trackingRecommendations = generateTrackingRecommendations(completeConfig);
    if (trackingRecommendations.length > 1) { // Skip the status message
      console.log(pc.yellow('\n📋 Tracking & PBS Recommendations:'));
      trackingRecommendations.slice(1).forEach(recommendation => {
        console.log(pc.yellow(`   ${recommendation}`));
      });
    }
  } catch (error) {
    // Silently skip recommendations if there's an error
  }

  if (!isNonInteractive) {
    outro(pc.green(`
    ${pc.bold('Next steps:')}

  cd ${config.projectName}
  bun install
  bun dev

  ${pc.dim('Happy coding! 🚀')}
    `));
  } else {
    console.log(pc.green(`✅ Project ${config.projectName} created successfully!`));
  }
}

// Error handling is now handled by Commander.js
