# 🚀 KareTech Stack — Planning Mode Prompt

**Copy and paste this into Claude Code Planning Mode to start the project.**

---

## Prompt

```
I'm starting development on create-karetech-stack, an enhanced Better-T-Stack scaffold CLI.

**FIRST, read these documents in order:**
1. docs/PBS_MASTER_SYSTEM.md — Complete AI workflow methodology (9,500+ lines)
2. docs/FORK_PLAN.md — Implementation roadmap and wizard specification
3. constitution.md — Immutable project principles
4. CLAUDE.md — Project entry point and quick reference

**THEN:**
1. Initialize Beads: `bd init`
2. Create initial issues for Phase 1 (Fork & Setup) based on FORK_PLAN.md
3. Analyze the current project structure
4. Propose next steps

**PROJECT CONTEXT:**
- This is a CLI tool that scaffolds enhanced Better-T-Stack projects
- It extends Better-T-Stack with: theme selection, E2E testing, Docker, CI/CD, PBS system
- Target: `bunx create-karetech-stack my-app --preset saas` creates a full project in 2 minutes
- Tech: Bun, TypeScript, Clack (prompts), EJS (templates)

**CONSTRAINTS:**
- Never modify constitution.md
- Track all work in Beads
- Follow PBS methodology from the master system document
- Use conventional commits

**CURRENT PHASE:** Phase 1 - Fork & Setup (Week 1)

Let's begin!
```

---

## What This Prompt Does

1. **Reads documentation** — Claude Code will read and understand the full PBS system and fork plan
2. **Initializes tracking** — Sets up Beads for issue management
3. **Creates issues** — Breaks down Phase 1 into trackable tasks
4. **Analyzes structure** — Understands what exists and what's needed
5. **Proposes next steps** — Gives you a clear action plan

---

## After Pasting

Claude Code will:
1. Read all the documentation
2. Run `bd init` to set up Beads
3. Create issues like:
   - `bd create "Set up Bun project" -p 1 -t task`
   - `bd create "Install CLI dependencies" -p 1 -t task`
   - `bd create "Create wizard prompts" -p 1 -t task`
4. Show you the ready work with `bd ready`
5. Start implementing!

---

## Tips

- Use **Planning Mode** for initial setup and big decisions
- Switch to **Normal Mode** for implementation
- Run `bd ready` to see what's unblocked
- Run `bd sync` before ending sessions
- Update `docs/PROJECT_STATUS.md` at end of each session
