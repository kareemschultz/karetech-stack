# Contributing to create-karetech-stack

Thank you for your interest in contributing to the Enhanced Better-T-Stack scaffold CLI! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Development Setup](#-development-setup)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Testing](#-testing)
- [Code Standards](#-code-standards)
- [Preset Development](#-preset-development)
- [Template Development](#-template-development)
- [Documentation](#-documentation)
- [Pull Request Process](#-pull-request-process)

## 🚀 Development Setup

### Prerequisites

- **Node.js 18+** or **Bun 1.0+** (recommended)
- **Git**
- **TypeScript** (for type checking)

### Setup Steps

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/yourusername/karetech-stack.git
   cd karetech-stack
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Initialize issue tracking (optional):**
   ```bash
   bd init && bd onboard
   ```

4. **Run development CLI:**
   ```bash
   bun run dev -- create my-test-app --preset saas
   ```

5. **Run tests:**
   ```bash
   bun test
   bun run test:e2e
   ```

## 📁 Project Structure

```
src/
├── index.ts              # CLI entry point
├── cli/                  # CLI prompts and validation
├── generators/           # Code generators
│   ├── base.ts           # Core scaffolding
│   ├── testing.ts        # E2E test setup
│   ├── devops.ts         # Docker/CI generation
│   ├── pbs.ts            # PBS documentation
│   └── claude-code.ts    # Claude Code integration
├── presets/              # Preset configurations
├── templates/            # EJS templates
├── validation/           # Configuration validation
└── utils/                # Shared utilities

docs/                     # Project documentation
tests/                    # Test framework
templates/                # Generation templates
```

## 🔄 Development Workflow

### Using the PBS System

This project follows the **Plan-Build-Ship (PBS)** methodology:

1. **Plan**: Define requirements in Beads issues
2. **Build**: Implement with proper tracking
3. **Ship**: Test, validate, and deploy

### Issue Tracking

Use Beads for issue management:

```bash
bd create "Add new preset" -p 1 -t feature
bd update bd-XXXX --status in_progress
bd close bd-XXXX --reason "Implementation complete"
```

### Branch Naming

- `feature/preset-name` - New preset development
- `fix/issue-description` - Bug fixes
- `docs/section-name` - Documentation updates
- `test/component-name` - Test improvements

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
bun test

# Test specific component
bun test src/presets/__tests__/
```

### E2E Tests

```bash
# Full E2E test suite
bun run test:e2e

# Quick validation
bun run test:e2e:quick
```

### Preset Validation

```bash
# Validate all presets
bun run src/presets/__tests__/runner.ts

# Check specific preset
bun test src/presets/__tests__/presets.test.ts
```

### Testing CLI Changes

```bash
# Build and test CLI
bun run build
node dist/index.js create test-project --preset minimal --no-git --no-install

# Clean test workspace
rm -rf /tmp/karetech-stack-tests
```

## 📝 Code Standards

### TypeScript Requirements

- **100% TypeScript** - No JavaScript files
- **Strict mode enabled** - All compiler checks on
- **No `any` types** - Use proper typing
- **Explicit return types** for public functions

### Code Style

- **ESLint + Prettier** for formatting
- **2-space indentation**
- **Functional programming** where possible
- **Immutable data structures** preferred

### File Organization

- **Single responsibility** - One concern per file
- **Clear exports** - Export interfaces explicitly
- **Consistent naming** - camelCase for variables, PascalCase for types

### Example Code Style

```typescript
// types/index.ts
export interface PresetConfig {
  name: string;
  description: string;
  category: 'starter' | 'specialized' | 'minimal';
  // ... other fields
}

// presets/example.ts
import { PresetConfig } from '../types';

export const examplePreset: PresetConfig = {
  name: 'example',
  description: 'Example preset for documentation',
  category: 'minimal',

  // Core Stack
  database: 'sqlite',
  auth: ['email'],
  // ... configuration
};
```

## 🎨 Preset Development

### Creating New Presets

1. **Design the configuration:**
   ```typescript
   // src/presets/mypreset.ts
   export const myPreset: PresetConfig = {
     name: 'mypreset',
     description: 'Description for my preset',
     category: 'specialized',
     // ... configuration
   };
   ```

2. **Add to preset registry:**
   ```typescript
   // src/presets/index.ts
   import { myPreset } from './mypreset';

   export const presets = {
     // ... existing presets
     mypreset: myPreset
   };
   ```

3. **Validate the preset:**
   ```bash
   bun run src/presets/__tests__/runner.ts
   ```

### Preset Requirements

- **Tracking Score ≥ 50%** - Must pass validation
- **Category appropriate** - Match expected complexity
- **Documentation complete** - Clear description
- **PBS compliance** - Include appropriate tracking

### Tracking Features

Presets are scored on these tracking features:

- **Beads Integration** - Issue tracking
- **Claude Code Hooks** - AI assistance
- **MCP Servers** - Development tools
- **PBS Level** - Documentation level
- **Testing** - Unit/E2E testing
- **Error Tracking** - Production monitoring
- **Analytics** - Usage monitoring

## 🏗️ Template Development

### EJS Templates

Templates use EJS syntax with project configuration:

```ejs
<!-- templates/package.json.ejs -->
{
  "name": "<%= projectName %>",
  "description": "<%= description %>",
  "dependencies": {
    <% if (database === 'postgresql') { %>
    "pg": "^8.11.0",
    <% } %>
  }
}
```

### Template Guidelines

- **Conditional logic** for optional features
- **Proper escaping** for security
- **Consistent formatting** with Prettier
- **Comments** for complex logic

## 📚 Documentation

### Documentation Standards

- **Markdown format** - GitHub flavored
- **Clear headings** - Hierarchical structure
- **Code examples** - Working snippets
- **Screenshots** for UI components
- **Keep up to date** - Update with changes

### Documentation Files

- `README.md` - Project overview
- `CONTRIBUTING.md` - This file
- `ARCHITECTURE.md` - System design
- `docs/` - Detailed documentation
- `CLAUDE.md` - AI assistant instructions

## 🔀 Pull Request Process

### Before Submitting

1. **Run all tests:**
   ```bash
   bun run validate  # Runs typecheck, lint, and tests
   ```

2. **Test CLI locally:**
   ```bash
   bun run build
   # Test with different presets
   ```

3. **Update documentation:**
   - Update `CHANGELOG.md` if needed
   - Add/update relevant docs

4. **Check preset validation:**
   ```bash
   bun run src/presets/__tests__/runner.ts
   ```

### PR Requirements

- **All tests passing** - CI checks must pass
- **Type checking** - No TypeScript errors
- **Linting clean** - No ESLint violations
- **Preset validation** - All presets score ≥ 50%
- **Documentation updated** - Relevant docs current

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Preset addition/modification
- [ ] Breaking change

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests pass
- [ ] Manual testing completed
- [ ] Preset validation passes

## Checklist
- [ ] Code follows TypeScript standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (if needed)
```

## 🤝 Code of Conduct

### Our Standards

- **Be respectful** - Treat everyone with respect
- **Be collaborative** - Work together constructively
- **Be inclusive** - Welcome diverse perspectives
- **Be patient** - Help others learn and grow

### Reporting Issues

If you experience inappropriate behavior:

1. Contact project maintainers
2. Use GitHub's reporting features
3. Email: [contact email if available]

## 📞 Getting Help

### Resources

- **Documentation**: `docs/` directory
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **PBS System**: `docs/PBS_MASTER_SYSTEM.md`

### Contact Maintainers

- **GitHub**: Open an issue or discussion
- **Beads**: Create tracked issues with `bd create`
- **Email**: [If available]

## 🙏 Recognition

Contributors are recognized in:

- `CHANGELOG.md` - Release notes
- GitHub contributor graphs
- Project README acknowledgments

Thank you for contributing to create-karetech-stack! Your efforts help make Better-T-Stack development faster and more enjoyable for everyone.

---

**Happy coding! 🚀**