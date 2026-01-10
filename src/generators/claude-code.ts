/**
 * Claude Code configuration template generation system
 * Terminal 1: PBS Integration & Documentation - Claude Code Templates
 * Constitutional compliance: Complete AI workflow scaffolding
 */

import { promises as fs } from 'fs';
import { join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ProjectConfig, McpServer } from '../types';

/**
 * Claude Code integration configurations based on AI workflow level
 */
const CLAUDE_CODE_CONFIGS = {
  full: {
    name: 'Complete AI Workflow',
    description: 'Full Claude Code integration with MCP servers and hooks',
    features: ['settings', 'hooks', 'agents', 'commands', 'skills', 'mcp_servers'],
    mcpRequired: true,
    hooksEnabled: true
  },
  docs: {
    name: 'Documentation Focus',
    description: 'Basic Claude Code setup for documentation workflows',
    features: ['settings', 'commands', 'skills'],
    mcpRequired: false,
    hooksEnabled: false
  },
  minimal: {
    name: 'Basic Claude Code',
    description: 'Minimal Claude Code configuration',
    features: ['settings'],
    mcpRequired: false,
    hooksEnabled: false
  },
  none: {
    name: 'No AI Integration',
    description: 'Standard development without AI workflow',
    features: [],
    mcpRequired: false,
    hooksEnabled: false
  }
};

/**
 * MCP Server configurations based on project needs
 */
const MCP_SERVER_CONFIGS = {
  filesystem: {
    name: 'Filesystem MCP',
    description: 'File system access for Claude Code',
    package: '@modelcontextprotocol/server-filesystem',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/allowed/files']
    }
  },
  github: {
    name: 'GitHub MCP',
    description: 'GitHub integration for repositories',
    package: '@modelcontextprotocol/server-github',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: 'your-github-token'
      }
    }
  },
  postgres: {
    name: 'PostgreSQL MCP',
    description: 'Database access and querying',
    package: '@modelcontextprotocol/server-postgres',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres'],
      env: {
        DATABASE_URL: 'postgresql://user:password@localhost:5432/database'
      }
    }
  },
  playwright: {
    name: 'Playwright MCP',
    description: 'Browser automation and testing',
    package: '@modelcontextprotocol/server-playwright',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-playwright']
    }
  }
};

/**
 * Generate Claude Code settings.json
 */
function generateClaudeCodeSettings(config: ProjectConfig): any {
  const claudeConfig = CLAUDE_CODE_CONFIGS[config.pbsLevel];
  const settings: any = {
    // Basic configuration
    workspaceFolder: '.',

    // AI workflow settings
    aiWorkflow: {
      enabled: config.pbsLevel !== 'none',
      level: config.pbsLevel,
      beadsIntegration: config.beadsIntegration,
      trackingEnabled: config.pbsLevel === 'full'
    },

    // Project context
    project: {
      name: config.projectName,
      description: config.description,
      author: config.author,
      techStack: {
        runtime: 'bun',
        framework: 'better-t-stack',
        database: config.database,
        auth: config.auth,
        testing: config.testing,
        deployment: config.deployTarget
      }
    },

    // Constitutional rules
    constitution: {
      strictTypeScript: true,
      noAnyTypes: true,
      testingRequired: config.unitTesting || config.testing.length > 0,
      documentationRequired: config.pbsLevel !== 'none',
      beadsTracking: config.beadsIntegration
    }
  };

  // Add MCP servers configuration if enabled
  if (claudeConfig.mcpRequired && config.mcpServers && config.mcpServers.length > 0) {
    settings.mcpServers = {};

    config.mcpServers.forEach(serverType => {
      const serverConfig = MCP_SERVER_CONFIGS[serverType];
      if (serverConfig) {
        settings.mcpServers[serverType] = {
          name: serverConfig.name,
          description: serverConfig.description,
          config: { ...serverConfig.config }
        };

        // Customize server configs based on project
        if (serverType === 'filesystem') {
          settings.mcpServers[serverType].config.args = [
            '-y', '@modelcontextprotocol/server-filesystem',
            resolve(process.cwd(), config.projectName)
          ];
        } else if (serverType === 'postgres' && config.database === 'postgresql') {
          settings.mcpServers[serverType].config.env = {
            DATABASE_URL: `postgresql://postgres:postgres@localhost:5432/${config.projectName}`
          };
        } else if (serverType === 'github') {
          settings.mcpServers[serverType].config.env = {
            GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_TOKEN}',
            GITHUB_REPO_OWNER: '${GITHUB_OWNER}',
            GITHUB_REPO_NAME: config.projectName
          };
        }
      }
    });
  }

  // Add hooks configuration if enabled
  if (claudeConfig.hooksEnabled && config.claudeCodeHooks) {
    settings.hooks = {
      enabled: true,
      preCommit: {
        enabled: true,
        scripts: ['lint', 'typecheck', 'test']
      },
      postCommit: {
        enabled: config.beadsIntegration,
        scripts: config.beadsIntegration ? ['beads-sync'] : []
      },
      preWorkSession: {
        enabled: config.pbsLevel === 'full',
        scripts: config.pbsLevel === 'full' ? ['pbs-status', 'beads-ready'] : []
      }
    };
  }

  return settings;
}

/**
 * Generate hook scripts for Claude Code workflow
 */
async function generateHookScripts(claudeDir: string, config: ProjectConfig): Promise<void> {
  if (!config.claudeCodeHooks) return;

  const hooksDir = join(claudeDir, 'hooks');
  if (!existsSync(hooksDir)) {
    mkdirSync(hooksDir, { recursive: true });
  }

  // Pre-commit hook
  const preCommitHook = `#!/usr/bin/env bun
/**
 * Claude Code Pre-commit Hook for ${config.projectName}
 * Runs quality checks before each commit
 */

console.log('🔍 Running pre-commit checks...');

let hasErrors = false;

// TypeScript type checking
console.log('📝 Type checking...');
try {
  await $\`bun run typecheck\`;
  console.log('✅ TypeScript compilation passed');
} catch (error) {
  console.error('❌ TypeScript compilation failed');
  hasErrors = true;
}

// ESLint checking
console.log('🧹 Linting...');
try {
  await $\`bun run lint\`;
  console.log('✅ Linting passed');
} catch (error) {
  console.error('❌ Linting failed');
  hasErrors = true;
}

${config.unitTesting || config.testing.length > 0 ? `
// Run tests
console.log('🧪 Running tests...');
try {
  await $\`bun run test\`;
  console.log('✅ Tests passed');
} catch (error) {
  console.error('❌ Tests failed');
  hasErrors = true;
}
` : ''}

${config.beadsIntegration ? `
// Beads tracking sync
console.log('📋 Syncing Beads tracking...');
try {
  await $\`bd sync\`;
  console.log('✅ Beads sync completed');
} catch (error) {
  console.warn('⚠️  Beads sync failed - continuing anyway');
}
` : ''}

if (hasErrors) {
  console.error('\\n❌ Pre-commit checks failed. Fix issues before committing.');
  process.exit(1);
} else {
  console.log('\\n✅ All pre-commit checks passed!');
  process.exit(0);
}
`;

  await fs.writeFile(join(hooksDir, 'pre-commit.js'), preCommitHook, 'utf-8');

  // Post-commit hook for Beads integration
  if (config.beadsIntegration) {
    const postCommitHook = `#!/usr/bin/env bun
/**
 * Claude Code Post-commit Hook for ${config.projectName}
 * Updates Beads tracking after successful commits
 */

console.log('📋 Updating Beads tracking...');

try {
  // Get the commit message to check for issue references
  const commitMsg = await $\`git log -1 --pretty=%B\`.text();

  // Check for issue references (bd-XXXX pattern)
  const issueMatch = commitMsg.match(/bd-([a-zA-Z0-9]+)/);

  if (issueMatch) {
    const issueId = 'bd-' + issueMatch[1];
    console.log(\`📌 Found issue reference: \${issueId}\`);

    // Update issue with commit reference
    await $\`bd update \${issueId} --comment "Commit: \${process.env.GIT_COMMIT || 'latest'}"\`;
    console.log('✅ Issue updated with commit reference');
  }

  // Sync all tracking
  await $\`bd sync\`;
  console.log('✅ Beads tracking synchronized');

} catch (error) {
  console.warn('⚠️  Post-commit Beads sync failed:', error.message);
  // Don't fail the commit for tracking issues
}
`;

    await fs.writeFile(join(hooksDir, 'post-commit.js'), postCommitHook, 'utf-8');
  }

  // Pre-work session hook for PBS workflow
  if (config.pbsLevel === 'full') {
    const preSessionHook = `#!/usr/bin/env bun
/**
 * Claude Code Pre-session Hook for ${config.projectName}
 * Prepares workspace for AI-assisted development session
 */

console.log('🚀 Starting Claude Code session for ${config.projectName}');

// Check project status
console.log('📊 Checking project status...');
try {
  if (existsSync('docs/PROJECT_STATUS.md')) {
    const status = await Bun.file('docs/PROJECT_STATUS.md').text();
    const phaseMatch = status.match(/\\*\\*Phase\\*\\*.*\\|(.*?)\\|/);
    if (phaseMatch) {
      console.log(\`📈 Current phase: \${phaseMatch[1].trim()}\`);
    }
  }
} catch (error) {
  console.warn('⚠️  Could not read project status');
}

${config.beadsIntegration ? `
// Show ready work from Beads
console.log('📋 Checking Beads for ready work...');
try {
  const readyWork = await $\`bd ready --json\`.json();
  if (readyWork.length > 0) {
    console.log(\`✨ \${readyWork.length} items ready to work on:\`);
    readyWork.slice(0, 3).forEach(item => {
      console.log(\`  - \${item.title} (\${item.id})\`);
    });
  } else {
    console.log('📝 No items ready - check bd list for available work');
  }
} catch (error) {
  console.warn('⚠️  Could not check Beads status');
}
` : ''}

// Environment validation
console.log('🔧 Validating development environment...');
try {
  await $\`bun run typecheck\`;
  console.log('✅ TypeScript environment ready');
} catch (error) {
  console.error('❌ TypeScript compilation issues - run bun run typecheck');
}

console.log('\\n🎯 Session ready! Remember to:');
console.log('  • Update docs/PROJECT_STATUS.md at start and end');
console.log('  • Follow constitutional principles (strict TypeScript)');
${config.beadsIntegration ? "console.log('  • Use bd commands for issue tracking');" : ''}
console.log('  • Commit with conventional format');
console.log('\\n💡 Happy coding! 🚀\\n');
`;

    await fs.writeFile(join(hooksDir, 'pre-session.js'), preSessionHook, 'utf-8');
  }

  // Make hooks executable
  try {
    await fs.chmod(join(hooksDir, 'pre-commit.js'), 0o755);
    if (config.beadsIntegration) {
      await fs.chmod(join(hooksDir, 'post-commit.js'), 0o755);
    }
    if (config.pbsLevel === 'full') {
      await fs.chmod(join(hooksDir, 'pre-session.js'), 0o755);
    }
  } catch (error) {
    console.warn('⚠️  Could not make hooks executable:', error);
  }
}

/**
 * Generate agent definitions for Claude Code
 */
async function generateAgentDefinitions(claudeDir: string, config: ProjectConfig): Promise<void> {
  if (config.pbsLevel === 'none') return;

  const agentsDir = join(claudeDir, 'agents');
  if (!existsSync(agentsDir)) {
    mkdirSync(agentsDir, { recursive: true });
  }

  // Project-specific agent definition
  const projectAgent = {
    name: `${config.projectName}-dev`,
    description: `Specialized development agent for ${config.projectName}`,
    instructions: `You are a specialized development agent for ${config.projectName}.

Project Context:
- **Name**: ${config.projectName}
- **Description**: ${config.description}
- **Tech Stack**: Better-T-Stack with ${config.database}, ${config.auth.length > 0 ? config.auth.join(' + ') : 'no auth'}, ${config.testing.length > 0 ? config.testing.join(' + ') : 'minimal testing'}
- **UI Theme**: ${config.uiStyle} with ${config.baseColor}/${config.accentColor}

Constitutional Requirements:
- 100% TypeScript with strict mode - NO exceptions
- No \`any\` types allowed anywhere
- All changes must pass TypeScript compilation
- Follow Better-T-Stack patterns and conventions
${config.unitTesting ? '- Maintain test coverage for critical code paths' : ''}
${config.beadsIntegration ? '- Track all work in Beads issue system' : ''}

Key Responsibilities:
1. **Code Quality**: Enforce TypeScript strict mode and constitutional principles
2. **Architecture**: Maintain Better-T-Stack patterns and project structure
3. **Documentation**: Keep PROJECT_STATUS.md and ARCHITECTURE.md current
${config.beadsIntegration ? '4. **Issue Tracking**: Use Beads for all task management' : ''}
5. **Testing**: Ensure all critical paths are covered
6. **Performance**: Optimize for Core Web Vitals and user experience

Available Tools:
- Full file system access for code changes
${config.mcpServers.includes('github') ? '- GitHub integration for repository management' : ''}
${config.mcpServers.includes('postgres') && config.database === 'postgresql' ? '- PostgreSQL database access for schema management' : ''}
${config.mcpServers.includes('playwright') ? '- Playwright for E2E testing' : ''}

Session Protocol:
1. Always check docs/PROJECT_STATUS.md for current state
2. Update issue status when starting/completing work
3. Follow constitutional principles strictly
4. Update documentation after significant changes
5. Commit with conventional commit format

You are the definitive authority on ${config.projectName} development standards and must ensure all work meets constitutional requirements.`,

    tools: [
      'file_system',
      ...(config.mcpServers.includes('github') ? ['github'] : []),
      ...(config.mcpServers.includes('postgres') ? ['postgres'] : []),
      ...(config.mcpServers.includes('playwright') ? ['playwright'] : [])
    ],

    context: {
      projectType: config.preset || 'custom',
      database: config.database,
      auth: config.auth,
      testing: config.testing,
      deployment: config.deployTarget,
      pbsLevel: config.pbsLevel
    }
  };

  await fs.writeFile(
    join(agentsDir, `${config.projectName}-dev.json`),
    JSON.stringify(projectAgent, null, 2),
    'utf-8'
  );

  // Add specialized agents based on project configuration
  if (config.testing.includes('playwright') || config.testing.includes('puppeteer')) {
    const testingAgent = {
      name: `${config.projectName}-tester`,
      description: `E2E testing specialist for ${config.projectName}`,
      instructions: `You are an E2E testing specialist for ${config.projectName}.

Focus Areas:
- ${config.testing.join(' and ')} test automation
- User journey validation
- Browser compatibility testing
- Performance testing
- Accessibility compliance

Your role is to ensure comprehensive test coverage and quality assurance for ${config.projectName}.`,
      tools: ['file_system', ...(config.mcpServers.includes('playwright') ? ['playwright'] : [])]
    };

    await fs.writeFile(
      join(agentsDir, `${config.projectName}-tester.json`),
      JSON.stringify(testingAgent, null, 2),
      'utf-8'
    );
  }

  if (config.database !== 'none') {
    const databaseAgent = {
      name: `${config.projectName}-db`,
      description: `Database specialist for ${config.projectName}`,
      instructions: `You are a database specialist for ${config.projectName}.

Database: ${config.database}
ORM: Drizzle

Focus Areas:
- Schema design and optimization
- Query performance analysis
- Migration management
- Data modeling best practices
- Database security

Your role is to ensure optimal database performance and proper data modeling for ${config.projectName}.`,
      tools: [
        'file_system',
        ...(config.mcpServers.includes('postgres') && config.database === 'postgresql' ? ['postgres'] : [])
      ]
    };

    await fs.writeFile(
      join(agentsDir, `${config.projectName}-db.json`),
      JSON.stringify(databaseAgent, null, 2),
      'utf-8'
    );
  }
}

/**
 * Generate command definitions for Claude Code
 */
async function generateCommandDefinitions(claudeDir: string, config: ProjectConfig): Promise<void> {
  const commandsDir = join(claudeDir, 'commands');
  if (!existsSync(commandsDir)) {
    mkdirSync(commandsDir, { recursive: true });
  }

  // Project status command
  const statusCommand = {
    name: 'status',
    description: `Check ${config.projectName} project status`,
    handler: `
// Check and display project status
console.log('📊 ${config.projectName} Status Report');
console.log('================================');

// Git status
console.log('\\n📂 Git Status:');
const gitStatus = await $\`git status --short\`;
console.log(gitStatus.stdout || 'Working directory clean');

// TypeScript compilation
console.log('\\n📝 TypeScript Status:');
try {
  await $\`bun run typecheck\`;
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.log('❌ TypeScript compilation issues');
}

${config.unitTesting || config.testing.length > 0 ? `
// Test status
console.log('\\n🧪 Test Status:');
try {
  await $\`bun run test\`;
  console.log('✅ All tests passing');
} catch (error) {
  console.log('❌ Test failures detected');
}
` : ''}

${config.beadsIntegration ? `
// Beads status
console.log('\\n📋 Beads Status:');
try {
  const ready = await $\`bd ready --json\`.json();
  console.log(\`📌 \${ready.length} items ready to work on\`);

  const open = await $\`bd list --status open --json\`.json();
  console.log(\`📝 \${open.length} total open issues\`);
} catch (error) {
  console.log('⚠️  Beads status unavailable');
}
` : ''}

// Development server status
console.log('\\n🚀 Development Status:');
try {
  const response = await fetch('http://localhost:3000/health');
  if (response.ok) {
    console.log('✅ Development server running');
  } else {
    console.log('⚠️  Development server responding with errors');
  }
} catch (error) {
  console.log('❌ Development server not running');
}

console.log('\\n📋 Next Steps:');
console.log('  • Run "bun dev" to start development server');
${config.beadsIntegration ? "console.log('  • Run \"bd ready\" to see available work');" : ''}
console.log('  • Check docs/PROJECT_STATUS.md for detailed status');
`
  };

  await fs.writeFile(
    join(commandsDir, 'status.js'),
    `// ${config.projectName} Status Command\n${statusCommand.handler}`,
    'utf-8'
  );

  // Development setup command
  const setupCommand = `
// Development Environment Setup for ${config.projectName}
console.log('🛠️  Setting up ${config.projectName} development environment...');

// Install dependencies
console.log('📦 Installing dependencies...');
await $\`bun install\`;

${config.database === 'postgresql' ? `
// Setup PostgreSQL database
console.log('🐘 Setting up PostgreSQL...');
try {
  await $\`createdb ${config.projectName}\`;
  console.log('✅ Database created');
} catch (error) {
  console.log('⚠️  Database may already exist');
}
` : config.database === 'turso' ? `
// Setup Turso database
console.log('🌍 Setting up Turso database...');
console.log('📝 Don\\'t forget to set DATABASE_URL in .env.local');
` : ''}

// Run database migrations
console.log('📊 Running database migrations...');
try {
  await $\`bun run db:generate\`;
  await $\`bun run db:migrate\`;
  console.log('✅ Database migrations completed');
} catch (error) {
  console.log('⚠️  Migration issues - check database configuration');
}

${config.beadsIntegration ? `
// Initialize Beads tracking
console.log('📋 Initializing Beads tracking...');
try {
  await $\`bd init\`;
  await $\`bd onboard\`;
  console.log('✅ Beads tracking initialized');
} catch (error) {
  console.log('⚠️  Beads CLI not available - install from: https://github.com/steveyegge/beads');
}
` : ''}

console.log('\\n🎉 Setup complete!');
console.log('\\n📋 Next steps:');
console.log('  1. Copy .env.example to .env.local and fill in values');
${config.database !== 'none' ? "console.log('  2. Update database connection in .env.local');" : ''}
${config.auth.includes('oauth') ? "console.log('  3. Configure OAuth providers in .env.local');" : ''}
console.log('  4. Run "bun dev" to start development server');
console.log('  5. Check CLAUDE.md for full development guide');
`;

  await fs.writeFile(
    join(commandsDir, 'setup.js'),
    setupCommand,
    'utf-8'
  );

  // Build and deployment command
  const deployCommand = `
// Build and Deploy ${config.projectName}
console.log('🚀 Building ${config.projectName} for deployment...');

// Run full validation
console.log('✅ Running pre-deployment validation...');

console.log('📝 TypeScript validation...');
await $\`bun run typecheck\`;

console.log('🧹 Code linting...');
await $\`bun run lint\`;

${config.unitTesting || config.testing.length > 0 ? `
console.log('🧪 Running tests...');
await $\`bun run test\`;
` : ''}

${config.testing.includes('playwright') ? `
console.log('🎭 Running E2E tests...');
await $\`bun run test:e2e\`;
` : ''}

// Build application
console.log('🔨 Building application...');
await $\`bun run build\`;

${config.docker ? `
// Build Docker image
console.log('🐳 Building Docker image...');
await $\`docker build -t ${config.projectName} .\`;
` : ''}

console.log('✅ Build completed successfully!');

${config.deployTarget === 'vercel' ? `
console.log('🌐 Ready for Vercel deployment');
console.log('Run: vercel --prod');
` : config.deployTarget === 'netlify' ? `
console.log('🌐 Ready for Netlify deployment');
console.log('Run: netlify deploy --prod');
` : config.docker ? `
console.log('🐳 Ready for Docker deployment');
console.log('Run: docker run -p 3000:3000 ${config.projectName}');
` : ''}
`;

  await fs.writeFile(
    join(commandsDir, 'deploy.js'),
    deployCommand,
    'utf-8'
  );

  console.log('✅ Claude Code command definitions generated');
}

/**
 * Generate skill definitions for Claude Code
 */
async function generateSkillDefinitions(claudeDir: string, config: ProjectConfig): Promise<void> {
  const skillsDir = join(claudeDir, 'skills');
  if (!existsSync(skillsDir)) {
    mkdirSync(skillsDir, { recursive: true });
  }

  // Project-specific development skill
  const devSkill = {
    name: `${config.projectName}-dev`,
    description: `Development workflow for ${config.projectName}`,
    category: 'development',
    instructions: `
# ${config.projectName} Development Skill

This skill provides specialized development workflows for ${config.projectName}.

## Project Configuration
- **Tech Stack**: Better-T-Stack + ${config.database} + ${config.auth.length > 0 ? config.auth.join('/') : 'no-auth'}
- **UI**: ${config.uiStyle} theme with ${config.baseColor}/${config.accentColor}
- **Testing**: ${config.testing.length > 0 ? config.testing.join(' + ') : 'Minimal'}
- **Deployment**: ${config.deployTarget}

## Constitutional Requirements
- 100% TypeScript strict mode compliance
- No \`any\` types allowed
- All changes must pass compilation
- Follow Better-T-Stack conventions
${config.beadsIntegration ? '- Track all work in Beads' : ''}

## Workflow Commands
1. **Start Development**: Check status, review issues, start work
2. **Feature Development**: Plan, implement, test, document
3. **Quality Assurance**: Lint, test, type check, review
4. **Deployment Prep**: Build, validate, prepare release

Use this skill to maintain development standards and workflow consistency.
`,
    parameters: {
      action: {
        type: 'enum',
        values: ['start', 'feature', 'quality', 'deploy'],
        description: 'Development action to perform'
      },
      component: {
        type: 'string',
        optional: true,
        description: 'Component or feature name'
      }
    }
  };

  await fs.writeFile(
    join(skillsDir, `${config.projectName}-dev.json`),
    JSON.stringify(devSkill, null, 2),
    'utf-8'
  );

  // Testing skill if testing is configured
  if (config.testing.length > 0) {
    const testingSkill = {
      name: `${config.projectName}-test`,
      description: `Testing workflow for ${config.projectName}`,
      category: 'testing',
      instructions: `
# Testing Skill for ${config.projectName}

Comprehensive testing workflow using ${config.testing.join(' and ')}.

## Test Types
${config.unitTesting ? '- **Unit Tests**: Component and logic testing with Vitest' : ''}
${config.testing.includes('playwright') ? '- **E2E Tests**: Browser automation with Playwright' : ''}
${config.testing.includes('puppeteer') ? '- **E2E Tests**: Browser testing with Puppeteer' : ''}
${config.testing.includes('vitest') ? '- **Integration Tests**: API and database testing' : ''}

## Test Commands
- \`bun test\`: Run unit tests
${config.testing.includes('playwright') ? '- `bun run test:e2e`: Run Playwright E2E tests' : ''}
- \`bun run test:coverage\`: Generate coverage report

## Best Practices
- Test critical user journeys
- Maintain 80%+ code coverage
- Use page object models for E2E tests
- Mock external dependencies
`,
      parameters: {
        testType: {
          type: 'enum',
          values: ['unit', 'e2e', 'integration', 'all'],
          description: 'Type of tests to run'
        }
      }
    };

    await fs.writeFile(
      join(skillsDir, `${config.projectName}-test.json`),
      JSON.stringify(testingSkill, null, 2),
      'utf-8'
    );
  }

  console.log('✅ Claude Code skill definitions generated');
}

/**
 * Main Claude Code configuration generator
 */
export async function generateClaudeCodeConfiguration(projectDir: string, config: ProjectConfig): Promise<void> {
  if (config.pbsLevel === 'none') {
    console.log('⏭️  Skipping Claude Code configuration (PBS level: none)');
    return;
  }

  const claudeDir = join(projectDir, '.claude');
  if (!existsSync(claudeDir)) {
    mkdirSync(claudeDir, { recursive: true });
  }

  try {
    // Generate main settings.json
    console.log('⚙️  Generating Claude Code settings...');
    const settings = generateClaudeCodeSettings(config);
    await fs.writeFile(
      join(claudeDir, 'settings.json'),
      JSON.stringify(settings, null, 2),
      'utf-8'
    );

    // Generate hook scripts if enabled
    if (config.claudeCodeHooks) {
      console.log('🔗 Generating hook scripts...');
      await generateHookScripts(claudeDir, config);
    }

    // Generate agent definitions
    console.log('🤖 Generating agent definitions...');
    await generateAgentDefinitions(claudeDir, config);

    // Generate command definitions
    console.log('⌨️  Generating command definitions...');
    await generateCommandDefinitions(claudeDir, config);

    // Generate skill definitions
    console.log('🎯 Generating skill definitions...');
    await generateSkillDefinitions(claudeDir, config);

    // Create README for Claude Code setup
    const claudeReadme = `# Claude Code Configuration for ${config.projectName}

This directory contains Claude Code AI workflow configuration for ${config.projectName}.

## Configuration Level: ${config.pbsLevel}

${CLAUDE_CODE_CONFIGS[config.pbsLevel].description}

## Features Included
${CLAUDE_CODE_CONFIGS[config.pbsLevel].features.map(f => `- ${f}`).join('\n')}

## MCP Servers
${config.mcpServers && config.mcpServers.length > 0 ?
  config.mcpServers.map(server => `- **${server}**: ${MCP_SERVER_CONFIGS[server]?.description || 'Custom server'}`).join('\n') :
  'No MCP servers configured'
}

## Usage

### Initial Setup
1. Install Claude Code CLI if not already installed
2. Navigate to project directory
3. Claude Code will automatically detect this configuration
4. Run \`claude-code --help\` to see available commands

### Available Commands
- \`/status\`: Check project development status
- \`/setup\`: Initialize development environment
- \`/deploy\`: Build and deploy application

### Available Agents
- **${config.projectName}-dev**: Main development agent
${config.testing.length > 0 ? `- **${config.projectName}-tester**: E2E testing specialist` : ''}
${config.database !== 'none' ? `- **${config.projectName}-db**: Database specialist` : ''}

### Constitutional Requirements
All AI assistance must follow these non-negotiable rules:
- ✅ 100% TypeScript with strict mode
- ✅ No \`any\` types anywhere
- ✅ All changes must compile successfully
- ✅ Follow Better-T-Stack conventions
${config.beadsIntegration ? '- ✅ Track all work in Beads issue system' : ''}
${config.unitTesting ? '- ✅ Maintain test coverage' : ''}

## Hooks
${config.claudeCodeHooks ? `
- **Pre-commit**: Type check, lint, and test validation
${config.beadsIntegration ? '- **Post-commit**: Beads tracking synchronization' : ''}
${config.pbsLevel === 'full' ? '- **Pre-session**: Development session preparation' : ''}
` : 'No hooks configured'}

## Documentation
- Read [CLAUDE.md](../CLAUDE.md) for complete development guide
- Check [docs/PROJECT_STATUS.md](../docs/PROJECT_STATUS.md) for current state
- Follow [constitution.md](../constitution.md) for immutable principles

---
*Generated by create-karetech-stack v1.0*
`;

    await fs.writeFile(join(claudeDir, 'README.md'), claudeReadme, 'utf-8');

    console.log(`✅ Claude Code configuration generated (${config.pbsLevel} level)`);

  } catch (error) {
    console.error('❌ Error generating Claude Code configuration:', error);
    throw error;
  }
}

/**
 * Validate Claude Code configuration
 */
export function validateClaudeCodeConfig(config: ProjectConfig): string[] {
  const warnings: string[] = [];

  if (config.claudeCodeHooks && config.pbsLevel === 'none') {
    warnings.push('⚠️  Claude Code hooks enabled but PBS level is none');
  }

  if (config.mcpServers.includes('postgres') && config.database !== 'postgresql') {
    warnings.push('⚠️  PostgreSQL MCP server selected but database is not PostgreSQL');
  }

  if (config.mcpServers.includes('playwright') && !config.testing.includes('playwright')) {
    warnings.push('⚠️  Playwright MCP server selected but Playwright testing not enabled');
  }

  if (config.beadsIntegration && !config.claudeCodeHooks) {
    warnings.push('⚠️  Consider enabling Claude Code hooks for better Beads integration');
  }

  return warnings;
}