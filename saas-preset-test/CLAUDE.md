# CLAUDE.md — saas-preset-test

> **Project:** `saas-preset-test` — Full-featured SaaS starter with PostgreSQL, full auth, and complete DevOps
> **Author:** kareemschultz
> **Status:** Development

---

## 🚨 BEFORE ANYTHING ELSE

1. **Read the Project Status:** [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) — Current state & blockers
2. **Read the Architecture:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — System design decisions
3. **Check the Tasks:** Review current sprint and issue tracking
4. **Initialize tracking:** Run `bd init` then `bd onboard`

---

## 📚 Essential Documentation

| Document | Purpose | Read When |
|----------|---------|-----------|
| [PROJECT_STATUS.md](docs/PROJECT_STATUS.md) | Current state & blockers | **Start of each session** |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design decisions | Before structural changes |
| [CHANGELOG.md](docs/CHANGELOG.md) | Version history | After completing features |
| [PBS_MASTER_SYSTEM.md](docs/PBS_MASTER_SYSTEM.md) | Complete AI workflow methodology | **First** — defines all rules |
| [FORK_PLAN.md](docs/FORK_PLAN.md) | Implementation roadmap | Planning features |

---

## 🎯 Project Overview

**Tech Stack:**
- **Runtime:** Bun + PostgreSQL
- **Framework:** Better-T-Stack (Hono, oRPC, Drizzle, Better Auth)
- **Frontend:** React + TanStack Router + shadcn/ui (maia theme)
- **Database:** Postgresql
- **Authentication:** email, oauth
- **Testing:** playwright
- **Deployment:** vercel
- **CI/CD:** github-actions

**Key Features:**
- ✅ Type-safe API with oRPC
- ✅ Modern UI with shadcn/ui v4
- ✅ Authentication system ready
- ✅ Testing infrastructure configured
- ✅ Docker containerization


---

## 🔧 Development

### Quick Start
```bash
bun install
bun dev
```

### Essential Commands
```bash
bun dev                          # Start development server
bun build                        # Build for production
bun test                         # Run tests
bun run typecheck                # TypeScript validation
bun run lint                     # Code linting

# Database
bun run db:generate              # Generate migrations
bun run db:migrate               # Run migrations
bun run db:studio                # Database studio

# E2E Testing
bun run test:e2e                 # Playwright tests
bun run test:e2e:ui              # Playwright UI mode

# Docker
bun run docker:dev               # Development with Docker
bun run docker:build             # Build production image
```

---

## 📁 Project Structure

```
saas-preset-test/
├── src/                         # Application source
│   ├── components/              # React components
│   ├── lib/                     # Utility libraries
│   ├── routes/                  # TanStack Router routes
│   └── styles/                  # Styling and themes
├── server/                      # Backend API
│   ├── routes/                  # API endpoints
│   ├── db/                      # Database schema
│   └── auth/                    # Authentication
├── tests/                       # Test suites
│   ├── e2e/                     # E2E tests
│   └── unit/                   # Unit tests
├── Dockerfile                   # Container configuration
├── docs/                        # Documentation
│   ├── PBS_MASTER_SYSTEM.md    # AI workflow methodology
│   ├── ARCHITECTURE.md         # System design
│   └── PROJECT_STATUS.md       # Current state
└── CLAUDE.md                   # ← You are here
```

---

## 🎨 Design System

**UI Theme:** maia with zinc/blue color scheme
**Typography:** figtree font family
**Icons:** hugeicons
**Border Radius:** defaultrem

### Component Library
- **Base:** shadcn/ui v4 components
- **Styling:** Tailwind CSS with design tokens
- **Themes:** Support for light/dark mode

---

## 🔐 Authentication

**Providers:** email, oauth
**Library:** Better Auth
**Features:**
- Session management
- OAuth integration
- Role-based access control


---



## 🤖 AI Workflow Commands

### Beads (Issue Tracking)
```bash
bd init                          # Initialize (first time)
bd ready                         # What's ready to work on?
bd list --status open            # All open issues
bd create "title" -p 1 -t task   # Create issue
bd close bd-XXXX --reason "Done" # Close issue
```

### Spec Kit (Planning)
```bash
/speckit.specify                 # Define what to build
/speckit.clarify                 # AI asks questions
/speckit.plan                    # Technical planning
/speckit.tasks                   # Break into tasks
```

---



## 🚦 Golden Rules

1. **Type Safety First** — Strict TypeScript, no `any` types
2. **Test Before Deploy** — All tests must pass
3. **Document Changes** — Update docs after modifications
4. **Follow Conventions** — Consistent code style and patterns
5. **Track Work** — Use Beads for all task tracking

---

## 📋 Session Protocol

### Start of Session
1. Run `bd ready` to see available work
2. Review any blockers in PROJECT_STATUS.md
3. Check recent changes in CHANGELOG.md

### During Session
1. Create issues for discovered work: `bd create "..." -t task`
2. Update issue status and progress
3. Follow established coding patterns

### End of Session
1. Update docs/PROJECT_STATUS.md
2. Update CHANGELOG.md with changes
3. Close completed issues: `bd close bd-XXXX --reason "..."`
4. Commit with conventional format

---

## 🔗 External Resources

| Resource | URL |
|----------|-----|
| Better-T-Stack | https://better-t-stack.dev |
| shadcn/ui | https://ui.shadcn.com |
| TanStack Router | https://tanstack.com/router |
| Drizzle ORM | https://orm.drizzle.team |
| Playwright | https://playwright.dev |


---

*Last Updated: 1/11/2026 - Generated by create-karetech-stack*
*Version: 1.0.0*
