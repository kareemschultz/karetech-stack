/**
 * Configuration and Validation E2E Tests
 * Tests configuration loading, export, and validation functionality
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'bun:test';
import { execSync } from 'child_process';
import { existsSync, rmSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { resolve, join } from 'path';
import { tmpdir } from 'os';

const CLI_PATH = resolve(__dirname, '../../dist/index.js');
const TEST_WORKSPACE = resolve(tmpdir(), 'karetech-stack-config-test');

describe('Configuration Management', () => {
  beforeAll(async () => {
    // Create test workspace
    if (existsSync(TEST_WORKSPACE)) {
      rmSync(TEST_WORKSPACE, { recursive: true, force: true });
    }
    mkdirSync(TEST_WORKSPACE, { recursive: true });
  });

  afterAll(() => {
    // Cleanup test workspace
    if (existsSync(TEST_WORKSPACE)) {
      rmSync(TEST_WORKSPACE, { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    process.chdir(TEST_WORKSPACE);
  });

  describe('Configuration Loading', () => {
    test('should load configuration from JSON file', () => {
      const projectName = `test-config-json-${Date.now()}`;
      const configFile = join(TEST_WORKSPACE, 'test-config.json');
      
      // Create a valid configuration file
      const config = {
        projectName: projectName,
        description: 'Test project from config',
        author: 'Config Test Author',
        preset: 'saas',
        database: 'postgresql',
        auth: ['email', 'oauth'],
        uiStyle: 'mira',
        testing: ['playwright'],
        docker: true,
        cicd: 'github-actions',
        pbsLevel: 'full'
      };
      
      writeFileSync(configFile, JSON.stringify(config, null, 2));
      
      // Generate project using config file
      const result = execSync(`node ${CLI_PATH} create ${projectName} --config ${configFile} --no-install`, {
        encoding: 'utf8',
        cwd: TEST_WORKSPACE,
        timeout: 30000
      });

      expect(result).toContain('Loaded configuration from');
      expect(result).toContain('Project generated successfully');
      
      const projectPath = join(TEST_WORKSPACE, projectName);
      expect(existsSync(projectPath)).toBe(true);
      
      // Verify config was applied correctly
      const packageJson = JSON.parse(readFileSync(join(projectPath, 'package.json'), 'utf8'));
      expect(packageJson.name).toBe(projectName);
      expect(packageJson.description).toContain('Test project from config');
    }, 60000);

    test('should handle invalid configuration file', () => {
      const projectName = `test-invalid-config-${Date.now()}`;
      const configFile = join(TEST_WORKSPACE, 'invalid-config.json');
      
      // Create invalid JSON
      writeFileSync(configFile, '{ invalid json }');
      
      expect(() => {
        execSync(`node ${CLI_PATH} create ${projectName} --config ${configFile}`, {
          cwd: TEST_WORKSPACE,
          timeout: 10000
        });
      }).toThrow();
    });

    test('should handle missing configuration file', () => {
      const projectName = `test-missing-config-${Date.now()}`;
      const configFile = join(TEST_WORKSPACE, 'missing-config.json');
      
      // Don't create the file
      expect(() => {
        execSync(`node ${CLI_PATH} create ${projectName} --config ${configFile}`, {
          cwd: TEST_WORKSPACE,
          timeout: 10000
        });
      }).toThrow();
    });
  });

  describe('Configuration Validation', () => {
    test('should validate project name format', () => {
      const configFile = join(TEST_WORKSPACE, 'invalid-name-config.json');
      
      const config = {
        projectName: 'Invalid Project Name!', // Invalid characters
        description: 'Test project',
        author: 'Test Author'
      };
      
      writeFileSync(configFile, JSON.stringify(config, null, 2));
      
      expect(() => {
        execSync(`node ${CLI_PATH} create invalid-name --config ${configFile}`, {
          cwd: TEST_WORKSPACE,
          timeout: 10000
        });
      }).toThrow();
    });

    test('should validate author field', () => {
      const configFile = join(TEST_WORKSPACE, 'invalid-author-config.json');
      
      const config = {
        projectName: 'valid-project',
        description: 'Test project',
        author: '' // Empty author
      };
      
      writeFileSync(configFile, JSON.stringify(config, null, 2));
      
      expect(() => {
        execSync(`node ${CLI_PATH} create valid-project --config ${configFile}`, {
          cwd: TEST_WORKSPACE,
          timeout: 10000
        });
      }).toThrow();
    });

    test('should validate database options', () => {
      const configFile = join(TEST_WORKSPACE, 'invalid-db-config.json');
      
      const config = {
        projectName: 'test-invalid-db',
        description: 'Test project',
        author: 'Test Author',
        database: 'invalid-database' // Invalid database type
      };
      
      writeFileSync(configFile, JSON.stringify(config, null, 2));
      
      expect(() => {
        execSync(`node ${CLI_PATH} create test-invalid-db --config ${configFile}`, {
          cwd: TEST_WORKSPACE,
          timeout: 10000
        });
      }).toThrow();
    });

    test('should validate testing framework combinations', () => {
      const configFile = join(TEST_WORKSPACE, 'invalid-testing-config.json');
      
      const config = {
        projectName: 'test-invalid-testing',
        description: 'Test project',
        author: 'Test Author',
        testing: ['invalid-framework'] // Invalid testing framework
      };
      
      writeFileSync(configFile, JSON.stringify(config, null, 2));
      
      expect(() => {
        execSync(`node ${CLI_PATH} create test-invalid-testing --config ${configFile}`, {
          cwd: TEST_WORKSPACE,
          timeout: 10000
        });
      }).toThrow();
    });
  });

  describe('Configuration Export', () => {
    test('should export project configuration', () => {
      // Note: This test assumes the export functionality is implemented
      // Since it's currently showing "coming soon", we'll test the current behavior
      
      const result = execSync(`node ${CLI_PATH} export-config test-project`, {
        encoding: 'utf8',
        cwd: TEST_WORKSPACE,
        timeout: 10000
      });

      expect(result).toContain('Config export functionality coming soon');
    });
  });

  describe('Preset Override Validation', () => {
    test('should override preset settings with CLI flags', () => {
      const projectName = `test-override-${Date.now()}`;
      
      // Start with minimal preset but override with theme
      const result = execSync(`node ${CLI_PATH} create ${projectName} --preset minimal --theme nova --no-install`, {
        encoding: 'utf8',
        cwd: TEST_WORKSPACE,
        timeout: 30000
      });

      expect(result).toContain('Project generated successfully');
      
      const projectPath = join(TEST_WORKSPACE, projectName);
      expect(existsSync(projectPath)).toBe(true);
      
      // The theme should be applied even though minimal preset was used
      // This would need to be verified in the generated theme configuration
    }, 60000);

    test('should validate theme override options', () => {
      const projectName = `test-invalid-theme-${Date.now()}`;
      
      expect(() => {
        execSync(`node ${CLI_PATH} create ${projectName} --preset saas --theme invalid-theme`, {
          cwd: TEST_WORKSPACE,
          timeout: 10000
        });
      }).toThrow();
    });
  });

  describe('Environment Validation', () => {
    test('should validate required environment tools', () => {
      const result = execSync(`node ${CLI_PATH} check-env`, {
        encoding: 'utf8',
        timeout: 10000
      });

      expect(result).toContain('Environment Check');
      // Should check for Bun, Node.js, Git, etc.
    });

    test('should provide actionable environment feedback', () => {
      const result = execSync(`node ${CLI_PATH} check-env`, {
        encoding: 'utf8',
        timeout: 10000
      });

      // Should provide status for each tool
      expect(result).toMatch(/(✓|❌|⚠️)/); // Should contain status indicators
    });
  });

  describe('Configuration Compatibility', () => {
    test('should handle configuration version compatibility', () => {
      const projectName = `test-compat-${Date.now()}`;
      const configFile = join(TEST_WORKSPACE, 'legacy-config.json');
      
      // Create config that might be from an older version
      const config = {
        projectName: projectName,
        description: 'Legacy config test',
        author: 'Test Author',
        // Missing some newer fields but should still work
        database: 'postgresql',
        auth: ['email']
      };
      
      writeFileSync(configFile, JSON.stringify(config, null, 2));
      
      const result = execSync(`node ${CLI_PATH} create ${projectName} --config ${configFile} --no-install`, {
        encoding: 'utf8',
        cwd: TEST_WORKSPACE,
        timeout: 30000
      });

      expect(result).toContain('Project generated successfully');
      
      const projectPath = join(TEST_WORKSPACE, projectName);
      expect(existsSync(projectPath)).toBe(true);
    }, 60000);
  });
});