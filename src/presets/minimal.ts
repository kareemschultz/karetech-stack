/**
 * Minimal Preset Configuration
 * Minimal setup for simple applications
 */

import { PresetConfig } from '../types';

export const minimalPreset: PresetConfig = {
  name: 'minimal',
  description: 'Minimal setup for simple applications',
  category: 'minimal',

  // Core Stack
  database: 'sqlite',
  auth: ['email'],
  apiStyle: 'orpc',

  // Design
  uiStyle: 'default',
  baseColor: 'slate',
  accentColor: 'blue',
  font: 'inter',
  icons: 'lucide',
  borderRadius: '0.5',

  // Testing
  testing: [],
  unitTesting: true,
  exampleTests: false,

  // DevOps
  docker: false,
  cicd: 'none',
  deployTarget: 'vercel',

  // AI Workflow
  pbsLevel: 'docs',
  beadsIntegration: false,
  claudeCodeHooks: true,
  mcpServers: ['filesystem'],

  // Extras
  pwa: false,
  analytics: 'none',
  email: 'none',
  errorTracking: 'none',
  featureFlags: false
};