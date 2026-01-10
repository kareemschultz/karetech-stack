# Suggested Commands for KareTech Stack Development

## Primary Development Commands

### Core Development
```bash
bun run dev                  # Development mode (runs src/index.ts)
bun run build                # Build CLI for production
bun run test                 # Run test suite (Bun test runner)
bun run typecheck            # TypeScript type checking (tsc --noEmit)
bun install                  # Install dependencies
```

### Code Quality
```bash
bun run lint                 # ESLint with TypeScript rules
bun run format               # Prettier formatting
```

### Testing the CLI Locally
```bash
bun run dev -- my-test-app --preset saas   # Test with preset
bun run dev -- my-test-app                 # Test interactive mode
```

### Release Preparation
```bash
bun run prepublishOnly       # Runs build before publishing
npm publish                  # Publish to npm (after build)
```

## CLI Usage (After Build)
```bash
# Interactive wizard
bunx create-karetech-stack my-app

# With preset (skip questions)  
bunx create-karetech-stack my-app --preset saas

# Environment check
bunx create-karetech-stack check-env

# With options
bunx create-karetech-stack my-app --preset saas --theme mira --color blue --no-git --no-install
```

## Available Presets
- `saas`: Full-featured SaaS starter
- `ecommerce`: E-commerce with Stripe
- `blog`: Publishing platform
- `devtool`: Developer tools
- `portfolio`: Personal sites
- `minimal`: Simple apps

## System Commands (Linux)
```bash
git status                   # Check git status
git add .                    # Stage changes
git commit -m "message"      # Commit changes
ls -la                       # List files
find . -name "*.ts"          # Find TypeScript files
grep -r "pattern" src/       # Search in source
```

## Development Workflow
1. Make changes to source code
2. Run `bun run typecheck` to check types
3. Run `bun run lint` to check code style
4. Run `bun run test` to run tests
5. Test CLI locally with `bun run dev`
6. Format code with `bun run format`
7. Commit changes