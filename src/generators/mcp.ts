/**
 * MCP Server Configuration Generator
 * Task 1.4: Pre-configure GitHub MCP Server for repository operations
 *
 * Features:
 * - Auto-detect GitHub repository from .git/config
 * - Configure MCP servers based on project configuration
 * - Generate .mcp.json with proper environment variable references
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
// ejs import removed - was unused
import { ProjectConfig, McpServer } from '../types';

/**
 * GitHub repository information extracted from git remote
 */
interface GitHubRepoInfo {
  owner: string;
  repo: string;
  url: string;
  isGitHubRepo: boolean;
}

/**
 * MCP Server configuration with capabilities
 */
interface McpServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
  description: string;
  capabilities?: Record<string, unknown>;
}

/**
 * Complete MCP configuration structure
 */
interface McpConfiguration {
  $schema: string;
  mcpServers: Record<string, McpServerConfig>;
}

/**
 * GitHub MCP Server capabilities documentation
 */
const GITHUB_MCP_CAPABILITIES = {
  issues: {
    create: 'Create new issues with title, body, labels, and assignees',
    read: 'Read issue details, comments, and metadata',
    update: 'Update issue title, body, labels, assignees, and state',
    close: 'Close issues with optional closing comment',
    comment: 'Add comments to existing issues',
    label: 'Add, remove, and manage issue labels',
    search: 'Search issues by query, labels, state, and assignee'
  },
  pullRequests: {
    create: 'Create pull requests from branch with title and description',
    read: 'Read PR details, diff, commits, and review status',
    review: 'Add reviews (approve, request changes, comment)',
    merge: 'Merge PRs with configurable merge strategy',
    comment: 'Add line comments and general PR comments',
    update: 'Update PR title, description, and reviewers'
  },
  repository: {
    browse: 'Browse repository file structure and directories',
    readFiles: 'Read file contents at specific ref or branch',
    listBranches: 'List all branches with protection status',
    commits: 'View commit history and individual commit details',
    compare: 'Compare branches and generate diff summaries'
  }
};

/**
 * Default MCP server configurations
 */
const MCP_SERVER_DEFAULTS: Record<McpServer, McpServerConfig> = {
  filesystem: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '.'],
    description: 'File system access for project files'
  },
  github: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_TOKEN}'
    },
    description: 'GitHub integration for issues, PRs, and repository operations',
    capabilities: GITHUB_MCP_CAPABILITIES
  },
  postgres: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres'],
    env: {
      DATABASE_URL: '${DATABASE_URL}'
    },
    description: 'PostgreSQL database access for schema and query operations'
  },
  turso: {
    command: 'npx',
    args: ['-y', 'mcp-turso'],
    env: {
      TURSO_DATABASE_URL: '${TURSO_DATABASE_URL}',
      TURSO_AUTH_TOKEN: '${TURSO_AUTH_TOKEN}'
    },
    description: 'Turso database access for edge SQLite operations'
  },
  sqlite: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sqlite', './data/local.db'],
    description: 'SQLite database access for local database operations'
  },
  playwright: {
    command: 'npx',
    args: ['-y', '@anthropic-ai/mcp-server-playwright'],
    description: 'Browser automation for E2E testing with Playwright'
  }
};

/**
 * Parse GitHub repository URL to extract owner and repo name
 */
function parseGitHubUrl(url: string): GitHubRepoInfo | null {
  // Handle SSH format: git@github.com:owner/repo.git
  const sshMatch = url.match(/git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/);
  if (sshMatch) {
    return {
      owner: sshMatch[1],
      repo: sshMatch[2],
      url: `https://github.com/${sshMatch[1]}/${sshMatch[2]}`,
      isGitHubRepo: true
    };
  }

  // Handle HTTPS format: https://github.com/owner/repo.git
  const httpsMatch = url.match(/https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
  if (httpsMatch) {
    return {
      owner: httpsMatch[1],
      repo: httpsMatch[2],
      url: `https://github.com/${httpsMatch[1]}/${httpsMatch[2]}`,
      isGitHubRepo: true
    };
  }

  return null;
}

/**
 * Auto-detect GitHub repository from .git/config
 */
export async function detectGitHubRepository(projectDir: string): Promise<GitHubRepoInfo | null> {
  const gitConfigPath = join(projectDir, '.git', 'config');

  if (!existsSync(gitConfigPath)) {
    return null;
  }

  try {
    const gitConfig = await fs.readFile(gitConfigPath, 'utf-8');

    // Extract remote origin URL
    const remoteMatch = gitConfig.match(/\[remote "origin"\][^\[]*url\s*=\s*(.+)/);
    if (remoteMatch) {
      const remoteUrl = remoteMatch[1].trim();
      return parseGitHubUrl(remoteUrl);
    }

    // Try to find any GitHub remote
    const anyGitHubMatch = gitConfig.match(/url\s*=\s*(.*github\.com.*)/);
    if (anyGitHubMatch) {
      return parseGitHubUrl(anyGitHubMatch[1].trim());
    }

    return null;
  } catch (error) {
    console.warn('Could not read git config:', error);
    return null;
  }
}

/**
 * Generate GitHub MCP server configuration with auto-detected repo info
 */
export function generateGitHubMcpConfig(
  _config: ProjectConfig,
  repoInfo: GitHubRepoInfo | null
): McpServerConfig {
  const baseConfig = { ...MCP_SERVER_DEFAULTS.github };

  // Enhance environment variables with auto-detected info
  baseConfig.env = {
    GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_TOKEN}',
    ...(repoInfo && {
      GITHUB_OWNER: repoInfo.owner,
      GITHUB_REPO: repoInfo.repo
    })
  };

  return baseConfig;
}

/**
 * Build complete MCP configuration based on project config
 */
export function buildMcpConfiguration(
  config: ProjectConfig,
  repoInfo: GitHubRepoInfo | null
): McpConfiguration {
  const mcpConfig: McpConfiguration = {
    $schema: 'https://json.schemastore.org/mcp-servers',
    mcpServers: {}
  };

  for (const server of config.mcpServers) {
    switch (server) {
      case 'filesystem':
        mcpConfig.mcpServers.filesystem = {
          ...MCP_SERVER_DEFAULTS.filesystem
        };
        break;

      case 'github':
        mcpConfig.mcpServers.github = generateGitHubMcpConfig(config, repoInfo);
        break;

      case 'postgres':
        if (config.database === 'postgresql') {
          mcpConfig.mcpServers.postgres = {
            ...MCP_SERVER_DEFAULTS.postgres,
            env: {
              DATABASE_URL: `\${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/${config.projectName}}`
            }
          };
        }
        break;

      case 'playwright':
        if (config.testing.includes('playwright')) {
          mcpConfig.mcpServers.playwright = {
            ...MCP_SERVER_DEFAULTS.playwright
          };
        }
        break;
    }
  }

  return mcpConfig;
}

/**
 * Generate .mcp.json file for the project
 */
export async function generateMcpConfigFile(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  if (!config.mcpServers || config.mcpServers.length === 0) {
    console.log('No MCP servers configured, skipping .mcp.json generation');
    return;
  }

  // Auto-detect GitHub repository
  const repoInfo = await detectGitHubRepository(projectDir);

  if (repoInfo && config.mcpServers.includes('github')) {
    console.log(`Detected GitHub repository: ${repoInfo.owner}/${repoInfo.repo}`);
  }

  // Build MCP configuration
  const mcpConfig = buildMcpConfiguration(config, repoInfo);

  // Write .mcp.json file
  const mcpJsonPath = join(projectDir, '.mcp.json');
  await fs.writeFile(
    mcpJsonPath,
    JSON.stringify(mcpConfig, null, 2) + '\n',
    'utf-8'
  );

  console.log('Generated .mcp.json with MCP server configuration');

  // Generate environment variable documentation
  if (config.mcpServers.includes('github') || config.mcpServers.includes('postgres')) {
    await generateEnvDocumentation(projectDir, config, repoInfo);
  }
}

/**
 * Generate environment variable documentation for MCP servers
 */
async function generateEnvDocumentation(
  projectDir: string,
  config: ProjectConfig,
  repoInfo: GitHubRepoInfo | null
): Promise<void> {
  const envExamplePath = join(projectDir, '.env.example');

  let envContent = '';

  // Read existing .env.example if it exists
  if (existsSync(envExamplePath)) {
    envContent = await fs.readFile(envExamplePath, 'utf-8');
  }

  // Add MCP-related environment variables section
  const mcpEnvSection = `
# ==============================================
# MCP Server Environment Variables
# ==============================================

${config.mcpServers.includes('github') ? `# GitHub MCP Server
# Get your token at: https://github.com/settings/tokens
# Required scopes: repo, read:org, read:user
GITHUB_TOKEN=ghp_your_github_personal_access_token
${repoInfo ? `GITHUB_OWNER=${repoInfo.owner}
GITHUB_REPO=${repoInfo.repo}` : `# GITHUB_OWNER=your-github-username
# GITHUB_REPO=your-repo-name`}
` : ''}
${config.mcpServers.includes('postgres') && config.database === 'postgresql' ? `# PostgreSQL MCP Server
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/${config.projectName}
` : ''}
`;

  // Check if MCP section already exists
  if (!envContent.includes('MCP Server Environment Variables')) {
    envContent = envContent.trimEnd() + '\n' + mcpEnvSection;
    await fs.writeFile(envExamplePath, envContent, 'utf-8');
    console.log('Updated .env.example with MCP environment variables');
  }
}

/**
 * Generate GitHub MCP setup documentation
 */
export async function generateGitHubMcpDocs(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  if (!config.mcpServers.includes('github')) {
    return;
  }

  const docsDir = join(projectDir, 'docs', 'MCP');
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }

  const githubMcpDoc = `# GitHub MCP Server Integration

This project is configured to use the GitHub MCP server for AI-assisted repository operations.

## Setup

### 1. Generate GitHub Personal Access Token

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)" or "Fine-grained tokens"
3. Required scopes for classic tokens:
   - \`repo\` - Full repository access
   - \`read:org\` - Read organization membership
   - \`read:user\` - Read user profile data
4. Copy the generated token

### 2. Configure Environment Variable

Add your token to \`.env.local\`:

\`\`\`bash
GITHUB_TOKEN=ghp_your_token_here
\`\`\`

### 3. Verify MCP Configuration

The \`.mcp.json\` file should contain:

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}"
      }
    }
  }
}
\`\`\`

## Capabilities

### Issue Management

| Operation | Description |
|-----------|-------------|
| Create | Create new issues with title, body, labels, and assignees |
| Read | View issue details, comments, and metadata |
| Update | Modify issue properties and state |
| Close | Close issues with optional comment |
| Comment | Add comments to issues |
| Label | Manage issue labels |
| Search | Find issues by query, labels, or assignee |

### Pull Request Operations

| Operation | Description |
|-----------|-------------|
| Create | Create PRs from branches |
| Read | View PR details, diff, and review status |
| Review | Submit reviews (approve, request changes, comment) |
| Merge | Merge PRs with configurable strategy |
| Comment | Add line comments and PR comments |

### Repository Browsing

| Operation | Description |
|-----------|-------------|
| Browse | Navigate file structure |
| Read Files | View file contents at any ref |
| List Branches | View all branches with protection status |
| Commits | Browse commit history |
| Compare | Generate diff between branches |

## Usage Examples

### With Claude Code

Once configured, Claude Code can automatically:

1. **Create issues for discovered bugs:**
   \`\`\`
   Claude, create a GitHub issue for the type error in auth.ts
   \`\`\`

2. **Review pull requests:**
   \`\`\`
   Review PR #42 and suggest improvements
   \`\`\`

3. **Browse repository:**
   \`\`\`
   Show me the structure of the src/components directory
   \`\`\`

4. **Search for issues:**
   \`\`\`
   Find all open issues labeled "bug"
   \`\`\`

## Troubleshooting

### Token Not Working

1. Verify token has required scopes
2. Check token hasn't expired
3. Ensure \`.env.local\` is in \`.gitignore\`
4. Restart Claude Code after changing environment

### Permission Denied

1. Check repository access permissions
2. For organization repos, ensure token has org access
3. Verify you're a collaborator on the repository

### Rate Limiting

GitHub API has rate limits:
- Authenticated: 5,000 requests/hour
- Unauthenticated: 60 requests/hour

If rate limited, wait for reset or use a different token.

## Security Best Practices

1. **Never commit tokens** - Always use environment variables
2. **Minimal scopes** - Only request needed permissions
3. **Token rotation** - Regenerate tokens periodically
4. **Fine-grained tokens** - Use when possible for better security
5. **Audit access** - Review token usage in GitHub settings

---

*Generated by create-karetech-stack*
`;

  await fs.writeFile(join(docsDir, 'GITHUB_MCP.md'), githubMcpDoc, 'utf-8');
  console.log('Generated GitHub MCP documentation');
}

/**
 * Validate MCP server configuration
 */
export function validateMcpConfig(config: ProjectConfig): string[] {
  const warnings: string[] = [];

  if (config.mcpServers.includes('postgres') && config.database !== 'postgresql') {
    warnings.push(
      'PostgreSQL MCP server is selected but database is not PostgreSQL. ' +
      'The postgres MCP server will not be included in .mcp.json.'
    );
  }

  if (config.mcpServers.includes('playwright') && !config.testing.includes('playwright')) {
    warnings.push(
      'Playwright MCP server is selected but Playwright testing is not enabled. ' +
      'The playwright MCP server will not be included in .mcp.json.'
    );
  }

  if (config.mcpServers.includes('github') && config.pbsLevel === 'none') {
    warnings.push(
      'GitHub MCP server is enabled but PBS level is none. ' +
      'Consider enabling at least "minimal" PBS level for AI workflow.'
    );
  }

  if (config.mcpServers.length === 0 && config.pbsLevel !== 'none') {
    warnings.push(
      'No MCP servers configured but PBS level is not none. ' +
      'Consider adding at least "filesystem" MCP server for file operations.'
    );
  }

  return warnings;
}

/**
 * Main MCP configuration generator entry point
 */
export async function generateMcpConfiguration(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  console.log('Generating MCP configuration...');

  // Validate configuration
  const warnings = validateMcpConfig(config);
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }

  // Generate .mcp.json
  await generateMcpConfigFile(projectDir, config);

  // Generate GitHub MCP documentation if enabled
  if (config.mcpServers.includes('github')) {
    await generateGitHubMcpDocs(projectDir, config);
  }

  console.log('MCP configuration complete');
}
