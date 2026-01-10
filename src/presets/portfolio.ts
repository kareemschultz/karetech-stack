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
  uiStyle: 'vega',
  baseColor: 'neutral',
  accentColor: 'violet',
  font: 'geist',
  icons: 'lucide',
  borderRadius: '1',

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