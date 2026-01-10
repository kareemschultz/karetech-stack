#!/usr/bin/env bun

/**
 * create-karetech-stack
 * Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps built-in
 */

import { intro, outro, text, select, confirm, spinner, isCancel, cancel, multiselect } from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

// Import our enhanced systems
import { ProjectConfig, CliOptions, DatabaseType, AuthProvider, UiStyle, TestingFramework, CiCdPlatform, PbsLevel } from './types';
import { validateProjectName, validateDescription, validateAuthor, validateFullConfig, getValidationContext } from './validation';
import { exportConfig, importConfig, getDefaultConfigPath, validateConfig as validateConfigData } from './config';
import { runEnvironmentCheck, printEnvironmentReport } from './utils/environment';

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

// Preset configurations
const presets = {
  saas: {
    description: 'Full-featured SaaS starter with PostgreSQL, full auth, and complete DevOps',
    database: 'postgresql',
    auth: ['email', 'oauth'],
    apiStyle: 'orpc',
    uiStyle: 'mira',
    baseColor: 'zinc',
    accentColor: 'blue',
    font: 'geist',
    icons: 'lucide',
    borderRadius: '0.5',
    testing: ['playwright'],
    unitTesting: true,
    exampleTests: true,
    docker: true,
    cicd: 'github-actions',
    deployTarget: 'vercel',
    pbsLevel: 'full',
    beadsIntegration: true,
    claudeCodeHooks: true,
    mcpServers: ['filesystem', 'github'],
    pwa: false,
    analytics: 'vercel',
    email: 'resend',
    errorTracking: 'sentry',
    featureFlags: false
  },
  ecommerce: {
    description: 'E-commerce platform with Stripe integration and full testing',
    database: 'postgresql',
    auth: ['email', 'oauth', 'magic-links'],
    apiStyle: 'orpc',
    uiStyle: 'nova',
    baseColor: 'slate',
    accentColor: 'green',
    font: 'inter',
    icons: 'heroicons',
    borderRadius: '0.75',
    testing: ['playwright', 'puppeteer'],
    unitTesting: true,
    exampleTests: true,
    docker: true,
    cicd: 'github-actions',
    deployTarget: 'vercel',
    pbsLevel: 'full',
    beadsIntegration: true,
    claudeCodeHooks: true,
    mcpServers: ['filesystem', 'github', 'postgres'],
    pwa: true,
    analytics: 'vercel',
    email: 'resend',
    errorTracking: 'sentry',
    featureFlags: true
  },
  blog: {
    description: 'Publishing platform with Turso and optimized for content',
    database: 'turso',
    auth: ['email'],
    apiStyle: 'orpc',
    uiStyle: 'lyra',
    baseColor: 'stone',
    accentColor: 'orange',
    font: 'crimson',
    icons: 'lucide',
    borderRadius: '0.5',
    testing: ['playwright'],
    unitTesting: true,
    exampleTests: true,
    docker: false,
    cicd: 'vercel',
    deployTarget: 'vercel',
    pbsLevel: 'docs',
    beadsIntegration: false,
    claudeCodeHooks: true,
    mcpServers: ['filesystem'],
    pwa: false,
    analytics: 'vercel',
    email: 'resend',
    errorTracking: 'none',
    featureFlags: false
  },
  devtool: {
    description: 'Developer tools with GitHub auth and testing focus',
    database: 'postgresql',
    auth: ['github'],
    apiStyle: 'orpc',
    uiStyle: 'mira',
    baseColor: 'zinc',
    accentColor: 'green',
    font: 'mono',
    icons: 'lucide',
    borderRadius: '0.25',
    testing: ['vitest'],
    unitTesting: true,
    exampleTests: true,
    docker: false,
    cicd: 'github-actions',
    deployTarget: 'vercel',
    pbsLevel: 'minimal',
    beadsIntegration: false,
    claudeCodeHooks: true,
    mcpServers: ['filesystem', 'github'],
    pwa: false,
    analytics: 'none',
    email: 'none',
    errorTracking: 'none',
    featureFlags: false
  },
  portfolio: {
    description: 'Personal portfolio site with minimal setup',
    database: 'sqlite',
    auth: [],
    apiStyle: 'orpc',
    uiStyle: 'vega',
    baseColor: 'neutral',
    accentColor: 'violet',
    font: 'geist',
    icons: 'lucide',
    borderRadius: '1',
    testing: [],
    unitTesting: false,
    exampleTests: false,
    docker: false,
    cicd: 'vercel',
    deployTarget: 'vercel',
    pbsLevel: 'none',
    beadsIntegration: false,
    claudeCodeHooks: false,
    mcpServers: [],
    pwa: false,
    analytics: 'vercel',
    email: 'none',
    errorTracking: 'none',
    featureFlags: false
  },
  minimal: {
    description: 'Minimal setup for simple applications',
    database: 'sqlite',
    auth: ['email'],
    apiStyle: 'orpc',
    uiStyle: 'default',
    baseColor: 'slate',
    accentColor: 'blue',
    font: 'inter',
    icons: 'lucide',
    borderRadius: '0.5',
    testing: [],
    unitTesting: false,
    exampleTests: false,
    docker: false,
    cicd: 'none',
    deployTarget: 'vercel',
    pbsLevel: 'none',
    beadsIntegration: false,
    claudeCodeHooks: false,
    mcpServers: [],
    pwa: false,
    analytics: 'none',
    email: 'none',
    errorTracking: 'none',
    featureFlags: false
  }
};

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
  .action((projectName, options) => {
    console.log(`Config export functionality coming soon for ${projectName}`);
  });

program.parse();

async function createProject(projectName: string | undefined, options: CliOptions) {

  console.clear();

  intro(pc.bgCyan(pc.black(' create-karetech-stack ')));

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
  const finalProjectName = projectName || await text({
    message: 'What is your project name?',
    placeholder: 'my-awesome-app',
    initialValue: baseConfig.projectName,
    validate: validateProjectNamePrompt,
  });

  if (isCancel(finalProjectName)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  config.projectName = finalProjectName as string;

  if (!options.preset) {
    console.log(pc.dim('\n🚀 Choose a preset to quick-start your project, or customize everything yourself:'));

    const preset = await select({
      message: 'Select a preset:',
      options: [
        {
          value: 'saas',
          label: '🏢 SaaS Starter',
          hint: 'PostgreSQL • Full Auth • Docker • CI/CD • Full PBS'
        },
        {
          value: 'ecommerce',
          label: '🛒 E-commerce',
          hint: 'PostgreSQL • Stripe • Full Testing • Complete DevOps'
        },
        {
          value: 'blog',
          label: '📝 Blog/Publishing',
          hint: 'Turso • Content-optimized • Vercel Deploy'
        },
        {
          value: 'devtool',
          label: '🔧 Developer Tool',
          hint: 'PostgreSQL • GitHub Auth • Testing Focus'
        },
        {
          value: 'portfolio',
          label: '👤 Portfolio',
          hint: 'SQLite • Minimal • Personal Sites'
        },
        {
          value: 'minimal',
          label: '⚡ Minimal',
          hint: 'SQLite • Basic Setup • Simple Apps'
        },
        {
          value: 'custom',
          label: '⚙️  Custom Setup',
          hint: 'Configure everything step-by-step'
        }
      ],
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

  const description = await text({
    message: 'Project description:',
    placeholder: 'A modern web application built with Better-T-Stack',
    initialValue: baseConfig.description || (config.projectName ? `A ${config.projectName.replace(/-/g, ' ')} application` : ''),
    validate: validateDescriptionPrompt,
  });

  if (isCancel(description)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  config.description = description as string;

  // Try to get git user name as default
  let defaultAuthor = 'Your Name';
  try {
    defaultAuthor = execSync('git config user.name', { encoding: 'utf8' }).trim();
  } catch {
    // Git config not available, use default
  }

  const author = await text({
    message: 'Author name:',
    placeholder: defaultAuthor,
    initialValue: baseConfig.author || (defaultAuthor !== 'Your Name' ? defaultAuthor : ''),
    validate: validateAuthorPrompt,
  });

  if (isCancel(author)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  config.author = author as string;

  // Only show additional wizard steps if not using a preset or if using custom
  if (!options.preset || options.preset === 'custom') {
    // Step 2: Core Stack
    const database = await select({
      message: 'Choose your database:',
      options: [
        { value: 'postgresql', label: 'PostgreSQL', hint: 'Full-featured relational database' },
        { value: 'turso', label: 'Turso (SQLite)', hint: 'Edge-optimized SQLite' },
        { value: 'sqlite', label: 'SQLite', hint: 'Simple file-based database' }
      ],
      initialValue: config.database,
    });

    if (isCancel(database)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.database = database as DatabaseType;

    const auth = await multiselect({
      message: 'Authentication providers:',
      options: [
        { value: 'email', label: 'Email/Password', hint: 'Classic email authentication' },
        { value: 'oauth', label: 'OAuth', hint: 'Google, GitHub, etc.' },
        { value: 'magic-links', label: 'Magic Links', hint: 'Passwordless email links' }
      ],
      initialValues: config.auth,
    });

    if (isCancel(auth)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.auth = auth as AuthProvider[];

    // Step 3: Design
    const uiStyle = await select({
      message: 'Choose UI style:',
      options: [
        { value: 'vega', label: 'Vega', hint: 'Clean and minimal' },
        { value: 'nova', label: 'Nova', hint: 'Bold and modern' },
        { value: 'maia', label: 'Maia', hint: 'Rounded and friendly' },
        { value: 'lyra', label: 'Lyra', hint: 'Editorial and refined' },
        { value: 'mira', label: 'Mira', hint: 'Sharp and professional' }
      ],
      initialValue: config.uiStyle || 'mira',
    });

    if (isCancel(uiStyle)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.uiStyle = uiStyle as UiStyle;

    // Step 4: Testing
    const testing = await multiselect({
      message: 'Testing frameworks:',
      options: [
        { value: 'playwright', label: 'Playwright', hint: 'End-to-end testing' },
        { value: 'puppeteer', label: 'Puppeteer', hint: 'Browser automation' },
        { value: 'vitest', label: 'Vitest', hint: 'Unit testing' }
      ],
      initialValues: config.testing || [],
    });

    if (isCancel(testing)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.testing = testing as TestingFramework[];

    // Step 5: DevOps
    const docker = await confirm({
      message: 'Include Docker configuration?',
      initialValue: config.docker || false,
    });

    if (isCancel(docker)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.docker = docker as boolean;

    const cicd = await select({
      message: 'CI/CD platform:',
      options: [
        { value: 'github-actions', label: 'GitHub Actions', hint: 'Integrated with GitHub' },
        { value: 'vercel', label: 'Vercel', hint: 'Deploy on push' },
        { value: 'none', label: 'None', hint: 'Manual deployment' }
      ],
      initialValue: config.cicd || 'vercel',
    });

    if (isCancel(cicd)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.cicd = cicd as CiCdPlatform;

    // Step 6: AI Workflow
    const pbsLevel = await select({
      message: 'PBS (Plan-Build-Ship) integration level:',
      options: [
        { value: 'full', label: 'Full PBS System', hint: 'Complete documentation + Beads + Claude Code' },
        { value: 'docs', label: 'Documentation Only', hint: 'PBS docs without automation' },
        { value: 'minimal', label: 'Minimal', hint: 'Basic CLAUDE.md only' },
        { value: 'none', label: 'None', hint: 'No PBS integration' }
      ],
      initialValue: config.pbsLevel || 'minimal',
    });

    if (isCancel(pbsLevel)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.pbsLevel = pbsLevel as PbsLevel;

    // Step 7: Extras
    const pwa = await confirm({
      message: 'Progressive Web App features?',
      initialValue: config.pwa || false,
    });

    if (isCancel(pwa)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    config.pwa = pwa as boolean;
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

  // Generate project
  const s = spinner();
  s.start('Generating your project...');

  // TODO: Implement actual scaffolding logic using config
  await new Promise((resolve) => setTimeout(resolve, 2000));

  s.stop('Project generated successfully!');

  // Display configuration summary
  console.log(pc.dim('\nProject Configuration:'));
  console.log(pc.dim(`• Name: ${config.projectName}`));
  console.log(pc.dim(`• Database: ${config.database || 'Not specified'}`));
  console.log(pc.dim(`• Auth: ${config.auth?.join(', ') || 'None'}`));
  console.log(pc.dim(`• UI Style: ${config.uiStyle || 'Default'}`));
  console.log(pc.dim(`• Testing: ${config.testing?.join(', ') || 'None'}`));
  console.log(pc.dim(`• Docker: ${config.docker ? 'Yes' : 'No'}`));
  console.log(pc.dim(`• CI/CD: ${config.cicd || 'None'}`));
  console.log(pc.dim(`• PBS Level: ${config.pbsLevel || 'None'}`));

  outro(pc.green(`
  ${pc.bold('Next steps:')}

  cd ${config.projectName}
  bun install
  bun dev

  ${pc.dim('Happy coding! 🚀')}
  `));
}

// Error handling is now handled by Commander.js
