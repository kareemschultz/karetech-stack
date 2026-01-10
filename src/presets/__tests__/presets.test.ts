/**
 * Comprehensive Preset Validation Tests
 * Tests all presets for consistency, validation, and tracking compliance
 */

import { describe, test, expect } from 'bun:test';
import { presets, getPreset, getPresetNames, validatePresetName, applyPresetToConfig, listPresets } from '../index';
import { validatePreset, validatePresetTracking, validatePbsIntegration, validateTrackingConfiguration, generateTrackingRecommendations } from '../../validation/presets';
import { ProjectConfig } from '../../types';

describe('Preset System', () => {
  describe('Preset Registry', () => {
    test('should have all expected presets', () => {
      const presetNames = getPresetNames();
      expect(presetNames).toContain('saas');
      expect(presetNames).toContain('ecommerce');
      expect(presetNames).toContain('blog');
      expect(presetNames).toContain('devtool');
      expect(presetNames).toContain('portfolio');
      expect(presetNames).toContain('minimal');
      expect(presetNames).toHaveLength(6);
    });

    test('should retrieve presets correctly', () => {
      const saasPreset = getPreset('saas');
      expect(saasPreset).toBeDefined();
      expect(saasPreset?.name).toBe('saas');
      expect(saasPreset?.category).toBe('starter');
    });

    test('should validate preset names correctly', () => {
      expect(validatePresetName('saas')).toBe(true);
      expect(validatePresetName('invalid-preset')).toBe(false);
    });

    test('should list presets with proper structure', () => {
      const presetList = listPresets();
      expect(presetList).toHaveLength(6);
      presetList.forEach(preset => {
        expect(preset).toHaveProperty('name');
        expect(preset).toHaveProperty('description');
        expect(preset).toHaveProperty('category');
      });
    });
  });

  describe('Preset Configuration Validation', () => {
    test('all presets should have valid configurations', () => {
      Object.entries(presets).forEach(([name, preset]) => {
        const errors = validatePreset(preset);
        const criticalErrors = errors.filter(e => e.severity === 'error');

        if (criticalErrors.length > 0) {
          throw new Error(`Preset ${name} has critical errors: ${criticalErrors.map(e => e.message).join(', ')}`);
        }
        expect(criticalErrors).toHaveLength(0);
      });
    });

    test('saas preset should have comprehensive configuration', () => {
      const saasPreset = presets.saas;
      expect(saasPreset.database).toBe('postgresql');
      expect(saasPreset.pbsLevel).toBe('full');
      expect(saasPreset.beadsIntegration).toBe(true);
      expect(saasPreset.claudeCodeHooks).toBe(true);
      expect(saasPreset.docker).toBe(true);
      expect(saasPreset.errorTracking).toBe('sentry');
    });

    test('minimal preset should have minimal configuration', () => {
      const minimalPreset = presets.minimal;
      expect(minimalPreset.database).toBe('sqlite');
      expect(minimalPreset.pbsLevel).toBe('none');
      expect(minimalPreset.beadsIntegration).toBe(false);
      expect(minimalPreset.claudeCodeHooks).toBe(false);
      expect(minimalPreset.docker).toBe(false);
    });

    test('preset categories should be correctly assigned', () => {
      expect(presets.saas.category).toBe('starter');
      expect(presets.ecommerce.category).toBe('specialized');
      expect(presets.blog.category).toBe('specialized');
      expect(presets.devtool.category).toBe('specialized');
      expect(presets.portfolio.category).toBe('minimal');
      expect(presets.minimal.category).toBe('minimal');
    });
  });

  describe('PBS and Tracking Validation', () => {
    test('full PBS presets should have proper tracking setup', () => {
      const fullPbsPresets = Object.values(presets).filter(p => p.pbsLevel === 'full');

      fullPbsPresets.forEach(preset => {
        if (!preset.beadsIntegration) {
          throw new Error(`Preset ${preset.name} has full PBS but no beads integration`);
        }
        expect(preset.beadsIntegration).toBe(true);

        if (!preset.claudeCodeHooks) {
          throw new Error(`Preset ${preset.name} has full PBS but no Claude Code hooks`);
        }
        expect(preset.claudeCodeHooks).toBe(true);

        if (!preset.mcpServers?.includes('filesystem')) {
          throw new Error(`Preset ${preset.name} has full PBS but no filesystem MCP server`);
        }
        expect(preset.mcpServers).toContain('filesystem');
      });
    });

    test('beads integration presets should have compatible PBS level', () => {
      const beadsPresets = Object.values(presets).filter(p => p.beadsIntegration);

      beadsPresets.forEach(preset => {
        if (preset.pbsLevel === 'none') {
          throw new Error(`Preset ${preset.name} has beads integration but PBS level is none`);
        }
        expect(preset.pbsLevel).not.toBe('none');
      });
    });

    test('production presets should have error tracking', () => {
      const productionPresets = ['saas', 'ecommerce'];

      productionPresets.forEach(presetName => {
        const preset = presets[presetName];
        if (preset.errorTracking === 'none') {
          throw new Error(`Production preset ${presetName} should have error tracking`);
        }
        expect(preset.errorTracking).not.toBe('none');
      });
    });

    test('tracking configuration should be properly scored', () => {
      const saasConfig = presets.saas as ProjectConfig;
      const tracking = validateTrackingConfiguration(saasConfig);

      expect(tracking.beadsConfig).toBe(true);
      expect(tracking.claudeCodeConfig).toBe(true);
      expect(tracking.documentationConfig).toBe(true);
      expect(tracking.overallScore).toBeGreaterThan(80);
    });
  });

  describe('Preset Application', () => {
    test('should apply preset to configuration correctly', () => {
      const userConfig = {
        projectName: 'my-app',
        description: 'Test app',
        author: 'Test Author'
      };

      const configWithPreset = applyPresetToConfig(userConfig, 'saas');

      expect(configWithPreset.preset).toBe('saas');
      expect(configWithPreset.database).toBe('postgresql');
      expect(configWithPreset.projectName).toBe('my-app'); // User config preserved
    });

    test('should preserve user configuration over preset', () => {
      const userConfig = {
        projectName: 'my-app',
        database: 'sqlite' as const,
        auth: ['github' as const]
      };

      const configWithPreset = applyPresetToConfig(userConfig, 'saas');

      expect(configWithPreset.database).toBe('sqlite'); // User choice preserved
      expect(configWithPreset.auth).toEqual(['github']); // User choice preserved
    });

    test('should throw error for invalid preset', () => {
      const userConfig = { projectName: 'test' };

      expect(() => {
        applyPresetToConfig(userConfig, 'invalid-preset');
      }).toThrow('Invalid preset: invalid-preset');
    });
  });

  describe('Tracking Recommendations', () => {
    test('should generate appropriate recommendations for minimal setup', () => {
      const minimalConfig = {
        ...presets.minimal,
        projectName: 'test-minimal',
        description: 'Test minimal app',
        author: 'Test Author'
      } as ProjectConfig;

      const recommendations = generateTrackingRecommendations(minimalConfig);

      expect(recommendations).toContain('🔄 Enable Beads integration for issue tracking and project management');
      expect(recommendations).toContain('🤖 Set up Claude Code hooks for AI-assisted development workflow');
    });

    test('should generate fewer recommendations for well-configured presets', () => {
      const saasConfig = {
        ...presets.saas,
        projectName: 'test-saas',
        description: 'Test SaaS app',
        author: 'Test Author'
      } as ProjectConfig;

      const recommendations = generateTrackingRecommendations(saasConfig);

      expect(recommendations[0]).toContain('Excellent tracking configuration');
    });
  });

  describe('PBS Integration Validation', () => {
    test('should validate PBS integration requirements', () => {
      const configWithFullPbs: ProjectConfig = {
        projectName: 'test-app',
        description: 'Test app',
        author: 'Test',
        database: 'postgresql',
        auth: ['email'],
        apiStyle: 'orpc',
        uiStyle: 'default',
        baseColor: 'slate',
        accentColor: 'blue',
        font: 'inter',
        icons: 'lucide',
        borderRadius: '0.5',
        testing: [],
        unitTesting: false,
        exampleTests: false,
        docker: false,
        cicd: 'none',
        deployTarget: 'vercel',
        pbsLevel: 'full',
        beadsIntegration: false, // This should cause an error
        claudeCodeHooks: false,  // This should cause an error
        mcpServers: [],          // This should cause an error
        pwa: false,
        analytics: 'none',
        email: 'none',
        errorTracking: 'none',
        featureFlags: false
      };

      const pbsErrors = validatePbsIntegration(configWithFullPbs);
      const errors = pbsErrors.filter(e => e.severity === 'error');

      expect(errors).toHaveLength(3); // beads, claude-code, mcp-servers
      expect(errors.some(e => e.field === 'beadsIntegration')).toBe(true);
      expect(errors.some(e => e.field === 'claudeCodeHooks')).toBe(true);
      expect(errors.some(e => e.field === 'mcpServers')).toBe(true);
    });
  });

  describe('Preset Tracking Validation', () => {
    test('should validate starter presets have proper tracking', () => {
      const starterPresets = Object.values(presets).filter(p => p.category === 'starter');

      starterPresets.forEach(preset => {
        const trackingErrors = validatePresetTracking(preset);
        // Starter presets should either have beads integration or get warnings
        if (!preset.beadsIntegration) {
          expect(trackingErrors.some(e => e.field === 'beadsIntegration')).toBe(true);
        }
      });
    });

    test('should validate database-specific tracking recommendations', () => {
      const postgresPresets = Object.values(presets).filter(p => p.database === 'postgresql');

      postgresPresets.forEach(preset => {
        const trackingErrors = validatePresetTracking(preset);
        // Should recommend postgres MCP server if not included
        if (!preset.mcpServers?.includes('postgres')) {
          expect(trackingErrors.some(e =>
            e.component === 'tracking' && e.field === 'mcpServers'
          )).toBe(true);
        }
      });
    });
  });
});