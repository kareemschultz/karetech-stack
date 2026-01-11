# PBS MASTER SYSTEM v4.0 — ULTIMATE COMPREHENSIVE EDITION

## The Complete Guide to AI-Assisted Better-T-Stack Development

**Version:** 4.0 Ultimate  
**Last Updated:** January 6, 2026  
**Author:** Kareem (KareTech Solutions / NDMA)  
**Based On:** Avthar (@avthar) patterns, Better-T-Stack, Claude Code best practices  
**Total Content:** PBS System + Fork Plan + Infrastructure Addendum + Production Docker

---

# 📊 DOCUMENT STATISTICS

| Section | Lines | Description |
|---------|-------|-------------|
| PBS System v4 (Parts 1-12) | ~4,500 | Core AI workflow system |
| Fork Plan | ~1,600 | Enhanced scaffold specification |
| Addendum A | ~2,100 | Infrastructure, schemas, scripts |
| Addendum B | ~1,300 | Production Docker (battle-tested) |
| **TOTAL** | **~9,500** | Complete comprehensive guide |

---

# 🎯 QUICK NAVIGATION

## PBS MASTER SYSTEM v4.0
- [PART 1: Core PBS System](#part-1-core-pbs-system)
- [PART 2: Discovery & Documentation](#part-2-discovery--documentation)
- [PART 3: Claude Code Configuration](#part-3-claude-code-configuration)
- [PART 4: Plugins & MCP Servers](#part-4-plugins--mcp-servers)
- [PART 5: Tech Documentation](#part-5-tech-documentation)
- [PART 6: E2E Testing](#part-6-e2e-testing)
- [PART 7: shadcn/ui v4 Integration](#part-7-shadcnui-v4-integration)
- [PART 8: Visual Design Workflow](#part-8-visual-design-workflow)
- [PART 9: Productivity & Advanced Patterns](#part-9-productivity--advanced-patterns)
- [PART 10: DevOps & Deployment](#part-10-devops--deployment)
- [PART 11: Beads & Spec Kit Integration](#part-11-beads--spec-kit-integration)
- [PART 12: Enhanced Fork Plan Overview](#part-12-enhanced-better-t-stack-fork-plan)
- [APPENDICES](#appendices)

## BETTER-T-STACK FORK PLAN (ADDENDUM)
- [Fork Vision & Goals](#1-vision--goals)
- [What's Being Added](#2-whats-being-added)
- [Enhanced Wizard Flow](#3-enhanced-wizard-flow)
- [Complete Scaffold Specification](#4-complete-scaffold-specification)
- [Template Files](#5-template-files)
- [Presets System](#6-presets-system)
- [Implementation Plan](#7-implementation-plan)

## ADDENDUM A: PRODUCTION INFRASTRUCTURE
- [Optimized Docker Setup](#1-optimized-docker-setup)
- [Database Schemas](#2-database-schemas)
- [API Documentation](#3-api-documentation)
- [Utility Scripts](#4-utility-scripts)
- [Setup Scripts](#5-setup-scripts)

## ADDENDUM B: PRODUCTION DOCKER (BATTLE-TESTED)
- [Production Dockerfile (128-180MB)](#production-dockerfile)
- [Docker Compose Configuration](#docker-compose-configuration)
- [Deployment Scripts](#deployment-scripts)
- [Backup Scripts](#backup-scripts)
- [CI/CD Pipeline](#github-actions-cicd)

---

██████╗ ██████╗ ███████╗    ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ 
██╔══██╗██╔══██╗██╔════╝    ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██████╔╝███████╗    ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██╔══██╗╚════██║    ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ██████╔╝███████║    ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║
╚═╝     ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                                                 
███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗    ██╗   ██╗██╗  ██╗      
██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║    ██║   ██║██║  ██║      
███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║    ██║   ██║███████║      
╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║    ╚██╗ ██╔╝╚════██║      
███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║     ╚████╔╝      ██║      
╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝      ╚═══╝       ╚═╝      

================================================================================
                    PBS MASTER SYSTEM v4.0 — PARTS 1-12
================================================================================

# PBS MASTER SYSTEM v4.0 — THE COMPLETE EDITION

## The Definitive Guide to AI-Assisted Better-T-Stack Development

**Version:** 4.0 Final  
**Last Updated:** January 2025  
**Author:** Kareem (KareTech Solutions / NDMA)  
**Based On:** Avthar (@avthar) patterns, Better-T-Stack, Claude Code best practices

---

# ?? MASTER TABLE OF CONTENTS

## PART 1: CORE PBS SYSTEM
- [1.1] Philosophy & Golden Rules
- [1.2] The PBS Workflow (Plan → Build → Ship)
- [1.3] Default Assumptions
- [1.4] Init Workflow & Scaffold Analysis
- [1.5] Stop Conditions & Escalation

## PART 2: DISCOVERY & DOCUMENTATION
- [2.1] Discovery Framework (50+ Questions)
- [2.2] The 4 Essential Documents
- [2.3] Dynamic Documentation System
- [2.4] Documentation Linking Pattern
- [2.5] CLAUDE.md Template
- [2.6] /update-docs-and-commit Command

## PART 3: CLAUDE CODE CONFIGURATION
- [3.1] Project Structure
- [3.2] OPERATOR.md Authority Model
- [3.3] settings.json (Permissions)
- [3.4] Complete Hooks Reference (10 Events)
- [3.5] Skills
- [3.6] Subagents (3 Essential + More)
- [3.7] Slash Commands

## PART 4: PLUGINS & MCP SERVERS
- [4.1] Essential Plugins (3 Recommended)
- [4.2] MCP Servers for Your Stack
- [4.3] Plugin + PBS Synergy

## PART 5: TECH DOCUMENTATION
- [5.1] Better-T-Stack Overview
- [5.2] 17 TECH Docs Reference
- [5.3] docs/TECH/*.md Templates

## PART 6: E2E TESTING
- [6.1] Dual Framework Strategy (Playwright + Puppeteer)
- [6.2] Page Object Model
- [6.3] Test Fixtures
- [6.4] CI/CD Integration
- [6.5] docs/TECH/e2e-testing.md

## PART 7: SHADCN/UI V4 INTEGRATION
- [7.1] What's New in v4
- [7.2] Official shadcn MCP Server
- [7.3] 5 Visual Styles
- [7.4] Theme Customization
- [7.5] docs/TECH/shadcn.md

## PART 8: VISUAL DESIGN WORKFLOW
- [8.1] Visual Builder (ui.shadcn.com/create)
- [8.2] Explore → Pick → Apply Workflow
- [8.3] Preset System
- [8.4] Theme Recommendations by Project Type

## PART 9: PRODUCTIVITY & ADVANCED PATTERNS
- [9.1] 4 Tips for Building Productively
- [9.2] Model Strategy (The Opus Rule)
- [9.3] The # (Hashtag) Trick
- [9.4] Voice Mode Hack
- [9.5] Git Worktrees for Multi-Clauding
- [9.6] Build Phase Workflows

## PART 10: DEVOPS & DEPLOYMENT
- [10.1] Docker Configuration
- [10.2] GitHub Actions CI/CD
- [10.3] Deploy Previews

## PART 11: BEADS & SPEC KIT INTEGRATION
- [11.1] Beads Task Tracking
- [11.2] Spec Kit
- [11.3] Ruler for Validation

## PART 12: ENHANCED BETTER-T-STACK FORK PLAN
- [12.1] The Vision
- [12.2] Enhanced Wizard Flow
- [12.3] What Gets Scaffolded
- [12.4] Implementation Plan
- [12.5] Presets

## APPENDICES
- [A] Complete Setup Checklist
- [B] Quick Reference Cards
- [C] All Commands Reference
- [D] All Agents Reference
- [E] Troubleshooting Guide

---

# ?? SYSTEM STATISTICS

| Category | Count |
|----------|-------|
| **Total Document Lines** | 14,000+ |
| **Golden Rules** | 10 |
| **Discovery Questions** | 50+ |
| **Essential Docs** | 4 |
| **TECH Docs** | 17 |
| **Hooks** | 10 events |
| **Skills** | 4 (PBS) + 11 (plugins) |
| **Custom Subagents** | 3 essential + 24 (plugins) |
| **Slash Commands** | 25+ |
| **Plugins** | 3 recommended |
| **MCP Servers** | 5+ |
| **Visual Styles** | 5 |
| **Theme Presets** | 6 |
| **E2E Page Objects** | 4 |
| **GitHub Workflows** | 3 |
| **Productivity Tips** | 4 |

---

# ?? KEY URLS

| Resource | URL |
|----------|-----|
| shadcn Visual Builder | https://ui.shadcn.com/create |
| shadcn Themes | https://ui.shadcn.com/themes |
| shadcn Blocks | https://ui.shadcn.com/blocks |
| Theme Editor | https://tweakcn.com |
| AI Theme Generator | https://shadcnstudio.com |
| AI Components | https://v0.dev |
| Better-T-Stack | https://github.com/better-t-stack |
| Playwright Docs | https://playwright.dev |
| Keep a Changelog | https://keepachangelog.com |
| Avthar's Channel | https://youtube.com/@avtharai |

---

# ⚡ QUICK START

## For New Projects

```bash
# 1. Create Better-T-Stack project
bunx create-better-t-stack@latest my-app
cd my-app

# 2. Explore themes visually
# Open: https://ui.shadcn.com/create
# Pick your style, colors, font

# 3. Initialize with your choices
bunx shadcn@latest init

# 4. Add MCP for AI assistance
bunx shadcn@latest mcp init --client claude

# 5. Copy PBS system to project
mkdir -p docs/AI
cp PBS_MASTER_SYSTEM_V4.md docs/AI/

# 6. Install plugins
# In Claude Code: /plugin
# Enable: compounding-engineering, feature-dev, frontend-design

# 7. Run /init to analyze project
claude
> /init
```

## For Existing Projects

```bash
# 1. Add PBS documentation
mkdir -p docs/AI docs/TECH docs/REFERENCE docs/ADR docs/PRESETS
cp PBS_MASTER_SYSTEM_V4.md docs/AI/

# 2. Create essential docs
touch docs/ARCHITECTURE.md
touch docs/CHANGELOG.md
touch docs/PROJECT_STATUS.md

# 3. Configure MCP
bunx shadcn@latest mcp init --client claude

# 4. Run /init
claude
> /init
```

---

# PART 1: CORE PBS SYSTEM

## 1.1 Philosophy & Golden Rules

### The PBS Philosophy

> "Plan before you build. Build what you planned. Ship what you built."

PBS (Plan-Build-Ship) is a methodology for AI-assisted development that:
- Prevents scope creep
- Ensures quality
- Maintains documentation
- Enables session continuity

### The 10 Golden Rules

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE 10 GOLDEN RULES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. NEVER hallucinate packages, APIs, or syntax                            │
│     └── Always verify with docs/TECH/*.md or MCP                           │
│                                                                             │
│  2. NEVER modify files outside the current task scope                      │
│     └── Ask permission before touching unrelated files                     │
│                                                                             │
│  3. ALWAYS read CLAUDE.md and linked docs first                            │
│     └── Check PROJECT_STATUS.md for where we left off                      │
│                                                                             │
│  4. ALWAYS run tests before claiming completion                            │
│     └── Use Stop hook for automatic testing                                │
│                                                                             │
│  5. ALWAYS update documentation after changes                              │
│     └── Use /update-docs-and-commit                                        │
│                                                                             │
│  6. STOP and ask when uncertain                                            │
│     └── Don't guess, escalate to human                                     │
│                                                                             │
│  7. ONE task at a time                                                     │
│     └── Complete current task before starting new                          │
│                                                                             │
│  8. USE the best model for the job                                         │
│     └── Opus for planning, Sonnet for coding                               │
│                                                                             │
│  9. PRACTICE regression prevention                                         │
│     └── Tests, hooks, don't break what works                               │
│                                                                             │
│  10. THROW AWAY work that isn't working                                    │
│      └── Don't be afraid to restart                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1.2 The PBS Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PBS WORKFLOW                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────┐         ┌─────────┐         ┌─────────┐                      │
│   │  PLAN   │ ──────▶ │  BUILD  │ ──────▶ │  SHIP   │                      │
│   └─────────┘         └─────────┘         └─────────┘                      │
│       │                   │                   │                             │
│       ▼                   ▼                   ▼                             │
│   • Discover           • Implement         • Test                          │
│   • Design             • Test              • Document                      │
│   • Document           • Iterate           • Deploy                        │
│   • Estimate           • Review            • Monitor                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### PLAN Phase

**Goal:** Understand requirements, design solution, document plan

**Activities:**
1. Run `/init` to analyze project
2. Run `/discover` for requirements gathering
3. Use `@code-explorer` to understand existing code
4. Use `@code-architect` to design solution
5. Create/update PROJECT_STATUS.md with plan

**Model:** Use **Opus** for planning (higher accuracy)

**Outputs:**
- Updated PROJECT_STATUS.md
- Architecture decisions documented
- Clear scope definition

### BUILD Phase

**Goal:** Implement the planned solution

**Activities:**
1. Implement feature incrementally
2. Write tests alongside code
3. Run tests frequently (Stop hook helps)
4. Update CHANGELOG.md as you go

**Model:** Use **Sonnet** for implementation (cost-effective)

**Workflows:**
- **General Workflow** — Single feature, linear
- **Issue-based Workflow** — GitHub issues, tracked
- **Multi-agent Workflow** — Parallel with git worktrees

**Outputs:**
- Working code
- Passing tests
- Updated changelog

### SHIP Phase

**Goal:** Finalize, document, deploy

**Activities:**
1. Use `@code-reviewer` for quality review
2. Use `@frontend-tester` for E2E tests
3. Run `/update-docs-and-commit`
4. Create PR or deploy

**Outputs:**
- All tests passing
- Documentation updated
- Code deployed or PR created

---

## 1.3 Default Assumptions

When starting any Better-T-Stack project, assume:

### Tech Stack

| Layer | Default | Alternative |
|-------|---------|-------------|
| Runtime | Bun | Node |
| Package Manager | Bun | pnpm |
| Frontend | React + TanStack Router | Next.js |
| Backend | Hono | Express |
| API | oRPC | tRPC |
| Database | PostgreSQL + Drizzle | Turso + Drizzle |
| Auth | Better Auth | Clerk, Auth.js |
| UI | shadcn/ui + Tailwind v4 | - |
| Testing | Playwright + Bun test | Vitest |

### Project Structure

```
project-root/
├── apps/
│   ├── web/           # Frontend
│   └── server/        # Backend
├── packages/
│   ├── api/           # oRPC procedures
│   ├── auth/          # Better Auth
│   ├── db/            # Drizzle schema
│   └── env/           # Environment validation
├── docs/
│   ├── AI/            # PBS system
│   ├── TECH/          # Tech docs
│   ├── REFERENCE/     # Feature docs
│   └── PRESETS/       # Theme presets
├── e2e/               # E2E tests
├── .claude/           # Claude Code config
└── .beads/            # Task tracking
```

### Conventions

| Convention | Standard |
|------------|----------|
| Formatting | Biome |
| Commits | Conventional Commits |
| Branching | Feature branches |
| Testing | Test alongside code |
| Documentation | Keep updated |

---

## 1.4 Init Workflow & Scaffold Analysis

### The /init Command

When starting a session, `/init` should:

1. **Read CLAUDE.md** — Entry point
2. **Check PROJECT_STATUS.md** — Where we left off
3. **Analyze project structure** — What exists
4. **Detect tech stack** — What's being used
5. **Report findings** — Summary for human

### Scaffold Analysis

```bash
# What /init analyzes
├── package.json        → Dependencies, scripts
├── bts.jsonc          → Better-T-Stack config
├── components.json    → shadcn config
├── .mcp.json          → MCP servers
├── apps/              → Frontend and backend
├── packages/          → Shared packages
├── docs/              → Documentation state
└── e2e/               → Test setup
```

### /init Output

```
?? Project Analysis Complete

Project: [NAME]
Stack: Better-T-Stack (Bun + Hono + oRPC + Drizzle + Better Auth)
UI: shadcn/ui (Nova style, Zinc base, Blue accent)

Documentation Status:
✅ CLAUDE.md - Found
✅ docs/ARCHITECTURE.md - Found (last updated: 2025-01-05)
✅ docs/CHANGELOG.md - Found
⚠️  docs/PROJECT_STATUS.md - Outdated (3 days old)

Where We Left Off:
- Last working on: User authentication feature
- Phase 2: Core Features (45% complete)
- Immediate next step: Implement OAuth providers

Recommendations:
1. Update PROJECT_STATUS.md
2. Continue with OAuth implementation

Ready to continue? Run /status for details.
```

---

## 1.5 Stop Conditions & Escalation

### When to Stop and Ask

Claude should STOP and ask for human input when:

| Condition | Action |
|-----------|--------|
| Uncertain about requirements | Ask for clarification |
| Multiple valid approaches | Present options |
| About to modify unrelated files | Ask permission |
| Tests failing repeatedly | Escalate |
| Scope seems to be creeping | Confirm scope |
| Security-sensitive changes | Get approval |
| Breaking changes | Confirm impact |
| Missing dependencies | Ask before installing |
| Conflicting instructions | Ask which to follow |
| Task taking too long | Check in |

### Escalation Template

```markdown
## ⚠️ Need Human Input

**Situation:** [What's happening]

**Options:**
1. [Option A] — [Pros/Cons]
2. [Option B] — [Pros/Cons]

**My Recommendation:** [Which option and why]

**Waiting for:** Your decision before proceeding
```

---

# PART 2: DISCOVERY & DOCUMENTATION

## 2.1 Discovery Framework (50+ Questions)

### How to Use

Run `/discover` to start an interactive discovery session. Questions are organized by category.

### Project Vision (5 Questions)

```markdown
1. What is the primary purpose of this application?
2. Who are the target users?
3. What problem does this solve?
4. What does success look like?
5. What are the key differentiators?
```

### Technical Requirements (10 Questions)

```markdown
6. What database is being used? (PostgreSQL, Turso, etc.)
7. What authentication providers are needed? (Email, Google, GitHub, etc.)
8. Is real-time functionality required? (WebSockets, SSE)
9. What third-party integrations are needed?
10. What are the performance requirements?
11. What are the security requirements?
12. Is offline support needed? (PWA)
13. Is mobile app needed? (Expo)
14. Is desktop app needed? (Tauri)
15. What environments are needed? (dev, staging, prod)
```

### User Experience (10 Questions)

```markdown
16. What are the main user flows?
17. What pages/screens are needed?
18. What is the navigation structure?
19. Are there different user roles?
20. What accessibility requirements exist?
21. What devices need to be supported?
22. What is the expected traffic volume?
23. Are there internationalization requirements?
24. What is the tone of the UI? (Professional, playful, minimal)
25. Are there existing brand guidelines?
```

### Data & Content (10 Questions)

```markdown
26. What are the main data entities?
27. What are the relationships between entities?
28. What data needs to be seeded initially?
29. Is there existing data to migrate?
30. What are the data retention requirements?
31. What content needs to be managed?
32. Is a CMS needed?
33. Are there file upload requirements?
34. What size/type of files?
35. Where should files be stored? (R2, S3, etc.)
```

### Design & Theme (10 Questions) ✨ NEW

```markdown
36. What visual style is preferred? (Vega, Nova, Maia, Lyra, Mira)
37. What base color palette? (Neutral, Zinc, Slate, Stone)
38. What accent color? (Blue, Green, Orange, Violet, Rose)
39. What font family? (Inter, Figtree, Geist)
40. What icon library? (Lucide, Tabler)
41. What border radius preference? (None, Small, Default, Large)
42. Light mode, dark mode, or both?
43. Are there existing design mockups?
44. Any specific component requirements?
45. Any animations/transitions preferences?
```

### DevOps & Deployment (5 Questions)

```markdown
46. Where will this be deployed? (Vercel, Railway, VPS)
47. What CI/CD is needed? (GitHub Actions, GitLab CI)
48. Is Docker required?
49. What monitoring is needed? (Sentry, PostHog)
50. What is the deployment frequency?
```

### Project Management (5 Questions)

```markdown
51. What is the timeline?
52. What are the milestones?
53. How are tasks tracked? (GitHub Issues, Linear, Beads)
54. Who are the stakeholders?
55. What is the communication process?
```

---

## 2.2 The 4 Essential Documents

### Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      THE 4 ESSENTIAL DOCUMENTS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ARCHITECTURE.md          │  CHANGELOG.md                                  │
│   ─────────────────        │  ─────────────                                 │
│   • System design          │  • Version history                             │
│   • Data flow              │  • What was built                              │
│   • Components             │  • When it was built                           │
│   • API endpoints          │  • Issue references                            │
│                            │                                                │
│   Updated: Structural      │  Updated: Every commit                         │
│   changes                  │                                                │
│                            │                                                │
│   ─────────────────────────┼────────────────────────────────────────────── │
│                            │                                                │
│   PROJECT_STATUS.md        │  REFERENCE/*.md                                │
│   ─────────────────        │  ───────────────                               │
│   • Current phase          │  • Complex feature docs                        │
│   • Progress tracking      │  • Authentication flow                         │
│   • Where we left off      │  • Payment integration                         │
│   • Next steps             │  • Push notifications                          │
│                            │                                                │
│   Updated: Every session   │  Updated: New features                         │
│                            │                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Purpose of Each

| Document | Key Question | Updated When |
|----------|--------------|--------------|
| `ARCHITECTURE.md` | "How is this system designed?" | Structural changes |
| `CHANGELOG.md` | "What has been built?" | Every commit |
| `PROJECT_STATUS.md` | "Where did we leave off?" | Every session |
| `REFERENCE/*.md` | "How does [feature] work?" | New complex features |

---

## 2.3 Dynamic Documentation System

### Principle

Documentation should be:
- **Dynamic** — Generated from actual project analysis
- **Auto-updated** — Via `/update-docs-and-commit`
- **Living** — Always reflects current state

### What Triggers Updates

| Document | Update Triggers |
|----------|-----------------|
| ARCHITECTURE.md | New components, endpoints, schema changes |
| CHANGELOG.md | Any feature, fix, or change |
| PROJECT_STATUS.md | Session start/end, milestone completion |
| CLAUDE.md | Architecture, commands, env vars, issues |

### What Does NOT Trigger Updates

- Minor bug fixes (for CLAUDE.md)
- Code tweaks that don't affect structure
- Refactoring without functional changes

---

## 2.4 Documentation Linking Pattern

### The Pattern

CLAUDE.md is the **entry point** that links to detailed docs:

```
CLAUDE.md (entry point)
    │
    ├── project_spec.md              → Requirements, API specs
    ├── docs/ARCHITECTURE.md         → System design, data flow
    ├── docs/CHANGELOG.md            → Version history
    ├── docs/PROJECT_STATUS.md       → Current progress
    ├── docs/AI/PBS_MASTER_SYSTEM.md → AI methodology
    ├── docs/TECH/*.md               → Technology docs
    └── docs/REFERENCE/*.md          → Feature deep-dives
```

---

## 2.5 CLAUDE.md Template

```markdown
# CLAUDE.md

## Project Overview

[Project name] - [One-line description]

## Quick Start

\`\`\`bash
bun install
bun dev
\`\`\`

## Environment Variables

\`\`\`bash
# Required
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your_secret_here

# Optional
GEMINI_MODEL=gemini-3-pro-image-preview
\`\`\`

Copy `.env.example` to `.env.local` for local development.

## Documentation

- [Project Spec](project_spec.md) - Full requirements, API specs, tech details
- [Architecture](docs/ARCHITECTURE.md) - System design and data flow
- [Changelog](docs/CHANGELOG.md) - Version history
- [Project Status](docs/PROJECT_STATUS.md) - Current progress

### Feature References

- [Authentication](docs/REFERENCE/authentication.md) - How auth works
- [Payments](docs/REFERENCE/payments.md) - Payment flow structure

### Technology Docs

- [Bun](docs/TECH/bun.md) - Runtime and package manager
- [Hono](docs/TECH/hono.md) - Backend framework
- [oRPC](docs/TECH/orpc.md) - Type-safe API layer
- [Drizzle](docs/TECH/drizzle.md) - Database ORM
- [Better Auth](docs/TECH/better-auth.md) - Authentication
- [TanStack Router](docs/TECH/tanstack-router.md) - Frontend routing
- [shadcn/ui](docs/TECH/shadcn.md) - UI components
- [E2E Testing](docs/TECH/e2e-testing.md) - Playwright & Puppeteer

## Important Rules

1. Update files in the docs folder after major milestones and major additions
2. Use the `/update-docs-and-commit` slash command when making git commits
3. Always check PROJECT_STATUS.md to see where we left off
4. Reference ARCHITECTURE.md for system design decisions
5. Add REFERENCE docs for complex features

## Commands

| Command | Description |
|---------|-------------|
| `/init` | Analyze project structure |
| `/discover` | Start discovery process |
| `/status` | Show project status |
| `/ship` | Pre-deployment checklist |
| `/update-docs-and-commit` | Update docs and commit changes |
| `/create-worktrees` | Setup parallel development |

## Subagents

| Agent | Description |
|-------|-------------|
| `@retro-agent` | Run development retrospective |
| `@changelog-updater` | Update changelog entries |
| `@frontend-tester` | Run Playwright E2E tests |
| `@code-explorer` | Explore and understand codebase |
| `@code-architect` | Design system architecture |
| `@code-reviewer` | Review code quality |

## Stack

- **Frontend:** TanStack Router + React + shadcn/ui
- **Backend:** Hono + oRPC
- **Database:** Drizzle + PostgreSQL
- **Auth:** Better Auth
- **Testing:** Playwright + Puppeteer

## Theme

- **Style:** Nova
- **Base:** Zinc
- **Accent:** Blue
- **Font:** Inter
- **Icons:** Tabler
```

---

## 2.6 /update-docs-and-commit Command

### .claude/commands/update-docs-and-commit.md

```markdown
# /update-docs-and-commit

Update documentation based on actual code changes and commit everything.

## Usage

\`\`\`
/update-docs-and-commit [optional commit message or description]
\`\`\`

## What It Does

1. **Analyzes git changes** (status + diff)
2. **Updates docs/CHANGELOG.md** - adds entries for new features/fixes
3. **Updates docs/ARCHITECTURE.md** - only if structural changes occurred
4. **Updates docs/PROJECT_STATUS.md** - moves completed items, updates progress
5. **Updates CLAUDE.md** - only for relevant changes (see below)
6. **Stages and commits all changes**

The command is conservative by design - it only updates docs that genuinely need updating based on the actual code changes.

## When to Update CLAUDE.md

Update CLAUDE.md when there are relevant changes to:
- Project architecture or file structure
- New commands or scripts
- New environment variables
- New components or API endpoints
- Custom subagents or slash commands
- Known issues
- Testing procedures

Do NOT update CLAUDE.md for:
- Minor bug fixes
- Code tweaks that don't affect the documented structure

## Workflow

### Step 1: Understand What Changed

\`\`\`bash
git status
git diff --staged
git diff
git log --oneline -5
\`\`\`

### Step 2: Update CHANGELOG.md

Add entry under the current date:

\`\`\`markdown
## YYYY-MM-DD

### Added
- **[Feature name]**: [Description]
  - [Implementation detail with file path]

### Changed
- [What changed]

### Fixed
- [What was fixed]
\`\`\`

### Step 3: Update ARCHITECTURE.md (If Needed)

Only if:
- New components/files were added
- Data flow changed
- New API endpoints added
- Database schema changed

### Step 4: Update PROJECT_STATUS.md

Always update:
- "Where We Left Off" section
- Move completed items
- Update progress percentages
- Add new items to "In Progress" or "Planned"

### Step 5: Update CLAUDE.md (If Needed)

Only for structural changes per the rules above.

### Step 6: Stage and Commit

\`\`\`bash
git add .
git commit -m "[type]([scope]): [description]

- Updated CHANGELOG.md
- Updated PROJECT_STATUS.md
[- Updated ARCHITECTURE.md]
[- Updated CLAUDE.md]"
\`\`\`

## Commit Types

| Type | Use For |
|------|---------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation only |
| refactor | Code refactoring |
| test | Adding tests |
| chore | Maintenance |
```

# PART 3: CLAUDE CODE CONFIGURATION

## 3.1 Project Structure

### Complete .claude/ Directory

```
.claude/
├── agents/
│   ├── retro-agent.md
│   ├── changelog-updater.md
│   ├── frontend-tester.md
│   ├── code-reviewer.md
│   ├── test-runner.md
│   └── debugger.md
├── commands/
│   ├── init.md
│   ├── discover.md
│   ├── status.md
│   ├── ship.md
│   ├── update-docs-and-commit.md
│   ├── create-worktrees.md
│   ├── issues.md
│   └── theme.md
├── hooks/
│   ├── PreToolUse.sh
│   ├── PostToolUse.sh
│   ├── Stop.sh
│   ├── SessionStart.sh
│   ├── SessionEnd.sh
│   ├── PreCompact.sh
│   ├── SubagentStop.sh
│   ├── PermissionRequest.sh
│   ├── Notification.sh
│   └── UserPromptSubmit.sh
├── skills/
│   ├── pbs-workflow.md
│   ├── tech-docs.md
│   ├── beads-tracking.md
│   └── better-t-stack.md
├── settings.json
└── settings.local.json
```

---

## 3.2 OPERATOR.md Authority Model

### Purpose

OPERATOR.md defines what Claude is allowed to do in your project. It's the "rules of engagement."

### .claude/OPERATOR.md

```markdown
# Operator Instructions

## Authority Level

This project grants Claude the following authority:

### Allowed Without Asking
- Read any file in the project
- Write/edit files in designated directories
- Run tests
- Run linters and formatters
- Git operations (add, commit, branch)
- Install dev dependencies

### Requires Confirmation
- Install production dependencies
- Delete files
- Modify configuration files
- Database migrations
- Deployment operations

### Never Allowed
- Push to main/master directly
- Delete branches
- Modify .env files with real credentials
- Access external services without approval

## Designated Directories

Claude can freely modify:
- `apps/` - Application code
- `packages/` - Shared packages
- `e2e/` - Test files
- `docs/` - Documentation

Claude should ask before modifying:
- Root config files
- CI/CD workflows
- Docker files

## Response Style

- Be concise
- Show code, not just descriptions
- Ask clarifying questions when uncertain
- Report progress on long tasks
```

---

## 3.3 settings.json (Permissions)

### .claude/settings.json

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Edit",
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(bun:*)",
      "Bash(bunx:*)",
      "Bash(git:*)",
      "Bash(cat:*)",
      "Bash(ls:*)",
      "Bash(mkdir:*)",
      "Bash(cp:*)",
      "Bash(mv:*)",
      "Bash(grep:*)",
      "Bash(find:*)",
      "Bash(head:*)",
      "Bash(tail:*)",
      "Bash(wc:*)",
      "Bash(gh:*)",
      "Glob",
      "Grep"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Bash(sudo:*)",
      "Bash(chmod 777:*)",
      "Bash(curl|bash)",
      "Bash(wget|bash)"
    ]
  },
  "model": "opus",
  "theme": "dark",
  "autoApprove": {
    "read": true,
    "write": false,
    "execute": false
  }
}
```

---

## 3.4 Complete Hooks Reference (10 Events)

### Overview

| Hook Event | When It Fires | Example Use Case |
|------------|---------------|------------------|
| **PreToolUse** | Before any tool is executed | Block dangerous commands |
| **PostToolUse** | After tool completes successfully | Run linters, format code |
| **PermissionRequest** | When user sees permission dialog | Auto allow/deny patterns |
| **Notification** | When Claude sends notifications | Slack/Discord/SMS alerts |
| **UserPromptSubmit** | When user submits prompts | Validate prompts, inject context |
| **Stop** | When Claude finishes responding | Check tests, run validations |
| **SubagentStop** | When subagent finishes | Same as stop, but for agents |
| **PreCompact** | Before context compaction | Save transcript snapshot |
| **SessionStart** | When a session begins/resumes | Set env vars, load context |
| **SessionEnd** | When a session ends | Logging, clean up |

### Hook Implementations

#### PreToolUse.sh — Block Dangerous Commands

```bash
#!/bin/bash
# .claude/hooks/PreToolUse.sh

TOOL_NAME="$1"
TOOL_INPUT="$2"

# Block rm -rf /
if [[ "$TOOL_INPUT" == *"rm -rf /"* ]]; then
  echo "BLOCKED: Dangerous command detected"
  exit 1
fi

# Block force push to main
if [[ "$TOOL_INPUT" == *"git push"*"--force"*"main"* ]]; then
  echo "BLOCKED: Force push to main not allowed"
  exit 1
fi

# Block deleting .env
if [[ "$TOOL_INPUT" == *"rm"*".env"* ]]; then
  echo "BLOCKED: Cannot delete .env files"
  exit 1
fi

exit 0
```

#### PostToolUse.sh — Auto-format After Edits

```bash
#!/bin/bash
# .claude/hooks/PostToolUse.sh

TOOL_NAME="$1"
FILE_PATH="$2"

if [[ "$TOOL_NAME" == "write" || "$TOOL_NAME" == "edit" ]]; then
  # Run Biome for TypeScript/JavaScript files
  if [[ "$FILE_PATH" == *.ts || "$FILE_PATH" == *.tsx || "$FILE_PATH" == *.js || "$FILE_PATH" == *.jsx ]]; then
    npx biome check --fix "$FILE_PATH" 2>/dev/null
  fi
fi

exit 0
```

#### Stop.sh — Auto-run Tests ⭐ IMPORTANT

```bash
#!/bin/bash
# .claude/hooks/Stop.sh
# This hook auto-runs tests when Claude finishes

echo "?? Running tests..."

# Type check
npm run typecheck 2>/dev/null
TYPECHECK_EXIT=$?

# Unit tests
npm test 2>/dev/null
TEST_EXIT=$?

# Report results
if [ $TYPECHECK_EXIT -ne 0 ] || [ $TEST_EXIT -ne 0 ]; then
  echo "❌ Tests failed! Claude should fix these issues."
  exit 1
fi

echo "✅ All tests passed!"
exit 0
```

#### SessionStart.sh — Session Setup

```bash
#!/bin/bash
# .claude/hooks/SessionStart.sh

# Load environment variables
if [[ -f ".env.local" ]]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# Check if docs are outdated
if [[ -f "docs/PROJECT_STATUS.md" ]]; then
  LAST_MODIFIED=$(stat -f %m "docs/PROJECT_STATUS.md" 2>/dev/null || stat -c %Y "docs/PROJECT_STATUS.md")
  NOW=$(date +%s)
  DIFF=$((NOW - LAST_MODIFIED))
  
  # Warn if not updated in 24 hours
  if [[ $DIFF -gt 86400 ]]; then
    echo "⚠️  PROJECT_STATUS.md not updated in 24+ hours"
  fi
fi

echo "?? Session started. Run /init to check project status."
exit 0
```

#### PreCompact.sh — Save Transcript

```bash
#!/bin/bash
# .claude/hooks/PreCompact.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TRANSCRIPT_DIR=".claude/transcripts"

mkdir -p "$TRANSCRIPT_DIR"

echo "Context compaction at $TIMESTAMP" >> "$TRANSCRIPT_DIR/compaction_log.txt"
echo "?? Transcript snapshot saved"

exit 0
```

#### PermissionRequest.sh — Notifications

```bash
#!/bin/bash
# .claude/hooks/PermissionRequest.sh

# Desktop notification (macOS)
osascript -e 'display notification "Claude needs your permission" with title "Claude Code"' 2>/dev/null

# Or Slack notification
# WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
# curl -X POST -H 'Content-type: application/json' \
#   --data '{"text":"?? Claude Code needs your permission!"}' \
#   "$WEBHOOK_URL"

exit 0
```

#### SessionEnd.sh — Cleanup

```bash
#!/bin/bash
# .claude/hooks/SessionEnd.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE=".claude/session_log.txt"

echo "Session ended: $TIMESTAMP" >> "$LOG_FILE"
echo "?? Remember: Run /update-docs-and-commit if you made changes"

exit 0
```

---

## 3.5 Skills

### pbs-workflow.md

```markdown
# PBS Workflow Skill

## When to Use
This skill is active for all development tasks.

## The Workflow

1. **PLAN** — Understand before building
   - Read CLAUDE.md and PROJECT_STATUS.md
   - Use @code-explorer if needed
   - Design with @code-architect if needed

2. **BUILD** — Implement incrementally
   - One task at a time
   - Test as you go
   - Update changelog

3. **SHIP** — Finalize and document
   - Run full test suite
   - Update all documentation
   - Commit with /update-docs-and-commit

## Key Rules
- Never skip the planning phase
- Always update documentation
- Test before claiming done
```

### tech-docs.md

```markdown
# Tech Docs Skill

## When to Use
When implementing features using the Better-T-Stack.

## Available Docs

Check docs/TECH/ for:
- bun.md — Runtime commands and APIs
- hono.md — Backend routing and middleware
- orpc.md — Type-safe API procedures
- drizzle.md — Database schema and queries
- better-auth.md — Authentication setup
- tanstack-router.md — Frontend routing
- shadcn.md — UI components
- e2e-testing.md — Playwright patterns

## Rule
ALWAYS check the relevant TECH doc before implementing.
Never guess at APIs or syntax.
```

### beads-tracking.md

```markdown
# Beads Task Tracking Skill

## When to Use
When managing tasks and tracking progress.

## Beads Location
`.beads/` directory in project root

## Commands
- Create bead: Document task in .beads/
- Update bead: Mark progress
- Complete bead: Move to completed

## Integration
Beads work with git worktrees for parallel development.
```

### better-t-stack.md

```markdown
# Better-T-Stack Skill

## When to Use
When building with the Better-T-Stack scaffold.

## Stack Components

| Component | Purpose |
|-----------|---------|
| Bun | Runtime + package manager |
| Hono | Backend framework |
| oRPC | Type-safe API |
| Drizzle | Database ORM |
| Better Auth | Authentication |
| TanStack Router | Frontend routing |
| shadcn/ui | UI components |
| Tailwind v4 | Styling |

## Key Patterns
- Monorepo with apps/ and packages/
- Shared types via packages/api
- Environment validation via packages/env
```

---

## 3.6 Subagents (3 Essential + More)

### Slash Commands vs Subagents

| Aspect | Slash Commands | Subagents |
|--------|----------------|-----------|
| **Definition** | Shortcut to prompt/task | Specialized agent for specific task |
| **Best used for** | Quick tasks, automations | Parallel work, specialized tasks |
| **Context window** | Same context window | Fork of context window |
| **Execution mode** | Synchronous in current session | Async, can run in parallel |
| **Examples** | `/commit`, `/run-tests` | `@retro-agent`, `@frontend-tester` |

**Rule:** Use subagents when you need isolated context (logs, reflection output).

### The 3 Essential Custom Subagents

#### 1. @retro-agent — Continuous Improvement

```markdown
---
name: retro-agent
description: Run development retrospective. Analyzes session, identifies improvements, updates documentation with learnings.
tools: Read, Write, Edit, Bash(git:*)
model: sonnet
---

# Development Retrospective Agent

You are a specialized agent responsible for conducting development retrospectives and continuous improvement.

## Your Mission

Analyze the current development session, identify what went well and what could be improved, then update project documentation with actionable learnings.

## Process

### Step 1: Gather Context
- Read docs/PROJECT_STATUS.md
- Read docs/ARCHITECTURE.md
- Read docs/CHANGELOG.md
- Run `git log --oneline -20`

### Step 2: Analyze
1. What Went Well
2. What Could Be Improved
3. Key Findings (Is CLAUDE.md outdated?)

### Step 3: Generate Improvements
Create actionable proposals in a table.

### Step 4: Apply Improvements
After approval, update:
- CLAUDE.md
- docs/ARCHITECTURE.md
- docs/PROJECT_STATUS.md

### Step 5: Report Summary

## Key Principle
> Every retrospective should make the next session easier.
```

#### 2. @changelog-updater — Documentation Updates

```markdown
---
name: changelog-updater
description: Updates changelog entries when features are completed or changes are made. Use after completing a feature, fixing bugs, or making significant changes.
tools: Read, Write, Edit, Bash(git:*)
model: sonnet
---

# Changelog Updater Subagent

You are a specialized agent responsible for maintaining accurate changelog entries.

## Your Mission

Keep `docs/CHANGELOG.md` up-to-date with clear, user-focused entries following Keep a Changelog format.

## Changelog Location
`docs/CHANGELOG.md`

## Format

\`\`\`markdown
## YYYY-MM-DD

### Added
- **[Feature Name]**: [User-focused description]
  - [Implementation detail with file path]

### Changed
- **[Change]**: [Description]

### Fixed
- **[Bug]**: [What was fixed]
\`\`\`

## Process

1. Run `git status` and `git diff`
2. Categorize changes (Added, Changed, Fixed, Removed)
3. Write user-focused entries
4. Include file paths for traceability
5. Insert under correct date section
```

#### 3. @frontend-tester — E2E Testing

```markdown
---
name: frontend-tester
description: Runs Playwright tests for frontend functionality and reports results. Auto-detects Playwright setup and offers to initialize if missing.
tools: Read, Write, Edit, Bash(npm:*), Bash(npx:*), Glob, Grep
model: sonnet
---

# Frontend Testing Subagent

You are a specialized agent responsible for running and managing Playwright E2E tests.

## Your Mission

Run Playwright tests, analyze results, and report findings without cluttering the main development context.

## Commands

\`\`\`bash
npx playwright test                    # Run all tests
npx playwright test tests/auth.spec.ts # Run specific file
npx playwright test --ui               # UI mode
npx playwright test --headed           # Visible browser
npx playwright test -g "login flow"    # By name
npx playwright test --debug            # Debug mode
\`\`\`

## Process

1. Check Playwright is installed
2. Run requested tests
3. Analyze results
4. Report summary with pass/fail counts
5. For failures, suggest fixes

## Report Format

\`\`\`
## Test Results Summary

**Status:** ✅ All Passed / ❌ Failures Detected

| Metric | Count |
|--------|-------|
| Total | X |
| Passed | X |
| Failed | X |

### Failures (if any)
**Test:** [name]
**Error:** [message]
**Suggested Fix:** [recommendation]
\`\`\`
```

### Additional Subagents

#### @code-reviewer

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and best practices.
tools: Read, Glob, Grep
model: sonnet
---

# Code Reviewer Agent

Review code for:
- Code quality and readability
- Security vulnerabilities
- Performance issues
- Best practices adherence
- Test coverage

Output a structured review with severity ratings.
```

#### @test-runner

```markdown
---
name: test-runner
description: Runs and analyzes test suites.
tools: Read, Bash(npm:*), Bash(bun:*)
model: sonnet
---

# Test Runner Agent

Run tests and provide detailed analysis:
- Unit tests
- Integration tests
- Coverage reports
- Failure analysis
```

#### @debugger

```markdown
---
name: debugger
description: Helps debug issues by analyzing errors and suggesting fixes.
tools: Read, Write, Edit, Bash(*)
model: opus
---

# Debugger Agent

Debug issues by:
- Analyzing error messages
- Tracing code paths
- Identifying root causes
- Suggesting fixes
- Verifying fixes work
```

---

## 3.7 Slash Commands

### All PBS Commands

| Command | Purpose |
|---------|---------|
| `/init` | Analyze project, check status |
| `/discover` | Run discovery questionnaire |
| `/status` | Quick project status view |
| `/ship` | Pre-deployment checklist |
| `/update-docs-and-commit` | Update docs and commit |
| `/create-worktrees` | Setup parallel development |
| `/issues` | Create GitHub issues from plan |
| `/theme` | Theme configuration |

### /init

```markdown
# /init

Analyze project structure and prepare for development.

## What It Does

1. Reads CLAUDE.md
2. Checks PROJECT_STATUS.md for where we left off
3. Analyzes project structure
4. Detects tech stack
5. Reports findings and recommendations

## Output

Summary of project state, documentation status, and recommended next steps.
```

### /status

```markdown
# /status

Quick view of project status.

## What It Does

1. Reads PROJECT_STATUS.md
2. Shows current phase and progress
3. Shows "Where We Left Off"
4. Shows immediate next steps

## Output

Concise status report.
```

### /ship

```markdown
# /ship

Pre-deployment checklist.

## Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Environment variables documented
- [ ] No console.log statements
- [ ] No hardcoded secrets
- [ ] PR description written

## What It Does

Runs through checklist and reports any issues.
```

### /create-worktrees

```markdown
# /create-worktrees

Create git worktrees for parallel development.

## Usage

\`\`\`
/create-worktrees [branch-names...]
\`\`\`

## Example

\`\`\`
/create-worktrees feature-auth feature-dashboard feature-api
\`\`\`

## What It Does

1. Creates `.trees/` directory
2. For each branch: creates worktree in `.trees/[branch]/`
3. Outputs instructions for opening each in separate terminal
```

### /issues

```markdown
# /issues

Create GitHub issues from a plan file.

## Usage

\`\`\`
/issues [plan-file.md]
\`\`\`

## What It Does

1. Reads plan file
2. Parses into individual issues
3. Uses `gh` CLI to create issues
4. Assigns milestones and labels
```

---

# PART 4: PLUGINS & MCP SERVERS

## 4.1 Essential Plugins (3 Recommended)

### Installation

```bash
# In Claude Code
/plugin

# Search and enable each plugin
# Then restart Claude Code
```

### 1. compounding-engineering ⭐

**Author:** Kieran Klaassen  
**Registry:** every-marketplace

| Type | Count |
|------|-------|
| Agents | 24 |
| Commands | 16 |
| Skills | 11 |
| MCP Servers | 2 |

**Key Commands:**
- `/changelog` — Generate changelog entries
- `/plan_review` — Review implementation plans
- `/prime` — Prime context for session
- `/resolve_parallel` — Resolve issues in parallel
- `/resolve_todo_parallel` — Resolve TODOs in parallel
- `/triage` — Triage issues/bugs

**Philosophy:**
> "Each unit of engineering work should make subsequent units of work easier—not harder."

### 2. feature-dev ⭐

**Author:** Sid Bidasaria  
**Registry:** claude-code-plugins

| Type | Components |
|------|------------|
| Commands | `feature-dev` |
| Agents | `code-architect`, `code-explorer`, `code-reviewer` |

**Usage:**
```bash
/feature-dev                    # Start guided workflow
@code-explorer analyze auth flow
@code-architect design payment integration
@code-reviewer review recent changes
```

### 3. frontend-design ⭐

**Author:** Prithvi Rajasekaran  
**Registry:** claude-code-plugins

| Type | Components |
|------|------------|
| Skills | `frontend-design` |

**Provides:**
- UI/UX design guidance
- Component architecture
- Design system implementation
- Accessibility considerations

---

## 4.2 MCP Servers for Your Stack

### .mcp.json Configuration

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"]
    },
    "postgres": {
      "command": "npx",
      "args": ["@anthropic/mcp-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "github": {
      "command": "npx",
      "args": ["@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### MCP Server Reference

| MCP | Purpose | When to Use |
|-----|---------|-------------|
| **shadcn** | Component access | Adding UI components |
| **context7** | Documentation lookup | Checking library docs |
| **playwright** | Browser automation | E2E testing, visual tests |
| **postgres** | Database queries | Direct DB operations |
| **github** | Issues, PRs | Project management |
| **supabase** | Supabase operations | If using Supabase |

---

## 4.3 Plugin + PBS Synergy

### Combined Workflow

```
SESSION START
    │
    ├── /prime (compounding-engineering)
    │   └── Prime context for the session
    │
    ├── /init (PBS)
    │   └── Check PROJECT_STATUS.md
    │
PLAN PHASE
    │
    ├── @code-explorer (feature-dev)
    │   └── Understand existing codebase
    │
    ├── @code-architect (feature-dev)
    │   └── Design the feature
    │
    ├── /plan_review (compounding-engineering)
    │   └── Review the plan
    │
BUILD PHASE
    │
    ├── Implement feature
    │   └── frontend-design skill auto-activates
    │
    ├── /resolve_todo_parallel (compounding-engineering)
    │   └── Resolve TODOs in parallel
    │
SHIP PHASE
    │
    ├── @code-reviewer (feature-dev)
    │   └── Review code quality
    │
    ├── @frontend-tester (PBS)
    │   └── Run E2E tests
    │
    ├── /changelog (compounding-engineering)
    │   └── Generate changelog
    │
    ├── /update-docs-and-commit (PBS)
    │   └── Update all docs and commit
    │
SESSION END
    │
    └── @retro-agent (PBS)
        └── Retrospective and improvements
```

# PART 5: TECH DOCUMENTATION

## 5.1 Better-T-Stack Overview

### What is Better-T-Stack?

A modern, type-safe full-stack TypeScript starter with:
- **Bun** — Runtime and package manager
- **Hono** — Fast, lightweight backend
- **oRPC** — Type-safe API layer
- **Drizzle** — Type-safe ORM
- **Better Auth** — Flexible authentication
- **TanStack Router** — Type-safe routing
- **shadcn/ui** — Beautiful components
- **Tailwind v4** — Utility-first CSS

### Why Better-T-Stack?

| Benefit | How |
|---------|-----|
| **Type Safety** | End-to-end types from DB to UI |
| **Performance** | Bun runtime, optimized builds |
| **DX** | Great tooling, hot reload |
| **Flexibility** | Modular, swap parts easily |
| **Modern** | Latest patterns and practices |

---

## 5.2 The 17 TECH Docs

Every Better-T-Stack project should have these docs in `docs/TECH/`:

| # | Doc | Purpose |
|---|-----|---------|
| 1 | bun.md | Runtime, package manager, test runner |
| 2 | hono.md | Backend framework, routing, middleware |
| 3 | orpc.md | Type-safe API procedures |
| 4 | drizzle.md | Database ORM, schema, migrations |
| 5 | better-auth.md | Authentication setup |
| 6 | tanstack-router.md | Frontend routing |
| 7 | tanstack-query.md | Data fetching, caching |
| 8 | shadcn.md | UI components, theming |
| 9 | tailwind.md | CSS utilities, v4 features |
| 10 | biome.md | Linting, formatting |
| 11 | typescript.md | TS configuration, patterns |
| 12 | monorepo.md | Workspace structure |
| 13 | env.md | Environment variables |
| 14 | docker.md | Containerization |
| 15 | testing.md | Unit testing with Bun |
| 16 | e2e-testing.md | Playwright & Puppeteer |
| 17 | deployment.md | Vercel, Railway, Docker |

---

## 5.3 TECH Doc Templates

### docs/TECH/bun.md

```markdown
# Bun

## Overview
Bun is an all-in-one JavaScript runtime & toolkit.

## Commands

| Command | Purpose |
|---------|---------|
| \`bun install\` | Install dependencies |
| \`bun add [pkg]\` | Add dependency |
| \`bun add -d [pkg]\` | Add dev dependency |
| \`bun remove [pkg]\` | Remove dependency |
| \`bun run [script]\` | Run package.json script |
| \`bun dev\` | Start dev server |
| \`bun build\` | Build for production |
| \`bun test\` | Run tests |

## Workspaces

In \`package.json\`:
\`\`\`json
{
  "workspaces": ["apps/*", "packages/*"]
}
\`\`\`

## Testing

\`\`\`typescript
import { describe, test, expect } from "bun:test";

describe("math", () => {
  test("adds", () => {
    expect(1 + 1).toBe(2);
  });
});
\`\`\`

## Environment Variables

\`\`\`typescript
const apiKey = Bun.env.API_KEY;
\`\`\`
```

### docs/TECH/hono.md

```markdown
# Hono

## Overview
Hono is a fast, lightweight web framework for the Edge.

## Basic Setup

\`\`\`typescript
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello!"));
app.get("/json", (c) => c.json({ message: "Hello!" }));

export default app;
\`\`\`

## Middleware

\`\`\`typescript
import { cors } from "hono/cors";
import { logger } from "hono/logger";

app.use("*", logger());
app.use("/api/*", cors());
\`\`\`

## Route Groups

\`\`\`typescript
const api = new Hono();
api.get("/users", getUsers);
api.post("/users", createUser);

app.route("/api", api);
\`\`\`

## Context Methods

| Method | Purpose |
|--------|---------|
| \`c.text()\` | Return text response |
| \`c.json()\` | Return JSON response |
| \`c.html()\` | Return HTML response |
| \`c.redirect()\` | Redirect to URL |
| \`c.req.param()\` | Get route param |
| \`c.req.query()\` | Get query param |
| \`c.req.json()\` | Parse JSON body |
```

### docs/TECH/orpc.md

```markdown
# oRPC

## Overview
oRPC is a type-safe API layer for TypeScript.

## Define Procedures

\`\`\`typescript
// packages/api/src/router.ts
import { orpc } from "@orpc/server";
import { z } from "zod";

export const router = orpc.router({
  users: {
    list: orpc
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return db.query.users.findMany({ limit: input.limit });
      }),
      
    create: orpc
      .input(z.object({ name: z.string(), email: z.string().email() }))
      .mutation(async ({ input }) => {
        return db.insert(users).values(input).returning();
      }),
  },
});

export type Router = typeof router;
\`\`\`

## Client Usage

\`\`\`typescript
// apps/web/src/lib/api.ts
import { createORPCClient } from "@orpc/client";
import type { Router } from "@repo/api";

export const api = createORPCClient<Router>({
  baseURL: "/api/rpc",
});

// Usage
const users = await api.users.list({ limit: 10 });
\`\`\`

## With TanStack Query

\`\`\`typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.users.list({}),
  });
}

function useCreateUser() {
  return useMutation({
    mutationFn: (data) => api.users.create(data),
  });
}
\`\`\`
```

### docs/TECH/drizzle.md

```markdown
# Drizzle ORM

## Overview
Drizzle is a type-safe ORM for TypeScript.

## Schema Definition

\`\`\`typescript
// packages/db/src/schema.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: uuid("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});
\`\`\`

## Queries

\`\`\`typescript
import { db } from "./client";
import { users, posts } from "./schema";
import { eq } from "drizzle-orm";

// Select all
const allUsers = await db.select().from(users);

// Select with where
const user = await db.select().from(users).where(eq(users.id, id));

// Insert
const newUser = await db.insert(users).values({ name, email }).returning();

// Update
await db.update(users).set({ name }).where(eq(users.id, id));

// Delete
await db.delete(users).where(eq(users.id, id));

// Relations
const postsWithAuthor = await db.query.posts.findMany({
  with: { author: true },
});
\`\`\`

## Migrations

\`\`\`bash
# Generate migration
bunx drizzle-kit generate

# Push to database
bunx drizzle-kit push

# Open studio
bunx drizzle-kit studio
\`\`\`
```

### docs/TECH/better-auth.md

```markdown
# Better Auth

## Overview
Better Auth is a flexible authentication library.

## Server Setup

\`\`\`typescript
// packages/auth/src/index.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
\`\`\`

## Client Setup

\`\`\`typescript
// apps/web/src/lib/auth-client.ts
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();

// Sign up
await authClient.signUp.email({ email, password, name });

// Sign in
await authClient.signIn.email({ email, password });

// Sign in with OAuth
await authClient.signIn.social({ provider: "google" });

// Sign out
await authClient.signOut();

// Get session
const session = await authClient.getSession();
\`\`\`

## Protected Routes

\`\`\`typescript
// middleware.ts
import { auth } from "@repo/auth";

export async function authMiddleware(c, next) {
  const session = await auth.api.getSession({ headers: c.req.headers });
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("session", session);
  return next();
}
\`\`\`
```

### docs/TECH/tanstack-router.md

```markdown
# TanStack Router

## Overview
TanStack Router is a type-safe router for React.

## Route Definition

\`\`\`typescript
// routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav>{/* Navigation */}</nav>
      <Outlet />
    </div>
  ),
});
\`\`\`

\`\`\`typescript
// routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <div>Home</div>;
}
\`\`\`

## Route Parameters

\`\`\`typescript
// routes/users/$userId.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();
  return <div>User: {userId}</div>;
}
\`\`\`

## Data Loading

\`\`\`typescript
export const Route = createFileRoute("/users")({
  loader: async () => {
    return api.users.list({});
  },
  component: UsersPage,
});

function UsersPage() {
  const users = Route.useLoaderData();
  return <UserList users={users} />;
}
\`\`\`

## Navigation

\`\`\`typescript
import { Link, useNavigate } from "@tanstack/react-router";

// Link component
<Link to="/users/$userId" params={{ userId: "123" }}>
  View User
</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate({ to: "/users/$userId", params: { userId: "123" } });
\`\`\`
```

---

# PART 6: E2E TESTING

## 6.1 Dual Framework Strategy

### Why Both Playwright and Puppeteer?

| Framework | Best For |
|-----------|----------|
| **Playwright** | E2E tests, cross-browser, CI/CD |
| **Puppeteer** | Chrome-specific, PDF generation, screenshots |

### Installation

```bash
# Playwright
bun add -d @playwright/test
bunx playwright install

# Puppeteer
bun add -d puppeteer
```

---

## 6.2 Page Object Model

### Structure

```
e2e/
├── fixtures/
│   ├── auth.fixture.ts
│   └── db.fixture.ts
├── pages/
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   └── settings.page.ts
├── tests/
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   └── settings.spec.ts
├── utils/
│   └── helpers.ts
└── playwright.config.ts
```

### Base Page

```typescript
// e2e/pages/base.page.ts
import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async goto(path: string) {
    await this.page.goto(path);
  }
  
  async waitForLoad() {
    await this.page.waitForLoadState("networkidle");
  }
  
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
```

### Login Page

```typescript
// e2e/pages/login.page.ts
import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  // Locators
  readonly emailInput = this.page.getByTestId("email-input");
  readonly passwordInput = this.page.getByTestId("password-input");
  readonly submitButton = this.page.getByTestId("login-submit");
  readonly errorMessage = this.page.getByTestId("login-error");
  readonly googleButton = this.page.getByTestId("google-login");
  
  constructor(page: Page) {
    super(page);
  }
  
  async goto() {
    await super.goto("/login");
  }
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  
  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
  
  async expectRedirectToDashboard() {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }
}
```

### Dashboard Page

```typescript
// e2e/pages/dashboard.page.ts
import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage {
  readonly welcomeMessage = this.page.getByTestId("welcome-message");
  readonly userMenu = this.page.getByTestId("user-menu");
  readonly logoutButton = this.page.getByTestId("logout-button");
  readonly statsCard = this.page.getByTestId("stats-card");
  
  constructor(page: Page) {
    super(page);
  }
  
  async goto() {
    await super.goto("/dashboard");
  }
  
  async expectWelcome(name: string) {
    await expect(this.welcomeMessage).toContainText(name);
  }
  
  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }
}
```

---

## 6.3 Test Fixtures

### Auth Fixture

```typescript
// e2e/fixtures/auth.fixture.ts
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";

type AuthFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: DashboardPage;
};

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  
  authenticatedPage: async ({ page, loginPage, dashboardPage }, use) => {
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!
    );
    await dashboardPage.goto();
    await use(dashboardPage);
  },
});

export { expect } from "@playwright/test";
```

---

## 6.4 Test Examples

### Auth Tests

```typescript
// e2e/tests/auth.spec.ts
import { test, expect } from "../fixtures/auth.fixture";

test.describe("Authentication", () => {
  test("should login with valid credentials", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("test@example.com", "password123");
    await loginPage.expectRedirectToDashboard();
  });
  
  test("should show error with invalid credentials", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("wrong@example.com", "wrongpassword");
    await loginPage.expectError("Invalid credentials");
  });
  
  test("should logout successfully", async ({ authenticatedPage }) => {
    await authenticatedPage.logout();
    await expect(authenticatedPage.page).toHaveURL(/\/login/);
  });
});
```

---

## 6.5 Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/tests",
  outputDir: "./e2e/results",
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ["html", { outputFolder: "./e2e/report" }],
    ["json", { outputFile: "./e2e/results.json" }],
  ],
  
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  
  webServer: {
    command: "bun dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

---

# PART 7: SHADCN/UI V4 INTEGRATION

## 7.1 What's New in v4

### Major Changes

| Feature | v3 | v4 |
|---------|----|----|
| Tailwind | v3 | v4 |
| CSS Variables | Limited | Native support |
| Theming | Manual | Visual builder |
| MCP Support | No | Yes |
| Styles | 1 (New York) | 5 (Vega, Nova, etc.) |

### New Features

- **Visual Theme Builder** — ui.shadcn.com/create
- **5 Visual Styles** — Vega, Nova, Maia, Lyra, Mira
- **MCP Integration** — AI can add/modify components
- **Improved Theming** — Easier customization

---

## 7.2 Official shadcn MCP Server

### Setup

```bash
# Initialize MCP for Claude
bunx shadcn@latest mcp init --client claude
```

### What It Enables

Claude can:
- Add components directly
- Modify components
- Access component documentation
- Apply themes

### MCP Commands in Claude

```
// Claude can now run:
"Add the Button component"
"Add Card, Dialog, and Form components"
"Show me the shadcn docs for Select"
```

---

## 7.3 The 5 Visual Styles

### Overview

| Style | Character | Best For |
|-------|-----------|----------|
| **Vega** | Bold, high-contrast | Statements, creative |
| **Nova** | Soft, rounded | Friendly, approachable |
| **Maia** | Sharp, minimal | Professional, clean |
| **Lyra** | Warm, organic | Content-heavy |
| **Mira** | Crisp, balanced | SaaS, dashboards |

### Visual Characteristics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE 5 VISUAL STYLES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  VEGA          NOVA          MAIA          LYRA          MIRA              │
│  ─────         ─────         ─────         ─────         ─────             │
│  Bold          Soft          Sharp         Warm          Crisp             │
│  High contrast Rounded       Minimal       Organic       Balanced          │
│  Striking      Friendly      Professional  Natural       Refined           │
│                                                                             │
│  Perfect for:  Perfect for:  Perfect for:  Perfect for:  Perfect for:      │
│  • Portfolios  • Consumer    • Enterprise  • Blogs       • SaaS            │
│  • Creative    • Social      • Corporate   • Publishing  • Dashboards      │
│  • Marketing   • E-commerce  • Finance     • Magazines   • Admin panels    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7.4 Theme Customization

### Base Colors

| Name | Character |
|------|-----------|
| Neutral | True gray |
| Zinc | Cool gray |
| Slate | Blue-gray |
| Stone | Warm gray |

### Accent Colors

| Color | Hex | Use For |
|-------|-----|---------|
| Blue | #3B82F6 | Trust, professional |
| Green | #22C55E | Success, growth |
| Orange | #F97316 | Energy, action |
| Violet | #8B5CF6 | Creative, premium |
| Rose | #F43F5E | Bold, attention |

### Fonts

| Font | Character |
|------|-----------|
| Inter | Clean, versatile |
| Figtree | Friendly, geometric |
| Geist | Modern, technical |
| Outfit | Rounded, warm |
| Source Serif | Editorial |

### Theme JSON Structure

```json
{
  "style": "nova",
  "base": "zinc",
  "accent": "blue",
  "font": {
    "heading": "Inter",
    "body": "Inter"
  },
  "radius": "0.5",
  "icons": "tabler"
}
```

---

## 7.5 shadcn Integration Workflow

### Step 1: Explore Visually

```
https://ui.shadcn.com/create
├── Pick a style (Vega, Nova, etc.)
├── Choose base color
├── Choose accent color
├── Preview components
└── Export configuration
```

### Step 2: Initialize

```bash
bunx shadcn@latest init

# Prompts:
# - Style: nova
# - Base color: zinc  
# - CSS variables: yes
# - Tailwind config: tailwind.config.ts
# - Components location: @/components/ui
```

### Step 3: Add Components

```bash
bunx shadcn@latest add button
bunx shadcn@latest add card dialog form input
```

### Step 4: MCP for AI

```bash
bunx shadcn@latest mcp init --client claude
```

---

# PART 8: VISUAL DESIGN WORKFLOW

## 8.1 Visual Builder

### URL
**https://ui.shadcn.com/create**

### Features
- Real-time preview
- All 5 styles
- All color options
- Font selection
- Export to JSON/CLI

---

## 8.2 Explore → Pick → Apply Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VISUAL DESIGN WORKFLOW                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   EXPLORE                    PICK                      APPLY                │
│   ───────                    ────                      ─────                │
│                                                                             │
│   ui.shadcn.com/create       Save preset              bunx shadcn init     │
│   tweakcn.com                Export JSON              Add components        │
│   shadcnstudio.com                                    MCP integration       │
│   v0.dev                                                                    │
│                                                                             │
│        │                         │                         │                │
│        ▼                         ▼                         ▼                │
│   Try all 5 styles          Save to                  Initialize project    │
│   Try color combos          docs/PRESETS/            Use saved preset      │
│   Preview components                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8.3 Preset System

### docs/PRESETS/saas-dashboard.json

```json
{
  "name": "SaaS Dashboard",
  "description": "Clean, professional dashboard theme",
  "style": "mira",
  "base": "zinc",
  "accent": "blue",
  "radius": "0.5rem",
  "font": {
    "heading": "Inter",
    "body": "Inter"
  },
  "icons": "tabler",
  "darkMode": true
}
```

### docs/PRESETS/creative-portfolio.json

```json
{
  "name": "Creative Portfolio",
  "description": "Bold, striking portfolio theme",
  "style": "vega",
  "base": "neutral",
  "accent": "violet",
  "radius": "0",
  "font": {
    "heading": "Outfit",
    "body": "Inter"
  },
  "icons": "lucide",
  "darkMode": true
}
```

---

## 8.4 Theme Recommendations by Project Type

| Project Type | Style | Base | Accent | Font |
|--------------|-------|------|--------|------|
| **SaaS Dashboard** | Mira | Zinc | Blue | Inter |
| **E-commerce** | Nova | Slate | Green | Figtree |
| **Blog/Publishing** | Lyra | Stone | Orange | Source Serif |
| **Portfolio** | Vega | Neutral | Violet | Outfit |
| **Enterprise** | Maia | Slate | Blue | Inter |
| **Social App** | Nova | Zinc | Rose | Figtree |
| **Developer Tool** | Mira | Zinc | Green | Geist |
| **Finance App** | Maia | Slate | Blue | Inter |
| **Healthcare** | Nova | Stone | Blue | Inter |
| **Education** | Lyra | Slate | Green | Figtree |

# PART 9: PRODUCTIVITY & ADVANCED PATTERNS

## 9.1 The 4 Tips for Building Productively

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              4 TIPS FOR BUILDING PRODUCTIVELY                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   1. USE THE BEST MODEL                                                     │
│      └── Opus for planning (80.9% accuracy)                                │
│      └── Sonnet for implementation                                          │
│      └── Haiku for quick fixes                                             │
│                                                                             │
│   2. UPDATE AND TUNE CLAUDE.md                                              │
│      └── Use the # trick for learnings                                     │
│      └── Keep it accurate and current                                      │
│                                                                             │
│   3. PRACTICE REGRESSION PREVENTION                                         │
│      └── Stop hook auto-runs tests                                         │
│      └── Don't break what works                                            │
│                                                                             │
│   4. THROW AWAY WORK (AND START OVER)                                       │
│      └── Don't fight bad architecture                                      │
│      └── Restart with learnings                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9.2 Model Strategy (The Opus Rule)

### SWE-Bench Results

```
┌────────────────────────────────────────────────────────────────┐
│              SOFTWARE ENGINEERING ACCURACY                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   Opus 4.5        ████████████████████████████████  80.9%     │
│   Sonnet 4.5      ███████████████████████████████   77.2%     │
│   Opus 4.1        ██████████████████████████████    74.5%     │
│   Gemini 3 Pro    ██████████████████████████████    76.2%     │
│   GPT-5.1-Codex   ███████████████████████████████   77.9%     │
│   GPT-5.1         ██████████████████████████████    76.3%     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Model Selection Guide

| Task | Model | Why |
|------|-------|-----|
| Planning | Opus | Higher accuracy for complex decisions |
| Architecture | Opus | Better reasoning |
| Complex debugging | Opus | Better problem solving |
| Writing code | Sonnet | Cost-effective, still excellent |
| Tests | Sonnet | Standard implementation |
| Documentation | Sonnet | Good enough quality |
| Simple fixes | Haiku | Quick and cheap |
| Typos | Haiku | Trivial tasks |

### Switching Models

```bash
# In Claude Code
/model opus     # Switch to Opus
/model sonnet   # Switch to Sonnet
/model haiku    # Switch to Haiku
```

### The Rule

> "Time saved > Money saved"

For important decisions, use the best model. The time you save from better output is worth more than the cost difference.

---

## 9.3 The # (Hashtag) Trick

### What It Is

When Claude makes a mistake, type `#` followed by the rule. This automatically adds to CLAUDE.md.

### Examples

```bash
# When Claude uses inline styles:
> # Never use inline styles. Always use Tailwind classes.

# When Claude uses var:
> # Never use var. Always use const or let.

# When Claude forgets tests:
> # Always write tests for new functions.

# When Claude commits without running tests:
> # Always run tests before committing.

# When Claude uses wrong import:
> # Import components from @/components/ui, not relative paths.
```

### Why It Works

The mistake is documented and Claude learns from it. Next time, it won't make the same mistake.

---

## 9.4 Voice Mode Hack

### The Problem

"Blank page syndrome" — staring at the prompt not knowing what to type.

### The Solution

Talk out your idea before typing.

### Workflow

```
1. Open voice mode (ChatGPT, Claude mobile, any voice AI)
2. Ramble about what you want to build
3. Ask AI to summarize into a Markdown spec
4. Paste that spec into Claude Code
```

### Example

**Voice Input:**
> "So I want to add a feature where users can upload their own thumbnails, 
> they should be able to drag and drop, there should be validation, 
> and they need a preview..."

**AI Output:**
```markdown
## Feature: User Thumbnail Upload

### Requirements
- Drag-and-drop upload
- File validation (size, format)
- Preview before submission
- Mobile support

### Acceptance Criteria
- [ ] Drag-and-drop zone
- [ ] Max 5MB file size
- [ ] PNG, JPG, WebP only
- [ ] Image preview
```

**Then:**
```bash
> Implement this feature: [paste spec]
```

---

## 9.5 Git Worktrees for Multi-Clauding

### The Problem

Running multiple Claude instances on the same repo causes file conflicts.

### The Solution

Git worktrees create separate directories for different branches.

### Setup

```bash
# From main project
cd ~/dev/my-project

# Create worktrees for different features
git worktree add .trees/batch-generation -b batch-generation
git worktree add .trees/user-upload -b user-upload
git worktree add .trees/homepage-preview -b homepage-preview
```

### Directory Structure

```
~/dev/my-project/                    # Main (main branch)
    └── .trees/
        ├── batch-generation/        # Worktree 1
        ├── user-upload/             # Worktree 2
        └── homepage-preview/        # Worktree 3
```

### Running Multiple Claudes

```bash
# Terminal 1
cd ~/dev/my-project
claude
> Work on issue 7

# Terminal 2
cd ~/dev/my-project/.trees/batch-generation
claude
> Work on issue 9

# Terminal 3
cd ~/dev/my-project/.trees/user-upload
claude
> Work on issue 16
```

### Merging Back

```bash
# Return to main
cd ~/dev/my-project
git checkout main

# Merge each branch
git merge batch-generation
git merge user-upload
git merge homepage-preview

# Resolve any conflicts
# Claude can help: "Merge these branches, resolve conflicts"
```

### Example Merge Output

```
● All three branches have been merged into main. Here's a summary:

Merged branches:

1. batch-generation (fast-forward merge)
   - Added thumbnail grid and card components
   - Added zip download utility
   - Added types for batch processing

2. user-upload (resolved 3 conflicts)
   - Added gallery-based thumbnail collection
   - Added image upload components
   - Conflicts resolved in thumbnail-generator.tsx

Final state: Main branch now has 4 new commits with all features.
```

### /create-worktrees Command

```markdown
# /create-worktrees

Create git worktrees for parallel development.

## Usage

\`\`\`
/create-worktrees batch-generation user-upload homepage-preview
\`\`\`

## What It Does

1. Creates \`.trees/\` directory
2. For each branch, creates worktree
3. Outputs instructions

## Script

\`\`\`bash
#!/bin/bash
TREES_DIR=".trees"
mkdir -p "$TREES_DIR"

for branch in "$@"; do
  git worktree add "$TREES_DIR/$branch" -b "$branch"
  echo "Created: $TREES_DIR/$branch"
done

echo ""
echo "Open separate terminals:"
for branch in "$@"; do
  echo "  cd $TREES_DIR/$branch && claude"
done
\`\`\`
```

---

## 9.6 Build Phase Workflows

### 1. General Workflow (Single Feature)

```
1. Understand → @code-explorer
2. Design → @code-architect  
3. Implement → Code with Claude
4. Test → @frontend-tester
5. Review → @code-reviewer
6. Document → @changelog-updater
7. Commit → /update-docs-and-commit
```

### 2. Issue-based Workflow

```
1. Triage → /triage
2. Plan → @code-architect for each issue
3. Implement → Work through issues
4. Test → @frontend-tester
5. Document → @changelog-updater with issue refs
6. Close → Reference issue in commit
```

### 3. Multi-Agent Workflow (Multi-Clauding)

```
1. Create worktrees → /create-worktrees
2. Assign issues to each worktree
3. Run Claude in each terminal
4. Implement in parallel
5. Merge when all complete
6. Resolve conflicts
7. Document and commit
```

---

# PART 10: DEVOPS & DEPLOYMENT

## 10.1 Docker Configuration

### Dockerfile

```dockerfile
# Dockerfile
FROM oven/bun:1.1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["bun", "run", "start"]
```

### docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
    depends_on:
      - db
      
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

---

## 10.2 GitHub Actions CI/CD

### .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-type:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
          
      - run: bun install
      - run: bun run lint
      - run: bun run typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
          
      - run: bun install
      - run: bun test

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
          
      - run: bun install
      
      - name: Install Playwright
        run: bunx playwright install --with-deps
        
      - name: Run E2E tests
        run: bunx playwright test
        
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: e2e/report/
```

### .github/workflows/deploy.yml

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 10.3 Deploy Previews

### Why Deploy Previews?

- Test features before merging
- Share with stakeholders
- Automatic per-PR deployments

### Vercel Setup

```bash
# Install Vercel CLI
bun add -g vercel

# Link project
vercel link

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Preview URL Pattern

```
https://[project]-[branch]-[hash].vercel.app
```

---

# PART 11: BEADS & SPEC KIT INTEGRATION

## 11.1 Beads Task Tracking

### What is Beads?

A lightweight, file-based task tracking system.

### Structure

```
.beads/
├── current.md          # Current task
├── backlog/            # Pending tasks
│   ├── feature-auth.md
│   └── feature-api.md
├── completed/          # Done tasks
│   └── setup.md
└── blocked/            # Blocked tasks
```

### Bead Format

```markdown
# Feature: User Authentication

## Status
In Progress

## Description
Implement user authentication with email/password and OAuth.

## Acceptance Criteria
- [ ] Email/password signup
- [ ] Email/password login
- [ ] Google OAuth
- [ ] GitHub OAuth
- [ ] Session management

## Notes
Using Better Auth library.

## Related
- Issue #12
- PR #15
```

### Commands

```bash
# Create new bead
touch .beads/backlog/feature-name.md

# Start working on bead
mv .beads/backlog/feature-name.md .beads/current.md

# Complete bead
mv .beads/current.md .beads/completed/feature-name.md

# Block bead
mv .beads/current.md .beads/blocked/feature-name.md
```

---

## 11.2 Spec Kit

### What is Spec Kit?

A structured way to define features before implementation.

### Spec Format

```markdown
# Spec: [Feature Name]

## Problem
What problem does this solve?

## Solution
How does this feature solve it?

## User Stories
- As a [user], I want to [action] so that [benefit]

## Requirements

### Functional
- [ ] Requirement 1
- [ ] Requirement 2

### Non-Functional
- [ ] Performance: < 200ms response
- [ ] Security: Input validation

## API Design

### Endpoints
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/feature | Create |
| GET | /api/feature/:id | Read |

### Data Models
\`\`\`typescript
interface Feature {
  id: string;
  name: string;
}
\`\`\`

## UI Design
[Link to Figma/mockups]

## Test Plan
- Unit tests for business logic
- Integration tests for API
- E2E tests for user flows

## Rollout Plan
1. Deploy to staging
2. Internal testing
3. Beta users
4. Full rollout
```

---

## 11.3 Ruler for Validation

### What is Ruler?

A validation layer to ensure features meet requirements.

### Ruler Checks

```markdown
# Ruler: [Feature Name]

## Pre-Implementation
- [ ] Spec reviewed and approved
- [ ] Tech design documented
- [ ] Dependencies identified

## During Implementation
- [ ] Tests written first (TDD)
- [ ] No hardcoded values
- [ ] Error handling complete
- [ ] Loading states implemented

## Pre-Ship
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] No console.log statements
- [ ] Performance acceptable

## Post-Ship
- [ ] Monitoring in place
- [ ] Alerts configured
- [ ] Rollback plan ready
```

---

# PART 12: ENHANCED BETTER-T-STACK FORK PLAN

## 12.1 The Vision

### Goal

Fork Better-T-Stack to create `create-karetech-stack` with:
- Enhanced wizard with more options
- PBS system pre-configured
- Testing setup included
- DevOps templates included
- AI workflow optimized

### What's Added

| Category | Additions |
|----------|-----------|
| **Design** | Visual style picker, theme presets |
| **Testing** | Playwright + Puppeteer setup |
| **DevOps** | Docker, GitHub Actions |
| **AI** | PBS system, subagents, hooks |
| **Docs** | 4 essential docs, TECH docs |

---

## 12.2 Enhanced Wizard Flow

### The Wizard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CREATE-KARETECH-STACK WIZARD                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   STEP 1: PROJECT INFO                                                      │
│   ────────────────────                                                      │
│   ? Project name: my-awesome-app                                            │
│   ? Description: An awesome application                                     │
│                                                                             │
│   STEP 2: CORE STACK                                                        │
│   ───────────────────                                                       │
│   ? Database: (PostgreSQL / Turso / None)                                   │
│   ? Auth providers: (Email, Google, GitHub, Apple)                          │
│   ? API style: (oRPC / tRPC / REST)                                         │
│                                                                             │
│   STEP 3: DESIGN (NEW)                                                      │
│   ────────────────────                                                      │
│   ? Visual style: (Vega / Nova / Maia / Lyra / Mira)                       │
│   ? Base color: (Neutral / Zinc / Slate / Stone)                           │
│   ? Accent color: (Blue / Green / Orange / Violet / Rose)                  │
│   ? Font: (Inter / Figtree / Geist)                                        │
│   ? Icons: (Lucide / Tabler)                                               │
│                                                                             │
│   STEP 4: TESTING (NEW)                                                     │
│   ─────────────────────                                                     │
│   ? E2E framework: (Playwright / Puppeteer / Both / None)                  │
│   ? Unit testing: (Bun test / Vitest)                                      │
│   ? Generate example tests: (Yes / No)                                     │
│                                                                             │
│   STEP 5: DEVOPS (NEW)                                                      │
│   ────────────────────                                                      │
│   ? Docker setup: (Yes / No)                                               │
│   ? CI/CD: (GitHub Actions / GitLab CI / None)                             │
│   ? Deploy target: (Vercel / Railway / Docker / None)                      │
│                                                                             │
│   STEP 6: AI WORKFLOW (NEW)                                                 │
│   ─────────────────────────                                                 │
│   ? Include PBS system: (Yes / No)                                         │
│   ? Include subagents: (Yes / No)                                          │
│   ? Include hooks: (Yes / No)                                              │
│   ? MCP servers: (shadcn / context7 / playwright / None)                   │
│                                                                             │
│   STEP 7: EXTRAS                                                            │
│   ──────────────                                                            │
│   ? PWA support: (Yes / No)                                                │
│   ? Analytics: (PostHog / Mixpanel / None)                                 │
│   ? Error tracking: (Sentry / None)                                        │
│   ? Email: (Resend / None)                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 12.3 What Gets Scaffolded

### Base Structure (Always)

```
my-app/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── routes/
│   │   │   ├── lib/
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   └── package.json
│   └── server/
│       ├── src/
│       │   ├── routes/
│       │   ├── middleware/
│       │   └── index.ts
│       └── package.json
├── packages/
│   ├── api/
│   ├── auth/
│   ├── db/
│   ├── env/
│   └── ui/
├── package.json
├── bun.lockb
├── tsconfig.json
├── biome.json
└── CLAUDE.md
```

### + Design Options

```
├── components.json              # shadcn config with chosen style
├── apps/web/src/
│   ├── styles/
│   │   ├── globals.css          # Tailwind + CSS variables
│   │   └── theme.css            # Custom theme overrides
│   └── components/ui/           # Pre-added shadcn components
└── docs/PRESETS/
    └── current-theme.json       # Saved theme configuration
```

### + Testing Options

```
├── e2e/
│   ├── fixtures/
│   │   └── auth.fixture.ts
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   └── dashboard.page.ts
│   ├── tests/
│   │   └── auth.spec.ts
│   └── playwright.config.ts
├── apps/web/src/__tests__/
│   └── example.test.ts
└── package.json                 # Test scripts added
```

### + DevOps Options

```
├── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       └── preview.yml
└── .env.example                 # All required env vars
```

### + AI Workflow Options

```
├── .claude/
│   ├── agents/
│   │   ├── retro-agent.md
│   │   ├── changelog-updater.md
│   │   └── frontend-tester.md
│   ├── commands/
│   │   ├── init.md
│   │   ├── status.md
│   │   ├── ship.md
│   │   ├── update-docs-and-commit.md
│   │   └── create-worktrees.md
│   ├── hooks/
│   │   ├── PreToolUse.sh
│   │   ├── PostToolUse.sh
│   │   ├── Stop.sh
│   │   └── SessionStart.sh
│   ├── skills/
│   │   └── pbs-workflow.md
│   └── settings.json
├── .mcp.json
├── docs/
│   ├── AI/
│   │   └── PBS_MASTER_SYSTEM.md
│   ├── TECH/
│   │   ├── bun.md
│   │   ├── hono.md
│   │   ├── orpc.md
│   │   └── [etc.]
│   ├── ARCHITECTURE.md
│   ├── CHANGELOG.md
│   ├── PROJECT_STATUS.md
│   └── REFERENCE/
│       └── .gitkeep
└── .beads/
    └── current.md
```

---

## 12.4 Implementation Plan

### Phase 1: Fork & Setup (Week 1)

```
- [ ] Fork better-t-stack repository
- [ ] Set up development environment
- [ ] Create new CLI package
- [ ] Update package name and branding
```

### Phase 2: Enhanced Wizard (Week 2)

```
- [ ] Add design options step
- [ ] Add testing options step
- [ ] Add DevOps options step
- [ ] Add AI workflow options step
- [ ] Update prompts library
```

### Phase 3: Template Generation (Week 3-4)

```
- [ ] Create design templates
- [ ] Create testing templates
- [ ] Create DevOps templates
- [ ] Create AI workflow templates
- [ ] Wire up all options to scaffolder
```

### Phase 4: PBS Integration (Week 5)

```
- [ ] Include PBS system in templates
- [ ] Pre-configure CLAUDE.md
- [ ] Add 4 essential docs templates
- [ ] Add TECH docs templates
- [ ] Add subagents and commands
```

### Phase 5: Testing & Polish (Week 6)

```
- [ ] Test all wizard combinations
- [ ] Write documentation
- [ ] Create example projects
- [ ] Publish to npm
```

---

## 12.5 Presets

### Quick Start Presets

```bash
# SaaS Starter
bunx create-karetech-stack my-saas --preset saas

# E-commerce
bunx create-karetech-stack my-shop --preset ecommerce

# Blog/Publishing
bunx create-karetech-stack my-blog --preset blog

# Developer Tool
bunx create-karetech-stack my-tool --preset devtool

# Portfolio
bunx create-karetech-stack my-portfolio --preset portfolio
```

### Preset Definitions

```json
{
  "saas": {
    "database": "postgresql",
    "auth": ["email", "google", "github"],
    "style": "mira",
    "base": "zinc",
    "accent": "blue",
    "testing": "playwright",
    "devops": "github-actions",
    "deploy": "vercel",
    "ai": true,
    "extras": ["analytics", "email"]
  },
  "ecommerce": {
    "database": "postgresql",
    "auth": ["email", "google"],
    "style": "nova",
    "base": "slate",
    "accent": "green",
    "testing": "playwright",
    "devops": "github-actions",
    "deploy": "vercel",
    "ai": true,
    "extras": ["analytics", "email", "payments"]
  },
  "blog": {
    "database": "turso",
    "auth": ["email"],
    "style": "lyra",
    "base": "stone",
    "accent": "orange",
    "testing": "bun",
    "devops": "github-actions",
    "deploy": "vercel",
    "ai": true,
    "extras": []
  }
}
```

# APPENDICES

---

# APPENDIX A: COMPLETE SETUP CHECKLIST

## Full Checklist

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE PBS SETUP CHECKLIST                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ESSENTIALS                                                                │
│   ──────────                                                                │
│   ✅ 1. Create GitHub repository                                           │
│   ✅ 2. Clone and setup project                                            │
│   ✅ 3. Populate .env file                                                  │
│   ✅ 4. Setup CLAUDE.md (entry point)                                       │
│   ✅ 5. Setup 4 Essential Documents                                         │
│      └── docs/ARCHITECTURE.md                                               │
│      └── docs/CHANGELOG.md                                                  │
│      └── docs/PROJECT_STATUS.md                                             │
│      └── docs/REFERENCE/                                                    │
│   ✅ 6. Add TECH docs                                                       │
│      └── docs/TECH/bun.md                                                   │
│      └── docs/TECH/hono.md                                                  │
│      └── docs/TECH/orpc.md                                                  │
│      └── docs/TECH/drizzle.md                                               │
│      └── docs/TECH/better-auth.md                                           │
│      └── docs/TECH/tanstack-router.md                                       │
│      └── docs/TECH/shadcn.md                                                │
│      └── docs/TECH/e2e-testing.md                                           │
│   ✅ 7. Install Plugins                                                     │
│      └── compounding-engineering                                            │
│      └── feature-dev                                                        │
│      └── frontend-design                                                    │
│   ✅ 8. Install MCP Servers                                                 │
│      └── shadcn                                                             │
│      └── context7                                                           │
│      └── playwright                                                         │
│   ✅ 9. Create Custom Slash Commands                                        │
│      └── .claude/commands/init.md                                           │
│      └── .claude/commands/status.md                                         │
│      └── .claude/commands/ship.md                                           │
│      └── .claude/commands/update-docs-and-commit.md                         │
│      └── .claude/commands/create-worktrees.md                               │
│   ✅ 10. Create Custom Subagents                                            │
│      └── .claude/agents/retro-agent.md                                      │
│      └── .claude/agents/changelog-updater.md                                │
│      └── .claude/agents/frontend-tester.md                                  │
│                                                                             │
│   BONUS                                                                     │
│   ─────                                                                     │
│   ⬜ 11. Pre-configure permissions                                          │
│      └── .claude/settings.json                                              │
│   ⬜ 12. Setup Hooks                                                        │
│      └── .claude/hooks/PreToolUse.sh                                        │
│      └── .claude/hooks/PostToolUse.sh                                       │
│      └── .claude/hooks/Stop.sh                                              │
│      └── .claude/hooks/SessionStart.sh                                      │
│      └── .claude/hooks/PreCompact.sh                                        │
│   ⬜ 13. Setup E2E Testing                                                  │
│      └── e2e/pages/*.page.ts                                                │
│      └── e2e/fixtures/*.fixture.ts                                          │
│      └── e2e/tests/*.spec.ts                                                │
│      └── playwright.config.ts                                               │
│   ⬜ 14. Setup CI/CD                                                        │
│      └── .github/workflows/ci.yml                                           │
│      └── .github/workflows/deploy.yml                                       │
│   ⬜ 15. Setup Docker                                                       │
│      └── Dockerfile                                                         │
│      └── docker-compose.yml                                                 │
│   ⬜ 16. Choose Theme                                                       │
│      └── Visit ui.shadcn.com/create                                         │
│      └── Save to docs/PRESETS/current-theme.json                            │
│   ⬜ 17. Setup Beads                                                        │
│      └── .beads/current.md                                                  │
│      └── .beads/backlog/                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# APPENDIX B: QUICK REFERENCE CARDS

## B.1 Commands Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMMANDS QUICK REFERENCE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   PBS COMMANDS                                                              │
│   ────────────                                                              │
│   /init                    Analyze project, check status                    │
│   /discover                Run discovery questionnaire                      │
│   /status                  Quick project status view                        │
│   /ship                    Pre-deployment checklist                         │
│   /update-docs-and-commit  Update docs and commit                          │
│   /create-worktrees        Setup parallel development                       │
│   /issues                  Create GitHub issues from plan                   │
│   /theme                   Theme configuration                              │
│                                                                             │
│   PLUGIN COMMANDS (compounding-engineering)                                 │
│   ─────────────────────────────────────────                                 │
│   /changelog               Generate changelog entries                       │
│   /plan_review             Review implementation plans                      │
│   /prime                   Prime context for session                        │
│   /resolve_parallel        Resolve issues in parallel                       │
│   /resolve_todo_parallel   Resolve TODOs in parallel                        │
│   /triage                  Triage issues/bugs                               │
│   /release-docs            Prepare release documentation                    │
│   /deploy-docs             Deploy documentation                             │
│                                                                             │
│   PLUGIN COMMANDS (feature-dev)                                             │
│   ─────────────────────────────                                             │
│   /feature-dev             Start guided feature workflow                    │
│                                                                             │
│   MODEL COMMANDS                                                            │
│   ──────────────                                                            │
│   /model opus              Switch to Opus (planning)                        │
│   /model sonnet            Switch to Sonnet (coding)                        │
│   /model haiku             Switch to Haiku (quick fixes)                    │
│                                                                             │
│   GIT COMMANDS                                                              │
│   ────────────                                                              │
│   /commit                  Quick commit                                     │
│   /branch                  Branch operations                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## B.2 Agents Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AGENTS QUICK REFERENCE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   PBS AGENTS                                                                │
│   ──────────                                                                │
│   @retro-agent             Run development retrospective                    │
│   @changelog-updater       Update changelog entries                         │
│   @frontend-tester         Run Playwright E2E tests                         │
│   @code-reviewer           Review code quality                              │
│   @test-runner             Run and analyze test suites                      │
│   @debugger                Debug issues                                     │
│                                                                             │
│   PLUGIN AGENTS (feature-dev)                                               │
│   ───────────────────────────                                               │
│   @code-architect          Design system architecture                       │
│   @code-explorer           Explore and understand codebase                  │
│   @code-reviewer           Review code quality                              │
│                                                                             │
│   WHEN TO USE AGENTS VS COMMANDS                                            │
│   ──────────────────────────────                                            │
│   Commands → Quick tasks, need current context                              │
│   Agents   → Heavy output, need isolated context                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## B.3 Hooks Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HOOKS QUICK REFERENCE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   HOOK                  WHEN IT FIRES                USE CASE               │
│   ────                  ─────────────                ────────               │
│   PreToolUse            Before tool executes         Block dangerous cmds   │
│   PostToolUse           After tool completes         Run linters           │
│   PermissionRequest     Permission dialog shown      Notifications         │
│   Notification          Claude sends notification    Slack/Discord alert   │
│   UserPromptSubmit      User submits prompt          Validate/inject       │
│   Stop                  Claude finishes response     Run tests             │
│   SubagentStop          Subagent finishes           Same as Stop           │
│   PreCompact            Before context compaction    Save transcript       │
│   SessionStart          Session begins/resumes       Set env vars          │
│   SessionEnd            Session ends                 Cleanup/logging       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## B.4 Documentation Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DOCUMENTATION QUICK REFERENCE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   THE 4 ESSENTIAL DOCUMENTS                                                 │
│   ─────────────────────────                                                 │
│   ARCHITECTURE.md      System design, data flow         When: Structure    │
│   CHANGELOG.md         Version history, what was built  When: Every commit │
│   PROJECT_STATUS.md    Progress, where we left off      When: Every session│
│   REFERENCE/*.md       Complex feature documentation    When: New features │
│                                                                             │
│   UPDATE TRIGGERS FOR CLAUDE.md                                             │
│   ─────────────────────────────                                             │
│   ✅ Project architecture or file structure                                 │
│   ✅ New commands or scripts                                                │
│   ✅ New environment variables                                              │
│   ✅ New components or API endpoints                                        │
│   ✅ Custom subagents or slash commands                                     │
│   ✅ Known issues                                                           │
│   ✅ Testing procedures                                                     │
│   ❌ Minor bug fixes (DO NOT UPDATE)                                        │
│   ❌ Code tweaks that don't affect structure (DO NOT UPDATE)                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## B.5 Theme Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THEME QUICK REFERENCE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   VISUAL STYLES                                                             │
│   ─────────────                                                             │
│   Vega    Bold, high-contrast      Portfolios, creative                    │
│   Nova    Soft, rounded            Consumer, social, e-commerce            │
│   Maia    Sharp, minimal           Enterprise, corporate                   │
│   Lyra    Warm, organic            Blogs, publishing                       │
│   Mira    Crisp, balanced          SaaS, dashboards                        │
│                                                                             │
│   BASE COLORS                                                               │
│   ───────────                                                               │
│   Neutral     True gray                                                     │
│   Zinc        Cool gray (most popular)                                      │
│   Slate       Blue-gray                                                     │
│   Stone       Warm gray                                                     │
│                                                                             │
│   ACCENT COLORS                                                             │
│   ─────────────                                                             │
│   Blue        Trust, professional                                           │
│   Green       Success, growth                                               │
│   Orange      Energy, action                                                │
│   Violet      Creative, premium                                             │
│   Rose        Bold, attention                                               │
│                                                                             │
│   THEME BUILDER: https://ui.shadcn.com/create                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# APPENDIX C: ALL COMMANDS REFERENCE

## PBS Commands (Full)

### /init

```markdown
Analyze project structure and prepare for development.

**When:** Start of every session
**What it does:**
1. Reads CLAUDE.md
2. Checks PROJECT_STATUS.md
3. Analyzes project structure
4. Reports findings
```

### /discover

```markdown
Run interactive discovery questionnaire.

**When:** New projects, new features
**What it does:**
1. Asks 50+ questions
2. Gathers requirements
3. Helps with planning
```

### /status

```markdown
Quick view of project status.

**When:** Anytime you need a status check
**What it does:**
1. Reads PROJECT_STATUS.md
2. Shows current phase
3. Shows where we left off
4. Shows next steps
```

### /ship

```markdown
Pre-deployment checklist.

**When:** Before deploying
**What it does:**
1. Runs all tests
2. Checks for errors
3. Verifies documentation
4. Reports any issues
```

### /update-docs-and-commit

```markdown
Update documentation and commit changes.

**When:** After completing features
**What it does:**
1. Analyzes git changes
2. Updates CHANGELOG.md
3. Updates PROJECT_STATUS.md
4. Updates ARCHITECTURE.md (if needed)
5. Updates CLAUDE.md (if needed)
6. Commits everything
```

### /create-worktrees

```markdown
Setup git worktrees for parallel development.

**Usage:** /create-worktrees feature-a feature-b feature-c
**What it does:**
1. Creates .trees/ directory
2. Creates worktree for each branch
3. Outputs instructions
```

### /issues

```markdown
Create GitHub issues from a plan file.

**Usage:** /issues plan.md
**What it does:**
1. Reads plan file
2. Parses into issues
3. Creates issues via gh CLI
```

---

# APPENDIX D: ALL AGENTS REFERENCE

## @retro-agent (Full)

```markdown
---
name: retro-agent
description: Run development retrospective
tools: Read, Write, Edit, Bash(git:*)
model: sonnet
---

Purpose: Analyze session and improve documentation

Process:
1. Read PROJECT_STATUS.md, ARCHITECTURE.md, CHANGELOG.md
2. Run git log --oneline -20
3. Analyze what went well and what could improve
4. Generate improvement proposals
5. Apply improvements after approval
6. Output summary

Key Principle: Every retrospective makes the next session easier.
```

## @changelog-updater (Full)

```markdown
---
name: changelog-updater
description: Update changelog entries
tools: Read, Write, Edit, Bash(git:*)
model: sonnet
---

Purpose: Keep CHANGELOG.md accurate

Process:
1. Run git status and git diff
2. Categorize changes (Added, Changed, Fixed, Removed)
3. Write user-focused entries
4. Include file paths for traceability
5. Insert under correct date section
```

## @frontend-tester (Full)

```markdown
---
name: frontend-tester
description: Run Playwright E2E tests
tools: Read, Write, Edit, Bash(npm:*), Bash(npx:*), Glob, Grep
model: sonnet
---

Purpose: Run and analyze E2E tests

Commands:
- npx playwright test
- npx playwright test --ui
- npx playwright test --headed
- npx playwright test --debug

Process:
1. Check Playwright is installed
2. Run requested tests
3. Analyze results
4. Report summary with pass/fail
5. Suggest fixes for failures
```

---

# APPENDIX E: TROUBLESHOOTING GUIDE

## Common Issues

### Claude Not Finding Files

**Problem:** Claude says it can't find files that exist.

**Solution:**
1. Check file paths are correct
2. Make sure CLAUDE.md has correct paths
3. Run `/init` to refresh project analysis

### Tests Failing Mysteriously

**Problem:** Tests pass locally but fail in CI.

**Solution:**
1. Check environment variables
2. Verify database is seeded
3. Check for timing issues (add waits)
4. Check for flaky tests (run multiple times)

### Documentation Out of Sync

**Problem:** Docs don't match actual project.

**Solution:**
1. Run `@retro-agent` to identify outdated docs
2. Run `/update-docs-and-commit`
3. Manually verify CLAUDE.md is accurate

### Subagent Not Working

**Problem:** Subagent doesn't do what it should.

**Solution:**
1. Check agent file is in `.claude/agents/`
2. Verify YAML frontmatter is correct
3. Check tools list includes what's needed
4. Try more specific instructions

### MCP Server Not Connecting

**Problem:** MCP commands fail.

**Solution:**
1. Check `.mcp.json` is correct
2. Restart Claude Code
3. Verify package is installed
4. Check environment variables

### Git Worktree Issues

**Problem:** Worktree won't create or merge.

**Solution:**
1. Make sure you're not on the branch you're trying to worktree
2. Check for uncommitted changes
3. Use `git worktree list` to see existing worktrees
4. Use `git worktree remove` to clean up

---

# APPENDIX F: QUICK SETUP SCRIPTS

## setup-pbs.sh

```bash
#!/bin/bash

# PBS Documentation Setup Script
echo "?? Setting up PBS Documentation..."

# Create directories
mkdir -p docs/AI docs/TECH docs/REFERENCE docs/ADR docs/PRESETS
mkdir -p .claude/agents .claude/commands .claude/hooks .claude/skills
mkdir -p e2e/pages e2e/fixtures e2e/tests
mkdir -p .beads/backlog .beads/completed

# Create essential docs
touch docs/ARCHITECTURE.md
touch docs/CHANGELOG.md
touch docs/PROJECT_STATUS.md

# Create TECH docs
touch docs/TECH/bun.md
touch docs/TECH/hono.md
touch docs/TECH/orpc.md
touch docs/TECH/drizzle.md
touch docs/TECH/better-auth.md
touch docs/TECH/tanstack-router.md
touch docs/TECH/shadcn.md
touch docs/TECH/e2e-testing.md

# Create beads
touch .beads/current.md

echo "✅ PBS structure created!"
echo ""
echo "Next steps:"
echo "  1. Copy PBS_MASTER_SYSTEM_V4.md to docs/AI/"
echo "  2. Run 'claude' and '/init'"
echo "  3. Install plugins: /plugin"
```

## setup-mcp.sh

```bash
#!/bin/bash

# MCP Setup Script
echo "?? Setting up MCP servers..."

# Initialize shadcn MCP
bunx shadcn@latest mcp init --client claude

# Create .mcp.json if not exists
if [ ! -f ".mcp.json" ]; then
  cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
EOF
  echo "✅ Created .mcp.json"
fi

echo "✅ MCP setup complete!"
echo "Restart Claude Code to apply changes."
```

---

# END OF PBS MASTER SYSTEM v4.0

---

## Final Stats

| Category | Count |
|----------|-------|
| Total Lines | 15,000+ |
| Parts | 12 |
| Appendices | 6 |
| Golden Rules | 10 |
| Discovery Questions | 55 |
| Essential Docs | 4 |
| TECH Docs | 17 |
| Hook Events | 10 |
| PBS Commands | 8 |
| Plugin Commands | 12+ |
| Subagents | 6+ |
| Visual Styles | 5 |
| Theme Presets | 6 |

---

**Document Version:** 4.0 Final  
**Created:** January 2025  
**Author:** Kareem (KareTech Solutions / NDMA)  
**Based On:** Avthar (@avthar) patterns, Better-T-Stack, Claude Code best practices

---

*"Plan before you build. Build what you planned. Ship what you built."*


================================================================================
================================================================================
================================================================================
        
███████╗ ██████╗ ██████╗ ██╗  ██╗    ██████╗ ██╗      █████╗ ███╗   ██╗
██╔════╝██╔═══██╗██╔══██╗██║ ██╔╝    ██╔══██╗██║     ██╔══██╗████╗  ██║
█████╗  ██║   ██║██████╔╝█████╔╝     ██████╔╝██║     ███████║██╔██╗ ██║
██╔══╝  ██║   ██║██╔══██╗██╔═██╗     ██╔═══╝ ██║     ██╔══██║██║╚██╗██║
██║     ╚██████╔╝██║  ██║██║  ██╗    ██║     ███████╗██║  ██║██║ ╚████║
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝

================================================================================
              BETTER-T-STACK ENHANCED FORK PLAN: create-karetech-stack
================================================================================

# BETTER-T-STACK ENHANCED FORK PLAN

## Project: create-karetech-stack

**Version:** 1.0  
**Author:** Kareem (KareTech Solutions / NDMA)  
**Base:** better-t-stack by AmanVarshney01  
**Status:** Planning

---

# TABLE OF CONTENTS

1. [Vision & Goals](#1-vision--goals)
2. [What's Being Added](#2-whats-being-added)
3. [Enhanced Wizard Flow](#3-enhanced-wizard-flow)
4. [Complete Scaffold Specification](#4-complete-scaffold-specification)
5. [Template Files](#5-template-files)
6. [Presets System](#6-presets-system)
7. [Implementation Plan](#7-implementation-plan)
8. [Technical Architecture](#8-technical-architecture)
9. [Testing Plan](#9-testing-plan)
10. [Documentation](#10-documentation)
11. [Maintenance & Updates](#11-maintenance--updates)

---

# 1. VISION & GOALS

## 1.1 The Vision

Create an enhanced Better-T-Stack scaffold that produces **AI-ready, production-grade** projects with:

- **Opinionated defaults** that work out of the box
- **PBS system** pre-configured for Claude Code
- **Testing setup** included from day one
- **DevOps templates** ready to use
- **Visual design choices** baked in

## 1.2 Goals

| Goal | Measure of Success |
|------|-------------------|
| **Faster startup** | 0 to working app in < 5 minutes |
| **AI-optimized** | Claude Code immediately productive |
| **Production-ready** | CI/CD, Docker, testing included |
| **Beautiful defaults** | shadcn v4 with chosen theme |
| **Maintainable** | Clear structure, documentation |

## 1.3 Target Users

- Solo developers building SaaS products
- Small teams wanting a solid foundation
- Developers using AI-assisted coding (Claude Code)
- Anyone who wants Better-T-Stack + more

## 1.4 Non-Goals

- Not replacing Better-T-Stack (this is an enhancement)
- Not adding unnecessary complexity
- Not being opinionated about business logic
- Not locking users into specific services

---

# 2. WHAT'S BEING ADDED

## 2.1 Comparison Table

| Feature | Better-T-Stack | create-karetech-stack |
|---------|----------------|----------------------|
| **Core Stack** | ✅ Bun, Hono, oRPC, Drizzle | ✅ Same |
| **Auth** | ✅ Better Auth | ✅ Same + more providers |
| **UI** | ✅ shadcn/ui | ✅ + Visual style picker |
| **Themes** | ❌ Default only | ✅ 5 styles, colors, fonts |
| **E2E Tests** | ❌ Not included | ✅ Playwright + Page Objects |
| **Unit Tests** | ❌ Not included | ✅ Bun test setup |
| **Docker** | ❌ Not included | ✅ Dockerfile + compose |
| **CI/CD** | ❌ Not included | ✅ GitHub Actions |
| **PBS System** | ❌ Not included | ✅ Full AI workflow |
| **Documentation** | ❌ Basic README | ✅ 4 essential docs + TECH |
| **Hooks** | ❌ Not included | ✅ Claude Code hooks |
| **Subagents** | ❌ Not included | ✅ 3 essential agents |
| **MCP Config** | ❌ Not included | ✅ .mcp.json |
| **Presets** | ❌ Not included | ✅ SaaS, E-commerce, Blog |

## 2.2 New Wizard Steps

```
Original Better-T-Stack:
├── Project name
├── Database (PostgreSQL/Turso/None)
├── Auth (Yes/No)
├── PWA (Yes/No)
└── Examples (Yes/No)

Enhanced (create-karetech-stack):
├── Project name + description
├── Database (PostgreSQL/Turso/None)
├── Auth providers (Email, Google, GitHub, Apple)
├── API style (oRPC/tRPC/REST)
├── [NEW] Visual style (Vega/Nova/Maia/Lyra/Mira)
├── [NEW] Colors (Base + Accent)
├── [NEW] Font + Icons
├── [NEW] E2E testing (Playwright/Puppeteer/Both/None)
├── [NEW] Unit testing (Bun test/Vitest)
├── [NEW] Docker (Yes/No)
├── [NEW] CI/CD (GitHub Actions/GitLab CI/None)
├── [NEW] Deploy target (Vercel/Railway/Docker)
├── [NEW] PBS system (Yes/No)
├── [NEW] Extras (Analytics, Email, Error tracking)
└── PWA (Yes/No)
```

---

# 3. ENHANCED WIZARD FLOW

## 3.1 Complete Wizard Specification

### Step 1: Project Info

```
┌─────────────────────────────────────────────────────────────┐
│  CREATE-KARETECH-STACK                                      │
│  ─────────────────────                                      │
│                                                             │
│  ? Project name: my-awesome-app                             │
│    (lowercase, no spaces, will be npm package name)         │
│                                                             │
│  ? Description: A modern web application                    │
│    (Used in package.json and README)                        │
│                                                             │
│  ? Author: Kareem <kareem@example.com>                      │
│    (Optional, for package.json)                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 2: Core Stack

```
┌─────────────────────────────────────────────────────────────┐
│  CORE STACK                                                 │
│  ──────────                                                 │
│                                                             │
│  ? Database:                                                │
│    ○ PostgreSQL (recommended for production)                │
│    ○ Turso (SQLite, great for edge)                        │
│    ○ None (add later)                                       │
│                                                             │
│  ? Auth providers: (space to select, enter to confirm)      │
│    ◉ Email/Password                                         │
│    ◉ Google                                                 │
│    ◉ GitHub                                                 │
│    ○ Apple                                                  │
│    ○ Microsoft                                              │
│    ○ Discord                                                │
│                                                             │
│  ? API style:                                               │
│    ○ oRPC (recommended, lighter than tRPC)                  │
│    ○ tRPC (popular, more ecosystem)                         │
│    ○ REST (traditional)                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 3: Design

```
┌─────────────────────────────────────────────────────────────┐
│  DESIGN                                                     │
│  ──────                                                     │
│                                                             │
│  ? Visual style:                                            │
│    ○ Vega   - Bold, high-contrast (portfolios, creative)   │
│    ○ Nova   - Soft, rounded (consumer, social)             │
│    ○ Maia   - Sharp, minimal (enterprise, corporate)       │
│    ○ Lyra   - Warm, organic (blogs, publishing)            │
│    ● Mira   - Crisp, balanced (SaaS, dashboards)           │
│                                                             │
│  ? Base color:                                              │
│    ○ Neutral (true gray)                                    │
│    ● Zinc (cool gray) - recommended                         │
│    ○ Slate (blue-gray)                                      │
│    ○ Stone (warm gray)                                      │
│                                                             │
│  ? Accent color:                                            │
│    ● Blue (trust, professional)                             │
│    ○ Green (success, growth)                                │
│    ○ Orange (energy, action)                                │
│    ○ Violet (creative, premium)                             │
│    ○ Rose (bold, attention)                                 │
│                                                             │
│  ? Font family:                                             │
│    ● Inter (clean, versatile) - recommended                 │
│    ○ Figtree (friendly, geometric)                          │
│    ○ Geist (modern, technical)                              │
│    ○ Outfit (rounded, warm)                                 │
│                                                             │
│  ? Icon library:                                            │
│    ○ Lucide (default shadcn)                                │
│    ● Tabler (more icons)                                    │
│                                                             │
│  ? Border radius:                                           │
│    ○ None (0)                                               │
│    ○ Small (0.25rem)                                        │
│    ● Default (0.5rem) - recommended                         │
│    ○ Large (0.75rem)                                        │
│    ○ Full (1rem)                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 4: Testing

```
┌─────────────────────────────────────────────────────────────┐
│  TESTING                                                    │
│  ───────                                                    │
│                                                             │
│  ? E2E testing framework:                                   │
│    ● Playwright (recommended, cross-browser)                │
│    ○ Puppeteer (Chrome-focused)                             │
│    ○ Both (Playwright for E2E, Puppeteer for screenshots)  │
│    ○ None (skip E2E setup)                                  │
│                                                             │
│  ? Unit testing:                                            │
│    ● Bun test (built-in, fast) - recommended               │
│    ○ Vitest (more features)                                 │
│                                                             │
│  ? Generate example tests:                                  │
│    ● Yes (auth flow, API tests)                            │
│    ○ No (empty test directories)                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 5: DevOps

```
┌─────────────────────────────────────────────────────────────┐
│  DEVOPS                                                     │
│  ──────                                                     │
│                                                             │
│  ? Docker setup:                                            │
│    ● Yes (Dockerfile + docker-compose.yml)                  │
│    ○ No                                                     │
│                                                             │
│  ? CI/CD:                                                   │
│    ● GitHub Actions (recommended)                           │
│    ○ GitLab CI                                              │
│    ○ None                                                   │
│                                                             │
│  ? Deploy target:                                           │
│    ● Vercel (recommended for Next.js-style deploys)        │
│    ○ Railway (containers)                                   │
│    ○ Docker (self-hosted)                                   │
│    ○ None (configure later)                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 6: AI Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  AI WORKFLOW (CLAUDE CODE)                                  │
│  ─────────────────────────                                  │
│                                                             │
│  ? Include PBS system:                                      │
│    ● Yes (CLAUDE.md, 4 essential docs, TECH docs)          │
│    ○ No                                                     │
│                                                             │
│  ? Include subagents:                                       │
│    ● Yes (retro-agent, changelog-updater, frontend-tester) │
│    ○ No                                                     │
│                                                             │
│  ? Include hooks:                                           │
│    ● Yes (Stop hook for tests, SessionStart, etc.)         │
│    ○ No                                                     │
│                                                             │
│  ? MCP servers: (space to select)                           │
│    ◉ shadcn (component access)                              │
│    ◉ context7 (documentation lookup)                        │
│    ○ playwright (browser automation)                        │
│    ○ postgres (database queries)                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 7: Extras

```
┌─────────────────────────────────────────────────────────────┐
│  EXTRAS                                                     │
│  ──────                                                     │
│                                                             │
│  ? Additional features: (space to select)                   │
│    ○ PWA support (offline, installable)                     │
│    ○ Analytics (PostHog)                                    │
│    ○ Email (Resend)                                         │
│    ○ Error tracking (Sentry)                                │
│    ○ Payments (Stripe) - coming soon                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Summary & Confirm

```
┌─────────────────────────────────────────────────────────────┐
│  SUMMARY                                                    │
│  ───────                                                    │
│                                                             │
│  Project: my-awesome-app                                    │
│  Description: A modern web application                      │
│                                                             │
│  Core Stack:                                                │
│    • Database: PostgreSQL                                   │
│    • Auth: Email, Google, GitHub                            │
│    • API: oRPC                                              │
│                                                             │
│  Design:                                                    │
│    • Style: Mira                                            │
│    • Colors: Zinc + Blue                                    │
│    • Font: Inter                                            │
│    • Icons: Tabler                                          │
│                                                             │
│  Testing:                                                   │
│    • E2E: Playwright                                        │
│    • Unit: Bun test                                         │
│    • Examples: Yes                                          │
│                                                             │
│  DevOps:                                                    │
│    • Docker: Yes                                            │
│    • CI/CD: GitHub Actions                                  │
│    • Deploy: Vercel                                         │
│                                                             │
│  AI Workflow:                                               │
│    • PBS: Yes                                               │
│    • Subagents: Yes                                         │
│    • Hooks: Yes                                             │
│    • MCP: shadcn, context7                                  │
│                                                             │
│  ? Create project? (Y/n)                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 4. COMPLETE SCAFFOLD SPECIFICATION

## 4.1 Base Structure (Always Created)

```
my-app/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/                 # shadcn components
│   │   │   │   └── layout/
│   │   │   │       ├── header.tsx
│   │   │   │       ├── footer.tsx
│   │   │   │       └── sidebar.tsx
│   │   │   ├── routes/
│   │   │   │   ├── __root.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   ├── register.tsx
│   │   │   │   └── dashboard.tsx
│   │   │   ├── lib/
│   │   │   │   ├── api.ts              # oRPC client
│   │   │   │   ├── auth-client.ts      # Better Auth client
│   │   │   │   └── utils.ts
│   │   │   ├── styles/
│   │   │   │   └── globals.css
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── server/
│       ├── src/
│       │   ├── routes/
│       │   │   ├── index.ts
│       │   │   └── auth.ts
│       │   ├── middleware/
│       │   │   └── auth.ts
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── api/
│   │   ├── src/
│   │   │   ├── router.ts               # oRPC router
│   │   │   ├── procedures/
│   │   │   │   ├── users.ts
│   │   │   │   └── health.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── auth/
│   │   ├── src/
│   │   │   ├── index.ts                # Better Auth config
│   │   │   └── client.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── db/
│   │   ├── src/
│   │   │   ├── schema.ts               # Drizzle schema
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── drizzle.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── env/
│       ├── src/
│       │   └── index.ts                # Env validation
│       ├── tsconfig.json
│       └── package.json
│
├── .env.example
├── .gitignore
├── biome.json
├── bun.lockb
├── package.json
├── tsconfig.json
├── components.json                      # shadcn config
├── README.md
└── CLAUDE.md                           # Always created
```

## 4.2 Design Options (When Selected)

```
+ apps/web/src/styles/
│   ├── globals.css                     # With chosen theme variables
│   └── theme.css                       # Custom overrides

+ apps/web/src/components/ui/           # Pre-installed based on style
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   └── toast.tsx

+ docs/PRESETS/
│   └── current-theme.json              # Saved theme config
```

## 4.3 Testing Options (When Selected)

### Playwright Only

```
+ e2e/
│   ├── fixtures/
│   │   └── auth.fixture.ts
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── register.page.ts
│   │   └── dashboard.page.ts
│   ├── tests/
│   │   ├── auth.spec.ts
│   │   └── dashboard.spec.ts
│   └── playwright.config.ts

+ package.json scripts:
│   "test:e2e": "playwright test"
│   "test:e2e:ui": "playwright test --ui"
│   "test:e2e:headed": "playwright test --headed"
```

### Puppeteer Only

```
+ e2e/
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   └── dashboard.page.ts
│   ├── tests/
│   │   └── screenshots.test.ts
│   └── puppeteer.config.ts

+ package.json scripts:
│   "test:e2e": "bun test e2e/"
```

### Both Frameworks

```
+ e2e/
│   ├── playwright/
│   │   ├── fixtures/
│   │   ├── pages/
│   │   ├── tests/
│   │   └── playwright.config.ts
│   └── puppeteer/
│       ├── pages/
│       ├── tests/
│       └── puppeteer.config.ts
```

### Unit Tests (Bun)

```
+ apps/web/src/__tests__/
│   ├── utils.test.ts
│   └── components/
│       └── button.test.tsx

+ apps/server/src/__tests__/
│   └── health.test.ts

+ packages/api/src/__tests__/
│   └── users.test.ts
```

## 4.4 DevOps Options (When Selected)

### Docker

```
+ Dockerfile
+ docker-compose.yml
+ docker-compose.prod.yml
+ .dockerignore
```

### GitHub Actions

```
+ .github/
│   ├── workflows/
│   │   ├── ci.yml                      # Lint, type-check, test
│   │   ├── e2e.yml                     # E2E tests
│   │   └── deploy.yml                  # Deploy to target
│   └── CODEOWNERS
```

### GitLab CI

```
+ .gitlab-ci.yml
```

## 4.5 AI Workflow Options (When Selected)

### PBS System

```
+ CLAUDE.md                             # Enhanced with all links

+ docs/
│   ├── AI/
│   │   └── PBS_REFERENCE.md            # Quick reference
│   ├── TECH/
│   │   ├── bun.md
│   │   ├── hono.md
│   │   ├── orpc.md
│   │   ├── drizzle.md
│   │   ├── better-auth.md
│   │   ├── tanstack-router.md
│   │   ├── shadcn.md
│   │   └── e2e-testing.md
│   ├── REFERENCE/
│   │   └── .gitkeep
│   ├── ARCHITECTURE.md
│   ├── CHANGELOG.md
│   └── PROJECT_STATUS.md
```

### Subagents

```
+ .claude/
│   ├── agents/
│   │   ├── retro-agent.md
│   │   ├── changelog-updater.md
│   │   └── frontend-tester.md
│   └── commands/
│       ├── init.md
│       ├── status.md
│       ├── ship.md
│       ├── update-docs-and-commit.md
│       └── create-worktrees.md
```

### Hooks

```
+ .claude/
│   ├── hooks/
│   │   ├── PreToolUse.sh
│   │   ├── PostToolUse.sh
│   │   ├── Stop.sh
│   │   ├── SessionStart.sh
│   │   └── PreCompact.sh
│   ├── skills/
│   │   ├── pbs-workflow.md
│   │   └── better-t-stack.md
│   └── settings.json
```

### MCP Config

```
+ .mcp.json                             # With selected servers
```

## 4.6 Extras (When Selected)

### PWA

```
+ apps/web/public/
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png

+ apps/web/src/
│   └── service-worker.ts
```

### Analytics (PostHog)

```
+ packages/analytics/
│   ├── src/
│   │   └── index.ts                    # PostHog setup
│   └── package.json

+ apps/web/src/lib/
│   └── analytics.ts
```

### Email (Resend)

```
+ packages/email/
│   ├── src/
│   │   ├── index.ts                    # Resend setup
│   │   └── templates/
│   │       ├── welcome.tsx
│   │       └── reset-password.tsx
│   └── package.json
```

### Error Tracking (Sentry)

```
+ apps/web/src/lib/
│   └── sentry.ts

+ apps/server/src/
│   └── sentry.ts
```

---

# 5. TEMPLATE FILES

## 5.1 CLAUDE.md Template

```markdown
# CLAUDE.md

## Project Overview

{{PROJECT_NAME}} - {{PROJECT_DESCRIPTION}}

## Quick Start

\`\`\`bash
bun install
bun dev
\`\`\`

## Environment Variables

\`\`\`bash
# Required
DATABASE_URL={{DATABASE_PLACEHOLDER}}
BETTER_AUTH_SECRET=your_secret_here
{{#if google_auth}}
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
{{/if}}
{{#if github_auth}}
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
{{/if}}
\`\`\`

Copy \`.env.example\` to \`.env.local\` for local development.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and data flow
- [Changelog](docs/CHANGELOG.md) - Version history
- [Project Status](docs/PROJECT_STATUS.md) - Current progress

### Technology Docs

- [Bun](docs/TECH/bun.md) - Runtime and package manager
- [Hono](docs/TECH/hono.md) - Backend framework
- [oRPC](docs/TECH/orpc.md) - Type-safe API layer
- [Drizzle](docs/TECH/drizzle.md) - Database ORM
- [Better Auth](docs/TECH/better-auth.md) - Authentication
- [TanStack Router](docs/TECH/tanstack-router.md) - Frontend routing
- [shadcn/ui](docs/TECH/shadcn.md) - UI components
{{#if e2e_testing}}
- [E2E Testing](docs/TECH/e2e-testing.md) - Playwright patterns
{{/if}}

## Important Rules

1. Update files in the docs folder after major milestones
2. Use the \`/update-docs-and-commit\` slash command when making git commits
3. Always check PROJECT_STATUS.md to see where we left off
4. Reference ARCHITECTURE.md for system design decisions
5. Add REFERENCE docs for complex features

## Commands

| Command | Description |
|---------|-------------|
| \`bun dev\` | Start development servers |
| \`bun build\` | Build for production |
| \`bun test\` | Run unit tests |
{{#if e2e_testing}}
| \`bun test:e2e\` | Run E2E tests |
{{/if}}
| \`bun lint\` | Lint code |
| \`bun typecheck\` | Type check |

## Claude Code Commands

| Command | Description |
|---------|-------------|
| \`/init\` | Analyze project structure |
| \`/status\` | Show project status |
| \`/ship\` | Pre-deployment checklist |
| \`/update-docs-and-commit\` | Update docs and commit |

## Subagents

| Agent | Description |
|-------|-------------|
| \`@retro-agent\` | Run development retrospective |
| \`@changelog-updater\` | Update changelog entries |
| \`@frontend-tester\` | Run E2E tests |

## Stack

- **Frontend:** TanStack Router + React + shadcn/ui
- **Backend:** Hono + oRPC
- **Database:** Drizzle + {{DATABASE_TYPE}}
- **Auth:** Better Auth
- **Testing:** {{TESTING_STACK}}

## Theme

- **Style:** {{STYLE}}
- **Base:** {{BASE_COLOR}}
- **Accent:** {{ACCENT_COLOR}}
- **Font:** {{FONT}}
- **Icons:** {{ICONS}}
```

## 5.2 PROJECT_STATUS.md Template

```markdown
# Project Status

## Current Phase

**Phase 1: Foundation** (In Progress)

## Milestones

| Phase | Description | Status | Progress |
|-------|-------------|--------|----------|
| 1 | Foundation | ?? In Progress | 10% |
| 2 | Core Features | ⏳ Planned | 0% |
| 3 | Polish & Launch | ⏳ Planned | 0% |

## Phase 1: Foundation

### Completed
- [x] Project scaffolded with create-karetech-stack
- [x] Basic project structure

### In Progress
- [ ] Database schema design
- [ ] Authentication setup

### Planned
- [ ] Core API endpoints
- [ ] Basic UI layout

## Where We Left Off

**Last Session:** Project created

**What was done:**
- Scaffolded new project
- Initialized git repository

**Immediate next steps:**
1. Design database schema
2. Set up authentication
3. Create basic layouts

## Blockers

None currently.

## Notes

- Created with create-karetech-stack
- Using {{STYLE}} theme with {{ACCENT_COLOR}} accent
```

## 5.3 ARCHITECTURE.md Template

```markdown
# Architecture

## Overview

{{PROJECT_NAME}} is built on the Better-T-Stack architecture.

## System Design

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │     TanStack Router + React + shadcn/ui              │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│                      oRPC Client                             │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                        SERVER                                │
│                           │                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Hono + oRPC Router                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   Better Auth    │    Drizzle ORM                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                      DATABASE                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  {{DATABASE_TYPE}}                   │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
\`\`\`

## Project Structure

\`\`\`
{{PROJECT_NAME}}/
├── apps/
│   ├── web/           # Frontend (React + TanStack Router)
│   └── server/        # Backend (Hono)
├── packages/
│   ├── api/           # oRPC procedures
│   ├── auth/          # Better Auth
│   ├── db/            # Drizzle schema
│   └── env/           # Environment validation
├── docs/              # Documentation
{{#if e2e_testing}}
├── e2e/               # E2E tests
{{/if}}
└── .claude/           # Claude Code config
\`\`\`

## Data Flow

1. User interacts with React UI
2. TanStack Router handles navigation
3. oRPC client makes type-safe API calls
4. Hono server processes requests
5. Better Auth handles authentication
6. Drizzle ORM queries database
7. Response flows back to UI

## Key Components

### Frontend
- **Router:** TanStack Router (file-based routing)
- **UI:** shadcn/ui + Tailwind CSS
- **State:** TanStack Query (server state)

### Backend
- **Framework:** Hono
- **API:** oRPC
- **Auth:** Better Auth

### Database
- **ORM:** Drizzle
- **Database:** {{DATABASE_TYPE}}

## Design Decisions

### ADR-001: Using oRPC over tRPC
- Lighter weight
- Simpler setup
- Good enough for most use cases

### ADR-002: Using Better Auth
- More flexible than Auth.js
- Better TypeScript support
- Easy to add providers
```

---

# 6. PRESETS SYSTEM

## 6.1 Available Presets

### SaaS Starter

```bash
bunx create-karetech-stack my-saas --preset saas
```

```json
{
  "name": "saas",
  "description": "SaaS application starter",
  "config": {
    "database": "postgresql",
    "auth": ["email", "google", "github"],
    "api": "orpc",
    "style": "mira",
    "base": "zinc",
    "accent": "blue",
    "font": "inter",
    "icons": "tabler",
    "radius": "0.5rem",
    "testing": {
      "e2e": "playwright",
      "unit": "bun",
      "examples": true
    },
    "devops": {
      "docker": true,
      "ci": "github-actions",
      "deploy": "vercel"
    },
    "ai": {
      "pbs": true,
      "subagents": true,
      "hooks": true,
      "mcp": ["shadcn", "context7"]
    },
    "extras": ["analytics"]
  }
}
```

### E-commerce

```bash
bunx create-karetech-stack my-shop --preset ecommerce
```

```json
{
  "name": "ecommerce",
  "description": "E-commerce application starter",
  "config": {
    "database": "postgresql",
    "auth": ["email", "google"],
    "api": "orpc",
    "style": "nova",
    "base": "slate",
    "accent": "green",
    "font": "figtree",
    "icons": "lucide",
    "radius": "0.5rem",
    "testing": {
      "e2e": "playwright",
      "unit": "bun",
      "examples": true
    },
    "devops": {
      "docker": true,
      "ci": "github-actions",
      "deploy": "vercel"
    },
    "ai": {
      "pbs": true,
      "subagents": true,
      "hooks": true,
      "mcp": ["shadcn", "context7"]
    },
    "extras": ["analytics", "email"]
  }
}
```

### Blog / Publishing

```bash
bunx create-karetech-stack my-blog --preset blog
```

```json
{
  "name": "blog",
  "description": "Blog/publishing platform starter",
  "config": {
    "database": "turso",
    "auth": ["email"],
    "api": "orpc",
    "style": "lyra",
    "base": "stone",
    "accent": "orange",
    "font": "source-serif",
    "icons": "lucide",
    "radius": "0.25rem",
    "testing": {
      "e2e": "none",
      "unit": "bun",
      "examples": false
    },
    "devops": {
      "docker": false,
      "ci": "github-actions",
      "deploy": "vercel"
    },
    "ai": {
      "pbs": true,
      "subagents": true,
      "hooks": false,
      "mcp": ["shadcn"]
    },
    "extras": []
  }
}
```

### Developer Tool

```bash
bunx create-karetech-stack my-tool --preset devtool
```

```json
{
  "name": "devtool",
  "description": "Developer tool starter",
  "config": {
    "database": "postgresql",
    "auth": ["github"],
    "api": "orpc",
    "style": "mira",
    "base": "zinc",
    "accent": "green",
    "font": "geist",
    "icons": "tabler",
    "radius": "0.5rem",
    "testing": {
      "e2e": "playwright",
      "unit": "bun",
      "examples": true
    },
    "devops": {
      "docker": true,
      "ci": "github-actions",
      "deploy": "railway"
    },
    "ai": {
      "pbs": true,
      "subagents": true,
      "hooks": true,
      "mcp": ["shadcn", "context7", "github"]
    },
    "extras": ["error-tracking"]
  }
}
```

### Portfolio

```bash
bunx create-karetech-stack my-portfolio --preset portfolio
```

```json
{
  "name": "portfolio",
  "description": "Portfolio/personal site starter",
  "config": {
    "database": "none",
    "auth": [],
    "api": "none",
    "style": "vega",
    "base": "neutral",
    "accent": "violet",
    "font": "outfit",
    "icons": "lucide",
    "radius": "0",
    "testing": {
      "e2e": "none",
      "unit": "none",
      "examples": false
    },
    "devops": {
      "docker": false,
      "ci": "github-actions",
      "deploy": "vercel"
    },
    "ai": {
      "pbs": true,
      "subagents": false,
      "hooks": false,
      "mcp": ["shadcn"]
    },
    "extras": []
  }
}
```

### Minimal

```bash
bunx create-karetech-stack my-app --preset minimal
```

```json
{
  "name": "minimal",
  "description": "Minimal starter (just the basics)",
  "config": {
    "database": "postgresql",
    "auth": ["email"],
    "api": "orpc",
    "style": "mira",
    "base": "zinc",
    "accent": "blue",
    "font": "inter",
    "icons": "lucide",
    "radius": "0.5rem",
    "testing": {
      "e2e": "none",
      "unit": "bun",
      "examples": false
    },
    "devops": {
      "docker": false,
      "ci": "none",
      "deploy": "none"
    },
    "ai": {
      "pbs": true,
      "subagents": false,
      "hooks": false,
      "mcp": []
    },
    "extras": []
  }
}
```

---

# 7. IMPLEMENTATION PLAN

## 7.1 Phase 1: Fork & Setup (Week 1)

### Tasks

- [ ] Fork better-t-stack repository
- [ ] Rename to create-karetech-stack
- [ ] Update package.json with new name
- [ ] Set up development environment
- [ ] Update branding (README, CLI messages)
- [ ] Test that fork works unchanged

### Deliverables

- Working fork that produces same output as original
- Updated package name and branding

## 7.2 Phase 2: Enhanced Wizard (Week 2)

### Tasks

- [ ] Add project description prompt
- [ ] Add auth providers multi-select
- [ ] Add design step (style, colors, font)
- [ ] Add testing step (E2E, unit)
- [ ] Add DevOps step (Docker, CI/CD)
- [ ] Add AI workflow step (PBS, agents)
- [ ] Add extras step (analytics, email)
- [ ] Add summary screen

### Deliverables

- Complete enhanced wizard flow
- All new prompts working

## 7.3 Phase 3: Template Generation (Week 3-4)

### Tasks

- [ ] Create design templates (5 styles)
- [ ] Create theme CSS generator
- [ ] Create testing templates (Playwright, Puppeteer)
- [ ] Create DevOps templates (Docker, GitHub Actions)
- [ ] Create AI workflow templates (PBS, agents, hooks)
- [ ] Create extras templates (analytics, email)
- [ ] Wire all options to scaffolder

### Deliverables

- All template files created
- Scaffolder generates correct structure for all options

## 7.4 Phase 4: PBS Integration (Week 5)

### Tasks

- [ ] Create CLAUDE.md template with all variables
- [ ] Create 4 essential docs templates
- [ ] Create TECH docs templates
- [ ] Create subagent templates
- [ ] Create hook templates
- [ ] Create slash command templates
- [ ] Create .mcp.json generator
- [ ] Create settings.json generator

### Deliverables

- Complete PBS system scaffolded
- All Claude Code configs working

## 7.5 Phase 5: Presets (Week 6)

### Tasks

- [ ] Create preset system
- [ ] Define 6 presets (saas, ecommerce, blog, devtool, portfolio, minimal)
- [ ] Add --preset flag to CLI
- [ ] Test all presets
- [ ] Document presets

### Deliverables

- Preset system working
- All 6 presets functional

## 7.6 Phase 6: Testing & Polish (Week 7-8)

### Tasks

- [ ] Test all wizard combinations
- [ ] Test all presets
- [ ] Write comprehensive tests
- [ ] Write documentation
- [ ] Create demo videos
- [ ] Publish to npm
- [ ] Create example projects

### Deliverables

- Published npm package
- Complete documentation
- Example projects

---

# 8. TECHNICAL ARCHITECTURE

## 8.1 CLI Structure

```
src/
├── index.ts                    # Entry point
├── cli.ts                      # CLI setup (Commander/Yargs)
├── wizard/
│   ├── index.ts               # Wizard orchestrator
│   ├── prompts/
│   │   ├── project-info.ts
│   │   ├── core-stack.ts
│   │   ├── design.ts
│   │   ├── testing.ts
│   │   ├── devops.ts
│   │   ├── ai-workflow.ts
│   │   └── extras.ts
│   └── summary.ts
├── generators/
│   ├── index.ts               # Generator orchestrator
│   ├── base.ts                # Base structure
│   ├── design.ts              # Theme/style generation
│   ├── testing.ts             # Test setup
│   ├── devops.ts              # Docker/CI generation
│   ├── ai-workflow.ts         # PBS generation
│   └── extras.ts              # Analytics, email, etc.
├── templates/
│   ├── base/                  # Base project files
│   ├── design/                # Theme templates
│   ├── testing/               # Test templates
│   ├── devops/                # Docker, CI templates
│   ├── ai/                    # PBS templates
│   └── extras/                # Extra feature templates
├── presets/
│   ├── index.ts               # Preset loader
│   ├── saas.json
│   ├── ecommerce.json
│   ├── blog.json
│   ├── devtool.json
│   ├── portfolio.json
│   └── minimal.json
└── utils/
    ├── file.ts                # File operations
    ├── git.ts                 # Git operations
    ├── package.ts             # Package.json manipulation
    └── theme.ts               # Theme/CSS generation
```

## 8.2 Dependencies

```json
{
  "dependencies": {
    "@clack/prompts": "^0.7.0",
    "commander": "^12.0.0",
    "chalk": "^5.3.0",
    "fs-extra": "^11.2.0",
    "handlebars": "^4.7.8",
    "ora": "^8.0.1",
    "execa": "^8.0.1"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tsup": "^8.0.0",
    "@types/fs-extra": "^11.0.4",
    "@types/node": "^20.0.0"
  }
}
```

## 8.3 Template Engine

Using Handlebars for template rendering:

```typescript
// src/utils/template.ts
import Handlebars from 'handlebars';
import fs from 'fs-extra';

export async function renderTemplate(
  templatePath: string,
  outputPath: string,
  context: Record<string, any>
): Promise<void> {
  const template = await fs.readFile(templatePath, 'utf-8');
  const compiled = Handlebars.compile(template);
  const rendered = compiled(context);
  await fs.outputFile(outputPath, rendered);
}
```

---

# 9. TESTING PLAN

## 9.1 Unit Tests

```typescript
// tests/wizard.test.ts
describe('Wizard', () => {
  test('should validate project name', () => {});
  test('should handle all database options', () => {});
  test('should handle all auth providers', () => {});
  test('should handle all design options', () => {});
});

// tests/generators.test.ts
describe('Generators', () => {
  test('should generate base structure', () => {});
  test('should generate design files', () => {});
  test('should generate testing setup', () => {});
  test('should generate devops files', () => {});
  test('should generate PBS system', () => {});
});

// tests/presets.test.ts
describe('Presets', () => {
  test('should load saas preset', () => {});
  test('should load ecommerce preset', () => {});
  test('should load blog preset', () => {});
  test('should load devtool preset', () => {});
  test('should load portfolio preset', () => {});
  test('should load minimal preset', () => {});
});
```

## 9.2 Integration Tests

```typescript
// tests/integration/scaffold.test.ts
describe('Full Scaffold', () => {
  test('should scaffold complete SaaS project', async () => {
    // Run CLI with saas preset
    // Verify all files exist
    // Verify file contents
    // Verify project builds
  });
  
  test('should scaffold minimal project', async () => {});
  test('should scaffold with all options enabled', async () => {});
  test('should scaffold with no options enabled', async () => {});
});
```

## 9.3 E2E Tests (Manual)

Checklist for each preset:

- [ ] Project scaffolds without errors
- [ ] `bun install` works
- [ ] `bun dev` starts server
- [ ] Frontend loads correctly
- [ ] Theme is applied correctly
- [ ] Auth flow works (if enabled)
- [ ] Tests run (if enabled)
- [ ] Docker builds (if enabled)
- [ ] CI passes (if enabled)

---

# 10. DOCUMENTATION

## 10.1 README.md

```markdown
# create-karetech-stack

An enhanced Better-T-Stack scaffold with AI workflow, testing, and DevOps built-in.

## Quick Start

\`\`\`bash
bunx create-karetech-stack my-app
\`\`\`

## With Preset

\`\`\`bash
bunx create-karetech-stack my-app --preset saas
\`\`\`

## Features

- ?? Better-T-Stack foundation (Bun, Hono, oRPC, Drizzle)
- ?? 5 visual styles with shadcn/ui v4
- ?? E2E testing with Playwright
- ?? Docker + CI/CD included
- ?? PBS system for Claude Code

## Presets

| Preset | Best For |
|--------|----------|
| saas | SaaS applications |
| ecommerce | E-commerce sites |
| blog | Blogs, publishing |
| devtool | Developer tools |
| portfolio | Portfolio sites |
| minimal | Simple apps |
```

## 10.2 CLI Help

```
create-karetech-stack [project-name] [options]

Options:
  -p, --preset <name>    Use a preset (saas, ecommerce, blog, devtool, portfolio, minimal)
  -y, --yes              Skip prompts, use defaults
  --no-git               Skip git initialization
  --no-install           Skip dependency installation
  -h, --help             Show help
  -v, --version          Show version

Examples:
  bunx create-karetech-stack my-app
  bunx create-karetech-stack my-app --preset saas
  bunx create-karetech-stack my-app -y
```

---

# 11. MAINTENANCE & UPDATES

## 11.1 Keeping in Sync

- Monitor better-t-stack for updates
- Merge upstream changes periodically
- Test after merging
- Document any conflicts resolved

## 11.2 Version Strategy

```
1.0.0 - Initial release
1.1.0 - New features (new presets, new options)
1.2.0 - Upstream sync + new features
2.0.0 - Breaking changes (if needed)
```

## 11.3 Roadmap

### v1.0 (Initial Release)
- All wizard options
- All presets
- Complete PBS integration

### v1.1 (Future)
- Stripe payments integration
- More auth providers
- i18n support

### v1.2 (Future)
- More presets (admin panel, API only)
- Theme marketplace
- Plugin system

---

# SUMMARY

## What We're Building

An enhanced Better-T-Stack scaffold (`create-karetech-stack`) that:

1. **Extends** Better-T-Stack with more options
2. **Includes** PBS system for AI workflow
3. **Adds** testing, DevOps, design choices
4. **Provides** presets for quick starts

## Timeline

| Phase | Duration | Description |
|-------|----------|-------------|
| 1 | Week 1 | Fork & Setup |
| 2 | Week 2 | Enhanced Wizard |
| 3 | Week 3-4 | Template Generation |
| 4 | Week 5 | PBS Integration |
| 5 | Week 6 | Presets |
| 6 | Week 7-8 | Testing & Polish |

**Total: 8 weeks**

## Success Metrics

- [ ] All presets working
- [ ] All wizard combinations working
- [ ] PBS system fully integrated
- [ ] Documentation complete
- [ ] Published to npm
- [ ] Example projects created

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Planning → Ready for Implementation


================================================================================
================================================================================
================================================================================

 █████╗ ██████╗ ██████╗ ███████╗███╗   ██╗██████╗ ██╗   ██╗███╗   ███╗     █████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔══██╗██║   ██║████╗ ████║    ██╔══██╗
███████║██║  ██║██║  ██║█████╗  ██╔██╗ ██║██║  ██║██║   ██║██╔████╔██║    ███████║
██╔══██║██║  ██║██║  ██║██╔══╝  ██║╚██╗██║██║  ██║██║   ██║██║╚██╔╝██║    ██╔══██║
██║  ██║██████╔╝██████╔╝███████╗██║ ╚████║██████╔╝╚██████╔╝██║ ╚═╝ ██║    ██║  ██║
╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝     ╚═╝    ╚═╝  ╚═╝

================================================================================
        ADDENDUM A: PRODUCTION INFRASTRUCTURE, SCHEMAS & SCRIPTS
================================================================================

# BETTER-T-STACK FORK PLAN — ADDENDUM A

## Production Infrastructure, Schemas, API Docs & Scripts

**Version:** 1.0  
**Complements:** BETTER_T_STACK_FORK_PLAN.md

---

# TABLE OF CONTENTS

1. [Optimized Docker Setup](#1-optimized-docker-setup)
2. [Database Schemas](#2-database-schemas)
3. [API Documentation](#3-api-documentation)
4. [Utility Scripts](#4-utility-scripts)
5. [Setup Scripts](#5-setup-scripts)
6. [Updated Scaffold Structure](#6-updated-scaffold-structure)

---

# 1. OPTIMIZED DOCKER SETUP

## 1.1 The Problem with Basic Dockerfiles

| Issue | Impact |
|-------|--------|
| Full node_modules | 2+ GB image |
| Dev dependencies included | Wasted space, security risk |
| Single-stage build | No optimization |
| Non-optimized base | Larger than needed |

## 1.2 Multi-Stage Optimized Dockerfile

### Dockerfile (Production - Target: <200MB)

```dockerfile
# ============================================
# BETTER-T-STACK OPTIMIZED PRODUCTION DOCKERFILE
# Multi-stage build for minimal image size
# Target: <200MB (down from 2+ GB)
# ============================================

# ============================================
# Stage 1: Base - Install dependencies
# ============================================
FROM oven/bun:1.2-slim AS base

WORKDIR /app

# Copy package files for dependency installation
COPY package.json bun.lockb ./
COPY apps/web/package.json ./apps/web/
COPY apps/server/package.json ./apps/server/
COPY packages/api/package.json ./packages/api/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/
COPY packages/env/package.json ./packages/env/

# Install ALL dependencies (needed for build)
# --linker hoisted is CRITICAL for Bun workspaces
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --linker hoisted

# ============================================
# Stage 2: Builder - Build the application
# ============================================
FROM base AS builder

WORKDIR /app

# Copy source code
COPY . .

# Build all packages and apps
ENV NODE_ENV=production
RUN bun run build

# ============================================
# Stage 3: Production Dependencies Only
# ============================================
FROM oven/bun:1.2-slim AS prod-deps

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
COPY apps/server/package.json ./apps/server/
COPY packages/api/package.json ./packages/api/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/
COPY packages/env/package.json ./packages/env/

# Install ONLY production dependencies
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --linker hoisted --production

# ============================================
# Stage 4: Final Production Image
# ============================================
FROM oven/bun:1.2-alpine AS production

# Security: Create non-root user
RUN addgroup -g 1000 appuser && \
    adduser -u 1000 -G appuser -h /app -D appuser

WORKDIR /app

# Copy production dependencies only
COPY --from=prod-deps --chown=appuser:appuser /app/node_modules ./node_modules

# Copy built server
COPY --from=builder --chown=appuser:appuser /app/apps/server/dist ./apps/server/dist

# Copy built frontend (static files)
COPY --from=builder --chown=appuser:appuser /app/apps/web/dist ./apps/web/dist

# Copy built packages
COPY --from=builder --chown=appuser:appuser /app/packages/api/dist ./packages/api/dist
COPY --from=builder --chown=appuser:appuser /app/packages/auth/dist ./packages/auth/dist
COPY --from=builder --chown=appuser:appuser /app/packages/db/dist ./packages/db/dist
COPY --from=builder --chown=appuser:appuser /app/packages/env/dist ./packages/env/dist

# Copy necessary config files
COPY --chown=appuser:appuser package.json ./

# Environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# Switch to non-root user
USER appuser

# Start command
CMD ["bun", "run", "start"]
```

## 1.3 Docker Compose Files

### docker-compose.yml (Development)

```yaml
# ============================================
# Development Docker Compose
# Hot reload, debugging, local database
# ============================================

version: "3.9"

services:
  # ---- Application (Dev Mode) ----
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: ${PROJECT_NAME:-app}-dev
    restart: unless-stopped
    ports:
      - "${PORT:-3000}:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/${PROJECT_NAME:-app}
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET:-dev_secret_change_me}
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network

  # ---- Database ----
  db:
    image: postgres:16-alpine
    container_name: ${PROJECT_NAME:-app}-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ${PROJECT_NAME:-app}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql:ro
    ports:
      - "${DB_PORT:-5432}:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  # ---- Database Admin (Optional) ----
  adminer:
    image: adminer:latest
    container_name: ${PROJECT_NAME:-app}-adminer
    restart: unless-stopped
    ports:
      - "${ADMINER_PORT:-8080}:8080"
    depends_on:
      - db
    networks:
      - app-network
    profiles:
      - tools

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### docker-compose.prod.yml (Production)

```yaml
# ============================================
# Production Docker Compose
# Optimized, secure, with health checks
# ============================================

version: "3.9"

services:
  # ---- Application (Production) ----
  app:
    image: ${DOCKER_REGISTRY:-}${PROJECT_NAME:-app}:${VERSION:-latest}
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: ${PROJECT_NAME:-app}
    restart: unless-stopped
    ports:
      - "${PORT:-3000}:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
      - BETTER_AUTH_URL=${BETTER_AUTH_URL}
    env_file:
      - .env.production
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      start_period: 40s
      retries: 3
    networks:
      - app-network
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 256M

  # ---- Database (Production) ----
  db:
    image: postgres:16-alpine
    container_name: ${PROJECT_NAME:-app}-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME:-app}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network
    # Don't expose DB port in production
    # ports:
    #   - "5432:5432"

  # ---- Redis Cache (Optional) ----
  redis:
    image: redis:7-alpine
    container_name: ${PROJECT_NAME:-app}-redis
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network
    profiles:
      - cache

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

### Dockerfile.dev (Development)

```dockerfile
# ============================================
# DEVELOPMENT DOCKERFILE
# Hot reload, debugging enabled
# ============================================

FROM oven/bun:1.2-slim

WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
COPY apps/web/package.json ./apps/web/
COPY apps/server/package.json ./apps/server/
COPY packages/*/package.json ./packages/

RUN bun install --linker hoisted

# Copy source
COPY . .

# Environment
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

# Development command with hot reload
CMD ["bun", "run", "dev"]
```

## 1.4 .dockerignore

```
# ============================================
# Docker Ignore File
# Keep build context small and fast
# ============================================

# Dependencies (installed in container)
node_modules
**/node_modules

# Build outputs (built in container)
dist
**/dist
.next
.turbo
.cache

# Git
.git
.gitignore

# Environment files (use docker-compose env_file)
.env
.env.*
!.env.example

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs

# Test files
coverage
**/*.test.ts
**/*.spec.ts
e2e

# Documentation
docs
*.md
!README.md

# Docker files (no need to copy into context)
Dockerfile*
docker-compose*
.dockerignore

# CI/CD
.github
.gitlab-ci.yml

# Misc
*.bak
*.old
*.backup
tmp
temp
```

## 1.5 Image Size Comparison

| Build Type | Expected Size |
|------------|---------------|
| Single-stage (all deps) | 2+ GB |
| Multi-stage (prod deps) | 400-600 MB |
| Multi-stage + Alpine | 150-250 MB |
| **Our optimized build** | **<200 MB** |

---

# 2. DATABASE SCHEMAS

## 2.1 Base Schema Template

### packages/db/src/schema/index.ts

```typescript
// ============================================
// DATABASE SCHEMA - Main Export
// ============================================

export * from './users';
export * from './sessions';
export * from './accounts';
export * from './verifications';

// Add your domain schemas here
// export * from './posts';
// export * from './comments';
// export * from './products';
```

### packages/db/src/schema/users.ts

```typescript
// ============================================
// USERS SCHEMA
// Core user table with Better Auth compatibility
// ============================================

import { pgTable, text, timestamp, uuid, boolean, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  // Primary key
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Core fields
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  name: text('name'),
  image: text('image'),
  
  // Role management
  role: text('role').default('user').notNull(), // 'user' | 'admin' | 'moderator'
  
  // Status
  isActive: boolean('is_active').default(true),
  isBanned: boolean('is_banned').default(false),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),
  
}, (table) => ({
  // Indexes for common queries
  emailIdx: index('users_email_idx').on(table.email),
  roleIdx: index('users_role_idx').on(table.role),
  createdAtIdx: index('users_created_at_idx').on(table.createdAt),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### packages/db/src/schema/sessions.ts

```typescript
// ============================================
// SESSIONS SCHEMA
// Better Auth session management
// ============================================

import { pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Session data
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // Metadata
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  
  // Timestamps
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
}, (table) => ({
  userIdIdx: index('sessions_user_id_idx').on(table.userId),
  tokenIdx: index('sessions_token_idx').on(table.sessionToken),
  expiresAtIdx: index('sessions_expires_at_idx').on(table.expiresAt),
}));

// Relations
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Types
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
```

### packages/db/src/schema/accounts.ts

```typescript
// ============================================
// ACCOUNTS SCHEMA
// OAuth provider accounts (Google, GitHub, etc.)
// ============================================

import { pgTable, text, timestamp, uuid, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // User reference
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // Provider info
  provider: text('provider').notNull(), // 'google' | 'github' | 'email'
  providerAccountId: text('provider_account_id').notNull(),
  
  // OAuth tokens
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  
}, (table) => ({
  userIdIdx: index('accounts_user_id_idx').on(table.userId),
  // Unique constraint: one account per provider per user
  providerAccountIdx: uniqueIndex('accounts_provider_account_idx')
    .on(table.provider, table.providerAccountId),
}));

// Relations
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// Types
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
```

### packages/db/src/schema/verifications.ts

```typescript
// ============================================
// VERIFICATIONS SCHEMA
// Email verification, password reset tokens
// ============================================

import { pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';

export const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Verification data
  identifier: text('identifier').notNull(), // email address
  token: text('token').notNull().unique(),
  type: text('type').notNull(), // 'email' | 'password_reset' | 'magic_link'
  
  // Timestamps
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
}, (table) => ({
  identifierIdx: index('verifications_identifier_idx').on(table.identifier),
  tokenIdx: index('verifications_token_idx').on(table.token),
  expiresAtIdx: index('verifications_expires_at_idx').on(table.expiresAt),
}));

// Types
export type Verification = typeof verifications.$inferSelect;
export type NewVerification = typeof verifications.$inferInsert;
```

## 2.2 Example Domain Schemas

### SaaS: Subscriptions

```typescript
// ============================================
// SUBSCRIPTIONS SCHEMA (SaaS)
// Stripe-compatible subscription management
// ============================================

import { pgTable, text, timestamp, uuid, integer, boolean, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // User reference
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // Stripe IDs
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripePriceId: text('stripe_price_id'),
  
  // Plan info
  plan: text('plan').notNull().default('free'), // 'free' | 'starter' | 'pro' | 'enterprise'
  status: text('status').notNull().default('active'), // 'active' | 'cancelled' | 'past_due' | 'trialing'
  
  // Billing cycle
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  
  // Usage limits
  apiCallsLimit: integer('api_calls_limit').default(1000),
  apiCallsUsed: integer('api_calls_used').default(0),
  storageLimit: integer('storage_limit').default(1000), // MB
  storageUsed: integer('storage_used').default(0),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  
}, (table) => ({
  userIdIdx: index('subscriptions_user_id_idx').on(table.userId),
  stripeCustomerIdx: index('subscriptions_stripe_customer_idx').on(table.stripeCustomerId),
  statusIdx: index('subscriptions_status_idx').on(table.status),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
```

### E-commerce: Products & Orders

```typescript
// ============================================
// PRODUCTS SCHEMA (E-commerce)
// ============================================

import { pgTable, text, timestamp, uuid, integer, decimal, boolean, index, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Basic info
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  
  // Pricing
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal('compare_at_price', { precision: 10, scale: 2 }),
  currency: text('currency').default('USD'),
  
  // Inventory
  sku: text('sku').unique(),
  stock: integer('stock').default(0),
  trackInventory: boolean('track_inventory').default(true),
  
  // Status
  status: text('status').default('draft'), // 'draft' | 'active' | 'archived'
  isVisible: boolean('is_visible').default(true),
  
  // Media
  images: jsonb('images').$type<string[]>().default([]),
  thumbnail: text('thumbnail'),
  
  // SEO
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at'),
  
}, (table) => ({
  slugIdx: index('products_slug_idx').on(table.slug),
  statusIdx: index('products_status_idx').on(table.status),
  priceIdx: index('products_price_idx').on(table.price),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// ============================================
// ORDERS SCHEMA
// ============================================

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Order number (human-readable)
  orderNumber: text('order_number').notNull().unique(),
  
  // Customer
  userId: uuid('user_id').references(() => users.id),
  email: text('email').notNull(),
  
  // Status
  status: text('status').default('pending'), // 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: text('payment_status').default('pending'), // 'pending' | 'paid' | 'failed' | 'refunded'
  
  // Totals
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).default('0'),
  shipping: decimal('shipping', { precision: 10, scale: 2 }).default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD'),
  
  // Addresses (JSON)
  shippingAddress: jsonb('shipping_address'),
  billingAddress: jsonb('billing_address'),
  
  // Payment
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  paidAt: timestamp('paid_at'),
  shippedAt: timestamp('shipped_at'),
  deliveredAt: timestamp('delivered_at'),
  
}, (table) => ({
  orderNumberIdx: index('orders_order_number_idx').on(table.orderNumber),
  userIdIdx: index('orders_user_id_idx').on(table.userId),
  statusIdx: index('orders_status_idx').on(table.status),
  createdAtIdx: index('orders_created_at_idx').on(table.createdAt),
}));

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
```

### Blog: Posts & Comments

```typescript
// ============================================
// POSTS SCHEMA (Blog)
// ============================================

import { pgTable, text, timestamp, uuid, boolean, index, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Author
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // Content
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  
  // Media
  coverImage: text('cover_image'),
  
  // Status
  status: text('status').default('draft'), // 'draft' | 'published' | 'archived'
  
  // SEO
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  tags: jsonb('tags').$type<string[]>().default([]),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at'),
  
}, (table) => ({
  authorIdIdx: index('posts_author_id_idx').on(table.authorId),
  slugIdx: index('posts_slug_idx').on(table.slug),
  statusIdx: index('posts_status_idx').on(table.status),
  publishedAtIdx: index('posts_published_at_idx').on(table.publishedAt),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}));

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// ============================================
// COMMENTS SCHEMA
// ============================================

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // References
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  parentId: uuid('parent_id'), // For nested comments
  
  // Content
  content: text('content').notNull(),
  
  // Guest info (if not logged in)
  authorName: text('author_name'),
  authorEmail: text('author_email'),
  
  // Status
  status: text('status').default('pending'), // 'pending' | 'approved' | 'spam'
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  
}, (table) => ({
  postIdIdx: index('comments_post_id_idx').on(table.postId),
  authorIdIdx: index('comments_author_id_idx').on(table.authorId),
  statusIdx: index('comments_status_idx').on(table.status),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
```

---

# 3. API DOCUMENTATION

## 3.1 API Documentation Template

### docs/API.md

```markdown
# API Documentation

## Base URL

\`\`\`
Development: http://localhost:3000/api
Production: https://your-domain.com/api
\`\`\`

## Authentication

All authenticated endpoints require a session token.

### Headers

\`\`\`http
Cookie: session=<session_token>
\`\`\`

Or for API clients:

\`\`\`http
Authorization: Bearer <api_key>
\`\`\`

---

## Endpoints

### Health Check

\`\`\`http
GET /health
\`\`\`

**Response:**
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-01-06T12:00:00.000Z",
  "version": "1.0.0"
}
\`\`\`

---

### Authentication

#### Sign Up

\`\`\`http
POST /auth/sign-up
\`\`\`

**Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "session": {
    "token": "session_token"
  }
}
\`\`\`

**Errors:**
| Status | Message |
|--------|---------|
| 400 | Invalid email format |
| 400 | Password too weak |
| 409 | Email already registered |

---

#### Sign In

\`\`\`http
POST /auth/sign-in
\`\`\`

**Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "session": {
    "token": "session_token",
    "expiresAt": "2025-01-13T12:00:00.000Z"
  }
}
\`\`\`

---

#### Sign Out

\`\`\`http
POST /auth/sign-out
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true
}
\`\`\`

---

#### Get Current User

\`\`\`http
GET /auth/me
\`\`\`

**Headers:**
\`\`\`http
Cookie: session=<session_token>
\`\`\`

**Response (200):**
\`\`\`json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "image": null,
    "role": "user",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
\`\`\`

---

#### OAuth Sign In

\`\`\`http
GET /auth/sign-in/:provider
\`\`\`

**Providers:** `google`, `github`, `apple`

**Response:** Redirect to OAuth provider

---

### Users (Admin)

#### List Users

\`\`\`http
GET /users
\`\`\`

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| search | string | - | Search by name/email |
| role | string | - | Filter by role |
| sort | string | createdAt | Sort field |
| order | string | desc | Sort order |

**Response (200):**
\`\`\`json
{
  "users": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
\`\`\`

---

## Error Responses

All errors follow this format:

\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
\`\`\`

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Not authenticated |
| FORBIDDEN | 403 | Not authorized |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid input |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

---

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| /auth/* | 10 req/min |
| /api/* (authenticated) | 100 req/min |
| /api/* (unauthenticated) | 20 req/min |

Headers returned:
\`\`\`http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704538800
\`\`\`

---

## Webhooks

### Webhook Payload

\`\`\`json
{
  "event": "user.created",
  "timestamp": "2025-01-06T12:00:00.000Z",
  "data": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
\`\`\`

### Events

| Event | Description |
|-------|-------------|
| user.created | New user signed up |
| user.updated | User profile updated |
| user.deleted | User account deleted |

### Webhook Signature

Verify webhooks using the signature header:

\`\`\`http
X-Webhook-Signature: sha256=...
\`\`\`
```

## 3.2 OpenAPI/Swagger Template

### docs/openapi.yaml

```yaml
openapi: 3.1.0
info:
  title: {{PROJECT_NAME}} API
  description: API documentation for {{PROJECT_NAME}}
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com

servers:
  - url: http://localhost:3000/api
    description: Development
  - url: https://api.example.com
    description: Production

tags:
  - name: Health
    description: Health check endpoints
  - name: Auth
    description: Authentication endpoints
  - name: Users
    description: User management

paths:
  /health:
    get:
      tags: [Health]
      summary: Health check
      responses:
        '200':
          description: Server is healthy
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: ok
                  timestamp:
                    type: string
                    format: date-time
                  version:
                    type: string
                    example: 1.0.0

  /auth/sign-up:
    post:
      tags: [Auth]
      summary: Create new account
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SignUpRequest'
      responses:
        '201':
          description: Account created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '400':
          $ref: '#/components/responses/ValidationError'
        '409':
          $ref: '#/components/responses/ConflictError'

  /auth/sign-in:
    post:
      tags: [Auth]
      summary: Sign in to account
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SignInRequest'
      responses:
        '200':
          description: Signed in successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'

  /auth/me:
    get:
      tags: [Auth]
      summary: Get current user
      security:
        - sessionAuth: []
      responses:
        '200':
          description: Current user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '401':
          $ref: '#/components/responses/UnauthorizedError'

components:
  securitySchemes:
    sessionAuth:
      type: apiKey
      in: cookie
      name: session
    bearerAuth:
      type: http
      scheme: bearer

  schemas:
    SignUpRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          minLength: 8
        name:
          type: string

    SignInRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string

    AuthResponse:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/User'
        session:
          $ref: '#/components/schemas/Session'

    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        name:
          type: string
        image:
          type: string
          nullable: true
        role:
          type: string
          enum: [user, admin, moderator]
        createdAt:
          type: string
          format: date-time

    Session:
      type: object
      properties:
        token:
          type: string
        expiresAt:
          type: string
          format: date-time

    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object

  responses:
    UnauthorizedError:
      description: Not authenticated
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ValidationError:
      description: Invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ConflictError:
      description: Resource already exists
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
```

---

# 4. UTILITY SCRIPTS

## 4.1 scripts/init-db.sql

```sql
-- ============================================
-- DATABASE INITIALIZATION SCRIPT
-- Run on first database creation
-- ============================================

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types (optional)
-- CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator');

-- Grant permissions (for Docker setup)
GRANT ALL PRIVILEGES ON DATABASE "${DB_NAME:-app}" TO "${DB_USER:-postgres}";
```

## 4.2 scripts/db-migrate.sh

```bash
#!/bin/bash
# ============================================
# DATABASE MIGRATION SCRIPT
# ============================================

set -e

echo "??️  Running database migrations..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set"
  exit 1
fi

# Generate migrations
echo "?? Generating migrations..."
bun run db:generate

# Push migrations
echo "?? Pushing migrations..."
bun run db:push

echo "✅ Migrations complete!"
```

## 4.3 scripts/db-seed.sh

```bash
#!/bin/bash
# ============================================
# DATABASE SEEDING SCRIPT
# ============================================

set -e

echo "?? Seeding database..."

# Run seed script
bun run db:seed

echo "✅ Seeding complete!"
```

## 4.4 scripts/db-backup.sh

```bash
#!/bin/bash
# ============================================
# DATABASE BACKUP SCRIPT
# ============================================

set -e

BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "?? Creating database backup..."

# For Docker
if [ -n "$DOCKER_CONTAINER" ]; then
  docker exec "$DOCKER_CONTAINER" pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"
else
  # Direct connection
  pg_dump "$DATABASE_URL" > "$BACKUP_FILE"
fi

# Compress
gzip "$BACKUP_FILE"

echo "✅ Backup created: ${BACKUP_FILE}.gz"

# Clean old backups (keep last 7)
echo "?? Cleaning old backups..."
ls -t "${BACKUP_DIR}"/backup_*.sql.gz | tail -n +8 | xargs -r rm

echo "✅ Backup complete!"
```

## 4.5 scripts/db-restore.sh

```bash
#!/bin/bash
# ============================================
# DATABASE RESTORE SCRIPT
# ============================================

set -e

BACKUP_FILE="$1"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: ./db-restore.sh <backup_file.sql.gz>"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Backup file not found: $BACKUP_FILE"
  exit 1
fi

echo "⚠️  This will overwrite the current database!"
read -p "Are you sure? (y/N) " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 1
fi

echo "?? Restoring database..."

# Decompress if needed
if [[ "$BACKUP_FILE" == *.gz ]]; then
  gunzip -c "$BACKUP_FILE" | psql "$DATABASE_URL"
else
  psql "$DATABASE_URL" < "$BACKUP_FILE"
fi

echo "✅ Database restored!"
```

---

# 5. SETUP SCRIPTS

## 5.1 scripts/setup.sh (Main Setup)

```bash
#!/bin/bash
# ============================================
# PROJECT SETUP SCRIPT
# One-command setup for new developers
# ============================================

set -e

echo "?? Setting up {{PROJECT_NAME}}..."
echo ""

# ============================================
# 1. Check prerequisites
# ============================================
echo "?? Checking prerequisites..."

# Check Bun
if ! command -v bun &> /dev/null; then
  echo "❌ Bun not found. Install from: https://bun.sh"
  exit 1
fi
echo "✅ Bun $(bun --version)"

# Check Docker (optional)
if command -v docker &> /dev/null; then
  echo "✅ Docker $(docker --version | cut -d ' ' -f 3 | tr -d ',')"
  HAS_DOCKER=true
else
  echo "⚠️  Docker not found (optional)"
  HAS_DOCKER=false
fi

echo ""

# ============================================
# 2. Install dependencies
# ============================================
echo "?? Installing dependencies..."
bun install

echo ""

# ============================================
# 3. Setup environment
# ============================================
echo "?? Setting up environment..."

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo "✅ Created .env.local from .env.example"
  
  # Generate secrets
  if command -v openssl &> /dev/null; then
    SECRET=$(openssl rand -base64 32)
    sed -i.bak "s/BETTER_AUTH_SECRET=.*/BETTER_AUTH_SECRET=$SECRET/" .env.local
    rm -f .env.local.bak
    echo "✅ Generated BETTER_AUTH_SECRET"
  fi
else
  echo "ℹ️  .env.local already exists"
fi

echo ""

# ============================================
# 4. Setup database
# ============================================
echo "??️  Setting up database..."

if [ "$HAS_DOCKER" = true ]; then
  echo "Starting database with Docker..."
  docker compose up -d db
  
  # Wait for database
  echo "Waiting for database..."
  sleep 5
fi

# Run migrations
echo "Running migrations..."
bun run db:push

echo ""

# ============================================
# 5. Generate types
# ============================================
echo "?? Generating types..."
bun run generate

echo ""

# ============================================
# 6. Done!
# ============================================
echo "============================================"
echo "✅ Setup complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Review .env.local and add your API keys"
echo "  2. Run 'bun dev' to start development"
echo "  3. Open http://localhost:3000"
echo ""
echo "Useful commands:"
echo "  bun dev           - Start development server"
echo "  bun build         - Build for production"
echo "  bun test          - Run tests"
echo "  bun db:studio     - Open database studio"
echo ""
```

## 5.2 scripts/start.sh (Production Start)

```bash
#!/bin/bash
# ============================================
# PRODUCTION START SCRIPT
# ============================================

set -e

echo "?? Starting {{PROJECT_NAME}} in production..."

# Check required environment variables
REQUIRED_VARS=(
  "DATABASE_URL"
  "BETTER_AUTH_SECRET"
)

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Required environment variable not set: $var"
    exit 1
  fi
done

# Run migrations
echo "?? Running database migrations..."
bun run db:push

# Start server
echo "?? Starting server..."
exec bun run start
```

## 5.3 scripts/docker-start.sh

```bash
#!/bin/bash
# ============================================
# DOCKER START SCRIPT
# One-command Docker deployment
# ============================================

set -e

echo "?? Starting with Docker..."

# Check if .env exists
if [ ! -f ".env" ] && [ ! -f ".env.production" ]; then
  echo "⚠️  No .env file found. Creating from example..."
  cp .env.example .env
  echo "⚠️  Please edit .env and add your configuration!"
  exit 1
fi

# Build and start
docker compose -f docker-compose.prod.yml up -d --build

# Show status
echo ""
echo "✅ Started! Checking status..."
docker compose -f docker-compose.prod.yml ps

echo ""
echo "?? Logs:"
docker compose -f docker-compose.prod.yml logs -f --tail=50
```

## 5.4 scripts/deploy.sh

```bash
#!/bin/bash
# ============================================
# DEPLOYMENT SCRIPT
# ============================================

set -e

TARGET="${1:-vercel}"

echo "?? Deploying to $TARGET..."

case $TARGET in
  vercel)
    echo "Deploying to Vercel..."
    vercel --prod
    ;;
  
  railway)
    echo "Deploying to Railway..."
    railway up
    ;;
  
  docker)
    echo "Building Docker image..."
    docker build -t {{PROJECT_NAME}}:latest .
    
    echo "Pushing to registry..."
    docker push ${DOCKER_REGISTRY}/{{PROJECT_NAME}}:latest
    ;;
  
  *)
    echo "Unknown target: $TARGET"
    echo "Usage: ./deploy.sh [vercel|railway|docker]"
    exit 1
    ;;
esac

echo "✅ Deployment complete!"
```

## 5.5 scripts/pbs-setup.sh (PBS System Setup)

```bash
#!/bin/bash
# ============================================
# PBS SYSTEM SETUP SCRIPT
# Sets up Claude Code configuration
# ============================================

set -e

echo "?? Setting up PBS system..."

# Create directories
mkdir -p docs/AI docs/TECH docs/REFERENCE docs/ADR docs/PRESETS
mkdir -p .claude/agents .claude/commands .claude/hooks .claude/skills
mkdir -p .beads/backlog .beads/completed

# Create essential docs
touch docs/ARCHITECTURE.md
touch docs/CHANGELOG.md
touch docs/PROJECT_STATUS.md

# Create TECH docs
touch docs/TECH/bun.md
touch docs/TECH/hono.md
touch docs/TECH/orpc.md
touch docs/TECH/drizzle.md
touch docs/TECH/better-auth.md
touch docs/TECH/tanstack-router.md
touch docs/TECH/shadcn.md
touch docs/TECH/e2e-testing.md

# Create beads
touch .beads/current.md

# Make hooks executable
chmod +x .claude/hooks/*.sh 2>/dev/null || true

echo "✅ PBS structure created!"
echo ""
echo "Next steps:"
echo "  1. Review CLAUDE.md"
echo "  2. Run 'claude' and '/init'"
echo ""
```

---

# 6. UPDATED SCAFFOLD STRUCTURE

## 6.1 Complete Project Structure with All Additions

```
my-app/
├── apps/
│   ├── web/                           # Frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/               # shadcn components
│   │   │   │   └── layout/
│   │   │   ├── routes/
│   │   │   ├── lib/
│   │   │   ├── styles/
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── server/                        # Backend
│       ├── src/
│       │   ├── routes/
│       │   ├── middleware/
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── api/                           # oRPC procedures
│   │   ├── src/
│   │   │   ├── router.ts
│   │   │   ├── procedures/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── auth/                          # Better Auth
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── db/                            # Drizzle ORM
│   │   ├── src/
│   │   │   ├── schema/               # ← NEW: Organized schemas
│   │   │   │   ├── index.ts
│   │   │   │   ├── users.ts
│   │   │   │   ├── sessions.ts
│   │   │   │   ├── accounts.ts
│   │   │   │   └── verifications.ts
│   │   │   ├── client.ts
│   │   │   ├── seed.ts               # ← NEW: Seed script
│   │   │   └── index.ts
│   │   ├── drizzle.config.ts
│   │   └── package.json
│   │
│   └── env/                           # Environment validation
│       ├── src/
│       └── package.json
│
├── scripts/                           # ← NEW: All scripts
│   ├── setup.sh                      # Main setup
│   ├── start.sh                      # Production start
│   ├── docker-start.sh               # Docker deployment
│   ├── deploy.sh                     # Multi-target deploy
│   ├── pbs-setup.sh                  # PBS setup
│   ├── db-migrate.sh                 # DB migrations
│   ├── db-seed.sh                    # DB seeding
│   ├── db-backup.sh                  # DB backup
│   ├── db-restore.sh                 # DB restore
│   └── init-db.sql                   # Initial DB setup
│
├── docs/                              # Documentation
│   ├── AI/
│   │   └── PBS_REFERENCE.md
│   ├── TECH/
│   │   ├── bun.md
│   │   ├── hono.md
│   │   ├── orpc.md
│   │   ├── drizzle.md
│   │   ├── better-auth.md
│   │   ├── tanstack-router.md
│   │   ├── shadcn.md
│   │   └── e2e-testing.md
│   ├── REFERENCE/
│   ├── PRESETS/
│   │   └── current-theme.json
│   ├── API.md                        # ← NEW: API documentation
│   ├── openapi.yaml                  # ← NEW: OpenAPI spec
│   ├── ARCHITECTURE.md
│   ├── CHANGELOG.md
│   └── PROJECT_STATUS.md
│
├── e2e/                               # E2E tests
│   ├── fixtures/
│   ├── pages/
│   ├── tests/
│   └── playwright.config.ts
│
├── .claude/                           # Claude Code config
│   ├── agents/
│   │   ├── retro-agent.md
│   │   ├── changelog-updater.md
│   │   └── frontend-tester.md
│   ├── commands/
│   │   ├── init.md
│   │   ├── status.md
│   │   ├── ship.md
│   │   ├── update-docs-and-commit.md
│   │   └── create-worktrees.md
│   ├── hooks/
│   │   ├── PreToolUse.sh
│   │   ├── PostToolUse.sh
│   │   ├── Stop.sh
│   │   ├── SessionStart.sh
│   │   └── PreCompact.sh
│   ├── skills/
│   │   ├── pbs-workflow.md
│   │   └── better-t-stack.md
│   └── settings.json
│
├── .beads/                            # Task tracking
│   ├── current.md
│   ├── backlog/
│   └── completed/
│
├── .github/                           # CI/CD
│   └── workflows/
│       ├── ci.yml
│       ├── e2e.yml
│       └── deploy.yml
│
├── backups/                           # ← NEW: DB backups (gitignored)
│   └── .gitkeep
│
├── Dockerfile                         # ← NEW: Optimized multi-stage
├── Dockerfile.dev                     # ← NEW: Development
├── docker-compose.yml                 # ← NEW: Development
├── docker-compose.prod.yml            # ← NEW: Production
├── .dockerignore                      # ← NEW: Docker ignore
│
├── .env.example
├── .gitignore
├── .mcp.json
├── biome.json
├── bun.lockb
├── package.json
├── tsconfig.json
├── components.json
├── README.md
└── CLAUDE.md
```

## 6.2 Updated package.json Scripts

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "start": "bun run apps/server/dist/index.js",
    "lint": "biome check .",
    "lint:fix": "biome check --fix .",
    "typecheck": "turbo typecheck",
    "test": "bun test",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:seed": "bun run packages/db/src/seed.ts",
    "db:migrate": "./scripts/db-migrate.sh",
    "db:backup": "./scripts/db-backup.sh",
    "db:restore": "./scripts/db-restore.sh",
    
    "setup": "./scripts/setup.sh",
    "docker:dev": "docker compose up",
    "docker:prod": "docker compose -f docker-compose.prod.yml up -d",
    "docker:build": "docker compose -f docker-compose.prod.yml build",
    "docker:logs": "docker compose -f docker-compose.prod.yml logs -f",
    "docker:stop": "docker compose -f docker-compose.prod.yml down",
    
    "deploy": "./scripts/deploy.sh",
    "deploy:vercel": "./scripts/deploy.sh vercel",
    "deploy:railway": "./scripts/deploy.sh railway",
    "deploy:docker": "./scripts/deploy.sh docker"
  }
}
```

---

# SUMMARY

## What This Addendum Adds

| Category | Files Added |
|----------|-------------|
| **Docker** | Optimized Dockerfile, Dockerfile.dev, docker-compose.yml, docker-compose.prod.yml, .dockerignore |
| **Database Schemas** | Base schemas (users, sessions, accounts, verifications) + Domain templates (subscriptions, products, posts) |
| **API Documentation** | docs/API.md, docs/openapi.yaml |
| **Utility Scripts** | db-migrate.sh, db-seed.sh, db-backup.sh, db-restore.sh, init-db.sql |
| **Setup Scripts** | setup.sh, start.sh, docker-start.sh, deploy.sh, pbs-setup.sh |

## Docker Image Size

| Stage | Size |
|-------|------|
| All dependencies | 2+ GB |
| Production only | 400-600 MB |
| + Alpine base | 150-250 MB |
| **Target** | **<200 MB** |

## Key Optimizations

1. **Multi-stage builds** — Separate build and runtime
2. **Production dependencies only** — `--production` flag
3. **Alpine base image** — Smaller than full Debian
4. **Non-root user** — Security best practice
5. **Health checks** — Container orchestration support
6. **Cache mounts** — Faster rebuilds
7. **`--linker hoisted`** — Critical for Bun workspaces

---

**Document Version:** 1.0  
**Complements:** BETTER_T_STACK_FORK_PLAN.md  
**Last Updated:** January 2025


================================================================================
================================================================================
================================================================================

 █████╗ ██████╗ ██████╗ ███████╗███╗   ██╗██████╗ ██╗   ██╗███╗   ███╗    ██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔══██╗██║   ██║████╗ ████║    ██╔══██╗
███████║██║  ██║██║  ██║█████╗  ██╔██╗ ██║██║  ██║██║   ██║██╔████╔██║    ██████╔╝
██╔══██║██║  ██║██║  ██║██╔══╝  ██║╚██╗██║██║  ██║██║   ██║██║╚██╔╝██║    ██╔══██╗
██║  ██║██████╔╝██████╔╝███████╗██║ ╚████║██████╔╝╚██████╔╝██║ ╚═╝ ██║    ██████╔╝
╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝     ╚═╝    ╚═════╝ 

================================================================================
   ADDENDUM B: PRODUCTION DOCKER INFRASTRUCTURE (BATTLE-TESTED 128-180MB)
================================================================================

# Better-T-Stack Fork Plan - Addendum B: Production Docker Infrastructure

> **Status**: PRODUCTION-PROVEN  
> **Source**: GK-Nexus (SYNERGY-GY) - Deployed December 2024-January 2025  
> **Image Size**: 128-180MB (vs 2.35GB naive approach)  
> **Build Time**: ~3 minutes  
> **Based On**: Real GitHub repository configuration

---

## Executive Summary

This addendum replaces theoretical Docker recommendations with **production-tested configuration** from the GK-Nexus project. The bundled approach achieves:

| Metric | Target | Achieved |
|--------|--------|----------|
| Image size | < 300MB | **128-180MB** ✅ |
| Build time | < 5min | ~3min ✅ |
| Startup time | < 60s | ~15s ✅ |
| Health check | < 2s | <1s ✅ |
| Memory usage | < 512MB | ~200MB ✅ |

---

## 1. Production Dockerfile (Bundled Approach)

### Key Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      BUILD STAGES                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Stage 1: PRUNER                                                 │
│  ┌────────────────────────────────────────────┐                 │
│  │ • Copy entire monorepo                      │                 │
│  │ • bunx turbo prune --scope=server --docker │                 │
│  │ • Output: Minimal build context             │                 │
│  └────────────────────────────────────────────┘                 │
│                         ↓                                        │
│  Stage 2: BUILDER                                                │
│  ┌────────────────────────────────────────────┐                 │
│  │ • Install ALL dependencies                  │                 │
│  │ • bun install --linker hoisted             │                 │
│  │ • Build web app with Turbo                  │                 │
│  │ • Bundle server with bun build              │                 │
│  │ • Output: server.bundled.js (2.5MB)         │                 │
│  └────────────────────────────────────────────┘                 │
│                         ↓                                        │
│  Stage 3: RUNNER (Production)                                    │
│  ┌────────────────────────────────────────────┐                 │
│  │ • Alpine Linux base (~104MB)                │                 │
│  │ • Copy bundle + node_modules (externals)    │                 │
│  │ • Copy web build artifacts                  │                 │
│  │ • Non-root user (1001)                      │                 │
│  │ • Read-only filesystem                      │                 │
│  │ • Final size: 128-180MB                     │                 │
│  └────────────────────────────────────────────┘                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Production Dockerfile

```dockerfile
# syntax=docker/dockerfile:1.7
# =============================================================================
# Better-T-Stack Production Docker Image (Bundled)
# =============================================================================
# Production-optimized Docker image using Bun bundler for minimal size
#
# Architecture:
#   - Stage 1 (Pruner): Creates minimal build context using Turbo prune
#   - Stage 2 (Builder): Installs deps, builds web app, bundles server code
#   - Stage 3 (Runner): Copies bundle + node_modules + web assets
#
# CRITICAL: Some packages break when bundled/minified due to dynamic code:
#   - hono, @hono/* - Middleware dynamic loading
#   - @orpc/* - RPC runtime reflection
#   - better-auth - Session handling
#   - drizzle-orm - Query builder
#   - postgres - Native driver
# These are marked as --external and loaded from node_modules at runtime.
#
# Security (LinuxServer.io best practices):
#   - Non-root user (appuser:1001)
#   - Read-only filesystem with tmpfs mounts
#   - Dropped all capabilities
#   - no-new-privileges security opt
#   - Minimal Alpine base
#   - Health checks included
#
# Build: docker build -t better-t-stack:latest .
# Run:   docker compose up -d
# =============================================================================

# Build arguments
ARG BUN_VERSION=1.2
ARG VITE_SERVER_URL=http://localhost:3000

# =============================================================================
# Stage 1: Prune (create minimal build context)
# =============================================================================
FROM oven/bun:${BUN_VERSION} AS pruner
WORKDIR /app

# Copy entire monorepo and prune to server scope only
# This creates a minimal subset of files needed to build the server
COPY . .
RUN bunx turbo prune --scope=server --docker

# =============================================================================
# Stage 2: Builder (install deps + build + bundle)
# =============================================================================
FROM oven/bun:${BUN_VERSION} AS builder
WORKDIR /app

# Copy pruned lockfile and package.json files first (better caching)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock

# Install ALL dependencies with BuildKit cache mount
# CRITICAL: --linker hoisted required for Docker compatibility (Bun v1.2.19+)
# See: https://github.com/oven-sh/bun/issues/8033
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile --linker hoisted

# Copy pruned source code
COPY --from=pruner /app/out/full/ .

# Build web app with Turbo cache mount
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL

RUN --mount=type=cache,target=/root/.cache/turbo \
    bunx turbo build --filter=web...

# Bundle server with problematic packages marked as external
# These packages break when bundled/minified due to dynamic code patterns
# They are kept in node_modules and loaded at runtime
RUN mkdir -p dist && \
    bun build apps/server/src/index.ts \
    --target=bun \
    --outdir=dist \
    --entry-naming=server.bundled.js \
    --minify \
    --sourcemap=external \
    --external hono \
    --external '@hono/*' \
    --external '@orpc/*' \
    --external better-auth \
    --external drizzle-orm \
    --external postgres

# =============================================================================
# Stage 3: Slim Production Runner (Bundled)
# =============================================================================
FROM oven/bun:${BUN_VERSION}-alpine AS runner
WORKDIR /app

# OCI Labels (container metadata)
LABEL org.opencontainers.image.title="Better-T-Stack App" \
      org.opencontainers.image.description="Production deployment" \
      org.opencontainers.image.source="https://github.com/YOUR_ORG/YOUR_REPO" \
      maintainer="Your Name"

# Install curl for health checks and ca-certificates for SSL
RUN apk add --no-cache curl ca-certificates tzdata

# Create non-root user (appuser:1001)
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# Copy bundled server (workspace code bundled, external packages from node_modules)
COPY --from=builder --chown=appuser:appgroup /app/dist/server.bundled.js ./server.bundled.js
COPY --from=builder --chown=appuser:appgroup /app/dist/server.bundled.js.map ./server.bundled.js.map

# Copy node_modules for external packages (hono, @orpc/*, better-auth, drizzle-orm, postgres)
# These packages break when bundled due to dynamic code patterns
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules

# Copy web build artifacts
COPY --from=builder --chown=appuser:appgroup /app/apps/web/dist ./apps/web/dist

# Create writable directories for uploads and backups
# These should be mounted as volumes in production
RUN mkdir -p /app/data/uploads /app/backups && \
    chown -R appuser:appgroup /app/data /app/backups

# Switch to non-root user (security best practice)
USER appuser

# Environment variables
ENV NODE_ENV=production \
    PORT=3000

# Expose application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start bundled server
# NOTE: Database migrations should be run separately before deployment
CMD ["bun", "run", "/app/server.bundled.js"]
```

### Critical Notes on Bundling

**Packages that MUST be marked as `--external`:**

| Package | Reason |
|---------|--------|
| `hono` | Middleware dynamic loading fails when minified |
| `@hono/*` | Same as above for all Hono plugins |
| `@orpc/*` | RPC runtime reflection broken by tree-shaking |
| `better-auth` | Session handling uses dynamic patterns |
| `drizzle-orm` | Query builder relies on runtime analysis |
| `postgres` | Native driver with dynamic imports |

If you add new packages and encounter runtime errors after bundling, mark them as external.

---

## 2. Production Docker Compose

```yaml
# =============================================================================
# Better-T-Stack Docker Compose Configuration
# =============================================================================
# Production-ready setup following LinuxServer.io best practices
#
# SIMPLE SETUP:
#   1. cp .env.example .env
#   2. Edit .env (generate secrets: openssl rand -base64 32)
#   3. IMPORTANT: DATABASE_URL password must match POSTGRES_PASSWORD
#   4. docker compose up -d
#   5. curl http://localhost:3000/health
#
# Security:
#   - Non-root containers
#   - Read-only filesystems
#   - Dropped capabilities
#   - no-new-privileges
#   - Health checks
#   - Named volumes for data persistence
# =============================================================================

services:
  # ===========================================================================
  # PostgreSQL Database
  # ===========================================================================
  postgres:
    image: postgres:17-alpine
    container_name: ${PROJECT_NAME:-app}-postgres
    restart: unless-stopped

    environment:
      POSTGRES_USER: ${POSTGRES_USER:-appuser}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-dev_password_change_me}
      POSTGRES_DB: ${POSTGRES_DB:-app}

    ports:
      - "${POSTGRES_PORT:-5432}:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data

    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-appuser}"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s

    # Security hardening
    security_opt:
      - no-new-privileges:true

    networks:
      - app-network

  # ===========================================================================
  # Application Server (Bundled - ~150MB)
  # ===========================================================================
  server:
    # Option A: Pull from container registry
    # image: ghcr.io/YOUR_ORG/YOUR_REPO:latest
    
    # Option B: Build locally
    build:
      context: .
      dockerfile: Dockerfile
    
    container_name: ${PROJECT_NAME:-app}-server
    restart: unless-stopped

    depends_on:
      postgres:
        condition: service_healthy

    environment:
      # Database
      DATABASE_URL: ${DATABASE_URL:-postgresql://appuser:dev_password_change_me@postgres:5432/app}

      # Authentication (REQUIRED - generate: openssl rand -base64 32)
      BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET}
      BETTER_AUTH_URL: ${BETTER_AUTH_URL:-http://localhost:3000}
      CORS_ORIGIN: ${CORS_ORIGIN:-http://localhost:3001}

      # Application
      NODE_ENV: production
      PORT: ${PORT:-3000}

      # Initial Admin (optional, for first run)
      INITIAL_OWNER_EMAIL: ${INITIAL_OWNER_EMAIL:-}
      INITIAL_OWNER_PASSWORD: ${INITIAL_OWNER_PASSWORD:-}
      INITIAL_OWNER_NAME: ${INITIAL_OWNER_NAME:-Administrator}

      # Email (Optional)
      RESEND_API_KEY: ${RESEND_API_KEY:-}
      EMAIL_FROM: ${EMAIL_FROM:-}

    ports:
      - "${APP_PORT:-3000}:3000"

    # Persistent volumes
    volumes:
      - uploads:/app/data/uploads
      - backups:/app/backups

    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

    # Security hardening (LinuxServer.io best practices)
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=100m
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE

    networks:
      - app-network

# =============================================================================
# Named Volumes (Data Persistence)
# =============================================================================
volumes:
  postgres_data:
    name: ${PROJECT_NAME:-app}-postgres-data
    driver: local

  uploads:
    name: ${PROJECT_NAME:-app}-uploads
    driver: local

  backups:
    name: ${PROJECT_NAME:-app}-backups
    driver: local

# =============================================================================
# Networks
# =============================================================================
networks:
  app-network:
    driver: bridge
```

---

## 3. Development Docker Compose

```yaml
# =============================================================================
# Development Docker Compose
# =============================================================================
# For local development with hot reload
# Usage: docker compose -f docker-compose.dev.yml up -d
# =============================================================================

services:
  postgres:
    image: postgres:17-alpine
    container_name: ${PROJECT_NAME:-app}-postgres-dev
    restart: unless-stopped
    
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-appuser}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-dev_password}
      POSTGRES_DB: ${POSTGRES_DB:-app_dev}

    ports:
      - "${POSTGRES_PORT:-5432}:5432"

    volumes:
      - postgres_dev_data:/var/lib/postgresql/data

    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-appuser}"]
      interval: 5s
      timeout: 5s
      retries: 5

    networks:
      - dev-network

  # Optional: Database admin UI
  adminer:
    image: adminer:latest
    container_name: ${PROJECT_NAME:-app}-adminer
    restart: unless-stopped
    
    depends_on:
      postgres:
        condition: service_healthy

    ports:
      - "${ADMINER_PORT:-8080}:8080"

    environment:
      ADMINER_DEFAULT_SERVER: postgres

    networks:
      - dev-network

volumes:
  postgres_dev_data:
    name: ${PROJECT_NAME:-app}-postgres-dev-data

networks:
  dev-network:
    driver: bridge
```

---

## 4. Production .dockerignore

```dockerignore
# =============================================================================
# Docker Build Context Exclusions
# =============================================================================
# Optimizes build context size and speed

# Git
.git
.gitignore
.gitattributes

# Dependencies (installed in container)
node_modules
**/node_modules
**/.turbo

# Build outputs (created in container)
**/dist
**/build
**/.next
**/.cache
**/.vinxi

# Development/Local
.env
.env.local
.env.*.local
*.log
npm-debug.log*
bun.lockb
.DS_Store

# Docker files (not needed in context)
Dockerfile*
docker-compose*.yml
.dockerignore

# Documentation (not needed in runtime)
README*.md
CHANGELOG.md
CONTRIBUTING.md
docs
specs
*.md

# CI/CD
.github
.gitlab-ci.yml

# IDE
.vscode
.idea
.cursor
*.swp
*.swo
*~

# Backups (don't include in build)
backups
data/uploads

# Testing
**/e2e
**/*.spec.ts
**/*.test.ts
playwright-report
test-results
coverage
```

---

## 5. Environment Template

```bash
# =============================================================================
# Better-T-Stack Environment Configuration
# =============================================================================
# SIMPLE SETUP:
#   1. cp .env.example .env
#   2. Generate secrets: openssl rand -base64 32
#   3. Update POSTGRES_PASSWORD and DATABASE_URL (must match!)
#   4. docker compose up -d
# =============================================================================

# =============================================================================
# PROJECT SETTINGS
# =============================================================================
PROJECT_NAME="myapp"

# =============================================================================
# DATABASE (REQUIRED)
# =============================================================================
# Generate password: openssl rand -base64 32
POSTGRES_PASSWORD="CHANGE_ME_generate_with_openssl"

# IMPORTANT: Password in DATABASE_URL must match POSTGRES_PASSWORD!
DATABASE_URL="postgresql://appuser:CHANGE_ME_generate_with_openssl@postgres:5432/app"

# Database settings (usually don't need to change)
POSTGRES_DB="app"
POSTGRES_USER="appuser"
POSTGRES_PORT=5432

# =============================================================================
# AUTHENTICATION (REQUIRED)
# =============================================================================
# Generate: openssl rand -base64 32 (minimum 32 characters)
BETTER_AUTH_SECRET="your-32-character-minimum-secret-key"

# Backend URL (for auth redirects)
# PRODUCTION: Set to your domain (https://api.yourdomain.com)
BETTER_AUTH_URL="http://localhost:3000"

# CORS origin for frontend
# PRODUCTION: Set to your frontend domain (https://yourdomain.com)
CORS_ORIGIN="http://localhost:3001"

# Trusted origins (comma-separated, include all domains)
TRUSTED_ORIGINS="http://localhost:3000,http://localhost:3001"

# =============================================================================
# INITIAL ADMIN (First Run Only)
# =============================================================================
INITIAL_OWNER_EMAIL="admin@example.com"
INITIAL_OWNER_PASSWORD="ChangeMe123!SecurePassword"
INITIAL_OWNER_NAME="Administrator"

# =============================================================================
# APPLICATION
# =============================================================================
NODE_ENV="production"
PORT=3000
APP_PORT=3000

# Frontend API endpoint (for Vite)
VITE_SERVER_URL="http://localhost:3000"

# =============================================================================
# EMAIL (Optional)
# =============================================================================
# Get from: https://resend.com/api-keys
RESEND_API_KEY=""
EMAIL_FROM="noreply@yourdomain.com"

# =============================================================================
# PAYMENTS - Stripe (Optional)
# =============================================================================
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_CURRENCY="usd"

# =============================================================================
# CLOUD BACKUP (Optional)
# =============================================================================
# S3-compatible storage (AWS S3, Cloudflare R2, MinIO)
BACKUP_S3_ENDPOINT=""
BACKUP_S3_ACCESS_KEY_ID=""
BACKUP_S3_SECRET_ACCESS_KEY=""
BACKUP_S3_BUCKET="app-backups"
BACKUP_S3_REGION="auto"
```

---

## 6. Production Deployment Script

```bash
#!/bin/bash
# =============================================================================
# Production Deployment Script
# =============================================================================
# Zero-downtime deployment with backup and health checks
#
# Usage: ./deploy-production.sh
# =============================================================================

set -e  # Exit on any error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
GHCR_REGISTRY="ghcr.io"
IMAGE_NAME="YOUR_ORG/YOUR_REPO"
BACKUP_DIR="./backups"
LOG_FILE="deployment-$(date +%Y%m%d-%H%M%S).log"

# Functions
log() { echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"; }
error() { echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"; exit 1; }
info() { echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"; }

confirm() {
    read -p "$(echo -e ${YELLOW}$1${NC}) [y/N] " -n 1 -r
    echo
    [[ ! $REPLY =~ ^[Yy]$ ]] && error "Cancelled by user"
}

# =============================================================================
# Pre-deployment Checks
# =============================================================================

log "Starting production deployment..."

# Check .env exists
[ ! -f .env ] && error ".env file not found! Copy .env.example to .env first."

# Load and validate environment
source .env

REQUIRED_VARS=("DATABASE_URL" "BETTER_AUTH_SECRET" "BETTER_AUTH_URL" "CORS_ORIGIN")
for var in "${REQUIRED_VARS[@]}"; do
    [ -z "${!var}" ] && error "Required variable $var is not set"
    log "✓ $var is set"
done

# Validate secret strength
[ ${#BETTER_AUTH_SECRET} -lt 32 ] && error "BETTER_AUTH_SECRET must be 32+ chars"
log "✓ BETTER_AUTH_SECRET is strong (${#BETTER_AUTH_SECRET} chars)"

# Check Docker
docker info > /dev/null 2>&1 || error "Docker is not running"
docker compose version > /dev/null 2>&1 || error "Docker Compose not available"
log "✓ Docker is running"

# =============================================================================
# Database Backup
# =============================================================================

log "Creating pre-deployment backup..."
mkdir -p "$BACKUP_DIR"

if docker compose ps postgres | grep -q "Up"; then
    BACKUP_FILE="$BACKUP_DIR/pre-deploy-$(date +%Y%m%d-%H%M%S).sql.gz"
    docker compose exec -T postgres \
        pg_dump -U "${POSTGRES_USER:-appuser}" -d "${POSTGRES_DB:-app}" \
        2>/dev/null | gzip > "$BACKUP_FILE"
    
    if [ -f "$BACKUP_FILE" ]; then
        log "✓ Backup created: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"
    fi
else
    warn "Postgres not running - skipping backup (first deployment?)"
fi

# =============================================================================
# Pull Latest Image
# =============================================================================

log "Pulling latest Docker image..."
confirm "Pull $GHCR_REGISTRY/$IMAGE_NAME:latest?"

docker pull "$GHCR_REGISTRY/$IMAGE_NAME:latest" 2>&1 | tee -a "$LOG_FILE" \
    || error "Failed to pull image"

IMAGE_SIZE=$(docker images "$GHCR_REGISTRY/$IMAGE_NAME:latest" --format "{{.Size}}")
IMAGE_ID=$(docker images "$GHCR_REGISTRY/$IMAGE_NAME:latest" --format "{{.ID}}")
log "✓ Image pulled: $IMAGE_ID ($IMAGE_SIZE)"

# =============================================================================
# Deploy
# =============================================================================

confirm "Deploy new version?"

# Stop current containers
info "Stopping containers..."
docker compose down 2>&1 | tee -a "$LOG_FILE"

# Start postgres first
info "Starting PostgreSQL..."
docker compose up -d postgres

# Wait for postgres health
info "Waiting for PostgreSQL..."
for i in {1..30}; do
    docker compose ps postgres | grep -q "healthy" && break
    [ $i -eq 30 ] && error "PostgreSQL failed to become healthy"
    sleep 1
done
log "✓ PostgreSQL is healthy"

# =============================================================================
# Run Migrations
# =============================================================================

log "Running database migrations..."

# Create localhost DATABASE_URL for migrations
POSTGRES_PORT=${POSTGRES_PORT:-5432}
ENCODED_PASSWORD=$(printf '%s' "${POSTGRES_PASSWORD}" | xxd -plain | tr -d '\n' | sed 's/\(..\)/%\1/g')
MIGRATION_DB_URL="postgresql://${POSTGRES_USER:-appuser}:${ENCODED_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB:-app}"

set +e
MIGRATION_OUTPUT=$(DATABASE_URL="$MIGRATION_DB_URL" bun run db:push 2>&1)
MIGRATION_EXIT=$?
set -e

echo "$MIGRATION_OUTPUT" | tee -a "$LOG_FILE"

if [ $MIGRATION_EXIT -eq 0 ]; then
    log "✓ Migrations completed"
else
    echo "$MIGRATION_OUTPUT" | grep -q "No schema changes" \
        && log "✓ Schema up to date" \
        || error "Migration failed!"
fi

# Start application
info "Starting application..."
docker compose up -d server

# =============================================================================
# Health Checks
# =============================================================================

log "Waiting for health check..."
for i in {1..60}; do
    curl -sf "http://localhost:3000/health" > /dev/null 2>&1 && break
    [ $i -eq 60 ] && error "Health check failed after 60 attempts"
    info "Attempt $i/60..."
    sleep 2
done

HEALTH=$(curl -s "http://localhost:3000/health")
log "✓ Health check passed: $HEALTH"

# =============================================================================
# Summary
# =============================================================================

log ""
log "================================================================="
log "           🚀 DEPLOYMENT COMPLETED SUCCESSFULLY! 🚀"
log "================================================================="
log ""
log "Details:"
log "  Image: $GHCR_REGISTRY/$IMAGE_NAME:latest ($IMAGE_SIZE)"
log "  Backup: ${BACKUP_FILE:-none}"
log "  Log: $LOG_FILE"
log ""
log "Commands:"
log "  Monitor: docker compose logs -f server"
log "  Health:  curl http://localhost:3000/health"
log ""
log "Rollback:"
log "  docker compose down"
log "  gunzip -c $BACKUP_FILE | docker compose exec -T postgres psql -U appuser -d app"
log "  docker compose up -d"
log "================================================================="
```

---

## 7. Backup Script

```bash
#!/bin/bash
# =============================================================================
# Database Backup Script
# =============================================================================
# Creates complete backup of database and uploads
#
# Usage: ./scripts/backup.sh [backup-name]
# Example: ./scripts/backup.sh pre-update
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="${PROJECT_ROOT}/backups"
UPLOADS_DIR="${PROJECT_ROOT}/data/uploads"

# Docker settings
POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-app-postgres}"
POSTGRES_USER="${POSTGRES_USER:-appuser}"
POSTGRES_DB="${POSTGRES_DB:-app}"

# Timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="${1:-backup-${TIMESTAMP}}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."

    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running"
        exit 1
    fi

    if ! docker ps --format '{{.Names}}' | grep -q "^${POSTGRES_CONTAINER}$"; then
        print_error "PostgreSQL container '${POSTGRES_CONTAINER}' is not running"
        exit 1
    fi

    print_success "Prerequisites met"
}

# Create backup directory
setup_backup_dir() {
    print_info "Setting up backup directory..."
    mkdir -p "${BACKUP_DIR}"
    mkdir -p "${BACKUP_PATH}"
    mkdir -p "${BACKUP_PATH}/uploads"
    print_success "Created: ${BACKUP_PATH}"
}

# Backup database
backup_database() {
    print_info "Backing up database..."

    local db_file="${BACKUP_PATH}/database.sql"

    docker exec "${POSTGRES_CONTAINER}" pg_dump \
        -U "${POSTGRES_USER}" \
        -d "${POSTGRES_DB}" \
        --clean \
        --if-exists \
        --no-owner \
        --no-privileges \
        > "${db_file}"

    if [ $? -eq 0 ] && [ -s "${db_file}" ]; then
        print_success "Database backup: $(du -h "${db_file}" | cut -f1)"
    else
        print_error "Database backup failed"
        exit 1
    fi
}

# Backup uploads
backup_uploads() {
    print_info "Backing up uploads..."

    if [ -d "${UPLOADS_DIR}" ] && [ "$(ls -A ${UPLOADS_DIR} 2>/dev/null)" ]; then
        cp -r "${UPLOADS_DIR}"/* "${BACKUP_PATH}/uploads/" 2>/dev/null || true
        UPLOADS_COUNT=$(find "${BACKUP_PATH}/uploads" -type f | wc -l)
        print_success "Backed up ${UPLOADS_COUNT} files"
    else
        print_warning "No uploads found"
    fi
}

# Get version info
get_versions() {
    if [ -d "${PROJECT_ROOT}/.git" ]; then
        APP_VERSION=$(cd "${PROJECT_ROOT}" && git describe --tags --always 2>/dev/null || echo "unknown")
    else
        APP_VERSION="unknown"
    fi
    print_info "App version: ${APP_VERSION}"
}

# Generate manifest
generate_manifest() {
    print_info "Generating manifest..."

    local db_checksum=""
    if command -v sha256sum &> /dev/null; then
        db_checksum=$(sha256sum "${BACKUP_PATH}/database.sql" | cut -d' ' -f1)
    fi

    cat > "${BACKUP_PATH}/manifest.json" << EOF
{
  "version": "1.0.0",
  "appVersion": "${APP_VERSION}",
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "hostname": "$(hostname)",
  "backupName": "${BACKUP_NAME}",
  "database": {
    "name": "${POSTGRES_DB}",
    "checksum": "${db_checksum}"
  }
}
EOF

    print_success "Manifest generated"
}

# Create archive
create_archive() {
    print_info "Creating archive..."

    local archive_path="${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"

    cd "${BACKUP_DIR}"
    tar --exclude="*.DS_Store" -czf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}"

    rm -rf "${BACKUP_PATH}"

    print_success "Archive: ${archive_path} ($(du -h "${archive_path}" | cut -f1))"
    echo "${archive_path}"
}

# Main
main() {
    echo ""
    echo "=============================================="
    echo "       Database Backup Utility"
    echo "=============================================="
    echo ""

    check_prerequisites
    setup_backup_dir
    get_versions
    backup_database
    backup_uploads
    generate_manifest
    local archive=$(create_archive)

    echo ""
    echo "=============================================="
    print_success "Backup completed!"
    echo ""
    echo "  Archive: ${archive}"
    echo ""
    echo "Restore with:"
    echo "  ./scripts/restore.sh ${archive}"
    echo "=============================================="
}

main
```

---

## 8. Verify Docker Build Script

```bash
#!/bin/bash
# =============================================================================
# Docker Build Verification Script
# =============================================================================
# Verifies production Docker build:
#   - Builds successfully
#   - Image under 300MB
#   - Starts and becomes healthy
#   - Responds to health endpoint
# =============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
IMAGE_NAME="app-verify"
IMAGE_TAG="test"
CONTAINER_NAME="app-verify-test"
MAX_IMAGE_SIZE_MB=300
HEALTH_TIMEOUT=60
PORT=3000

# Cleanup on exit
cleanup() {
    echo -e "\n${BLUE}🧹 Cleaning up...${NC}"
    docker stop "${CONTAINER_NAME}" 2>/dev/null || true
    docker rm "${CONTAINER_NAME}" 2>/dev/null || true
    docker rmi "${IMAGE_NAME}:${IMAGE_TAG}" 2>/dev/null || true
    echo -e "${GREEN}✓ Cleanup complete${NC}"
}
trap cleanup EXIT

print_header() { echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n${BLUE}$1${NC}\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }

# Check Docker
check_docker() {
    docker info >/dev/null 2>&1 || { print_error "Docker not running"; exit 1; }
    print_success "Docker is running"
}

# Build image
build_image() {
    print_header "Building Docker Image"
    
    if DOCKER_BUILDKIT=1 docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" . 2>&1; then
        print_success "Image built successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Verify size
verify_size() {
    print_header "Verifying Image Size"
    
    local size_bytes=$(docker inspect "${IMAGE_NAME}:${IMAGE_TAG}" --format='{{.Size}}')
    local size_mb=$((size_bytes / 1024 / 1024))
    
    echo "Image size: ${size_mb} MB (limit: ${MAX_IMAGE_SIZE_MB} MB)"
    
    if [ ${size_mb} -le ${MAX_IMAGE_SIZE_MB} ]; then
        print_success "Size within limits"
    else
        print_error "Size exceeds limit"
        exit 1
    fi
}

# Start container
start_container() {
    print_header "Starting Container"
    
    docker run -d \
        --name "${CONTAINER_NAME}" \
        -p "${PORT}:${PORT}" \
        -e DATABASE_URL="postgresql://test:test@localhost:5432/test" \
        -e BETTER_AUTH_SECRET="test-secret-for-verification-only-32chars" \
        -e BETTER_AUTH_URL="http://localhost:${PORT}" \
        -e CORS_ORIGIN="http://localhost:3001" \
        "${IMAGE_NAME}:${IMAGE_TAG}" >/dev/null
    
    print_success "Container started"
}

# Wait for health
wait_for_health() {
    print_header "Waiting for Health Check"
    
    local elapsed=0
    while [ ${elapsed} -lt ${HEALTH_TIMEOUT} ]; do
        if curl -sf "http://localhost:${PORT}/health" >/dev/null 2>&1; then
            print_success "Container healthy (${elapsed}s)"
            return 0
        fi
        echo -n "."
        sleep 2
        elapsed=$((elapsed + 2))
    done
    
    echo ""
    print_error "Health check timeout"
    docker logs "${CONTAINER_NAME}" 2>&1 | tail -20
    exit 1
}

# Main
main() {
    echo -e "\n${BLUE}╔══════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║      Docker Build Verification Script            ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════╝${NC}"

    check_docker
    build_image
    verify_size
    start_container
    wait_for_health

    print_header "Verification Complete"
    print_success "All checks passed!"
    echo ""
    echo "Summary:"
    echo "  • Image built successfully"
    echo "  • Size under ${MAX_IMAGE_SIZE_MB} MB"
    echo "  • Container started and healthy"
    echo ""
}

main
```

---

## 9. GitHub Actions CI/CD

```yaml
# .github/workflows/docker-build.yml
name: Build & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GHCR
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            VITE_SERVER_URL=${{ vars.VITE_SERVER_URL }}

      - name: Verify image size
        if: github.event_name != 'pull_request'
        run: |
          docker pull ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          SIZE=$(docker images ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest --format "{{.Size}}")
          echo "Image size: $SIZE"

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name != 'pull_request'
    
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Run migrations
        run: bun run db:push
        env:
          DATABASE_URL: ${{ secrets.PRODUCTION_DATABASE_URL }}

      - name: Deploy to production
        run: |
          # SSH deploy or webhook trigger
          echo "Deploy triggered"
```

---

## 10. Image Size Evolution

### The Journey (from SYNERGY-GY)

| Phase | Size | Change | Key Optimization |
|-------|------|--------|------------------|
| Initial | 2.35 GB | - | Naive single-stage |
| Multi-stage | 1.43 GB | -39% | Separate build/runtime |
| Fix chown duplicate | 852 MB | -40% | --chown in COPY |
| Alpine + cleanup | 736 MB | -14% | Alpine base, remove docs |
| **Bundled approach** | **128-180 MB** | **-76%** | bun build + externals |

### Final Breakdown (~150MB)

```
Component          Size      Percentage
─────────────────────────────────────────
Alpine Linux       ~80 MB    53%
System packages    ~10 MB    7%
node_modules*      ~50 MB    33%
Server bundle      ~2.5 MB   2%
Web assets         ~5 MB     3%
Other              ~2.5 MB   2%
─────────────────────────────────────────
TOTAL              ~150 MB   100%

* Only external packages (hono, drizzle-orm, better-auth, postgres)
```

---

## Summary

This addendum provides **production-proven** Docker infrastructure from a real deployed application. Key learnings:

1. **Bundled approach is essential** — Using `bun build` with externals achieves 92% size reduction
2. **Some packages can't be bundled** — Mark dynamic packages as --external
3. **Turbo prune** — Creates minimal build context for faster builds
4. **--linker hoisted** — CRITICAL for Bun v1.2.19+ workspace resolution
5. **Security hardening** — Read-only filesystem, dropped caps, non-root user
6. **Migrations separately** — Never run migrations in container startup

The configuration has been battle-tested in production since December 2024.
