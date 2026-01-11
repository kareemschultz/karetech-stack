# FORK PLAN — KareTech Stack

> **Implementation Roadmap for Enhanced Better-T-Stack Scaffold**  
> This document defines what we're building, why, and how.

---

## 1. Vision & Goals

### The Problem
Creating a new Better-T-Stack project requires:
1. Running the scaffold (~2 min)
2. Manually initializing shadcn (~5 min)
3. Setting up E2E testing (~15 min)
4. Configuring Docker (~10 min)
5. Setting up CI/CD (~10 min)
6. Adding PBS documentation (~15 min)
7. Configuring Claude Code (~10 min)

**Total: 60+ minutes before you can start building features**

### The Solution
```bash
bunx create-karetech-stack my-app --preset saas
# Everything configured in 2 minutes
```

### Success Metrics
- [ ] Fresh scaffold runs with `bun dev` immediately
- [ ] All presets produce working projects
- [ ] E2E tests pass on fresh scaffold
- [ ] Docker builds successfully
- [ ] PBS system fully integrated
- [ ] Published to npm as `create-karetech-stack`

---

## 2. What's Being Added

### Beyond Better-T-Stack

| Feature | Better-T-Stack | KareTech Stack |
|---------|----------------|----------------|
| **Theme Selection** | Basic init | 5 visual styles, colors, fonts |
| **E2E Testing** | None | Playwright + Puppeteer options |
| **Docker** | None | Production-optimized (<200MB) |
| **CI/CD** | None | GitHub Actions workflows |
| **AI Workflow** | None | Full PBS system |
| **Documentation** | Minimal | CLAUDE.md + docs structure |
| **Presets** | None | 6 quick-start presets |

---

## 3. Enhanced Wizard Flow

### Step 1: Project Info
```
┌─────────────────────────────────────────────┐
│  create-karetech-stack                      │
│                                             │
│  Project name: my-awesome-app               │
│  Description: A SaaS application            │
│  Author: Kareem Schultz                     │
│                                             │
│  Use a preset? (y/N)                        │
└─────────────────────────────────────────────┘
```

### Step 2: Core Stack (if not using preset)
```
┌─────────────────────────────────────────────┐
│  Core Stack Configuration                   │
│                                             │
│  Database:                                  │
│    ○ PostgreSQL (recommended)               │
│    ○ SQLite                                 │
│    ○ Turso                                  │
│                                             │
│  Auth Providers:                            │
│    [x] Email/Password                       │
│    [ ] GitHub                               │
│    [ ] Google                               │
│    [ ] Discord                              │
│                                             │
│  API Style:                                 │
│    ○ oRPC (recommended)                     │
│    ○ tRPC                                   │
└─────────────────────────────────────────────┘
```

### Step 3: Design (shadcn/ui v4)
```
┌─────────────────────────────────────────────┐
│  Visual Design                              │
│                                             │
│  Style:                                     │
│    ○ Vega (Classic, timeless)               │
│    ○ Nova (Modern, clean)                   │
│    ○ Maia (Playful, rounded)                │
│    ○ Lyra (Editorial, refined)              │
│    ○ Mira (Minimal, focused)                │
│                                             │
│  Base Color:                                │
│    ○ Zinc  ○ Slate  ○ Stone                │
│    ○ Gray  ○ Neutral                        │
│                                             │
│  Accent Color:                              │
│    ○ Blue  ○ Green  ○ Violet               │
│    ○ Orange  ○ Rose  ○ Red                 │
│                                             │
│  Font:                                      │
│    ○ Inter  ○ System  ○ Geist              │
│                                             │
│  Icon Library:                              │
│    ○ Lucide (recommended)                   │
│    ○ Radix Icons                            │
│                                             │
│  Border Radius:                             │
│    ○ 0.5rem (default)                       │
│    ○ 0.75rem (rounded)                      │
│    ○ 0rem (sharp)                           │
└─────────────────────────────────────────────┘
```

### Step 4: Testing
```
┌─────────────────────────────────────────────┐
│  Testing Configuration                      │
│                                             │
│  E2E Framework:                             │
│    ○ Playwright (recommended)               │
│    ○ Puppeteer                              │
│    ○ Both                                   │
│    ○ None                                   │
│                                             │
│  Unit Tests:                                │
│    ○ Vitest (recommended)                   │
│    ○ None                                   │
│                                             │
│  Include example tests? (Y/n)               │
└─────────────────────────────────────────────┘
```

### Step 5: DevOps
```
┌─────────────────────────────────────────────┐
│  DevOps Configuration                       │
│                                             │
│  Docker:                                    │
│    ○ Production-optimized (<200MB)          │
│    ○ Development only                       │
│    ○ None                                   │
│                                             │
│  CI/CD:                                     │
│    ○ GitHub Actions (recommended)           │
│    ○ None                                   │
│                                             │
│  Deploy Target:                             │
│    ○ Self-hosted (Docker)                   │
│    ○ Vercel                                 │
│    ○ Railway                                │
│    ○ Fly.io                                 │
│    ○ None                                   │
└─────────────────────────────────────────────┘
```

### Step 6: AI Workflow
```
┌─────────────────────────────────────────────┐
│  AI Workflow Configuration                  │
│                                             │
│  PBS System:                                │
│    ○ Full (recommended)                     │
│    ○ Minimal (CLAUDE.md only)               │
│    ○ None                                   │
│                                             │
│  Include Beads setup? (Y/n)                 │
│  Include Claude Code hooks? (Y/n)           │
│  Include MCP servers config? (Y/n)          │
└─────────────────────────────────────────────┘
```

### Step 7: Extras
```
┌─────────────────────────────────────────────┐
│  Additional Features                        │
│                                             │
│  [ ] PWA Support                            │
│  [ ] Analytics (Plausible)                  │
│  [ ] Email (Resend)                         │
│  [ ] Error Tracking (Sentry)                │
│  [ ] Feature Flags (LaunchDarkly)           │
└─────────────────────────────────────────────┘
```

---

## 4. Presets

### Quick Start Presets

| Preset | Use Case | Stack Choices |
|--------|----------|---------------|
| `saas` | SaaS applications | PostgreSQL, Full auth, Mira+Zinc+Blue, Playwright, Docker+GHA, Full PBS |
| `ecommerce` | E-commerce | PostgreSQL, Full auth+Stripe, Nova+Slate+Green, Both E2E, Full DevOps |
| `blog` | Publishing/Blog | Turso, Email auth, Lyra+Stone+Orange, Playwright, Vercel |
| `devtool` | Developer tools | PostgreSQL, GitHub auth, Mira+Zinc+Green, Vitest, GHA |
| `portfolio` | Portfolio sites | SQLite, None, Vega+Neutral+Violet, None, Vercel |
| `minimal` | Simple apps | SQLite, Email, Default theme, None, None |

### Preset Command Examples
```bash
# Interactive wizard
bunx create-karetech-stack my-app

# With preset
bunx create-karetech-stack my-app --preset saas

# Preset + overrides
bunx create-karetech-stack my-app --preset saas --theme nova --color green
```

---

## 5. What Gets Scaffolded

### Full PBS Preset Output
```
my-app/
├── apps/
│   ├── web/                     # Frontend (TanStack Router)
│   │   ├── src/
│   │   ├── e2e/                 # E2E tests (if selected)
│   │   │   ├── tests/
│   │   │   ├── page-objects/
│   │   │   └── playwright.config.ts
│   │   ├── public/
│   │   └── package.json
│   └── server/                  # Backend (Hono)
│       ├── src/
│       ├── drizzle/
│       └── package.json
│
├── packages/
│   ├── db/                      # Shared database
│   ├── auth/                    # Shared auth
│   └── shared/                  # Shared utilities
│
├── docs/                        # PBS documentation
│   ├── PBS_MASTER_SYSTEM.md
│   ├── ARCHITECTURE.md
│   ├── PROJECT_STATUS.md
│   ├── CHANGELOG.md
│   └── TECH/
│       ├── bun.md
│       ├── hono.md
│       ├── orpc.md
│       ├── drizzle.md
│       ├── better-auth.md
│       ├── tanstack-router.md
│       ├── shadcn.md
│       └── e2e-testing.md       # If testing selected
│
├── .claude/                     # Claude Code config
│   ├── settings.json
│   ├── agents/
│   ├── commands/
│   └── hooks/
│
├── .github/workflows/           # CI/CD (if selected)
│   ├── ci.yml
│   ├── deploy.yml
│   └── e2e.yml
│
├── Dockerfile                   # Docker (if selected)
├── docker-compose.yml
├── CLAUDE.md                    # AI entry point
├── constitution.md              # Project principles
├── README.md
├── package.json
└── turbo.json
```

---

## 6. Implementation Plan

### Phase 1: Fork & Setup (Week 1)
- [ ] Fork Better-T-Stack
- [ ] Set up development environment
- [ ] Create basic CLI structure with Clack
- [ ] Implement project info prompts

### Phase 2: Enhanced Wizard (Week 2)
- [ ] Add all wizard steps
- [ ] Implement validation
- [ ] Add preset system
- [ ] Create config serialization

### Phase 3: Template Generation (Weeks 3-4)
- [ ] Create base templates
- [ ] Add testing templates (Playwright, Puppeteer)
- [ ] Add DevOps templates (Docker, GHA)
- [ ] Add theme templates (5 styles)

### Phase 4: PBS Integration (Week 5)
- [ ] Add PBS_MASTER_SYSTEM.md template
- [ ] Add CLAUDE.md template
- [ ] Add constitution.md template
- [ ] Add docs structure templates
- [ ] Add Claude Code config templates

### Phase 5: Presets (Week 6)
- [ ] Implement all 6 presets
- [ ] Test each preset end-to-end
- [ ] Add preset override system

### Phase 6: Testing & Polish (Weeks 7-8)
- [ ] E2E test all wizard combinations
- [ ] Fix bugs and edge cases
- [ ] Write documentation
- [ ] Prepare for npm publish

---

## 7. Technical Implementation

### CLI Entry Point
```typescript
// src/index.ts
#!/usr/bin/env bun
import { intro, outro, spinner } from '@clack/prompts';
import { runWizard } from './cli/wizard';
import { generateProject } from './generators/base';

async function main() {
  intro('create-karetech-stack');
  
  const config = await runWizard();
  
  const s = spinner();
  s.start('Generating project...');
  
  await generateProject(config);
  
  s.stop('Project generated!');
  
  outro(`cd ${config.name} && bun install && bun dev`);
}

main().catch(console.error);
```

### Preset Configuration
```typescript
// src/presets/saas.ts
import type { ProjectConfig } from '../types';

export const saasPreset: Partial<ProjectConfig> = {
  database: 'postgresql',
  auth: {
    providers: ['email', 'github', 'google'],
  },
  theme: {
    style: 'mira',
    baseColor: 'zinc',
    accentColor: 'blue',
    font: 'inter',
    radius: '0.5rem',
  },
  testing: {
    e2e: 'playwright',
    unit: 'vitest',
    examples: true,
  },
  devops: {
    docker: 'production',
    ci: 'github-actions',
    deploy: 'self-hosted',
  },
  ai: {
    pbs: 'full',
    beads: true,
    claudeHooks: true,
    mcp: true,
  },
};
```

---

## 8. Dependencies

### CLI Dependencies
```json
{
  "dependencies": {
    "@clack/prompts": "^0.7.0",
    "commander": "^12.0.0",
    "ejs": "^3.1.10",
    "fs-extra": "^11.2.0",
    "picocolors": "^1.0.0"
  },
  "devDependencies": {
    "@types/bun": "^1.0.0",
    "@types/ejs": "^3.1.5",
    "@types/fs-extra": "^11.0.4",
    "typescript": "^5.3.0"
  }
}
```

---

## 9. Publishing

### npm Package
```json
{
  "name": "create-karetech-stack",
  "version": "0.1.0",
  "description": "Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps",
  "bin": {
    "create-karetech-stack": "./dist/index.js"
  },
  "keywords": [
    "scaffold",
    "better-t-stack",
    "typescript",
    "bun",
    "hono",
    "drizzle",
    "tanstack"
  ],
  "author": "Kareem Schultz <kareem@karetech.gy>",
  "license": "MIT"
}
```

### Usage
```bash
# npx
npx create-karetech-stack my-app

# bunx (recommended)
bunx create-karetech-stack my-app

# With preset
bunx create-karetech-stack my-app --preset saas

# Global install
bun add -g create-karetech-stack
create-karetech-stack my-app
```

---

## 10. Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Fork & Setup | Week 1 | Basic CLI working |
| Enhanced Wizard | Week 2 | All prompts working |
| Template Generation | Weeks 3-4 | All templates working |
| PBS Integration | Week 5 | PBS system scaffolded |
| Presets | Week 6 | All presets working |
| Testing & Polish | Weeks 7-8 | npm ready |

**Total: 8 weeks to v1.0.0**

---

*Last Updated: January 2026*  
*Status: Planning → Ready for Implementation*
