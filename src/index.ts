#!/usr/bin/env bun

/**
 * create-karetech-stack - Enhanced CLI
 * Better-T-Stack style explicit parameters + KareTech unique features
 */

import { intro, outro, text, select, spinner, isCancel, cancel } from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

// Import enhanced systems
import { ProjectConfig } from './types';
import { setupEnhancedCli, mapCliOptionsToConfig, hasExplicitParameters, generateUsageExamples, EnhancedCliOptions } from './enhanced-cli-options';
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

const VERSION = '0.3.0';

// CLI setup
const program = new Command()
  .name('create-karetech-stack')
  .description('Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps')
  .version(VERSION);

// Enhanced main command with explicit parameters
const createCommand = setupEnhancedCli(program)
  .action(async (projectName, options: EnhancedCliOptions) => {
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

// Usage examples command
program
  .command('examples')
  .description('Show usage examples')
  .action(() => {
    console.log(pc.cyan('KareTech Stack Usage Examples:\\n'));
    const examples = generateUsageExamples();
    examples.forEach(line => {
      if (line.startsWith('#')) {
        console.log(pc.green(line));
      } else if (line.includes('\\\\')) {
        console.log(pc.dim(line));
      } else {
        console.log(line);
      }
    });
  });

// Config export command (unchanged)
program
  .command('export-config <project-name>')
  .description('Export current configuration to file')
  .option('--format <format>', 'Export format (json, yaml)', 'json')
  .option('--output <path>', 'Output file path')
  .action(async (projectName, options) => {
    // ... existing export logic
  });

program.parse();

async function createProject(projectName: string | undefined, options: EnhancedCliOptions) {
  // Enhanced TTY and mode detection
  const hasStdoutTty = process.stdout.isTTY || false;
  const hasStdinTty = process.stdin.isTTY || false;
  const isCI = process.env.CI === 'true' || process.env.NODE_ENV === 'test';
  const hasExplicitParams = hasExplicitParameters(options);
  const hasPreset = !!options.preset;
  
  // Four modes:
  // 1. YOLO mode: --yolo specified (fastest)
  // 2. Explicit mode: --frontend, --backend, etc. specified
  // 3. Preset mode: --preset specified  
  // 4. Interactive mode: neither, launch wizard
  const isYolo = !!options.yolo;
  const mode = isYolo ? 'yolo' : (hasExplicitParams ? 'explicit' : (hasPreset ? 'preset' : 'interactive'));
  const isNonInteractive = isCI || !hasStdoutTty || !hasStdinTty || mode === 'explicit' || mode === 'yolo';

  if (!isNonInteractive) {
    console.clear();
    intro(pc.bgCyan(pc.black(' create-karetech-stack ')));
  } else {
    console.log(pc.cyan('create-karetech-stack'));
    if (mode === 'explicit') {
      console.log(pc.dim('Using explicit parameters mode'));
    }
  }

  // Initialize configuration
  let config: Partial<ProjectConfig> = {};

  // Mode-specific configuration
  switch (mode) {
    case 'yolo':
      console.log(pc.green('🚀 YOLO mode: Using all sensible defaults, being fast and bold!'));
      
      // Apply YOLO defaults
      config = mapCliOptionsToConfig(options);
      
      console.log(pc.dim('YOLO configuration applied:'));
      console.log(pc.dim('  • Database: PostgreSQL'));
      console.log(pc.dim('  • Auth: Email + GitHub'));
      console.log(pc.dim('  • UI: Maia theme with Blue accent'));
      console.log(pc.dim('  • Testing: Playwright'));
      console.log(pc.dim('  • DevOps: Docker + GitHub Actions'));
      console.log(pc.dim('  • AI: Full PBS + Claude hooks + Beads'));
      break;

    case 'explicit':
      console.log(pc.green('🎯 Explicit configuration mode'));
      
      // Map CLI options to config
      config = mapCliOptionsToConfig(options);
      
      // Show what was detected
      console.log(pc.dim('Detected configuration:'));
      Object.entries(config).forEach(([key, value]) => {
        if (value !== undefined) {
          console.log(pc.dim(`  ${key}: ${Array.isArray(value) ? value.join(', ') : value}`));
        }
      });
      break;

    case 'preset':
      console.log(pc.green(`🚀 Preset mode: ${options.preset}`));
      const preset = presets[options.preset as keyof typeof presets];
      if (preset) {
        Object.assign(config, preset);
        console.log(pc.dim(`  ${preset.description}`));
        
        // Apply any explicit overrides
        const explicitOverrides = mapCliOptionsToConfig(options);
        Object.assign(config, explicitOverrides);
      } else {
        console.log(pc.red(`Unknown preset: ${options.preset}`));
        process.exit(1);
      }
      break;

    case 'interactive':
      console.log(pc.green('🧙‍♂️ Interactive wizard mode'));
      break;
  }

  // Project name handling
  let finalProjectName: string;
  if (projectName) {
    finalProjectName = projectName;
  } else if (mode === 'explicit' || mode === 'yolo' || isNonInteractive) {
    finalProjectName = 'my-karetech-app';
    console.log(pc.dim(`Using default project name: ${finalProjectName}`));
  } else {
    const namePrompt = await text({
      message: 'What is your project name?',
      placeholder: 'my-awesome-app',
      validate: (value: string) => {
        const errors = validateProjectName(value);
        const criticalError = errors.find(e => e.severity === 'error');
        return criticalError ? criticalError.message : undefined;
      },
    });

    if (isCancel(namePrompt)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    finalProjectName = namePrompt as string;
  }

  config.projectName = finalProjectName;

  // Description and author (simplified for explicit and YOLO mode)
  if (mode === 'explicit' || mode === 'yolo') {
    config.description = `A ${finalProjectName.replace(/-/g, ' ')} application`;
    try {
      config.author = execSync('git config user.name', { encoding: 'utf8' }).trim();
    } catch {
      config.author = 'Your Name';
    }
  } else if (mode === 'interactive') {
    // Run full interactive wizard
    console.log(pc.dim('\\n🧙‍♂️ Running enhanced configuration wizard...'));
    const wizardConfig = await runEnhancedWizard(config, undefined, { isNonInteractive: false });
    Object.assign(config, wizardConfig);
  }

  // Fill in defaults for missing values
  const completeConfig: ProjectConfig = {
    projectName: config.projectName!,
    description: config.description || `A ${finalProjectName.replace(/-/g, ' ')} application`,
    author: config.author || 'Your Name',
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
    pbsLevel: config.pbsLevel || (mode === 'explicit' || mode === 'yolo' ? 'minimal' : 'none'),
    beadsIntegration: config.beadsIntegration || false,
    claudeCodeHooks: config.claudeCodeHooks || false,
    mcpServers: config.mcpServers || [],
    pwa: config.pwa || false,
    analytics: config.analytics || 'none',
    email: config.email || 'none',
    errorTracking: config.errorTracking || 'none',
    featureFlags: config.featureFlags || false
  };

  // Validation
  const validationContext = getValidationContext();
  const configValidation = validateFullConfig(completeConfig, validationContext);

  const warnings = configValidation.filter(v => v.severity === 'warning');
  if (warnings.length > 0) {
    console.log(pc.yellow('\\n⚠️  Configuration Warnings:'));
    warnings.forEach(warning => {
      console.log(pc.yellow(`   • ${warning.message}`));
    });
  }

  const errors = configValidation.filter(v => v.severity === 'error');
  if (errors.length > 0) {
    console.log(pc.red('\\n❌ Configuration Errors:'));
    errors.forEach(error => {
      console.log(pc.red(`   • ${error.message}`));
    });
    console.log('\\nPlease fix these errors and try again.');
    process.exit(1);
  }

  // Generate project
  const s = spinner();
  s.start('Generating your project...');

  try {
    // ... existing generation logic
    await generateBaseProject(completeConfig);
    
    if (completeConfig.testing.length > 0 || completeConfig.unitTesting) {
      const projectDir = resolve(process.cwd(), completeConfig.projectName);
      await generateTestingFramework(projectDir, completeConfig);
    }

    // ... rest of generation
    
    s.stop('Project generated successfully!');
  } catch (error) {
    s.stop('Project generation failed');
    console.log(pc.red(`\\n❌ Error: ${error}`));
    process.exit(1);
  }

  // Display configuration summary
  console.log(pc.green('\\n✅ Project Configuration:'));
  console.log(pc.dim(`• Mode: ${mode}${mode === 'yolo' ? ' 🚀' : ''}`));
  console.log(pc.dim(`• Name: ${completeConfig.projectName}`));
  console.log(pc.dim(`• Database: ${completeConfig.database}`));
  console.log(pc.dim(`• Auth: ${completeConfig.auth.join(', ')}`));
  console.log(pc.dim(`• Theme: ${completeConfig.uiStyle}`));
  console.log(pc.dim(`• Testing: ${completeConfig.testing.join(', ') || 'None'}`));
  console.log(pc.dim(`• Docker: ${completeConfig.docker ? 'Yes' : 'No'}`));
  console.log(pc.dim(`• PBS: ${completeConfig.pbsLevel}`));

  if (!isNonInteractive) {
    outro(pc.green(`
    ${pc.bold('Next steps:')}

  cd ${completeConfig.projectName}
  bun install
  bun dev

  ${pc.dim('Happy coding! 🚀')}
    `));
  } else {
    console.log(pc.green(`\\n✅ Project ${completeConfig.projectName} created successfully!`));
    if (mode === 'explicit') {
      console.log(pc.dim('\\n📚 Learn more: bun run dev -- examples'));
    }
  }
}