# KareTech Stack Preset System

> **Enhanced preset system with comprehensive validation, tracking, and PBS integration**

## 🎯 Overview

The KareTech Stack preset system provides pre-configured project templates with comprehensive tracking and PBS (Plan-Build-Ship) workflow integration. Each preset includes database configuration, authentication providers, UI styling, testing frameworks, DevOps setup, and AI workflow integration.

## 📁 Structure

```
src/presets/
├── README.md                    # This documentation
├── index.ts                     # Main preset registry and utilities
├── saas.ts                      # SaaS starter preset
├── ecommerce.ts                 # E-commerce specialized preset
├── blog.ts                      # Blog/publishing preset
├── devtool.ts                   # Developer tools preset
├── portfolio.ts                 # Portfolio/personal sites preset
├── minimal.ts                   # Minimal setup preset
└── __tests__/                   # Test suite
    ├── presets.test.ts          # Unit tests for presets
    ├── integration.test.ts      # Integration tests
    ├── runner.ts                # Test runner with reporting
    └── vitest.config.ts         # Test configuration
```

## 🎨 Available Presets

| Preset | Category | Database | Auth | Testing | PBS Level | Description |
|--------|----------|----------|------|---------|-----------|-------------|
| **saas** | starter | PostgreSQL | Email, OAuth | Playwright | Full | Full-featured SaaS with complete DevOps |
| **ecommerce** | specialized | PostgreSQL | Email, OAuth, Magic Links | Playwright, Puppeteer | Full | E-commerce with Stripe & testing |
| **blog** | specialized | Turso | Email | Playwright | Docs | Content-optimized publishing |
| **devtool** | specialized | PostgreSQL | GitHub | Vitest | Minimal | Developer tools focus |
| **portfolio** | minimal | SQLite | None | None | None | Personal portfolio sites |
| **minimal** | minimal | SQLite | Email | None | None | Bare-bones setup |

## 🚀 Usage

### CLI Usage

```bash
# Use a preset during project creation
bunx create-karetech-stack my-app --preset saas

# Interactive preset selection
bunx create-karetech-stack my-app
# Select preset from wizard
```

### Programmatic Usage

```typescript
import { presets, getPreset, applyPresetToConfig } from './presets';

// Get a specific preset
const saasPreset = getPreset('saas');

// Apply preset to user configuration
const userConfig = { projectName: 'my-app', author: 'John Doe' };
const finalConfig = applyPresetToConfig(userConfig, 'saas');

// List all available presets
const allPresets = listPresets();
```

## 📋 Validation System

### Preset Validation

Each preset undergoes comprehensive validation:

- **Configuration Validation**: Basic structure and required fields
- **Logical Consistency**: Compatible feature combinations
- **Tracking Validation**: PBS/Beads integration requirements
- **Security Validation**: Authentication and deployment safety

### PBS/Beads Integration Validation

Special validation for tracking and workflow systems:

```typescript
import { validatePbsIntegration, validateTrackingConfiguration } from '../validation/presets';

// Validate PBS integration requirements
const pbsErrors = validatePbsIntegration(config);

// Get tracking configuration score
const tracking = validateTrackingConfiguration(config);
console.log(`Tracking Score: ${tracking.overallScore}%`);
```

### Tracking Requirements by PBS Level

| PBS Level | Requirements |
|-----------|-------------|
| **Full** | ✅ Beads integration<br>✅ Claude Code hooks<br>✅ Filesystem MCP server<br>✅ Documentation generation |
| **Docs** | ✅ Documentation generation<br>⚠️ Beads integration recommended |
| **Minimal** | ✅ Basic CLAUDE.md<br>⚠️ Claude Code hooks recommended |
| **None** | ❌ No PBS requirements |

## 🧪 Testing System

### Running Tests

```bash
# Run all preset tests
npm run test:presets

# Run with coverage
npm run test:presets:coverage

# Run integration tests only
npm run test:presets:integration

# Generate validation report
npm run test:presets:report
```

### Test Categories

1. **Unit Tests** (`presets.test.ts`)
   - Preset structure validation
   - Configuration consistency
   - PBS integration compliance

2. **Integration Tests** (`integration.test.ts`)
   - End-to-end preset application
   - Documentation generation
   - IDE schema creation

3. **Validation Runner** (`runner.ts`)
   - Comprehensive preset validation
   - Tracking score calculation
   - Automated reporting

### Test Configuration

The test suite includes:
- ✅ **Configuration Validation**: All presets have valid configurations
- ✅ **PBS Compliance**: Full PBS presets meet all requirements
- ✅ **Tracking Setup**: Proper Beads and Claude Code integration
- ✅ **Documentation**: Complete preset documentation
- ✅ **IDE Support**: Schema generation for autocomplete

## 📊 Tracking & Recommendations

### Tracking Score Calculation

The system calculates a tracking score (0-100%) based on:

- **Beads Integration** (15%)
- **Claude Code Hooks** (15%)
- **MCP Servers** (15%)
- **Documentation Level** (15%)
- **Testing Setup** (10%)
- **Analytics** (10%)
- **Error Tracking** (10%)
- **CI/CD Configuration** (10%)

### Tracking Recommendations

Get personalized recommendations:

```typescript
import { generateTrackingRecommendations } from '../validation/presets';

const recommendations = generateTrackingRecommendations(config);
recommendations.forEach(rec => console.log(rec));
```

## 🛠️ Development

### Adding New Presets

1. Create preset file: `src/presets/new-preset.ts`

```typescript
import { PresetConfig } from '../types';

export const newPreset: PresetConfig = {
  name: 'new-preset',
  description: 'Description of new preset',
  category: 'specialized',

  // Core configuration
  database: 'postgresql',
  auth: ['email'],
  // ... other configuration
};
```

2. Export from index: `src/presets/index.ts`

```typescript
export * from './new-preset';

export const presets = {
  // ... existing presets
  'new-preset': newPreset
};
```

3. Add tests: `src/presets/__tests__/presets.test.ts`

```typescript
test('new preset should have valid configuration', () => {
  const errors = validatePreset(presets['new-preset']);
  expect(errors.filter(e => e.severity === 'error')).toHaveLength(0);
});
```

### Validation Rules

When creating presets, ensure:

- ✅ **Complete Configuration**: All required fields present
- ✅ **Logical Consistency**: Compatible feature combinations
- ✅ **PBS Compliance**: Proper tracking setup for PBS level
- ✅ **Security**: Appropriate auth for database/features
- ✅ **Testing**: Reasonable testing setup for category

### Best Practices

1. **Category Guidelines**:
   - **Starter**: Comprehensive setup for production apps
   - **Specialized**: Domain-specific optimizations
   - **Minimal**: Lightweight for simple projects

2. **PBS Integration**:
   - Full PBS requires Beads + Claude Code + MCP servers
   - Docs level generates documentation only
   - Minimal includes basic CLAUDE.md

3. **Testing Strategy**:
   - Production presets should include E2E testing
   - Development presets need unit testing
   - Simple presets can skip testing

## 🔧 Configuration Reference

### PresetConfig Interface

```typescript
interface PresetConfig extends Partial<ProjectConfig> {
  name: string;           // Preset identifier
  description: string;    // Human-readable description
  category: 'starter' | 'specialized' | 'minimal';

  // All ProjectConfig fields available
  database: DatabaseType;
  auth: AuthProvider[];
  pbsLevel: PbsLevel;
  beadsIntegration: boolean;
  claudeCodeHooks: boolean;
  // ... etc
}
```

### Validation Error Types

```typescript
interface PbsValidationError {
  component: 'pbs' | 'beads' | 'claude-code' | 'tracking' | 'documentation';
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
  documentationLink?: string;
}
```

## 📚 Integration Points

The preset system integrates with:

- **Main CLI** (`src/index.ts`): Preset selection and application
- **Validation System** (`src/validation/`): Configuration validation
- **Generators** (`src/generators/`): Project structure generation
- **PBS System** (`templates/pbs/`): Documentation templates
- **Claude Code** (`templates/claude/`): AI workflow configuration

## 🚨 Troubleshooting

### Common Issues

1. **Preset Validation Fails**
   ```bash
   # Run validation report
   npm run test:presets:report
   # Check specific preset
   npm run test:presets -- --grep "preset-name"
   ```

2. **PBS Integration Errors**
   ```typescript
   // Check PBS requirements
   const pbsErrors = validatePbsIntegration(config);
   console.log(pbsErrors);
   ```

3. **Low Tracking Score**
   ```typescript
   // Get recommendations
   const recs = generateTrackingRecommendations(config);
   console.log(recs);
   ```

### Debug Mode

Enable verbose validation:

```typescript
import { validatePreset } from '../validation/presets';

const preset = presets.saas;
const errors = validatePreset(preset);
errors.forEach(error => {
  console.log(`${error.severity.toUpperCase()}: ${error.message}`);
  if (error.suggestion) {
    console.log(`  Suggestion: ${error.suggestion}`);
  }
});
```

## 📈 Metrics & Monitoring

Track preset system health:

- **Validation Success Rate**: Percentage of presets passing validation
- **Tracking Scores**: Average tracking configuration quality
- **Usage Patterns**: Most popular presets and configurations
- **Error Trends**: Common validation failures

## 🔄 Maintenance

Regular maintenance tasks:

1. **Monthly**: Run full validation suite
2. **Quarterly**: Review preset configurations for updates
3. **Per Release**: Validate all presets against new features
4. **As Needed**: Update validation rules for new requirements

---

**For more information**, see:
- [PBS Master System](../../docs/PBS_MASTER_SYSTEM.md)
- [Validation Documentation](../validation/README.md)
- [Project Architecture](../../docs/ARCHITECTURE.md)