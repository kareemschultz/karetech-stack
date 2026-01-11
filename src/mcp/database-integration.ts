/**
 * Database MCP Server Integration Module
 * Task 1.5: Pre-configure Database MCP Servers
 *
 * Provides auto-configuration for database MCP servers based on project database choice:
 * - PostgreSQL: @modelcontextprotocol/server-postgres
 * - SQLite: @modelcontextprotocol/server-sqlite
 * - Turso: mcp-turso (libSQL)
 *
 * Constitutional compliance: 100% TypeScript, no any types
 */

import { DatabaseType, ProjectConfig } from '../types';

/**
 * Database MCP server package information
 */
export interface DatabaseMcpPackage {
  /** NPM package name */
  package: string;
  /** Package version (latest if not specified) */
  version?: string;
  /** Whether the package is from the official MCP organization */
  official: boolean;
  /** Package description */
  description: string;
  /** Package repository URL */
  repository?: string;
}

/**
 * Environment variable configuration for database MCP servers
 */
export interface DatabaseEnvConfig {
  /** Required environment variables */
  required: string[];
  /** Optional environment variables */
  optional: string[];
  /** Default values for environment variables */
  defaults: Record<string, string>;
  /** Template for .env.example */
  envTemplate: string;
}

/**
 * Database MCP server configuration
 */
export interface DatabaseMcpConfig {
  /** Database type this config applies to */
  databaseType: DatabaseType;
  /** MCP server name for settings.json */
  serverName: string;
  /** Human-readable display name */
  displayName: string;
  /** Server description */
  description: string;
  /** Package information */
  package: DatabaseMcpPackage;
  /** Command to run the server */
  command: string;
  /** Command arguments */
  args: string[];
  /** Environment variables configuration */
  env: DatabaseEnvConfig;
  /** Capabilities provided by this server */
  capabilities: string[];
  /** Security notes */
  securityNotes: string[];
  /** Whether this server provides read-only access */
  readOnly: boolean;
}

/**
 * Database MCP server registry
 * Maps database types to their MCP server configurations
 */
export const DATABASE_MCP_REGISTRY: Record<Exclude<DatabaseType, 'none'>, DatabaseMcpConfig> = {
  postgresql: {
    databaseType: 'postgresql',
    serverName: 'postgres',
    displayName: 'PostgreSQL MCP Server',
    description: 'Read-only access to PostgreSQL databases for schema inspection and query execution',
    package: {
      package: '@modelcontextprotocol/server-postgres',
      version: '0.6.2',
      official: true,
      description: 'Official MCP PostgreSQL server by Anthropic',
      repository: 'https://github.com/modelcontextprotocol/servers'
    },
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres'],
    env: {
      required: ['DATABASE_URL'],
      optional: ['PGPASSWORD', 'PGHOST', 'PGPORT', 'PGUSER', 'PGDATABASE'],
      defaults: {
        DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/database_name'
      },
      envTemplate: `# PostgreSQL Database Configuration
# Connection URL format: postgresql://user:password@host:port/database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/{{projectName}}

# Alternative: Use individual environment variables
# PGHOST=localhost
# PGPORT=5432
# PGUSER=postgres
# PGPASSWORD=postgres
# PGDATABASE={{projectName}}`
    },
    capabilities: [
      'Schema inspection (tables, columns, types)',
      'Read-only SQL query execution',
      'Automatic schema discovery from metadata',
      'Database structure analysis'
    ],
    securityNotes: [
      'Provides read-only access only - cannot modify data',
      'Uses read-only transactions for protected execution',
      'Store credentials in environment variables, never in code',
      'Consider using connection pooling for production'
    ],
    readOnly: true
  },

  sqlite: {
    databaseType: 'sqlite',
    serverName: 'sqlite',
    displayName: 'SQLite MCP Server',
    description: 'Direct access to local SQLite database files for querying and schema analysis',
    package: {
      package: '@modelcontextprotocol/server-sqlite',
      version: 'latest',
      official: true,
      description: 'Official MCP SQLite server by Anthropic',
      repository: 'https://github.com/modelcontextprotocol/servers'
    },
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sqlite'],
    env: {
      required: ['SQLITE_DB_PATH'],
      optional: [],
      defaults: {
        SQLITE_DB_PATH: './data/local.db'
      },
      envTemplate: `# SQLite Database Configuration
# Path to the SQLite database file (relative to project root)
SQLITE_DB_PATH=./data/{{projectName}}.db

# Alternative paths:
# SQLITE_DB_PATH=./prisma/dev.db
# SQLITE_DB_PATH=./drizzle/local.db`
    },
    capabilities: [
      'Local database file access',
      'Schema inspection and querying',
      'Database structure analysis',
      'Direct file-based operations'
    ],
    securityNotes: [
      'Ensure database file permissions are properly set',
      'Use absolute paths in production environments',
      'Back up database before AI-assisted operations',
      'Consider file locking for concurrent access'
    ],
    readOnly: false
  },

  turso: {
    databaseType: 'turso',
    serverName: 'turso',
    displayName: 'Turso MCP Server',
    description: 'Access to Turso-hosted libSQL databases for cloud-native SQLite operations',
    package: {
      package: 'mcp-turso',
      version: 'latest',
      official: false,
      description: 'Community MCP server for Turso libSQL databases by nbbaier',
      repository: 'https://github.com/nbbaier/mcp-turso'
    },
    command: 'npx',
    args: ['-y', 'mcp-turso'],
    env: {
      required: ['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN'],
      optional: ['TURSO_ORG_NAME'],
      defaults: {
        TURSO_DATABASE_URL: 'libsql://your-database.turso.io',
        TURSO_AUTH_TOKEN: 'your-auth-token'
      },
      envTemplate: `# Turso Database Configuration
# Get these values from Turso dashboard: https://turso.tech/app

# Database URL (libsql protocol)
TURSO_DATABASE_URL=libsql://{{projectName}}-{{author}}.turso.io

# Auth token from Turso dashboard
TURSO_AUTH_TOKEN=your-turso-auth-token

# Optional: Organization name for team accounts
# TURSO_ORG_NAME=your-org-name`
    },
    capabilities: [
      'Cloud-hosted libSQL access',
      'SQL query execution',
      'Schema management and inspection',
      'Edge-optimized database operations',
      'Global replication support'
    ],
    securityNotes: [
      'Store auth token securely - never commit to version control',
      'Use environment-specific tokens (dev/staging/prod)',
      'Rotate tokens regularly for security',
      'Enable audit logging in Turso dashboard'
    ],
    readOnly: false
  }
};

/**
 * Get database MCP configuration based on project database type
 */
export function getDatabaseMcpConfig(databaseType: DatabaseType): DatabaseMcpConfig | null {
  if (databaseType === 'none') {
    return null;
  }
  return DATABASE_MCP_REGISTRY[databaseType];
}

/**
 * Generate connection string template based on database type and project config
 */
export function generateConnectionString(
  databaseType: DatabaseType,
  projectName: string,
  options: {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
  } = {}
): string {
  const { host = 'localhost', user = 'postgres', password = 'postgres' } = options;

  switch (databaseType) {
    case 'postgresql': {
      const port = options.port ?? 5432;
      return `postgresql://${user}:${password}@${host}:${port}/${projectName}`;
    }
    case 'sqlite':
      return `./data/${projectName}.db`;
    case 'turso':
      return `libsql://${projectName}.turso.io`;
    case 'none':
      return '';
    default:
      return '';
  }
}

/**
 * Generate MCP server configuration for Claude Code settings.json
 */
export function generateMcpServerConfig(
  databaseType: DatabaseType,
  projectConfig: ProjectConfig
): Record<string, unknown> | null {
  const mcpConfig = getDatabaseMcpConfig(databaseType);
  if (!mcpConfig) {
    return null;
  }

  const config: Record<string, unknown> = {
    command: mcpConfig.command,
    args: [...mcpConfig.args]
  };

  // Add database-specific arguments
  switch (databaseType) {
    case 'postgresql':
      // PostgreSQL takes connection string as argument
      (config.args as string[]).push('${DATABASE_URL}');
      config.env = {
        DATABASE_URL: generateConnectionString('postgresql', projectConfig.projectName)
      };
      break;

    case 'sqlite':
      // SQLite takes file path as argument
      (config.args as string[]).push(`./data/${projectConfig.projectName}.db`);
      break;

    case 'turso':
      // Turso uses environment variables
      config.env = {
        TURSO_DATABASE_URL: '${TURSO_DATABASE_URL}',
        TURSO_AUTH_TOKEN: '${TURSO_AUTH_TOKEN}'
      };
      break;
  }

  return config;
}

/**
 * Generate environment variable template for database MCP servers
 */
export function generateEnvTemplate(
  databaseType: DatabaseType,
  projectConfig: ProjectConfig
): string {
  const mcpConfig = getDatabaseMcpConfig(databaseType);
  if (!mcpConfig) {
    return '';
  }

  // Replace placeholders in template
  let template = mcpConfig.env.envTemplate;
  template = template.replace(/\{\{projectName\}\}/g, projectConfig.projectName);
  template = template.replace(/\{\{author\}\}/g, projectConfig.author || 'user');

  return template;
}

/**
 * Validate database MCP server requirements
 */
export function validateDatabaseMcpRequirements(
  databaseType: DatabaseType,
  projectConfig: ProjectConfig
): { valid: boolean; warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];

  const mcpConfig = getDatabaseMcpConfig(databaseType);
  if (!mcpConfig) {
    return { valid: true, warnings: [], errors: [] };
  }

  // Check if database MCP is in the selected MCP servers
  const expectedServerName = databaseType === 'postgresql' ? 'postgres' : databaseType;
  const hasDatabaseMcp = projectConfig.mcpServers.includes(expectedServerName as 'postgres');

  if (!hasDatabaseMcp && databaseType !== 'none') {
    warnings.push(
      `Database is ${databaseType} but ${mcpConfig.displayName} is not enabled. ` +
      `Consider adding '${expectedServerName}' to mcpServers for AI database access.`
    );
  }

  // Turso-specific validations
  if (databaseType === 'turso') {
    warnings.push(
      'Turso MCP server (mcp-turso) is a community package. ' +
      'Ensure you trust the package before using in production.'
    );
  }

  // SQLite-specific validations
  if (databaseType === 'sqlite') {
    warnings.push(
      'SQLite MCP server has write access. Ensure proper backup procedures.'
    );
  }

  return { valid: errors.length === 0, warnings, errors };
}

/**
 * Get all required npm packages for database MCP servers
 */
export function getDatabaseMcpPackages(
  projectConfig: ProjectConfig
): { package: string; version?: string }[] {
  const packages: { package: string; version?: string }[] = [];

  // Add database-specific MCP package
  const mcpConfig = getDatabaseMcpConfig(projectConfig.database);
  if (mcpConfig) {
    packages.push({
      package: mcpConfig.package.package,
      version: mcpConfig.package.version
    });
  }

  return packages;
}

/**
 * Generate documentation for database MCP server setup
 */
export function generateMcpSetupDocs(
  databaseType: DatabaseType,
  projectConfig: ProjectConfig
): string {
  const mcpConfig = getDatabaseMcpConfig(databaseType);
  if (!mcpConfig) {
    return '';
  }

  return `## ${mcpConfig.displayName} Setup

${mcpConfig.description}

### Package Information
- **Package**: \`${mcpConfig.package.package}\`
- **Version**: ${mcpConfig.package.version || 'latest'}
- **Official**: ${mcpConfig.package.official ? 'Yes (Anthropic)' : 'Community'}
${mcpConfig.package.repository ? `- **Repository**: ${mcpConfig.package.repository}` : ''}

### Environment Variables

${mcpConfig.env.required.length > 0 ? `**Required:**
${mcpConfig.env.required.map(v => `- \`${v}\``).join('\n')}` : ''}

${mcpConfig.env.optional.length > 0 ? `**Optional:**
${mcpConfig.env.optional.map(v => `- \`${v}\``).join('\n')}` : ''}

### Configuration Example

Add to your \`.env.local\`:
\`\`\`bash
${generateEnvTemplate(databaseType, projectConfig)}
\`\`\`

### Capabilities

${mcpConfig.capabilities.map(c => `- ${c}`).join('\n')}

### Security Notes

${mcpConfig.securityNotes.map(n => `- ⚠️ ${n}`).join('\n')}

### Read-Only Mode

${mcpConfig.readOnly
  ? '✅ This server operates in **read-only mode** - it cannot modify your database.'
  : '⚠️ This server has **write access** - use caution with AI-assisted operations.'}
`;
}

/**
 * Type guard for database types that have MCP support
 */
export function hasMcpSupport(databaseType: DatabaseType): databaseType is Exclude<DatabaseType, 'none'> {
  return databaseType !== 'none';
}

/**
 * Get the MCP server name used in mcpServers array
 * Needed because 'postgres' is used instead of 'postgresql'
 */
export function getMcpServerName(databaseType: DatabaseType): string | null {
  if (databaseType === 'none') return null;
  return DATABASE_MCP_REGISTRY[databaseType].serverName;
}
