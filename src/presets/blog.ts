/**
 * Blog Preset Configuration
 * Publishing platform with Turso and optimized for content
 */

import { PresetConfig } from '../types';

export const blogPreset: PresetConfig = {
  name: 'blog',
  description: 'Publishing platform with Turso and optimized for content',
  category: 'specialized',

  // Core Stack
  database: 'turso',
  auth: ['email'],
  apiStyle: 'orpc',

  // Design
  componentLibrary: 'base-ui',
  uiStyle: 'maia',
  baseColor: 'zinc',
  accentColor: 'orange',
  font: 'figtree',
  icons: 'hugeicons',
  borderRadius: 'default',
  menuAccent: 'subtle',

  // Testing
  testing: ['playwright'],
  unitTesting: true,
  exampleTests: true,

  // DevOps
  docker: false,
  cicd: 'vercel',
  deployTarget: 'vercel',

  // AI Workflow
  pbsLevel: 'docs',
  beadsIntegration: false,
  claudeCodeHooks: true,
  mcpServers: ['filesystem'],

  // Extras
  pwa: false,
  analytics: 'vercel',
  email: 'resend',
  errorTracking: 'none',
  featureFlags: false
};