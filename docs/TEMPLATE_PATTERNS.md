# Template Enhancement Patterns

> **Guide for creating and extending templates in the KareTech Stack CLI**
> This document defines patterns, conventions, and best practices for template development.

---

## Table of Contents

1. [Template Architecture](#template-architecture)
2. [EJS Template Patterns](#ejs-template-patterns)
3. [Directory Structure Conventions](#directory-structure-conventions)
4. [Template Context Variables](#template-context-variables)
5. [Generator Integration](#generator-integration)
6. [MCP Template Patterns](#mcp-template-patterns)
7. [Theme Template Patterns](#theme-template-patterns)
8. [Testing Templates](#testing-templates)
9. [Migration Guide](#migration-guide)

---

## Template Architecture

### Overview

The template system uses EJS (Embedded JavaScript) for dynamic content generation. Templates are processed during project scaffolding, with context variables injected from user configuration.

```
templates/
├── base/                    # Core application scaffold
├── themes/                  # UI theme variations
│   ├── maia/               # Soft, rounded design
│   ├── nova/               # Bold, modern design
│   ├── lyra/               # Editorial, refined design
│   ├── mira/               # Minimal, focused design
│   ├── vega/               # Classic, timeless design
│   └── default/            # Standard shadcn/ui
├── database/               # Database-specific configs
│   ├── postgresql/
│   ├── turso/
│   └── sqlite/
├── auth/                   # Authentication templates
├── testing/                # Testing framework configs
│   ├── playwright/
│   ├── vitest/
│   └── puppeteer/
├── devops/                 # Docker/CI configurations
├── mcp/                    # MCP server configurations
│   ├── servers/            # Individual server configs
│   └── hooks/              # MCP hooks
└── pbs/                    # PBS documentation templates
```

### Processing Pipeline

1. **User Configuration** → Wizard collects project options
2. **Context Creation** → `createTemplateContext()` builds context object
3. **Template Processing** → EJS renders templates with context
4. **File Generation** → Output files written to project directory
5. **Post-Processing** → Scripts execution, dependency installation

---

## EJS Template Patterns

### Basic Conditionals

```ejs
<% if (database === 'postgresql') { %>
// PostgreSQL-specific code
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
<% } else if (database === 'turso') { %>
// Turso-specific code
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
<% } %>
```

### Array Iteration

```ejs
// Auth providers
<% auth.forEach(function(provider) { %>
import { <%= provider %>Provider } from './auth/<%= provider %>';
<% }); %>

// Export array
export const providers = [<%= auth.map(p => `${p}Provider`).join(', ') %>];
```

### Nested Conditionals with Fallbacks

```ejs
--primary: <%= accentColor === 'blue' ? '221.2 83.2% 53.3%' :
             accentColor === 'green' ? '142.1 76.2% 36.3%' :
             accentColor === 'purple' ? '262.1 83.3% 57.8%' :
             '221.2 83.2% 53.3%' %>;
```

### Safe Property Access

```ejs
<% if (mcpServers && mcpServers.includes('github')) { %>
// GitHub MCP server configuration
<% } %>
```

### Template Comments (Not Output)

```ejs
<%# This comment won't appear in the output %>
```

### Multi-line String Generation

```ejs
const config = {
  projectName: '<%= projectName %>',
  features: [
<% testing.forEach(function(t, i) { %>
    '<%= t %>'<%= i < testing.length - 1 ? ',' : '' %>
<% }); %>
  ]
};
```

---

## Directory Structure Conventions

### Template File Naming

| Pattern | Description | Example |
|---------|-------------|---------|
| `*.ejs` | EJS template files | `package.json.ejs` |
| `*.ts.ejs` | TypeScript templates | `config.ts.ejs` |
| `*.json.ejs` | JSON templates | `settings.json.ejs` |
| No `.ejs` | Static files | `.gitignore` |

### Directory Structure

```
templates/{category}/{variant}/
├── src/                    # Source code templates
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   └── routes/             # Page routes
├── *.config.ts.ejs         # Configuration files
└── README.md.ejs           # Documentation
```

### File Extension Handling

- `.ejs` extension is **stripped** during processing
- `package.json.ejs` → `package.json`
- `src/index.ts.ejs` → `src/index.ts`

---

## Template Context Variables

### Core Variables

```typescript
interface TemplateContext {
  // Project Info
  projectName: string;
  description: string;
  author: string;
  preset?: string;

  // Stack Configuration
  database: 'postgresql' | 'turso' | 'sqlite' | 'none';
  auth: AuthProvider[];
  apiStyle: 'orpc' | 'trpc' | 'rest';

  // UI Configuration
  componentLibrary: 'radix' | 'base-ui';
  uiStyle: 'vega' | 'nova' | 'maia' | 'lyra' | 'mira' | 'default';
  baseColor: 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';
  accentColor: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'violet';
  font: 'inter' | 'geist' | 'crimson' | 'mono' | 'figtree';
  icons: 'lucide' | 'heroicons' | 'phosphor' | 'hugeicons';
  borderRadius: string;
  menuAccent: 'bold' | 'subtle';

  // Testing
  testing: TestingFramework[];
  unitTesting: boolean;
  exampleTests: boolean;

  // DevOps
  docker: boolean;
  cicd: 'github-actions' | 'vercel' | 'none';
  deployTarget: 'vercel' | 'netlify' | 'docker' | 'manual';

  // AI Workflow
  pbsLevel: 'full' | 'docs' | 'minimal' | 'none';
  beadsIntegration: boolean;
  claudeCodeHooks: boolean;
  mcpServers: McpServer[];

  // Extras
  pwa: boolean;
  analytics: 'vercel' | 'google' | 'umami' | 'none';
  email: 'resend' | 'sendgrid' | 'nodemailer' | 'none';
  errorTracking: 'sentry' | 'bugsnag' | 'rollbar' | 'none';
  featureFlags: boolean;

  // Generated (by createTemplateContext)
  generatedAt: string;
  cliVersion: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}
```

### Using Variables in Templates

```ejs
// Always safe to use directly
<%= projectName %>
<%= description %>
<%= cliVersion %>

// Check array before iteration
<% if (auth.length > 0) { %>
<% auth.forEach(function(provider) { %>
  // Use provider
<% }); %>
<% } %>

// Check object properties
<% if (mcpServers && mcpServers.includes('github')) { %>
  // GitHub MCP config
<% } %>
```

---

## Generator Integration

### Adding a New Template Category

1. **Create template directory:**
```bash
mkdir -p templates/{category}/{variant}
```

2. **Add generator file:**
```typescript
// src/generators/{category}.ts
import { ProjectConfig, TemplateContext } from '../types';

export async function generate{Category}(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  // Template processing logic
}
```

3. **Register in main generator:**
```typescript
// src/index.ts
import { generate{Category} } from './generators/{category}';

// In generation pipeline:
await generate{Category}(projectDir, config);
```

### Template Processing Functions

```typescript
// Process single template
await processTemplate(templatePath, outputPath, context);

// Process entire directory
await copyTemplateDirectory(templateDir, outputDir, context);
```

---

## MCP Template Patterns

### Server Configuration Template

```json
// templates/mcp/servers/{server}.json.ejs
{
  "name": "{server}",
  "displayName": "{Server} Server",
  "package": "@modelcontextprotocol/server-{server}",

  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-{server}"],
  "env": {
    "REQUIRED_VAR": "${REQUIRED_VAR}"
  },

  "capabilities": [...],
  "autoApprove": [...],
  "requiresApproval": [...]
}
```

### Settings Integration

```json
// templates/mcp/settings.json.ejs
{
  "mcpServers": {
<% if (mcpServers && mcpServers.includes('github')) { %>
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
<% } %>
  }
}
```

### Adding a New MCP Server

1. **Create server config:**
```bash
touch templates/mcp/servers/{newserver}.json.ejs
```

2. **Update settings template:**
```ejs
<% if (mcpServers && mcpServers.includes('{newserver}')) { %>
    "{newserver}": {
      "command": "...",
      "args": [...]
    }
<% } %>
```

3. **Add to types:**
```typescript
// src/types/index.ts
export type McpServer = 'filesystem' | 'github' | 'postgres' | 'playwright' | '{newserver}';
```

4. **Update .env.example:**
```ejs
<% if (mcpServers.includes('{newserver}')) { %>
# {Newserver} MCP Server
{NEWSERVER}_API_KEY=your-api-key
<% } %>
```

---

## Theme Template Patterns

### Theme Structure

```
templates/themes/{theme}/
├── components.json.ejs     # shadcn/ui configuration
└── src/
    └── index.css.ejs       # CSS variables and styles
```

### CSS Variable Pattern

```css
:root {
  /* Use conditional expressions for dynamic values */
  --primary: <%= accentColor === 'blue' ? '221.2 83.2% 53.3%' :
               accentColor === 'green' ? '142.1 76.2% 36.3%' :
               '221.2 83.2% 53.3%' %>;

  /* Handle base color variations */
  --muted: <%= baseColor === 'slate' ? '210 40% 96.1%' :
             baseColor === 'zinc' ? '240 4.8% 95.9%' :
             '0 0% 96.1%' %>;
}
```

### Component Library Styles

```css
<% if (componentLibrary === 'base-ui') { %>
/* Base UI enhancements */
@layer components {
  [data-ui="Button"] {
    @apply rounded-xl transition-all;
  }
}
<% } %>
```

### Theme Characteristics

| Theme | Border Radius | Style | Best For |
|-------|---------------|-------|----------|
| Maia | 0.75rem | Soft, rounded | Consumer apps, friendly UX |
| Nova | 0.25rem | Sharp, bold | Marketing, bold statements |
| Lyra | 0.375rem | Editorial | Content sites, publishing |
| Mira | 0rem | Minimal | Developer tools, clean UI |
| Vega | 0.5rem | Classic | Enterprise, timeless design |

---

## Testing Templates

### Playwright Configuration Pattern

```typescript
// templates/testing/playwright/playwright.config.ts.ejs
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
<% if (auth.length > 0) { %>
    // Auth state storage
    storageState: 'tests/.auth/user.json',
<% } %>
  },
<% if (testing.includes('playwright')) { %>
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
<% } %>
});
```

### Vitest Configuration Pattern

```typescript
// templates/testing/vitest/vitest.config.ts.ejs
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
<% if (unitTesting) { %>
    coverage: {
      reporter: ['text', 'html'],
      threshold: { lines: 80, branches: 80 },
    },
<% } %>
  },
});
```

---

## Migration Guide

### Adding New Configuration Options

1. **Update types:**
```typescript
// src/types/index.ts
export interface ProjectConfig {
  // ... existing
  newOption: NewOptionType;
}
```

2. **Update wizard:**
```typescript
// src/wizard/index.ts
const newOption = await select({
  message: 'Select new option:',
  options: [...]
});
```

3. **Update context creation:**
```typescript
// src/generators/base.ts
export function createTemplateContext(config: ProjectConfig): TemplateContext {
  return {
    ...config,
    // Add new computed values if needed
  };
}
```

4. **Update templates:**
```ejs
<% if (newOption === 'value') { %>
// Conditional content
<% } %>
```

5. **Update presets:**
```typescript
// src/presets/*.ts
export const saasPreset: PresetConfig = {
  // ... existing
  newOption: 'recommended-value',
};
```

### Template Versioning

When making breaking changes to templates:

1. Update `cliVersion` in context
2. Document migration steps
3. Consider backward compatibility

---

## Best Practices

### Template Development

1. **Always test with all presets** - Ensure templates work with all configurations
2. **Use safe defaults** - Provide fallbacks for optional values
3. **Keep templates DRY** - Use partials for repeated patterns
4. **Document context requirements** - List required variables in template comments
5. **Validate output** - Test generated files for syntax errors

### Error Handling

```ejs
<%# Safe iteration with default empty array %>
<% (auth || []).forEach(function(provider) { %>
  // Provider code
<% }); %>

<%# Safe property access %>
<%= config?.optional?.value || 'default' %>
```

### Performance

- Minimize template complexity
- Use string interpolation over concatenation
- Avoid nested iterations when possible

---

## Resources

- [EJS Documentation](https://ejs.co/)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [MCP Protocol](https://modelcontextprotocol.io)
- [Better-T-Stack](https://better-t-stack.dev)

---

*Last Updated: January 2026*
*Template System Version: 1.0*
