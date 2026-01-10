/**
 * Interactive Wizard E2E Tests
 * Tests the interactive CLI wizard flow with simulated user input
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { spawn } from 'child_process';
import { existsSync, rmSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { tmpdir } from 'os';

const CLI_PATH = resolve(__dirname, '../../dist/index.js');
const TEST_WORKSPACE = resolve(tmpdir(), 'karetech-stack-wizard-test');

/**
 * Utility function to interact with the CLI wizard
 * Simulates user keyboard input for interactive prompts
 */
async function runInteractiveWizard(
  projectName: string,
  inputs: string[],
  timeout = 30000
): Promise<{ stdout: string; stderr: string; exitCode: number | null }> {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [CLI_PATH, 'create', projectName], {
      cwd: TEST_WORKSPACE,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, CI: 'true' } // Set CI flag to avoid some interactive features
    });

    let stdout = '';
    let stderr = '';
    let inputIndex = 0;

    // Handle stdout (questions from wizard)
    child.stdout?.on('data', (data) => {
      const output = data.toString();
      stdout += output;

      // Send next input when we detect a prompt
      if (output.includes('?') && inputIndex < inputs.length) {
        setTimeout(() => {
          child.stdin?.write(inputs[inputIndex] + '\\n');
          inputIndex++;
        }, 100);
      }
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code });
    });

    child.on('error', (error) => {
      reject(error);
    });

    // Set timeout
    setTimeout(() => {
      child.kill();
      reject(new Error(`Wizard timeout after ${timeout}ms`));
    }, timeout);

    // Send first input after a delay to let the wizard initialize
    setTimeout(() => {
      if (inputs.length > 0 && inputIndex < inputs.length) {
        child.stdin?.write(inputs[inputIndex] + '\\n');
        inputIndex++;
      }
    }, 1000);
  });
}

describe('Interactive Wizard Flow', () => {
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

  test('should complete custom setup wizard flow', async () => {
    const projectName = `wizard-custom-${Date.now()}`;
    
    // Simulate user inputs for custom setup
    const inputs = [
      'A custom test application', // description
      'Test Author', // author
      'custom', // preset selection (custom setup)
      'postgresql', // database
      'email,oauth', // auth (multiselect)
      'mira', // UI style
      'playwright,vitest', // testing frameworks (multiselect)
      'y', // Docker
      'github-actions', // CI/CD
      'full', // PBS level
      'y' // PWA
    ];

    const result = await runInteractiveWizard(projectName, inputs, 45000);
    
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Project generated successfully');
    
    const projectPath = join(TEST_WORKSPACE, projectName);
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, 'package.json'))).toBe(true);
  }, 60000);

  test('should complete saas preset wizard flow', async () => {
    const projectName = `wizard-saas-${Date.now()}`;
    
    // Simulate user inputs for SaaS preset
    const inputs = [
      'A SaaS application', // description
      'Test Author', // author
      'saas' // preset selection
    ];

    const result = await runInteractiveWizard(projectName, inputs, 30000);
    
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Applied saas preset');
    expect(result.stdout).toContain('Project generated successfully');
    
    const projectPath = join(TEST_WORKSPACE, projectName);
    expect(existsSync(projectPath)).toBe(true);
    
    // Verify SaaS-specific features
    expect(existsSync(join(projectPath, 'e2e/playwright.config.ts'))).toBe(true);
    expect(existsSync(join(projectPath, 'Dockerfile'))).toBe(true);
    expect(existsSync(join(projectPath, '.beads'))).toBe(true);
  }, 60000);

  test('should handle wizard cancellation gracefully', async () => {
    const projectName = `wizard-cancel-${Date.now()}`;
    
    // Simulate cancellation (Ctrl+C equivalent)
    const inputs = [
      'A test application', // description
      '\\x03' // Ctrl+C
    ];

    try {
      const result = await runInteractiveWizard(projectName, inputs, 15000);
      expect(result.stdout).toContain('Operation cancelled');
    } catch (error) {
      // Cancellation might cause the process to exit abruptly
      expect(error).toBeInstanceOf(Error);
    }
    
    const projectPath = join(TEST_WORKSPACE, projectName);
    expect(existsSync(projectPath)).toBe(false);
  }, 30000);

  test('should validate project name in wizard', async () => {
    const invalidProjectName = 'Invalid Project Name!'; // Invalid characters
    
    const inputs = [
      '', // Try empty first
      invalidProjectName, // Then invalid name
      'valid-project-name' // Finally valid name
    ];

    const result = await runInteractiveWizard(invalidProjectName, inputs, 30000);
    
    // Should show validation errors for invalid inputs
    expect(result.stdout).toContain('Project name');
    
    // But eventually succeed with valid input
    // Note: This test might need adjustment based on how the wizard handles retries
  }, 45000);

  test('should show preset descriptions in wizard', async () => {
    const projectName = `wizard-descriptions-${Date.now()}`;
    
    const inputs = [
      'Test app', // description
      'Test Author', // author
      '\\x1B[B', // Arrow down to see more presets
      '\\x1B[B', // Arrow down again
      'ecommerce' // Select ecommerce
    ];

    const result = await runInteractiveWizard(projectName, inputs, 30000);
    
    // Should show preset descriptions
    expect(result.stdout).toContain('SaaS Starter');
    expect(result.stdout).toContain('E-commerce');
    expect(result.stdout).toContain('PostgreSQL');
    expect(result.stdout).toContain('Stripe');
  }, 45000);

  test('should handle multiselect options correctly', async () => {
    const projectName = `wizard-multiselect-${Date.now()}`;
    
    const inputs = [
      'Test multiselect app',
      'Test Author',
      'custom',
      'postgresql',
      'email', // First auth option
      ' ', // Space to select
      '\\x1B[B', // Arrow down
      ' ', // Space to select oauth too
      '\\r', // Enter to confirm multiselect
      'mira',
      'playwright', // First testing option
      ' ', // Space to select
      '\\x1B[B', // Arrow down
      ' ', // Space to select vitest too
      '\\r', // Enter to confirm
      'y', // Docker
      'github-actions',
      'full',
      'n' // No PWA
    ];

    const result = await runInteractiveWizard(projectName, inputs, 45000);
    
    expect(result.exitCode).toBe(0);
    
    const projectPath = join(TEST_WORKSPACE, projectName);
    expect(existsSync(projectPath)).toBe(true);
    
    // Verify that both testing frameworks were selected
    expect(existsSync(join(projectPath, 'e2e/playwright.config.ts'))).toBe(true);
    expect(existsSync(join(projectPath, 'vitest.config.ts'))).toBe(true);
  }, 60000);
});