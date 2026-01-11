# Publishing Guide for create-karetech-stack

This document outlines the complete process for publishing `create-karetech-stack` to npm.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Version Management](#version-management)
- [Release Process](#release-process)
- [Automated Publishing](#automated-publishing)
- [Manual Publishing](#manual-publishing)
- [Pre-release Versions](#pre-release-versions)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools

- **Bun** v1.0.0 or higher
- **Node.js** v18.0.0 or higher (for npm commands)
- **npm** account with publish access
- **Git** with GPG signing configured (recommended)

### Required Secrets (GitHub)

Set these in your repository settings under `Settings > Secrets and variables > Actions`:

| Secret | Description |
|--------|-------------|
| `NPM_TOKEN` | npm automation token with publish permissions |

### Getting an npm Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to **Access Tokens** in your account settings
3. Click **Generate New Token**
4. Select **Automation** type (for CI/CD)
5. Copy the token and add it as `NPM_TOKEN` in GitHub secrets

---

## Version Management

### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/):

| Version | When to Use | Example |
|---------|-------------|---------|
| **Patch** (x.x.X) | Bug fixes, security patches | `0.1.0` → `0.1.1` |
| **Minor** (x.X.0) | New features, backwards compatible | `0.1.0` → `0.2.0` |
| **Major** (X.0.0) | Breaking changes | `0.1.0` → `1.0.0` |

### Pre-release Tags

| Tag | Purpose | Version Example |
|-----|---------|-----------------|
| `alpha` | Early testing, unstable | `0.2.0-alpha.1` |
| `beta` | Feature complete, testing | `0.2.0-beta.1` |
| `rc` / `next` | Release candidate | `0.2.0-rc.1` |

---

## Release Process

### Quick Release (Recommended)

Use the release preparation script:

```bash
# Patch release (bug fixes)
bun run release:patch

# Minor release (new features)
bun run release:minor

# Major release (breaking changes)
bun run release:major
```

### Step-by-Step Release

#### 1. Prepare the Release

```bash
# Preview changes without applying
bun run scripts/prepare-release.ts --dry-run --type minor

# Apply changes
bun run scripts/prepare-release.ts --type minor
```

This script will:
- ✅ Run all tests and type checks
- ✅ Build the package
- ✅ Update version in `package.json`
- ✅ Generate changelog entry
- ✅ Create release notes

#### 2. Review Changes

```bash
# Check what changed
git diff

# Review the changelog
cat docs/CHANGELOG.md | head -50

# Review release notes
cat scripts/RELEASE_NOTES.md
```

#### 3. Commit and Tag

```bash
# Commit all changes
git add -A
git commit -m "chore: release v0.2.0"

# Create annotated tag
git tag -a v0.2.0 -m "Release v0.2.0"

# Push with tags
git push origin main --tags
```

#### 4. Create GitHub Release

1. Go to [Releases](https://github.com/kareemschultz/karetech-stack/releases)
2. Click **Draft a new release**
3. Select the tag you just created
4. Copy content from `scripts/RELEASE_NOTES.md`
5. Click **Publish release**

This will trigger the automated publish workflow.

---

## Automated Publishing

### How It Works

The GitHub Actions workflow (`.github/workflows/publish.yml`) automatically:

1. **Triggers** on new GitHub release publication
2. **Runs quality gate** (tests, lint, type check)
3. **Builds** the package
4. **Publishes** to npm with provenance
5. **Verifies** the published package
6. **Tests** installation via `bunx`

### Workflow Status

Check the workflow status at:
- [Actions Tab](https://github.com/kareemschultz/karetech-stack/actions/workflows/publish.yml)

### Manual Trigger

You can manually trigger a publish from the Actions tab:

1. Go to **Actions** > **Publish to npm**
2. Click **Run workflow**
3. Select options:
   - `dry_run`: Preview without publishing
   - `tag`: Choose npm tag (latest, beta, alpha, next)

---

## Manual Publishing

If automated publishing fails, you can publish manually:

### 1. Ensure You're Logged In

```bash
npm login
# Or use token
npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN
```

### 2. Build and Validate

```bash
bun run clean
bun run build:all
bun run validate
```

### 3. Verify Package Contents

```bash
# Preview what will be published
npm pack --dry-run

# Check package size
npm pack
ls -la create-karetech-stack-*.tgz
```

### 4. Publish

```bash
# Publish to npm
npm publish --access public

# With specific tag
npm publish --access public --tag beta
```

### 5. Verify Publication

```bash
# Check on npm
npm view create-karetech-stack

# Test installation
bunx create-karetech-stack@latest test-project --preset minimal
```

---

## Pre-release Versions

### Alpha Release

```bash
# Update version
npm version prerelease --preid=alpha

# Or manually
bun run scripts/prepare-release.ts --version 0.2.0-alpha.1

# Publish with alpha tag
npm publish --tag alpha
```

### Beta Release

```bash
# From alpha to beta
npm version prerelease --preid=beta

# Publish with beta tag
npm publish --tag beta
```

### Promoting to Latest

```bash
# After testing, promote beta to latest
npm dist-tag add create-karetech-stack@0.2.0 latest
```

---

## Post-Release Checklist

After publishing a release:

- [ ] Verify package on npm: `npm view create-karetech-stack@<version>`
- [ ] Test installation: `bunx create-karetech-stack my-test-app --preset minimal`
- [ ] Check GitHub release page
- [ ] Announce on social media/Discord
- [ ] Update documentation if needed
- [ ] Close related GitHub issues
- [ ] Update project roadmap

---

## Troubleshooting

### Common Issues

#### "npm ERR! 403 Forbidden"

**Cause**: Missing or invalid npm token

**Solution**:
```bash
# Check token is set
echo $NPM_TOKEN

# Re-login
npm login

# Or regenerate token and update GitHub secret
```

#### "Version already exists"

**Cause**: Trying to publish an existing version

**Solution**:
```bash
# Bump version
npm version patch

# Or use a pre-release
npm version prerelease --preid=fix
```

#### "Build failed"

**Cause**: TypeScript or lint errors

**Solution**:
```bash
# Check errors
bun run typecheck
bun run lint

# Fix and rebuild
bun run build:all
```

#### "Tests failed in CI"

**Cause**: Test environment differences

**Solution**:
```bash
# Run full test suite locally
bun run validate

# Check specific failing tests
bun test --filter "failing test name"
```

### Getting Help

- [GitHub Issues](https://github.com/kareemschultz/karetech-stack/issues)
- [npm Status](https://status.npmjs.org/)
- [GitHub Actions Status](https://www.githubstatus.com/)

---

## Security

### npm Provenance

All releases are published with npm provenance, which:
- Links packages to their source repository
- Proves the package was built by our CI
- Shows the exact commit used for the build

### Token Security

- Use **automation tokens** (not publish tokens)
- Rotate tokens regularly
- Never commit tokens to the repository
- Use GitHub secrets for CI/CD

### Package Verification

Users can verify packages:
```bash
# Check provenance
npm audit signatures

# View package info
npm view create-karetech-stack --json
```

---

## Release Schedule

### Current Policy

- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly or when significant features are ready
- **Major releases**: When breaking changes are necessary

### Deprecation Policy

- Deprecated versions remain available for 6 months
- Security fixes may be backported to previous minor versions
- Major version support follows Node.js LTS schedule

---

*Last updated: January 2026*
