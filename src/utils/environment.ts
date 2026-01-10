/**
 * Development environment testing and validation utilities
 * Ensures all tooling works end-to-end per constitutional requirements
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

// Environment check result interface
export interface EnvironmentCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  version?: string;
  message: string;
  required: boolean;
}

// Complete environment report
export interface EnvironmentReport {
  overall: 'pass' | 'fail' | 'warning';
  checks: EnvironmentCheck[];
  summary: {
    passed: number;
    failed: number;
    warnings: number;
    total: number;
  };
}

/**
 * Execute command safely and return result
 */
function safeExec(command: string): { success: boolean; output: string } {
  try {
    const output = execSync(command, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 5000
    }).trim();
    return { success: true, output };
  } catch (error) {
    return {
      success: false,
      output: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Check if a command exists
 */
function commandExists(command: string): boolean {
  const result = safeExec(`which ${command}`);
  return result.success;
}

/**
 * Check Bun runtime and package manager
 */
export function checkBun(): EnvironmentCheck {
  const result = safeExec('bun --version');

  if (!result.success) {
    return {
      name: 'Bun Runtime',
      status: 'fail',
      message: 'Bun is not installed or not in PATH. Constitutional requirement.',
      required: true
    };
  }

  const version = result.output;
  const majorVersion = parseFloat(version);

  if (majorVersion < 1.0) {
    return {
      name: 'Bun Runtime',
      status: 'warning',
      version,
      message: 'Bun version is below 1.0. Consider upgrading.',
      required: true
    };
  }

  return {
    name: 'Bun Runtime',
    status: 'pass',
    version,
    message: 'Bun runtime is properly installed and ready',
    required: true
  };
}

/**
 * Check TypeScript compiler
 */
export function checkTypeScript(): EnvironmentCheck {
  // Check if TypeScript is available in project
  const result = safeExec('bun run typecheck');

  if (!result.success) {
    return {
      name: 'TypeScript',
      status: 'fail',
      message: 'TypeScript compilation failed. Constitutional requirement.',
      required: true
    };
  }

  return {
    name: 'TypeScript',
    status: 'pass',
    message: 'TypeScript compilation successful',
    required: true
  };
}

/**
 * Check Node.js (for compatibility)
 */
export function checkNode(): EnvironmentCheck {
  const result = safeExec('node --version');

  if (!result.success) {
    return {
      name: 'Node.js',
      status: 'warning',
      message: 'Node.js not found. Some tools may require Node.js.',
      required: false
    };
  }

  const version = result.output;
  const majorVersion = parseInt(version.substring(1));

  if (majorVersion < 18) {
    return {
      name: 'Node.js',
      status: 'warning',
      version,
      message: 'Node.js version is below 18. Consider upgrading for better compatibility.',
      required: false
    };
  }

  return {
    name: 'Node.js',
    status: 'pass',
    version,
    message: 'Node.js is available for compatibility',
    required: false
  };
}

/**
 * Check Git version control
 */
export function checkGit(): EnvironmentCheck {
  const result = safeExec('git --version');

  if (!result.success) {
    return {
      name: 'Git',
      status: 'fail',
      message: 'Git is not installed. Required for version control.',
      required: true
    };
  }

  // Check if we're in a git repository
  const repoCheck = safeExec('git status');

  if (!repoCheck.success) {
    return {
      name: 'Git',
      status: 'warning',
      version: result.output.split(' ')[2],
      message: 'Git is installed but current directory is not a git repository',
      required: true
    };
  }

  return {
    name: 'Git',
    status: 'pass',
    version: result.output.split(' ')[2],
    message: 'Git is properly configured and repository is initialized',
    required: true
  };
}

/**
 * Check Beads issue tracking
 */
export function checkBeads(): EnvironmentCheck {
  const result = safeExec('bd --version');

  if (!result.success) {
    return {
      name: 'Beads CLI',
      status: 'fail',
      message: 'Beads CLI is not installed. Required for PBS workflow.',
      required: true
    };
  }

  // Check if Beads is initialized in project
  if (!existsSync('.beads')) {
    return {
      name: 'Beads CLI',
      status: 'warning',
      version: result.output.split(' ')[2],
      message: 'Beads CLI installed but not initialized in project',
      required: true
    };
  }

  return {
    name: 'Beads CLI',
    status: 'pass',
    version: result.output.split(' ')[2],
    message: 'Beads CLI is properly installed and initialized',
    required: true
  };
}

/**
 * Check GitHub CLI (for GitHub integration)
 */
export function checkGitHubCLI(): EnvironmentCheck {
  const result = safeExec('gh --version');

  if (!result.success) {
    return {
      name: 'GitHub CLI',
      status: 'warning',
      message: 'GitHub CLI not installed. Useful for GitHub integration.',
      required: false
    };
  }

  // Check authentication
  const authCheck = safeExec('gh auth status');

  if (!authCheck.success) {
    return {
      name: 'GitHub CLI',
      status: 'warning',
      version: result.output.split(' ')[2],
      message: 'GitHub CLI installed but not authenticated',
      required: false
    };
  }

  return {
    name: 'GitHub CLI',
    status: 'pass',
    version: result.output.split(' ')[2],
    message: 'GitHub CLI is properly authenticated and ready',
    required: false
  };
}

/**
 * Check project structure
 */
export function checkProjectStructure(): EnvironmentCheck {
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'src/index.ts',
    'docs/PBS_MASTER_SYSTEM.md',
    'docs/FORK_PLAN.md',
    'constitution.md',
    'CLAUDE.md'
  ];

  const missingFiles = requiredFiles.filter(file => !existsSync(file));

  if (missingFiles.length > 0) {
    return {
      name: 'Project Structure',
      status: 'fail',
      message: `Missing required files: ${missingFiles.join(', ')}`,
      required: true
    };
  }

  const requiredDirs = [
    'src',
    'docs',
    'templates',
    '.beads',
    '.claude'
  ];

  const missingDirs = requiredDirs.filter(dir => !existsSync(dir));

  if (missingDirs.length > 0) {
    return {
      name: 'Project Structure',
      status: 'warning',
      message: `Missing directories: ${missingDirs.join(', ')}`,
      required: true
    };
  }

  return {
    name: 'Project Structure',
    status: 'pass',
    message: 'All required files and directories are present',
    required: true
  };
}

/**
 * Check CLI functionality
 */
export function checkCLI(): EnvironmentCheck {
  // Test basic CLI help
  const helpResult = safeExec('bun run dev --help');

  if (!helpResult.success) {
    return {
      name: 'CLI Functionality',
      status: 'fail',
      message: 'CLI help command failed',
      required: true
    };
  }

  // Test CLI version
  const versionResult = safeExec('bun run dev --version');

  if (!versionResult.success) {
    return {
      name: 'CLI Functionality',
      status: 'warning',
      message: 'CLI version command failed',
      required: true
    };
  }

  return {
    name: 'CLI Functionality',
    status: 'pass',
    message: 'CLI is functional and responsive',
    required: true
  };
}

/**
 * Check build system
 */
export function checkBuildSystem(): EnvironmentCheck {
  const buildResult = safeExec('bun run build');

  if (!buildResult.success) {
    return {
      name: 'Build System',
      status: 'fail',
      message: 'Build command failed',
      required: true
    };
  }

  // Check if build output exists
  if (!existsSync('dist/index.js')) {
    return {
      name: 'Build System',
      status: 'fail',
      message: 'Build completed but no output file generated',
      required: true
    };
  }

  return {
    name: 'Build System',
    status: 'pass',
    message: 'Build system is working correctly',
    required: true
  };
}

/**
 * Run comprehensive environment check
 */
export function runEnvironmentCheck(): EnvironmentReport {
  const checks: EnvironmentCheck[] = [
    checkBun(),
    checkTypeScript(),
    checkNode(),
    checkGit(),
    checkBeads(),
    checkGitHubCLI(),
    checkProjectStructure(),
    checkCLI(),
    checkBuildSystem()
  ];

  const summary = {
    passed: checks.filter(c => c.status === 'pass').length,
    failed: checks.filter(c => c.status === 'fail').length,
    warnings: checks.filter(c => c.status === 'warning').length,
    total: checks.length
  };

  // Determine overall status
  let overall: 'pass' | 'fail' | 'warning';

  const requiredFailures = checks.filter(c => c.required && c.status === 'fail').length;

  if (requiredFailures > 0) {
    overall = 'fail';
  } else if (summary.warnings > 0) {
    overall = 'warning';
  } else {
    overall = 'pass';
  }

  return {
    overall,
    checks,
    summary
  };
}

/**
 * Print environment report to console
 */
export function printEnvironmentReport(report: EnvironmentReport): void {
  console.log('\n🔍 Development Environment Check\n');

  report.checks.forEach(check => {
    const icon = check.status === 'pass' ? '✅' :
                 check.status === 'fail' ? '❌' : '⚠️';

    const version = check.version ? ` (v${check.version})` : '';
    const required = check.required ? '' : ' [optional]';

    console.log(`${icon} ${check.name}${version}${required}`);
    console.log(`   ${check.message}`);
    console.log();
  });

  console.log('📊 Summary:');
  console.log(`   ✅ Passed: ${report.summary.passed}`);
  console.log(`   ❌ Failed: ${report.summary.failed}`);
  console.log(`   ⚠️  Warnings: ${report.summary.warnings}`);
  console.log(`   📈 Total: ${report.summary.total}`);
  console.log();

  const overallIcon = report.overall === 'pass' ? '✅' :
                      report.overall === 'fail' ? '❌' : '⚠️';

  console.log(`${overallIcon} Overall Status: ${report.overall.toUpperCase()}`);

  if (report.overall === 'fail') {
    console.log('\n💡 Fix the failed checks to ensure proper development environment setup.');
  } else if (report.overall === 'warning') {
    console.log('\n💡 Address warnings for optimal development experience.');
  } else {
    console.log('\n🎉 Development environment is fully configured and ready!');
  }
}