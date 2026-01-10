# KareTech Stack Project Overview

## Purpose
`create-karetech-stack` is an enhanced CLI tool that scaffolds production-ready TypeScript projects. It's a fork of Better-T-Stack with additional features:

- **Visual theme selection**: 5 shadcn/ui v4 styles with customizable colors/fonts
- **E2E testing setup**: Playwright and/or Puppeteer pre-configured
- **Production Docker**: Optimized multi-stage builds (<200MB)
- **CI/CD workflows**: GitHub Actions ready to go
- **AI workflow**: PBS system for Claude Code integration
- **Quick-start presets**: SaaS, E-commerce, Blog, DevTool, Portfolio, Minimal

## Core Technology Stack

### Runtime & Build
- **Bun**: Primary runtime and package manager
- **TypeScript**: Strict mode enabled, ESNext modules
- **Node.js 18+**: Required for some dependencies

### CLI Framework
- **Clack**: Beautiful interactive prompts
- **Commander**: Command-line interface framework
- **picocolors**: Terminal colors
- **EJS**: Template engine
- **fs-extra**: Enhanced file operations

### Base Stack (from Better-T-Stack)
- **Backend**: Hono + oRPC
- **Database**: Drizzle ORM (PostgreSQL/Turso/SQLite)
- **Auth**: Better Auth
- **Frontend**: TanStack Router + shadcn/ui

## Project Structure
```
karetech-stack/
├── src/                     # CLI source code
│   ├── index.ts            # Main entry point (bin)
│   ├── generators/         # Code generators (base, testing, devops)
│   ├── presets/           # Preset configurations
│   ├── types/             # TypeScript types
│   ├── validation/        # Input validation
│   ├── config/           # Configuration management
│   └── wizard/           # Interactive wizard
├── templates/             # EJS scaffold templates
├── docs/                 # Project documentation
├── .claude/             # Claude Code configuration
└── scripts/             # Build & utility scripts
```

## Development Status
- **Version**: 0.0.1 (development)
- **Completion**: ~68% complete
- **Current Phase**: Testing, Polish & Release preparation
- **TypeScript**: All systems compile cleanly in strict mode