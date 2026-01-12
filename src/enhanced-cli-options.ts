/**
 * Enhanced CLI Options for KareTech Stack
 * Better-T-Stack style explicit parameters + KareTech unique features
 * Gold Standard: bun create karetech-stack@latest A --frontend tanstack-router native-uniwind --backend hono --runtime bun --api orpc --auth better-auth --payments none --database postgres --orm drizzle --db-setup docker --package-manager bun --git --web-deploy none --server-deploy none --install --addons biome fumadocs husky lefthook pwa ruler tauri turborepo ultracite wxt --examples none --yolo
 */

import { Command } from 'commander';
import { ProjectConfig } from './types';

// Extended CLI options interface
export interface EnhancedCliOptions {
  // Core Stack - Support multiple frontends
  frontend?: string[]; // tanstack-router, next, nuxt, native-nativewind, native-uniwind, react, none
  backend?: string[]; // hono, express, fastify, elysia, none
  runtime?: 'bun' | 'node' | 'deno';
  api?: 'orpc' | 'trpc' | 'rest' | 'graphql';
  packageManager?: 'bun' | 'npm' | 'pnpm' | 'yarn';
  
  // Database & ORM  
  database?: 'postgresql' | 'turso' | 'sqlite' | 'mysql' | 'mongodb' | 'none';
  orm?: 'drizzle' | 'prisma' | 'mongoose' | 'none';
  dbSetup?: 'docker' | 'local' | 'cloud' | 'none';
  
  // Authentication & Security
  auth?: string[]; // comma-separated: email,github,google,discord,microsoft,magic-links,none
  payments?: 'stripe' | 'none';
  
  // Design System
  theme?: 'vega' | 'nova' | 'maia' | 'lyra' | 'mira' | 'default';
  color?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'violet';
  font?: 'inter' | 'geist' | 'crimson' | 'mono' | 'figtree';
  icons?: 'lucide' | 'heroicons' | 'phosphor' | 'hugeicons';
  componentLib?: 'radix' | 'base-ui';
  
  // Testing & Quality
  testing?: string[]; // playwright,puppeteer,vitest,none
  addons?: string[]; // biome,fumadocs,husky,lefthook,pwa,ruler,tauri,turborepo,ultracite,wxt
  
  // DevOps & Deployment  
  docker?: boolean;
  webDeploy?: 'vercel' | 'netlify' | 'none';
  serverDeploy?: 'docker' | 'railway' | 'fly' | 'none';
  cicd?: 'github-actions' | 'gitlab-ci' | 'none';
  
  // KareTech Stack Unique Features
  pbs?: 'full' | 'docs' | 'minimal' | 'none';
  claudeHooks?: boolean;
  beads?: boolean;
  mcp?: string[]; // comma-separated: filesystem,github,postgres,sqlite,playwright
  analytics?: 'vercel' | 'google' | 'umami' | 'none';
  email?: 'resend' | 'sendgrid' | 'nodemailer' | 'none';
  errorTracking?: 'sentry' | 'bugsnag' | 'rollbar' | 'none';
  
  // Utility Options
  examples?: string[]; // auth,crud,payments,none
  pwa?: boolean;
  featureFlags?: boolean;
  git?: boolean;
  install?: boolean;
  config?: string;
  yes?: boolean;
  yolo?: boolean; // Use all defaults, skip prompts, be fast and bold
  
  // Legacy support
  preset?: string;
}

// Parse comma-separated strings into arrays
function parseCommaSeparated(value: string | undefined): string[] {
  return value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];
}

// Enhanced CLI setup
export function setupEnhancedCli(program: Command) {
  return program
    .command('create [project-name]', { isDefault: true })
    .description('Create a new project with explicit configuration')
    
    // Core Stack - Support multiple values
    .option('--frontend <types...>', 'Frontend frameworks (tanstack-router, next, nuxt, native-nativewind, native-uniwind, react, none)')
    .option('--backend <types...>', 'Backend frameworks (hono, express, fastify, elysia, none)')
    .option('--runtime <type>', 'JavaScript runtime (bun, node, deno)')
    .option('--api <style>', 'API style (orpc, trpc, rest, graphql)')
    .option('--package-manager <type>', 'Package manager (bun, npm, pnpm, yarn)')
    
    // Database & ORM
    .option('--database <type>', 'Database type (postgresql, turso, sqlite, mysql, mongodb, none)')
    .option('--orm <type>', 'ORM/Query builder (drizzle, prisma, mongoose, none)')
    .option('--db-setup <type>', 'Database setup method (docker, local, cloud, none)')
    
    // Authentication & Security
    .option('--auth <providers>', 'Auth providers (email,github,google,discord,microsoft,magic-links,none)')
    .option('--payments <type>', 'Payment integration (stripe, none)')
    
    // Design System
    .option('--theme <style>', 'UI theme (vega, nova, maia, lyra, mira, default)')
    .option('--color <accent>', 'Accent color (red, orange, yellow, green, blue, purple, pink, violet)')
    .option('--font <family>', 'Font family (inter, geist, crimson, mono, figtree)')
    .option('--icons <library>', 'Icon library (lucide, heroicons, phosphor, hugeicons)')
    .option('--component-lib <type>', 'Component library (radix, base-ui)')
    
    // Testing & Quality
    .option('--testing <frameworks...>', 'Testing frameworks (playwright,puppeteer,vitest,none)')
    .option('--addons <tools...>', 'Additional tools (biome,fumadocs,husky,lefthook,pwa,ruler,tauri,turborepo,ultracite,wxt)')
    
    // DevOps & Deployment
    .option('--docker', 'Include Docker configuration')
    .option('--web-deploy <target>', 'Web deployment target (vercel, netlify, none)')
    .option('--server-deploy <target>', 'Server deployment target (docker, railway, fly, none)')
    .option('--cicd <platform>', 'CI/CD platform (github-actions, gitlab-ci, none)')
    
    // KareTech Stack Unique Features
    .option('--pbs <level>', 'PBS integration level (full, docs, minimal, none)')
    .option('--claude-hooks', 'Include Claude Code hooks')
    .option('--beads', 'Include Beads issue tracking')
    .option('--mcp <servers>', 'MCP servers (filesystem,github,postgres,sqlite,playwright)')
    .option('--analytics <provider>', 'Analytics provider (vercel, google, umami, none)')
    .option('--email <provider>', 'Email provider (resend, sendgrid, nodemailer, none)')
    .option('--error-tracking <provider>', 'Error tracking (sentry, bugsnag, rollbar, none)')
    
    // Utility Options
    .option('--examples <types>', 'Example implementations (auth,crud,payments,none)')
    .option('--pwa', 'Progressive Web App features')
    .option('--feature-flags', 'Include feature flag system')
    .option('--git', 'Initialize git repository')
    .option('--no-git', 'Skip git initialization')
    .option('--install', 'Install dependencies')
    .option('--no-install', 'Skip dependency installation')
    .option('--config <path>', 'Load configuration from file')
    .option('-y, --yes', 'Use default configuration')
    .option('--yolo', 'Use all defaults, skip prompts, be fast and bold 🚀')
    
    // Legacy support
    .option('--preset <preset>', 'Use preset (saas, ecommerce, blog, devtool, portfolio, minimal)');
}

// Convert CLI options to ProjectConfig
export function mapCliOptionsToConfig(options: EnhancedCliOptions): Partial<ProjectConfig> {
  const config: Partial<ProjectConfig> = {};
  
  // Handle YOLO mode - set sensible defaults
  if (options.yolo) {
    return {
      database: 'postgresql',
      auth: ['email', 'github'],
      apiStyle: 'orpc',
      componentLibrary: 'base-ui',
      uiStyle: 'maia',
      baseColor: 'zinc',
      accentColor: 'blue',
      font: 'figtree',
      icons: 'hugeicons',
      borderRadius: 'default',
      menuAccent: 'subtle',
      testing: ['playwright'],
      unitTesting: true,
      exampleTests: true,
      docker: true,
      cicd: 'github-actions',
      deployTarget: 'vercel',
      pbsLevel: 'full',
      claudeCodeHooks: true,
      beadsIntegration: true,
      mcpServers: ['filesystem', 'github'],
      pwa: false,
      analytics: 'vercel',
      email: 'resend',
      errorTracking: 'sentry',
      featureFlags: false,
      ...config
    };
  }
  
  // Core Stack mappings
  if (options.database && options.database !== 'none') {
    config.database = options.database as ProjectConfig['database'];
  }
  
  if (options.auth) {
    config.auth = parseCommaSeparated(options.auth.join?.(',') || options.auth as string) as ProjectConfig['auth'];
  }
  
  if (options.api) {
    config.apiStyle = options.api as ProjectConfig['apiStyle'];
  }
  
  // Design System mappings
  if (options.theme) {
    config.uiStyle = options.theme as ProjectConfig['uiStyle'];
  }
  
  if (options.color) {
    config.accentColor = options.color as ProjectConfig['accentColor'];
  }
  
  if (options.font) {
    config.font = options.font as ProjectConfig['font'];
  }
  
  if (options.icons) {
    config.icons = options.icons as ProjectConfig['icons'];
  }
  
  if (options.componentLib) {
    config.componentLibrary = options.componentLib as ProjectConfig['componentLibrary'];
  }
  
  // Testing mappings
  if (options.testing) {
    config.testing = parseCommaSeparated(options.testing.join?.(',') || options.testing as string) as ProjectConfig['testing'];
  }
  
  // DevOps mappings
  if (options.docker !== undefined) {
    config.docker = options.docker;
  }
  
  if (options.cicd) {
    config.cicd = options.cicd as ProjectConfig['cicd'];
  }
  
  if (options.webDeploy) {
    config.deployTarget = options.webDeploy as ProjectConfig['deployTarget'];
  }
  
  // KareTech Stack unique features
  if (options.pbs) {
    config.pbsLevel = options.pbs as ProjectConfig['pbsLevel'];
  }
  
  if (options.claudeHooks !== undefined) {
    config.claudeCodeHooks = options.claudeHooks;
  }
  
  if (options.beads !== undefined) {
    config.beadsIntegration = options.beads;
  }
  
  if (options.mcp) {
    config.mcpServers = parseCommaSeparated(options.mcp.join?.(',') || options.mcp as string) as ProjectConfig['mcpServers'];
  }
  
  if (options.analytics) {
    config.analytics = options.analytics as ProjectConfig['analytics'];
  }
  
  if (options.email) {
    config.email = options.email as ProjectConfig['email'];
  }
  
  if (options.errorTracking) {
    config.errorTracking = options.errorTracking as ProjectConfig['errorTracking'];
  }
  
  // Extras
  if (options.pwa !== undefined) {
    config.pwa = options.pwa;
  }
  
  if (options.featureFlags !== undefined) {
    config.featureFlags = options.featureFlags;
  }
  
  return config;
}

// Detect if explicit parameters are being used
export function hasExplicitParameters(options: EnhancedCliOptions): boolean {
  const explicitParams = [
    'frontend', 'backend', 'runtime', 'api', 'database', 'orm', 'auth',
    'theme', 'color', 'testing', 'docker', 'pbs', 'claudeHooks', 'beads',
    'addons', 'webDeploy', 'serverDeploy', 'yolo'
  ];
  
  return explicitParams.some(param => options[param as keyof EnhancedCliOptions] !== undefined);
}

// Generate usage examples
export function generateUsageExamples(): string[] {
  return [
    '# 🚀 GOLD STANDARD - Complete KareTech Stack with all features',
    'bun create karetech-stack@latest A \\',
    '  --frontend tanstack-router native-uniwind \\',
    '  --backend hono \\',
    '  --runtime bun \\',
    '  --api orpc \\',
    '  --auth better-auth \\',
    '  --payments none \\',
    '  --database postgres \\',
    '  --orm drizzle \\',
    '  --db-setup docker \\',
    '  --package-manager bun \\',
    '  --git \\',
    '  --web-deploy none \\',
    '  --server-deploy none \\',
    '  --install \\',
    '  --addons biome fumadocs husky lefthook pwa ruler tauri turborepo ultracite wxt \\',
    '  --examples none \\',
    '  --yolo',
    '',
    '# SaaS app with PostgreSQL and full AI workflow',
    'bun create karetech-stack@latest my-saas \\',
    '  --frontend tanstack-router \\',
    '  --backend hono \\',
    '  --database postgresql \\',
    '  --auth email,github \\',
    '  --theme maia \\',
    '  --testing playwright \\',
    '  --docker \\',
    '  --pbs full \\',
    '  --claude-hooks \\',
    '  --beads',
    '',
    '# E-commerce with Stripe',
    'bun create karetech-stack@latest my-store \\',
    '  --frontend next \\',
    '  --backend hono \\',
    '  --database postgresql \\',
    '  --auth email,google \\',
    '  --payments stripe \\',
    '  --testing playwright,vitest \\',
    '  --docker \\',
    '  --web-deploy vercel',
    '',
    '# Simple blog',
    'bun create karetech-stack@latest my-blog \\',
    '  --frontend tanstack-router \\',
    '  --database sqlite \\',
    '  --auth email \\',
    '  --theme lyra \\',
    '  --pbs docs',
    '',
    '# YOLO mode - use all defaults, be fast 🚀',
    'bun create karetech-stack@latest my-yolo-app --yolo',
    '',
    '# Or use presets for quick start',
    'bun create karetech-stack@latest my-app --preset saas'
  ];
}