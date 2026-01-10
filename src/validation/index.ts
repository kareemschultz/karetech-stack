/**
 * Enhanced input validation system
 * Constitutional compliance: Robust validation with TypeScript strict mode
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { ValidationError, ValidationContext, ProjectConfig, DatabaseType, AuthProvider, TestingFramework } from '../types';

// Reserved project names that should not be used
const RESERVED_NAMES = [
  // Node.js and package ecosystem
  'node_modules', 'dist', 'build', '.git', '.next', '.nuxt', '.vite', 'public', 'src',
  'lib', 'app', 'pages', 'components', 'utils', 'types', 'config', 'server', 'client',
  'api', 'test', 'tests', '__tests__', 'docs', 'doc', 'documentation', 'readme',
  'license', 'changelog', 'package', 'yarn', 'npm', 'pnpm', 'bun', 'node', 'deno',

  // Framework names
  'react', 'next', 'vue', 'svelte', 'angular', 'typescript', 'javascript', 'vite',
  'webpack', 'rollup', 'turbo', 'turborepo', 'nx', 'lerna', 'rush',

  // Better-T-Stack ecosystem
  'better-t-stack', 'hono', 'drizzle', 'tanstack', 'orpc', 'better-auth', 'shadcn',
  'karetech-stack', 'create-karetech-stack',

  // Windows reserved names
  'con', 'prn', 'aux', 'nul', 'com1', 'com2', 'com3', 'com4', 'com5', 'com6',
  'com7', 'com8', 'com9', 'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6',
  'lpt7', 'lpt8', 'lpt9'
];

// Common project name patterns that should be avoided
const DISCOURAGED_PATTERNS = [
  /^test$|^temp$|^tmp$/i,
  /^my-?app$/i,
  /^hello-?world$/i,
  /^untitled/i,
  /^new-?project$/i,
  /^app\d*$/i,
  /^project\d*$/i
];

/**
 * Enhanced project name validation
 */
export function validateProjectName(value: string, context?: ValidationContext): ValidationError[] {
  const errors: ValidationError[] = [];

  // Basic validation
  if (!value) {
    errors.push({
      field: 'projectName',
      message: 'Project name is required',
      severity: 'error'
    });
    return errors;
  }

  // Length validation
  if (value.length < 2) {
    errors.push({
      field: 'projectName',
      message: 'Project name must be at least 2 characters',
      severity: 'error'
    });
  }

  if (value.length > 50) {
    errors.push({
      field: 'projectName',
      message: 'Project name must be less than 50 characters',
      severity: 'error'
    });
  }

  // Format validation
  if (!/^[a-z0-9-]+$/.test(value)) {
    errors.push({
      field: 'projectName',
      message: 'Use lowercase letters, numbers, and hyphens only',
      severity: 'error'
    });
  }

  // Structure validation
  if (value.startsWith('-') || value.endsWith('-')) {
    errors.push({
      field: 'projectName',
      message: 'Project name cannot start or end with a hyphen',
      severity: 'error'
    });
  }

  if (value.includes('--')) {
    errors.push({
      field: 'projectName',
      message: 'Project name cannot contain consecutive hyphens',
      severity: 'error'
    });
  }

  // Reserved names validation
  if (RESERVED_NAMES.includes(value.toLowerCase())) {
    errors.push({
      field: 'projectName',
      message: `"${value}" is a reserved name, please choose another`,
      severity: 'error'
    });
  }

  // Discouraged patterns
  for (const pattern of DISCOURAGED_PATTERNS) {
    if (pattern.test(value)) {
      errors.push({
        field: 'projectName',
        message: `"${value}" is a generic name, consider something more specific`,
        severity: 'warning'
      });
      break;
    }
  }

  // Directory existence check
  const projectPath = resolve(process.cwd(), value);
  if (existsSync(projectPath)) {
    errors.push({
      field: 'projectName',
      message: `Directory "${value}" already exists in current location`,
      severity: 'error'
    });
  }

  // npm package name validation
  try {
    execSync(`npm view ${value}`, { stdio: 'ignore' });
    errors.push({
      field: 'projectName',
      message: `Package "${value}" already exists on npm, consider a different name`,
      severity: 'warning'
    });
  } catch {
    // Package doesn't exist on npm, which is good
  }

  return errors;
}

/**
 * Enhanced description validation
 */
export function validateDescription(value: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!value) {
    errors.push({
      field: 'description',
      message: 'Project description is required',
      severity: 'error'
    });
    return errors;
  }

  if (value.length < 3) {
    errors.push({
      field: 'description',
      message: 'Description must be at least 3 characters',
      severity: 'error'
    });
  }

  if (value.length > 200) {
    errors.push({
      field: 'description',
      message: 'Description must be less than 200 characters',
      severity: 'error'
    });
  }

  // Check for placeholder text
  const placeholderPatterns = [
    /^(a|an|my|the)?\s*(awesome|amazing|great|cool|new|simple)?\s*(app|application|project|website|tool)\.?$/i,
    /^todo:?\s/i,
    /^placeholder/i,
    /^description/i
  ];

  for (const pattern of placeholderPatterns) {
    if (pattern.test(value.trim())) {
      errors.push({
        field: 'description',
        message: 'Please provide a more specific description',
        severity: 'warning'
      });
      break;
    }
  }

  return errors;
}

/**
 * Enhanced author validation
 */
export function validateAuthor(value: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!value) {
    errors.push({
      field: 'author',
      message: 'Author name is required',
      severity: 'error'
    });
    return errors;
  }

  if (value.length < 2) {
    errors.push({
      field: 'author',
      message: 'Author name must be at least 2 characters',
      severity: 'error'
    });
  }

  if (value.length > 50) {
    errors.push({
      field: 'author',
      message: 'Author name must be less than 50 characters',
      severity: 'error'
    });
  }

  // Check for placeholder text
  if (/^(your name|author|user|test|placeholder)$/i.test(value.trim())) {
    errors.push({
      field: 'author',
      message: 'Please provide your actual name',
      severity: 'warning'
    });
  }

  return errors;
}

/**
 * Database configuration validation
 */
export function validateDatabase(value: DatabaseType, config: Partial<ProjectConfig>): ValidationError[] {
  const errors: ValidationError[] = [];

  // PostgreSQL requires more setup
  if (value === 'postgresql' && config.auth?.length === 0) {
    errors.push({
      field: 'database',
      message: 'PostgreSQL typically requires authentication setup',
      severity: 'warning'
    });
  }

  // SQLite limitations
  if (value === 'sqlite' && config.testing?.includes('playwright')) {
    errors.push({
      field: 'database',
      message: 'SQLite may have limitations with E2E testing scenarios',
      severity: 'warning'
    });
  }

  return errors;
}

/**
 * Authentication configuration validation
 */
export function validateAuth(value: AuthProvider[], config: Partial<ProjectConfig>): ValidationError[] {
  const errors: ValidationError[] = [];

  // OAuth without email warning
  if (value.includes('oauth') && !value.includes('email')) {
    errors.push({
      field: 'auth',
      message: 'Consider including email auth as OAuth fallback',
      severity: 'warning'
    });
  }

  // GitHub auth compatibility
  if (value.includes('github') && config.cicd !== 'github-actions') {
    errors.push({
      field: 'auth',
      message: 'GitHub auth works best with GitHub Actions CI/CD',
      severity: 'warning'
    });
  }

  // Magic links without email service
  if (value.includes('magic-links') && config.email === 'none') {
    errors.push({
      field: 'auth',
      message: 'Magic links require an email service configuration',
      severity: 'error'
    });
  }

  return errors;
}

/**
 * Testing configuration validation
 */
export function validateTesting(value: TestingFramework[], config: Partial<ProjectConfig>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Both Playwright and Puppeteer is redundant
  if (value.includes('playwright') && value.includes('puppeteer')) {
    errors.push({
      field: 'testing',
      message: 'Both Playwright and Puppeteer provide similar functionality',
      severity: 'warning'
    });
  }

  // E2E testing without Docker for complex scenarios
  if ((value.includes('playwright') || value.includes('puppeteer')) &&
      config.database === 'postgresql' && !config.docker) {
    errors.push({
      field: 'testing',
      message: 'E2E testing with PostgreSQL is easier with Docker',
      severity: 'warning'
    });
  }

  // No testing at all
  if (value.length === 0 && config.unitTesting === false) {
    errors.push({
      field: 'testing',
      message: 'Consider adding at least unit testing for code quality',
      severity: 'warning'
    });
  }

  return errors;
}

/**
 * DevOps configuration validation
 */
export function validateDevOps(docker: boolean, cicd: string, deployTarget: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Docker with Vercel deployment
  if (docker && deployTarget === 'vercel') {
    errors.push({
      field: 'docker',
      message: 'Docker containers are not needed for Vercel deployment',
      severity: 'warning'
    });
  }

  // No CI/CD with Docker
  if (docker && cicd === 'none') {
    errors.push({
      field: 'cicd',
      message: 'Docker containers benefit from automated CI/CD pipelines',
      severity: 'warning'
    });
  }

  return errors;
}

/**
 * Comprehensive configuration validation
 */
export function validateFullConfig(config: Partial<ProjectConfig>, context?: ValidationContext): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate individual fields
  if (config.projectName) {
    errors.push(...validateProjectName(config.projectName, context));
  }

  if (config.description) {
    errors.push(...validateDescription(config.description));
  }

  if (config.author) {
    errors.push(...validateAuthor(config.author));
  }

  if (config.database) {
    errors.push(...validateDatabase(config.database, config));
  }

  if (config.auth) {
    errors.push(...validateAuth(config.auth, config));
  }

  if (config.testing) {
    errors.push(...validateTesting(config.testing, config));
  }

  if (config.docker !== undefined && config.cicd && config.deployTarget) {
    errors.push(...validateDevOps(config.docker, config.cicd, config.deployTarget));
  }

  return errors;
}

/**
 * Get validation context from environment
 */
export function getValidationContext(): ValidationContext {
  let gitAvailable = false;
  let nodeVersion = 'unknown';
  let bunVersion = 'unknown';

  try {
    execSync('git --version', { stdio: 'ignore' });
    gitAvailable = true;
  } catch {
    // Git not available
  }

  try {
    nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  } catch {
    // Node not available
  }

  try {
    bunVersion = execSync('bun --version', { encoding: 'utf8' }).trim();
  } catch {
    // Bun not available
  }

  return {
    config: {},
    existingProjects: [], // TODO: Scan for existing projects
    gitAvailable,
    nodeVersion,
    bunVersion
  };
}