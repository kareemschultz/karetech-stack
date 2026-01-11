#!/usr/bin/env bun
/**
 * Release Preparation Script for create-karetech-stack
 *
 * This script prepares the package for release by:
 * 1. Validating the codebase
 * 2. Running all tests
 * 3. Building the package
 * 4. Updating CHANGELOG.md
 * 5. Generating release notes
 *
 * Usage:
 *   bun run scripts/prepare-release.ts
 *   bun run scripts/prepare-release.ts --version 0.2.0
 *   bun run scripts/prepare-release.ts --type patch|minor|major
 *   bun run scripts/prepare-release.ts --dry-run
 */

import { $ } from 'bun';
import { readFile, writeFile, access } from 'fs/promises';
import { join } from 'path';

interface ReleaseConfig {
  version?: string;
  type?: 'patch' | 'minor' | 'major';
  dryRun: boolean;
  skipTests: boolean;
  skipBuild: boolean;
}

interface PackageJson {
  name: string;
  version: string;
  [key: string]: unknown;
}

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message: string, color: keyof typeof colors = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step: string, message: string): void {
  console.log(`${colors.cyan}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message: string): void {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message: string): void {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logWarning(message: string): void {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function parseArgs(): ReleaseConfig {
  const args = process.argv.slice(2);
  const config: ReleaseConfig = {
    dryRun: false,
    skipTests: false,
    skipBuild: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--version':
      case '-v':
        config.version = args[++i];
        break;
      case '--type':
      case '-t':
        config.type = args[++i] as 'patch' | 'minor' | 'major';
        break;
      case '--dry-run':
      case '-d':
        config.dryRun = true;
        break;
      case '--skip-tests':
        config.skipTests = true;
        break;
      case '--skip-build':
        config.skipBuild = true;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
    }
  }

  return config;
}

function printHelp(): void {
  console.log(`
${colors.bold}create-karetech-stack Release Preparation${colors.reset}

${colors.cyan}Usage:${colors.reset}
  bun run scripts/prepare-release.ts [options]

${colors.cyan}Options:${colors.reset}
  --version, -v <version>  Set specific version (e.g., 0.2.0)
  --type, -t <type>        Version bump type (patch, minor, major)
  --dry-run, -d            Preview changes without applying
  --skip-tests             Skip running tests
  --skip-build             Skip building the package
  --help, -h               Show this help message

${colors.cyan}Examples:${colors.reset}
  bun run scripts/prepare-release.ts --type patch
  bun run scripts/prepare-release.ts --version 1.0.0
  bun run scripts/prepare-release.ts --dry-run --type minor

${colors.cyan}Version Types:${colors.reset}
  patch  - Bug fixes (0.1.0 -> 0.1.1)
  minor  - New features (0.1.0 -> 0.2.0)
  major  - Breaking changes (0.1.0 -> 1.0.0)
`);
}

function incrementVersion(
  currentVersion: string,
  type: 'patch' | 'minor' | 'major'
): string {
  const parts = currentVersion.split('.').map(Number);

  switch (type) {
    case 'major':
      return `${parts[0] + 1}.0.0`;
    case 'minor':
      return `${parts[0]}.${parts[1] + 1}.0`;
    case 'patch':
      return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
  }
}

async function getPackageJson(): Promise<PackageJson> {
  const content = await readFile('package.json', 'utf-8');
  return JSON.parse(content);
}

async function updatePackageJson(version: string): Promise<void> {
  const pkg = await getPackageJson();
  pkg.version = version;
  await writeFile('package.json', JSON.stringify(pkg, null, 2) + '\n');
}

async function getGitChanges(): Promise<string[]> {
  const result = await $`git log --oneline --no-decorate HEAD...$(git describe --tags --abbrev=0 2>/dev/null || echo HEAD~10) 2>/dev/null || git log --oneline -10`.quiet();
  return result.stdout.toString().trim().split('\n').filter(Boolean);
}

async function generateChangelog(
  version: string,
  changes: string[]
): Promise<string> {
  const date = new Date().toISOString().split('T')[0];

  const categorizedChanges = {
    features: [] as string[],
    fixes: [] as string[],
    docs: [] as string[],
    chore: [] as string[],
    other: [] as string[],
  };

  for (const change of changes) {
    const message = change.replace(/^[a-f0-9]+\s+/, '');
    if (message.startsWith('feat:') || message.startsWith('feat(')) {
      categorizedChanges.features.push(message);
    } else if (message.startsWith('fix:') || message.startsWith('fix(')) {
      categorizedChanges.fixes.push(message);
    } else if (message.startsWith('docs:') || message.startsWith('docs(')) {
      categorizedChanges.docs.push(message);
    } else if (message.startsWith('chore:') || message.startsWith('chore(')) {
      categorizedChanges.chore.push(message);
    } else {
      categorizedChanges.other.push(message);
    }
  }

  let changelog = `## [${version}] - ${date}\n\n`;

  if (categorizedChanges.features.length > 0) {
    changelog += `### Features\n\n`;
    for (const feat of categorizedChanges.features) {
      changelog += `- ${feat.replace(/^feat(\([^)]+\))?:\s*/, '')}\n`;
    }
    changelog += '\n';
  }

  if (categorizedChanges.fixes.length > 0) {
    changelog += `### Bug Fixes\n\n`;
    for (const fix of categorizedChanges.fixes) {
      changelog += `- ${fix.replace(/^fix(\([^)]+\))?:\s*/, '')}\n`;
    }
    changelog += '\n';
  }

  if (categorizedChanges.docs.length > 0) {
    changelog += `### Documentation\n\n`;
    for (const doc of categorizedChanges.docs) {
      changelog += `- ${doc.replace(/^docs(\([^)]+\))?:\s*/, '')}\n`;
    }
    changelog += '\n';
  }

  if (categorizedChanges.chore.length > 0) {
    changelog += `### Maintenance\n\n`;
    for (const chore of categorizedChanges.chore) {
      changelog += `- ${chore.replace(/^chore(\([^)]+\))?:\s*/, '')}\n`;
    }
    changelog += '\n';
  }

  return changelog;
}

async function updateChangelogFile(newEntry: string): Promise<void> {
  const changelogPath = 'docs/CHANGELOG.md';
  let content = '';

  if (await fileExists(changelogPath)) {
    content = await readFile(changelogPath, 'utf-8');
  } else {
    content = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`;
  }

  // Insert new entry after the header
  const headerEnd = content.indexOf('\n\n## ');
  if (headerEnd !== -1) {
    content = content.slice(0, headerEnd) + '\n\n' + newEntry + content.slice(headerEnd + 2);
  } else {
    content += newEntry;
  }

  await writeFile(changelogPath, content);
}

async function generateReleaseNotes(
  version: string,
  changes: string[]
): Promise<string> {
  const pkg = await getPackageJson();

  let notes = `# Release ${version}

## Installation

\`\`\`bash
bunx ${pkg.name} my-app
\`\`\`

## What's Changed

`;

  for (const change of changes.slice(0, 20)) {
    const message = change.replace(/^[a-f0-9]+\s+/, '');
    notes += `- ${message}\n`;
  }

  if (changes.length > 20) {
    notes += `\n...and ${changes.length - 20} more changes\n`;
  }

  notes += `
## Full Changelog

See [CHANGELOG.md](https://github.com/kareemschultz/karetech-stack/blob/main/docs/CHANGELOG.md)
`;

  return notes;
}

async function runTests(): Promise<boolean> {
  try {
    logStep('TEST', 'Running type check...');
    await $`bun run typecheck`.quiet();
    logSuccess('Type check passed');

    logStep('TEST', 'Running linter...');
    await $`bun run lint`.quiet();
    logSuccess('Lint passed');

    logStep('TEST', 'Running unit tests...');
    await $`bun run test`.quiet();
    logSuccess('Unit tests passed');

    return true;
  } catch (error) {
    logError('Tests failed');
    return false;
  }
}

async function runBuild(): Promise<boolean> {
  try {
    logStep('BUILD', 'Cleaning previous build...');
    await $`rm -rf dist`.quiet();

    logStep('BUILD', 'Building package...');
    await $`bun run build:all`.quiet();
    logSuccess('Build completed');

    // Verify build output
    if (!(await fileExists('dist/index.js'))) {
      logError('Build verification failed: dist/index.js not found');
      return false;
    }

    return true;
  } catch (error) {
    logError('Build failed');
    return false;
  }
}

async function checkGitStatus(): Promise<{
  clean: boolean;
  branch: string;
}> {
  const status = await $`git status --porcelain`.quiet();
  const branch = (await $`git branch --show-current`.quiet()).stdout
    .toString()
    .trim();

  return {
    clean: status.stdout.toString().trim() === '',
    branch,
  };
}

async function main(): Promise<void> {
  console.log(`
${colors.bold}${colors.cyan}╔══════════════════════════════════════════════════════════════╗
║         create-karetech-stack Release Preparation           ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}
`);

  const config = parseArgs();
  const pkg = await getPackageJson();

  log(`Current version: ${colors.bold}${pkg.version}${colors.reset}`);

  // Determine new version
  let newVersion: string;
  if (config.version) {
    newVersion = config.version;
  } else if (config.type) {
    newVersion = incrementVersion(pkg.version, config.type);
  } else {
    newVersion = incrementVersion(pkg.version, 'patch');
    logWarning('No version specified, defaulting to patch bump');
  }

  log(`New version: ${colors.bold}${colors.green}${newVersion}${colors.reset}`);

  if (config.dryRun) {
    log(`\n${colors.yellow}DRY RUN MODE - No changes will be made${colors.reset}\n`);
  }

  // Check git status
  const gitStatus = await checkGitStatus();
  log(`Branch: ${colors.bold}${gitStatus.branch}${colors.reset}`);

  if (!gitStatus.clean) {
    logWarning('Working directory has uncommitted changes');
  }

  // Run tests
  if (!config.skipTests) {
    log(`\n${colors.bold}Running Tests${colors.reset}`);
    const testsPass = await runTests();
    if (!testsPass && !config.dryRun) {
      logError('Aborting release due to test failures');
      process.exit(1);
    }
  } else {
    logWarning('Skipping tests');
  }

  // Run build
  if (!config.skipBuild) {
    log(`\n${colors.bold}Building Package${colors.reset}`);
    const buildSuccess = await runBuild();
    if (!buildSuccess && !config.dryRun) {
      logError('Aborting release due to build failure');
      process.exit(1);
    }
  } else {
    logWarning('Skipping build');
  }

  // Get git changes for changelog
  log(`\n${colors.bold}Generating Changelog${colors.reset}`);
  const changes = await getGitChanges();
  logStep('CHANGELOG', `Found ${changes.length} commits since last release`);

  const changelogEntry = await generateChangelog(newVersion, changes);

  if (config.dryRun) {
    log(`\n${colors.bold}Preview: Changelog Entry${colors.reset}`);
    console.log(changelogEntry);
  } else {
    await updateChangelogFile(changelogEntry);
    logSuccess('Updated CHANGELOG.md');
  }

  // Generate release notes
  const releaseNotes = await generateReleaseNotes(newVersion, changes);
  const releaseNotesPath = join('scripts', 'RELEASE_NOTES.md');

  if (config.dryRun) {
    log(`\n${colors.bold}Preview: Release Notes${colors.reset}`);
    console.log(releaseNotes);
  } else {
    await writeFile(releaseNotesPath, releaseNotes);
    logSuccess(`Generated release notes at ${releaseNotesPath}`);
  }

  // Update package.json version
  if (!config.dryRun) {
    await updatePackageJson(newVersion);
    logSuccess(`Updated package.json to version ${newVersion}`);
  }

  // Summary
  console.log(`
${colors.bold}${colors.green}╔══════════════════════════════════════════════════════════════╗
║                    Release Preparation Complete              ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.bold}Summary:${colors.reset}
  Version: ${pkg.version} → ${colors.green}${newVersion}${colors.reset}
  Changelog: ${config.dryRun ? 'Preview only' : 'Updated'}
  Release Notes: ${config.dryRun ? 'Preview only' : 'Generated'}

${colors.bold}Next Steps:${colors.reset}
  ${config.dryRun ? '1. Run without --dry-run to apply changes' : '1. Review the generated files'}
  2. Commit changes: ${colors.cyan}git add -A && git commit -m "chore: prepare release ${newVersion}"${colors.reset}
  3. Create tag: ${colors.cyan}git tag v${newVersion}${colors.reset}
  4. Push with tags: ${colors.cyan}git push origin main --tags${colors.reset}
  5. Create GitHub release (triggers npm publish)

${colors.bold}Quick Release:${colors.reset}
  ${colors.cyan}git add -A && git commit -m "chore: release ${newVersion}" && git tag v${newVersion} && git push origin main --tags${colors.reset}
`);
}

main().catch((error) => {
  logError(`Release preparation failed: ${error.message}`);
  process.exit(1);
});
