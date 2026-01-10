#!/usr/bin/env bun

/**
 * E2E Test Runner for create-karetech-stack
 * Comprehensive test runner that validates all CLI functionality
 */

import { execSync, spawn } from 'child_process';
import { existsSync, rmSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import pc from 'picocolors';
import { TestEnvironment, PRESET_EXPECTATIONS } from './setup';

const PROJECT_ROOT = resolve(__dirname, '..');
const CLI_PATH = resolve(PROJECT_ROOT, 'dist/index.js');

interface TestResult {
  name: string;
  passed: boolean;
  duration: number;
  error?: string;
}

interface TestSuite {
  name: string;
  file: string;
  description: string;
}

const TEST_SUITES: TestSuite[] = [
  {
    name: 'CLI Commands',
    file: 'tests/e2e/cli.test.ts',
    description: 'Tests basic CLI commands, help, version, and preset generation'
  },
  {
    name: 'Interactive Wizard',
    file: 'tests/e2e/wizard.test.ts', 
    description: 'Tests interactive wizard flow and user input handling'
  },
  {
    name: 'Configuration',
    file: 'tests/e2e/config.test.ts',
    description: 'Tests configuration loading, validation, and export functionality'
  }
];

class TestRunner {
  private results: TestResult[] = [];
  private verbose: boolean;

  constructor(verbose = false) {
    this.verbose = verbose;
  }

  async runAll(): Promise<boolean> {
    console.log(pc.bgBlue(pc.white(' E2E Test Runner for create-karetech-stack ')));
    console.log('');

    // Setup test environment
    console.log(pc.dim('Setting up test environment...'));
    try {
      TestEnvironment.setup();
      await TestEnvironment.checkCLI();
      console.log(pc.green('✓ Test environment ready'));
    } catch (error) {
      console.log(pc.red(`✗ Test environment setup failed: ${error}`));
      return false;
    }

    console.log('');

    // Run each test suite
    let allPassed = true;
    for (const suite of TEST_SUITES) {
      const passed = await this.runTestSuite(suite);
      allPassed = allPassed && passed;
    }

    // Cleanup
    console.log(pc.dim('Cleaning up test environment...'));
    TestEnvironment.teardown();
    console.log(pc.green('✓ Test environment cleaned up'));

    // Print summary
    console.log('');
    this.printSummary();

    return allPassed;
  }

  async runTestSuite(suite: TestSuite): Promise<boolean> {
    console.log(pc.cyan(`Running ${suite.name}...`));
    console.log(pc.dim(`  ${suite.description}`));

    const startTime = Date.now();
    
    try {
      const result = execSync(`bun test ${suite.file}`, {
        encoding: 'utf8',
        cwd: PROJECT_ROOT,
        timeout: 300000 // 5 minutes timeout
      });

      const duration = Date.now() - startTime;
      const testResult: TestResult = {
        name: suite.name,
        passed: true,
        duration
      };

      this.results.push(testResult);
      
      if (this.verbose) {
        console.log(pc.dim(result));
      }
      
      console.log(pc.green(`✓ ${suite.name} passed (${duration}ms)`));
      return true;

    } catch (error: any) {
      const duration = Date.now() - startTime;
      const testResult: TestResult = {
        name: suite.name,
        passed: false,
        duration,
        error: error.message
      };

      this.results.push(testResult);
      
      console.log(pc.red(`✗ ${suite.name} failed (${duration}ms)`));
      
      if (this.verbose || error.stdout) {
        console.log(pc.dim('Output:'));
        console.log(error.stdout || error.message);
      }
      
      return false;
    }
  }

  printSummary(): void {
    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);

    console.log(pc.bold('Test Summary:'));
    console.log('');

    this.results.forEach(result => {
      const status = result.passed ? pc.green('✓') : pc.red('✗');
      const duration = pc.dim(`(${result.duration}ms)`);
      console.log(`  ${status} ${result.name} ${duration}`);
      
      if (!result.passed && result.error) {
        console.log(pc.red(`    Error: ${result.error.split('\\n')[0]}`));
      }
    });

    console.log('');
    
    if (passed === total) {
      console.log(pc.green(`✓ All ${total} test suites passed in ${totalDuration}ms`));
    } else {
      console.log(pc.red(`✗ ${total - passed} of ${total} test suites failed`));
    }
  }
}

/**
 * Quick validation runner that tests all presets quickly
 */
export async function runQuickValidation(): Promise<boolean> {
  console.log(pc.bgYellow(pc.black(' Quick Validation - All Presets ')));
  console.log('');

  TestEnvironment.setup();
  
  const presets = Object.keys(PRESET_EXPECTATIONS);
  let allPassed = true;

  for (const preset of presets) {
    console.log(pc.cyan(`Validating ${preset} preset...`));
    
    try {
      const projectName = `quick-test-${preset}-${Date.now()}`;
      const result = execSync(`bun ${CLI_PATH} create ${projectName} --preset ${preset} --no-install --no-git`, {
        encoding: 'utf8',
        cwd: '/tmp',
        timeout: 30000
      });

      if (result.includes('Project generated successfully')) {
        console.log(pc.green(`✓ ${preset} preset works`));
      } else {
        console.log(pc.red(`✗ ${preset} preset failed`));
        allPassed = false;
      }
    } catch (error) {
      console.log(pc.red(`✗ ${preset} preset failed: ${error}`));
      allPassed = false;
    }
  }

  TestEnvironment.teardown();
  
  console.log('');
  if (allPassed) {
    console.log(pc.green('✓ All presets validation passed'));
  } else {
    console.log(pc.red('✗ Some presets validation failed'));
  }

  return allPassed;
}

// CLI interface
if (import.meta.main) {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose') || args.includes('-v');
  const quick = args.includes('--quick') || args.includes('-q');

  if (quick) {
    runQuickValidation().then(success => {
      process.exit(success ? 0 : 1);
    });
  } else {
    const runner = new TestRunner(verbose);
    runner.runAll().then(success => {
      process.exit(success ? 0 : 1);
    });
  }
}