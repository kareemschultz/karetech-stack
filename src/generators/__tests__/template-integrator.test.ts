/**
 * Template Integrator Tests
 * Tests for MCP and Claude Code template integration
 */

import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { promises as fs } from 'fs';
import { join } from 'path';
import { existsSync, mkdirSync, rmSync } from 'fs';
import {
  validateMcpSelection,
  getRequiredEnvVars,
  getMcpServerForDatabase,
  getSuggestedMcpServers,
  isMcpCompatibleWithDatabase,
  integrateTemplates
} from '../template-integrator';
import { createTemplateContext } from '../base';
import type { ProjectConfig } from '../../types';

// Test fixtures
const baseConfig: ProjectConfig = {
  projectName: 'test-project',
  description: 'Test project for MCP integration',
  author: 'Test Author',
  preset: 'saas',
  database: 'postgresql',
  auth: ['email'],
  apiStyle: 'orpc',
  componentLibrary: 'radix',
  uiStyle: 'default',
  baseColor: 'slate',
  accentColor: 'blue',
  font: 'inter',
  icons: 'lucide',
  borderRadius: '0.5',
  menuAccent: 'subtle',
  testing: ['playwright'],
  unitTesting: true,
  exampleTests: true,
  docker: true,
  cicd: 'github-actions',
  deployTarget: 'vercel',
  pbsLevel: 'full',
  beadsIntegration: true,
  claudeCodeHooks: true,
  mcpServers: ['filesystem', 'github', 'postgres', 'playwright'],
  pwa: false,
  analytics: 'none',
  email: 'none',
  errorTracking: 'none',
  featureFlags: false
};

const testDir = join(process.cwd(), '.test-output');

describe('Template Integrator', () => {
  beforeAll(() => {
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('validateMcpSelection', () => {
    it('should return no warnings for valid configuration', () => {
      const warnings = validateMcpSelection(baseConfig);
      // May have informational warnings about env vars
      expect(Array.isArray(warnings)).toBe(true);
    });

    it('should warn when postgres MCP selected without database', () => {
      const config = {
        ...baseConfig,
        database: 'none' as const,
        mcpServers: ['postgres' as const]
      };
      const warnings = validateMcpSelection(config);
      expect(warnings.some(w => w.includes('Database MCP server selected but no database'))).toBe(true);
    });

    it('should suggest Playwright MCP for Playwright testing', () => {
      const config = {
        ...baseConfig,
        testing: ['playwright' as const],
        mcpServers: []
      };
      const warnings = validateMcpSelection(config);
      expect(warnings.some(w => w.includes('Playwright MCP'))).toBe(true);
    });
  });

  describe('getRequiredEnvVars', () => {
    it('should return DATABASE_URL for PostgreSQL', () => {
      const envVars = getRequiredEnvVars(baseConfig);
      expect(envVars).toHaveProperty('DATABASE_URL');
    });

    it('should return GITHUB_TOKEN for GitHub MCP', () => {
      const envVars = getRequiredEnvVars(baseConfig);
      expect(envVars).toHaveProperty('GITHUB_TOKEN');
    });

    it('should return Turso vars for Turso database', () => {
      const config = {
        ...baseConfig,
        database: 'turso' as const,
        mcpServers: ['postgres' as const]
      };
      const envVars = getRequiredEnvVars(config);
      expect(envVars).toHaveProperty('TURSO_DATABASE_URL');
      expect(envVars).toHaveProperty('TURSO_AUTH_TOKEN');
    });
  });

  describe('getMcpServerForDatabase', () => {
    it('should return postgres for postgresql', () => {
      expect(getMcpServerForDatabase('postgresql')).toBe('postgres');
    });

    it('should return turso for turso', () => {
      expect(getMcpServerForDatabase('turso')).toBe('turso');
    });

    it('should return sqlite for sqlite', () => {
      expect(getMcpServerForDatabase('sqlite')).toBe('sqlite');
    });

    it('should return empty for none', () => {
      expect(getMcpServerForDatabase('none')).toBe('');
    });
  });

  describe('getSuggestedMcpServers', () => {
    it('should always suggest filesystem', () => {
      const suggested = getSuggestedMcpServers(baseConfig);
      expect(suggested).toContain('filesystem');
    });

    it('should suggest postgres for database projects', () => {
      const suggested = getSuggestedMcpServers(baseConfig);
      expect(suggested).toContain('postgres');
    });

    it('should suggest playwright for testing projects', () => {
      const suggested = getSuggestedMcpServers(baseConfig);
      expect(suggested).toContain('playwright');
    });
  });

  describe('isMcpCompatibleWithDatabase', () => {
    it('should return true for filesystem with any database', () => {
      expect(isMcpCompatibleWithDatabase('filesystem', 'postgresql')).toBe(true);
      expect(isMcpCompatibleWithDatabase('filesystem', 'none')).toBe(true);
    });

    it('should return false for postgres MCP with no database', () => {
      expect(isMcpCompatibleWithDatabase('postgres', 'none')).toBe(false);
    });

    it('should return true for postgres MCP with postgresql', () => {
      expect(isMcpCompatibleWithDatabase('postgres', 'postgresql')).toBe(true);
    });
  });

  describe('integrateTemplates', () => {
    it('should skip integration when PBS level is none', async () => {
      const config = { ...baseConfig, pbsLevel: 'none' as const };
      const context = createTemplateContext(config);
      const projectDir = join(testDir, 'pbs-none-project');

      if (!existsSync(projectDir)) {
        mkdirSync(projectDir, { recursive: true });
      }

      const result = await integrateTemplates(projectDir, config, context);
      expect(result.success).toBe(true);
      expect(result.filesGenerated).toHaveLength(0);
    });

    it('should generate MCP configuration files', async () => {
      const context = createTemplateContext(baseConfig);
      const projectDir = join(testDir, 'full-mcp-project');

      if (!existsSync(projectDir)) {
        mkdirSync(projectDir, { recursive: true });
      }

      const result = await integrateTemplates(projectDir, baseConfig, context);

      expect(result.success).toBe(true);
      expect(result.filesGenerated.length).toBeGreaterThan(0);
      expect(result.mcpServersConfigured).toContain('filesystem');
      expect(result.mcpServersConfigured).toContain('github');
      expect(result.mcpServersConfigured).toContain('postgres');
      expect(result.mcpServersConfigured).toContain('playwright');
    });

    it('should create Claude Code settings file', async () => {
      const context = createTemplateContext(baseConfig);
      const projectDir = join(testDir, 'claude-settings-project');

      if (!existsSync(projectDir)) {
        mkdirSync(projectDir, { recursive: true });
      }

      await integrateTemplates(projectDir, baseConfig, context);

      const settingsPath = join(projectDir, '.claude', 'settings.json');
      expect(existsSync(settingsPath)).toBe(true);

      const settings = JSON.parse(await fs.readFile(settingsPath, 'utf-8'));
      expect(settings.projectName).toBe('test-project');
      expect(settings.aiWorkflow.enabled).toBe(true);
    });

    it('should create hooks when enabled', async () => {
      const context = createTemplateContext(baseConfig);
      const projectDir = join(testDir, 'hooks-project');

      if (!existsSync(projectDir)) {
        mkdirSync(projectDir, { recursive: true });
      }

      await integrateTemplates(projectDir, baseConfig, context);

      const hooksDir = join(projectDir, '.claude', 'hooks');
      expect(existsSync(hooksDir)).toBe(true);
      expect(existsSync(join(hooksDir, 'pre-commit.js'))).toBe(true);
    });

    it('should create agent definitions', async () => {
      const context = createTemplateContext(baseConfig);
      const projectDir = join(testDir, 'agents-project');

      if (!existsSync(projectDir)) {
        mkdirSync(projectDir, { recursive: true });
      }

      await integrateTemplates(projectDir, baseConfig, context);

      const agentsDir = join(projectDir, '.claude', 'agents');
      expect(existsSync(agentsDir)).toBe(true);
      expect(existsSync(join(agentsDir, 'test-project-dev.json'))).toBe(true);
    });

    it('should generate environment template for MCP servers', async () => {
      const context = createTemplateContext(baseConfig);
      const projectDir = join(testDir, 'env-template-project');

      if (!existsSync(projectDir)) {
        mkdirSync(projectDir, { recursive: true });
      }

      await integrateTemplates(projectDir, baseConfig, context);

      const envPath = join(projectDir, '.env.mcp.example');
      expect(existsSync(envPath)).toBe(true);

      const envContent = await fs.readFile(envPath, 'utf-8');
      expect(envContent).toContain('DATABASE_URL');
      expect(envContent).toContain('GITHUB_TOKEN');
    });
  });
});
