/**
 * Enhanced CLI Wizard Tests
 * Tests the CLI wizard functionality using non-interactive mode for reliable testing
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { 
  createTestWorkspace, 
  runTestCLI, 
  createTestCliArgs, 
  ensureCliBuild 
} from '../test-setup';

let testWorkspace: { path: string; cleanup: () => void };

describe('CLI Wizard Functionality', () => {
  beforeAll(async () => {
    await ensureCliBuild();
    testWorkspace = await createTestWorkspace('wizard-tests');
  });

  afterAll(() => {
    testWorkspace.cleanup();
  });

  test('should create project with minimal preset (non-interactive)', async () => {
    const projectName = `wizard-minimal-${Date.now()}`;
    const args = createTestCliArgs(projectName, 'minimal');
    
    const result = await runTestCLI(args, {
      cwd: testWorkspace.path,
      timeout: 45000
    });
    
    expect(result.success).toBe(true);
    expect(result.stdout).toContain('Project generated successfully') ||
           expect(result.stdout).toContain('created successfully');
    
    const projectPath = join(testWorkspace.path, projectName);
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, 'package.json'))).toBe(true);
    expect(existsSync(join(projectPath, 'CLAUDE.md'))).toBe(true);
  }, 60000);

  test('should create project with saas preset and features', async () => {
    const projectName = `wizard-saas-${Date.now()}`;
    const args = createTestCliArgs(projectName, 'saas');
    
    const result = await runTestCLI(args, {
      cwd: testWorkspace.path,
      timeout: 60000
    });
    
    expect(result.success).toBe(true);
    expect(result.stdout).toContain('created successfully') ||
           expect(result.stdout).toContain('Project generated successfully');
    
    const projectPath = join(testWorkspace.path, projectName);
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, 'package.json'))).toBe(true);
    expect(existsSync(join(projectPath, 'CLAUDE.md'))).toBe(true);
  }, 60000);

  test('should handle invalid project names gracefully', async () => {
    const invalidProjectName = 'Invalid Project Name!';
    const args = createTestCliArgs(invalidProjectName, 'minimal');
    
    const result = await runTestCLI(args, {
      cwd: testWorkspace.path,
      timeout: 30000
    });
    
    // CLI should reject invalid project names
    expect(result.success).toBe(false);
    expect(result.stderr).toContain('') || expect(result.stdout).toContain('') ||
           expect(result.exitCode).not.toBe(0);
  }, 30000);

  test('should create project with ecommerce preset', async () => {
    const projectName = `wizard-ecommerce-${Date.now()}`;
    const args = createTestCliArgs(projectName, 'ecommerce');
    
    const result = await runTestCLI(args, {
      cwd: testWorkspace.path,
      timeout: 45000
    });
    
    expect(result.success).toBe(true);
    expect(result.stdout).toContain('created successfully') ||
           expect(result.stdout).toContain('Project generated successfully');
    
    const projectPath = join(testWorkspace.path, projectName);
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, 'package.json'))).toBe(true);
  }, 60000);

  test('should create project with blog preset', async () => {
    const projectName = `wizard-blog-${Date.now()}`;
    const args = createTestCliArgs(projectName, 'blog');
    
    const result = await runTestCLI(args, {
      cwd: testWorkspace.path,
      timeout: 45000
    });
    
    expect(result.success).toBe(true);
    
    const projectPath = join(testWorkspace.path, projectName);
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, 'package.json'))).toBe(true);
  }, 60000);

  test('should create project with custom theme options', async () => {
    const projectName = `wizard-theme-${Date.now()}`;
    const args = createTestCliArgs(projectName, 'minimal', {
      theme: 'mira',
      color: 'blue'
    });
    
    const result = await runTestCLI(args, {
      cwd: testWorkspace.path,
      timeout: 30000
    });
    
    expect(result.success).toBe(true);
    
    const projectPath = join(testWorkspace.path, projectName);
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, 'package.json'))).toBe(true);
  }, 45000);
});