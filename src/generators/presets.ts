/**
 * Preset Generator System
 * Handles preset-specific configurations, validation, and template generation
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
// ejs import removed - was unused
import { ProjectConfig, PresetConfig } from '../types';
import { presets, getPreset, validatePresetName } from '../presets';

/**
 * Preset validation errors
 */
export interface PresetValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
}

/**
 * Comprehensive preset validation
 */
export function validatePreset(preset: PresetConfig): PresetValidationError[] {
  const errors: PresetValidationError[] = [];

  // Basic validation
  if (!preset.name) {
    errors.push({
      field: 'name',
      message: 'Preset must have a name',
      severity: 'error'
    });
  }

  if (!preset.description) {
    errors.push({
      field: 'description',
      message: 'Preset must have a description',
      severity: 'error'
    });
  }

  if (!preset.category) {
    errors.push({
      field: 'category',
      message: 'Preset must specify a category (starter, specialized, minimal)',
      severity: 'error'
    });
  }

  // Core stack validation
  if (!preset.database) {
    errors.push({
      field: 'database',
      message: 'Preset must specify a database type',
      severity: 'error'
    });
  }

  if (!preset.apiStyle) {
    errors.push({
      field: 'apiStyle',
      message: 'Preset must specify an API style',
      severity: 'error'
    });
  }

  // Design validation
  if (!preset.uiStyle) {
    errors.push({
      field: 'uiStyle',
      message: 'Preset must specify a UI style',
      severity: 'error'
    });
  }

  // Logical consistency validation
  if (preset.docker && preset.cicd === 'none') {
    errors.push({
      field: 'docker',
      message: 'Docker is enabled but no CI/CD platform is configured',
      severity: 'warning',
      suggestion: 'Consider enabling GitHub Actions or another CI/CD platform for Docker deployment'
    });
  }

  if (preset.testing?.length === 0 && preset.unitTesting) {
    errors.push({
      field: 'testing',
      message: 'Unit testing is enabled but no testing frameworks are specified',
      severity: 'warning',
      suggestion: 'Add Vitest or another unit testing framework'
    });
  }

  if (preset.beadsIntegration && preset.pbsLevel === 'none') {
    errors.push({
      field: 'beadsIntegration',
      message: 'Beads integration is enabled but PBS level is set to none',
      severity: 'warning',
      suggestion: 'Set PBS level to at least "minimal" for Beads integration'
    });
  }

  if (preset.claudeCodeHooks && preset.pbsLevel === 'none') {
    errors.push({
      field: 'claudeCodeHooks',
      message: 'Claude Code hooks are enabled but PBS level is set to none',
      severity: 'warning',
      suggestion: 'Set PBS level to at least "minimal" for Claude Code integration'
    });
  }

  if (preset.pwa && !preset.testing?.includes('playwright')) {
    errors.push({
      field: 'pwa',
      message: 'PWA features enabled but no E2E testing configured',
      severity: 'info',
      suggestion: 'Consider adding Playwright for PWA testing'
    });
  }

  // Security validation
  if (preset.auth?.length === 0 && preset.database !== 'none') {
    errors.push({
      field: 'auth',
      message: 'Database configured but no authentication providers specified',
      severity: 'warning',
      suggestion: 'Add authentication or use a public-only configuration'
    });
  }

  return errors;
}

/**
 * Validate all presets in the registry
 */
export function validateAllPresets(): Record<string, PresetValidationError[]> {
  const validationResults: Record<string, PresetValidationError[]> = {};

  for (const [name, preset] of Object.entries(presets)) {
    validationResults[name] = validatePreset(preset);
  }

  return validationResults;
}

/**
 * Generate preset configuration compatibility matrix
 */
export function generateCompatibilityMatrix(): Record<string, Record<string, boolean>> {
  const matrix: Record<string, Record<string, boolean>> = {};
  const presetNames = Object.keys(presets);

  for (const presetA of presetNames) {
    matrix[presetA] = {};
    for (const presetB of presetNames) {
      matrix[presetA][presetB] = arePresetsCompatible(presets[presetA], presets[presetB]);
    }
  }

  return matrix;
}

/**
 * Check if two presets are compatible (can be merged)
 */
function arePresetsCompatible(presetA: PresetConfig, presetB: PresetConfig): boolean {
  // Database compatibility
  if (presetA.database !== presetB.database) {
    return false;
  }

  // API style compatibility
  if (presetA.apiStyle !== presetB.apiStyle) {
    return false;
  }

  // Major architectural differences
  if (presetA.docker !== presetB.docker) {
    return false;
  }

  return true;
}

/**
 * Generate preset documentation
 */
export async function generatePresetDocs(outputDir: string): Promise<void> {
  const docsDir = join(outputDir, 'docs', 'presets');

  if (!existsSync(docsDir)) {
    await fs.mkdir(docsDir, { recursive: true });
  }

  // Generate individual preset documentation
  for (const [name, preset] of Object.entries(presets)) {
    const presetDoc = generatePresetMarkdown(preset);
    const docPath = join(docsDir, `${name}.md`);
    await fs.writeFile(docPath, presetDoc, 'utf-8');
  }

  // Generate preset comparison table
  const comparisonDoc = generatePresetComparison();
  const comparisonPath = join(docsDir, 'comparison.md');
  await fs.writeFile(comparisonPath, comparisonDoc, 'utf-8');

  // Generate validation report
  const validationResults = validateAllPresets();
  const validationDoc = generateValidationReport(validationResults);
  const validationPath = join(docsDir, 'validation.md');
  await fs.writeFile(validationPath, validationDoc, 'utf-8');
}

/**
 * Generate markdown documentation for a preset
 */
function generatePresetMarkdown(preset: PresetConfig): string {
  const validationResults = validatePreset(preset);
  const errors = validationResults.filter(r => r.severity === 'error');
  const warnings = validationResults.filter(r => r.severity === 'warning');
  const infos = validationResults.filter(r => r.severity === 'info');

  return `# ${preset.name.charAt(0).toUpperCase() + preset.name.slice(1)} Preset

## Description
${preset.description}

**Category:** ${preset.category}

## Configuration

### Core Stack
- **Database:** ${preset.database}
- **Authentication:** ${preset.auth?.join(', ') || 'None'}
- **API Style:** ${preset.apiStyle}

### Design
- **UI Style:** ${preset.uiStyle}
- **Base Color:** ${preset.baseColor}
- **Accent Color:** ${preset.accentColor}
- **Font:** ${preset.font}
- **Icons:** ${preset.icons}
- **Border Radius:** ${preset.borderRadius}

### Testing
- **Frameworks:** ${preset.testing?.join(', ') || 'None'}
- **Unit Testing:** ${preset.unitTesting ? 'Yes' : 'No'}
- **Example Tests:** ${preset.exampleTests ? 'Yes' : 'No'}

### DevOps
- **Docker:** ${preset.docker ? 'Yes' : 'No'}
- **CI/CD:** ${preset.cicd}
- **Deploy Target:** ${preset.deployTarget}

### AI Workflow
- **PBS Level:** ${preset.pbsLevel}
- **Beads Integration:** ${preset.beadsIntegration ? 'Yes' : 'No'}
- **Claude Code Hooks:** ${preset.claudeCodeHooks ? 'Yes' : 'No'}
- **MCP Servers:** ${preset.mcpServers?.join(', ') || 'None'}

### Extras
- **PWA:** ${preset.pwa ? 'Yes' : 'No'}
- **Analytics:** ${preset.analytics}
- **Email:** ${preset.email}
- **Error Tracking:** ${preset.errorTracking}
- **Feature Flags:** ${preset.featureFlags ? 'Yes' : 'No'}

## Validation Results

${errors.length > 0 ? `### ❌ Errors
${errors.map(e => `- **${e.field}:** ${e.message}`).join('\n')}
` : ''}

${warnings.length > 0 ? `### ⚠️ Warnings
${warnings.map(w => `- **${w.field}:** ${w.message}${w.suggestion ? ` (${w.suggestion})` : ''}`).join('\n')}
` : ''}

${infos.length > 0 ? `### ℹ️ Information
${infos.map(i => `- **${i.field}:** ${i.message}${i.suggestion ? ` (${i.suggestion})` : ''}`).join('\n')}
` : ''}

${errors.length === 0 && warnings.length === 0 && infos.length === 0 ? '✅ No validation issues found.' : ''}

## Usage

\`\`\`bash
bunx create-karetech-stack my-app --preset ${preset.name}
\`\`\`
`;
}

/**
 * Generate preset comparison table
 */
function generatePresetComparison(): string {
  const presetList = Object.values(presets);

  return `# Preset Comparison

| Feature | ${Object.keys(presets).join(' | ')} |
|---------|${Object.keys(presets).map(() => '---').join(' | ')} |
| **Category** | ${presetList.map(p => p.category).join(' | ')} |
| **Database** | ${presetList.map(p => p.database).join(' | ')} |
| **Auth** | ${presetList.map(p => p.auth?.join(', ') || 'None').join(' | ')} |
| **UI Style** | ${presetList.map(p => p.uiStyle).join(' | ')} |
| **Testing** | ${presetList.map(p => p.testing?.join(', ') || 'None').join(' | ')} |
| **Docker** | ${presetList.map(p => p.docker ? 'Yes' : 'No').join(' | ')} |
| **CI/CD** | ${presetList.map(p => p.cicd).join(' | ')} |
| **PBS Level** | ${presetList.map(p => p.pbsLevel).join(' | ')} |
| **PWA** | ${presetList.map(p => p.pwa ? 'Yes' : 'No').join(' | ')} |

## Quick Selection Guide

### For SaaS Applications
- **saas**: Full-featured with PostgreSQL and complete DevOps
- **ecommerce**: E-commerce focus with enhanced testing

### For Content/Publishing
- **blog**: Optimized for content with Turso database

### For Development Tools
- **devtool**: GitHub-focused with testing emphasis

### For Simple Sites
- **portfolio**: Minimal portfolio/personal sites
- **minimal**: Bare-bones setup for simple apps
`;
}

/**
 * Generate validation report
 */
function generateValidationReport(validationResults: Record<string, PresetValidationError[]>): string {
  let report = '# Preset Validation Report\n\n';

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfos = 0;

  for (const [presetName, errors] of Object.entries(validationResults)) {
    const presetErrors = errors.filter(e => e.severity === 'error');
    const presetWarnings = errors.filter(e => e.severity === 'warning');
    const presetInfos = errors.filter(e => e.severity === 'info');

    totalErrors += presetErrors.length;
    totalWarnings += presetWarnings.length;
    totalInfos += presetInfos.length;

    if (errors.length > 0) {
      report += `## ${presetName}\n\n`;

      if (presetErrors.length > 0) {
        report += `### Errors (${presetErrors.length})\n`;
        presetErrors.forEach(error => {
          report += `- **${error.field}:** ${error.message}\n`;
        });
        report += '\n';
      }

      if (presetWarnings.length > 0) {
        report += `### Warnings (${presetWarnings.length})\n`;
        presetWarnings.forEach(warning => {
          report += `- **${warning.field}:** ${warning.message}`;
          if (warning.suggestion) {
            report += ` (${warning.suggestion})`;
          }
          report += '\n';
        });
        report += '\n';
      }

      if (presetInfos.length > 0) {
        report += `### Information (${presetInfos.length})\n`;
        presetInfos.forEach(info => {
          report += `- **${info.field}:** ${info.message}`;
          if (info.suggestion) {
            report += ` (${info.suggestion})`;
          }
          report += '\n';
        });
        report += '\n';
      }
    } else {
      report += `## ${presetName}\n✅ No validation issues found.\n\n`;
    }
  }

  // Summary
  const summary = `## Summary

- **Total Presets:** ${Object.keys(validationResults).length}
- **Errors:** ${totalErrors}
- **Warnings:** ${totalWarnings}
- **Information:** ${totalInfos}

${totalErrors === 0 ? '✅ All presets are valid!' : '❌ Some presets have validation issues that need attention.'}
`;

  return summary + '\n\n' + report;
}

/**
 * Generate preset configuration schema (for validation and IDE support)
 */
export async function generatePresetSchema(outputPath: string): Promise<void> {
  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "KareTech Stack Preset Configuration",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Preset name"
      },
      "description": {
        "type": "string",
        "description": "Preset description"
      },
      "category": {
        "type": "string",
        "enum": ["starter", "specialized", "minimal"],
        "description": "Preset category"
      },
      // Add all ProjectConfig properties here...
      // This would be a comprehensive schema
    },
    "required": ["name", "description", "category"],
    "additionalProperties": false
  };

  // Ensure directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  await fs.writeFile(outputPath, JSON.stringify(schema, null, 2), 'utf-8');
}

/**
 * Main preset generation function
 */
export async function generatePresetSystem(projectDir: string, config: ProjectConfig): Promise<void> {
  // Import validation functions
  const { validateFullConfig, getValidationContext } = await import('../validation');
  
  // Validate the preset if one was specified
  if (config.preset && validatePresetName(config.preset)) {
    const preset = getPreset(config.preset);
    if (preset) {
      const validationResults = validatePreset(preset);
      const errors = validationResults.filter(v => v.severity === 'error');

      if (errors.length > 0) {
        throw new Error(`Preset validation failed: ${errors.map(e => e.message).join(', ')}`);
      }

      console.log(`✓ Applied ${config.preset} preset successfully`);
    }
  }

  // Validate the complete configuration
  const validationContext = getValidationContext();
  const configValidation = validateFullConfig(config, validationContext);
  const configErrors = configValidation.filter(v => v.severity === 'error');

  if (configErrors.length > 0) {
    throw new Error(`Preset validation failed: ${configErrors.map(e => e.message).join(', ')}`);
  }

  // Generate preset documentation if PBS level is appropriate
  if (['full', 'docs'].includes(config.pbsLevel)) {
    await generatePresetDocs(projectDir);
    console.log('✓ Generated preset documentation');
  }

  // Generate preset schema for IDE support
  const schemaPath = join(projectDir, '.vscode', 'preset-schema.json');
  await generatePresetSchema(schemaPath);
  console.log('✓ Generated preset schema for IDE support');
}