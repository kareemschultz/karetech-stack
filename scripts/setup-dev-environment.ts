#!/usr/bin/env bun
/**
 * Development Environment Setup Script
 * Initializes and configures the development environment for KareTech Stack
 */

import { execSync, spawnSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

function log(emoji: string, message: string): void {
  console.log(`${emoji} ${message}`);
}

function runCommand(command: string, description: string): boolean {
  log('🔄', `${description}...`);
  try {
    execSync(command, { encoding: 'utf-8', stdio: 'inherit' });
    log('✅', `${description} completed`);
    return true;
  } catch (error) {
    log('❌', `${description} failed`);
    return false;
  }
}

function ensureDirectory(path: string): void {
  const fullPath = join(process.cwd(), path);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
    log('📁', `Created directory: ${path}`);
  }
}

async function main(): Promise<void> {
  console.log('\n🚀 KareTech Stack Development Environment Setup\n');
  console.log('='.repeat(60));

  // Check prerequisites
  console.log('\n📋 Checking Prerequisites:\n');

  const bunVersion = spawnSync('bun', ['--version'], { encoding: 'utf-8' });
  if (bunVersion.status !== 0) {
    log('❌', 'Bun is required but not installed. Please install Bun first: https://bun.sh');
    process.exit(1);
  }
  log('✅', `Bun ${bunVersion.stdout.trim()} detected`);

  const gitVersion = spawnSync('git', ['--version'], { encoding: 'utf-8' });
  if (gitVersion.status !== 0) {
    log('❌', 'Git is required but not installed. Please install Git first.');
    process.exit(1);
  }
  log('✅', `Git detected`);

  // Install dependencies
  console.log('\n📦 Installing Dependencies:\n');

  if (!existsSync(join(process.cwd(), 'node_modules'))) {
    runCommand('bun install', 'Installing dependencies');
  } else {
    log('✅', 'Dependencies already installed');
  }

  // Ensure required directories exist
  console.log('\n📁 Setting Up Directory Structure:\n');

  const directories = [
    'scripts',
    'dist',
    'coverage',
    '.claude/hooks',
    '.claude/agents',
    '.claude/commands',
    'docs/MCP',
    'docs/ADR',
    'docs/TECH',
    'templates/mcp',
  ];

  for (const dir of directories) {
    ensureDirectory(dir);
  }

  // Create ESLint config if missing
  console.log('\n⚙️  Setting Up Configuration Files:\n');

  const eslintConfigPath = join(process.cwd(), '.eslintrc.json');
  if (!existsSync(eslintConfigPath)) {
    const eslintConfig = {
      root: true,
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      env: {
        node: true,
        es2022: true
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error'
      },
      ignorePatterns: ['dist/', 'node_modules/', 'templates/']
    };

    writeFileSync(eslintConfigPath, JSON.stringify(eslintConfig, null, 2) + '\n');
    log('✅', 'Created .eslintrc.json');
  } else {
    log('✅', '.eslintrc.json already exists');
  }

  // Create Prettier config if missing
  const prettierConfigPath = join(process.cwd(), '.prettierrc');
  if (!existsSync(prettierConfigPath)) {
    const prettierConfig = {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      printWidth: 100,
      bracketSpacing: true
    };

    writeFileSync(prettierConfigPath, JSON.stringify(prettierConfig, null, 2) + '\n');
    log('✅', 'Created .prettierrc');
  } else {
    log('✅', '.prettierrc already exists');
  }

  // Create .env.example if missing
  const envExamplePath = join(process.cwd(), '.env.example');
  if (!existsSync(envExamplePath)) {
    const envExample = `# KareTech Stack Development Environment
# Copy this file to .env.local and fill in your values

# GitHub Personal Access Token (for GitHub MCP server)
# Get your token at: https://github.com/settings/tokens
# Required scopes: repo, read:org, read:user
GITHUB_TOKEN=ghp_your_github_personal_access_token

# Database URL (for PostgreSQL MCP server)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karetech_dev

# Development Mode
NODE_ENV=development

# Debugging
DEBUG=false
`;

    writeFileSync(envExamplePath, envExample);
    log('✅', 'Created .env.example');
  } else {
    log('✅', '.env.example already exists');
  }

  // Create VS Code settings if .vscode exists
  const vscodeDir = join(process.cwd(), '.vscode');
  const vscodeSettingsPath = join(vscodeDir, 'settings.json');

  if (!existsSync(vscodeSettingsPath)) {
    ensureDirectory('.vscode');
    const vscodeSettings = {
      'typescript.tsdk': 'node_modules/typescript/lib',
      'editor.formatOnSave': true,
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      '[typescript]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode'
      },
      'eslint.enable': true,
      'eslint.validate': ['typescript'],
      'files.exclude': {
        'node_modules': true,
        'dist': true,
        '.bun': true
      }
    };

    writeFileSync(vscodeSettingsPath, JSON.stringify(vscodeSettings, null, 2) + '\n');
    log('✅', 'Created .vscode/settings.json');
  } else {
    log('✅', '.vscode/settings.json already exists');
  }

  // Verify TypeScript
  console.log('\n🔍 Verifying TypeScript Configuration:\n');

  const typecheckResult = spawnSync('bun', ['run', 'typecheck'], { encoding: 'utf-8' });
  if (typecheckResult.status === 0) {
    log('✅', 'TypeScript compilation check passed');
  } else {
    log('⚠️', 'TypeScript has some issues - run "bun run typecheck" to see details');
  }

  // Run environment check
  console.log('\n🔍 Running Environment Check:\n');

  try {
    execSync('bun run scripts/check-environment.ts', { stdio: 'inherit' });
  } catch {
    // check-environment might exit with non-zero for warnings
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n🎉 Development Environment Setup Complete!\n');
  console.log('Next steps:');
  console.log('  1. Copy .env.example to .env.local and configure your tokens');
  console.log('  2. Run "bun run dev" to start development');
  console.log('  3. Run "bun run validate:quick" to check your changes');
  console.log('  4. Run "bun run mcp:validate" to validate MCP configuration');
  console.log('\nHappy coding! 🚀\n');
}

main().catch(error => {
  console.error('Error setting up environment:', error);
  process.exit(1);
});
