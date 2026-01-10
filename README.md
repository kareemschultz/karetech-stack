# create-karetech-stack

> Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps built-in

[![npm version](https://badge.fury.io/js/create-karetech-stack.svg)](https://www.npmjs.com/package/create-karetech-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## What is this?

`create-karetech-stack` is an enhanced version of [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) that scaffolds production-ready TypeScript projects with:

- 🎨 **Visual theme selection** — Choose from 5 shadcn/ui v4 styles
- 🧪 **E2E testing setup** — Playwright and/or Puppeteer pre-configured
- 🐳 **Production Docker** — Optimized multi-stage builds (<200MB)
- 🚀 **CI/CD workflows** — GitHub Actions ready to go
- 🤖 **AI workflow** — PBS system for Claude Code integration
- ⚡ **Quick-start presets** — SaaS, E-commerce, Blog, and more

---

## Quick Start

```bash
# Interactive wizard
bunx create-karetech-stack my-app

# With preset (skip questions)
bunx create-karetech-stack my-app --preset saas

# Then start developing
cd my-app
bun install
bun dev
```

---

## Presets

| Preset | Use Case | Includes |
|--------|----------|----------|
| `saas` | SaaS applications | Full auth, Playwright, Docker, CI/CD |
| `ecommerce` | E-commerce | Stripe-ready, Both E2E, Full DevOps |
| `blog` | Publishing/Blog | Turso, Vercel deploy |
| `devtool` | Developer tools | GitHub auth, Vitest |
| `portfolio` | Portfolio sites | Minimal, Vercel |
| `minimal` | Simple apps | Core stack only |

---

## What's Included

### Core Stack (from Better-T-Stack)
- **Runtime:** Bun
- **Backend:** Hono + oRPC
- **Database:** Drizzle ORM
- **Auth:** Better Auth
- **Frontend:** TanStack Router + shadcn/ui

### Enhancements (KareTech additions)
- **Theme System:** 5 visual styles, customizable colors/fonts
- **Testing:** Playwright, Puppeteer, Vitest options
- **DevOps:** Docker, GitHub Actions, deploy configs
- **AI Workflow:** PBS documentation, Claude Code hooks, Beads integration

---

## Project Structure

```
my-app/
├── apps/
│   ├── web/           # Frontend
│   └── server/        # Backend
├── packages/          # Shared code
├── docs/              # PBS documentation
├── .claude/           # Claude Code config
├── e2e/               # E2E tests
├── Dockerfile         # Production Docker
├── CLAUDE.md          # AI entry point
└── constitution.md    # Project principles
```

---

## CLI Options

```bash
create-karetech-stack <project-name> [options]

Options:
  --preset <name>    Use a preset (saas, ecommerce, blog, devtool, portfolio, minimal)
  --theme <style>    Override theme style (vega, nova, maia, lyra, mira)
  --color <color>    Override accent color
  --no-git           Skip git initialization
  --no-install       Skip dependency installation
  -h, --help         Show help
  -V, --version      Show version
```

---

## Requirements

- [Bun](https://bun.sh) v1.0 or later
- Node.js 18+ (for some dependencies)
- Git

---

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

---

## Credits

- [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) — The foundation
- [shadcn/ui](https://ui.shadcn.com) — Component library
- [Beads](https://github.com/steveyegge/beads) — Issue tracking for AI agents
- [Spec Kit](https://github.com/github/spec-kit) — Spec-driven development

---

## License

MIT © [Kareem Schultz](https://github.com/kareemschultz)
