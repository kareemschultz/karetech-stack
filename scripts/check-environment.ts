#!/usr/bin/env bun
/**
 * Development Environment Checker
 * Validates that all required tools and configurations are in place
 * for parallel development work on KareTech Stack
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
  version?: string;
}

const results: CheckResult[] = [];

function log(emoji: string, message: string): void {
  console.log(`${emoji} ${message}`);
}

function checkCommand(name: string, command: string, minVersion?: string): CheckResult {
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    const version = output.match(/\d+\.\d+\.\d+/)?.[0] || output;

    return {
      name,
      status: 'pass',
      message: `${name} is installed`,
      version
    };
  } catch {
    return {
      name,
      status: 'fail',
      message: `${name} is not installed or not in PATH`
    };
  }
}

function checkFile(name: string, path: string, required = true): CheckResult {
  const fullPath = join(process.cwd(), path);
  const exists = existsSync(fullPath);

  return {
    name,
    status: exists ? 'pass' : (required ? 'fail' : 'warn'),
    message: exists ? `${path} exists` : `${path} not found`
  };
}

function checkDirectory(name: string, path: string): CheckResult {
  const fullPath = join(process.cwd(), path);
  const exists = existsSync(fullPath);

  return {
    name,
    status: exists ? 'pass' : 'fail',
    message: exists ? `${path}/ exists` : `${path}/ not found`
  };
}

async function main(): Promise<void> {
  console.log('\n🔍 KareTech Stack Development Environment Check\n');
  console.log('='.repeat(60));

  // Runtime checks
  console.log('\n📦 Runtime Environment:\n');

  results.push(checkCommand('Bun', 'bun --version'));
  results.push(checkCommand('Node.js', 'node --version'));
  results.push(checkCommand('Git', 'git --version'));
  results.push(checkCommand('TypeScript', 'npx tsc --version'));

  for (const result of results.slice(-4)) {
    const emoji = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';
    log(emoji, `${result.name}: ${result.version || result.message}`);
  }

  // Optional tools
  console.log('\n🛠️  Optional Tools:\n');

  const optionalTools = [
    checkCommand('Docker', 'docker --version'),
    checkCommand('GitHub CLI', 'gh --version'),
    checkCommand('ESLint', 'npx eslint --version'),
    checkCommand('Prettier', 'npx prettier --version'),
  ];

  for (const result of optionalTools) {
    results.push(result);
    const emoji = result.status === 'pass' ? '✅' : '⚠️';
    log(emoji, `${result.name}: ${result.version || result.message}`);
  }

  // Project structure checks
  console.log('\n📁 Project Structure:\n');

  const structureChecks = [
    checkFile('Package.json', 'package.json'),
    checkFile('TypeScript Config', 'tsconfig.json'),
    checkDirectory('Source Directory', 'src'),
    checkDirectory('Templates Directory', 'templates'),
    checkDirectory('MCP Module', 'src/mcp'),
    checkDirectory('Generators Module', 'src/generators'),
    checkDirectory('Tests Directory', 'tests'),
    checkDirectory('Scripts Directory', 'scripts'),
  ];

  for (const result of structureChecks) {
    results.push(result);
    const emoji = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';
    log(emoji, result.message);
  }

  // Configuration checks
  console.log('\n⚙️  Configuration Files:\n');

  const configChecks = [
    checkFile('Claude Settings', '.claude/settings.json'),
    checkFile('ESLint Config', '.eslintrc.json', false),
    checkFile('Prettier Config', '.prettierrc', false),
    checkFile('Git Ignore', '.gitignore'),
    checkFile('CLAUDE.md', 'CLAUDE.md'),
  ];

  for (const result of configChecks) {
    results.push(result);
    const emoji = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';
    log(emoji, result.message);
  }

  // Dependencies check
  console.log('\n📚 Dependencies:\n');

  const nodeModulesExists = existsSync(join(process.cwd(), 'node_modules'));
  results.push({
    name: 'Dependencies Installed',
    status: nodeModulesExists ? 'pass' : 'fail',
    message: nodeModulesExists ? 'node_modules exists' : 'Run "bun install" to install dependencies'
  });

  log(nodeModulesExists ? '✅' : '❌', nodeModulesExists ? 'Dependencies installed' : 'Dependencies not installed - run "bun install"');

  // Check bun.lock
  const bunLockExists = existsSync(join(process.cwd(), 'bun.lock'));
  results.push({
    name: 'Lock File',
    status: bunLockExists ? 'pass' : 'warn',
    message: bunLockExists ? 'bun.lock exists' : 'bun.lock not found'
  });

  log(bunLockExists ? '✅' : '⚠️', bunLockExists ? 'bun.lock exists' : 'bun.lock not found');

  // Git status
  console.log('\n🔀 Git Status:\n');

  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
    const uncommitted = status ? status.split('\n').length : 0;

    log('✅', `Current branch: ${branch}`);
    log(uncommitted > 0 ? '⚠️' : '✅', uncommitted > 0 ? `${uncommitted} uncommitted changes` : 'Working tree clean');

    results.push({
      name: 'Git Branch',
      status: 'pass',
      message: `On branch: ${branch}`,
      version: branch
    });
  } catch {
    log('❌', 'Not a git repository or git not available');
    results.push({
      name: 'Git Status',
      status: 'fail',
      message: 'Git not available or not a repository'
    });
  }

  // MCP configuration check
  console.log('\n🔌 MCP Configuration:\n');

  const mcpModuleExists = existsSync(join(process.cwd(), 'src/mcp'));
  const mcpTypesExists = existsSync(join(process.cwd(), 'src/mcp/types.ts'));
  const mcpRegistryExists = existsSync(join(process.cwd(), 'src/mcp/registry.ts'));

  log(mcpModuleExists ? '✅' : '❌', `MCP module: ${mcpModuleExists ? 'present' : 'missing'}`);
  log(mcpTypesExists ? '✅' : '❌', `MCP types: ${mcpTypesExists ? 'present' : 'missing'}`);
  log(mcpRegistryExists ? '✅' : '❌', `MCP registry: ${mcpRegistryExists ? 'present' : 'missing'}`);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Summary:\n');

  const passed = results.filter(r => r.status === 'pass').length;
  const warned = results.filter(r => r.status === 'warn').length;
  const failed = results.filter(r => r.status === 'fail').length;

  log('✅', `Passed: ${passed}`);
  log('⚠️', `Warnings: ${warned}`);
  log('❌', `Failed: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ Some required checks failed. Please fix the issues above.\n');
    process.exit(1);
  } else if (warned > 0) {
    console.log('\n⚠️  Environment ready with some warnings.\n');
    process.exit(0);
  } else {
    console.log('\n✅ Development environment is fully configured!\n');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Error running environment check:', error);
  process.exit(1);
});
