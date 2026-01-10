/**
 * Developer Tool Preset Configuration
 * Developer tools with GitHub auth and testing focus
 */

import { PresetConfig } from '../types';

export const devtoolPreset: PresetConfig = {
  name: 'devtool',
  description: 'Developer tools with GitHub auth and testing focus',
  category: 'specialized',

  // Core Stack
  database: 'postgresql',
  auth: ['github'],
  apiStyle: 'orpc',

  // Design
  uiStyle: 'mira',
  baseColor: 'zinc',
  accentColor: 'green',
  font: 'mono',
  icons: 'lucide',
  borderRadius: '0.25',

  // Testing
  testing: ['vitest'],
  unitTesting: true,
  exampleTests: true,

  // DevOps
  docker: false,
  cicd: 'github-actions',
  deployTarget: 'vercel',

  // AI Workflow
  pbsLevel: 'docs',
  beadsIntegration: true,
  claudeCodeHooks: true,
  mcpServers: ['filesystem', 'github'],

  // Extras
  pwa: false,
  analytics: 'none',
  email: 'none',
  errorTracking: 'none',
  featureFlags: false
};