# Task Completion Checklist

## Before Committing Changes

### 1. Code Quality Checks
```bash
bun run typecheck            # Ensure no TypeScript errors
bun run lint                 # Fix all ESLint issues  
bun run format               # Apply Prettier formatting
```

### 2. Testing
```bash
bun run test                 # Run all tests
bun run dev -- test-project --preset saas  # Test CLI functionality manually
```

### 3. Build Verification
```bash
bun run build               # Ensure clean build
```

## Documentation Updates

### After Major Features
- Update `README.md` if CLI options changed
- Update `CHANGELOG.md` with new features
- Update `docs/PROJECT_STATUS.md` with progress
- Update preset documentation if presets modified

### After Bug Fixes
- Document fix in commit message
- Update relevant documentation if behavior changed

## Git Workflow

### Commit Standards
```bash
git add .
git commit -m "feat: add comprehensive E2E testing suite"
git commit -m "fix: resolve CLI validation issue"  
git commit -m "docs: update README with new preset options"
```

### Conventional Commit Format
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Release Preparation

### For Major Changes
1. Update version in `package.json`
2. Update `CHANGELOG.md` with release notes
3. Run full test suite
4. Test CLI with all presets
5. Verify build output
6. Test installation: `bunx ./dist/index.js test-app`

### Pre-publish Checks
- All tests passing
- TypeScript compiles cleanly
- No linting errors
- README up to date
- CHANGELOG updated
- Version bumped appropriately

## AI Workflow Integration (PBS)

### When Using Beads
```bash
bd close bd-XXXX --reason "Feature completed and tested"
bd create "Follow-up task" -t task
```

### When Using Spec Kit  
- Update `.specify/spec.md` if requirements changed
- Mark tasks as completed in planning documents