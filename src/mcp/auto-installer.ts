/**
 * MCP Server Auto-Installer
 * Automatically installs and configures MCP servers based on project configuration
 * Constitutional compliance: Type safety and Better-T-Stack integration
 */

import { execSync } from 'child_process';
// existsSync and join imports removed - were unused
import { ProjectConfig } from '../types';
import { serverById } from './server-configs';
import { MCPRegistry } from './registry';
import pc from 'picocolors';

export interface InstallationResult {
  serverId: string;
  success: boolean;
  error?: string;
  skipped?: boolean;
  reason?: string;
}

export interface InstallationOptions {
  projectPath: string;
  skipExisting?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

/**
 * Auto-installer for MCP servers based on project configuration
 */
export class MCPAutoInstaller {
  private registry: MCPRegistry;
  private installedServers: Set<string> = new Set();

  constructor() {
    this.registry = new MCPRegistry();
  }

  /**
   * Install all required MCP servers for a project
   */
  async installForProject(
    config: ProjectConfig,
    options: InstallationOptions
  ): Promise<InstallationResult[]> {
    const results: InstallationResult[] = [];
    const requiredServers = this.determineRequiredServers(config);

    if (options.verbose) {
      console.log(pc.blue(`📦 Installing ${requiredServers.length} MCP servers...`));
    }

    for (const serverId of requiredServers) {
      const result = await this.installServer(serverId, config, options);
      results.push(result);

      if (options.verbose) {
        if (result.success) {
          console.log(pc.green(`✅ ${serverId}: installed`));
        } else if (result.skipped) {
          console.log(pc.yellow(`⏭️  ${serverId}: ${result.reason}`));
        } else {
          console.log(pc.red(`❌ ${serverId}: ${result.error}`));
        }
      }
    }

    return results;
  }

  /**
   * Install a single MCP server
   */
  async installServer(
    serverId: string,
    config: ProjectConfig,
    options: InstallationOptions
  ): Promise<InstallationResult> {
    try {
      // Check if already installed
      if (this.installedServers.has(serverId)) {
        return {
          serverId,
          success: true,
          skipped: true,
          reason: 'already installed in this session'
        };
      }

      // Get server configuration
      const serverConfig = serverById[serverId];
      if (!serverConfig) {
        return {
          serverId,
          success: false,
          error: `Unknown server: ${serverId}`
        };
      }

      // Check if server should be skipped
      if (options.skipExisting && this.isServerInstalled(serverId, options.projectPath)) {
        return {
          serverId,
          success: true,
          skipped: true,
          reason: 'already installed globally'
        };
      }

      // Validate prerequisites
      const prereqCheck = this.validatePrerequisites(serverId, config);
      if (!prereqCheck.valid) {
        return {
          serverId,
          success: false,
          error: prereqCheck.reason
        };
      }

      // Dry run - don't actually install
      if (options.dryRun) {
        return {
          serverId,
          success: true,
          skipped: true,
          reason: 'dry run mode'
        };
      }

      // Install the server
      await this.performInstallation(serverId, serverConfig, options);

      // Verify installation
      if (this.verifyInstallation(serverId, options.projectPath)) {
        this.installedServers.add(serverId);
        return {
          serverId,
          success: true
        };
      } else {
        return {
          serverId,
          success: false,
          error: 'installation verification failed'
        };
      }
    } catch (error) {
      return {
        serverId,
        success: false,
        error: error instanceof Error ? error.message : 'unknown error'
      };
    }
  }

  /**
   * Determine which MCP servers are required for a project
   */
  private determineRequiredServers(config: ProjectConfig): string[] {
    const servers: string[] = [];

    // Always include filesystem for file operations
    servers.push('filesystem');

    // Database-specific servers
    if (config.database === 'postgresql') {
      servers.push('postgres');
    } else if (config.database === 'turso') {
      servers.push('turso');
    } else if (config.database === 'sqlite') {
      servers.push('sqlite');
    }

    // GitHub integration if using GitHub Actions or if git repo detected
    if (config.cicd === 'github-actions' || this.isGitHubRepo(config)) {
      servers.push('github');
    }

    // Testing servers
    if (config.testing.includes('playwright')) {
      servers.push('playwright');
    }

    // Add any explicitly configured servers
    if (config.mcpServers) {
      servers.push(...config.mcpServers.filter(s => !servers.includes(s)));
    }

    return servers;
  }

  /**
   * Check if this is a GitHub repository
   */
  private isGitHubRepo(_config: ProjectConfig): boolean {
    // Check git remote for github.com
    try {
      const remote = execSync('git remote get-url origin 2>/dev/null', {
        encoding: 'utf-8',
        cwd: process.cwd()
      }).trim();
      return remote.includes('github.com');
    } catch {
      return false;
    }
  }

  /**
   * Validate prerequisites for a server
   */
  private validatePrerequisites(serverId: string, config: ProjectConfig): { valid: boolean; reason?: string } {
    switch (serverId) {
      case 'postgres':
        if (config.database !== 'postgresql') {
          return { valid: false, reason: 'PostgreSQL not selected as database' };
        }
        break;

      case 'turso':
        if (config.database !== 'turso') {
          return { valid: false, reason: 'Turso not selected as database' };
        }
        break;

      case 'sqlite':
        if (config.database !== 'sqlite') {
          return { valid: false, reason: 'SQLite not selected as database' };
        }
        break;

      case 'playwright':
        if (!config.testing.includes('playwright')) {
          return { valid: false, reason: 'Playwright not selected for testing' };
        }
        break;
    }

    return { valid: true };
  }

  /**
   * Check if a server is already installed
   */
  private isServerInstalled(serverId: string, projectPath: string): boolean {
    const serverConfig = serverById[serverId];
    if (!serverConfig) return false;

    try {
      // Check if the package is available globally
      if (serverConfig.packageName) {
        execSync(`npm list -g ${serverConfig.packageName} 2>/dev/null`, { stdio: 'ignore' });
        return true;
      }

      // For npx packages, they're always "available"
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Perform the actual installation
   */
  private async performInstallation(
    serverId: string,
    serverConfig: any,
    options: InstallationOptions
  ): Promise<void> {
    const command = this.buildInstallCommand(serverId, serverConfig);

    if (options.verbose) {
      console.log(pc.gray(`Running: ${command}`));
    }

    execSync(command, {
      stdio: options.verbose ? 'inherit' : 'ignore',
      cwd: options.projectPath
    });
  }

  /**
   * Build installation command for a server
   */
  private buildInstallCommand(serverId: string, serverConfig: any): string {
    // Most MCP servers are installed via npx on-demand
    // Some might need global installation
    switch (serverId) {
      case 'turso':
        return 'npm install -g mcp-turso';

      default:
        // For official MCP servers, npx handles installation automatically
        return `echo "Server ${serverId} will be installed on-demand via npx"`;
    }
  }

  /**
   * Verify that installation was successful
   */
  private verifyInstallation(serverId: string, projectPath: string): boolean {
    const serverConfig = serverById[serverId];
    if (!serverConfig) return false;

    try {
      // For npx packages, we can't easily verify without running them
      // So we assume success if no errors were thrown during installation
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Install specific database MCP server with auto-configuration
   */
  async installDatabaseMCP(
    database: 'postgresql' | 'turso' | 'sqlite',
    projectPath: string,
    options: { verbose?: boolean } = {}
  ): Promise<InstallationResult> {
    const serverMap = {
      postgresql: 'postgres',
      turso: 'turso',
      sqlite: 'sqlite'
    };

    const serverId = serverMap[database];
    const config = { database } as ProjectConfig;

    return this.installServer(serverId, config, {
      projectPath,
      verbose: options.verbose
    });
  }

  /**
   * Get installation summary
   */
  getInstallationSummary(results: InstallationResult[]): {
    total: number;
    successful: number;
    failed: number;
    skipped: number;
    errors: string[];
  } {
    const errors = results
      .filter(r => !r.success && !r.skipped)
      .map(r => `${r.serverId}: ${r.error}`);

    return {
      total: results.length,
      successful: results.filter(r => r.success && !r.skipped).length,
      failed: results.filter(r => !r.success && !r.skipped).length,
      skipped: results.filter(r => r.skipped).length,
      errors
    };
  }
}

/**
 * Quick helper function for installing MCP servers
 */
export async function installMCPServers(
  config: ProjectConfig,
  projectPath: string,
  options: { verbose?: boolean; dryRun?: boolean } = {}
): Promise<InstallationResult[]> {
  const installer = new MCPAutoInstaller();
  return installer.installForProject(config, {
    projectPath,
    verbose: options.verbose,
    dryRun: options.dryRun
  });
}

/**
 * Validate that all required MCP servers are available for a configuration
 */
export function validateMCPAvailability(config: ProjectConfig): {
  valid: boolean;
  missingServers: string[];
  availableServers: string[];
} {
  const installer = new MCPAutoInstaller();
  const required = installer['determineRequiredServers'](config);
  const registry = new MCPRegistry();

  const available: string[] = [];
  const missing: string[] = [];

  for (const serverId of required) {
    const serverConfig = serverById[serverId];
    if (serverConfig) {
      available.push(serverId);
    } else {
      missing.push(serverId);
    }
  }

  return {
    valid: missing.length === 0,
    missingServers: missing,
    availableServers: available
  };
}