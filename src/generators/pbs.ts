/**
 * PBS (Plan-Build-Ship) documentation template generation system
 * Terminal 1: PBS Integration & Documentation
 * Constitutional compliance: Complete PBS methodology scaffolding
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
// ejs import removed - was unused
import { ProjectConfig } from '../types';

/**
 * PBS template configurations based on integration level
 */
const PBS_TEMPLATES = {
  full: {
    name: 'Full PBS System',
    description: 'Complete Plan-Build-Ship methodology with automation',
    files: [
      'docs/PBS_MASTER_SYSTEM.md',
      'docs/FORK_PLAN.md',
      'docs/ARCHITECTURE.md',
      'docs/PROJECT_STATUS.md',
      'docs/CHANGELOG.md',
      'docs/ADR/README.md',
      'docs/TECH/README.md',
      'CLAUDE.md',
      'constitution.md',
      '.specify/spec.md',
      '.specify/plan.md',
      '.specify/tasks/README.md',
      'scripts/pbs-init.sh',
      'scripts/pbs-status.sh'
    ],
    beadsIntegration: true,
    specifyIntegration: true
  },
  docs: {
    name: 'Documentation Only',
    description: 'PBS documentation without automation tools',
    files: [
      'docs/ARCHITECTURE.md',
      'docs/PROJECT_STATUS.md',
      'docs/CHANGELOG.md',
      'CLAUDE.md',
      'README.md'
    ],
    beadsIntegration: false,
    specifyIntegration: false
  },
  minimal: {
    name: 'Minimal PBS',
    description: 'Basic CLAUDE.md and essential documentation',
    files: [
      'CLAUDE.md',
      'docs/PROJECT_STATUS.md',
      'README.md'
    ],
    beadsIntegration: false,
    specifyIntegration: false
  },
  none: {
    name: 'No PBS Integration',
    description: 'Standard project without PBS methodology',
    files: [
      'README.md'
    ],
    beadsIntegration: false,
    specifyIntegration: false
  }
};

/**
 * Generate CLAUDE.md template based on project configuration
 */
function generateClaudeMdTemplate(config: ProjectConfig): string {
  return `# CLAUDE.md — ${config.projectName}

> **Project:** \`${config.projectName}\` — ${config.description}
> **Author:** ${config.author}
> **Status:** Development

---

## 🚨 BEFORE ANYTHING ELSE

1. **Read the Project Status:** [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) — Current state & blockers
2. **Read the Architecture:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — System design decisions
3. **Check the Tasks:** Review current sprint and issue tracking
${config.pbsLevel === 'full' ? `4. **Initialize tracking:** Run \`bd init\` then \`bd onboard\`` : ''}

---

## 📚 Essential Documentation

| Document | Purpose | Read When |
|----------|---------|-----------|
| [PROJECT_STATUS.md](docs/PROJECT_STATUS.md) | Current state & blockers | **Start of each session** |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design decisions | Before structural changes |
| [CHANGELOG.md](docs/CHANGELOG.md) | Version history | After completing features |
${config.pbsLevel === 'full' ? `| [PBS_MASTER_SYSTEM.md](docs/PBS_MASTER_SYSTEM.md) | Complete AI workflow methodology | **First** — defines all rules |` : ''}
${config.pbsLevel === 'full' ? `| [FORK_PLAN.md](docs/FORK_PLAN.md) | Implementation roadmap | Planning features |` : ''}

---

## 🎯 Project Overview

**Tech Stack:**
- **Runtime:** ${config.database === 'postgresql' ? 'Bun + PostgreSQL' : config.database === 'turso' ? 'Bun + Turso' : 'Bun + SQLite'}
- **Framework:** Better-T-Stack (Hono, oRPC, Drizzle, Better Auth)
- **Frontend:** React + TanStack Router + shadcn/ui (${config.uiStyle} theme)
- **Database:** ${config.database.charAt(0).toUpperCase() + config.database.slice(1)}
- **Authentication:** ${config.auth.length > 0 ? config.auth.join(', ') : 'None'}
- **Testing:** ${config.testing.length > 0 ? config.testing.join(', ') : 'None'}
- **Deployment:** ${config.deployTarget}
- **CI/CD:** ${config.cicd}

**Key Features:**
- ✅ Type-safe API with oRPC
- ✅ Modern UI with shadcn/ui v4
${config.auth.length > 0 ? '- ✅ Authentication system ready' : ''}
${config.testing.length > 0 ? '- ✅ Testing infrastructure configured' : ''}
${config.docker ? '- ✅ Docker containerization' : ''}
${config.pwa ? '- ✅ Progressive Web App features' : ''}

---

## 🔧 Development

### Quick Start
\`\`\`bash
bun install
bun dev
\`\`\`

### Essential Commands
\`\`\`bash
bun dev                          # Start development server
bun build                        # Build for production
bun test                         # Run tests
bun run typecheck                # TypeScript validation
bun run lint                     # Code linting
${config.database !== 'none' ? `
# Database
bun run db:generate              # Generate migrations
bun run db:migrate               # Run migrations
bun run db:studio                # Database studio` : ''}
${config.testing.includes('playwright') ? `
# E2E Testing
bun run test:e2e                 # Playwright tests
bun run test:e2e:ui              # Playwright UI mode` : ''}
${config.docker ? `
# Docker
bun run docker:dev               # Development with Docker
bun run docker:build             # Build production image` : ''}
\`\`\`

---

## 📁 Project Structure

\`\`\`
${config.projectName}/
├── src/                         # Application source
│   ├── components/              # React components
│   ├── lib/                     # Utility libraries
│   ├── routes/                  # TanStack Router routes
│   └── styles/                  # Styling and themes
├── server/                      # Backend API
│   ├── routes/                  # API endpoints
│   ├── db/                      # Database schema
│   └── auth/                    # Authentication
${config.testing.length > 0 ? `├── tests/                       # Test suites
${config.testing.includes('playwright') ? '│   ├── e2e/                     # E2E tests' : ''}
${config.unitTesting ? '│   └── unit/                   # Unit tests' : ''}` : ''}
${config.docker ? '├── Dockerfile                   # Container configuration' : ''}
${config.pbsLevel === 'full' ? `├── docs/                        # Documentation
│   ├── PBS_MASTER_SYSTEM.md    # AI workflow methodology
│   ├── ARCHITECTURE.md         # System design
│   └── PROJECT_STATUS.md       # Current state` : '├── docs/                        # Documentation'}
└── CLAUDE.md                   # ← You are here
\`\`\`

---

## 🎨 Design System

**UI Theme:** ${config.uiStyle} with ${config.baseColor}/${config.accentColor} color scheme
**Typography:** ${config.font} font family
**Icons:** ${config.icons}
**Border Radius:** ${config.borderRadius}rem

### Component Library
- **Base:** shadcn/ui v4 components
- **Styling:** Tailwind CSS with design tokens
- **Themes:** Support for light/dark mode

---

${config.auth.length > 0 ? `## 🔐 Authentication

**Providers:** ${config.auth.join(', ')}
**Library:** Better Auth
**Features:**
- Session management
- OAuth integration
- Role-based access control
${config.auth.includes('magic-links') ? '- Magic link authentication' : ''}

---

` : ''}

${config.pbsLevel === 'full' ? `## 🤖 AI Workflow Commands

### Beads (Issue Tracking)
\`\`\`bash
bd init                          # Initialize (first time)
bd ready                         # What's ready to work on?
bd list --status open            # All open issues
bd create "title" -p 1 -t task   # Create issue
bd close bd-XXXX --reason "Done" # Close issue
\`\`\`

### Spec Kit (Planning)
\`\`\`bash
/speckit.specify                 # Define what to build
/speckit.clarify                 # AI asks questions
/speckit.plan                    # Technical planning
/speckit.tasks                   # Break into tasks
\`\`\`

---

` : ''}

## 🚦 Golden Rules

1. **Type Safety First** — Strict TypeScript, no \`any\` types
2. **Test Before Deploy** — All tests must pass
3. **Document Changes** — Update docs after modifications
4. **Follow Conventions** — Consistent code style and patterns
${config.pbsLevel === 'full' ? '5. **Track Work** — Use Beads for all task tracking' : ''}

---

## 📋 Session Protocol

### Start of Session
${config.pbsLevel === 'full' ? '1. Run `bd ready` to see available work' : '1. Check docs/PROJECT_STATUS.md for current state'}
2. Review any blockers in PROJECT_STATUS.md
3. Check recent changes in CHANGELOG.md

### During Session
${config.pbsLevel === 'full' ? '1. Create issues for discovered work: `bd create "..." -t task`' : '1. Document new work in PROJECT_STATUS.md'}
2. Update issue status and progress
3. Follow established coding patterns

### End of Session
1. Update docs/PROJECT_STATUS.md
2. Update CHANGELOG.md with changes
${config.pbsLevel === 'full' ? '3. Close completed issues: `bd close bd-XXXX --reason "..."`' : ''}
4. Commit with conventional format

---

## 🔗 External Resources

| Resource | URL |
|----------|-----|
| Better-T-Stack | https://better-t-stack.dev |
| shadcn/ui | https://ui.shadcn.com |
| TanStack Router | https://tanstack.com/router |
| Drizzle ORM | https://orm.drizzle.team |
${config.testing.includes('playwright') ? '| Playwright | https://playwright.dev |' : ''}
${config.testing.includes('vitest') ? '| Vitest | https://vitest.dev |' : ''}

---

*Last Updated: ${new Date().toLocaleDateString()} - Generated by create-karetech-stack*
*Version: 1.0.0*
`;
}

/**
 * Generate constitution.md template for PBS projects
 */
function generateConstitutionTemplate(config: ProjectConfig): string {
  return `# Constitution — ${config.projectName}

> **Immutable principles and non-negotiable standards for ${config.projectName}**
> This document establishes the foundational rules that guide all development decisions.

---

## Article I: Core Principles

### 1.1 Type Safety
- **100% TypeScript** — No JavaScript files in source code
- **Strict Mode** — TypeScript strict mode enabled always
- **No \`any\` Types** — Explicit typing required for all declarations
- **Type Guards** — Proper runtime type validation at boundaries

### 1.2 Code Quality
- **ESLint Compliance** — All code must pass linting
- **Prettier Formatting** — Consistent code formatting enforced
- **Test Coverage** — ${config.unitTesting ? 'Minimum 80% test coverage' : 'Critical paths must be tested'}
- **Documentation** — Public APIs must be documented

### 1.3 Performance
- **Bundle Size** — Monitor and optimize bundle sizes
- **Runtime Performance** — Profile critical user journeys
- **Database Efficiency** — Optimize queries and schema design
- **Accessibility** — WCAG 2.1 AA compliance minimum

---

## Article II: Technology Standards

### 2.1 Stack Compliance
- **Better-T-Stack Foundation** — Core stack decisions are immutable
- **Database:** ${config.database.charAt(0).toUpperCase() + config.database.slice(1)} as primary data store
- **API Style:** ${config.apiStyle} for type-safe client-server communication
- **UI Framework:** React with TanStack Router
- **Styling:** Tailwind CSS with shadcn/ui components

### 2.2 Authentication
${config.auth.length > 0 ? `- **Providers:** ${config.auth.join(', ')} only
- **Security:** Implement proper session management
- **Authorization:** Role-based access control where applicable` : '- **No Authentication** — Project operates without user authentication'}

### 2.3 Testing Standards
${config.testing.length > 0 ? `- **E2E Testing:** ${config.testing.join(' + ')} for end-to-end validation
- **Unit Testing:** ${config.unitTesting ? 'Comprehensive unit test coverage' : 'Testing optional for this project'}
- **CI Integration:** All tests must pass before deployment` : '- **Testing Optional** — Minimal testing requirements for this project'}

---

## Article III: Development Workflow

### 3.1 Git Standards
- **Conventional Commits** — Follow conventional commit message format
- **Branch Protection** — Main branch requires PR approval
- **Code Review** — All changes require peer review
- **Linear History** — Prefer rebasing over merge commits

### 3.2 CI/CD Requirements
- **Automated Testing** — All PRs trigger test suites
- **Type Checking** — TypeScript compilation must succeed
- **Linting** — ESLint errors block deployment
- **Security Scanning** — Automated dependency vulnerability checks

${config.pbsLevel === 'full' ? `### 3.3 PBS Methodology
- **Plan-Build-Ship** — Follow PBS cycles for all features
- **Issue Tracking** — Use Beads for all work items
- **Documentation First** — Update docs before code changes
- **Constitutional Compliance** — All changes must align with constitution` : ''}

---

## Article IV: Architecture Decisions

### 4.1 File Structure
- **Colocation** — Related files grouped by feature, not type
- **Index Exports** — Clean public APIs through index files
- **Absolute Imports** — Use path mapping for clean imports
- **Component Structure** — Single file per component with tests adjacent

### 4.2 State Management
- **Local State** — useState for component-specific state
- **Server State** — TanStack Query for server data caching
- **Global State** — Context API for truly global application state
- **URL State** — TanStack Router for navigation state

### 4.3 Error Handling
- **Error Boundaries** — React error boundaries for UI failures
- **API Errors** — Structured error responses from server
- **User Feedback** — Clear error messages for user-facing errors
- **Logging** — ${config.errorTracking !== 'none' ? `Structured logging with ${config.errorTracking}` : 'Console-based logging in development'}

---

## Article V: Security Standards

### 5.1 Data Protection
- **Input Validation** — Validate all user inputs
- **SQL Injection** — Use parameterized queries only
- **XSS Prevention** — Escape all dynamic content
- **CSRF Protection** — Implement CSRF tokens for state changes

### 5.2 Authentication Security
${config.auth.length > 0 ? `- **Password Policy** — Strong password requirements
- **Session Security** — Secure session management
- **OAuth Security** — Proper OAuth flow implementation
- **Token Management** — Secure storage and rotation` : '- **No Authentication** — Public access assumed'}

### 5.3 Deployment Security
- **Environment Variables** — No secrets in source code
- **HTTPS Only** — All production traffic over HTTPS
- **Security Headers** — Implement security headers
- **Dependency Scanning** — Regular security audits

---

## Article VI: Performance Standards

### 6.1 Frontend Performance
- **Core Web Vitals** — Meet Google's Core Web Vitals thresholds
- **Bundle Size** — Optimize JavaScript bundle sizes
- **Image Optimization** — Compress and optimize all images
- **Caching Strategy** — Implement appropriate caching

### 6.2 Backend Performance
- **Response Time** — API responses under 200ms for 95th percentile
- **Database Performance** — Optimize queries and indexes
- **Connection Pooling** — Efficient database connections
- **Caching** — Implement application-level caching where beneficial

---

## Article VII: Monitoring and Observability

### 7.1 Application Monitoring
- **Error Tracking** — ${config.errorTracking !== 'none' ? `${config.errorTracking} integration for error monitoring` : 'Basic error logging'}
- **Performance Monitoring** — Track application performance metrics
- **User Analytics** — ${config.analytics !== 'none' ? `${config.analytics} for user behavior insights` : 'No user analytics tracking'}

### 7.2 Infrastructure Monitoring
${config.docker ? '- **Container Health** — Docker container health checks' : ''}
- **Database Monitoring** — Track database performance and health
- **API Monitoring** — Monitor API endpoints and response times
- **Deployment Monitoring** — Track deployment success and rollback procedures

---

## Article VIII: Amendment Process

### 8.1 Constitutional Changes
- **Unanimous Consent** — All team members must agree to changes
- **Documentation** — All changes must be documented with reasoning
- **Version Control** — Constitution changes tracked in git history
- **Impact Assessment** — Evaluate impact of constitutional changes

### 8.2 Emergency Exceptions
- **Security Issues** — Temporary exceptions allowed for critical security fixes
- **Production Incidents** — Expedited process for production issues
- **Documentation Required** — All exceptions must be documented
- **Review Process** — Post-incident review of emergency changes

---

## Ratification

This constitution was established on ${new Date().toLocaleDateString()} for ${config.projectName}.

**Ratified by:** ${config.author}
**Project:** ${config.projectName}
**Stack:** Better-T-Stack Enhanced with KareTech
**Generated:** create-karetech-stack v1.0

---

*This constitution is immutable and serves as the foundation for all development decisions.*
*Any changes require unanimous team consent and proper documentation.*
`;
}

/**
 * Generate PROJECT_STATUS.md template
 */
function generateProjectStatusTemplate(config: ProjectConfig): string {
  return `# Project Status — ${config.projectName}

> **Current state, progress, and blockers**
> Update this at the start and end of each session.

---

## Quick Status

| Metric | Value |
|--------|-------|
| **Phase** | Phase 1: Initial Development |
| **Sprint** | Week 1 |
| **Version** | 0.1.0-dev |
| **Last Updated** | ${new Date().toLocaleDateString()} - Initial scaffolding |

---

## Current Focus

### Active Work
- [x] Project scaffolding completed
- [x] Dependencies installed
- [x] Development environment configured
- [x] Database schema designed
- [ ] Core features implementation
- [ ] Testing setup
- [ ] Deployment configuration

### Blocked
- None

### Waiting On
- None

---

## Recent Progress

### Session: ${new Date().toLocaleDateString()} - Project Initialization
- ✅ **Project Scaffolding**: Created with create-karetech-stack
- ✅ **Stack Configuration**: ${config.database}/${config.auth.length > 0 ? config.auth.join('+') : 'no-auth'}/${config.testing.length > 0 ? config.testing.join('+') : 'no-testing'}
- ✅ **UI Setup**: shadcn/ui ${config.uiStyle} theme configured
- ✅ **Development Ready**: \`bun dev\` working correctly
- 🔄 **Next Focus**: Implement core application features

---

## Milestones

| Phase | Milestone | Target | Status |
|-------|-----------|--------|---------|
| **Phase 1** | Core Setup | Week 1 | 🔄 In Progress |
| **Phase 2** | Feature Development | Week 2-3 | ⏳ Pending |
| **Phase 3** | Testing & Polish | Week 4 | ⏳ Pending |
| **Phase 4** | Deployment | Week 5 | ⏳ Pending |
| **🎯 GOAL** | **Production Ready** | **Week 5** | **🔄 In Progress** |

---

## Tech Stack Status

### Frontend ✅
- **Framework**: React + TanStack Router
- **UI Library**: shadcn/ui (${config.uiStyle} theme)
- **Styling**: Tailwind CSS
- **Icons**: ${config.icons}
- **Fonts**: ${config.font}

### Backend ✅
- **Runtime**: Bun
- **API**: Hono + oRPC
- **Database**: ${config.database.charAt(0).toUpperCase() + config.database.slice(1)}
- **ORM**: Drizzle

### Authentication ${config.auth.length > 0 ? '✅' : '➖'}
${config.auth.length > 0 ? `- **Library**: Better Auth
- **Providers**: ${config.auth.join(', ')}` : '- **Status**: Not required for this project'}

### Testing ${config.testing.length > 0 || config.unitTesting ? '🔄' : '➖'}
${config.testing.length > 0 ? `- **E2E**: ${config.testing.join(', ')}` : ''}
${config.unitTesting ? '- **Unit**: Vitest + Testing Library' : ''}
${config.testing.length === 0 && !config.unitTesting ? '- **Status**: Not configured for this project' : ''}

### DevOps ${config.docker || config.cicd !== 'none' ? '🔄' : '➖'}
${config.docker ? '- **Containers**: Docker configuration included' : ''}
- **CI/CD**: ${config.cicd}
- **Deployment**: ${config.deployTarget}

---

## Known Issues

### Critical
- None

### High Priority
- None

### Normal
- None

---

## Technical Debt

- None (fresh project)

---

## Next Steps

### Immediate (This Week)
1. **Core Features**: Implement main application functionality
2. **Database Setup**: Configure ${config.database} and run initial migrations
${config.auth.length > 0 ? '3. **Authentication**: Set up auth providers and flows' : ''}
4. **Basic UI**: Implement core user interface components
5. **API Endpoints**: Create essential API routes

### Short Term (Next 2 Weeks)
1. **Feature Completion**: Finish core application features
${config.testing.length > 0 || config.unitTesting ? '2. **Testing**: Write comprehensive test coverage' : ''}
3. **Polish**: UI/UX refinements and optimizations
4. **Documentation**: Complete user and developer documentation
5. **Deployment**: Prepare for production deployment

### Long Term (Next Month)
1. **Performance**: Optimize application performance
2. **Monitoring**: Set up monitoring and analytics
3. **Security**: Security audit and hardening
4. **Scaling**: Plan for user growth and scaling needs

---

## Notes

- **Created with**: create-karetech-stack v1.0
- **Constitution**: Follow constitutional principles for all development
- **Documentation**: Keep this file updated at end of each session
${config.pbsLevel === 'full' ? '- **PBS Workflow**: Use Plan-Build-Ship methodology for all features' : ''}

---

*Update this file at the end of each session!*
`;
}

/**
 * Generate ARCHITECTURE.md template
 */
function generateArchitectureTemplate(config: ProjectConfig): string {
  return `# Architecture — ${config.projectName}

> **System design and architectural decisions**

---

## System Overview

${config.projectName} is built on the Better-T-Stack foundation with enhancements for ${config.description.toLowerCase()}.

### Architecture Principles
- **Type Safety**: 100% TypeScript with strict mode
- **Performance First**: Optimized for speed and efficiency
- **Developer Experience**: Tools and patterns that enhance productivity
- **Maintainability**: Clean, well-documented, testable code

---

## Tech Stack

### Frontend Architecture
\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
├─────────────────────────────────────────────────────────┤
│  React Components (shadcn/ui + ${config.uiStyle})                    │
│  TanStack Router (Client-side routing)                 │
│  TanStack Query (Server state management)              │
│  Tailwind CSS (Styling)                                │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Key Technologies:**
- **React 18**: Component library with concurrent features
- **TanStack Router**: Type-safe client-side routing
- **shadcn/ui**: Modern component library (${config.uiStyle} theme)
- **Tailwind CSS**: Utility-first styling framework
- **${config.font}**: Primary typography
- **${config.icons}**: Icon library

### Backend Architecture
\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    API Layer                            │
├─────────────────────────────────────────────────────────┤
│  Hono Framework (Web framework)                        │
│  oRPC (Type-safe API layer)                            │
│  Better Auth (Authentication)                          │
│  Drizzle ORM (Database layer)                          │
└─────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────┐
│                 Database Layer                          │
├─────────────────────────────────────────────────────────┤
│  ${config.database.charAt(0).toUpperCase() + config.database.slice(1)} (Primary database)                           │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Key Technologies:**
- **Bun**: JavaScript runtime and package manager
- **Hono**: Lightweight web framework
- **oRPC**: End-to-end type safety for APIs
- **Drizzle**: Type-safe ORM
- **${config.database.charAt(0).toUpperCase() + config.database.slice(1)}**: Database engine

---

## Data Architecture

### Database Design
\`\`\`sql
-- Core Schema Structure
${config.database === 'postgresql' ? `
-- Users table (if auth enabled)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Example application table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
` : config.database === 'turso' ? `
-- Users table (if auth enabled)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Example application table
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
` : `
-- SQLite Schema
-- Users table (if auth enabled)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Example application table
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`}
\`\`\`

### Data Flow
1. **Client Request** → TanStack Router → React Component
2. **API Call** → TanStack Query → oRPC Client
3. **Server Processing** → Hono Handler → Business Logic
4. **Data Access** → Drizzle ORM → ${config.database.charAt(0).toUpperCase() + config.database.slice(1)} Database
5. **Response Flow** → JSON → oRPC → TanStack Query → Component State

---

## Authentication Architecture

${config.auth.length > 0 ? `
### Auth Flow
\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │  Better Auth    │    │  Auth Provider  │
│                 │    │                 │    │  (${config.auth[0]})        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         │  1. Login Request      │                        │
         ├───────────────────────→│                        │
         │                        │  2. Provider Auth      │
         │                        ├───────────────────────→│
         │                        │                        │
         │                        │  3. Auth Response      │
         │                        │←───────────────────────┤
         │  4. Session Created    │                        │
         │←───────────────────────┤                        │
\`\`\`

**Authentication Features:**
- **Providers**: ${config.auth.join(', ')}
- **Session Management**: Secure session handling
- **Token Storage**: Secure token management
${config.auth.includes('oauth') ? '- **OAuth Integration**: Social login providers' : ''}
${config.auth.includes('magic-links') ? '- **Magic Links**: Passwordless authentication' : ''}
` : `
### No Authentication
This project operates without user authentication. All features are publicly accessible.
`}

---

## API Architecture

### oRPC Schema Design
\`\`\`typescript
// API Route Structure
const appRouter = {
  // Health check
  health: {
    input: z.void(),
    output: z.object({
      status: z.literal('ok'),
      timestamp: z.string()
    })
  },

  // Example CRUD operations
  items: {
    list: {
      input: z.object({
        limit: z.number().optional(),
        offset: z.number().optional()
      }),
      output: z.array(ItemSchema)
    },
    create: {
      input: CreateItemSchema,
      output: ItemSchema
    },
    update: {
      input: UpdateItemSchema,
      output: ItemSchema
    },
    delete: {
      input: z.object({ id: z.number() }),
      output: z.object({ success: z.boolean() })
    }
  }
};
\`\`\`

### API Patterns
- **RESTful Design**: Resource-based URL structure
- **Type Safety**: End-to-end type checking
- **Error Handling**: Structured error responses
- **Validation**: Input/output schema validation

---

## Frontend Architecture

### Component Structure
\`\`\`
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── routes/              # Page components
├── lib/                 # Utilities and helpers
├── hooks/               # Custom React hooks
└── styles/              # Global styles and themes
\`\`\`

### State Management Strategy
- **Local State**: \`useState\` for component-specific state
- **Server State**: TanStack Query for API data
- **Global State**: React Context for app-wide state
- **URL State**: TanStack Router for navigation state

### Component Patterns
- **Composition**: Favor composition over inheritance
- **Separation of Concerns**: Logic separated from presentation
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and code splitting

---

## Testing Architecture

${config.testing.length > 0 || config.unitTesting ? `
### Testing Strategy
\`\`\`
┌─────────────────────────────────────────────────────────┐
│                Testing Pyramid                          │
├─────────────────────────────────────────────────────────┤
│  ${config.testing.includes('playwright') || config.testing.includes('puppeteer') ? '🔺 E2E Tests (Playwright/Puppeteer)' : '🔺 E2E Tests (None configured)'}                    │
│  🔸 Integration Tests (API + Database)                 │
│  🔹 Unit Tests (Components + Logic)                    │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Testing Tools:**
${config.unitTesting ? '- **Unit Testing**: Vitest + React Testing Library' : ''}
${config.testing.includes('playwright') ? '- **E2E Testing**: Playwright for browser automation' : ''}
${config.testing.includes('puppeteer') ? '- **E2E Testing**: Puppeteer for browser testing' : ''}
${config.testing.includes('vitest') ? '- **Test Runner**: Vitest for fast test execution' : ''}

### Test Coverage Goals
- **Unit Tests**: 80% code coverage minimum
- **Integration Tests**: All API endpoints covered
- **E2E Tests**: Critical user journeys covered
` : `
### Testing Strategy
Minimal testing approach for this project:
- **Manual Testing**: Primary quality assurance method
- **Type Safety**: TypeScript provides compile-time safety
- **Linting**: ESLint catches common issues
`}

---

## Deployment Architecture

${config.docker ? `
### Container Strategy
\`\`\`dockerfile
# Multi-stage Docker build
FROM bun:alpine AS base
# ... optimized for production deployment
\`\`\`

**Container Features:**
- **Multi-stage Build**: Optimized image size
- **Security**: Non-root user execution
- **Health Checks**: Container health monitoring
` : ''}

### Deployment Pipeline
\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Git Push  │    │   CI/CD     │    │    Build    │    │   Deploy    │
│             │    │  (${config.cicd})   │    │             │    │  (${config.deployTarget})    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
         │                  │                  │                  │
         │  1. Code Push    │                  │                  │
         ├─────────────────→│                  │                  │
         │                  │  2. Run Tests    │                  │
         │                  ├─────────────────→│                  │
         │                  │                  │  3. Build App    │
         │                  │                  ├─────────────────→│
         │                  │                  │                  │  4. Deploy
\`\`\`

**Deployment Features:**
- **Platform**: ${config.deployTarget}
- **CI/CD**: ${config.cicd}
${config.docker ? '- **Containerization**: Docker-based deployment' : ''}
- **Environment Management**: Separate dev/staging/prod configs

---

## Security Architecture

### Security Measures
- **Input Validation**: All user inputs validated
- **SQL Injection Prevention**: Parameterized queries only
- **XSS Protection**: Content sanitization
- **HTTPS**: All traffic encrypted in production
- **CORS**: Proper cross-origin resource sharing
${config.auth.length > 0 ? '- **Session Security**: Secure session management' : ''}

### Environment Variables
\`\`\`env
# Application
NODE_ENV=production
PORT=3000
APP_URL=https://example.com

# Database
DATABASE_URL=${config.database === 'postgresql' ? 'postgresql://user:pass@localhost:5432/db' : config.database === 'turso' ? 'libsql://[DATABASE_ID].turso.io?authToken=[TOKEN]' : 'file:./prod.db'}

${config.auth.length > 0 ? `# Authentication
AUTH_SECRET=your-32-character-secret
${config.auth.includes('oauth') ? 'OAUTH_CLIENT_ID=your-client-id\nOAUTH_CLIENT_SECRET=your-client-secret' : ''}
${config.auth.includes('github') ? 'GITHUB_CLIENT_ID=your-github-id\nGITHUB_CLIENT_SECRET=your-github-secret' : ''}` : ''}
\`\`\`

---

## Performance Architecture

### Optimization Strategies
- **Bundle Splitting**: Code splitting for optimal loading
- **Caching**: Strategic caching at multiple levels
- **Database Indexing**: Optimized database queries
- **Image Optimization**: Compressed and optimized assets
- **CDN**: Static asset delivery optimization

### Performance Goals
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **API Response Time**: < 200ms (95th percentile)

---

## Monitoring and Observability

### Monitoring Stack
- **Error Tracking**: ${config.errorTracking !== 'none' ? config.errorTracking : 'Console logging'}
- **Performance**: ${config.analytics !== 'none' ? config.analytics + ' Analytics' : 'No analytics configured'}
- **Health Checks**: Application health endpoints
- **Logging**: Structured logging in production

### Key Metrics
- **Application Errors**: Error rate and error types
- **Performance**: Response times and throughput
- **User Experience**: Core Web Vitals
- **Business Metrics**: User engagement and conversions

---

## Development Workflow

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automated code formatting
- **Pre-commit Hooks**: Quality checks before commits

### Git Workflow
- **Branch Strategy**: Feature branches from main
- **Code Review**: All changes require review
- **Conventional Commits**: Structured commit messages
- **Automated Testing**: CI runs tests on all PRs

---

## Decision Records

### ADR-001: Database Choice - ${config.database}
**Decision**: Use ${config.database} as primary database
**Rationale**: ${config.database === 'postgresql' ? 'Full-featured relational database with excellent TypeScript integration' : config.database === 'turso' ? 'Edge-optimized SQLite with global distribution capabilities' : 'Simple, reliable, and perfect for development and small-scale applications'}
**Alternatives Considered**: ${config.database === 'postgresql' ? 'SQLite, Turso' : config.database === 'turso' ? 'PostgreSQL, SQLite' : 'PostgreSQL, Turso'}

### ADR-002: Authentication Strategy
**Decision**: ${config.auth.length > 0 ? `Implement authentication with ${config.auth.join(' + ')}` : 'No authentication required'}
**Rationale**: ${config.auth.length > 0 ? 'User authentication required for personalized experience and data security' : 'Public application without user-specific data or restricted access needs'}

### ADR-003: Testing Approach
**Decision**: ${config.testing.length > 0 || config.unitTesting ? `Comprehensive testing with ${config.testing.join(' + ')}${config.unitTesting ? ' + unit tests' : ''}` : 'Minimal testing approach'}
**Rationale**: ${config.testing.length > 0 ? 'Quality assurance through automated testing ensures reliability' : 'Simple project scope allows for manual testing approach'}

---

*Last Updated: ${new Date().toLocaleDateString()} - Generated by create-karetech-stack v1.0*
`;
}

/**
 * Create template directory structure
 */
export async function createTemplateDirectories(templatesDir: string): Promise<void> {
  const directories = [
    'pbs/full',
    'pbs/docs',
    'pbs/minimal',
    'pbs/none',
    'claude/full',
    'claude/docs',
    'claude/minimal',
    'claude/hooks',
    'claude/agents',
    'claude/commands'
  ];

  for (const dir of directories) {
    const fullPath = join(templatesDir, dir);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
    }
  }
}

/**
 * Generate PBS documentation templates
 */
export async function generatePBSTemplates(projectDir: string, config: ProjectConfig): Promise<void> {
  const docsDir = join(projectDir, 'docs');
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }

  const pbsConfig = PBS_TEMPLATES[config.pbsLevel];

  // Generate core documentation files
  if (pbsConfig.files.includes('CLAUDE.md')) {
    const claudeContent = generateClaudeMdTemplate(config);
    await fs.writeFile(join(projectDir, 'CLAUDE.md'), claudeContent, 'utf-8');
  }

  if (pbsConfig.files.includes('constitution.md')) {
    const constitutionContent = generateConstitutionTemplate(config);
    await fs.writeFile(join(projectDir, 'constitution.md'), constitutionContent, 'utf-8');
  }

  if (pbsConfig.files.includes('docs/PROJECT_STATUS.md')) {
    const statusContent = generateProjectStatusTemplate(config);
    await fs.writeFile(join(docsDir, 'PROJECT_STATUS.md'), statusContent, 'utf-8');
  }

  if (pbsConfig.files.includes('docs/ARCHITECTURE.md')) {
    const archContent = generateArchitectureTemplate(config);
    await fs.writeFile(join(docsDir, 'ARCHITECTURE.md'), archContent, 'utf-8');
  }

  if (pbsConfig.files.includes('docs/CHANGELOG.md')) {
    const changelogContent = `# Changelog

All notable changes to ${config.projectName} will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with create-karetech-stack
- Core application structure
- ${config.auth.length > 0 ? `Authentication system (${config.auth.join(', ')})` : 'No authentication system'}
- ${config.testing.length > 0 ? `Testing infrastructure (${config.testing.join(', ')})` : 'Minimal testing setup'}
- ${config.docker ? 'Docker containerization' : 'Direct deployment configuration'}

## [0.1.0] - ${new Date().toISOString().split('T')[0]}

### Added
- Project scaffolding and initial setup
- Better-T-Stack foundation
- ${config.uiStyle} UI theme configuration
- Development environment setup
`;
    await fs.writeFile(join(docsDir, 'CHANGELOG.md'), changelogContent, 'utf-8');
  }

  // Generate additional PBS structure for full level
  if (config.pbsLevel === 'full') {
    // Create ADR directory
    const adrDir = join(docsDir, 'ADR');
    if (!existsSync(adrDir)) {
      mkdirSync(adrDir, { recursive: true });
    }
    await fs.writeFile(join(adrDir, 'README.md'), `# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records for ${config.projectName}.

## Format
Each ADR follows the standard format:
- **Status**: Proposed, Accepted, Deprecated, Superseded
- **Context**: The situation requiring a decision
- **Decision**: The decision made
- **Consequences**: The results of the decision

## Records
- [ADR-001: Technology Stack](./001-technology-stack.md)
- [ADR-002: Database Choice](./002-database-choice.md)
- [ADR-003: Authentication Strategy](./003-authentication-strategy.md)

---
*Generated by create-karetech-stack*
`, 'utf-8');

    // Create TECH directory
    const techDir = join(docsDir, 'TECH');
    if (!existsSync(techDir)) {
      mkdirSync(techDir, { recursive: true });
    }
    await fs.writeFile(join(techDir, 'README.md'), `# Technical Documentation

This directory contains detailed technical documentation for ${config.projectName}.

## Contents
- **API Documentation**: Endpoint specifications and examples
- **Database Schema**: Table structures and relationships
- **Development Guide**: Setup and development workflows
- **Deployment Guide**: Production deployment instructions

## Quick Links
- [API Reference](./api-reference.md)
- [Database Schema](./database-schema.md)
- [Development Setup](./development-setup.md)
- [Deployment Guide](./deployment-guide.md)

---
*Generated by create-karetech-stack*
`, 'utf-8');

    // Create .specify directory for Spec Kit integration
    if (pbsConfig.specifyIntegration) {
      const specifyDir = join(projectDir, '.specify');
      if (!existsSync(specifyDir)) {
        mkdirSync(specifyDir, { recursive: true });
      }

      const tasksDir = join(specifyDir, 'tasks');
      if (!existsSync(tasksDir)) {
        mkdirSync(tasksDir, { recursive: true });
      }

      await fs.writeFile(join(specifyDir, 'spec.md'), `# ${config.projectName} Specification

## Project Overview
${config.description}

## Technical Requirements
- **Runtime**: Bun
- **Framework**: Better-T-Stack
- **Database**: ${config.database}
- **Authentication**: ${config.auth.length > 0 ? config.auth.join(', ') : 'None'}
- **Deployment**: ${config.deployTarget}

## Success Criteria
- [ ] Core functionality implemented
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Ready for deployment

---
*Generated by create-karetech-stack*
`, 'utf-8');

      await fs.writeFile(join(specifyDir, 'plan.md'), `# Implementation Plan - ${config.projectName}

## Phase 1: Core Development
- [ ] Set up development environment
- [ ] Implement core features
- [ ] Set up database and authentication
- [ ] Basic UI implementation

## Phase 2: Testing & Polish
- [ ] Add test coverage
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Security review

## Phase 3: Deployment
- [ ] Production environment setup
- [ ] Deployment pipeline
- [ ] Monitoring and logging
- [ ] Go-live checklist

---
*Generated by create-karetech-stack*
`, 'utf-8');

      await fs.writeFile(join(tasksDir, 'README.md'), `# Tasks Directory

This directory contains task breakdowns and implementation details for ${config.projectName}.

## Task Management
- Use this directory for detailed task specifications
- Break down features into manageable tasks
- Track progress and blockers
- Document implementation decisions

---
*Generated by create-karetech-stack*
`, 'utf-8');
    }

    // Create PBS scripts for full integration
    const scriptsDir = join(projectDir, 'scripts');
    if (!existsSync(scriptsDir)) {
      mkdirSync(scriptsDir, { recursive: true });
    }

    await fs.writeFile(join(scriptsDir, 'pbs-init.sh'), `#!/bin/bash
# PBS Initialization Script for ${config.projectName}

echo "🚀 Initializing PBS workflow for ${config.projectName}"

# Initialize Beads issue tracking
if command -v bd &> /dev/null; then
    echo "📋 Initializing Beads issue tracking..."
    bd init
    bd onboard
else
    echo "⚠️  Beads CLI not found. Install from: https://github.com/steveyegge/beads"
fi

# Initialize Spec Kit
if command -v specify &> /dev/null; then
    echo "📝 Initializing Spec Kit..."
    specify init . --ai claude
else
    echo "⚠️  Spec Kit CLI not found. Install from: https://github.com/github/spec-kit"
fi

echo "✅ PBS initialization complete!"
echo "📚 Read CLAUDE.md for next steps"
`, 'utf-8');

    await fs.writeFile(join(scriptsDir, 'pbs-status.sh'), `#!/bin/bash
# PBS Status Check Script for ${config.projectName}

echo "📊 PBS Status for ${config.projectName}"
echo "=================================="

# Check Beads status
if command -v bd &> /dev/null; then
    echo "📋 Beads Issues:"
    bd ready
    echo ""
else
    echo "⚠️  Beads CLI not available"
fi

# Check git status
echo "📂 Git Status:"
git status --short
echo ""

# Check recent commits
echo "📝 Recent Commits:"
git log --oneline -5
echo ""

# Check project status
if [ -f "docs/PROJECT_STATUS.md" ]; then
    echo "📋 Current Phase: $(grep -m1 "Phase" docs/PROJECT_STATUS.md | cut -d'|' -f3 | xargs)"
fi

echo "✅ Status check complete!"
`, 'utf-8');

    // Make scripts executable
    await fs.chmod(join(scriptsDir, 'pbs-init.sh'), 0o755);
    await fs.chmod(join(scriptsDir, 'pbs-status.sh'), 0o755);
  }

  console.log(`✅ PBS documentation generated (${config.pbsLevel} level)`);
}

/**
 * Validate PBS template configuration
 */
export function validatePBSConfig(config: ProjectConfig): string[] {
  const warnings: string[] = [];

  if (config.pbsLevel === 'full' && !config.beadsIntegration) {
    warnings.push('⚠️  Full PBS level recommended with Beads integration enabled');
  }

  if (config.pbsLevel === 'none' && config.claudeCodeHooks) {
    warnings.push('⚠️  Claude Code hooks enabled but PBS level is none');
  }

  return warnings;
}