/**
 * Portfolio Preset Configuration
 * Personal portfolio site with minimal setup
 */

import { PresetConfig } from '../types';

export const portfolioPreset: PresetConfig = {
  name: 'portfolio',
  description: 'Personal portfolio site with minimal setup',
  category: 'minimal',

  // Core Stack
  database: 'sqlite',
  auth: [],
  apiStyle: 'orpc',

  // Design
  componentLibrary: 'base-ui',
  uiStyle: 'maia',
  baseColor: 'zinc',
  accentColor: 'violet',
  font: 'figtree',
  icons: 'hugeicons',
  borderRadius: 'default',
  menuAccent: 'subtle',

  // Testing
  testing: [],
  unitTesting: true,
  exampleTests: true,

  // DevOps
  docker: false,
  cicd: 'vercel',
  deployTarget: 'vercel',

  // AI Workflow
  pbsLevel: 'minimal',
  beadsIntegration: true,
  claudeCodeHooks: true,
  mcpServers: ['filesystem'],

  // Extras
  pwa: false,
  analytics: 'vercel',
  email: 'none',
  errorTracking: 'none',
  featureFlags: false
};