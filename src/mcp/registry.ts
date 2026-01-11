/**
 * MCP Server Registry
 * Central registry for managing and querying MCP server configurations
 * Constitutional compliance: 100% TypeScript, comprehensive validation
 */

import {
  MCPServerConfig,
  MCPServerCategory,
  MCPRegistryFilter,
  MCPSettings,
  MCPSettingsEntry,
  MCPValidationResult,
  PresetName,
  DatabaseType
} from './types';
import {
  allServers,
  serverById,
  githubServer,
  postgresServer,
  tursoServer,
  sqliteServer,
  filesystemServer,
  playwrightServer,
  memoryServer,
  fetchServer,
  sentryServer
} from './server-configs';

// Re-export types and configs for convenience
export * from './types';
export * from './server-configs';

/**
 * MCP Server Registry Class
 * Provides querying, filtering, and configuration generation for MCP servers
 */
export class MCPRegistry {
  private servers: Map<string, MCPServerConfig>;

  constructor(servers: MCPServerConfig[] = allServers) {
    this.servers = new Map(servers.map(s => [s.id, s]));
  }

  /**
   * Get all registered servers
   */
  getAll(): MCPServerConfig[] {
    return Array.from(this.servers.values());
  }

  /**
   * Get a server by ID
   */
  get(id: string): MCPServerConfig | undefined {
    return this.servers.get(id);
  }

  /**
   * Check if a server exists
   */
  has(id: string): boolean {
    return this.servers.has(id);
  }

  /**
   * Get all server IDs
   */
  getIds(): string[] {
    return Array.from(this.servers.keys());
  }

  /**
   * Filter servers based on criteria
   */
  filter(options: MCPRegistryFilter): MCPServerConfig[] {
    let results = this.getAll();

    if (options.category) {
      results = results.filter(s => s.category === options.category);
    }

    if (options.preset) {
      results = results.filter(s =>
        s.presetCompatibility.includes(options.preset as PresetName)
      );
    }

    if (options.database) {
      results = results.filter(s =>
        s.supportedDatabases?.includes(options.database as DatabaseType)
      );
    }

    if (options.autoInstall !== undefined) {
      results = results.filter(s => s.autoInstall === options.autoInstall);
    }

    if (options.isOfficial !== undefined) {
      results = results.filter(s => s.isOfficial === options.isOfficial);
    }

    if (options.requiresNetwork !== undefined) {
      results = results.filter(s => s.requiresNetwork === options.requiresNetwork);
    }

    return results;
  }

  /**
   * Get servers by category
   */
  getByCategory(category: MCPServerCategory): MCPServerConfig[] {
    return this.filter({ category });
  }

  /**
   * Get servers compatible with a preset
   */
  getForPreset(preset: PresetName): MCPServerConfig[] {
    return this.filter({ preset });
  }

  /**
   * Get servers for a specific database type
   */
  getForDatabase(database: DatabaseType): MCPServerConfig[] {
    return this.filter({ database });
  }

  /**
   * Get servers that auto-install
   */
  getAutoInstall(): MCPServerConfig[] {
    return this.filter({ autoInstall: true });
  }

  /**
   * Get official Anthropic servers
   */
  getOfficial(): MCPServerConfig[] {
    return this.filter({ isOfficial: true });
  }

  /**
   * Get servers that don't require network
   */
  getOffline(): MCPServerConfig[] {
    return this.filter({ requiresNetwork: false });
  }

  /**
   * Validate a server configuration
   */
  validate(config: MCPServerConfig): MCPValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!config.id) errors.push('Server ID is required');
    if (!config.name) errors.push('Server name is required');
    if (!config.packageName) errors.push('Package name is required');
    if (!config.command) errors.push('Command is required');
    if (!config.args || config.args.length === 0) {
      warnings.push('Server args are empty');
    }

    // Package name format
    if (config.packageName && !config.packageName.match(/^@?[\w-]+\/[\w-]+$|^[\w-]+$/)) {
      errors.push('Invalid package name format');
    }

    // Version format
    if (config.version && !config.version.match(/^\^?\d+\.\d+\.\d+/)) {
      warnings.push('Version should follow semver format');
    }

    // Preset compatibility
    if (!config.presetCompatibility || config.presetCompatibility.length === 0) {
      warnings.push('No preset compatibility defined');
    }

    // Environment variables for network servers
    if (config.requiresNetwork && config.envVariables.length === 0) {
      warnings.push('Network-requiring server has no environment variables defined');
    }

    // Required env variables should have placeholders
    for (const envVar of config.envVariables) {
      if (envVar.required && !envVar.placeholder) {
        warnings.push(`Required env variable ${envVar.name} has no placeholder`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Generate settings entry for a single server
   */
  generateSettingsEntry(server: MCPServerConfig): MCPSettingsEntry {
    const entry: MCPSettingsEntry = {
      command: server.command,
      args: [...server.args]
    };

    // Add environment variable references
    if (server.envVariables.length > 0) {
      entry.env = {};
      for (const envVar of server.envVariables) {
        // Use ${VAR_NAME} template syntax for settings.json
        entry.env[envVar.name] = `\${${envVar.name}}`;
      }
    }

    return entry;
  }

  /**
   * Generate complete MCP settings for a set of servers
   */
  generateSettings(serverIds: string[]): MCPSettings {
    const mcpServers: Record<string, MCPSettingsEntry> = {};

    for (const id of serverIds) {
      const server = this.get(id);
      if (server) {
        mcpServers[id] = this.generateSettingsEntry(server);
      }
    }

    return { mcpServers };
  }

  /**
   * Generate settings for a preset
   */
  generateSettingsForPreset(preset: PresetName, options?: {
    includeOptional?: boolean;
    database?: DatabaseType;
  }): MCPSettings {
    let servers = this.getForPreset(preset);

    // Filter to auto-install only unless includeOptional is true
    if (!options?.includeOptional) {
      servers = servers.filter(s => s.autoInstall);
    }

    // If database is specified, filter database servers to only the matching one
    if (options?.database) {
      servers = servers.filter(s => {
        if (s.category !== 'database') return true;
        return s.supportedDatabases?.includes(options.database as DatabaseType);
      });
    }

    return this.generateSettings(servers.map(s => s.id));
  }

  /**
   * Get all required environment variables for a set of servers
   */
  getRequiredEnvVariables(serverIds: string[]): Array<{
    server: string;
    name: string;
    description: string;
    placeholder: string;
  }> {
    const envVars: Array<{
      server: string;
      name: string;
      description: string;
      placeholder: string;
    }> = [];

    for (const id of serverIds) {
      const server = this.get(id);
      if (server) {
        for (const envVar of server.envVariables) {
          if (envVar.required) {
            envVars.push({
              server: server.name,
              name: envVar.name,
              description: envVar.description,
              placeholder: envVar.placeholder
            });
          }
        }
      }
    }

    return envVars;
  }

  /**
   * Generate .env.example content for a set of servers
   */
  generateEnvExample(serverIds: string[]): string {
    const lines: string[] = [
      '# MCP Server Environment Variables',
      '# Generated by KareTech Stack',
      ''
    ];

    for (const id of serverIds) {
      const server = this.get(id);
      if (server && server.envVariables.length > 0) {
        lines.push(`# ${server.name} MCP Server`);
        for (const envVar of server.envVariables) {
          const required = envVar.required ? '(required)' : '(optional)';
          lines.push(`# ${envVar.description} ${required}`);
          lines.push(`${envVar.name}=${envVar.placeholder}`);
          lines.push('');
        }
      }
    }

    return lines.join('\n');
  }

  /**
   * Get npm dependencies for a set of servers
   */
  getDependencies(serverIds: string[]): Record<string, string> {
    const deps: Record<string, string> = {};

    for (const id of serverIds) {
      const server = this.get(id);
      if (server) {
        deps[server.packageName] = server.version;
      }
    }

    return deps;
  }

  /**
   * Get the recommended database server for a database type
   */
  getRecommendedDatabaseServer(database: DatabaseType): MCPServerConfig | undefined {
    const servers = this.getForDatabase(database);
    // Prefer official servers, then auto-install
    return servers.find(s => s.isOfficial && s.autoInstall) ||
           servers.find(s => s.autoInstall) ||
           servers[0];
  }

  /**
   * Get summary statistics about the registry
   */
  getStats(): {
    total: number;
    byCategory: Record<MCPServerCategory, number>;
    official: number;
    autoInstall: number;
    requiresNetwork: number;
  } {
    const servers = this.getAll();
    const byCategory = {} as Record<MCPServerCategory, number>;

    for (const server of servers) {
      byCategory[server.category] = (byCategory[server.category] || 0) + 1;
    }

    return {
      total: servers.length,
      byCategory,
      official: servers.filter(s => s.isOfficial).length,
      autoInstall: servers.filter(s => s.autoInstall).length,
      requiresNetwork: servers.filter(s => s.requiresNetwork).length
    };
  }
}

// Default registry instance
export const registry = new MCPRegistry();

// Convenience exports for common operations
export function getMCPServer(id: string): MCPServerConfig | undefined {
  return registry.get(id);
}

export function getMCPServersForPreset(preset: PresetName): MCPServerConfig[] {
  return registry.getForPreset(preset);
}

export function getMCPServersForDatabase(database: DatabaseType): MCPServerConfig[] {
  return registry.getForDatabase(database);
}

export function generateMCPSettings(serverIds: string[]): MCPSettings {
  return registry.generateSettings(serverIds);
}

export function generateMCPSettingsForPreset(
  preset: PresetName,
  options?: { includeOptional?: boolean; database?: DatabaseType }
): MCPSettings {
  return registry.generateSettingsForPreset(preset, options);
}

// Quick access to common server configurations
export const commonServers = {
  github: githubServer,
  postgres: postgresServer,
  turso: tursoServer,
  sqlite: sqliteServer,
  filesystem: filesystemServer,
  playwright: playwrightServer,
  memory: memoryServer,
  fetch: fetchServer,
  sentry: sentryServer
};
