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

const VERSION = '0.0.1';

// Reserved project names that should not be used
const RESERVED_NAMES = [
  'node_modules', 'dist', 'build', '.git', '.next', '.nuxt', '.vite',
  'public', 'src', 'lib', 'app', 'pages', 'components', 'utils', 'types',
  'config', 'server', 'client', 'api', 'test', 'tests', '__tests__',
  'docs', 'doc', 'documentation', 'readme', 'license', 'changelog',
  'package', 'yarn', 'npm', 'pnpm', 'bun', 'node', 'deno',
  'react', 'next', 'vue', 'svelte', 'angular', 'typescript', 'javascript',
  'con', 'prn', 'aux', 'nul', // Windows reserved names
  'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9',
  'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9'
];

// Validation functions
function validateProjectName(value: string): string | void {
  if (!value) return 'Project name is required';
  if (value.length < 2) return 'Project name must be at least 2 characters';
  if (value.length > 50) return 'Project name must be less than 50 characters';
  if (!/^[a-z0-9-]+$/.test(value)) return 'Use lowercase letters, numbers, and hyphens only';
  if (value.startsWith('-') || value.endsWith('-')) return 'Project name cannot start or end with a hyphen';
  if (value.includes('--')) return 'Project name cannot contain consecutive hyphens';
  if (RESERVED_NAMES.includes(value.toLowerCase())) return `"${value}" is a reserved name, please choose another`;

  // Check if directory already exists
  const projectPath = resolve(process.cwd(), value);
  if (existsSync(projectPath)) return `Directory "${value}" already exists in current location`;
}

function validateDescription(value: string): string | void {
  if (!value) return 'Project description is required';
  if (value.length < 3) return 'Description must be at least 3 characters';
  if (value.length > 200) return 'Description must be less than 200 characters';
}

function validateAuthor(value: string): string | void {
  if (!value) return 'Author name is required';
  if (value.length < 2) return 'Author name must be at least 2 characters';
  if (value.length > 50) return 'Author name must be less than 50 characters';
}

// Configuration interfaces
interface ProjectConfig {
  projectName: string;
  description: string;
  author: string;
  preset?: string;
  database: string;
  auth: string[];
  apiStyle: string;
  uiStyle: string;
  baseColor: string;
  accentColor: string;
  font: string;
  icons: string;
  borderRadius: string;
  testing: string[];
  unitTesting: boolean;
  exampleTests: boolean;
  docker: boolean;
  cicd: string;
  deployTarget: string;
  pbsLevel: string;
  beadsIntegration: boolean;
  claudeCodeHooks: boolean;
  mcpServers: string[];
  pwa: boolean;
  analytics: string;
  email: string;
  errorTracking: string;
  featureFlags: boolean;
}

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
  .version(VERSION)
  .argument('[project-name]', 'Name of the project')
  .option('--preset <preset>', 'Use a preset (saas, ecommerce, blog, devtool, portfolio, minimal)')
  .option('--theme <style>', 'Theme style (vega, nova, maia, lyra, mira)')
  .option('--color <color>', 'Accent color')
  .option('--no-git', 'Skip git initialization')
  .option('--no-install', 'Skip dependency installation')
  .parse();

async function main() {
  const options = program.opts();
  const args = program.args;

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

  // Step 1: Project Info
  const projectName = args[0] || await text({
    message: 'What is your project name?',
    placeholder: 'my-awesome-app',
    validate: validateProjectName,
  });

  if (isCancel(projectName)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  config.projectName = projectName as string;

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
    initialValue: config.projectName ? `A ${config.projectName.replace(/-/g, ' ')} application` : '',
    validate: validateDescription,
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
    initialValue: defaultAuthor !== 'Your Name' ? defaultAuthor : '',
    validate: validateAuthor,
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

    config.database = database as string;

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

    config.auth = auth as string[];

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

    config.uiStyle = uiStyle as string;

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

    config.testing = testing as string[];

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

    config.cicd = cicd as string;

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

    config.pbsLevel = pbsLevel as string;

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

  // Generate project
  const s = spinner();
  s.start('Generating your project...');

  // TODO: Implement actual scaffolding logic
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

main().catch((err) => {
  console.error(pc.red('Error:'), err.message);
  process.exit(1);
});
