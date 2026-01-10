/**
 * SaaS Preset Configuration
 * Full-featured SaaS starter with PostgreSQL, full auth, and complete DevOps
 */

import { PresetConfig } from '../types';

export const saasPreset: PresetConfig = {
  name: 'saas',
  description: 'Full-featured SaaS starter with PostgreSQL, full auth, and complete DevOps',
  category: 'starter',

  // Core Stack
  database: 'postgresql',
  auth: ['email', 'oauth'],
  apiStyle: 'orpc',

  // Design
  uiStyle: 'mira',
  baseColor: 'zinc',
  accentColor: 'blue',
  font: 'geist',
  icons: 'lucide',
  borderRadius: '0.5',

  // Testing
  testing: ['playwright'],
  unitTesting: true,
  exampleTests: true,

  // DevOps
  docker: true,
  cicd: 'github-actions',
  deployTarget: 'vercel',

  // AI Workflow
  pbsLevel: 'full',
  beadsIntegration: true,
  claudeCodeHooks: true,
  mcpServers: ['filesystem', 'github'],

  // Extras
  pwa: false,
  analytics: 'vercel',
  email: 'resend',
  errorTracking: 'sentry',
  featureFlags: false
};