/**
 * Enhanced wizard system with conditional logic and improved UX
 * Replaces basic prompts with intelligent, context-aware wizard flow
 */

import { text, select, confirm, multiselect, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';
import { ProjectConfig, DatabaseType, AuthProvider, UiStyle, TestingFramework, CiCdPlatform, PbsLevel, AccentColor, BaseColor, FontFamily, IconLibrary, BorderRadius, DeployTarget, AnalyticsProvider, EmailProvider, ErrorTrackingProvider, McpServer } from '../types';
import { validateProjectNamePrompt, validateDescriptionPrompt, validateAuthorPrompt } from '../validation';

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
    initialValue: context.config.uiStyle || 'mira',
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
    initialValue: context.config.baseColor || 'slate',
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
      { value: 'inter', label: 'Inter', hint: 'Versatile and readable' },
      { value: 'geist', label: 'Geist', hint: 'Modern and tech-focused' },
      { value: 'crimson', label: 'Crimson Text', hint: 'Editorial and elegant' },
      { value: 'mono', label: 'JetBrains Mono', hint: 'Developer-focused monospace' }
    ],
    initialValue: context.config.font || 'inter',
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
      { value: 'lucide', label: 'Lucide', hint: 'Beautiful and consistent' },
      { value: 'heroicons', label: 'Heroicons', hint: 'Clean and modern' },
      { value: 'phosphor', label: 'Phosphor', hint: 'Flexible and expressive' }
    ],
    initialValue: context.config.icons || 'lucide',
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
      { value: '0', label: 'None (0px)', hint: 'Sharp and geometric' },
      { value: '0.25', label: 'Small (4px)', hint: 'Subtle rounding' },
      { value: '0.5', label: 'Medium (8px)', hint: 'Balanced appearance' },
      { value: '0.75', label: 'Large (12px)', hint: 'Friendly and soft' },
      { value: '1', label: 'Extra Large (16px)', hint: 'Very rounded' }
    ],
    initialValue: context.config.borderRadius || '0.5',
  });

  if (isCancel(borderRadius)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  updates.borderRadius = borderRadius as BorderRadius;

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
 * Enhanced step 6: AI Workflow
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
        hint: 'Complete documentation + Beads + Claude Code'
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

  // MCP servers
  if (pbsLevel === 'full' || pbsLevel === 'docs') {
    const mcpServers = await multiselect({
      message: 'Select MCP servers to include:',
      options: [
        { value: 'filesystem', label: 'Filesystem', hint: 'File operations and search' },
        { value: 'github', label: 'GitHub', hint: 'Repository management' },
        { value: 'postgres', label: 'PostgreSQL', hint: 'Database operations' },
        { value: 'playwright', label: 'Playwright', hint: 'Web automation' }
      ],
      initialValues: context.config.mcpServers || ['filesystem'],
      required: false,
    });

    if (isCancel(mcpServers)) {
      cancel('Operation cancelled');
      process.exit(0);
    }

    updates.mcpServers = mcpServers as McpServer[];
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
  preset?: string
): Promise<ProjectConfig> {
  const context: WizardContext = {
    config: { ...initialConfig },
    preset,
    skipOptional: preset !== undefined && preset !== 'custom',
    currentStep: 1,
    totalSteps: WIZARD_STEPS.length
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