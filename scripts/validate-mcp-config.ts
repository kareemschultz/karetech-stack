#!/usr/bin/env bun
/**
 * MCP Configuration Validator
 * Validates MCP server configurations in the registry and generated projects
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

interface MCPServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
  description?: string;
}

interface MCPConfiguration {
  $schema?: string;
  mcpServers: Record<string, MCPServerConfig>;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  info: string[];
}

function log(emoji: string, message: string): void {
  console.log(`${emoji} ${message}`);
}

function validateServerConfig(name: string, config: MCPServerConfig): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    info: []
  };

  // Validate command
  if (!config.command) {
    result.errors.push(`Server "${name}": missing command`);
    result.valid = false;
  } else if (!['npx', 'node', 'bun', 'bunx'].includes(config.command)) {
    result.warnings.push(`Server "${name}": unusual command "${config.command}"`);
  }

  // Validate args
  if (!config.args || !Array.isArray(config.args)) {
    result.errors.push(`Server "${name}": missing or invalid args array`);
    result.valid = false;
  } else if (config.args.length === 0) {
    result.warnings.push(`Server "${name}": empty args array`);
  }

  // Check for environment variables
  if (config.env) {
    for (const [key, value] of Object.entries(config.env)) {
      if (value.includes('${') && !value.includes('}')) {
        result.errors.push(`Server "${name}": malformed env variable reference for ${key}`);
        result.valid = false;
      }
      if (value.startsWith('${') && value.endsWith('}')) {
        const varName = value.slice(2, -1).split(':-')[0];
        result.info.push(`Server "${name}": requires env var ${varName}`);
      }
    }
  }

  // Validate known MCP server packages
  const knownPackages = [
    '@modelcontextprotocol/server-filesystem',
    '@modelcontextprotocol/server-github',
    '@modelcontextprotocol/server-postgres',
    '@anthropic-ai/mcp-server-playwright',
    '@modelcontextprotocol/server-sqlite',
    '@modelcontextprotocol/server-brave-search',
  ];

  if (config.args.length > 0) {
    const packageArg = config.args.find(arg => arg.startsWith('@'));
    if (packageArg && !knownPackages.some(pkg => packageArg.startsWith(pkg.split('/')[0]))) {
      result.info.push(`Server "${name}": uses non-standard MCP package "${packageArg}"`);
    }
  }

  return result;
}

function validateMCPFile(filePath: string): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    info: []
  };

  if (!existsSync(filePath)) {
    result.errors.push(`File not found: ${filePath}`);
    result.valid = false;
    return result;
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    const config: MCPConfiguration = JSON.parse(content);

    // Validate schema
    if (config.$schema) {
      result.info.push(`Using schema: ${config.$schema}`);
    } else {
      result.warnings.push('No $schema defined in configuration');
    }

    // Validate mcpServers
    if (!config.mcpServers) {
      result.errors.push('Missing mcpServers property');
      result.valid = false;
      return result;
    }

    if (typeof config.mcpServers !== 'object') {
      result.errors.push('mcpServers must be an object');
      result.valid = false;
      return result;
    }

    const serverNames = Object.keys(config.mcpServers);
    result.info.push(`Found ${serverNames.length} MCP server(s): ${serverNames.join(', ')}`);

    // Validate each server
    for (const [name, serverConfig] of Object.entries(config.mcpServers)) {
      const serverResult = validateServerConfig(name, serverConfig);
      result.errors.push(...serverResult.errors);
      result.warnings.push(...serverResult.warnings);
      result.info.push(...serverResult.info);
      if (!serverResult.valid) {
        result.valid = false;
      }
    }

  } catch (error) {
    result.errors.push(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    result.valid = false;
  }

  return result;
}

async function validateRegistry(): Promise<ValidationResult> {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    info: []
  };

  const registryPath = join(process.cwd(), 'src/mcp/registry.ts');

  if (!existsSync(registryPath)) {
    result.errors.push('MCP registry not found at src/mcp/registry.ts');
    result.valid = false;
    return result;
  }

  const typesPath = join(process.cwd(), 'src/mcp/types.ts');
  if (!existsSync(typesPath)) {
    result.errors.push('MCP types not found at src/mcp/types.ts');
    result.valid = false;
  } else {
    result.info.push('MCP types module found');
  }

  const serverConfigsPath = join(process.cwd(), 'src/mcp/server-configs.ts');
  if (!existsSync(serverConfigsPath)) {
    result.warnings.push('MCP server-configs not found at src/mcp/server-configs.ts');
  } else {
    result.info.push('MCP server-configs module found');
  }

  const mcpGeneratorPath = join(process.cwd(), 'src/generators/mcp.ts');
  if (!existsSync(mcpGeneratorPath)) {
    result.warnings.push('MCP generator not found at src/generators/mcp.ts');
  } else {
    result.info.push('MCP generator module found');
  }

  return result;
}

async function main(): Promise<void> {
  console.log('\n🔌 KareTech Stack MCP Configuration Validator\n');
  console.log('='.repeat(60));

  // Check for .mcp.json in project root
  console.log('\n📄 Checking Project MCP Configuration:\n');

  const mcpJsonPath = join(process.cwd(), '.mcp.json');
  if (existsSync(mcpJsonPath)) {
    const result = validateMCPFile(mcpJsonPath);

    for (const error of result.errors) {
      log('❌', error);
    }
    for (const warning of result.warnings) {
      log('⚠️', warning);
    }
    for (const info of result.info) {
      log('ℹ️', info);
    }

    log(result.valid ? '✅' : '❌', `.mcp.json validation: ${result.valid ? 'PASSED' : 'FAILED'}`);
  } else {
    log('ℹ️', 'No .mcp.json found in project root (this is normal for CLI development)');
  }

  // Validate MCP registry module
  console.log('\n📚 Checking MCP Registry Module:\n');

  const registryResult = await validateRegistry();

  for (const error of registryResult.errors) {
    log('❌', error);
  }
  for (const warning of registryResult.warnings) {
    log('⚠️', warning);
  }
  for (const info of registryResult.info) {
    log('ℹ️', info);
  }

  log(registryResult.valid ? '✅' : '❌', `Registry validation: ${registryResult.valid ? 'PASSED' : 'FAILED'}`);

  // Check MCP template files
  console.log('\n📂 Checking MCP Templates:\n');

  const templateDir = join(process.cwd(), 'templates/mcp');
  if (existsSync(templateDir)) {
    log('✅', 'MCP templates directory exists');
    // Could add more template validation here
  } else {
    log('⚠️', 'MCP templates directory not found at templates/mcp');
  }

  // Validate types consistency
  console.log('\n🔍 Checking Type Definitions:\n');

  const mcpTypesPath = join(process.cwd(), 'src/mcp/types.ts');
  const mainTypesPath = join(process.cwd(), 'src/types/index.ts');

  if (existsSync(mcpTypesPath) && existsSync(mainTypesPath)) {
    const mcpTypes = readFileSync(mcpTypesPath, 'utf-8');
    const mainTypes = readFileSync(mainTypesPath, 'utf-8');

    // Check for McpServer type consistency
    if (mcpTypes.includes('MCPServerCategory') && mainTypes.includes('McpServer')) {
      log('✅', 'MCP types are defined in both modules');
    } else {
      log('⚠️', 'MCP type definitions may be incomplete');
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Validation Summary:\n');

  const allValid = registryResult.valid;

  if (allValid) {
    log('✅', 'All MCP configurations are valid');
    process.exit(0);
  } else {
    log('❌', 'Some MCP configurations have issues');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error running MCP validation:', error);
  process.exit(1);
});
