## Request

Add an interactive theme customization interface that allows developers to preview and modify themes before project generation.

## Motivation

Currently, users must know theme names (`maia`, `nova`, `lyra`, etc.) and manually specify options. A preview interface would:

- Help users discover available themes
- Allow real-time preview of color/font combinations
- Reduce trial-and-error in project setup
- Improve first-time user experience

## Proposed Solution

```bash
# Current approach
bunx create-karetech-stack my-app --theme maia --color blue

# Proposed interactive approach
bunx create-karetech-stack my-app --interactive
# Opens browser interface for theme preview and selection
```

## Acceptance Criteria

- [ ] Interactive web interface for theme preview
- [ ] Real-time preview of all 5 themes
- [ ] Color palette and font selection
- [ ] Generate CLI command from selections
- [ ] Works in browser and terminal environments

## User Impact

- Faster theme selection for new users
- Better theme discovery
- Reduced setup friction
- More attractive project aesthetics

## Community

This would be a great **good-first-issue** for contributors interested in:
- Frontend development (React/Vue for preview interface)
- CLI development (integration with existing wizard)
- Design systems (theme documentation and examples)

---

**Related:** [Theme System Documentation](https://github.com/kareemschultz/karetech-stack/blob/main/docs/THEMES.md)
