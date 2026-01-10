# Architecture — KareTech Stack

> **System design decisions and patterns**

---

## Overview

KareTech Stack is a CLI tool that scaffolds enhanced Better-T-Stack projects with PBS, testing, and DevOps built-in.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     create-karetech-stack CLI                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Wizard     │───▶│  Generators  │───▶│  Templates   │      │
│  │   (Clack)    │    │              │    │   (EJS)      │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │                │
│         ▼                   ▼                   ▼                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Presets    │    │  Validators  │    │   Output     │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Generated Project                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  apps/web/          Frontend (TanStack Router + shadcn/ui)      │
│  apps/server/       Backend (Hono + oRPC + Drizzle)             │
│  packages/          Shared packages                              │
│  docs/              PBS documentation                            │
│  .claude/           Claude Code config                           │
│  e2e/               E2E tests (if selected)                     │
│  Dockerfile         Production Docker (if selected)              │
│  .github/           CI/CD workflows (if selected)               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Decisions

### ADR-001: Use Clack for CLI Prompts
**Status:** Accepted  
**Context:** Need beautiful, interactive CLI prompts  
**Decision:** Use @clack/prompts instead of Inquirer  
**Rationale:** Better aesthetics, lighter weight, modern API

### ADR-002: EJS for Templating
**Status:** Accepted  
**Context:** Need to generate dynamic file content  
**Decision:** Use EJS templates  
**Rationale:** Simple, well-known, no compilation step

### ADR-003: Preset System
**Status:** Accepted  
**Context:** Users want quick starts without answering many questions  
**Decision:** Implement preset configurations that pre-fill wizard options  
**Rationale:** Reduces time-to-start, provides opinionated defaults

---

## Data Flow

1. **User Input** → Wizard collects answers via Clack prompts
2. **Configuration** → Answers merged with preset (if any) into ProjectConfig
3. **Validation** → Config validated for consistency
4. **Generation** → Generators create project structure
5. **Templating** → EJS templates filled with config values
6. **Output** → Files written to disk
7. **Post-Install** → Dependencies installed, git initialized

---

## Extension Points

### Adding a New Preset
1. Create `src/presets/<name>.ts`
2. Export `Partial<ProjectConfig>`
3. Add to preset registry in `src/presets/index.ts`

### Adding a New Wizard Step
1. Create prompts in `src/cli/prompts.ts`
2. Add step to `src/cli/wizard.ts`
3. Update `ProjectConfig` type if needed
4. Add templates to `templates/` directory

### Adding a New Generator
1. Create `src/generators/<name>.ts`
2. Export generator function
3. Register in `src/generators/index.ts`
4. Add corresponding templates

---

*Last Updated: January 2026*
