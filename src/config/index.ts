/**
 * Configuration serialization and management system
 * Handles saving, loading, and validating project configurations
 */

import { existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { ProjectConfig } from '../types';

// Configuration file formats
export type ConfigFormat = 'json' | 'yaml';

// Configuration export options
export interface ConfigExportOptions {
  format: ConfigFormat;
  minify?: boolean;
  includeDefaults?: boolean;
}

// Configuration import options
export interface ConfigImportOptions {
  validate?: boolean;
  mergeWithDefaults?: boolean;
}

// Configuration validation result
export interface ConfigValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates a project configuration against schema
 */
export function validateConfig(config: Partial<ProjectConfig>): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!config.projectName) {
    errors.push('Project name is required');
  } else if (!/^[a-z0-9-]+$/.test(config.projectName)) {
    errors.push('Project name must contain only lowercase letters, numbers, and hyphens');
  }

  if (!config.description) {
    errors.push('Project description is required');
  }

  if (!config.author) {
    errors.push('Author name is required');
  }

  // Database validation
  if (config.database && !['postgresql', 'turso', 'sqlite'].includes(config.database)) {
    errors.push(`Invalid database type: ${config.database}`);
  }

  // Authentication validation
  if (config.auth) {
    const validAuthTypes = ['email', 'oauth', 'magic-links', 'github'];
    const invalidAuthTypes = config.auth.filter(type => !validAuthTypes.includes(type));
    if (invalidAuthTypes.length > 0) {
      errors.push(`Invalid auth types: ${invalidAuthTypes.join(', ')}`);
    }
  }

  // UI Style validation
  if (config.uiStyle && !['vega', 'nova', 'maia', 'lyra', 'mira', 'default'].includes(config.uiStyle)) {
    errors.push(`Invalid UI style: ${config.uiStyle}`);
  }

  // Testing validation
  if (config.testing) {
    const validTestingTypes = ['playwright', 'puppeteer', 'vitest'];
    const invalidTestingTypes = config.testing.filter(type => !validTestingTypes.includes(type));
    if (invalidTestingTypes.length > 0) {
      errors.push(`Invalid testing types: ${invalidTestingTypes.join(', ')}`);
    }
  }

  // CI/CD validation
  if (config.cicd && !['github-actions', 'vercel', 'none'].includes(config.cicd)) {
    errors.push(`Invalid CI/CD platform: ${config.cicd}`);
  }

  // PBS Level validation
  if (config.pbsLevel && !['full', 'docs', 'minimal', 'none'].includes(config.pbsLevel)) {
    errors.push(`Invalid PBS level: ${config.pbsLevel}`);
  }

  // Warnings for potential issues
  if (config.docker && config.cicd === 'vercel') {
    warnings.push('Docker configuration may not be needed with Vercel deployment');
  }

  if (config.testing && config.testing.length === 0) {
    warnings.push('No testing frameworks selected - consider adding testing');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Serializes configuration to JSON string
 */
export function serializeToJSON(config: ProjectConfig, minify: boolean = false): string {
  return JSON.stringify(config, null, minify ? 0 : 2);
}

/**
 * Serializes configuration to YAML string
 */
export function serializeToYAML(config: ProjectConfig): string {
  // Simple YAML serialization (can be enhanced with yaml library later)
  const yamlLines: string[] = [];

  yamlLines.push(`# KareTech Stack Configuration`);
  yamlLines.push(`# Generated on ${new Date().toISOString()}`);
  yamlLines.push('');

  // Project info
  yamlLines.push('project:');
  yamlLines.push(`  name: "${config.projectName}"`);
  yamlLines.push(`  description: "${config.description}"`);
  yamlLines.push(`  author: "${config.author}"`);
  yamlLines.push('');

  // Core stack
  yamlLines.push('stack:');
  yamlLines.push(`  database: ${config.database}`);
  yamlLines.push(`  auth: [${config.auth?.map(a => `"${a}"`).join(', ')}]`);
  yamlLines.push(`  apiStyle: ${config.apiStyle}`);
  yamlLines.push('');

  // Design
  yamlLines.push('design:');
  yamlLines.push(`  uiStyle: ${config.uiStyle}`);
  yamlLines.push(`  baseColor: ${config.baseColor}`);
  yamlLines.push(`  accentColor: ${config.accentColor}`);
  yamlLines.push(`  font: ${config.font}`);
  yamlLines.push(`  icons: ${config.icons}`);
  yamlLines.push(`  borderRadius: ${config.borderRadius}`);
  yamlLines.push('');

  // Testing
  yamlLines.push('testing:');
  yamlLines.push(`  frameworks: [${config.testing?.map(t => `"${t}"`).join(', ')}]`);
  yamlLines.push(`  unitTesting: ${config.unitTesting}`);
  yamlLines.push(`  exampleTests: ${config.exampleTests}`);
  yamlLines.push('');

  // DevOps
  yamlLines.push('devops:');
  yamlLines.push(`  docker: ${config.docker}`);
  yamlLines.push(`  cicd: ${config.cicd}`);
  yamlLines.push(`  deployTarget: ${config.deployTarget}`);
  yamlLines.push('');

  // AI Workflow
  yamlLines.push('aiWorkflow:');
  yamlLines.push(`  pbsLevel: ${config.pbsLevel}`);
  yamlLines.push(`  beadsIntegration: ${config.beadsIntegration}`);
  yamlLines.push(`  claudeCodeHooks: ${config.claudeCodeHooks}`);
  yamlLines.push(`  mcpServers: [${config.mcpServers?.map(s => `"${s}"`).join(', ')}]`);
  yamlLines.push('');

  // Extras
  yamlLines.push('extras:');
  yamlLines.push(`  pwa: ${config.pwa}`);
  yamlLines.push(`  analytics: ${config.analytics}`);
  yamlLines.push(`  email: ${config.email}`);
  yamlLines.push(`  errorTracking: ${config.errorTracking}`);
  yamlLines.push(`  featureFlags: ${config.featureFlags}`);

  return yamlLines.join('\n');
}

/**
 * Exports configuration to file
 */
export function exportConfig(
  config: ProjectConfig,
  filePath: string,
  options: ConfigExportOptions = { format: 'json' }
): void {
  const { format, minify = false } = options;

  let content: string;

  switch (format) {
    case 'json':
      content = serializeToJSON(config, minify);
      break;
    case 'yaml':
      content = serializeToYAML(config);
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  writeFileSync(filePath, content, 'utf8');
}

/**
 * Imports configuration from file
 */
export function importConfig(
  filePath: string,
  options: ConfigImportOptions = {}
): ProjectConfig {
  const { validate = true } = options;

  if (!existsSync(filePath)) {
    throw new Error(`Configuration file not found: ${filePath}`);
  }

  const content = readFileSync(filePath, 'utf8');
  let config: ProjectConfig;

  try {
    // Try JSON first
    config = JSON.parse(content);
  } catch {
    // TODO: Add YAML parsing when yaml library is available
    throw new Error('YAML import not yet implemented - use JSON format');
  }

  if (validate) {
    const validation = validateConfig(config);
    if (!validation.isValid) {
      throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
    }
  }

  return config;
}

/**
 * Gets default configuration file path for a project
 */
export function getDefaultConfigPath(projectName: string): string {
  return resolve(process.cwd(), `${projectName}.karetech-config.json`);
}

/**
 * Merges configuration with preset defaults
 */
export function mergeWithPreset(config: Partial<ProjectConfig>, preset: Partial<ProjectConfig>): ProjectConfig {
  return {
    ...preset,
    ...config,
    // Arrays should be overridden completely, not merged
    auth: config.auth ?? preset.auth ?? [],
    testing: config.testing ?? preset.testing ?? [],
    mcpServers: config.mcpServers ?? preset.mcpServers ?? []
  } as ProjectConfig;
}