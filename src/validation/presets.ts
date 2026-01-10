/**
 * Preset and PBS/Beads Integration Validation
 * Constitutional compliance: Robust tracking and workflow validation
 */

import { PresetConfig, ProjectConfig, ValidationError } from '../types';
import { presets, validatePresetName } from '../presets';

/**
 * PBS/Beads integration validation errors
 */
export interface PbsValidationError {
  component: 'pbs' | 'beads' | 'claude-code' | 'tracking' | 'documentation';
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
  documentationLink?: string;
}

/**
 * Validate PBS integration configuration
 */
export function validatePbsIntegration(config: ProjectConfig): PbsValidationError[] {
  const errors: PbsValidationError[] = [];

  // PBS Level validation
  if (config.pbsLevel === 'full') {
    // Full PBS requires proper documentation structure
    if (!config.beadsIntegration) {
      errors.push({
        component: 'beads',
        field: 'beadsIntegration',
        message: 'Full PBS level requires Beads integration for issue tracking',
        severity: 'error',
        suggestion: 'Enable beadsIntegration or reduce PBS level to "docs"',
        documentationLink: 'docs/PBS_MASTER_SYSTEM.md#beads-integration'
      });
    }

    if (!config.claudeCodeHooks) {
      errors.push({
        component: 'claude-code',
        field: 'claudeCodeHooks',
        message: 'Full PBS level requires Claude Code hooks for AI workflow',
        severity: 'error',
        suggestion: 'Enable claudeCodeHooks or reduce PBS level to "docs"',
        documentationLink: 'docs/PBS_MASTER_SYSTEM.md#claude-code-integration'
      });
    }

    if (!config.mcpServers?.includes('filesystem')) {
      errors.push({
        component: 'claude-code',
        field: 'mcpServers',
        message: 'Full PBS level requires filesystem MCP server for file operations',
        severity: 'error',
        suggestion: 'Add "filesystem" to mcpServers array',
        documentationLink: 'docs/PBS_MASTER_SYSTEM.md#mcp-servers'
      });
    }
  }

  // Beads integration validation
  if (config.beadsIntegration) {
    if (config.pbsLevel === 'none') {
      errors.push({
        component: 'beads',
        field: 'pbsLevel',
        message: 'Beads integration requires at least minimal PBS level',
        severity: 'error',
        suggestion: 'Set pbsLevel to "minimal" or higher for Beads integration'
      });
    }

    if (!config.mcpServers?.includes('github')) {
      errors.push({
        component: 'beads',
        field: 'mcpServers',
        message: 'Beads integration strongly recommended with GitHub MCP server',
        severity: 'warning',
        suggestion: 'Add "github" to mcpServers for enhanced issue tracking'
      });
    }

    if (config.cicd === 'none') {
      errors.push({
        component: 'beads',
        field: 'cicd',
        message: 'Beads works best with automated CI/CD for issue lifecycle tracking',
        severity: 'warning',
        suggestion: 'Configure GitHub Actions or another CI/CD platform'
      });
    }
  }

  // Claude Code hooks validation
  if (config.claudeCodeHooks) {
    if (!config.mcpServers?.includes('filesystem')) {
      errors.push({
        component: 'claude-code',
        field: 'mcpServers',
        message: 'Claude Code hooks require filesystem MCP server',
        severity: 'error',
        suggestion: 'Add "filesystem" to mcpServers array'
      });
    }

    if (config.pbsLevel === 'none') {
      errors.push({
        component: 'claude-code',
        field: 'pbsLevel',
        message: 'Claude Code hooks require at least minimal PBS documentation',
        severity: 'warning',
        suggestion: 'Set pbsLevel to "minimal" or higher for proper Claude Code integration'
      });
    }
  }

  // Documentation tracking validation
  if (['full', 'docs'].includes(config.pbsLevel)) {
    if (config.testing?.length === 0 && !config.unitTesting) {
      errors.push({
        component: 'documentation',
        field: 'testing',
        message: 'PBS documentation recommends testing for quality tracking',
        severity: 'info',
        suggestion: 'Add testing frameworks to improve development workflow tracking'
      });
    }

    if (!config.cicd || config.cicd === 'none') {
      errors.push({
        component: 'tracking',
        field: 'cicd',
        message: 'PBS workflow benefits from automated CI/CD for build tracking',
        severity: 'info',
        suggestion: 'Configure automated deployment for better progress tracking'
      });
    }
  }

  // Project tracking validation for SaaS and E-commerce presets
  if (['saas', 'ecommerce'].includes(config.preset || '')) {
    if (!config.errorTracking || config.errorTracking === 'none') {
      errors.push({
        component: 'tracking',
        field: 'errorTracking',
        message: 'Production applications should have error tracking for monitoring',
        severity: 'warning',
        suggestion: 'Add Sentry or another error tracking service'
      });
    }

    if (!config.analytics || config.analytics === 'none') {
      errors.push({
        component: 'tracking',
        field: 'analytics',
        message: 'SaaS applications benefit from usage analytics for tracking metrics',
        severity: 'info',
        suggestion: 'Add analytics tracking for user behavior monitoring'
      });
    }
  }

  return errors;
}

/**
 * Validate preset-specific tracking requirements
 */
export function validatePresetTracking(preset: PresetConfig): PbsValidationError[] {
  const errors: PbsValidationError[] = [];

  // Category-specific tracking validation
  switch (preset.category) {
    case 'starter':
      // Starter presets should have comprehensive tracking
      if (!preset.beadsIntegration) {
        errors.push({
          component: 'beads',
          field: 'beadsIntegration',
          message: 'Starter presets should include Beads for project tracking',
          severity: 'warning',
          suggestion: 'Enable beadsIntegration for better project management'
        });
      }

      if (preset.pbsLevel === 'none') {
        errors.push({
          component: 'pbs',
          field: 'pbsLevel',
          message: 'Starter presets should include PBS documentation',
          severity: 'warning',
          suggestion: 'Set pbsLevel to at least "docs" for comprehensive documentation'
        });
      }
      break;

    case 'specialized':
      // Specialized presets should have targeted tracking
      if (!preset.claudeCodeHooks) {
        errors.push({
          component: 'claude-code',
          field: 'claudeCodeHooks',
          message: 'Specialized presets benefit from Claude Code integration',
          severity: 'info',
          suggestion: 'Enable claudeCodeHooks for enhanced AI workflow'
        });
      }
      break;

    case 'minimal':
      // Minimal presets should have basic tracking
      if (preset.beadsIntegration) {
        errors.push({
          component: 'beads',
          field: 'beadsIntegration',
          message: 'Minimal presets typically avoid heavy integrations',
          severity: 'info',
          suggestion: 'Consider disabling beadsIntegration for truly minimal setup'
        });
      }
      break;
  }

  // Database-specific tracking validation
  if (preset.database === 'postgresql' && !preset.mcpServers?.includes('postgres')) {
    errors.push({
      component: 'tracking',
      field: 'mcpServers',
      message: 'PostgreSQL projects benefit from postgres MCP server integration',
      severity: 'info',
      suggestion: 'Add "postgres" to mcpServers for database operations tracking'
    });
  }

  // Testing-specific tracking validation
  if (preset.testing?.includes('playwright') && !preset.exampleTests) {
    errors.push({
      component: 'tracking',
      field: 'exampleTests',
      message: 'Playwright testing setup should include example tests for tracking coverage',
      severity: 'warning',
      suggestion: 'Enable exampleTests to demonstrate testing patterns'
    });
  }

  return errors;
}

/**
 * Generate comprehensive tracking configuration validation
 */
export function validateTrackingConfiguration(config: ProjectConfig): {
  beadsConfig: boolean;
  claudeCodeConfig: boolean;
  mcpServersConfig: boolean;
  documentationConfig: boolean;
  testingTracking: boolean;
  analyticsTracking: boolean;
  errorTracking: boolean;
  overallScore: number;
} {
  const tracking = {
    beadsConfig: config.beadsIntegration && config.pbsLevel !== 'none',
    claudeCodeConfig: config.claudeCodeHooks && config.mcpServers?.includes('filesystem') || false,
    mcpServersConfig: (config.mcpServers?.length || 0) > 0,
    documentationConfig: ['full', 'docs'].includes(config.pbsLevel),
    testingTracking: config.testing && config.testing.length > 0 || config.unitTesting,
    analyticsTracking: config.analytics !== 'none',
    errorTracking: config.errorTracking !== 'none',
    overallScore: 0
  };

  // Calculate overall tracking score (0-100)
  const trackingItems = Object.values(tracking).slice(0, -1); // Exclude overallScore
  const trueCount = trackingItems.filter(Boolean).length;
  tracking.overallScore = Math.round((trueCount / trackingItems.length) * 100);

  return tracking;
}

/**
 * Generate tracking configuration recommendations
 */
export function generateTrackingRecommendations(config: ProjectConfig): string[] {
  const recommendations: string[] = [];
  const tracking = validateTrackingConfiguration(config);

  if (!tracking.beadsConfig) {
    recommendations.push('🔄 Enable Beads integration for issue tracking and project management');
  }

  if (!tracking.claudeCodeConfig) {
    recommendations.push('🤖 Set up Claude Code hooks for AI-assisted development workflow');
  }

  if (!tracking.mcpServersConfig) {
    recommendations.push('🔌 Configure MCP servers for enhanced development capabilities');
  }

  if (!tracking.documentationConfig) {
    recommendations.push('📚 Include PBS documentation for comprehensive project tracking');
  }

  if (!tracking.testingTracking) {
    recommendations.push('🧪 Add testing frameworks for code quality tracking');
  }

  if (!tracking.analyticsTracking && ['saas', 'ecommerce'].includes(config.preset || '')) {
    recommendations.push('📊 Configure analytics for user behavior tracking');
  }

  if (!tracking.errorTracking && ['saas', 'ecommerce'].includes(config.preset || '')) {
    recommendations.push('🚨 Set up error tracking for production monitoring');
  }

  if (tracking.overallScore >= 80) {
    recommendations.unshift('✅ Excellent tracking configuration! Your project has comprehensive monitoring.');
  } else if (tracking.overallScore >= 60) {
    recommendations.unshift('🟡 Good tracking setup. Consider the suggestions below for optimization.');
  } else {
    recommendations.unshift('🔴 Limited tracking configuration. Implement the recommendations below for better project management.');
  }

  return recommendations;
}

/**
 * Validate a preset configuration for compliance and structure
 */
export function validatePreset(preset: PresetConfig): PbsValidationError[] {
  const errors: PbsValidationError[] = [];

  // Basic structure validation
  if (!preset.name) {
    errors.push({
      component: 'pbs',
      field: 'name',
      message: 'Preset must have a name',
      severity: 'error'
    });
  }

  if (!preset.description) {
    errors.push({
      component: 'pbs',
      field: 'description',
      message: 'Preset must have a description',
      severity: 'error'
    });
  }

  if (!preset.category) {
    errors.push({
      component: 'pbs',
      field: 'category',
      message: 'Preset must have a category',
      severity: 'error'
    });
  }

  // Core configuration validation
  if (!preset.database) {
    errors.push({
      component: 'pbs',
      field: 'database',
      message: 'Preset must specify a database type',
      severity: 'error'
    });
  }

  // Add tracking-specific validation
  errors.push(...validatePresetTracking(preset));

  return errors;
}

/**
 * Validate all presets for compliance and structure
 */
export function validateAllPresets(): Record<string, PbsValidationError[]> {
  const results: Record<string, PbsValidationError[]> = {};

  for (const [name, preset] of Object.entries(presets)) {
    results[name] = validatePreset(preset);
  }

  return results;
}

/**
 * Validate all presets for proper tracking and PBS integration
 */
export function validateAllPresetsTracking(): Record<string, PbsValidationError[]> {
  const results: Record<string, PbsValidationError[]> = {};

  for (const [name, preset] of Object.entries(presets)) {
    results[name] = validatePresetTracking(preset);
  }

  return results;
}

/**
 * Generate tracking and documentation checklist for a project
 */
export function generateTrackingChecklist(config: ProjectConfig): {
  setup: string[];
  daily: string[];
  weekly: string[];
  monthly: string[];
} {
  return {
    setup: [
      '📋 Initialize Beads issue tracking: `bd init`',
      '🔗 Connect GitHub repository: `bd onboard`',
      '⚙️ Configure Claude Code hooks in .claude/settings.json',
      '📁 Set up MCP servers for enhanced capabilities',
      '📖 Create initial PBS documentation structure'
    ],
    daily: [
      '✅ Create issues for new tasks: `bd create "task description"`',
      '🔄 Update issue status: `bd update bd-XXX --status in_progress`',
      '🏁 Close completed issues: `bd close bd-XXX --reason "completed"`',
      '💬 Use /commit for structured commit messages',
      '📝 Update daily progress in project status'
    ],
    weekly: [
      '📊 Review issue velocity: `bd list --status closed`',
      '🔍 Analyze dependency tree: `bd dep tree`',
      '📈 Update project metrics and KPIs',
      '📋 Plan upcoming sprint work',
      '🧹 Clean up completed/stale issues'
    ],
    monthly: [
      '📚 Update comprehensive documentation',
      '🎯 Review and adjust project roadmap',
      '💡 Analyze productivity patterns and bottlenecks',
      '🔄 Optimize tracking and workflow processes',
      '📊 Generate progress reports for stakeholders'
    ]
  };
}