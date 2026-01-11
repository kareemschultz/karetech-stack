/**
 * MCP Server Registry Tests
 * Comprehensive tests for the MCP server registry system
 */

import { describe, test, expect, beforeEach } from 'bun:test';
import {
  MCPRegistry,
  registry,
  getMCPServer,
  getMCPServersForPreset,
  getMCPServersForDatabase,
  generateMCPSettings,
  generateMCPSettingsForPreset,
  allServers,
  githubServer,
  postgresServer,
  tursoServer,
  sqliteServer,
  filesystemServer,
  playwrightServer,
  commonServers
} from '../index';
import { MCPServerConfig, MCPServerCategory, PresetName, DatabaseType } from '../types';

describe('MCP Server Registry', () => {
  describe('Server Configurations', () => {
    test('should have all expected servers', () => {
      const serverIds = registry.getIds();
      expect(serverIds).toContain('github');
      expect(serverIds).toContain('postgres');
      expect(serverIds).toContain('turso');
      expect(serverIds).toContain('sqlite');
      expect(serverIds).toContain('filesystem');
      expect(serverIds).toContain('playwright');
      expect(serverIds).toContain('memory');
      expect(serverIds).toContain('fetch');
      expect(serverIds).toContain('sentry');
      expect(serverIds.length).toBeGreaterThanOrEqual(9);
    });

    test('all servers should have required properties', () => {
      allServers.forEach(server => {
        expect(server.id).toBeTruthy();
        expect(server.name).toBeTruthy();
        expect(server.description).toBeTruthy();
        expect(server.category).toBeTruthy();
        expect(server.packageName).toBeTruthy();
        expect(server.version).toBeTruthy();
        expect(server.command).toBeTruthy();
        expect(Array.isArray(server.args)).toBe(true);
        expect(Array.isArray(server.capabilities)).toBe(true);
        expect(typeof server.autoInstall).toBe('boolean');
        expect(Array.isArray(server.presetCompatibility)).toBe(true);
        expect(Array.isArray(server.envVariables)).toBe(true);
        expect(typeof server.requiresNetwork).toBe('boolean');
        expect(typeof server.isOfficial).toBe('boolean');
      });
    });

    test('GitHub server should be properly configured', () => {
      expect(githubServer.id).toBe('github');
      expect(githubServer.category).toBe('github');
      expect(githubServer.isOfficial).toBe(true);
      expect(githubServer.autoInstall).toBe(true);
      expect(githubServer.requiresNetwork).toBe(true);
      expect(githubServer.envVariables.length).toBeGreaterThan(0);
      expect(githubServer.envVariables[0].name).toBe('GITHUB_PERSONAL_ACCESS_TOKEN');
    });

    test('PostgreSQL server should support correct database', () => {
      expect(postgresServer.id).toBe('postgres');
      expect(postgresServer.category).toBe('database');
      expect(postgresServer.supportedDatabases).toContain('postgresql');
      expect(postgresServer.isOfficial).toBe(true);
    });

    test('Turso server should support Turso and SQLite', () => {
      expect(tursoServer.id).toBe('turso');
      expect(tursoServer.category).toBe('database');
      expect(tursoServer.supportedDatabases).toContain('turso');
      expect(tursoServer.supportedDatabases).toContain('sqlite');
    });

    test('Filesystem server should not require network', () => {
      expect(filesystemServer.id).toBe('filesystem');
      expect(filesystemServer.category).toBe('filesystem');
      expect(filesystemServer.requiresNetwork).toBe(false);
    });

    test('Playwright server should be in testing category', () => {
      expect(playwrightServer.id).toBe('playwright');
      expect(playwrightServer.category).toBe('testing');
      expect(playwrightServer.isOfficial).toBe(true);
    });
  });

  describe('Registry Lookup', () => {
    test('should get server by ID', () => {
      const server = registry.get('github');
      expect(server).toBeDefined();
      expect(server?.id).toBe('github');
    });

    test('should return undefined for unknown server', () => {
      const server = registry.get('unknown-server');
      expect(server).toBeUndefined();
    });

    test('should check if server exists', () => {
      expect(registry.has('github')).toBe(true);
      expect(registry.has('unknown-server')).toBe(false);
    });

    test('convenience function should get server', () => {
      const server = getMCPServer('postgres');
      expect(server).toBeDefined();
      expect(server?.id).toBe('postgres');
    });
  });

  describe('Registry Filtering', () => {
    test('should filter by category', () => {
      const databaseServers = registry.getByCategory('database');
      expect(databaseServers.length).toBeGreaterThan(0);
      databaseServers.forEach(server => {
        expect(server.category).toBe('database');
      });
    });

    test('should filter by preset', () => {
      const saasServers = registry.getForPreset('saas');
      expect(saasServers.length).toBeGreaterThan(0);
      saasServers.forEach(server => {
        expect(server.presetCompatibility).toContain('saas');
      });
    });

    test('should filter by database type', () => {
      const postgresServers = registry.getForDatabase('postgresql');
      expect(postgresServers.length).toBeGreaterThan(0);
      postgresServers.forEach(server => {
        expect(server.supportedDatabases).toContain('postgresql');
      });
    });

    test('should filter by auto-install', () => {
      const autoInstallServers = registry.getAutoInstall();
      expect(autoInstallServers.length).toBeGreaterThan(0);
      autoInstallServers.forEach(server => {
        expect(server.autoInstall).toBe(true);
      });
    });

    test('should filter by official status', () => {
      const officialServers = registry.getOfficial();
      expect(officialServers.length).toBeGreaterThan(0);
      officialServers.forEach(server => {
        expect(server.isOfficial).toBe(true);
      });
    });

    test('should filter offline servers', () => {
      const offlineServers = registry.getOffline();
      expect(offlineServers.length).toBeGreaterThan(0);
      offlineServers.forEach(server => {
        expect(server.requiresNetwork).toBe(false);
      });
    });

    test('should apply multiple filters', () => {
      const filtered = registry.filter({
        category: 'database',
        autoInstall: true
      });
      filtered.forEach(server => {
        expect(server.category).toBe('database');
        expect(server.autoInstall).toBe(true);
      });
    });

    test('convenience function should get servers for preset', () => {
      const servers = getMCPServersForPreset('saas');
      expect(servers.length).toBeGreaterThan(0);
      servers.forEach(server => {
        expect(server.presetCompatibility).toContain('saas');
      });
    });

    test('convenience function should get servers for database', () => {
      const servers = getMCPServersForDatabase('turso');
      expect(servers.length).toBeGreaterThan(0);
      servers.forEach(server => {
        expect(server.supportedDatabases).toContain('turso');
      });
    });
  });

  describe('Settings Generation', () => {
    test('should generate settings for single server', () => {
      const settings = registry.generateSettings(['github']);
      expect(settings.mcpServers).toBeDefined();
      expect(settings.mcpServers.github).toBeDefined();
      expect(settings.mcpServers.github.command).toBe('node');
      expect(settings.mcpServers.github.args.length).toBeGreaterThan(0);
    });

    test('should generate settings for multiple servers', () => {
      const settings = registry.generateSettings(['github', 'filesystem', 'postgres']);
      expect(Object.keys(settings.mcpServers)).toHaveLength(3);
      expect(settings.mcpServers.github).toBeDefined();
      expect(settings.mcpServers.filesystem).toBeDefined();
      expect(settings.mcpServers.postgres).toBeDefined();
    });

    test('should include environment variables in settings', () => {
      const settings = registry.generateSettings(['github']);
      expect(settings.mcpServers.github.env).toBeDefined();
      expect(settings.mcpServers.github.env?.GITHUB_PERSONAL_ACCESS_TOKEN).toBe('${GITHUB_PERSONAL_ACCESS_TOKEN}');
    });

    test('should skip unknown servers', () => {
      const settings = registry.generateSettings(['github', 'unknown-server']);
      expect(Object.keys(settings.mcpServers)).toHaveLength(1);
      expect(settings.mcpServers.github).toBeDefined();
    });

    test('convenience function should generate settings', () => {
      const settings = generateMCPSettings(['filesystem', 'playwright']);
      expect(settings.mcpServers.filesystem).toBeDefined();
      expect(settings.mcpServers.playwright).toBeDefined();
    });

    test('should generate settings for preset', () => {
      const settings = registry.generateSettingsForPreset('saas');
      expect(Object.keys(settings.mcpServers).length).toBeGreaterThan(0);
      // SaaS should at least have filesystem and github
      expect(settings.mcpServers.filesystem).toBeDefined();
      expect(settings.mcpServers.github).toBeDefined();
    });

    test('should filter database servers for preset with database option', () => {
      const settings = registry.generateSettingsForPreset('saas', { database: 'postgresql' });
      // Should have postgres, not turso
      const dbServers = Object.keys(settings.mcpServers).filter(
        id => registry.get(id)?.category === 'database'
      );
      dbServers.forEach(id => {
        const server = registry.get(id);
        expect(server?.supportedDatabases).toContain('postgresql');
      });
    });

    test('convenience function should generate settings for preset', () => {
      const settings = generateMCPSettingsForPreset('blog', { database: 'turso' });
      expect(Object.keys(settings.mcpServers).length).toBeGreaterThan(0);
    });
  });

  describe('Environment Variables', () => {
    test('should get required environment variables', () => {
      const envVars = registry.getRequiredEnvVariables(['github', 'postgres']);
      expect(envVars.length).toBeGreaterThan(0);

      const githubToken = envVars.find(v => v.name === 'GITHUB_PERSONAL_ACCESS_TOKEN');
      expect(githubToken).toBeDefined();
      expect(githubToken?.server).toBe('GitHub');

      const postgresUrl = envVars.find(v => v.name === 'POSTGRES_CONNECTION_STRING');
      expect(postgresUrl).toBeDefined();
      expect(postgresUrl?.server).toBe('PostgreSQL');
    });

    test('should generate .env.example content', () => {
      const envExample = registry.generateEnvExample(['github', 'postgres']);
      expect(envExample).toContain('GITHUB_PERSONAL_ACCESS_TOKEN');
      expect(envExample).toContain('POSTGRES_CONNECTION_STRING');
      expect(envExample).toContain('# GitHub MCP Server');
      expect(envExample).toContain('# PostgreSQL MCP Server');
    });
  });

  describe('Dependency Management', () => {
    test('should get npm dependencies', () => {
      const deps = registry.getDependencies(['github', 'filesystem']);
      expect(deps['@anthropic-ai/mcp-server-github']).toBeDefined();
      expect(deps['@anthropic-ai/mcp-server-filesystem']).toBeDefined();
    });

    test('should include version constraints', () => {
      const deps = registry.getDependencies(['github']);
      const version = deps['@anthropic-ai/mcp-server-github'];
      expect(version).toMatch(/^\^?\d+\.\d+\.\d+/);
    });
  });

  describe('Database Server Recommendations', () => {
    test('should recommend PostgreSQL server for postgresql database', () => {
      const server = registry.getRecommendedDatabaseServer('postgresql');
      expect(server).toBeDefined();
      expect(server?.id).toBe('postgres');
    });

    test('should recommend Turso server for turso database', () => {
      const server = registry.getRecommendedDatabaseServer('turso');
      expect(server).toBeDefined();
      expect(server?.id).toBe('turso');
    });

    test('should recommend SQLite server for sqlite database', () => {
      const server = registry.getRecommendedDatabaseServer('sqlite');
      expect(server).toBeDefined();
      if (server) {
        expect(['sqlite', 'turso']).toContain(server.id);
      }
    });
  });

  describe('Server Validation', () => {
    test('should validate correct server configuration', () => {
      const result = registry.validate(githubServer);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect missing required fields', () => {
      const invalidServer = {
        id: '',
        name: '',
        description: '',
        category: 'github' as const,
        packageName: '',
        version: '',
        command: '',
        args: [],
        capabilities: [],
        autoInstall: false,
        presetCompatibility: [],
        envVariables: [],
        requiresNetwork: false,
        isOfficial: false
      } satisfies MCPServerConfig;

      const result = registry.validate(invalidServer);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should warn about empty args', () => {
      const serverWithNoArgs = {
        ...githubServer,
        args: []
      };

      const result = registry.validate(serverWithNoArgs);
      expect(result.warnings.some(w => w.includes('args'))).toBe(true);
    });

    test('should warn about missing preset compatibility', () => {
      const serverWithNoPresets = {
        ...githubServer,
        presetCompatibility: []
      };

      const result = registry.validate(serverWithNoPresets);
      expect(result.warnings.some(w => w.includes('preset'))).toBe(true);
    });
  });

  describe('Registry Statistics', () => {
    test('should provide registry statistics', () => {
      const stats = registry.getStats();
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.byCategory).toBeDefined();
      expect(stats.official).toBeGreaterThan(0);
      expect(stats.autoInstall).toBeGreaterThan(0);
    });

    test('should count categories correctly', () => {
      const stats = registry.getStats();
      const totalByCategory = Object.values(stats.byCategory).reduce((a, b) => a + b, 0);
      expect(totalByCategory).toBe(stats.total);
    });
  });

  describe('Common Servers Export', () => {
    test('should export common servers object', () => {
      expect(commonServers.github).toBe(githubServer);
      expect(commonServers.postgres).toBe(postgresServer);
      expect(commonServers.turso).toBe(tursoServer);
      expect(commonServers.sqlite).toBe(sqliteServer);
      expect(commonServers.filesystem).toBe(filesystemServer);
      expect(commonServers.playwright).toBe(playwrightServer);
    });
  });

  describe('Custom Registry', () => {
    test('should create registry with custom servers', () => {
      const customServers = [githubServer, filesystemServer];
      const customRegistry = new MCPRegistry(customServers);

      expect(customRegistry.getIds()).toHaveLength(2);
      expect(customRegistry.has('github')).toBe(true);
      expect(customRegistry.has('filesystem')).toBe(true);
      expect(customRegistry.has('postgres')).toBe(false);
    });
  });
});
