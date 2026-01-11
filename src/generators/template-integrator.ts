/**
 * Template Integrator for MCP and Claude Code configurations
 * Connects MCP server selection with EJS template generation
 * Constitutional compliance: 100% TypeScript, no any types
 */

import { promises as fs } from 'fs';
import { join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as ejs from 'ejs';
import { ProjectConfig, TemplateContext, McpServer, DatabaseType } from '../types';

/**
 * MCP Server metadata for template generation
 */
interface McpServerConfig {
  name: string;
  displayName: string;
  package: string;
  description: string;
  requiredEnvVars: string[];
  capabilities: string[];
}

/**
 * Template integration result
 */
interface IntegrationResult {
  success: boolean;
  filesGenerated: string[];
  mcpServersConfigured: string[];
  warnings: string[];
  errors: string[];
}

/**
 * MCP Server configurations registry
 */
const MCP_SERVER_REGISTRY: Record<McpServer, McpServerConfig> = {
  filesystem: {
    name: 'filesystem',
    displayName: 'Filesystem Access',
    package: '@modelcontextprotocol/server-filesystem',
    description: 'File system operations for project files',
    requiredEnvVars: [],
    capabilities: ['read_file', 'write_file', 'list_directory', 'search_files']
  },
  github: {
    name: 'github',
    displayName: 'GitHub Integration',
    package: '@modelcontextprotocol/server-github',
    description: 'GitHub repository operations',
    requiredEnvVars: ['GITHUB_TOKEN'],
    capabilities: ['create_issue', 'list_issues', 'create_pull_request', 'get_file_contents']
  },
  postgres: {
    name: 'postgres',
    displayName: 'Database Access',
    package: '@modelcontextprotocol/server-postgres',
    description: 'Database queries and schema operations',
    requiredEnvVars: ['DATABASE_URL'],
    capabilities: ['query', 'schema', 'tables']
  },
  playwright: {
    name: 'playwright',
    displayName: 'Browser Automation',
    package: '@anthropic-ai/mcp-server-playwright',
    description: 'E2E testing and browser automation',
    requiredEnvVars: [],
    capabilities: ['navigate', 'screenshot', 'click', 'fill', 'evaluate']
  }
};

/**
 * Database to MCP server mapping
 */
const DATABASE_MCP_MAPPING: Record<DatabaseType, string> = {
  postgresql: 'postgres',
  turso: 'turso',
  sqlite: 'sqlite',
  none: ''
};

/**
 * Get the appropriate MCP server type for a database
 */
export function getMcpServerForDatabase(database: DatabaseType): string {
  return DATABASE_MCP_MAPPING[database] || '';
}

/**
 * Validate MCP server selection against project configuration
 */
export function validateMcpSelection(config: ProjectConfig): string[] {
  const warnings: string[] = [];

  // Check database MCP server compatibility
  if (config.mcpServers.includes('postgres')) {
    if (config.database === 'none') {
      warnings.push('Database MCP server selected but no database configured');
    }
  }

  // Check Playwright MCP server with testing
  if (config.mcpServers.includes('playwright')) {
    if (!config.testing.includes('playwright')) {
      warnings.push('Playwright MCP server selected but Playwright testing not enabled - consider enabling for full integration');
    }
  }

  // Check GitHub MCP server
  if (config.mcpServers.includes('github')) {
    warnings.push('GitHub MCP server requires GITHUB_TOKEN environment variable');
  }

  // Suggest MCP servers based on configuration
  if (config.database !== 'none' && !config.mcpServers.includes('postgres')) {
    warnings.push(`Consider adding database MCP server for ${config.database} integration`);
  }

  if (config.testing.includes('playwright') && !config.mcpServers.includes('playwright')) {
    warnings.push('Consider adding Playwright MCP server for enhanced testing workflows');
  }

  return warnings;
}

/**
 * Get required environment variables for selected MCP servers
 */
export function getRequiredEnvVars(config: ProjectConfig): Record<string, string> {
  const envVars: Record<string, string> = {};

  for (const server of config.mcpServers) {
    const serverConfig = MCP_SERVER_REGISTRY[server];
    if (serverConfig) {
      for (const envVar of serverConfig.requiredEnvVars) {
        envVars[envVar] = `\${${envVar}}`;
      }
    }
  }

  // Add database-specific env vars
  if (config.mcpServers.includes('postgres')) {
    if (config.database === 'postgresql') {
      envVars['DATABASE_URL'] = `postgresql://postgres:password@localhost:5432/${config.projectName}`;
    } else if (config.database === 'turso') {
      envVars['TURSO_DATABASE_URL'] = 'libsql://your-database.turso.io';
      envVars['TURSO_AUTH_TOKEN'] = '${TURSO_AUTH_TOKEN}';
    }
  }

  return envVars;
}

/**
 * Generate MCP configuration files from templates
 */
async function generateMcpConfigs(
  projectDir: string,
  templatesDir: string,
  context: TemplateContext
): Promise<string[]> {
  const generatedFiles: string[] = [];
  const mcpDir = join(projectDir, '.claude', 'mcp');

  if (!existsSync(mcpDir)) {
    mkdirSync(mcpDir, { recursive: true });
  }

  // Generate main MCP settings
  const mcpSettingsTemplate = join(templatesDir, 'mcp', 'settings.json.ejs');
  if (existsSync(mcpSettingsTemplate)) {
    const templateContent = await fs.readFile(mcpSettingsTemplate, 'utf-8');
    const processed = ejs.render(templateContent, context);
    const outputPath = join(mcpDir, 'settings.json');
    await fs.writeFile(outputPath, processed, 'utf-8');
    generatedFiles.push(outputPath);
  }

  // Generate database-specific MCP config if applicable
  if (context.database !== 'none' && context.mcpServers.includes('postgres')) {
    const dbMcpTemplate = join(templatesDir, 'mcp', context.database, 'mcp-config.json.ejs');
    if (existsSync(dbMcpTemplate)) {
      const templateContent = await fs.readFile(dbMcpTemplate, 'utf-8');
      const processed = ejs.render(templateContent, context);
      const outputPath = join(mcpDir, `${context.database}-mcp.json`);
      await fs.writeFile(outputPath, processed, 'utf-8');
      generatedFiles.push(outputPath);
    }
  }

  // Generate individual MCP server configs
  for (const server of context.mcpServers) {
    if (server === 'postgres') continue; // Handled by database config above

    const serverTemplate = join(templatesDir, 'mcp', server, 'mcp-config.json.ejs');
    if (existsSync(serverTemplate)) {
      const templateContent = await fs.readFile(serverTemplate, 'utf-8');
      const processed = ejs.render(templateContent, context);
      const outputPath = join(mcpDir, `${server}-mcp.json`);
      await fs.writeFile(outputPath, processed, 'utf-8');
      generatedFiles.push(outputPath);
    }
  }

  return generatedFiles;
}

/**
 * Generate Claude Code configuration files from templates
 */
async function generateClaudeCodeConfigs(
  projectDir: string,
  templatesDir: string,
  context: TemplateContext
): Promise<string[]> {
  const generatedFiles: string[] = [];
  const claudeDir = join(projectDir, '.claude');

  if (!existsSync(claudeDir)) {
    mkdirSync(claudeDir, { recursive: true });
  }

  // Generate main settings.json
  const settingsTemplate = join(templatesDir, 'claude-code', 'settings', 'settings.json.ejs');
  if (existsSync(settingsTemplate)) {
    const templateContent = await fs.readFile(settingsTemplate, 'utf-8');
    const processed = ejs.render(templateContent, context);
    const outputPath = join(claudeDir, 'settings.json');
    await fs.writeFile(outputPath, processed, 'utf-8');
    generatedFiles.push(outputPath);
  }

  // Generate hooks if enabled
  if (context.claudeCodeHooks) {
    const hooksDir = join(claudeDir, 'hooks');
    if (!existsSync(hooksDir)) {
      mkdirSync(hooksDir, { recursive: true });
    }

    const hookTemplates = ['pre-commit.js.ejs', 'post-commit.js.ejs'];
    for (const hookTemplate of hookTemplates) {
      const templatePath = join(templatesDir, 'claude-code', 'hooks', hookTemplate);
      if (existsSync(templatePath)) {
        const templateContent = await fs.readFile(templatePath, 'utf-8');
        const processed = ejs.render(templateContent, context);
        const outputPath = join(hooksDir, hookTemplate.replace('.ejs', ''));
        await fs.writeFile(outputPath, processed, 'utf-8');
        await fs.chmod(outputPath, 0o755);
        generatedFiles.push(outputPath);
      }
    }
  }

  // Generate agent definitions
  const agentsDir = join(claudeDir, 'agents');
  if (!existsSync(agentsDir)) {
    mkdirSync(agentsDir, { recursive: true });
  }

  // Main project agent
  const agentTemplate = join(templatesDir, 'claude-code', 'agents', 'project-dev.json.ejs');
  if (existsSync(agentTemplate)) {
    const templateContent = await fs.readFile(agentTemplate, 'utf-8');
    const processed = ejs.render(templateContent, context);
    const outputPath = join(agentsDir, `${context.projectName}-dev.json`);
    await fs.writeFile(outputPath, processed, 'utf-8');
    generatedFiles.push(outputPath);
  }

  // Database agent if database is configured
  if (context.database !== 'none') {
    const dbAgentTemplate = join(templatesDir, 'claude-code', 'agents', 'project-db.json.ejs');
    if (existsSync(dbAgentTemplate)) {
      const templateContent = await fs.readFile(dbAgentTemplate, 'utf-8');
      const processed = ejs.render(templateContent, context);
      // Only write if content is not empty (template has conditional)
      if (processed.trim()) {
        const outputPath = join(agentsDir, `${context.projectName}-db.json`);
        await fs.writeFile(outputPath, processed, 'utf-8');
        generatedFiles.push(outputPath);
      }
    }
  }

  // Generate skill definitions
  const skillsDir = join(claudeDir, 'skills');
  if (!existsSync(skillsDir)) {
    mkdirSync(skillsDir, { recursive: true });
  }

  const skillTemplate = join(templatesDir, 'claude-code', 'skills', 'project-dev.json.ejs');
  if (existsSync(skillTemplate)) {
    const templateContent = await fs.readFile(skillTemplate, 'utf-8');
    const processed = ejs.render(templateContent, context);
    const outputPath = join(skillsDir, `${context.projectName}-dev.json`);
    await fs.writeFile(outputPath, processed, 'utf-8');
    generatedFiles.push(outputPath);
  }

  return generatedFiles;
}

/**
 * Generate environment variable template for MCP servers
 */
async function generateEnvTemplate(
  projectDir: string,
  context: TemplateContext
): Promise<string> {
  const envVars = getRequiredEnvVars(context as ProjectConfig);
  const envContent: string[] = [
    '# Environment Variables for MCP Servers',
    '# Generated by create-karetech-stack',
    ''
  ];

  // Database connection
  if (context.database === 'postgresql') {
    envContent.push('# PostgreSQL Database');
    envContent.push(`DATABASE_URL=postgresql://postgres:password@localhost:5432/${context.projectName}`);
    envContent.push('');
  } else if (context.database === 'turso') {
    envContent.push('# Turso Database');
    envContent.push('TURSO_DATABASE_URL=libsql://your-database.turso.io');
    envContent.push('TURSO_AUTH_TOKEN=your-auth-token');
    envContent.push('');
  }

  // GitHub integration
  if (context.mcpServers.includes('github')) {
    envContent.push('# GitHub Integration');
    envContent.push('GITHUB_TOKEN=your-github-personal-access-token');
    envContent.push('');
  }

  // Add other MCP-specific env vars
  for (const [key, value] of Object.entries(envVars)) {
    if (!envContent.some(line => line.startsWith(key))) {
      envContent.push(`${key}=${value}`);
    }
  }

  const envPath = join(projectDir, '.env.mcp.example');
  await fs.writeFile(envPath, envContent.join('\n'), 'utf-8');
  return envPath;
}

/**
 * Main integration function - connects MCP configs with template generation
 */
export async function integrateTemplates(
  projectDir: string,
  config: ProjectConfig,
  context: TemplateContext
): Promise<IntegrationResult> {
  const result: IntegrationResult = {
    success: true,
    filesGenerated: [],
    mcpServersConfigured: [],
    warnings: [],
    errors: []
  };

  const templatesDir = resolve(__dirname, '../../templates');

  try {
    // Validate MCP selection
    const validationWarnings = validateMcpSelection(config);
    result.warnings.push(...validationWarnings);

    // Skip if PBS level is none
    if (config.pbsLevel === 'none') {
      console.log('⏭️  Skipping Claude Code and MCP configuration (PBS level: none)');
      return result;
    }

    // Generate MCP configurations
    console.log('🔌 Generating MCP server configurations...');
    const mcpFiles = await generateMcpConfigs(projectDir, templatesDir, context);
    result.filesGenerated.push(...mcpFiles);
    result.mcpServersConfigured.push(...config.mcpServers);

    // Generate Claude Code configurations
    console.log('⚙️  Generating Claude Code configurations...');
    const claudeFiles = await generateClaudeCodeConfigs(projectDir, templatesDir, context);
    result.filesGenerated.push(...claudeFiles);

    // Generate environment template
    if (config.mcpServers.length > 0) {
      console.log('📝 Generating MCP environment template...');
      const envFile = await generateEnvTemplate(projectDir, context);
      result.filesGenerated.push(envFile);
    }

    console.log(`✅ Template integration complete (${result.filesGenerated.length} files generated)`);

  } catch (error) {
    result.success = false;
    result.errors.push(error instanceof Error ? error.message : 'Unknown integration error');
    console.error('❌ Template integration failed:', error);
  }

  return result;
}

/**
 * Get MCP server info for display
 */
export function getMcpServerInfo(server: McpServer): McpServerConfig {
  return MCP_SERVER_REGISTRY[server];
}

/**
 * Get all available MCP servers
 */
export function getAvailableMcpServers(): McpServer[] {
  return Object.keys(MCP_SERVER_REGISTRY) as McpServer[];
}

/**
 * Check if MCP server is compatible with database
 */
export function isMcpCompatibleWithDatabase(server: McpServer, database: DatabaseType): boolean {
  if (server !== 'postgres') return true;
  return database !== 'none';
}

/**
 * Generate suggested MCP servers based on project config
 */
export function getSuggestedMcpServers(config: ProjectConfig): McpServer[] {
  const suggested: McpServer[] = ['filesystem']; // Always suggest filesystem

  if (config.database !== 'none') {
    suggested.push('postgres');
  }

  if (config.testing.includes('playwright')) {
    suggested.push('playwright');
  }

  // GitHub is optional but useful
  suggested.push('github');

  return suggested;
}
