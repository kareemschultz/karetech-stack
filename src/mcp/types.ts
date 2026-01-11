/**
 * MCP Server Type Definitions
 * Constitutional compliance: 100% TypeScript, no any types
 */

/**
 * Categories of MCP servers for organization and filtering
 */
export type MCPServerCategory =
  | 'database'
  | 'github'
  | 'deployment'
  | 'filesystem'
  | 'ai'
  | 'testing'
  | 'monitoring';

/**
 * Preset names that MCP servers can be compatible with
 */
export type PresetName = 'saas' | 'ecommerce' | 'blog' | 'devtool' | 'portfolio' | 'minimal';

/**
 * Database types that database MCP servers can support
 */
export type DatabaseType = 'postgresql' | 'turso' | 'sqlite' | 'mysql' | 'mongodb';

/**
 * Environment variable configuration for MCP servers
 */
export interface MCPEnvVariable {
  /** Variable name (e.g., GITHUB_TOKEN) */
  name: string;
  /** Description for documentation and prompts */
  description: string;
  /** Whether this variable is required for the server to function */
  required: boolean;
  /** Default value if not provided */
  defaultValue?: string;
  /** Placeholder for .env.example generation */
  placeholder: string;
}

/**
 * Core MCP server configuration interface
 * Defines all properties needed to configure and install an MCP server
 */
export interface MCPServerConfig {
  /** Unique identifier for the server */
  id: string;

  /** Human-readable display name */
  name: string;

  /** Detailed description of the server's purpose */
  description: string;

  /** Category for organization and filtering */
  category: MCPServerCategory;

  /** npm package name for the MCP server */
  packageName: string;

  /** Version constraint (npm semver) */
  version: string;

  /** Command to start the server (usually 'node' or 'npx') */
  command: string;

  /** Arguments to pass to the command */
  args: string[];

  /** Capabilities this server provides */
  capabilities: string[];

  /** Whether to automatically install during project generation */
  autoInstall: boolean;

  /** Which presets this server is compatible with */
  presetCompatibility: PresetName[];

  /** Environment variables required by this server */
  envVariables: MCPEnvVariable[];

  /** For database servers: which database types this supports */
  supportedDatabases?: DatabaseType[];

  /** Whether this server requires network access */
  requiresNetwork: boolean;

  /** Optional documentation URL */
  docsUrl?: string;

  /** Whether this is an official Anthropic MCP server */
  isOfficial: boolean;
}

/**
 * Simplified configuration for .claude/settings.json output
 */
export interface MCPSettingsEntry {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

/**
 * Full MCP settings configuration for .claude/settings.json
 */
export interface MCPSettings {
  mcpServers: Record<string, MCPSettingsEntry>;
}

/**
 * Filter options for querying the registry
 */
export interface MCPRegistryFilter {
  /** Filter by category */
  category?: MCPServerCategory;

  /** Filter by preset compatibility */
  preset?: PresetName;

  /** Filter by database type (for database servers) */
  database?: DatabaseType;

  /** Filter by auto-install flag */
  autoInstall?: boolean;

  /** Filter by official status */
  isOfficial?: boolean;

  /** Filter by network requirement */
  requiresNetwork?: boolean;
}

/**
 * Result of validating an MCP server configuration
 */
export interface MCPValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Installation result for an MCP server
 */
export interface MCPInstallResult {
  serverId: string;
  success: boolean;
  error?: string;
  packageInstalled?: string;
}
