/**
 * Type definitions for KareTech Stack CLI
 * Constitutional compliance: 100% TypeScript, no any types
 */

// Main project configuration interface
export interface ProjectConfig {
  // Project Info (Step 1)
  projectName: string;
  description: string;
  author: string;
  preset?: string;

  // Core Stack (Step 2)
  database: DatabaseType;
  auth: AuthProvider[];
  apiStyle: ApiStyle;

  // Design (Step 3)
  componentLibrary: ComponentLibrary;
  uiStyle: UiStyle;
  baseColor: BaseColor;
  accentColor: AccentColor;
  font: FontFamily;
  icons: IconLibrary;
  borderRadius: BorderRadius;
  menuAccent: MenuAccent;

  // Testing (Step 4)
  testing: TestingFramework[];
  unitTesting: boolean;
  exampleTests: boolean;

  // DevOps (Step 5)
  docker: boolean;
  cicd: CiCdPlatform;
  deployTarget: DeployTarget;

  // AI Workflow (Step 6)
  pbsLevel: PbsLevel;
  beadsIntegration: boolean;
  claudeCodeHooks: boolean;
  mcpServers: McpServer[];

  // Extras (Step 7)
  pwa: boolean;
  analytics: AnalyticsProvider;
  email: EmailProvider;
  errorTracking: ErrorTrackingProvider;
  featureFlags: boolean;
}

// Database options
export type DatabaseType = 'postgresql' | 'turso' | 'sqlite' | 'none';

// Authentication providers
export type AuthProvider = 'email' | 'oauth' | 'magic-links' | 'github';

// API styles
export type ApiStyle = 'orpc' | 'trpc' | 'rest';

// Component libraries
export type ComponentLibrary = 'radix' | 'base-ui';

// UI Styles (shadcn/ui themes)
export type UiStyle = 'vega' | 'nova' | 'maia' | 'lyra' | 'mira' | 'default';

// Base colors
export type BaseColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';

// Accent colors
export type AccentColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'violet';

// Font families
export type FontFamily = 'inter' | 'geist' | 'crimson' | 'mono' | 'figtree';

// Icon libraries
export type IconLibrary = 'lucide' | 'heroicons' | 'phosphor' | 'hugeicons';

// Border radius options
export type BorderRadius = '0' | '0.25' | '0.5' | '0.75' | '1' | 'default';

// Menu accent styles
export type MenuAccent = 'bold' | 'subtle';

// Testing frameworks
export type TestingFramework = 'playwright' | 'puppeteer' | 'vitest';

// CI/CD platforms
export type CiCdPlatform = 'github-actions' | 'vercel' | 'none';

// Deploy targets
export type DeployTarget = 'vercel' | 'netlify' | 'docker' | 'manual';

// PBS integration levels
export type PbsLevel = 'full' | 'docs' | 'minimal' | 'none';

// MCP servers
export type McpServer = 'filesystem' | 'github' | 'postgres' | 'playwright';

// Analytics providers
export type AnalyticsProvider = 'vercel' | 'google' | 'umami' | 'none';

// Email providers
export type EmailProvider = 'resend' | 'sendgrid' | 'nodemailer' | 'none';

// Error tracking providers
export type ErrorTrackingProvider = 'sentry' | 'bugsnag' | 'rollbar' | 'none';

// Validation error types
export interface ValidationError {
  field: keyof ProjectConfig;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

// CLI options interface
export interface CliOptions {
  preset?: string;
  theme?: UiStyle;
  color?: AccentColor;
  git?: boolean;
  install?: boolean;
  config?: string;
}

// Preset configuration interface
export interface PresetConfig extends Partial<ProjectConfig> {
  name: string;
  description: string;
  category: 'starter' | 'specialized' | 'minimal';
}

// Template generation context
export interface TemplateContext extends ProjectConfig {
  generatedAt: string;
  cliVersion: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}

// Validation context for enhanced validation
export interface ValidationContext {
  config: Partial<ProjectConfig>;
  existingProjects: string[];
  gitAvailable: boolean;
  nodeVersion: string;
  bunVersion: string;
}