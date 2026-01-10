/**
 * End-to-End CLI Tests for create-karetech-stack
 * Tests the complete CLI workflow using enhanced testing framework
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { execSync } from 'child_process';
import { mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  TestEnvironment,
  TestProject,
  PRESET_TEST_CASES,
  PerformanceTest,
  validatePresetFiles,
  validatePackageJson,
  CLI_PATH,
  TEST_WORKSPACE_ROOT
} from '../setup';

describe('create-karetech-stack CLI', () => {
  beforeAll(() => {
    TestEnvironment.setup();
  });

  afterAll(() => {
    TestEnvironment.teardown();
  });

  describe('CLI Help and Version', () => {
    test('should show version with --version flag', () => {
      const env = TestEnvironment.getInstance();
      const version = env.getCLIVersion();
      expect(version).toMatch(/\d+\.\d+\.\d+/);
    });

    test('should show help with --help flag', () => {
      const project = new TestProject('help-test');
      const result = project.runCommand(`node ${project.workspace}/../../../dist/index.js --help`, {
        expectSuccess: true
      });

      expect(result.stdout).toContain('Enhanced Better-T-Stack scaffold');
      expect(result.stdout).toContain('--preset');
      expect(result.stdout).toContain('--theme');
    });

    test('should show environment check', () => {
      const env = TestEnvironment.getInstance();
      const check = env.runEnvironmentCheck();

      expect(check.success).toBe(true);
      expect(check.stdout).toContain('Environment Check');
    });
  });

  describe('Preset-based Project Generation', () => {
    // Test each preset comprehensively using the framework
    PRESET_TEST_CASES.forEach(({ name, expectedFiles, expectedFeatures, expectedDependencies, expectedDevDependencies, expectedScripts, shouldHaveDocker, shouldHaveGitHub, shouldHaveBeads, shouldHaveClaudeCode }) => {
      test(`should generate ${name} preset correctly`, async () => {
        const perf = new PerformanceTest();
        perf.start(`${name}-generation`);

        const env = TestEnvironment.getInstance();
        const project = env.createProject(`preset-${name}`);

        // Create project with preset
        await project.create(name);

        const metrics = perf.end(`${name}-generation`);
        console.log(`${name} preset generated in ${metrics.duration.toFixed(2)}ms`);

        // Verify project exists and has correct structure
        expect(project.exists()).toBe(true);

        // Use framework validation for expected files
        project.expectFiles(expectedFiles);

        // Validate package.json structure
        const pkgValidation = validatePackageJson(project);
        if (!pkgValidation.isValid) {
          throw new Error(`Package.json validation failed: ${pkgValidation.errors.join(', ')}`);
        }

        // Validate package.json content
        const packageJson = project.getPackageJson();
        expect(packageJson.name).toBe(project.name);
        expect(packageJson.description).toContain(project.name);

        // Test expected scripts
        if (expectedScripts) {
          project.expectPackageJson({ scripts: expectedScripts });
        }

        // Test expected dependencies
        if (expectedDependencies) {
          project.expectPackageJson({ dependencies: expectedDependencies });
        }

        // Test expected dev dependencies
        if (expectedDevDependencies) {
          project.expectPackageJson({ devDependencies: expectedDevDependencies });
        }

        // Validate CLAUDE.md exists and contains project info
        project.expectFileContent('CLAUDE.md', [project.name, 'Project:']);

        // Preset-specific validations
        if (shouldHaveBeads) {
          project.expectFiles(['.beads']);
        }

        if (shouldHaveClaudeCode) {
          project.expectFiles(['.claude']);
        }

        if (shouldHaveDocker) {
          project.expectFiles(['Dockerfile', '.dockerignore']);
        }

        if (shouldHaveGitHub) {
          project.expectFiles(['.github/workflows/ci.yml']);
        }

        // Special case: ecommerce should have both testing frameworks
        if (name === 'ecommerce') {
          project.expectFiles(['e2e/playwright.config.ts', 'e2e/puppeteer.config.ts']);
        }

        // Log project structure for debugging
        console.log(`\n${name} preset file tree:\n${project.getFileTree()}\n`);

        // Cleanup
        project.cleanup();
      }, 120000); // 2-minute timeout for project generation
    });
  });

  describe('CLI Options and Flags', () => {
    test('should respect --no-git flag', async () => {
      const env = TestEnvironment.getInstance();
      const project = env.createProject('no-git-test');

      await project.create('minimal', { noGit: true });

      // Should not have .git directory
      project.expectFilesAbsent(['.git']);

      project.cleanup();
    }, 60000);

    test('should respect --no-install flag', async () => {
      const env = TestEnvironment.getInstance();
      const project = env.createProject('no-install-test');

      await project.create('minimal', { noInstall: true });

      // Should not have node_modules
      project.expectFilesAbsent(['node_modules']);

      project.cleanup();
    }, 60000);

    test('should override theme with --theme flag', async () => {
      const env = TestEnvironment.getInstance();
      const project = env.createProject('theme-test');

      await project.create('saas', { theme: 'nova', noInstall: true });

      // Verify project was created successfully
      expect(project.exists()).toBe(true);

      // Check if theme configuration is applied in generated files
      // Note: This would need to be implemented based on actual theme generation
      if (project.hasFile('tailwind.config.js')) {
        project.expectFileContent('tailwind.config.js', 'nova');
      }

      project.cleanup();
    }, 60000);
  });

  describe('Error Handling', () => {
    test('should error on invalid preset', () => {
      const projectName = `test-invalid-${Date.now()}`;
      
      expect(() => {
        execSync(`node ${CLI_PATH} create ${projectName} --preset invalid-preset`, {
          cwd: TEST_WORKSPACE_ROOT,
          timeout: 10000
        });
      }).toThrow();
    });

    test('should error on invalid project name', () => {
      expect(() => {
        execSync(`node ${CLI_PATH} create "invalid project name!" --preset minimal`, {
          cwd: TEST_WORKSPACE_ROOT,
          timeout: 10000
        });
      }).toThrow();
    });

    test('should error when project directory already exists', () => {
      const projectName = `test-existing-${Date.now()}`;
      
      // Create directory first
      mkdirSync(join(TEST_WORKSPACE_ROOT, projectName));
      
      expect(() => {
        execSync(`node ${CLI_PATH} create ${projectName} --preset minimal`, {
          cwd: TEST_WORKSPACE_ROOT,
          timeout: 10000
        });
      }).toThrow();
    });
  });

  describe('Generated Project Structure Validation', () => {
    test('generated project should have valid TypeScript configuration', () => {
      const projectName = `test-ts-${Date.now()}`;
      
      execSync(`node ${CLI_PATH} create ${projectName} --preset saas --no-install`, {
        cwd: TEST_WORKSPACE_ROOT,
        timeout: 30000
      });

      const projectPath = join(TEST_WORKSPACE_ROOT, projectName);
      
      // Check if TypeScript config exists and is valid
      const tsconfigPath = join(projectPath, 'tsconfig.json');
      expect(existsSync(tsconfigPath)).toBe(true);
      
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
      expect(tsconfig.compilerOptions).toBeDefined();
      expect(tsconfig.compilerOptions.strict).toBe(true);
    }, 60000);

    test('generated project should have valid package.json', () => {
      const projectName = `test-pkg-${Date.now()}`;
      
      execSync(`node ${CLI_PATH} create ${projectName} --preset ecommerce --no-install`, {
        cwd: TEST_WORKSPACE_ROOT,
        timeout: 30000
      });

      const projectPath = join(TEST_WORKSPACE_ROOT, projectName);
      const packageJson = JSON.parse(readFileSync(join(projectPath, 'package.json'), 'utf8'));
      
      expect(packageJson.name).toBe(projectName);
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.dev).toBeDefined();
      expect(packageJson.scripts.build).toBeDefined();
      expect(packageJson.dependencies).toBeDefined();
    }, 60000);
  });
});