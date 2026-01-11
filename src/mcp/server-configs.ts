/**
 * MCP Server Configurations
 * Vetted, pre-configured MCP servers for common development tools
 * Constitutional compliance: All servers tested and validated
 */

import { MCPServerConfig } from './types';

/**
 * GitHub MCP Server
 * Official Anthropic server for GitHub repository operations
 */
export const githubServer: MCPServerConfig = {
  id: 'github',
  name: 'GitHub',
  description: 'Official Anthropic MCP server for GitHub repository operations including issues, PRs, and commits',
  category: 'github',
  packageName: '@anthropic-ai/mcp-server-github',
  version: '^0.6.0',
  command: 'node',
  args: ['node_modules/@anthropic-ai/mcp-server-github/dist/index.js'],
  capabilities: [
    'repository-management',
    'issue-management',
    'pull-request-operations',
    'commit-history',
    'branch-management',
    'code-search',
    'file-operations'
  ],
  autoInstall: true,
  presetCompatibility: ['saas', 'ecommerce', 'blog', 'devtool', 'portfolio', 'minimal'],
  envVariables: [
    {
      name: 'GITHUB_PERSONAL_ACCESS_TOKEN',
      description: 'GitHub Personal Access Token with repo permissions',
      required: true,
      placeholder: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  ],
  requiresNetwork: true,
  docsUrl: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/github',
  isOfficial: true
};

/**
 * PostgreSQL MCP Server
 * Official Anthropic server for PostgreSQL database operations
 */
export const postgresServer: MCPServerConfig = {
  id: 'postgres',
  name: 'PostgreSQL',
  description: 'Official Anthropic MCP server for PostgreSQL database schema management and query execution',
  category: 'database',
  packageName: '@anthropic-ai/mcp-server-postgres',
  version: '^0.6.0',
  command: 'node',
  args: ['node_modules/@anthropic-ai/mcp-server-postgres/dist/index.js'],
  capabilities: [
    'schema-management',
    'query-execution',
    'table-operations',
    'migration-support',
    'connection-pooling',
    'transaction-support'
  ],
  autoInstall: true,
  presetCompatibility: ['saas', 'ecommerce', 'devtool'],
  envVariables: [
    {
      name: 'POSTGRES_CONNECTION_STRING',
      description: 'PostgreSQL connection string',
      required: true,
      placeholder: 'postgresql://user:password@localhost:5432/database'
    }
  ],
  supportedDatabases: ['postgresql'],
  requiresNetwork: true,
  docsUrl: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/postgres',
  isOfficial: true
};

/**
 * Turso/LibSQL MCP Server
 * Community server for Turso and LibSQL database operations
 */
export const tursoServer: MCPServerConfig = {
  id: 'turso',
  name: 'Turso',
  description: 'MCP server for Turso and LibSQL database operations with edge-ready performance',
  category: 'database',
  packageName: '@libsql/mcp-server-turso',
  version: '^0.1.0',
  command: 'node',
  args: ['node_modules/@libsql/mcp-server-turso/dist/index.js'],
  capabilities: [
    'schema-management',
    'query-execution',
    'table-operations',
    'embedded-replicas',
    'edge-deployment'
  ],
  autoInstall: true,
  presetCompatibility: ['saas', 'blog', 'portfolio', 'minimal'],
  envVariables: [
    {
      name: 'TURSO_DATABASE_URL',
      description: 'Turso database URL',
      required: true,
      placeholder: 'libsql://your-database.turso.io'
    },
    {
      name: 'TURSO_AUTH_TOKEN',
      description: 'Turso authentication token',
      required: true,
      placeholder: 'your-turso-auth-token'
    }
  ],
  supportedDatabases: ['turso', 'sqlite'],
  requiresNetwork: true,
  docsUrl: 'https://docs.turso.tech/sdk/ts/reference',
  isOfficial: false
};

/**
 * SQLite MCP Server
 * MCP server for local SQLite database operations
 */
export const sqliteServer: MCPServerConfig = {
  id: 'sqlite',
  name: 'SQLite',
  description: 'MCP server for SQLite database operations with local file storage',
  category: 'database',
  packageName: '@anthropic-ai/mcp-server-sqlite',
  version: '^0.6.0',
  command: 'node',
  args: ['node_modules/@anthropic-ai/mcp-server-sqlite/dist/index.js'],
  capabilities: [
    'schema-management',
    'query-execution',
    'table-operations',
    'local-storage',
    'in-memory-mode'
  ],
  autoInstall: true,
  presetCompatibility: ['blog', 'portfolio', 'minimal', 'devtool'],
  envVariables: [
    {
      name: 'SQLITE_DATABASE_PATH',
      description: 'Path to SQLite database file',
      required: true,
      placeholder: './data/database.sqlite',
      defaultValue: './data/database.sqlite'
    }
  ],
  supportedDatabases: ['sqlite'],
  requiresNetwork: false,
  docsUrl: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/sqlite',
  isOfficial: true
};

/**
 * Filesystem MCP Server
 * Official Anthropic server for local file system access
 */
export const filesystemServer: MCPServerConfig = {
  id: 'filesystem',
  name: 'Filesystem',
  description: 'Official Anthropic MCP server for safe local file system access and operations',
  category: 'filesystem',
  packageName: '@anthropic-ai/mcp-server-filesystem',
  version: '^0.6.0',
  command: 'node',
  args: ['node_modules/@anthropic-ai/mcp-server-filesystem/dist/index.js', '--directory', '.'],
  capabilities: [
    'file-read',
    'file-write',
    'directory-listing',
    'file-search',
    'file-move',
    'file-delete',
    'safe-operations'
  ],
  autoInstall: true,
  presetCompatibility: ['saas', 'ecommerce', 'blog', 'devtool', 'portfolio', 'minimal'],
  envVariables: [
    {
      name: 'MCP_FILESYSTEM_ROOT',
      description: 'Root directory for filesystem access (defaults to project root)',
      required: false,
      placeholder: './',
      defaultValue: './'
    }
  ],
  requiresNetwork: false,
  docsUrl: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/filesystem',
  isOfficial: true
};

/**
 * Playwright MCP Server
 * Official Anthropic server for browser automation and E2E testing
 */
export const playwrightServer: MCPServerConfig = {
  id: 'playwright',
  name: 'Playwright',
  description: 'Official Anthropic MCP server for browser automation, E2E testing, and web scraping',
  category: 'testing',
  packageName: '@anthropic-ai/mcp-server-playwright',
  version: '^0.6.0',
  command: 'node',
  args: ['node_modules/@anthropic-ai/mcp-server-playwright/dist/index.js'],
  capabilities: [
    'browser-automation',
    'e2e-testing',
    'screenshot-capture',
    'page-navigation',
    'element-interaction',
    'network-interception',
    'multi-browser-support'
  ],
  autoInstall: true,
  presetCompatibility: ['saas', 'ecommerce', 'devtool'],
  envVariables: [
    {
      name: 'PLAYWRIGHT_HEADLESS',
      description: 'Run browser in headless mode',
      required: false,
      placeholder: 'true',
      defaultValue: 'true'
    },
    {
      name: 'PLAYWRIGHT_BROWSER',
      description: 'Browser to use (chromium, firefox, webkit)',
      required: false,
      placeholder: 'chromium',
      defaultValue: 'chromium'
    }
  ],
  requiresNetwork: true,
  docsUrl: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/playwright',
  isOfficial: true
};

/**
 * Memory MCP Server
 * Official Anthropic server for persistent memory and context management
 */
export const memoryServer: MCPServerConfig = {
  id: 'memory',
  name: 'Memory',
  description: 'Official Anthropic MCP server for persistent memory and knowledge graph management',
  category: 'ai',
  packageName: '@anthropic-ai/mcp-server-memory',
  version: '^0.6.0',
  command: 'node',
  args: ['node_modules/@anthropic-ai/mcp-server-memory/dist/index.js'],
  capabilities: [
    'knowledge-storage',
    'entity-management',
    'relationship-tracking',
    'context-persistence',
    'semantic-search'
  ],
  autoInstall: false,
  presetCompatibility: ['saas', 'devtool'],
  envVariables: [
    {
      name: 'MCP_MEMORY_STORE_PATH',
      description: 'Path to store memory data',
      required: false,
      placeholder: './.claude/memory',
      defaultValue: './.claude/memory'
    }
  ],
  requiresNetwork: false,
  docsUrl: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/memory',
  isOfficial: true
};

/**
 * Fetch MCP Server
 * Official Anthropic server for HTTP requests and web fetching
 */
export const fetchServer: MCPServerConfig = {
  id: 'fetch',
  name: 'Fetch',
  description: 'Official Anthropic MCP server for making HTTP requests and fetching web content',
  category: 'ai',
  packageName: '@anthropic-ai/mcp-server-fetch',
  version: '^0.6.0',
  command: 'node',
  args: ['node_modules/@anthropic-ai/mcp-server-fetch/dist/index.js'],
  capabilities: [
    'http-requests',
    'web-fetching',
    'api-calls',
    'content-extraction',
    'html-parsing'
  ],
  autoInstall: false,
  presetCompatibility: ['saas', 'ecommerce', 'blog', 'devtool'],
  envVariables: [],
  requiresNetwork: true,
  docsUrl: 'https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-servers/fetch',
  isOfficial: true
};

/**
 * Sentry MCP Server
 * MCP server for Sentry error tracking integration
 */
export const sentryServer: MCPServerConfig = {
  id: 'sentry',
  name: 'Sentry',
  description: 'MCP server for Sentry error tracking, issue management, and monitoring',
  category: 'monitoring',
  packageName: '@sentry/mcp-server',
  version: '^0.1.0',
  command: 'node',
  args: ['node_modules/@sentry/mcp-server/dist/index.js'],
  capabilities: [
    'error-tracking',
    'issue-management',
    'performance-monitoring',
    'alert-management',
    'release-tracking'
  ],
  autoInstall: false,
  presetCompatibility: ['saas', 'ecommerce'],
  envVariables: [
    {
      name: 'SENTRY_AUTH_TOKEN',
      description: 'Sentry authentication token',
      required: true,
      placeholder: 'sntrys_xxxxxxxxxxxxxxxxxxxx'
    },
    {
      name: 'SENTRY_ORG',
      description: 'Sentry organization slug',
      required: true,
      placeholder: 'your-org-slug'
    },
    {
      name: 'SENTRY_PROJECT',
      description: 'Sentry project slug',
      required: true,
      placeholder: 'your-project-slug'
    }
  ],
  requiresNetwork: true,
  docsUrl: 'https://docs.sentry.io/product/integrations/',
  isOfficial: false
};

/**
 * All available MCP server configurations
 */
export const allServers: MCPServerConfig[] = [
  githubServer,
  postgresServer,
  tursoServer,
  sqliteServer,
  filesystemServer,
  playwrightServer,
  memoryServer,
  fetchServer,
  sentryServer
];

/**
 * Map of server ID to configuration for quick lookup
 */
export const serverById: Record<string, MCPServerConfig> = Object.fromEntries(
  allServers.map(server => [server.id, server])
);

/**
 * Get servers by category
 */
export function getServersByCategory(category: MCPServerConfig['category']): MCPServerConfig[] {
  return allServers.filter(server => server.category === category);
}

/**
 * Get servers compatible with a preset
 */
export function getServersForPreset(preset: string): MCPServerConfig[] {
  return allServers.filter(server =>
    server.presetCompatibility.includes(preset as MCPServerConfig['presetCompatibility'][number])
  );
}

/**
 * Get auto-installable servers
 */
export function getAutoInstallServers(): MCPServerConfig[] {
  return allServers.filter(server => server.autoInstall);
}

/**
 * Get official Anthropic servers
 */
export function getOfficialServers(): MCPServerConfig[] {
  return allServers.filter(server => server.isOfficial);
}
