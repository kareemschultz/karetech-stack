/**
 * Preset Testing Runner
 * Automated testing system for all presets with comprehensive reporting
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { validateAllPresets, validateAllPresetsTracking, generateTrackingRecommendations, generateTrackingChecklist } from '../../validation/presets';
import { presets } from '../index';
import { validateFullConfig, getValidationContext } from '../../validation';
import { ProjectConfig } from '../../types';

export interface PresetTestResult {
  presetName: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
  trackingScore: number;
  recommendations: string[];
  validationSummary: {
    configurationValid: boolean;
    trackingProperlyConfigured: boolean;
    documentationComplete: boolean;
    pbsCompliant: boolean;
  };
}

export interface TestSuite {
  totalPresets: number;
  passedPresets: number;
  failedPresets: number;
  results: PresetTestResult[];
  overallScore: number;
  summary: string;
  generatedAt: string;
}

/**
 * Run comprehensive tests on a single preset
 */
export async function testPreset(presetName: string): Promise<PresetTestResult> {
  const preset = presets[presetName];
  if (!preset) {
    throw new Error(`Preset ${presetName} not found`);
  }

  const errors: string[] = [];
  const warnings: string[] = [];

  // Create a complete configuration for testing
  const testConfig = {
    ...preset,
    projectName: `test-${presetName}`,
    description: `Test configuration for ${presetName} preset`,
    author: 'Test Runner',
    preset: presetName
  } as ProjectConfig;

  // 1. Basic configuration validation
  let configurationValid = true;
  try {
    const validationContext = getValidationContext();
    const configErrors = validateFullConfig(testConfig, validationContext);

    const criticalErrors = configErrors.filter(e => e.severity === 'error');
    const warningErrors = configErrors.filter(e => e.severity === 'warning');

    if (criticalErrors.length > 0) {
      configurationValid = false;
      errors.push(...criticalErrors.map(e => `Configuration: ${e.message}`));
    }

    warnings.push(...warningErrors.map(w => `Configuration: ${w.message}`));
  } catch (error) {
    configurationValid = false;
    errors.push(`Configuration validation failed: ${error}`);
  }

  // 2. Tracking configuration validation
  let trackingProperlyConfigured = true;
  let trackingScore = 0;
  let recommendations: string[] = [];

  try {
    const trackingValidation = generateTrackingRecommendations(testConfig);
    recommendations = trackingValidation;

    // Calculate tracking score based on preset configuration
    const trackingFeatures = [
      testConfig.beadsIntegration,
      testConfig.claudeCodeHooks,
      testConfig.mcpServers && testConfig.mcpServers.length > 0,
      ['full', 'docs'].includes(testConfig.pbsLevel),
      testConfig.testing && testConfig.testing.length > 0 || testConfig.unitTesting,
      testConfig.errorTracking !== 'none',
      testConfig.analytics !== 'none'
    ];

    trackingScore = Math.round((trackingFeatures.filter(Boolean).length / trackingFeatures.length) * 100);

    if (trackingScore < 50) {
      trackingProperlyConfigured = false;
      errors.push('Tracking configuration score below 50%');
    } else if (trackingScore < 70) {
      warnings.push('Tracking configuration could be improved');
    }
  } catch (error) {
    trackingProperlyConfigured = false;
    errors.push(`Tracking validation failed: ${error}`);
  }

  // 3. Documentation completeness check
  let documentationComplete = true;
  if (!preset.description || preset.description.length < 10) {
    documentationComplete = false;
    errors.push('Preset description is missing or too short');
  }

  if (!preset.category || !['starter', 'specialized', 'minimal'].includes(preset.category)) {
    documentationComplete = false;
    errors.push('Preset category is invalid or missing');
  }

  // 4. PBS compliance check
  let pbsCompliant = true;
  if (testConfig.pbsLevel === 'full') {
    if (!testConfig.beadsIntegration) {
      pbsCompliant = false;
      errors.push('Full PBS level requires Beads integration');
    }

    if (!testConfig.claudeCodeHooks) {
      pbsCompliant = false;
      errors.push('Full PBS level requires Claude Code hooks');
    }

    if (!testConfig.mcpServers?.includes('filesystem')) {
      pbsCompliant = false;
      errors.push('Full PBS level requires filesystem MCP server');
    }
  }

  if (testConfig.beadsIntegration && testConfig.pbsLevel === 'none') {
    pbsCompliant = false;
    errors.push('Beads integration requires PBS level above none');
  }

  // Determine if preset passed
  const passed = errors.length === 0 && configurationValid && pbsCompliant;

  return {
    presetName,
    passed,
    errors,
    warnings,
    trackingScore,
    recommendations,
    validationSummary: {
      configurationValid,
      trackingProperlyConfigured,
      documentationComplete,
      pbsCompliant
    }
  };
}

/**
 * Run tests on all presets
 */
export async function runAllPresetTests(): Promise<TestSuite> {
  const presetNames = Object.keys(presets);
  const results: PresetTestResult[] = [];

  console.log('🧪 Running comprehensive preset validation tests...\n');

  for (const presetName of presetNames) {
    console.log(`Testing preset: ${presetName}`);
    try {
      const result = await testPreset(presetName);
      results.push(result);

      if (result.passed) {
        console.log(`✅ ${presetName}: PASSED (Score: ${result.trackingScore}%)`);
      } else {
        console.log(`❌ ${presetName}: FAILED`);
        result.errors.forEach(error => {
          console.log(`   ERROR: ${error}`);
        });
      }

      if (result.warnings.length > 0) {
        result.warnings.forEach(warning => {
          console.log(`   WARNING: ${warning}`);
        });
      }
    } catch (error) {
      console.log(`💥 ${presetName}: ERROR - ${error}`);
      results.push({
        presetName,
        passed: false,
        errors: [`Test execution failed: ${error}`],
        warnings: [],
        trackingScore: 0,
        recommendations: [],
        validationSummary: {
          configurationValid: false,
          trackingProperlyConfigured: false,
          documentationComplete: false,
          pbsCompliant: false
        }
      });
    }
    console.log('');
  }

  const passedPresets = results.filter(r => r.passed).length;
  const failedPresets = results.length - passedPresets;
  const overallScore = Math.round((passedPresets / results.length) * 100);

  let summary: string;
  if (overallScore >= 90) {
    summary = '🎉 Excellent! All presets are well-configured with comprehensive tracking.';
  } else if (overallScore >= 75) {
    summary = '✅ Good preset configuration. Minor improvements recommended.';
  } else if (overallScore >= 50) {
    summary = '⚠️ Preset configuration needs improvement. Several issues found.';
  } else {
    summary = '❌ Critical preset configuration issues. Immediate attention required.';
  }

  return {
    totalPresets: results.length,
    passedPresets,
    failedPresets,
    results,
    overallScore,
    summary,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Generate comprehensive test report
 */
export async function generateTestReport(testSuite: TestSuite, outputPath: string): Promise<void> {
  let report = `# Preset Validation Test Report

**Generated:** ${new Date(testSuite.generatedAt).toLocaleString()}
**Overall Score:** ${testSuite.overallScore}%

## Summary

${testSuite.summary}

- **Total Presets:** ${testSuite.totalPresets}
- **Passed:** ${testSuite.passedPresets}
- **Failed:** ${testSuite.failedPresets}

`;

  // Add detailed results for each preset
  for (const result of testSuite.results) {
    report += `## ${result.presetName.charAt(0).toUpperCase() + result.presetName.slice(1)} Preset

**Status:** ${result.passed ? '✅ PASSED' : '❌ FAILED'}
**Tracking Score:** ${result.trackingScore}%

### Validation Summary
- **Configuration Valid:** ${result.validationSummary.configurationValid ? '✅' : '❌'}
- **Tracking Configured:** ${result.validationSummary.trackingProperlyConfigured ? '✅' : '❌'}
- **Documentation Complete:** ${result.validationSummary.documentationComplete ? '✅' : '❌'}
- **PBS Compliant:** ${result.validationSummary.pbsCompliant ? '✅' : '❌'}

`;

    if (result.errors.length > 0) {
      report += `### ❌ Errors
${result.errors.map(error => `- ${error}`).join('\n')}

`;
    }

    if (result.warnings.length > 0) {
      report += `### ⚠️ Warnings
${result.warnings.map(warning => `- ${warning}`).join('\n')}

`;
    }

    if (result.recommendations.length > 1) { // Skip status message
      report += `### 💡 Recommendations
${result.recommendations.slice(1).map(rec => `- ${rec}`).join('\n')}

`;
    }
  }

  // Add improvement recommendations
  report += `## Improvement Recommendations

### High Priority
`;

  const failedResults = testSuite.results.filter(r => !r.passed);
  if (failedResults.length > 0) {
    report += `- Fix configuration errors in: ${failedResults.map(r => r.presetName).join(', ')}\n`;
  }

  const lowTrackingResults = testSuite.results.filter(r => r.trackingScore < 50);
  if (lowTrackingResults.length > 0) {
    report += `- Improve tracking configuration in: ${lowTrackingResults.map(r => r.presetName).join(', ')}\n`;
  }

  report += `
### Medium Priority
`;

  const warningResults = testSuite.results.filter(r => r.warnings.length > 0);
  if (warningResults.length > 0) {
    report += `- Address configuration warnings in: ${warningResults.map(r => r.presetName).join(', ')}\n`;
  }

  report += `
### Best Practices
- Ensure all starter presets have comprehensive PBS integration
- Include error tracking for production-focused presets
- Maintain consistent MCP server configurations
- Document tracking workflows in preset descriptions

## Next Steps

1. **Fix Critical Issues:** Address all failed presets immediately
2. **Improve Tracking:** Enhance tracking scores for presets below 70%
3. **Update Documentation:** Ensure all presets have complete documentation
4. **Regular Testing:** Run this test suite before any preset modifications

---

*This report was generated automatically by the KareTech Stack preset testing system.*
`;

  await fs.writeFile(outputPath, report, 'utf-8');
}

/**
 * CLI entry point for running preset tests
 */
export async function main(): Promise<void> {
  try {
    const testSuite = await runAllPresetTests();

    console.log('\n📊 Test Summary:');
    console.log(`Overall Score: ${testSuite.overallScore}%`);
    console.log(`Passed: ${testSuite.passedPresets}/${testSuite.totalPresets}`);
    console.log(testSuite.summary);

    // Generate test report
    const reportPath = join(process.cwd(), 'preset-validation-report.md');
    await generateTestReport(testSuite, reportPath);
    console.log(`\n📝 Detailed report generated: ${reportPath}`);

    // Exit with appropriate code
    process.exit(testSuite.failedPresets > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  main();
}