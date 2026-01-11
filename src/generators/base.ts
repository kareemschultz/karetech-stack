/**
 * Base template generation system
 * Constitutional compliance: Enhanced Better-T-Stack with PBS integration
 */

import { promises as fs } from 'fs';
import { join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as ejs from 'ejs';
import { ProjectConfig, TemplateContext } from '../types';

// Better-T-Stack core dependencies with enhanced versions
const CORE_DEPENDENCIES = {
  // Runtime
  '@hono/node-server': '^1.13.1',
  'hono': '^4.6.10',
  'orpc': '^0.0.21',

  // Database
  'drizzle-orm': '^0.36.4',
  '@libsql/client': '^0.14.0',
  'postgres': '^3.4.5',

  // Auth
  'better-auth': '^1.0.1',
  'arctic': '^2.0.0',

  // Frontend
  '@tanstack/react-router': '^1.80.1',
  '@tanstack/react-query': '^5.61.0',
  'react': '^18.3.1',
  'react-dom': '^18.3.1',

  // UI
  '@radix-ui/react-slot': '^1.1.0',
  '@radix-ui/react-toast': '^1.2.2',
  'class-variance-authority': '^0.7.1',
  'clsx': '^2.1.1',
  'tailwind-merge': '^2.5.4',
  'lucide-react': '^0.462.0',

  // Validation
  'zod': '^3.23.8',

  // Utilities
  'dotenv': '^16.4.7',
  'tsx': '^4.19.2'
};

const DEV_DEPENDENCIES = {
  // Build tools
  '@types/node': '^22.9.0',
  '@types/react': '^18.3.12',
  '@types/react-dom': '^18.3.1',
  'typescript': '^5.6.3',

  // Development
  'vite': '^6.0.1',
  '@vitejs/plugin-react-swc': '^3.7.1',
  'tailwindcss': '^3.4.14',
  'autoprefixer': '^10.4.20',
  'postcss': '^8.4.49',

  // Linting
  '@typescript-eslint/eslint-plugin': '^8.15.0',
  '@typescript-eslint/parser': '^8.15.0',
  'eslint': '^9.15.0',
  'eslint-plugin-react-hooks': '^5.0.0',
  'eslint-plugin-react-refresh': '^0.4.14',

  // Drizzle
  'drizzle-kit': '^0.30.1'
};

/**
 * Enhanced dependency resolver based on configuration
 */
export function resolveDependencies(config: ProjectConfig): { dependencies: Record<string, string>; devDependencies: Record<string, string> } {
  const dependencies: Record<string, string> = { ...CORE_DEPENDENCIES };
  const devDependencies: Record<string, string> = { ...DEV_DEPENDENCIES };

  // Database-specific dependencies
  if (config.database === 'postgresql') {
    dependencies['pg'] = '^8.13.1';
    devDependencies['@types/pg'] = '^8.11.10';
    delete dependencies['@libsql/client'];
  } else if (config.database === 'turso') {
    // Turso uses @libsql/client (already included)
  } else if (config.database === 'sqlite') {
    dependencies['better-sqlite3'] = '^11.3.0';
    devDependencies['@types/better-sqlite3'] = '^7.6.11';
    delete dependencies['@libsql/client'];
    delete dependencies['postgres'];
  }

  // Auth provider dependencies
  if (config.auth.includes('oauth')) {
    dependencies['@auth/core'] = '^0.37.2';
  }

  if (config.auth.includes('github')) {
    dependencies['@octokit/rest'] = '^21.0.2';
  }

  // Component library dependencies
  if (config.componentLibrary === 'base-ui') {
    dependencies['@base-ui/react'] = '^1.0.0';
    // Base UI components work alongside Radix primitives for now
  }

  // Icon library dependencies
  if (config.icons === 'heroicons') {
    dependencies['@heroicons/react'] = '^2.2.0';
    delete dependencies['lucide-react'];
  } else if (config.icons === 'phosphor') {
    dependencies['phosphor-react'] = '^1.4.1';
    delete dependencies['lucide-react'];
  } else if (config.icons === 'hugeicons') {
    dependencies['hugeicons-react'] = '^0.3.0';
    delete dependencies['lucide-react'];
  }

  // Testing dependencies
  if (config.testing.includes('playwright')) {
    devDependencies['@playwright/test'] = '^1.48.2';
  }

  if (config.testing.includes('puppeteer')) {
    devDependencies['puppeteer'] = '^23.8.0';
  }

  if (config.testing.includes('vitest')) {
    devDependencies['vitest'] = '^2.1.5';
    devDependencies['@vitest/ui'] = '^2.1.5';
  }

  if (config.unitTesting) {
    devDependencies['@testing-library/react'] = '^16.0.1';
    devDependencies['@testing-library/jest-dom'] = '^6.6.3';
    devDependencies['@testing-library/user-event'] = '^14.5.2';
  }

  // Analytics dependencies
  if (config.analytics === 'vercel') {
    dependencies['@vercel/analytics'] = '^1.3.1';
  } else if (config.analytics === 'google') {
    dependencies['gtag'] = '^1.0.1';
  } else if (config.analytics === 'umami') {
    dependencies['@umami/node'] = '^0.68.0';
  }

  // Email dependencies
  if (config.email === 'resend') {
    dependencies['resend'] = '^4.0.1';
  } else if (config.email === 'sendgrid') {
    dependencies['@sendgrid/mail'] = '^8.1.4';
  } else if (config.email === 'nodemailer') {
    dependencies['nodemailer'] = '^6.9.16';
    devDependencies['@types/nodemailer'] = '^6.4.19';
  }

  // Error tracking dependencies
  if (config.errorTracking === 'sentry') {
    dependencies['@sentry/react'] = '^8.42.0';
  } else if (config.errorTracking === 'bugsnag') {
    dependencies['@bugsnag/js'] = '^8.1.1';
    dependencies['@bugsnag/plugin-react'] = '^8.1.1';
  } else if (config.errorTracking === 'rollbar') {
    dependencies['rollbar'] = '^2.26.4';
  }

  // Feature flags
  if (config.featureFlags) {
    dependencies['@vercel/flags'] = '^2.6.0';
  }

  // PWA dependencies
  if (config.pwa) {
    devDependencies['vite-plugin-pwa'] = '^0.21.1';
    devDependencies['workbox-window'] = '^7.3.0';
  }

  return { dependencies, devDependencies };
}

/**
 * Generate scripts based on configuration
 */
export function generateScripts(config: ProjectConfig): Record<string, string> {
  const baseScripts = {
    'dev': 'vite',
    'build': 'tsc && vite build',
    'preview': 'vite preview',
    'lint': 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
    'typecheck': 'tsc --noEmit'
  };

  const scripts: Record<string, string> = { ...baseScripts };

  // Database scripts
  if (config.database !== 'none') {
    scripts['db:generate'] = 'drizzle-kit generate';
    scripts['db:migrate'] = 'drizzle-kit migrate';
    scripts['db:studio'] = 'drizzle-kit studio';
    scripts['db:push'] = 'drizzle-kit push';
  }

  // Testing scripts
  if (config.testing.includes('playwright')) {
    scripts['test:e2e'] = 'playwright test';
    scripts['test:e2e:ui'] = 'playwright test --ui';
  }

  if (config.testing.includes('puppeteer')) {
    scripts['test:e2e:puppeteer'] = 'node scripts/e2e-puppeteer.js';
  }

  if (config.testing.includes('vitest') || config.unitTesting) {
    scripts['test'] = 'vitest';
    scripts['test:ui'] = 'vitest --ui';
    scripts['test:coverage'] = 'vitest --coverage';
  }

  // Development environment
  if (config.testing.length > 0) {
    scripts['test:all'] = 'bun run typecheck && bun test && bun run test:e2e';
  }

  // Docker scripts
  if (config.docker) {
    scripts['docker:build'] = 'docker build -t ' + config.projectName + ' .';
    scripts['docker:run'] = 'docker run -p 3000:3000 ' + config.projectName;
    scripts['docker:dev'] = 'docker-compose up --build';
  }

  return scripts;
}

/**
 * Create template context with all necessary data
 */
export function createTemplateContext(config: ProjectConfig): TemplateContext {
  const { dependencies, devDependencies } = resolveDependencies(config);
  const scripts = generateScripts(config);

  return {
    ...config,
    generatedAt: new Date().toISOString(),
    cliVersion: '0.1.0', // TODO: Read from package.json
    dependencies,
    devDependencies,
    scripts
  };
}

/**
 * Copy template files with EJS processing
 */
export async function processTemplate(templatePath: string, outputPath: string, context: TemplateContext): Promise<void> {
  const templateContent = await fs.readFile(templatePath, 'utf-8');

  // Process EJS template
  const processed = ejs.render(templateContent, context, {
    filename: templatePath,
    rmWhitespace: true
  });

  // Ensure directory exists
  const outputDir = resolve(outputPath, '..');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  await fs.writeFile(outputPath, processed, 'utf-8');
}

/**
 * Copy directory recursively with template processing
 */
export async function copyTemplateDirectory(templateDir: string, outputDir: string, context: TemplateContext): Promise<void> {
  if (!existsSync(templateDir)) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const entries = await fs.readdir(templateDir, { withFileTypes: true });

  for (const entry of entries) {
    const templatePath = join(templateDir, entry.name);
    const outputPath = join(outputDir, entry.name);

    if (entry.isDirectory()) {
      await copyTemplateDirectory(templatePath, outputPath, context);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.ejs')) {
        // Process EJS template and remove .ejs extension
        const finalOutputPath = outputPath.replace(/\.ejs$/, '');
        await processTemplate(templatePath, finalOutputPath, context);
      } else {
        // Copy file as-is
        await fs.copyFile(templatePath, outputPath);
      }
    }
  }
}

/**
 * Generate package.json for the project
 */
export async function generatePackageJson(projectDir: string, context: TemplateContext): Promise<void> {
  const packageJson = {
    name: context.projectName,
    version: '0.1.0',
    private: true,
    description: context.description,
    author: context.author,
    type: 'module',
    scripts: context.scripts,
    dependencies: context.dependencies,
    devDependencies: context.devDependencies,
    engines: {
      node: '>=18.0.0',
      bun: '>=1.0.0'
    },
    packageManager: 'bun@1.1.38'
  };

  const packageJsonPath = join(projectDir, 'package.json');
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
}

/**
 * Generate base project structure
 */
export async function generateBaseProject(config: ProjectConfig): Promise<void> {
  const context = createTemplateContext(config);
  const projectDir = resolve(process.cwd(), config.projectName);
  const templatesDir = resolve(__dirname, '../../templates');

  // Create project directory
  if (!existsSync(projectDir)) {
    mkdirSync(projectDir, { recursive: true });
  }

  // Generate package.json
  await generatePackageJson(projectDir, context);

  // Copy base template
  const baseTemplateDir = join(templatesDir, 'base');
  await copyTemplateDirectory(baseTemplateDir, projectDir, context);

  // Copy UI theme template
  const themeTemplateDir = join(templatesDir, 'themes', context.uiStyle);
  if (existsSync(themeTemplateDir)) {
    await copyTemplateDirectory(themeTemplateDir, projectDir, context);
  }

  // Copy component library specific templates if they exist
  if (context.componentLibrary) {
    const componentLibTemplateDir = join(templatesDir, 'component-libraries', context.componentLibrary);
    if (existsSync(componentLibTemplateDir)) {
      await copyTemplateDirectory(componentLibTemplateDir, projectDir, context);
    }
  }

  // Copy database-specific templates
  const dbTemplateDir = join(templatesDir, 'database', context.database);
  if (existsSync(dbTemplateDir)) {
    await copyTemplateDirectory(dbTemplateDir, projectDir, context);
  }

  // Copy auth templates
  for (const authProvider of context.auth) {
    const authTemplateDir = join(templatesDir, 'auth', authProvider);
    if (existsSync(authTemplateDir)) {
      await copyTemplateDirectory(authTemplateDir, projectDir, context);
    }
  }

  // Integrate MCP and Claude Code configurations
  if (config.pbsLevel !== 'none' || config.mcpServers.length > 0) {
    const { integrateTemplates } = await import('./template-integrator');
    await integrateTemplates(projectDir, config, context);
  }

  console.log(`✅ Base project structure generated in ${projectDir}`);
}

/**
 * Validate template structure
 */
export function validateTemplateStructure(templatesDir: string): string[] {
  const errors: string[] = [];

  // Required directories for core functionality
  const requiredDirs = [
    'base',
    'themes/default',
    'themes/maia',
    'themes/nova',
    'themes/vega',
    'themes/lyra',
    'themes/mira',
    'database/postgresql',
    'database/turso',
    'database/sqlite',
    'auth',
    'auth/email',
    'auth/oauth',
    'auth/github',
    'auth/magic-links',
    'testing/playwright',
    'testing/vitest',
    'testing/puppeteer',
    'devops/docker',
    'devops/github',
    'mcp',
    'mcp/servers',
    // MCP server-specific templates
    'mcp/postgresql',
    'mcp/turso',
    'mcp/sqlite',
    'mcp/github',
    'mcp/playwright',
    'mcp/filesystem',
    // Claude Code templates
    'claude-code/settings',
    'claude-code/hooks',
    'claude-code/agents',
    'claude-code/skills',
    'pbs'
  ];

  for (const dir of requiredDirs) {
    const fullPath = join(templatesDir, dir);
    if (!existsSync(fullPath)) {
      errors.push(`Missing required template directory: ${dir}`);
    }
  }

  // Validate required template files exist
  const requiredFiles = [
    'base/package.json.ejs',
    'base/tsconfig.json.ejs',
    'base/vite.config.ts.ejs',
    'mcp/settings.json.ejs'
  ];

  for (const file of requiredFiles) {
    const fullPath = join(templatesDir, file);
    if (!existsSync(fullPath)) {
      errors.push(`Missing required template file: ${file}`);
    }
  }

  return errors;
}