# Specification — create-karetech-stack

## Overview

**Project:** Enhanced Better-T-Stack scaffold CLI  
**Goal:** Reduce project setup time from 60+ minutes to 2 minutes  
**Author:** Kareem Schultz

---

## User Stories

### US-1: Quick Start with Preset
**As a** developer  
**I want to** run a single command with a preset  
**So that** I get a fully configured project without answering questions

**Acceptance Criteria:**
- `bunx create-karetech-stack my-app --preset saas` works
- Project runs with `bun dev` immediately
- All selected features are configured

### US-2: Interactive Wizard
**As a** developer  
**I want to** answer questions about my project needs  
**So that** I get exactly the configuration I want

**Acceptance Criteria:**
- Beautiful CLI prompts (Clack)
- 7 wizard steps covering all options
- Sensible defaults for all options

### US-3: Theme Selection
**As a** developer  
**I want to** choose a visual theme  
**So that** my project looks professional from day one

**Acceptance Criteria:**
- 5 visual styles available
- Color palette selection
- Font selection
- Preview or description of each option

### US-4: E2E Testing Setup
**As a** developer  
**I want to** have E2E testing pre-configured  
**So that** I can write tests immediately

**Acceptance Criteria:**
- Playwright and/or Puppeteer options
- Example tests included
- Page Object Model structure
- CI integration

### US-5: Production Docker
**As a** developer  
**I want to** have production-ready Docker  
**So that** I can deploy easily

**Acceptance Criteria:**
- Multi-stage build
- Image size < 200MB
- Security hardening
- docker-compose included

### US-6: PBS Integration
**As a** developer using AI assistants  
**I want to** have PBS documentation scaffolded  
**So that** Claude Code understands my project

**Acceptance Criteria:**
- CLAUDE.md generated
- docs/ structure created
- Claude Code hooks configured
- Beads ready to use

---

## Functional Requirements

### FR-1: CLI Interface
- Commander.js for argument parsing
- Clack for interactive prompts
- Colored output with picocolors
- Progress spinners for long operations

### FR-2: Template System
- EJS templates for file generation
- Template variables from wizard answers
- Conditional sections based on options

### FR-3: Preset System
- 6 presets (saas, ecommerce, blog, devtool, portfolio, minimal)
- Presets can be overridden with flags
- Preset configurations in JSON

### FR-4: File Generation
- Create directory structure
- Generate files from templates
- Copy static assets
- Initialize git repository

### FR-5: Post-Install
- Run `bun install`
- Initialize git
- Show next steps

---

## Non-Functional Requirements

### Performance
- Scaffold generation < 30 seconds
- CLI startup < 500ms

### Compatibility
- Bun 1.0+
- Node.js 18+ (for some deps)
- macOS, Linux, Windows

### Quality
- 100% TypeScript
- No `any` types
- ESLint + Prettier
- Conventional commits

---

## Out of Scope (v1.0)

- Web-based wizard
- VS Code extension
- Template marketplace
- Update notifications

---

*Last Updated: January 2026*
