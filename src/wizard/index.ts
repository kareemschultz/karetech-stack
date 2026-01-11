/**
 * Enhanced wizard system with conditional logic and improved UX
 * Replaces basic prompts with intelligent, context-aware wizard flow
 */

import { text, select, confirm, multiselect, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';

// Safe helper functions removed - were unused
import { ProjectConfig, DatabaseType, AuthProvider, UiStyle, TestingFramework, CiCdPlatform, PbsLevel, AccentColor, BaseColor, FontFamily, IconLibrary, BorderRadius, DeployTarget, AnalyticsProvider, EmailProvider, ErrorTrackingProvider, McpServer, ComponentLibrary, MenuAccent } from '../types';
import { validateProjectNamePrompt, validateDescriptionPrompt, validateAuthorPrompt } from '../validation';
import { detectGitHubRepository, displayGitHubDetection, autoConfigureGitHubMCP } from '../generators/github-detection';
import { MCPRegistry } from '../mcp/registry';
import { validateMCPAvailability } from '../mcp/auto-installer';

// Wizard step interface
export interface WizardStep {
  name: string;
  title: string;
  description: string;
  required: boolean;
  condition?: (config: Partial<ProjectConfig>) => boolean;
}

// Enhanced wizard context
export interface WizardContext {
  config: Partial<ProjectConfig>;
  preset?: string;
  skipOptional: boolean;
  currentStep: number;
  totalSteps: number;
  isNonInteractive: boolean;
}

/**
 * Define all wizard steps
 */
export const WIZARD_STEPS: WizardStep[] = [
  {
    name: 'project-info',
    title: '📋 Project Information',
    description: 'Basic project details and setup',
    required: true
  },
  {
    name: 'core-stack',
    title: '🔧 Core Stack',
    description: 'Database, authentication, and API configuration',
    required: true
  },
  {
    name: 'design-system',
    title: '🎨 Design System',
    description: 'UI framework, theme, colors, and styling',
    required: true
  },
  {
    name: 'testing-setup',
    title: '🧪 Testing Setup',
    description: 'Testing frameworks and quality assurance',
    required: false,
    condition: (config) => !config.preset || config.preset === 'custom'
  },
  {
    name: 'devops-config',
    title: '🐳 DevOps Configuration',
    description: 'Docker, CI/CD, and deployment setup',
    required: false,
    condition: (config) => !config.preset || config.preset === 'custom'
  },
  {
    name: 'ai-workflow',
    title: '🤖 AI Workflow',
    description: 'PBS integration and AI-assisted development',
    required: false,
    condition: (config) => !config.preset || config.preset === 'custom'
  },
  {
    name: 'extras',
    title: '⚡ Extra Features',
    description: 'PWA, analytics, email, and additional services',
    required: false,
    condition: (config) => !config.preset || config.preset === 'custom'
  }
];

/**
 * Enhanced step 1: Project Information
 */
export async function projectInfoStep(context: WizardContext): Promise<Partial<ProjectConfig>> {
  const updates: Partial<ProjectConfig> = {};

  console.log(pc.cyan(`\n${WIZARD_STEPS[0].title}`));
  console.log(pc.dim(WIZARD_STEPS[0].description));
  console.log();

  // Project name (already handled in main flow, but can be updated)
  if (!context.config.projectName) {
    const projectName = await text({
      message: 'What is your project name?',
      placeholder: 'my-awesome-app',
      validate: validateProjectNamePrompt,
    });

    if (isCancel(projectName)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    updates.projectName = projectName as string;
  }

  // Enhanced description with suggestions
  const suggestions = [
    'A modern web application',
    'An innovative SaaS platform',
    'A content management system',
    'A developer productivity tool',
    'An e-commerce marketplace',
    'A data visualization dashboard'
  ];

  const description = await text({
    message: 'Project description:',
    placeholder: suggestions[Math.floor(Math.random() * suggestions.length)],
    initialValue: context.config.description || '',
    validate: validateDescriptionPrompt,
  });

  if (isCancel(description)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.description = description as string;

  // Author with better defaults
  const author = await text({
    message: 'Author name:',
    placeholder: 'Your Name',
    initialValue: context.config.author || '',
    validate: validateAuthorPrompt,
  });

  if (isCancel(author)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.author = author as string;

  return updates;
}

/**
 * Enhanced step 2: Core Stack Configuration
 */
export async function coreStackStep(context: WizardContext): Promise<Partial<ProjectConfig>> {
  const updates: Partial<ProjectConfig> = {};

  console.log(pc.cyan(`\n${WIZARD_STEPS[1].title}`));
  console.log(pc.dim(WIZARD_STEPS[1].description));
  console.log();

  // Database selection with recommendations
  const database = await select({
    message: 'Choose your database:',
    options: [
      {
        value: 'postgresql',
        label: 'PostgreSQL',
        hint: '🐘 Production-ready, full-featured (recommended for SaaS)'
      },
      {
        value: 'turso',
        label: 'Turso (LibSQL)',
        hint: '⚡ Edge-optimized SQLite (great for blogs/content)'
      },
      {
        value: 'sqlite',
        label: 'SQLite',
        hint: '📁 Simple file-based (perfect for prototypes)'
      }
    ],
    initialValue: context.config.database || 'postgresql',
  });

  if (isCancel(database)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.database = database as DatabaseType;

  // Authentication providers with smart defaults
  const authOptions = [
    { value: 'email', label: 'Email/Password', hint: 'Classic email authentication' },
    { value: 'oauth', label: 'OAuth (Google, GitHub, etc.)', hint: 'Social authentication' },
    { value: 'magic-links', label: 'Magic Links', hint: 'Passwordless email authentication' }
  ];

  // Add GitHub auth for devtool projects
  if (context.config.preset === 'devtool') {
    authOptions.unshift({
      value: 'github',
      label: 'GitHub OAuth',
      hint: 'Perfect for developer tools'
    });
  }

  const auth = await multiselect({
    message: 'Authentication providers:',
    options: authOptions,
    initialValues: context.config.auth || ['email'],
    required: true,
  });

  if (isCancel(auth)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.auth = auth as AuthProvider[];

  // API Style (future extension point)
  updates.apiStyle = 'orpc'; // Constitutional requirement: Better-T-Stack uses oRPC

  return updates;
}

/**
 * Enhanced step 3: Design System Configuration
 */
export async function designSystemStep(context: WizardContext): Promise<Partial<ProjectConfig>> {
  const updates: Partial<ProjectConfig> = {};

  console.log(pc.cyan(`\n${WIZARD_STEPS[2].title}`));
  console.log(pc.dim(WIZARD_STEPS[2].description));
  console.log();

  // Component library selection
  const componentLibrary = await select({
    message: 'Choose component library:',
    options: [
      {
        value: 'base-ui',
        label: 'Base UI',
        hint: '🚀 Modern, maintained by MUI team (recommended)'
      },
      {
        value: 'radix',
        label: 'Radix UI',
        hint: '⚛️ Headless components, primitive focus'
      }
    ],
    initialValue: context.config.componentLibrary || 'base-ui',
  });

  if (isCancel(componentLibrary)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.componentLibrary = componentLibrary as ComponentLibrary;

  // UI Style selection with previews
  const uiStyle = await select({
    message: 'Choose your UI style:',
    options: [
      {
        value: 'vega',
        label: '🌟 Vega',
        hint: 'Clean, minimal, and spacious design'
      },
      {
        value: 'nova',
        label: '💫 Nova',
        hint: 'Bold, modern, and vibrant interface'
      },
      {
        value: 'maia',
        label: '🌸 Maia',
        hint: 'Rounded, friendly, and approachable'
      },
      {
        value: 'lyra',
        label: '📖 Lyra',
        hint: 'Editorial, refined, content-focused'
      },
      {
        value: 'mira',
        label: '⚡ Mira',
        hint: 'Sharp, professional, and efficient'
      }
    ],
    initialValue: context.config.uiStyle || 'maia',
  });

  if (isCancel(uiStyle)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.uiStyle = uiStyle as UiStyle;

  // Base color selection
  const baseColor = await select({
    message: 'Choose base color:',
    options: [
      { value: 'slate', label: 'Slate', hint: 'Cool and professional' },
      { value: 'gray', label: 'Gray', hint: 'Neutral and balanced' },
      { value: 'zinc', label: 'Zinc', hint: 'Modern and clean' },
      { value: 'neutral', label: 'Neutral', hint: 'Warm and natural' },
      { value: 'stone', label: 'Stone', hint: 'Earthy and grounded' }
    ],
    initialValue: context.config.baseColor || 'zinc',
  });

  if (isCancel(baseColor)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.baseColor = baseColor as BaseColor;

  // Accent color selection
  const accentColor = await select({
    message: 'Choose accent color:',
    options: [
      { value: 'blue', label: 'Blue', hint: 'Trustworthy and professional' },
      { value: 'green', label: 'Green', hint: 'Growth and success' },
      { value: 'violet', label: 'Violet', hint: 'Creative and innovative' },
      { value: 'orange', label: 'Orange', hint: 'Energetic and friendly' },
      { value: 'red', label: 'Red', hint: 'Bold and attention-grabbing' },
      { value: 'yellow', label: 'Yellow', hint: 'Optimistic and cheerful' },
      { value: 'pink', label: 'Pink', hint: 'Playful and modern' },
      { value: 'purple', label: 'Purple', hint: 'Luxury and sophistication' }
    ],
    initialValue: context.config.accentColor || 'blue',
  });

  if (isCancel(accentColor)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.accentColor = accentColor as AccentColor;

  // Font family
  const font = await select({
    message: 'Choose font family:',
    options: [
      { value: 'figtree', label: 'Figtree', hint: '🌟 Modern geometric sans-serif (recommended)' },
      { value: 'inter', label: 'Inter', hint: 'Versatile and readable' },
      { value: 'geist', label: 'Geist', hint: 'Modern and tech-focused' },
      { value: 'crimson', label: 'Crimson Text', hint: 'Editorial and elegant' },
      { value: 'mono', label: 'JetBrains Mono', hint: 'Developer-focused monospace' }
    ],
    initialValue: context.config.font || 'figtree',
  });

  if (isCancel(font)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.font = font as FontFamily;

  // Icon library
  const icons = await select({
    message: 'Choose icon library:',
    options: [
      { value: 'hugeicons', label: 'Hugeicons', hint: '🎨 Rounded strokes, matches Maia aesthetic (recommended)' },
      { value: 'lucide', label: 'Lucide', hint: 'Beautiful and consistent' },
      { value: 'heroicons', label: 'Heroicons', hint: 'Clean and modern' },
      { value: 'phosphor', label: 'Phosphor', hint: 'Flexible and expressive' }
    ],
    initialValue: context.config.icons || 'hugeicons',
  });

  if (isCancel(icons)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.icons = icons as IconLibrary;

  // Border radius
  const borderRadius = await select({
    message: 'Choose border radius style:',
    options: [
      { value: 'default', label: 'Default (12px)', hint: '🌟 Maia theme optimized (recommended)' },
      { value: '0', label: 'None (0px)', hint: 'Sharp and geometric' },
      { value: '0.25', label: 'Small (4px)', hint: 'Subtle rounding' },
      { value: '0.5', label: 'Medium (8px)', hint: 'Balanced appearance' },
      { value: '0.75', label: 'Large (12px)', hint: 'Friendly and soft' },
      { value: '1', label: 'Extra Large (16px)', hint: 'Very rounded' }
    ],
    initialValue: context.config.borderRadius || 'default',
  });

  if (isCancel(borderRadius)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.borderRadius = borderRadius as BorderRadius;

  // Menu accent style
  const menuAccent = await select({
    message: 'Choose menu accent style:',
    options: [
      { value: 'subtle', label: 'Subtle', hint: '🌟 Modern gray hover states (recommended)' },
      { value: 'bold', label: 'Bold', hint: 'Colored hover states with accent color' }
    ],
    initialValue: context.config.menuAccent || 'subtle',
  });

  if (isCancel(menuAccent)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.menuAccent = menuAccent as MenuAccent;

  return updates;
}

/**
 * Enhanced step 4: Testing Setup
 */
export async function testingSetupStep(context: WizardContext): Promise<Partial<ProjectConfig>> {
  const updates: Partial<ProjectConfig> = {};

  console.log(pc.cyan(`\n${WIZARD_STEPS[3].title}`));
  console.log(pc.dim(WIZARD_STEPS[3].description));
  console.log();

  // Testing frameworks
  const testing = await multiselect({
    message: 'Select testing frameworks:',
    options: [
      {
        value: 'playwright',
        label: 'Playwright',
        hint: 'Modern E2E testing with great dev experience'
      },
      {
        value: 'puppeteer',
        label: 'Puppeteer',
        hint: 'Chrome-focused testing and automation'
      },
      {
        value: 'vitest',
        label: 'Vitest',
        hint: 'Fast unit testing with Vite integration'
      }
    ],
    initialValues: context.config.testing || [],
    required: false,
  });

  if (isCancel(testing)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.testing = testing as TestingFramework[];

  // Unit testing
  const unitTesting = await confirm({
    message: 'Include unit testing setup?',
    initialValue: context.config.unitTesting ?? true,
  });

  if (isCancel(unitTesting)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.unitTesting = unitTesting;

  // Example tests
  const exampleTests = await confirm({
    message: 'Generate example test files?',
    initialValue: context.config.exampleTests ?? true,
  });

  if (isCancel(exampleTests)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.exampleTests = exampleTests;

  return updates;
}

/**
 * Enhanced step 5: DevOps Configuration
 */
export async function devOpsStep(context: WizardContext): Promise<Partial<ProjectConfig>> {
  const updates: Partial<ProjectConfig> = {};

  console.log(pc.cyan(`\n${WIZARD_STEPS[4].title}`));
  console.log(pc.dim(WIZARD_STEPS[4].description));
  console.log();

  // Docker configuration
  const docker = await confirm({
    message: 'Include Docker configuration?',
    initialValue: context.config.docker ?? false,
  });

  if (isCancel(docker)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.docker = docker;

  // CI/CD platform
  const cicd = await select({
    message: 'Choose CI/CD platform:',
    options: [
      {
        value: 'github-actions',
        label: 'GitHub Actions',
        hint: 'Integrated with GitHub, powerful workflows'
      },
      {
        value: 'vercel',
        label: 'Vercel',
        hint: 'Deploy on push, optimized for web apps'
      },
      {
        value: 'none',
        label: 'None',
        hint: 'Manual deployment only'
      }
    ],
    initialValue: context.config.cicd || 'vercel',
  });

  if (isCancel(cicd)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.cicd = cicd as CiCdPlatform;

  // Deploy target
  const deployTarget = await select({
    message: 'Primary deployment target:',
    options: [
      { value: 'vercel', label: 'Vercel', hint: 'Serverless, edge-optimized' },
      { value: 'netlify', label: 'Netlify', hint: 'JAMstack-focused hosting' },
      { value: 'docker', label: 'Docker', hint: 'Containerized deployment' },
      { value: 'manual', label: 'Manual', hint: 'Custom deployment setup' }
    ],
    initialValue: context.config.deployTarget || 'vercel',
  });

  if (isCancel(deployTarget)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.deployTarget = deployTarget as DeployTarget;

  return updates;
}

/**
 * Enhanced step 6: AI Workflow with intelligent MCP integration
 */
export async function aiWorkflowStep(context: WizardContext): Promise<Partial<ProjectConfig>> {
  const updates: Partial<ProjectConfig> = {};

  console.log(pc.cyan(`\n${WIZARD_STEPS[5].title}`));
  console.log(pc.dim(WIZARD_STEPS[5].description));
  console.log();

  // PBS Level
  const pbsLevel = await select({
    message: 'Choose PBS (Plan-Build-Ship) integration level:',
    options: [
      {
        value: 'full',
        label: 'Full PBS System',
        hint: 'Complete documentation + Beads + Claude Code + MCP'
      },
      {
        value: 'docs',
        label: 'Documentation Only',
        hint: 'PBS methodology docs without automation'
      },
      {
        value: 'minimal',
        label: 'Minimal',
        hint: 'Basic CLAUDE.md only'
      },
      {
        value: 'none',
        label: 'None',
        hint: 'No PBS integration'
      }
    ],
    initialValue: context.config.pbsLevel || 'minimal',
  });

  if (isCancel(pbsLevel)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.pbsLevel = pbsLevel as PbsLevel;

  // Beads integration
  if (pbsLevel === 'full') {
    updates.beadsIntegration = true;
  } else {
    const beadsIntegration = await confirm({
      message: 'Include Beads issue tracking?',
      initialValue: context.config.beadsIntegration ?? false,
    });

    if (isCancel(beadsIntegration)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    updates.beadsIntegration = beadsIntegration;
  }

  // Claude Code hooks
  if (pbsLevel === 'full') {
    updates.claudeCodeHooks = true;
  } else {
    const claudeCodeHooks = await confirm({
      message: 'Include Claude Code hooks?',
      initialValue: context.config.claudeCodeHooks ?? false,
    });

    if (isCancel(claudeCodeHooks)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    updates.claudeCodeHooks = claudeCodeHooks;
  }

  // MCP servers integration
  if (pbsLevel === 'full' || pbsLevel === 'docs') {
    console.log(pc.blue('\n🔍 Analyzing project for MCP server recommendations...'));

    // Auto-detect GitHub repository
    const githubDetection = detectGitHubRepository(process.cwd(), context.config as ProjectConfig);
    if (githubDetection.detected) {
      displayGitHubDetection(githubDetection);
    }

    // Build smart defaults based on project configuration
    const smartDefaults: string[] = ['filesystem']; // Always include filesystem

    // Add database-specific server
    const currentConfig = { ...context.config, ...updates } as ProjectConfig;
    if (currentConfig.database === 'postgresql') {
      smartDefaults.push('postgres');
    } else if (currentConfig.database === 'turso') {
      smartDefaults.push('turso');
    } else if (currentConfig.database === 'sqlite') {
      smartDefaults.push('sqlite');
    }

    // Add GitHub if detected
    if (githubDetection.detected) {
      smartDefaults.push('github');
    }

    // Add testing servers if testing is enabled
    if (currentConfig.testing?.includes('playwright')) {
      smartDefaults.push('playwright');
    }

    // Get available servers from registry
    const registry = new MCPRegistry();
    const availableServers = registry.getAll();

    // Build options from available servers
    const mcpOptions: Array<{ value: string; label: string; hint: string; }> = availableServers.map((server: any) => ({
      value: server.id,
      label: server.name,
      hint: server.description
    }));

    // Show smart recommendations
    if (smartDefaults.length > 1) {
      console.log(pc.green('\n✨ Smart recommendations based on your project:'));
      smartDefaults.forEach(serverId => {
        const server = availableServers.find((s: any) => s.id === serverId);
        if (server) {
          console.log(pc.gray(`   • ${server.name}: ${server.description}`));
        }
      });
      console.log();
    }

    const useSmartDefaults = await confirm({
      message: `Use smart defaults (${smartDefaults.join(', ')})?`,
      initialValue: true,
    });

    if (isCancel(useSmartDefaults)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    let selectedServers: string[] = [];

    if (useSmartDefaults) {
      selectedServers = smartDefaults;

      // Ask if they want to add more
      const addMore = await confirm({
        message: 'Add additional MCP servers?',
        initialValue: false,
      });

      if (isCancel(addMore)) {
        cancel('Operation cancelled');
        process.exit(0);
      }

      if (addMore) {
        // Show remaining options
        const remainingOptions = mcpOptions.filter(opt => !smartDefaults.includes(opt.value));

        if (remainingOptions.length > 0) {
          const additionalServers = await multiselect({
            message: 'Select additional MCP servers:',
            options: remainingOptions,
            initialValues: [] as string[],
            required: false,
          });

          if (isCancel(additionalServers)) {
            cancel('Operation cancelled');
            process.exit(0);
          }

          selectedServers = [...smartDefaults, ...(additionalServers as string[])];
        }
      }
    } else {
      // Manual selection
      const mcpServers = await multiselect({
        message: 'Select MCP servers to include:',
        options: mcpOptions,
        initialValues: context.config.mcpServers || smartDefaults,
        required: false,
      });

      if (isCancel(mcpServers)) {
        cancel('Operation cancelled');
        process.exit(0);
      }

      selectedServers = mcpServers as string[];
    }

    // Validate MCP availability
    const tempConfig = { ...currentConfig, mcpServers: selectedServers as McpServer[] };
    const availability = validateMCPAvailability(tempConfig);

    if (!availability.valid) {
      console.log(pc.yellow('\n⚠️  Warning: Some selected MCP servers are not available:'));
      availability.missingServers.forEach(server => {
        console.log(pc.gray(`   • ${server}`));
      });
      console.log(pc.dim('These servers will be excluded from the configuration.'));
      selectedServers = availability.availableServers;
    }

    updates.mcpServers = selectedServers as McpServer[];

    // Auto-configure GitHub MCP if detected
    if (githubDetection.detected && selectedServers.includes('github')) {
      const autoConfig = autoConfigureGitHubMCP(tempConfig);
      if (autoConfig.updated) {
        console.log(pc.green('\n✅ Auto-configured GitHub MCP integration'));
        if (autoConfig.warnings.length > 0) {
          console.log(pc.yellow('\n⚠️  Setup reminders:'));
          autoConfig.warnings.forEach(warning => {
            console.log(pc.gray(`   • ${warning}`));
          });
        }
      }
    }

    // Show final selection summary
    if (selectedServers.length > 0) {
      console.log(pc.green('\n📦 Selected MCP servers:'));
      selectedServers.forEach(serverId => {
        const server = availableServers.find((s: any) => s.id === serverId);
        if (server) {
          console.log(pc.gray(`   ✓ ${server.name}`));
        }
      });
    }
  } else {
    updates.mcpServers = [];
  }

  return updates;
}

/**
 * Enhanced step 7: Extra Features
 */
export async function extrasStep(context: WizardContext): Promise<Partial<ProjectConfig>> {
  const updates: Partial<ProjectConfig> = {};

  console.log(pc.cyan(`\n${WIZARD_STEPS[6].title}`));
  console.log(pc.dim(WIZARD_STEPS[6].description));
  console.log();

  // PWA features
  const pwa = await confirm({
    message: 'Enable Progressive Web App (PWA) features?',
    initialValue: context.config.pwa ?? false,
  });

  if (isCancel(pwa)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.pwa = pwa;

  // Analytics
  const analytics = await select({
    message: 'Choose analytics provider:',
    options: [
      { value: 'vercel', label: 'Vercel Analytics', hint: 'Simple, privacy-focused' },
      { value: 'google', label: 'Google Analytics', hint: 'Comprehensive tracking' },
      { value: 'umami', label: 'Umami', hint: 'Self-hosted, privacy-focused' },
      { value: 'none', label: 'None', hint: 'No analytics tracking' }
    ],
    initialValue: context.config.analytics || 'none',
  });

  if (isCancel(analytics)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.analytics = analytics as AnalyticsProvider;

  // Email service
  const email = await select({
    message: 'Choose email service:',
    options: [
      { value: 'resend', label: 'Resend', hint: 'Developer-focused email API' },
      { value: 'sendgrid', label: 'SendGrid', hint: 'Enterprise email platform' },
      { value: 'nodemailer', label: 'Nodemailer', hint: 'Flexible SMTP solution' },
      { value: 'none', label: 'None', hint: 'No email service' }
    ],
    initialValue: context.config.email || 'none',
  });

  if (isCancel(email)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.email = email as EmailProvider;

  // Error tracking
  const errorTracking = await select({
    message: 'Choose error tracking:',
    options: [
      { value: 'sentry', label: 'Sentry', hint: 'Comprehensive error monitoring' },
      { value: 'bugsnag', label: 'Bugsnag', hint: 'Error monitoring with insights' },
      { value: 'rollbar', label: 'Rollbar', hint: 'Real-time error tracking' },
      { value: 'none', label: 'None', hint: 'No error tracking' }
    ],
    initialValue: context.config.errorTracking || 'none',
  });

  if (isCancel(errorTracking)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.errorTracking = errorTracking as ErrorTrackingProvider;

  // Feature flags
  const featureFlags = await confirm({
    message: 'Include feature flag system?',
    initialValue: context.config.featureFlags ?? false,
  });

  if (isCancel(featureFlags)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.featureFlags = featureFlags;

  return updates;
}

/**
 * Run the complete enhanced wizard
 */
export async function runEnhancedWizard(
  initialConfig: Partial<ProjectConfig> = {},
  preset?: string,
  options: { isNonInteractive?: boolean } = {}
): Promise<ProjectConfig> {
  const context: WizardContext = {
    config: { ...initialConfig },
    preset,
    skipOptional: preset !== undefined && preset !== 'custom',
    currentStep: 1,
    totalSteps: WIZARD_STEPS.length,
    isNonInteractive: options.isNonInteractive || false
  };

  // Filter steps based on conditions
  const applicableSteps = WIZARD_STEPS.filter(step => {
    if (!step.condition) return true;
    return step.condition(context.config);
  });

  context.totalSteps = applicableSteps.length;

  console.log(pc.bold(`\n🧙‍♂️ Enhanced Project Wizard (${context.totalSteps} steps)`));
  if (preset && preset !== 'custom') {
    console.log(pc.dim(`Using ${preset} preset - optional steps will be skipped`));
  }
  console.log();

  // Execute each applicable step
  for (const step of applicableSteps) {
    console.log(pc.dim(`Step ${context.currentStep} of ${context.totalSteps}`));

    let updates: Partial<ProjectConfig> = {};

    switch (step.name) {
      case 'project-info':
        updates = await projectInfoStep(context);
        break;
      case 'core-stack':
        updates = await coreStackStep(context);
        break;
      case 'design-system':
        updates = await designSystemStep(context);
        break;
      case 'testing-setup':
        updates = await testingSetupStep(context);
        break;
      case 'devops-config':
        updates = await devOpsStep(context);
        break;
      case 'ai-workflow':
        updates = await aiWorkflowStep(context);
        break;
      case 'extras':
        updates = await extrasStep(context);
        break;
    }

    // Merge updates into context
    Object.assign(context.config, updates);
    context.currentStep++;
  }

  return context.config as ProjectConfig;
}