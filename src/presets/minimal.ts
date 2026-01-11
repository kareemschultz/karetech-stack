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
  componentLibrary: 'base-ui',
  uiStyle: 'maia',
  baseColor: 'zinc',
  accentColor: 'blue',
  font: 'figtree',
  icons: 'hugeicons',
  borderRadius: 'default',
  menuAccent: 'subtle',

  // Testing
  testing: [],
  unitTesting: true,
  exampleTests: false,

  // DevOps
  docker: false,
  cicd: 'none',
  deployTarget: 'vercel',

  // AI Workflow
  pbsLevel: 'none',
  beadsIntegration: false,
  claudeCodeHooks: false,
  mcpServers: [],

  // Extras
  pwa: false,
  analytics: 'none',
  email: 'none',
  errorTracking: 'none',
  featureFlags: false
};