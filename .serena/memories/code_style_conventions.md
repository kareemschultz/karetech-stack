# Code Style and Conventions

## TypeScript Configuration
- **Strict mode enabled**: All strict TypeScript checks
- **ESNext target**: Modern JavaScript features
- **Module resolution**: bundler mode for Bun
- **Path mapping**: `@/*` maps to `./src/*`
- **Declaration files**: Generated for type definitions

## Code Style Standards

### File Organization
- **Entry point**: `src/index.ts` (CLI bin file with shebang)
- **Generators**: `src/generators/` - Feature-specific code generators
- **Types**: `src/types/index.ts` - Centralized TypeScript types  
- **Validation**: `src/validation/index.ts` - Input validation functions
- **Presets**: `src/presets/` - Configuration presets
- **Templates**: `templates/` - EJS template files

### Naming Conventions
- **Files**: kebab-case (`base-generator.ts`)
- **Directories**: kebab-case (`src/generators/`)
- **Types**: PascalCase (`ProjectConfig`, `CliOptions`)
- **Variables/Functions**: camelCase (`projectName`, `validateConfig`)
- **Constants**: UPPER_SNAKE_CASE (`VERSION`)

### TypeScript Patterns
- **Strict typing**: All functions have explicit return types
- **Interface definitions**: Comprehensive types for all configs
- **Validation**: Input validation with error objects
- **Module exports**: ESM with explicit imports/exports
- **Error handling**: Proper error types and validation

### Import Style
```typescript
// External dependencies first
import { intro, outro, text, select } from '@clack/prompts';
import { Command } from 'commander';

// Internal imports with path mapping
import { ProjectConfig, CliOptions } from '@/types';
import { validateProjectName } from '@/validation';
```

### Function Structure
- **Async/await**: Preferred over Promises
- **Input validation**: All user inputs validated
- **Error handling**: Try/catch with proper error messages
- **Early returns**: Avoid deep nesting with guard clauses

## Linting & Formatting
- **ESLint**: TypeScript rules enabled
- **Prettier**: Automatic code formatting
- **Pre-commit**: Type checking and linting required