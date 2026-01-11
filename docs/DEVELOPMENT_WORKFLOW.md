# Development Workflow Guide

> **Purpose:** Guide for parallel development across multiple sessions
> **Last Updated:** January 2026

---

## 📋 Overview

This document describes the development workflow for KareTech Stack, designed to support parallel development across multiple sessions working on different aspects of the v0.2.0 MCP integration.

---

## 🌿 Branch Strategy

### Main Branches

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready code | Protected, requires PR |
| `develop` | Integration branch | Protected, requires review |

### Feature Branches

Feature branches follow the naming convention:
```
feature/<session-id>/<feature-name>
```

### Session Branches (Parallel Development)

For the v0.2.0 MCP integration work, we have 9 parallel sessions:

| Session | Focus Area | Branch |
|---------|------------|--------|
| 1 | MCP Server Registry | `feature/session-1/mcp-registry` |
| 2 | Auto-Installation System | `feature/session-2/mcp-auto-install` |
| 3 | Health Validation | `feature/session-3/mcp-health` |
| 4 | GitHub Integration | `feature/session-4/github-mcp` |
| 5 | Database Integration | `feature/session-5/database-mcp` |
| 6 | Filesystem Integration | `feature/session-6/filesystem-mcp` |
| 7 | Playwright Integration | `feature/session-7/playwright-mcp` |
| 8 | Template Enhancement | `feature/session-8/mcp-templates` |
| 9 | Dev Infrastructure | `feature/session-9/dev-infrastructure` |

---

## 🛠️ Development Commands

### Environment Setup

```bash
# First-time setup
bun install
bun run env:setup

# Check environment
bun run env:check
```

### Development Workflow

```bash
# Start development
bun run dev

# Watch mode
bun run dev:watch

# Type checking (continuous)
bun run typecheck:watch
```

### Testing

```bash
# Run all tests
bun run test

# Run specific test suites
bun run test:unit        # Unit tests
bun run test:mcp         # MCP module tests
bun run test:generators  # Generator tests
bun run test:presets     # Preset tests
bun run test:e2e         # E2E tests

# Quick E2E tests
bun run test:e2e:quick
```

### MCP Development

```bash
# Validate MCP configuration
bun run mcp:validate

# Test MCP server connectivity
bun run mcp:test
```

### Validation

```bash
# Quick validation (for local development)
bun run validate:quick

# Full validation (for commits)
bun run validate

# CI validation (strictest)
bun run validate:ci
```

---

## 📁 Project Structure

```
karetech-stack/
├── src/
│   ├── mcp/                    # MCP module (Sessions 1, 4-7)
│   │   ├── index.ts            # Module exports
│   │   ├── types.ts            # Type definitions
│   │   ├── registry.ts         # Server registry (Session 1)
│   │   ├── server-configs.ts   # Server configurations
│   │   └── __tests__/          # MCP tests
│   │
│   ├── generators/             # Code generators (Session 8)
│   │   ├── mcp.ts              # MCP generator
│   │   ├── base.ts             # Base scaffold
│   │   └── ...
│   │
│   ├── presets/                # Preset configurations
│   ├── types/                  # Shared type definitions
│   ├── utils/                  # Utility functions
│   └── index.ts                # CLI entry point
│
├── scripts/                    # Development scripts (Session 9)
│   ├── check-environment.ts    # Environment validation
│   ├── setup-dev-environment.ts # Setup automation
│   ├── validate-mcp-config.ts  # MCP validation
│   └── test-mcp-servers.ts     # MCP server testing
│
├── templates/                  # EJS templates
│   └── mcp/                    # MCP-specific templates
│
├── tests/                      # Test suites
│   ├── e2e/                    # E2E tests
│   └── setup.ts                # Test configuration
│
└── docs/                       # Documentation
    ├── DEVELOPMENT_WORKFLOW.md # This file
    └── ...
```

---

## 🔄 Parallel Development Guidelines

### Session Independence

Each session should:
1. Work within its designated module/area
2. Not modify files owned by other sessions
3. Add integration tests for cross-module dependencies

### File Ownership

| Files/Directories | Owner Session |
|-------------------|---------------|
| `src/mcp/registry.ts` | Session 1 |
| `src/mcp/server-configs.ts` | Session 1 |
| `src/generators/mcp.ts` | Session 4 |
| `scripts/*` | Session 9 |
| `package.json` scripts | Session 9 |
| `tsconfig.json` | Session 9 |
| `.github/workflows/*` | Session 9 |

### Integration Points

When sessions need to integrate:

1. **Define interfaces first** - Create type definitions before implementation
2. **Use barrel exports** - Export through `index.ts` files
3. **Add integration tests** - Test cross-module interactions
4. **Document dependencies** - Update this file with new dependencies

---

## ✅ Pre-Commit Checklist

Before committing:

- [ ] `bun run typecheck` passes
- [ ] `bun run lint` passes
- [ ] `bun run test:unit` passes
- [ ] No console.log debugging statements
- [ ] Types are properly exported
- [ ] Documentation updated if needed

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance

**Scopes:**
- `mcp` - MCP module
- `cli` - CLI/wizard
- `generators` - Code generators
- `templates` - EJS templates
- `devops` - CI/CD, Docker
- `docs` - Documentation

**Examples:**
```
feat(mcp): add GitHub MCP server configuration
fix(generators): correct template path resolution
docs(mcp): add setup instructions for GitHub MCP
test(mcp): add registry validation tests
```

---

## 🔀 Merge Strategy

### Feature → Develop

1. Create PR from feature branch to `develop`
2. Ensure all CI checks pass
3. Request review from relevant session owner
4. Squash and merge

### Develop → Main

1. Create PR from `develop` to `main`
2. Run full E2E test suite
3. Require approval from 2+ reviewers
4. Create a merge commit (preserve history)

---

## 🚨 Conflict Resolution

When merge conflicts occur:

1. **Communicate** - Notify affected session owners
2. **Coordinate** - Decide on resolution strategy
3. **Test** - Run full test suite after resolution
4. **Document** - Note conflict resolution in PR

### Common Conflict Areas

- `src/types/index.ts` - Type definitions
- `package.json` - Dependencies and scripts
- `src/mcp/index.ts` - Module exports

---

## 📊 Progress Tracking

### Session Status

Update status in `docs/PROJECT_STATUS.md` after each significant change:

```markdown
## Session 9: Dev Infrastructure

**Status:** In Progress
**Last Update:** 2026-01-11

### Completed
- [x] Enhanced package.json scripts
- [x] Created environment validation scripts
- [x] Updated TypeScript configuration
- [x] Updated .gitignore

### In Progress
- [ ] CI/CD workflow for parallel development

### Blocked
- None
```

---

## 📚 Additional Resources

- [CLAUDE.md](../CLAUDE.md) - Project entry point
- [PBS_MASTER_SYSTEM.md](PBS_MASTER_SYSTEM.md) - AI workflow methodology
- [IMPLEMENTATION_PHASES_AND_DEPENDENCIES.md](IMPLEMENTATION_PHASES_AND_DEPENDENCIES.md) - Roadmap
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current status

---

*Development Workflow v1.0 - January 2026*
