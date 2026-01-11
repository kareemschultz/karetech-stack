# GitHub Issues for Community Engagement

This directory contains pre-formatted issue bodies and a creation script for KareTech Stack's community engagement strategy.

## Issue Summary

| # | Type | Title | Labels |
|---|------|-------|--------|
| 1 | Milestone | v0.2.0: Automated MCP Server Integration | `milestone`, `enhancement`, `v0.2.0` |
| 2 | Milestone | v0.3.0: Automated Issue Tracking with Beads | `milestone`, `enhancement`, `v0.3.0`, `beads-integration` |
| 3 | Milestone | v0.4.0: Skills Library & Pre-built Agents | `milestone`, `enhancement`, `v0.4.0`, `ai-agents`, `skills-library` |
| 4 | Milestone | v0.5.0: Complete Plan-Build-Ship Automation | `milestone`, `enhancement`, `v0.5.0`, `pbs-automation`, `ai-orchestration` |
| 5 | Enhancement | Enhanced Theme Customization Interface | `enhancement`, `themes`, `developer-experience`, `good first issue` |
| 6 | Enhancement | Project Analytics Dashboard | `enhancement`, `analytics`, `developer-experience` |
| 7 | Enhancement | Plugin Ecosystem for Custom Integrations | `enhancement`, `plugins`, `ecosystem`, `architecture` |
| 8 | Documentation | Interactive Getting Started Tutorial | `documentation`, `tutorial`, `beginner-friendly`, `good first issue` |

## Usage

### Automated Creation (Recommended)

```bash
# Ensure GitHub CLI is installed and authenticated
gh auth login

# Run the creation script from repo root
bash .github/ISSUES/create-issues.sh
```

### Manual Creation

1. Go to https://github.com/kareemschultz/karetech-stack/issues/new
2. Copy the content from the relevant `.md` file
3. Add the appropriate labels as listed above
4. Submit the issue

## Files

| File | Purpose |
|------|---------|
| `create-issues.sh` | Automated issue creation script |
| `v0.2.0-mcp-integration.md` | MCP server integration milestone |
| `v0.3.0-beads-integration.md` | Beads issue tracking milestone |
| `v0.4.0-skills-agents.md` | Skills library milestone |
| `v0.5.0-pbs-automation.md` | PBS automation milestone |
| `enhancement-theme-customization.md` | Theme customization feature |
| `enhancement-analytics-dashboard.md` | Analytics dashboard feature |
| `enhancement-plugin-ecosystem.md` | Plugin ecosystem feature |
| `documentation-interactive-tutorial.md` | Interactive tutorial documentation |

## Strategic Purpose

These issues serve multiple purposes:

1. **Transparency** - Public roadmap for community visibility
2. **Engagement** - Contribution opportunities via `good first issue` labels
3. **Feedback** - Community input on feature prioritization
4. **Accountability** - Public milestones for delivery tracking

## Related Documentation

- [GitHub Issues Creation Guide](../../docs/GITHUB_ISSUES_CREATION.md) - Full strategy document
- [AI Workflow Implementation Plan](../../docs/AI_WORKFLOW_IMPLEMENTATION_PLAN.md) - Technical details
- [Contributing Guide](../../CONTRIBUTING.md) - How to contribute

---

*Created: January 2026*
