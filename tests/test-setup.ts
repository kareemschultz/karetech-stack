/**
 * Test setup and mocking utilities
 * Configures the test environment to use mocks instead of interactive prompts
 */

import { beforeAll, afterEach } from 'bun:test';

// Set environment variables for testing
process.env.NODE_ENV = 'test';
process.env.CI = 'true';

// Setup for non-interactive testing
beforeAll(() => {
  // Ensure TTY detection returns false in tests
  Object.defineProperty(process.stdout, 'isTTY', {
    value: false,
    configurable: true
  });
  
  Object.defineProperty(process.stdin, 'isTTY', {
    value: false,
    configurable: true
  });
});

afterEach(async () => {
  // Reset any test-specific state
  if (typeof global !== 'undefined' && (global as any).__resetTestState) {
    (global as any).__resetTestState();
  }
});

/**
 * Create CLI args for non-interactive testing
 */
export function createTestCliArgs(projectName: string, preset: string, options: {
  noGit?: boolean;
  noInstall?: boolean;
  theme?: string;
  color?: string;
} = {}): string[] {
  const args = ['create', projectName, '--preset', preset];
  
  if (options.noGit !== false) {
    args.push('--no-git');
  }
  
  if (options.noInstall !== false) {
    args.push('--no-install');
  }
  
  if (options.theme) {
    args.push('--theme', options.theme);
  }
  
  if (options.color) {
    args.push('--color', options.color);
  }
  
  return args;
}

/**
 * Run CLI in test mode with proper environment setup
 */
export async function runTestCLI(
  args: string[],
  options: {
    cwd?: string;
    timeout?: number;
    env?: Record<string, string>;
  } = {}
) {
  const { execSync } = await import('child_process');
  const { resolve } = await import('path');
  
  const CLI_PATH = resolve(__dirname, '../dist/index.js');
  const command = `node ${CLI_PATH} ${args.join(' ')}`;
  
  const testEnv = {
    ...process.env,
    NODE_ENV: 'test',
    CI: 'true',
    ...(options.env || {})
  };
  
  try {
    const result = execSync(command, {
      cwd: options.cwd || process.cwd(),
      encoding: 'utf8',
      timeout: options.timeout || 60000,
      env: testEnv,
      stdio: 'pipe'
    });
    
    return {
      stdout: result,
      stderr: '',
      success: true,
      exitCode: 0
    };
  } catch (error: any) {
    return {
      stdout: error.stdout || '',
      stderr: error.stderr || error.message || '',
      success: false,
      exitCode: error.status || 1
    };
  }
}

/**
 * Test configuration builder
 */
export function createTestConfig(overrides: any = {}): any {
  return {
    projectName: 'test-project',
    description: 'Test project description',
    author: 'Test Author',
    preset: 'minimal',
    database: 'sqlite',
    auth: ['email'],
    uiStyle: 'maia',
    baseColor: 'zinc',
    accentColor: 'blue',
    font: 'figtree',
    icons: 'hugeicons',
    borderRadius: 'default',
    menuAccent: 'subtle',
    componentLibrary: 'base-ui',
    testing: [],
    unitTesting: true,
    exampleTests: true,
    docker: false,
    cicd: 'none',
    deployTarget: 'vercel',
    pbsLevel: 'docs',
    beadsIntegration: false,
    claudeCodeHooks: false,
    mcpServers: [],
    pwa: false,
    analytics: 'none',
    email: 'none',
    errorTracking: 'none',
    featureFlags: false,
    ...overrides
  };
}

/**
 * Create test workspace
 */
export async function createTestWorkspace(name: string = 'test-workspace'): Promise<{
  path: string;
  cleanup: () => void;
}> {
  const { tmpdir } = await import('os');
  const { join } = await import('path');
  const { mkdirSync, rmSync, existsSync } = await import('fs');
  
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5);
  const workspaceName = `${name}-${timestamp}-${random}`;
  const workspacePath = join(tmpdir(), 'karetech-stack-tests', workspaceName);
  
  if (existsSync(workspacePath)) {
    rmSync(workspacePath, { recursive: true, force: true });
  }
  
  mkdirSync(workspacePath, { recursive: true });
  
  const cleanup = () => {
    if (existsSync(workspacePath)) {
      try {
        rmSync(workspacePath, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Failed to cleanup test workspace: ${error}`);
      }
    }
  };
  
  return { path: workspacePath, cleanup };
}

/**
 * Validate that CLI builds successfully
 */
export async function ensureCliBuild(): Promise<void> {
  const { execSync } = await import('child_process');
  const { resolve } = await import('path');
  const { existsSync } = await import('fs');
  
  const CLI_PATH = resolve(__dirname, '../dist/index.js');
  const PROJECT_ROOT = resolve(__dirname, '..');
  
  if (!existsSync(CLI_PATH)) {
    console.log('Building CLI for testing...');
    try {
      execSync('bun run build', {
        cwd: PROJECT_ROOT,
        stdio: 'inherit'
      });
    } catch (error) {
      throw new Error(`Failed to build CLI: ${error}`);
    }
  }
}

export default {
  createTestCliArgs,
  runTestCLI,
  createTestConfig,
  createTestWorkspace,
  ensureCliBuild
};