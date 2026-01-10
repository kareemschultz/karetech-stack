# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **Complete 7-step wizard implementation** with enhanced UX (`src/index.ts`)
- **6 preset configurations**: saas, ecommerce, blog, devtool, portfolio, minimal
- **Comprehensive input validation system** with reserved names, length limits
- **Beads issue tracking integration** (bd v0.46.0) with git hooks
- **GitHub Issues integration** (#1, #2, #3) mirroring Beads tracking
- **Project name validation**: directory existence check, reserved word detection
- **Git user integration**: auto-detect git config for author defaults
- **Enhanced preset selection UX** with emojis and detailed descriptions
- **TypeScript interfaces**: ProjectConfig with full type safety
- **Constitutional compliance**: all changes follow strict type safety principles

### Changed
- **Enhanced project info prompts** with robust validation (`src/index.ts:248-314`)
- **Improved preset handling** with better visual feedback and descriptions
- **Updated PROJECT_STATUS.md** with current progress and achievements
- **Enhanced CLI structure** replacing placeholder with complete wizard

### Fixed
- **Beads integration issues** - fully operational with git sync
- **TypeScript compilation** - all type errors resolved
- **CLI functionality** - all commands working properly

### Removed
- **TODO placeholders** in wizard implementation (`src/index.ts:35-56`)

---

## [0.0.1] - 2026-01-XX

### Added
- Initial project setup
- Basic documentation structure

---

[Unreleased]: https://github.com/kareemschultz/karetech-stack/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/kareemschultz/karetech-stack/releases/tag/v0.0.1
