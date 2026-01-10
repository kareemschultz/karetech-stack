/**
 * End-to-End Preset Integration Tests
 * Tests complete preset workflow from selection to project generation
 */

import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { presets } from '../index';
import { generatePresetSystem } from '../../generators/presets';
import { ProjectConfig } from '../../types';

describe('Preset Integration Tests', () => {
  let tempDir: string;

  beforeEach(async () => {
    // Create temporary directory for test projects
    tempDir = join(tmpdir(), `karetech-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
  });

  afterEach(async () => {
    // Clean up temporary directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Preset Documentation Generation', () => {
    test('should generate preset documentation for full PBS level', async () => {
      const config = {
        ...presets.saas,
        projectName: 'test-saas-app',
        description: 'Test SaaS application',
        author: 'Test Author',
        preset: 'saas',
        pbsLevel: 'full'
      } as ProjectConfig;

      await generatePresetSystem(tempDir, config);

      // Check if preset documentation was generated
      const docsDir = join(tempDir, 'docs', 'presets');
      const docsExist = await fs.access(docsDir).then(() => true).catch(() => false);
      expect(docsExist).toBe(true);

      // Check individual preset files
      const presetNames = Object.keys(presets);
      for (const presetName of presetNames) {
        const presetDocPath = join(docsDir, `${presetName}.md`);
        const presetDocExists = await fs.access(presetDocPath).then(() => true).catch(() => false);
        expect(presetDocExists).toBe(true);

        if (presetDocExists) {
          const content = await fs.readFile(presetDocPath, 'utf-8');
          expect(content).toContain(`# ${presetName.charAt(0).toUpperCase() + presetName.slice(1)} Preset`);
          expect(content).toContain('## Configuration');
          expect(content).toContain('## Validation Results');
        }
      }

      // Check comparison table
      const comparisonPath = join(docsDir, 'comparison.md');
      const comparisonExists = await fs.access(comparisonPath).then(() => true).catch(() => false);
      expect(comparisonExists).toBe(true);

      if (comparisonExists) {
        const comparisonContent = await fs.readFile(comparisonPath, 'utf-8');
        expect(comparisonContent).toContain('# Preset Comparison');
        expect(comparisonContent).toContain('| Feature |');
        expect(comparisonContent).toContain('## Quick Selection Guide');
      }

      // Check validation report
      const validationPath = join(docsDir, 'validation.md');
      const validationExists = await fs.access(validationPath).then(() => true).catch(() => false);
      expect(validationExists).toBe(true);

      if (validationExists) {
        const validationContent = await fs.readFile(validationPath, 'utf-8');
        expect(validationContent).toContain('# Preset Validation Report');
        expect(validationContent).toContain('## Summary');
      }
    });

    test('should not generate preset documentation for none PBS level', async () => {
      const config = {
        ...presets.minimal,
        projectName: 'test-minimal-app',
        description: 'Test minimal application',
        author: 'Test Author',
        preset: 'minimal',
        pbsLevel: 'none'
      } as ProjectConfig;

      await generatePresetSystem(tempDir, config);

      // Check that preset documentation was NOT generated
      const docsDir = join(tempDir, 'docs', 'presets');
      const docsExist = await fs.access(docsDir).then(() => true).catch(() => false);
      expect(docsExist).toBe(false);
    });
  });

  describe('IDE Support Generation', () => {
    test('should generate preset schema for IDE support', async () => {
      const config = {
        ...presets.saas,
        projectName: 'test-app',
        description: 'Test application',
        author: 'Test Author',
        preset: 'saas'
      } as ProjectConfig;

      await generatePresetSystem(tempDir, config);

      // Check if IDE schema was generated
      const schemaPath = join(tempDir, '.vscode', 'preset-schema.json');
      const schemaExists = await fs.access(schemaPath).then(() => true).catch(() => false);
      expect(schemaExists).toBe(true);

      if (schemaExists) {
        const schemaContent = await fs.readFile(schemaPath, 'utf-8');
        const schema = JSON.parse(schemaContent);
        expect(schema).toHaveProperty('$schema');
        expect(schema).toHaveProperty('title');
        expect(schema.title).toContain('KareTech Stack Preset');
        expect(schema).toHaveProperty('properties');
      }
    });
  });

  describe('Preset Validation Integration', () => {
    test('should successfully apply and validate saas preset', async () => {
      const config = {
        ...presets.saas,
        projectName: 'test-saas',
        description: 'Test SaaS app',
        author: 'Test Author',
        preset: 'saas'
      } as ProjectConfig;

      // This should not throw any errors
      expect(async () => {
        await generatePresetSystem(tempDir, config);
      }).not.toThrow();
    });

    test('should detect and handle preset validation errors', async () => {
      const invalidConfig: ProjectConfig = {
        projectName: 'test-invalid',
        description: 'Test invalid app',
        author: 'Test Author',
        preset: 'saas',
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
        pbsLevel: 'full',    // Full PBS level
        beadsIntegration: false, // But no beads integration (invalid)
        claudeCodeHooks: false,  // And no Claude Code hooks (invalid)
        mcpServers: [],          // And no MCP servers (invalid)
        pwa: false,
        analytics: 'none',
        email: 'none',
        errorTracking: 'none',
        featureFlags: false
      } as ProjectConfig;

      // This should throw a validation error
      await expect(generatePresetSystem(tempDir, invalidConfig)).rejects.toThrow('Preset validation failed');
    });
  });

  describe('All Presets E2E Test', () => {
    test('should successfully generate projects for all presets', async () => {
      const presetNames = Object.keys(presets);

      for (const presetName of presetNames) {
        const presetConfig = presets[presetName];
        const config = {
          ...presetConfig,
          projectName: `test-${presetName}`,
          description: `Test ${presetName} application`,
          author: 'Test Author',
          preset: presetName
        } as ProjectConfig;

        // Create subdirectory for this preset test
        const presetTempDir = join(tempDir, presetName);
        await fs.mkdir(presetTempDir, { recursive: true });

        // This should not throw any errors for any valid preset
        expect(async () => {
          await generatePresetSystem(presetTempDir, config);
        }).not.toThrow();
      }
    });
  });

  describe('Tracking Configuration Integration', () => {
    test('should properly configure tracking for full PBS presets', async () => {
      const fullPbsPresets = Object.entries(presets).filter(([, preset]) => preset.pbsLevel === 'full');

      for (const [presetName, presetConfig] of fullPbsPresets) {
        const config = {
          ...presetConfig,
          projectName: `test-${presetName}-tracking`,
          description: `Test ${presetName} tracking`,
          author: 'Test Author',
          preset: presetName
        } as ProjectConfig;

        const presetTempDir = join(tempDir, `${presetName}-tracking`);
        await fs.mkdir(presetTempDir, { recursive: true });

        await generatePresetSystem(presetTempDir, config);

        // Verify tracking documentation was generated
        if (['full', 'docs'].includes(config.pbsLevel)) {
          const docsDir = join(presetTempDir, 'docs', 'presets');
          const docsExist = await fs.access(docsDir).then(() => true).catch(() => false);
          expect(docsExist).toBe(true);
        }

        // Verify IDE schema was generated
        const schemaPath = join(presetTempDir, '.vscode', 'preset-schema.json');
        const schemaExists = await fs.access(schemaPath).then(() => true).catch(() => false);
        expect(schemaExists).toBe(true);
      }
    });

    test('should handle minimal tracking setup gracefully', async () => {
      const minimalPresets = Object.entries(presets).filter(([, preset]) => preset.pbsLevel === 'none');

      for (const [presetName, presetConfig] of minimalPresets) {
        const config = {
          ...presetConfig,
          projectName: `test-${presetName}-minimal`,
          description: `Test ${presetName} minimal`,
          author: 'Test Author',
          preset: presetName
        } as ProjectConfig;

        const presetTempDir = join(tempDir, `${presetName}-minimal`);
        await fs.mkdir(presetTempDir, { recursive: true });

        // Should not throw even with minimal tracking
        expect(async () => {
          await generatePresetSystem(presetTempDir, config);
        }).not.toThrow();

        // Should still generate IDE schema even for minimal setup
        const schemaPath = join(presetTempDir, '.vscode', 'preset-schema.json');
        const schemaExists = await fs.access(schemaPath).then(() => true).catch(() => false);
        expect(schemaExists).toBe(true);
      }
    });
  });

  describe('Documentation Quality Validation', () => {
    test('should generate high-quality preset documentation', async () => {
      const config = {
        ...presets.saas,
        projectName: 'test-docs-quality',
        description: 'Test documentation quality',
        author: 'Test Author',
        preset: 'saas',
        pbsLevel: 'full'
      } as ProjectConfig;

      await generatePresetSystem(tempDir, config);

      // Check documentation quality
      const saasDocPath = join(tempDir, 'docs', 'presets', 'saas.md');
      const saasDocContent = await fs.readFile(saasDocPath, 'utf-8');

      // Should have proper structure
      expect(saasDocContent).toContain('# Saas Preset');
      expect(saasDocContent).toContain('## Description');
      expect(saasDocContent).toContain('## Configuration');
      expect(saasDocContent).toContain('### Core Stack');
      expect(saasDocContent).toContain('### Design');
      expect(saasDocContent).toContain('### Testing');
      expect(saasDocContent).toContain('### DevOps');
      expect(saasDocContent).toContain('### AI Workflow');
      expect(saasDocContent).toContain('### Extras');
      expect(saasDocContent).toContain('## Validation Results');
      expect(saasDocContent).toContain('## Usage');

      // Should have correct preset information
      expect(saasDocContent).toContain('**Database:** postgresql');
      expect(saasDocContent).toContain('**PBS Level:** full');
      expect(saasDocContent).toContain('**Beads Integration:** Yes');
      expect(saasDocContent).toContain('**Docker:** Yes');

      // Should have usage instructions
      expect(saasDocContent).toContain('bunx create-karetech-stack my-app --preset saas');
    });

    test('should generate comprehensive comparison table', async () => {
      const config = {
        ...presets.saas,
        projectName: 'test-comparison',
        description: 'Test comparison generation',
        author: 'Test Author',
        preset: 'saas',
        pbsLevel: 'docs'
      } as ProjectConfig;

      await generatePresetSystem(tempDir, config);

      const comparisonPath = join(tempDir, 'docs', 'presets', 'comparison.md');
      const comparisonContent = await fs.readFile(comparisonPath, 'utf-8');

      // Should include all presets in comparison
      const presetNames = Object.keys(presets);
      presetNames.forEach(presetName => {
        expect(comparisonContent).toContain(presetName);
      });

      // Should have comprehensive feature comparison
      expect(comparisonContent).toContain('| **Category** |');
      expect(comparisonContent).toContain('| **Database** |');
      expect(comparisonContent).toContain('| **Auth** |');
      expect(comparisonContent).toContain('| **PBS Level** |');

      // Should have selection guides
      expect(comparisonContent).toContain('## Quick Selection Guide');
      expect(comparisonContent).toContain('### For SaaS Applications');
      expect(comparisonContent).toContain('### For Development Tools');
    });
  });
});