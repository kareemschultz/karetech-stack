/**
 * Comprehensive E2E Testing Framework for create-karetech-stack
 * Enhanced TestProject and TestEnvironment classes for robust testing
 * Supports all preset validation, performance testing, and dev server testing
 */

import { execSync, spawn } from 'child_process';
import { existsSync, rmSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, join, basename } from 'path';
import { tmpdir } from 'os';
import type { ProjectConfig, PresetConfig } from '../src/types';

export const CLI_PATH = resolve(__dirname, '../dist/index.js');
export const PROJECT_ROOT = resolve(__dirname, '..');
export const TEST_WORKSPACE_ROOT = resolve(tmpdir(), 'karetech-stack-tests');

/**
 * Enhanced TestProject Class - Comprehensive project creation and validation
 */
export class TestProject {
  public readonly name: string;
  public readonly path: string;
  public readonly workspace: string;
  private _config: Partial<ProjectConfig> | null = null;
  private _packageJson: any | null = null;

  constructor(name: string, workspace: string = TEST_WORKSPACE_ROOT) {
    // Create unique name with timestamp to avoid conflicts
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5);
    this.name = `${name}-${timestamp}-${random}`;
    this.workspace = workspace;
    this.path = join(workspace, this.name);
  }

  /**
   * Create project with specified preset and options
   */
  async create(preset: string, options: {
    theme?: string;
    color?: string;
    noGit?: boolean;
    noInstall?: boolean;
    config?: string;
    timeout?: number;
  } = {}): Promise<this> {
    const {
      theme,
      color,
      noGit = true, // Default to no git for faster testing
      noInstall = true, // Default to no install for faster testing
      config,
      timeout = 60000
    } = options;

    // Ensure workspace exists
    if (!existsSync(this.workspace)) {
      mkdirSync(this.workspace, { recursive: true });
    }

    // Build CLI command
    const args = ['create', this.name, '--preset', preset];
    if (theme) args.push('--theme', theme);
    if (color) args.push('--color', color);
    if (config) args.push('--config', config);
    if (noGit) args.push('--no-git');
    if (noInstall) args.push('--no-install');

    const command = `node ${CLI_PATH} ${args.join(' ')}`;

    try {
      const result = execSync(command, {
        cwd: this.workspace,
        encoding: 'utf8',
        timeout
      });

      // Verify project was created
      if (!existsSync(this.path)) {
        throw new Error(`Project directory not created: ${this.path}`);
      }

      return this;
    } catch (error) {
      throw new Error(`Failed to create project: ${error}`);
    }
  }

  /**
   * Check if project exists
   */
  exists(): boolean {
    return existsSync(this.path);
  }

  /**
   * Check if a file exists in the project
   */
  hasFile(filePath: string): boolean {
    return existsSync(join(this.path, filePath));
  }

  /**
   * Read a file from the project
   */
  readFile(filePath: string): string {
    const fullPath = join(this.path, filePath);
    if (!existsSync(fullPath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return readFileSync(fullPath, 'utf8');
  }

  /**
   * Validate project has expected files
   */
  expectFiles(expectedFiles: string[]): this {
    const missingFiles: string[] = [];

    for (const file of expectedFiles) {
      if (!this.hasFile(file)) {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      throw new Error(`Missing expected files: ${missingFiles.join(', ')}`);
    }

    return this;
  }

  /**
   * Validate project does NOT have certain files
   */
  expectFilesAbsent(unexpectedFiles: string[]): this {
    const foundFiles: string[] = [];

    for (const file of unexpectedFiles) {
      if (this.hasFile(file)) {
        foundFiles.push(file);
      }
    }

    if (foundFiles.length > 0) {
      throw new Error(`Found unexpected files: ${foundFiles.join(', ')}`);
    }

    return this;
  }

  /**
   * Get and validate package.json
   */
  getPackageJson(): any {
    if (!this._packageJson) {
      const packagePath = join(this.path, 'package.json');
      if (!existsSync(packagePath)) {
        throw new Error('package.json not found');
      }

      try {
        this._packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
      } catch (error) {
        throw new Error(`Invalid package.json: ${error}`);
      }
    }

    return this._packageJson;
  }

  /**
   * Validate package.json contents
   */
  expectPackageJson(expectations: {
    name?: string;
    scripts?: string[];
    dependencies?: string[];
    devDependencies?: string[];
  }): this {
    const pkg = this.getPackageJson();

    if (expectations.name) {
      if (pkg.name !== expectations.name) {
        throw new Error(`Expected package.json name "${expectations.name}", got "${pkg.name}"`);
      }
    }

    if (expectations.scripts) {
      for (const script of expectations.scripts) {
        if (!pkg.scripts || !pkg.scripts[script]) {
          throw new Error(`Missing script: ${script}`);
        }
      }
    }

    if (expectations.dependencies) {
      for (const dep of expectations.dependencies) {
        if (!pkg.dependencies || !pkg.dependencies[dep]) {
          throw new Error(`Missing dependency: ${dep}`);
        }
      }
    }

    if (expectations.devDependencies) {
      for (const dep of expectations.devDependencies) {
        if (!pkg.devDependencies || !pkg.devDependencies[dep]) {
          throw new Error(`Missing dev dependency: ${dep}`);
        }
      }
    }

    return this;
  }

  /**
   * Validate file content contains expected strings
   */
  expectFileContent(filePath: string, expectedContent: string | string[]): this {
    const content = this.readFile(filePath);
    const expectations = Array.isArray(expectedContent) ? expectedContent : [expectedContent];

    for (const expected of expectations) {
      if (!content.includes(expected)) {
        throw new Error(`File ${filePath} does not contain: ${expected}`);
      }
    }

    return this;
  }

  /**
   * Run command in project directory
   */
  runCommand(command: string, options: {
    timeout?: number;
    expectSuccess?: boolean;
  } = {}): { stdout: string; stderr: string; success: boolean; exitCode: number } {
    const { timeout = 30000, expectSuccess = true } = options;

    try {
      const result = execSync(command, {
        cwd: this.path,
        encoding: 'utf8',
        timeout,
        stdio: 'pipe'
      });

      return {
        stdout: result,
        stderr: '',
        success: true,
        exitCode: 0
      };
    } catch (error: any) {
      const failed = {
        stdout: error.stdout || '',
        stderr: error.stderr || error.message || '',
        success: false,
        exitCode: error.status || 1
      };

      if (expectSuccess) {
        throw new Error(`Command failed: ${command}\nStdout: ${failed.stdout}\nStderr: ${failed.stderr}`);
      }

      return failed;
    }
  }

  /**
   * Install dependencies if not already installed
   */
  installDependencies(timeout: number = 120000): this {
    if (!existsSync(join(this.path, 'node_modules'))) {
      console.log(`Installing dependencies for ${this.name}...`);
      this.runCommand('bun install', { timeout });
    }
    return this;
  }

  /**
   * Validate project can be built successfully
   */
  async expectBuilds(timeout: number = 120000): Promise<this> {
    this.installDependencies();
    this.runCommand('bun run build', { timeout });
    return this;
  }

  /**
   * Validate project dev server can start
   */
  async expectDevServerStarts(timeout: number = 30000): Promise<this> {
    return new Promise((resolve, reject) => {
      this.installDependencies();

      const child = spawn('bun', ['run', 'dev'], {
        cwd: this.path,
        stdio: 'pipe'
      });

      let resolved = false;
      const timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          child.kill();
          reject(new Error('Dev server failed to start within timeout'));
        }
      }, timeout);

      child.stdout?.on('data', (data) => {
        const output = data.toString();
        // Look for common dev server success indicators
        if (output.includes('Local:') || output.includes('localhost') ||
            output.includes('ready') || output.includes('compiled')) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            child.kill();
            resolve(this);
          }
        }
      });

      child.on('error', (error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeoutId);
          reject(new Error(`Dev server process error: ${error.message}`));
        }
      });

      child.on('exit', (code) => {
        if (!resolved && code !== 0) {
          resolved = true;
          clearTimeout(timeoutId);
          reject(new Error(`Dev server exited with code: ${code}`));
        }
      });
    });
  }

  /**
   * Validate TypeScript compilation
   */
  expectTypeScriptCompiles(timeout: number = 60000): this {
    this.installDependencies();
    this.runCommand('bun run typecheck', { timeout });
    return this;
  }

  /**
   * Run tests if available
   */
  expectTestsPass(timeout: number = 120000): this {
    const pkg = this.getPackageJson();
    if (pkg.scripts?.test) {
      this.installDependencies();
      this.runCommand('bun run test', { timeout });
    }
    return this;
  }

  /**
   * Get project file tree for debugging
   */
  getFileTree(maxDepth: number = 3): string {
    const tree: string[] = [];

    function walkDirectory(dir: string, depth: number = 0, prefix: string = ''): void {
      if (depth > maxDepth) return;

      try {
        const items = readdirSync(dir)
          .filter(item => !item.startsWith('.') || item === '.claude' || item === '.beads')
          .sort();

        items.forEach((item, index) => {
          const itemPath = join(dir, item);
          const isLast = index === items.length - 1;
          const symbol = isLast ? '└── ' : '├── ';
          const newPrefix = isLast ? '    ' : '│   ';

          tree.push(`${prefix}${symbol}${item}`);

          if (existsSync(itemPath) && statSync(itemPath).isDirectory()) {
            walkDirectory(itemPath, depth + 1, prefix + newPrefix);
          }
        });
      } catch (error) {
        tree.push(`${prefix}[Error reading directory: ${error}]`);
      }
    }

    walkDirectory(this.path);
    return `${this.name}/\n${tree.join('\n')}`;
  }

  /**
   * Get project size in MB
   */
  getProjectSize(): { totalMB: number; nodeModulesMB: number } {
    const getDirectorySize = (dir: string): number => {
      let size = 0;
      try {
        const items = readdirSync(dir);
        for (const item of items) {
          const itemPath = join(dir, item);
          const stats = statSync(itemPath);
          if (stats.isDirectory()) {
            size += getDirectorySize(itemPath);
          } else {
            size += stats.size;
          }
        }
      } catch (error) {
        // Ignore permission errors
      }
      return size;
    };

    const totalSize = getDirectorySize(this.path);
    const nodeModulesPath = join(this.path, 'node_modules');
    const nodeModulesSize = existsSync(nodeModulesPath) ? getDirectorySize(nodeModulesPath) : 0;

    return {
      totalMB: Math.round(totalSize / (1024 * 1024) * 100) / 100,
      nodeModulesMB: Math.round(nodeModulesSize / (1024 * 1024) * 100) / 100
    };
  }

  /**
   * Write a file to the workspace (for config testing)
   */
  writeWorkspaceFile(filePath: string, content: string): void {
    writeFileSync(join(this.workspace, filePath), content);
  }

  /**
   * Clean up project directory
   */
  cleanup(): void {
    if (existsSync(this.path)) {
      try {
        rmSync(this.path, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Warning: Failed to cleanup project ${this.path}: ${error}`);
      }
    }
  }
}

/**
 * Enhanced TestEnvironment Class - Manages global test environment
 */
export class TestEnvironment {
  private static instance: TestEnvironment | null = null;
  public readonly workspace: string;
  private isSetup: boolean = false;

  constructor(workspace: string = TEST_WORKSPACE_ROOT) {
    this.workspace = workspace;
  }

  /**
   * Get singleton instance
   */
  static getInstance(): TestEnvironment {
    if (!TestEnvironment.instance) {
      TestEnvironment.instance = new TestEnvironment();
    }
    return TestEnvironment.instance;
  }

  /**
   * Setup test environment (build CLI, create workspace)
   */
  static setup(): void {
    const env = TestEnvironment.getInstance();

    if (env.isSetup) {
      return;
    }

    console.log('Setting up test environment...');

    // Build CLI if needed
    env.buildCLI();

    // Create test workspace
    env.createWorkspace();

    // Validate environment
    env.validateEnvironment();

    env.isSetup = true;
    console.log('Test environment ready');
  }

  /**
   * Build the CLI for testing
   */
  buildCLI(): void {
    if (existsSync(CLI_PATH)) {
      console.log('CLI already built');
      return;
    }

    console.log('Building CLI for testing...');
    try {
      execSync('bun run build', {
        cwd: PROJECT_ROOT,
        stdio: 'inherit'
      });
      console.log('CLI built successfully');
    } catch (error) {
      throw new Error(`Failed to build CLI: ${error}`);
    }
  }

  /**
   * Create clean test workspace
   */
  createWorkspace(): void {
    if (existsSync(this.workspace)) {
      rmSync(this.workspace, { recursive: true, force: true });
    }
    mkdirSync(this.workspace, { recursive: true });
  }

  /**
   * Validate required tools are available
   */
  validateEnvironment(): void {
    const requirements = [
      { tool: 'node', command: 'node --version' },
      { tool: 'bun', command: 'bun --version' },
      { tool: 'tsc', command: 'bunx tsc --version' }
    ];

    for (const { tool, command } of requirements) {
      try {
        execSync(command, { stdio: 'ignore' });
      } catch (error) {
        throw new Error(`Required tool not available: ${tool}. Please install it to run tests.`);
      }
    }
  }

  /**
   * Create a new test project instance
   */
  createProject(name: string): TestProject {
    return new TestProject(name, this.workspace);
  }

  /**
   * Get CLI version for testing
   */
  getCLIVersion(): string {
    try {
      const result = execSync(`node ${CLI_PATH} --version`, {
        encoding: 'utf8',
        timeout: 10000
      });
      return result.trim();
    } catch (error) {
      throw new Error(`Failed to get CLI version: ${error}`);
    }
  }

  /**
   * Run environment check command
   */
  runEnvironmentCheck(): { stdout: string; success: boolean } {
    try {
      const result = execSync(`node ${CLI_PATH} check-env`, {
        encoding: 'utf8',
        timeout: 30000
      });
      return { stdout: result, success: true };
    } catch (error: any) {
      return {
        stdout: error.stdout || error.message || '',
        success: false
      };
    }
  }

  /**
   * Check CLI functionality
   */
  static async checkCLI(): Promise<void> {
    try {
      execSync(`node ${CLI_PATH} --version`, { timeout: 5000 });
    } catch (error) {
      throw new Error('CLI is not working properly');
    }
  }

  /**
   * Cleanup test environment
   */
  static teardown(): void {
    const env = TestEnvironment.getInstance();
    if (existsSync(env.workspace)) {
      try {
        rmSync(env.workspace, { recursive: true, force: true });
        console.log('Test workspace cleaned up');
      } catch (error) {
        console.warn(`Warning: Failed to cleanup workspace: ${error}`);
      }
    }
  }

  /**
   * Get workspace statistics
   */
  getWorkspaceStats(): {
    projectCount: number;
    totalSizeMB: number;
    projects: Array<{ name: string; sizeMB: number }>;
  } {
    if (!existsSync(this.workspace)) {
      return { projectCount: 0, totalSizeMB: 0, projects: [] };
    }

    const projects: Array<{ name: string; sizeMB: number }> = [];
    let totalSize = 0;

    try {
      const items = readdirSync(this.workspace);
      for (const item of items) {
        const itemPath = join(this.workspace, item);
        if (statSync(itemPath).isDirectory()) {
          const project = new TestProject(item, this.workspace);
          const size = project.getProjectSize().totalMB;
          projects.push({ name: item, sizeMB: size });
          totalSize += size;
        }
      }
    } catch (error) {
      // Ignore errors
    }

    return {
      projectCount: projects.length,
      totalSizeMB: Math.round(totalSize * 100) / 100,
      projects: projects.sort((a, b) => b.sizeMB - a.sizeMB)
    };
  }
}

/**
 * Enhanced Preset Test Cases with comprehensive validation
 */
export interface PresetTestCase {
  name: string;
  expectedFiles: string[];
  expectedFeatures: string[];
  expectedDependencies?: string[];
  expectedDevDependencies?: string[];
  expectedScripts?: string[];
  shouldHaveDocker?: boolean;
  shouldHaveGitHub?: boolean;
  shouldHaveBeads?: boolean;
  shouldHaveClaudeCode?: boolean;
}

export const PRESET_TEST_CASES: PresetTestCase[] = [
  {
    name: 'saas',
    expectedFiles: [
      'package.json',
      'CLAUDE.md',
      'constitution.md',
      'docs/PBS_MASTER_SYSTEM.md',
      'e2e/playwright.config.ts',
      'Dockerfile',
      '.github/workflows/ci.yml',
      '.beads',
      '.claude'
    ],
    expectedFeatures: ['postgresql', 'playwright', 'docker', 'full PBS'],
    expectedDependencies: ['@better-auth/cli', '@hono/node-server'],
    expectedDevDependencies: ['@playwright/test'],
    expectedScripts: ['dev', 'build', 'test', 'test:e2e'],
    shouldHaveDocker: true,
    shouldHaveGitHub: true,
    shouldHaveBeads: true,
    shouldHaveClaudeCode: true
  },
  {
    name: 'ecommerce',
    expectedFiles: [
      'package.json',
      'CLAUDE.md',
      'e2e/playwright.config.ts',
      'e2e/puppeteer.config.ts',
      'Dockerfile',
      '.github/workflows/ci.yml'
    ],
    expectedFeatures: ['postgresql', 'stripe', 'both testing', 'docker'],
    expectedDependencies: ['stripe'],
    expectedDevDependencies: ['@playwright/test', 'puppeteer'],
    expectedScripts: ['dev', 'build', 'test', 'test:e2e'],
    shouldHaveDocker: true,
    shouldHaveGitHub: true
  },
  {
    name: 'blog',
    expectedFiles: [
      'package.json',
      'CLAUDE.md',
      'e2e/playwright.config.ts',
      'docs/PBS_MASTER_SYSTEM.md'
    ],
    expectedFeatures: ['turso', 'playwright', 'vercel deploy'],
    expectedDependencies: ['@libsql/client'],
    expectedDevDependencies: ['@playwright/test'],
    shouldHaveDocker: false,
    shouldHaveGitHub: false
  },
  {
    name: 'devtool',
    expectedFiles: [
      'package.json',
      'CLAUDE.md',
      'vitest.config.ts',
      '.github/workflows/ci.yml'
    ],
    expectedFeatures: ['postgresql', 'github auth', 'vitest'],
    expectedDevDependencies: ['vitest'],
    expectedScripts: ['test'],
    shouldHaveDocker: false,
    shouldHaveGitHub: true
  },
  {
    name: 'portfolio',
    expectedFiles: [
      'package.json',
      'CLAUDE.md'
    ],
    expectedFeatures: ['sqlite', 'minimal setup'],
    shouldHaveDocker: false,
    shouldHaveGitHub: false
  },
  {
    name: 'minimal',
    expectedFiles: [
      'package.json',
      'CLAUDE.md'
    ],
    expectedFeatures: ['sqlite', 'basic setup'],
    shouldHaveDocker: false,
    shouldHaveGitHub: false
  }
];

// Legacy compatibility with existing tests
export const PRESET_EXPECTATIONS = PRESET_TEST_CASES.reduce((acc, testCase) => {
  acc[testCase.name] = {
    files: testCase.expectedFiles,
    features: testCase.expectedFeatures.map(f => f.replace(' ', '-').toLowerCase())
  };
  return acc;
}, {} as any);

/**
 * Enhanced validation helpers
 */
export function validatePresetFiles(project: TestProject, preset: string): string[] {
  const testCase = PRESET_TEST_CASES.find(tc => tc.name === preset);
  if (!testCase) {
    throw new Error(`Unknown preset: ${preset}`);
  }

  const missingFiles: string[] = [];
  testCase.expectedFiles.forEach(file => {
    if (!project.hasFile(file)) {
      missingFiles.push(file);
    }
  });

  return missingFiles;
}

export function validatePackageJson(project: TestProject): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    const packageJson = project.getPackageJson();

    if (!packageJson.name) errors.push('Missing name field');
    if (!packageJson.description) errors.push('Missing description field');
    if (!packageJson.scripts) errors.push('Missing scripts field');
    if (!packageJson.scripts.dev) errors.push('Missing dev script');
    if (!packageJson.scripts.build) errors.push('Missing build script');
    if (!packageJson.dependencies) errors.push('Missing dependencies field');

  } catch (error) {
    errors.push(`Failed to parse package.json: ${error}`);
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Configuration file builders for testing
 */
export function createTestConfig(overrides: any = {}): any {
  return {
    projectName: 'test-project',
    description: 'Test project generated from config',
    author: 'Test Author',
    preset: 'saas',
    database: 'postgresql',
    auth: ['email', 'oauth'],
    uiStyle: 'mira',
    testing: ['playwright'],
    docker: true,
    cicd: 'github-actions',
    pbsLevel: 'full',
    ...overrides
  };
}

/**
 * Performance testing utilities
 */
export class PerformanceTest {
  private startTime: number = 0;
  private metrics: Array<{ name: string; duration: number; memory?: number }> = [];

  start(name: string): void {
    this.startTime = process.hrtime.bigint();
  }

  end(name: string): { duration: number; memory: number } {
    const duration = Number(process.hrtime.bigint() - this.startTime) / 1_000_000; // Convert to ms
    const memory = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to MB

    this.metrics.push({ name, duration, memory });

    return { duration, memory };
  }

  getReport(): string {
    const report = ['Performance Test Report', '='.repeat(50)];

    for (const metric of this.metrics) {
      report.push(`${metric.name}: ${metric.duration.toFixed(2)}ms (${metric.memory?.toFixed(2)}MB)`);
    }

    const totalDuration = this.metrics.reduce((sum, m) => sum + m.duration, 0);
    const avgMemory = this.metrics.reduce((sum, m) => sum + (m.memory || 0), 0) / this.metrics.length;

    report.push('');
    report.push(`Total Duration: ${totalDuration.toFixed(2)}ms`);
    report.push(`Average Memory: ${avgMemory.toFixed(2)}MB`);

    return report.join('\n');
  }

  reset(): void {
    this.metrics = [];
  }
}

// Export singleton instance for convenience
export const testEnv = TestEnvironment.getInstance();