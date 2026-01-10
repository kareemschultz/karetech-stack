#!/usr/bin/env bun

/**
 * create-karetech-stack
 * Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps built-in
 */

import { intro, outro, text, select, confirm, spinner, isCancel, cancel, multiselect } from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';

const VERSION = '0.0.1';

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

  // TODO: Implement full wizard
  // For now, just show a placeholder
  
  const projectName = args[0] || await text({
    message: 'What is your project name?',
    placeholder: 'my-awesome-app',
    validate: (value) => {
      if (!value) return 'Project name is required';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Use lowercase letters, numbers, and hyphens only';
    },
  });

  if (isCancel(projectName)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  const s = spinner();
  s.start('Setting up project...');

  // TODO: Implement actual scaffolding
  await new Promise((resolve) => setTimeout(resolve, 1000));

  s.stop('Project setup complete!');

  outro(pc.green(`
  ${pc.bold('Next steps:')}
  
  cd ${projectName}
  bun install
  bun dev

  ${pc.dim('Happy coding! 🚀')}
  `));
}

main().catch((err) => {
  console.error(pc.red('Error:'), err.message);
  process.exit(1);
});
