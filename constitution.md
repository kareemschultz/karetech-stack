# Constitution — KareTech Stack

> **⚠️ THIS DOCUMENT IS IMMUTABLE**  
> Do not modify without explicit approval and ADR documentation.  
> If you need to change these principles, create an ADR first.

---

## Core Identity

**Project:** `create-karetech-stack`  
**Purpose:** Enhanced Better-T-Stack scaffold with PBS, testing, and DevOps built-in  
**Author:** Kareem Schultz (KareTech Solutions)

---

## Immutable Principles

### 1. Better-T-Stack Foundation
- This project extends Better-T-Stack, never replaces it
- Core stack decisions (Bun, Hono, oRPC, Drizzle, Better Auth, TanStack) are inherited
- Upstream changes should be regularly merged

### 2. Developer Experience First
- Scaffolded projects must work immediately with `bun dev`
- No manual configuration should be required for basic functionality
- Wizard must have sensible defaults for every option

### 3. Type Safety is Non-Negotiable
- 100% TypeScript, no `any` types
- Strict mode enabled
- Generated code must pass `bun run typecheck`

### 4. Documentation-Driven Development
- PBS system is included in every scaffold
- CLAUDE.md is the entry point for AI agents
- TECH docs must exist for every major dependency

### 5. Testing is Expected
- E2E testing options available in wizard
- Generated tests must pass on fresh scaffold
- Page Object Model pattern for Playwright

### 6. Production-Ready Docker
- Docker configuration optimized for size (<200MB target)
- Multi-stage builds always
- Security hardening (non-root, read-only fs)

### 7. Conventional Commits
- All commits follow conventional commit format
- CHANGELOG.md auto-generated from commits
- Version bumps follow semver

### 8. AI-Assisted Development
- Beads for issue tracking
- Spec Kit for planning
- Claude Code hooks for automation
- PBS system for workflow

---

## Technology Constraints

### Must Use
| Category | Technology | Reason |
|----------|------------|--------|
| Runtime | Bun | Better-T-Stack standard |
| Backend | Hono | Better-T-Stack standard |
| API | oRPC | Type-safe RPC |
| Database | Drizzle | Type-safe ORM |
| Auth | Better Auth | Better-T-Stack standard |
| Frontend | TanStack Router | Type-safe routing |
| Components | shadcn/ui | Composable components |
| CLI | Clack | Beautiful prompts |

### Must Avoid
- `any` types
- CommonJS modules
- npm (use bun)
- CSS-in-JS (use Tailwind)
- Class components (use functions)

---

## Quality Gates

### Before Every Commit
1. `bun run typecheck` passes
2. `bun run lint` passes
3. `bun run test` passes (if tests exist)
4. Conventional commit message

### Before Every Release
1. All tests pass
2. Documentation updated
3. CHANGELOG.md updated
4. Version bumped appropriately
5. Manual testing of all presets

---

## Escalation Triggers

### Stop and Ask When
1. Changing any principle in this constitution
2. Adding a new framework dependency
3. Removing a core feature
4. Breaking backward compatibility
5. Security-related changes

### Create ADR When
1. Major architectural decisions
2. Technology additions or replacements
3. Process changes
4. Constitution amendments (requires approval)

---

## File Protection Rules

| File | Protection Level | Rule |
|------|------------------|------|
| `constitution.md` | **IMMUTABLE** | Never modify |
| `CLAUDE.md` | Append-only | Never delete content |
| `docs/PBS_MASTER_SYSTEM.md` | Reference | Don't modify without ADR |
| `.beads/*` | Tool-managed | Only modify via `bd` |
| `package.json` | Careful | Version bumps need approval |

---

## Version Control

- Main branch is protected
- All changes via PR
- At least one review required
- CI must pass before merge

---

*This constitution establishes the non-negotiable principles for the KareTech Stack project.*  
*Last Ratified: January 2026*
