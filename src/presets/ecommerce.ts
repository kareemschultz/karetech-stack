/**
 * E-commerce Preset Configuration
 * E-commerce platform with Stripe integration and full testing
 */

import { PresetConfig } from '../types';

export const ecommercePreset: PresetConfig = {
  name: 'ecommerce',
  description: 'E-commerce platform with Stripe integration and full testing',
  category: 'specialized',

  // Core Stack
  database: 'postgresql',
  auth: ['email', 'oauth', 'magic-links'],
  apiStyle: 'orpc',

  // Design
  uiStyle: 'nova',
  baseColor: 'slate',
  accentColor: 'green',
  font: 'inter',
  icons: 'heroicons',
  borderRadius: '0.75',

  // Testing
  testing: ['playwright', 'puppeteer'],
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
  mcpServers: ['filesystem', 'github', 'postgres'],

  // Extras
  pwa: true,
  analytics: 'vercel',
  email: 'resend',
  errorTracking: 'sentry',
  featureFlags: true
};