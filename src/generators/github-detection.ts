/**
 * GitHub Repository Auto-Detection System
 * Automatically detects GitHub repositories and configures MCP integration
 * Constitutional compliance: Type safety and Better-T-Stack integration
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { ProjectConfig } from '../types';
import pc from 'picocolors';

export interface GitHubRepoInfo {
  owner: string;
  repo: string;
  url: string;
  isGitHub: boolean;
  hasActions?: boolean;
  hasIssues?: boolean;
  isPrime?: boolean;
  branch?: string;
  remote?: string;
}

export interface GitHubDetectionResult {
  detected: boolean;
  repoInfo?: GitHubRepoInfo;
  recommendedMCPServers: string[];
  suggestedIntegrations: GitHubIntegration[];
  warnings: string[];
}

export interface GitHubIntegration {
  type: 'actions' | 'issues' | 'mcp' | 'hooks';
  name: string;
  description: string;
  required?: boolean;
  configPath?: string;
}

/**
 * GitHub Repository Auto-Detection
 */
export class GitHubDetector {
  private projectPath: string;

  constructor(projectPath: string = process.cwd()) {
    this.projectPath = projectPath;
  }

  /**
   * Comprehensive GitHub detection and analysis
   */
  detect(config?: ProjectConfig): GitHubDetectionResult {
    const result: GitHubDetectionResult = {
      detected: false,
      recommendedMCPServers: [],
      suggestedIntegrations: [],
      warnings: []
    };

    // Check if we're in a git repository
    if (!this.isGitRepository()) {
      result.warnings.push('Not a git repository');
      return result;
    }

    // Get repository information
    const repoInfo = this.getRepositoryInfo();
    if (!repoInfo.isGitHub) {
      result.warnings.push('Not a GitHub repository');
      return result;
    }

    result.detected = true;
    result.repoInfo = repoInfo;

    // Determine recommended MCP servers
    result.recommendedMCPServers = this.getRecommendedMCPServers(repoInfo, config);

    // Suggest integrations
    result.suggestedIntegrations = this.getSuggestedIntegrations(repoInfo, config);

    // Add any warnings
    result.warnings.push(...this.getWarnings(repoInfo, config));

    return result;
  }

  /**
   * Check if current directory is a git repository
   */
  private isGitRepository(): boolean {
    return existsSync(join(this.projectPath, '.git'));
  }

  /**
   * Extract repository information from git remotes
   */
  private getRepositoryInfo(): GitHubRepoInfo {
    try {
      const remote = this.getGitRemote();
      const repoInfo = this.parseGitHubURL(remote);

      return {
        ...repoInfo,
        hasActions: this.hasGitHubActions(),
        hasIssues: this.hasIssuesEnabled(),
        isPrime: this.isPrimeRepository(),
        branch: this.getCurrentBranch(),
        remote
      };
    } catch (error) {
      return {
        owner: '',
        repo: '',
        url: '',
        isGitHub: false
      };
    }
  }

  /**
   * Get primary git remote URL
   */
  private getGitRemote(): string {
    try {
      // Try origin first
      return execSync('git remote get-url origin', {
        encoding: 'utf-8',
        cwd: this.projectPath
      }).trim();
    } catch {
      try {
        // Fallback to any remote
        const remotes = execSync('git remote', {
          encoding: 'utf-8',
          cwd: this.projectPath
        }).trim().split('\n');

        if (remotes.length > 0) {
          return execSync(`git remote get-url ${remotes[0]}`, {
            encoding: 'utf-8',
            cwd: this.projectPath
          }).trim();
        }
      } catch {
        // No remotes found
      }
      throw new Error('No git remotes found');
    }
  }

  /**
   * Parse GitHub URL to extract owner and repo
   */
  private parseGitHubURL(url: string): GitHubRepoInfo {
    const patterns = [
      // HTTPS URLs
      /https:\/\/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?$/,
      // SSH URLs
      /git@github\.com:([^\/]+)\/([^\/]+?)(?:\.git)?$/,
      // Git protocol
      /git:\/\/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2],
          url: `https://github.com/${match[1]}/${match[2]}`,
          isGitHub: true
        };
      }
    }

    return {
      owner: '',
      repo: '',
      url,
      isGitHub: false
    };
  }

  /**
   * Check if repository has GitHub Actions
   */
  private hasGitHubActions(): boolean {
    const actionsDir = join(this.projectPath, '.github', 'workflows');
    return existsSync(actionsDir);
  }

  /**
   * Check if repository likely has issues enabled
   */
  private hasIssuesEnabled(): boolean {
    // We can't directly check from local repo, but we can infer
    // Most public repos have issues enabled by default
    return true;
  }

  /**
   * Check if this is a prime/main repository (not a fork)
   */
  private isPrimeRepository(): boolean {
    try {
      // Check if upstream remote exists (indicates fork)
      execSync('git remote get-url upstream', {
        encoding: 'utf-8',
        cwd: this.projectPath,
        stdio: 'ignore'
      });
      return false; // Has upstream, likely a fork
    } catch {
      return true; // No upstream, likely prime repo
    }
  }

  /**
   * Get current git branch
   */
  private getCurrentBranch(): string {
    try {
      return execSync('git branch --show-current', {
        encoding: 'utf-8',
        cwd: this.projectPath
      }).trim();
    } catch {
      return 'main';
    }
  }

  /**
   * Get recommended MCP servers based on repository info
   */
  private getRecommendedMCPServers(_repoInfo: GitHubRepoInfo, config?: ProjectConfig): string[] {
    const servers: string[] = [];

    // Always recommend GitHub MCP for GitHub repos
    servers.push('github');

    // Add filesystem for file operations
    servers.push('filesystem');

    // Add database server based on config
    if (config?.database === 'postgresql') {
      servers.push('postgres');
    } else if (config?.database === 'turso') {
      servers.push('turso');
    } else if (config?.database === 'sqlite') {
      servers.push('sqlite');
    }

    return servers;
  }

  /**
   * Get suggested integrations
   */
  private getSuggestedIntegrations(repoInfo: GitHubRepoInfo, _config?: ProjectConfig): GitHubIntegration[] {
    const integrations: GitHubIntegration[] = [];

    // GitHub MCP integration
    integrations.push({
      type: 'mcp',
      name: 'GitHub MCP Server',
      description: 'Enable GitHub API access for issues, PRs, and repository operations',
      required: true,
      configPath: '.claude/settings.json'
    });

    // GitHub Actions integration
    if (!repoInfo.hasActions) {
      integrations.push({
        type: 'actions',
        name: 'GitHub Actions CI/CD',
        description: 'Set up automated testing and deployment workflows',
        configPath: '.github/workflows/'
      });
    }

    // Issue tracking integration
    if (repoInfo.hasIssues) {
      integrations.push({
        type: 'issues',
        name: 'GitHub Issues Integration',
        description: 'Connect project management with GitHub Issues',
        configPath: '.github/ISSUE_TEMPLATE/'
      });
    }

    // Claude Code hooks
    integrations.push({
      type: 'hooks',
      name: 'Claude Code GitHub Hooks',
      description: 'Set up Git hooks for AI-assisted development',
      configPath: '.claude/hooks/'
    });

    return integrations;
  }

  /**
   * Get warnings about potential issues
   */
  private getWarnings(repoInfo: GitHubRepoInfo, _config?: ProjectConfig): string[] {
    const warnings: string[] = [];

    // Check for potential authentication issues
    if (repoInfo.remote?.startsWith('https://')) {
      warnings.push('Using HTTPS remote - may require GitHub token for MCP access');
    }

    // Check for branch name conventions
    if (repoInfo.branch === 'master') {
      warnings.push('Consider using "main" as default branch for new projects');
    }

    return warnings;
  }

  /**
   * Generate GitHub MCP configuration
   */
  generateMCPConfig(repoInfo: GitHubRepoInfo): object {
    return {
      github: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
        env: {
          GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_TOKEN}'
        },
        description: `GitHub integration for ${repoInfo.owner}/${repoInfo.repo}`
      }
    };
  }

  /**
   * Check if GitHub token is available
   */
  checkGitHubToken(): { available: boolean; source?: string; warning?: string } {
    // Check environment variables
    if (process.env.GITHUB_TOKEN) {
      return { available: true, source: 'GITHUB_TOKEN' };
    }

    if (process.env.GH_TOKEN) {
      return { available: true, source: 'GH_TOKEN' };
    }

    if (process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
      return { available: true, source: 'GITHUB_PERSONAL_ACCESS_TOKEN' };
    }

    // Check GitHub CLI
    try {
      execSync('gh auth status', { stdio: 'ignore' });
      return { available: true, source: 'GitHub CLI' };
    } catch {
      // GitHub CLI not authenticated
    }

    return {
      available: false,
      warning: 'GitHub token not found. Set GITHUB_TOKEN environment variable or run "gh auth login"'
    };
  }

  /**
   * Validate repository access
   */
  async validateRepositoryAccess(_repoInfo: GitHubRepoInfo): Promise<{
    accessible: boolean;
    permissions?: string[];
    error?: string;
  }> {
    try {
      // Test basic git operations
      execSync('git remote show origin', {
        stdio: 'ignore',
        cwd: this.projectPath
      });

      return {
        accessible: true,
        permissions: ['read'] // We can at least read
      };
    } catch (error) {
      return {
        accessible: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

/**
 * Quick helper function for GitHub detection
 */
export function detectGitHubRepository(
  projectPath?: string,
  config?: ProjectConfig
): GitHubDetectionResult {
  const detector = new GitHubDetector(projectPath);
  return detector.detect(config);
}

/**
 * Auto-configure GitHub MCP based on detection
 */
export function autoConfigureGitHubMCP(config: ProjectConfig): {
  updated: boolean;
  changes: string[];
  warnings: string[];
} {
  const result = {
    updated: false,
    changes: [] as string[],
    warnings: [] as string[]
  };

  const detection = detectGitHubRepository(undefined, config);

  if (!detection.detected) {
    result.warnings.push('No GitHub repository detected');
    return result;
  }

  // Add GitHub MCP server if not already present
  if (!config.mcpServers) {
    config.mcpServers = [];
  }

  if (!config.mcpServers.includes('github')) {
    config.mcpServers.push('github');
    result.changes.push('Added GitHub MCP server');
    result.updated = true;
  }

  // Add filesystem server for git operations
  if (!config.mcpServers.includes('filesystem')) {
    config.mcpServers.push('filesystem');
    result.changes.push('Added Filesystem MCP server for git operations');
    result.updated = true;
  }

  // Add warnings about authentication
  const tokenCheck = new GitHubDetector().checkGitHubToken();
  if (!tokenCheck.available) {
    result.warnings.push(tokenCheck.warning || 'GitHub authentication not configured');
  }

  return result;
}

/**
 * Display GitHub detection results
 */
export function displayGitHubDetection(detection: GitHubDetectionResult): void {
  if (detection.detected && detection.repoInfo) {
    const repo = detection.repoInfo;
    console.log(pc.green('✅ GitHub Repository Detected'));
    console.log(pc.gray(`   Repository: ${repo.owner}/${repo.repo}`));
    console.log(pc.gray(`   URL: ${repo.url}`));
    console.log(pc.gray(`   Branch: ${repo.branch || 'unknown'}`));

    if (detection.recommendedMCPServers.length > 0) {
      console.log(pc.blue('\n📦 Recommended MCP Servers:'));
      detection.recommendedMCPServers.forEach(server => {
        console.log(pc.gray(`   • ${server}`));
      });
    }

    if (detection.suggestedIntegrations.length > 0) {
      console.log(pc.blue('\n🔗 Suggested Integrations:'));
      detection.suggestedIntegrations.forEach(integration => {
        const required = integration.required ? pc.red('*') : ' ';
        console.log(pc.gray(`  ${required} ${integration.name}: ${integration.description}`));
      });
    }
  } else {
    console.log(pc.yellow('⚠️  No GitHub repository detected'));
  }

  if (detection.warnings.length > 0) {
    console.log(pc.yellow('\n⚠️  Warnings:'));
    detection.warnings.forEach(warning => {
      console.log(pc.gray(`   • ${warning}`));
    });
  }
}