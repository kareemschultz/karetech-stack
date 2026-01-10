# CLAUDE.md — KareTech Stack

> **Project:** `create-karetech-stack` — Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps built-in
> **Author:** Kareem Schultz (KareTech Solutions)
> **Status:** Template Foundation Complete (85% Complete)
> **Repo:** https://github.com/kareemschultz/karetech-stack
> **Current Phase:** Phase 2A Complete - Core Templates Implemented

---

## 🚨 BEFORE ANYTHING ELSE

1. **Read the PBS Master System:** [docs/PBS_MASTER_SYSTEM.md](docs/PBS_MASTER_SYSTEM.md) — Complete AI workflow methodology
2. **Read the Fork Plan:** [docs/FORK_PLAN.md](docs/FORK_PLAN.md) — Implementation roadmap & wizard spec
3. **Read the Constitution:** [constitution.md](constitution.md) — Immutable project principles
4. **Initialize tracking:** Run `bd init` then `bd onboard`

---

## 📚 Essential Documentation

| Document | Purpose | Read When |
|----------|---------|-----------|
| [PBS_MASTER_SYSTEM.md](docs/PBS_MASTER_SYSTEM.md) | Complete AI workflow (9,500+ lines) | **First** — defines all rules |
| [FORK_PLAN.md](docs/FORK_PLAN.md) | Implementation roadmap & wizard spec | Planning features |
| [constitution.md](constitution.md) | Immutable principles | **Never modify** |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design decisions | Before structural changes |
| [PROJECT_STATUS.md](docs/PROJECT_STATUS.md) | Current state & blockers | Start of each session |
| [CHANGELOG.md](docs/CHANGELOG.md) | Version history | After completing features |

---

## 🎯 Project Vision

**Goal:** Fork Better-T-Stack to create an enhanced scaffold CLI that includes:

| Feature | Current (Manual) | Our Fork (Automated) |
|---------|------------------|----------------------|
| Theme selection | Manual shadcn init | Wizard picks style/colors/font |
| E2E testing | Manual setup | Playwright + Puppeteer configured |
| CI/CD | Manual GitHub Actions | Pre-configured workflows |
| Docker | Manual Dockerfile | Production-optimized included |
| AI workflow | Manual PBS setup | Full PBS system scaffolded |
| Documentation | Start from scratch | CLAUDE.md + docs structure |

**End Result:**
```bash
# Instead of 30+ minutes of manual setup...
bunx create-karetech-stack my-app --preset saas

# Get everything configured in 2 minutes:
# ✅ Better-T-Stack core (Bun, Hono, oRPC, Drizzle, Better Auth, TanStack)
# ✅ shadcn/ui v4 with chosen theme
# ✅ E2E testing ready
# ✅ Docker + CI/CD configured
# ✅ PBS system + Claude Code hooks
# ✅ Documentation structure
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| **CLI Framework** | Clack (beautiful prompts) |
| **Templating** | EJS |
| **Base** | Better-T-Stack |
| **Package Manager** | Bun |
| **Language** | TypeScript |

---

## 📁 Project Structure

```
karetech-stack/
├── CLAUDE.md                    # ← You are here (entry point)
├── README.md                    # Public npm documentation
├── constitution.md              # IMMUTABLE principles
├── package.json                 # CLI package config
├── tsconfig.json
│
├── src/                         # CLI source code
│   ├── index.ts                 # Entry point (bin)
│   ├── cli/                     # Wizard prompts & logic
│   │   ├── prompts.ts           # Clack prompt definitions
│   │   ├── wizard.ts            # Main wizard flow
│   │   └── validators.ts        # Input validation
│   ├── generators/              # Code generators
│   │   ├── base.ts              # Core scaffold
│   │   ├── testing.ts           # E2E setup
│   │   ├── devops.ts            # Docker/CI
│   │   └── pbs.ts               # PBS docs
│   ├── templates/               # EJS template helpers
│   └── presets/                 # Preset configurations
│       ├── saas.ts
│       ├── ecommerce.ts
│       ├── blog.ts
│       └── minimal.ts
│
├── templates/                   # Scaffold templates (EJS) - ✅ IMPLEMENTED
│   ├── base/                    # ✅ Core Better-T-Stack (20+ files)
│   │   ├── package.json.ejs     # Dynamic dependency management
│   │   ├── tsconfig.json.ejs    # TypeScript configuration
│   │   ├── vite.config.ts.ejs   # Vite build configuration
│   │   ├── src/main.tsx.ejs     # React application entry
│   │   ├── src/routes/          # TanStack Router pages
│   │   ├── src/components/      # UI components & utilities
│   │   └── src/server/          # Hono.js backend
│   ├── database/                # ✅ Database configurations
│   │   ├── postgresql/          # PostgreSQL + Drizzle setup
│   │   ├── sqlite/              # SQLite + Drizzle setup
│   │   └── turso/               # Turso + Drizzle setup
│   ├── auth/                    # ✅ Authentication templates
│   │   ├── src/auth/config.ts   # Better Auth configuration
│   │   ├── src/components/auth/ # Login/Signup forms
│   │   └── src/lib/auth-*.ts    # Auth utilities & middleware
│   ├── themes/                  # ✅ 6 shadcn/ui theme styles
│   │   ├── default/             # Standard shadcn theme
│   │   ├── new-york/            # Sharp, minimal design
│   │   ├── minimal/             # Subtle colors & styling
│   │   ├── vibrant/             # Bold colors & effects
│   │   ├── modern/              # Glassmorphism & gradients
│   │   └── elegant/             # Sophisticated typography
│   ├── devops/                  # ✅ DevOps configurations
│   │   ├── docker/              # Multi-stage Dockerfile & Compose
│   │   └── github/              # CI/CD workflows & Dependabot
│   ├── testing/                 # 🔄 Testing configurations (IN PROGRESS)
│   │   ├── playwright/          # E2E testing setup
│   │   ├── puppeteer/           # Browser automation
│   │   └── vitest/              # Unit testing framework
│   └── pbs/                     # 📋 PBS documentation templates
│
├── docs/                        # Project documentation
│   ├── PBS_MASTER_SYSTEM.md     # AI workflow (THE source of truth)
│   ├── FORK_PLAN.md             # Implementation roadmap
│   ├── ARCHITECTURE.md          # Design decisions
│   ├── PROJECT_STATUS.md        # Current state
│   ├── CHANGELOG.md             # Version history
│   ├── TECH/                    # Technology docs
│   └── ADR/                     # Architecture Decision Records
│
├── .claude/                     # Claude Code configuration
│   ├── settings.json            # Hooks, permissions
│   ├── agents/                  # Subagent definitions
│   ├── commands/                # Slash commands
│   └── hooks/                   # Hook scripts
│
├── .specify/                    # Spec Kit files
│   ├── spec.md
│   ├── plan.md
│   └── tasks/
│
├── .beads/                      # Beads issue tracking (auto-created)
├── .github/workflows/           # CI/CD for this repo
└── scripts/                     # Build & utility scripts
```

---

## 🎯 Current Implementation Status

### ✅ Phase 2A: Template Foundation (COMPLETE)
| Component | Status | Files | Description |
|-----------|--------|-------|-------------|
| **Base Templates** | ✅ DONE | 20+ files | Complete React+TypeScript+Vite app scaffold |
| **Database Integration** | ✅ DONE | 12 files | PostgreSQL, Turso, SQLite with Drizzle ORM |
| **Authentication System** | ✅ DONE | 7 files | Better Auth with OAuth & email support |
| **Theme System** | ✅ DONE | 12 files | 6 shadcn/ui variants (default, new-york, minimal, vibrant, modern, elegant) |
| **DevOps Infrastructure** | ✅ DONE | 6 files | Docker, Docker Compose, GitHub Actions CI/CD |

### 🔄 Phase 2B: Advanced Features (IN PROGRESS)
| Component | Status | Progress | Next Steps |
|-----------|--------|----------|-----------|
| **Testing Framework** | 🔄 IN PROGRESS | 75% | Complete Vitest & Puppeteer templates |
| **PBS Documentation** | 📋 PENDING | 0% | AI workflow templates & documentation |
| **Tech Stack Expansion** | 📋 PENDING | 0% | Additional ORM, backend, runtime options |

### 📊 Template Coverage
- **Base Application**: 100% ✅
- **Database Options**: 100% ✅ (PostgreSQL, Turso, SQLite)
- **Authentication**: 100% ✅ (Email, GitHub, Google, Discord, Microsoft)
- **UI Themes**: 100% ✅ (6 complete theme variants)
- **DevOps**: 100% ✅ (Docker, CI/CD, automated deployments)
- **Testing**: 75% 🔄 (Playwright done, Vitest & Puppeteer pending)
- **Documentation**: 10% 📋 (Basic structure, PBS templates pending)

### 🚀 Ready for Testing
The CLI template system is now **85% complete** and ready for initial testing:
```bash
# Test the template generation
bun run dev my-test-app --preset saas --database postgresql --auth github,email --theme modern
```

---

## 🚦 Golden Rules (Never Break)

1. **Read PBS first** — `docs/PBS_MASTER_SYSTEM.md` is the source of truth
2. **Constitution is IMMUTABLE** — Never modify `constitution.md`
3. **Track work in Beads** — Use `bd create`, `bd update`, `bd close`
4. **Update docs after changes** — Keep documentation in sync
5. **Test before committing** — Run `bun test` and `bun run typecheck`
6. **Follow the spec** — Reference `.specify/spec.md` for requirements

---

## 🤖 AI Workflow Commands

### Beads (Issue Tracking)
```bash
bd init                          # Initialize (first time)
bd onboard                       # Get integration instructions
bd ready                         # What's ready to work on?
bd list --status open            # All open issues
bd create "title" -p 1 -t task   # Create issue
bd close bd-XXXX --reason "Done" # Close issue
bd dep tree bd-XXXX              # Show dependencies
```

### Spec Kit (Planning)
```bash
specify init . --ai claude       # Initialize Spec Kit
/speckit.specify                 # Define what to build
/speckit.clarify                 # AI asks questions  
/speckit.plan                    # Technical planning
/speckit.tasks                   # Break into tasks
/speckit.implement               # Execute tasks
```

---

## 🎨 Presets Reference

| Preset | Use Case | Theme | Testing | DevOps |
|--------|----------|-------|---------|--------|
| `saas` | SaaS apps | Mira + Zinc + Blue | Playwright | GitHub Actions + Docker |
| `ecommerce` | E-commerce | Nova + Slate + Green | Both | Full CI/CD |
| `blog` | Publishing | Lyra + Stone + Orange | Playwright | Vercel |
| `devtool` | Dev tools | Mira + Zinc + Green | Vitest | GitHub Actions |
| `portfolio` | Portfolios | Vega + Neutral + Violet | None | Vercel |
| `minimal` | Simple apps | Default | None | None |

---

## 🔗 External Resources

| Resource | URL |
|----------|-----|
| Better-T-Stack | https://github.com/AmanVarshney01/create-better-t-stack |
| Better-T-Stack Docs | https://better-t-stack.dev |
| shadcn/ui Builder | https://ui.shadcn.com/create |
| shadcn Themes | https://ui.shadcn.com/themes |
| Beads | https://github.com/steveyegge/beads |
| Spec Kit | https://github.com/github/spec-kit |
| Playwright | https://playwright.dev |

---

## 📋 Session Protocol

### Start of Session
1. Run `bd ready --json` to see available work
2. Check `docs/PROJECT_STATUS.md` for context
3. Review any blockers

### During Session
1. Create issues for discovered work: `bd create "..." -t task`
2. Update issue status: `bd update bd-XXXX --status in_progress`
3. Reference PBS for patterns and templates

### End of Session
1. Update `docs/PROJECT_STATUS.md`
2. Close completed issues: `bd close bd-XXXX --reason "..."`
3. Create issues for remaining work
4. Run `bd sync` to persist
5. Commit with conventional format

---

## 🚀 Development Commands

```bash
bun install                      # Install dependencies
bun run dev                      # Development mode
bun run build                    # Build CLI
bun run test                     # Run tests
bun run typecheck                # Type checking
bun run lint                     # Linting

# Test the CLI locally
bun run dev -- my-test-app --preset saas
```

---

*Last Updated: January 2026*  
*Version: 0.1.0-dev*
