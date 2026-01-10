# API Reference

> **create-karetech-stack API Documentation**
> Comprehensive reference for CLI, configuration, and extension APIs

## 📋 Table of Contents

- [CLI API](#-cli-api)
- [Configuration API](#-configuration-api)
- [Preset API](#-preset-api)
- [Generator API](#-generator-api)
- [Validation API](#-validation-api)
- [Template API](#-template-api)
- [Types Reference](#-types-reference)

## 🖥️ CLI API

### Commands

#### `create [project-name]`

Creates a new project with the specified configuration.

```bash
create-karetech-stack create my-app [options]
```

**Options:**

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `--preset <name>` | string | Use a preset configuration | Interactive prompt |
| `--theme <style>` | string | UI theme style (vega, nova, maia, lyra, mira) | Preset default |
| `--color <color>` | string | Accent color | Preset default |
| `--config <file>` | string | Load configuration from file | None |
| `--no-git` | boolean | Skip git initialization | false |
| `--no-install` | boolean | Skip dependency installation | false |
| `--output <dir>` | string | Output directory | project-name |

**Examples:**

```bash
# Interactive wizard
create-karetech-stack create my-app

# With preset
create-karetech-stack create my-saas --preset saas

# With custom theme
create-karetech-stack create my-app --preset portfolio --theme nova --color purple

# From config file
create-karetech-stack create my-app --config ./my-config.json --no-install

# Quick development setup
create-karetech-stack create test-app --preset minimal --no-git --no-install
```

#### `check-env`

Validates the development environment and required tools.

```bash
create-karetech-stack check-env
```

**Checks:**
- Node.js version
- Bun availability
- TypeScript compiler
- Git configuration
- Required system dependencies

#### `export-config <project-name>`

Exports the current project configuration to a file.

```bash
create-karetech-stack export-config my-app [options]
```

**Options:**

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `--output <file>` | string | Output file path | `{project-name}.config.json` |
| `--format <type>` | string | Output format (json, yaml) | json |

## ⚙️ Configuration API

### ProjectConfig Interface

The main configuration object used throughout the system.

```typescript
interface ProjectConfig {
  // Project Info
  projectName: string;
  description: string;
  author: string;
  preset?: string;

  // Core Stack
  database: DatabaseType;
  auth: AuthProvider[];
  apiStyle: ApiStyle;

  // Design System
  uiStyle: UiStyle;
  baseColor: BaseColor;
  accentColor: AccentColor;
  font: FontFamily;
  icons: IconLibrary;
  borderRadius: string;

  // Testing
  testing: TestingFramework[];
  unitTesting: boolean;
  exampleTests: boolean;

  // DevOps
  docker: boolean;
  cicd: CicdPlatform;
  deployTarget: DeployTarget;

  // AI Workflow (PBS)
  pbsLevel: PbsLevel;
  beadsIntegration: boolean;
  claudeCodeHooks: boolean;
  mcpServers: McpServer[];

  // Extras
  pwa: boolean;
  analytics: AnalyticsProvider;
  email: EmailProvider;
  errorTracking: ErrorTrackingProvider;
  featureFlags: boolean;
}
```

### Configuration Functions

#### `validateFullConfig(config, context)`

Validates a complete project configuration.

```typescript
function validateFullConfig(
  config: Partial<ProjectConfig>,
  context: ValidationContext
): ValidationResult[]

interface ValidationResult {
  component: string;
  field: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  code: string;
}
```

**Example:**

```typescript
import { validateFullConfig, getValidationContext } from './validation';

const config = { projectName: 'my-app', database: 'postgresql' };
const context = getValidationContext();
const errors = validateFullConfig(config, context);

errors.forEach(error => {
  console.log(`${error.severity}: ${error.message}`);
});
```

#### `exportConfig(config, options)`

Exports configuration to file or string format.

```typescript
function exportConfig(
  config: ProjectConfig,
  options: ExportOptions
): Promise<string>

interface ExportOptions {
  format: 'json' | 'yaml';
  pretty?: boolean;
  includeComments?: boolean;
}
```

#### `importConfig(filePath)`

Imports configuration from a file.

```typescript
function importConfig(filePath: string): Promise<Partial<ProjectConfig>>
```

## 🎨 Preset API

### Preset System

#### `getPreset(name)`

Retrieves a preset configuration by name.

```typescript
function getPreset(name: string): PresetConfig | null
```

#### `getPresetNames()`

Returns all available preset names.

```typescript
function getPresetNames(): string[]
```

#### `getPresetsByCategory(category)`

Filters presets by category.

```typescript
function getPresetsByCategory(
  category: 'starter' | 'specialized' | 'minimal'
): PresetConfig[]
```

#### `applyPresetToConfig(config, presetName)`

Applies a preset to an existing configuration.

```typescript
function applyPresetToConfig(
  config: Partial<ProjectConfig>,
  presetName: string
): Partial<ProjectConfig>
```

#### `validatePreset(preset)`

Validates a preset configuration.

```typescript
function validatePreset(preset: PresetConfig): ValidationResult[]
```

### Creating Custom Presets

```typescript
import { PresetConfig } from './types';

export const myCustomPreset: PresetConfig = {
  name: 'my-custom',
  description: 'My custom preset',
  category: 'specialized',

  // Core Stack
  database: 'postgresql',
  auth: ['github', 'google'],
  apiStyle: 'orpc',

  // Design
  uiStyle: 'nova',
  baseColor: 'slate',
  accentColor: 'blue',
  font: 'inter',
  icons: 'lucide',
  borderRadius: '0.5',

  // Testing
  testing: ['playwright'],
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
  pwa: false,
  analytics: 'vercel',
  email: 'resend',
  errorTracking: 'sentry',
  featureFlags: true
};
```

## 🏗️ Generator API

### Core Generators

#### `generateBaseProject(projectDir, config)`

Generates the base project structure.

```typescript
function generateBaseProject(
  projectDir: string,
  config: ProjectConfig
): Promise<void>
```

#### `generateTestingFramework(projectDir, config)`

Sets up testing infrastructure.

```typescript
function generateTestingFramework(
  projectDir: string,
  config: ProjectConfig
): Promise<void>
```

#### `generateDevOpsInfrastructure(projectDir, config)`

Creates DevOps configuration files.

```typescript
function generateDevOpsInfrastructure(
  projectDir: string,
  config: ProjectConfig
): Promise<void>
```

#### `generatePBSTemplates(projectDir, config)`

Generates PBS documentation templates.

```typescript
function generatePBSTemplates(
  projectDir: string,
  config: ProjectConfig
): Promise<void>
```

#### `generateClaudeCodeConfiguration(projectDir, config)`

Sets up Claude Code AI workflow integration.

```typescript
function generateClaudeCodeConfiguration(
  projectDir: string,
  config: ProjectConfig
): Promise<void>
```

### Custom Generators

```typescript
import { ProjectConfig } from '../types';

export async function generateCustomFeature(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  // Custom generation logic
  const targetPath = join(projectDir, 'custom-feature');

  // Create directories
  await fs.mkdir(targetPath, { recursive: true });

  // Generate files from templates
  await generateFromTemplate(
    'custom-template.ejs',
    join(targetPath, 'index.ts'),
    { config, customData: 'value' }
  );
}
```

## ✅ Validation API

### Validation System

#### `validateProjectName(name)`

Validates project name according to npm and filesystem rules.

```typescript
function validateProjectName(name: string): ValidationResult
```

#### `validatePresetTracking(preset)`

Validates PBS and tracking configuration for a preset.

```typescript
function validatePresetTracking(preset: PresetConfig): ValidationResult[]
```

#### `validatePbsIntegration(config)`

Validates PBS integration requirements.

```typescript
function validatePbsIntegration(config: ProjectConfig): ValidationResult[]
```

#### `generateTrackingRecommendations(config)`

Generates recommendations for improving tracking configuration.

```typescript
function generateTrackingRecommendations(config: ProjectConfig): string[]
```

### Validation Context

```typescript
interface ValidationContext {
  npmRegistry: {
    checkAvailability: boolean;
    timeout: number;
  };
  filesystem: {
    checkPermissions: boolean;
    validatePaths: boolean;
  };
  dependencies: {
    checkCompatibility: boolean;
    requireLTS: boolean;
  };
}

function getValidationContext(): ValidationContext
```

## 📄 Template API

### Template Engine

#### `renderTemplate(templatePath, outputPath, data)`

Renders an EJS template with provided data.

```typescript
function renderTemplate(
  templatePath: string,
  outputPath: string,
  data: TemplateData
): Promise<void>

interface TemplateData {
  config: ProjectConfig;
  [key: string]: any;
}
```

#### `generateFromTemplate(template, output, data)`

Generates a file from a template string.

```typescript
function generateFromTemplate(
  template: string,
  output: string,
  data: TemplateData
): Promise<void>
```

### Template Helpers

```typescript
// Available in all templates
interface TemplateHelpers {
  // String utilities
  capitalize(str: string): string;
  camelCase(str: string): string;
  kebabCase(str: string): string;
  pascalCase(str: string): string;

  // Conditional helpers
  hasFeature(config: ProjectConfig, feature: string): boolean;
  requiresDependency(config: ProjectConfig, dep: string): boolean;

  // Configuration helpers
  getDatabaseConfig(database: DatabaseType): DatabaseConfig;
  getAuthProviders(providers: AuthProvider[]): AuthConfig[];
  getTestingConfig(frameworks: TestingFramework[]): TestConfig;
}
```

### Template Variables

All templates have access to these variables:

```typescript
interface TemplateContext {
  // Configuration
  config: ProjectConfig;
  projectName: string;
  description: string;
  author: string;

  // Paths
  projectDir: string;
  srcDir: string;
  publicDir: string;

  // Dependencies
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;

  // Features
  features: {
    hasAuth: boolean;
    hasDatabase: boolean;
    hasTesting: boolean;
    hasDocker: boolean;
    hasPWA: boolean;
  };

  // Helpers
  helpers: TemplateHelpers;
}
```

## 📚 Types Reference

### Core Types

```typescript
// Database Types
type DatabaseType = 'postgresql' | 'turso' | 'sqlite';

// Authentication
type AuthProvider = 'email' | 'github' | 'google' | 'discord' | 'microsoft';

// API Styles
type ApiStyle = 'orpc' | 'trpc' | 'rest';

// UI Styles
type UiStyle = 'default' | 'vega' | 'nova' | 'maia' | 'lyra' | 'mira';

// Colors
type BaseColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';
type AccentColor = 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' |
                  'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' |
                  'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

// Typography
type FontFamily = 'inter' | 'geist' | 'mono';

// Icons
type IconLibrary = 'lucide' | 'heroicons' | 'tabler';

// Testing
type TestingFramework = 'playwright' | 'puppeteer' | 'vitest';

// DevOps
type CicdPlatform = 'none' | 'github-actions' | 'vercel';
type DeployTarget = 'vercel' | 'netlify' | 'railway' | 'fly';

// PBS System
type PbsLevel = 'none' | 'minimal' | 'docs' | 'full';
type McpServer = 'filesystem' | 'github' | 'postgres' | 'playwright';

// Analytics & Monitoring
type AnalyticsProvider = 'none' | 'vercel' | 'google' | 'posthog';
type EmailProvider = 'none' | 'resend' | 'sendgrid';
type ErrorTrackingProvider = 'none' | 'sentry' | 'bugsnag';
```

### Preset Configuration

```typescript
interface PresetConfig extends Omit<ProjectConfig, 'projectName' | 'description' | 'author'> {
  name: string;
  description: string;
  category: 'starter' | 'specialized' | 'minimal';
}
```

### CLI Options

```typescript
interface CliOptions {
  preset?: string;
  theme?: UiStyle;
  color?: AccentColor;
  config?: string;
  noGit?: boolean;
  noInstall?: boolean;
  output?: string;
}
```

## 🔧 Extension Points

### Adding Custom Generators

1. **Create generator function:**
   ```typescript
   export async function generateMyFeature(
     projectDir: string,
     config: ProjectConfig
   ): Promise<void> {
     // Implementation
   }
   ```

2. **Register in main CLI:**
   ```typescript
   // src/index.ts
   import { generateMyFeature } from './generators/my-feature';

   // Add to generation pipeline
   await generateMyFeature(projectDir, completeConfig);
   ```

### Adding Custom Validation

```typescript
export function validateMyFeature(config: ProjectConfig): ValidationResult[] {
  const errors: ValidationResult[] = [];

  if (config.myFeature && !config.database) {
    errors.push({
      component: 'my-feature',
      field: 'database',
      severity: 'error',
      message: 'MyFeature requires a database',
      code: 'MY_FEATURE_NO_DATABASE'
    });
  }

  return errors;
}
```

### Adding Custom Templates

1. **Create template file:**
   ```ejs
   <!-- templates/my-feature/index.ts.ejs -->
   export interface MyFeatureConfig {
     enabled: <%= config.myFeature %>;
     database: '<%= config.database %>';
   }
   ```

2. **Use in generator:**
   ```typescript
   await renderTemplate(
     'my-feature/index.ts.ejs',
     join(projectDir, 'src/my-feature/index.ts'),
     { config }
   );
   ```

## 📞 Support

For API questions or issues:

- **GitHub Issues** - Bug reports and feature requests
- **Documentation** - Check `docs/` directory
- **Source Code** - Reference implementation in `src/`

---

*This API reference is automatically updated with each release.*