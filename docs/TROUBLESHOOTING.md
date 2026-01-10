# Troubleshooting Guide

> **create-karetech-stack Troubleshooting Guide**
> Solutions for common issues and debugging techniques

## 📋 Table of Contents

- [Installation Issues](#-installation-issues)
- [CLI Issues](#-cli-issues)
- [Project Generation Issues](#-project-generation-issues)
- [Testing Issues](#-testing-issues)
- [TypeScript Issues](#-typescript-issues)
- [Preset Issues](#-preset-issues)
- [Template Issues](#-template-issues)
- [DevOps Issues](#-devops-issues)
- [AI Workflow Issues](#-ai-workflow-issues)
- [Performance Issues](#-performance-issues)
- [Platform-Specific Issues](#-platform-specific-issues)

## 🚀 Installation Issues

### CLI Installation Fails

**Problem:** `npm install -g create-karetech-stack` fails

**Solutions:**

1. **Use Bun instead (recommended):**
   ```bash
   # Install Bun first
   curl -fsSL https://bun.sh/install | bash

   # Use bunx instead of npm
   bunx create-karetech-stack create my-app
   ```

2. **Check Node.js version:**
   ```bash
   node --version  # Should be 18+
   ```

3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install -g create-karetech-stack@latest
   ```

4. **Permission issues on macOS/Linux:**
   ```bash
   # Use npx instead of global install
   npx create-karetech-stack create my-app

   # Or fix npm permissions
   sudo npm install -g create-karetech-stack
   ```

### Dependency Installation Fails

**Problem:** Dependencies fail to install during project creation

**Solutions:**

1. **Use different package manager:**
   ```bash
   # Skip auto-install and use preferred manager
   create-karetech-stack create my-app --no-install
   cd my-app
   bun install  # or npm install, yarn install
   ```

2. **Check registry access:**
   ```bash
   npm config get registry
   # Should be https://registry.npmjs.org/

   # Reset if different
   npm config set registry https://registry.npmjs.org/
   ```

3. **Clear package manager cache:**
   ```bash
   npm cache clean --force
   # or
   bun pm cache rm
   ```

## 🖥️ CLI Issues

### Command Not Found

**Problem:** `create-karetech-stack: command not found`

**Solutions:**

1. **Use bunx/npx:**
   ```bash
   bunx create-karetech-stack create my-app
   # or
   npx create-karetech-stack create my-app
   ```

2. **Check PATH:**
   ```bash
   echo $PATH
   # Ensure npm/bun global bin is in PATH
   ```

3. **Reinstall CLI:**
   ```bash
   npm uninstall -g create-karetech-stack
   npm install -g create-karetech-stack@latest
   ```

### TTY Initialization Failed

**Problem:** `ERR_TTY_INIT_FAILED` in CI or non-interactive environments

**Solutions:**

1. **Use preset flags for non-interactive mode:**
   ```bash
   create-karetech-stack create my-app --preset saas --no-git --no-install
   ```

2. **Set CI environment:**
   ```bash
   CI=true create-karetech-stack create my-app --preset minimal
   ```

3. **Use configuration file:**
   ```bash
   create-karetech-stack create my-app --config ./config.json
   ```

### Prompts Not Working

**Problem:** Interactive prompts freeze or don't respond

**Solutions:**

1. **Check terminal compatibility:**
   ```bash
   echo $TERM  # Should be xterm-compatible
   ```

2. **Use different terminal:**
   - Try native terminal apps
   - Avoid terminals with limited features
   - Ensure TTY support is enabled

3. **Force non-interactive mode:**
   ```bash
   create-karetech-stack create my-app --preset saas --theme nova --no-git
   ```

## 🏗️ Project Generation Issues

### Project Creation Fails

**Problem:** Project generation stops with error

**Diagnosis:**
```bash
# Enable verbose logging
DEBUG=* create-karetech-stack create my-app --preset saas

# Check disk space
df -h

# Check permissions
ls -la /path/to/parent/directory
```

**Solutions:**

1. **Check available disk space:**
   ```bash
   # Ensure at least 500MB free space
   df -h
   ```

2. **Verify write permissions:**
   ```bash
   # Test write access
   touch test-write && rm test-write
   ```

3. **Use different output directory:**
   ```bash
   create-karetech-stack create my-app --output /tmp/my-app
   ```

4. **Skip problematic steps:**
   ```bash
   # Skip git and install for debugging
   create-karetech-stack create my-app --preset minimal --no-git --no-install
   ```

### Missing Files in Generated Project

**Problem:** Expected files not generated

**Solutions:**

1. **Check preset configuration:**
   ```bash
   # Validate preset includes expected features
   cat node_modules/create-karetech-stack/dist/presets/your-preset.js
   ```

2. **Manually add missing files:**
   ```bash
   # Add common missing files
   cd my-app
   touch .env.example
   mkdir -p src/components
   ```

3. **Regenerate with different preset:**
   ```bash
   create-karetech-stack create my-app-v2 --preset saas
   # Compare file structures
   ```

### Permission Errors

**Problem:** `EACCES` or `EPERM` errors during generation

**Solutions:**

1. **Run with appropriate permissions:**
   ```bash
   # On Windows, run as Administrator
   # On macOS/Linux, check ownership
   sudo chown -R $USER:$USER /path/to/project
   ```

2. **Use different location:**
   ```bash
   # Generate in home directory
   cd ~
   create-karetech-stack create my-app
   ```

## 🧪 Testing Issues

### E2E Tests Fail

**Problem:** End-to-end tests fail to run

**Solutions:**

1. **Install browser dependencies:**
   ```bash
   # Install Playwright browsers
   npx playwright install

   # Install Puppeteer dependencies
   npm run puppeteer:install
   ```

2. **Check test environment:**
   ```bash
   # Verify test tools
   bunx tsc --version
   bun --version
   node --version
   ```

3. **Run tests with debugging:**
   ```bash
   # Verbose test output
   bun test --verbose
   bun run test:e2e --verbose
   ```

4. **Clear test cache:**
   ```bash
   # Clear test workspace
   rm -rf /tmp/karetech-stack-tests
   bun test tests/e2e/cli.test.ts
   ```

### Unit Tests Fail

**Problem:** Unit tests fail unexpectedly

**Solutions:**

1. **Check TypeScript compilation:**
   ```bash
   bun run typecheck
   # Fix any type errors first
   ```

2. **Update test dependencies:**
   ```bash
   bun update
   bun test
   ```

3. **Run specific test files:**
   ```bash
   # Test specific preset
   bun test src/presets/__tests__/presets.test.ts

   # Test validation
   bun test src/validation/__tests__/
   ```

### Preset Validation Fails

**Problem:** Preset validation fails with low scores

**Solutions:**

1. **Run preset validation:**
   ```bash
   bun run src/presets/__tests__/runner.ts
   # Check detailed report
   ```

2. **Fix preset configuration:**
   ```typescript
   // Ensure minimum tracking features
   export const myPreset: PresetConfig = {
     // ... other config
     pbsLevel: 'docs',        // Required for tracking
     beadsIntegration: true,  // Recommended
     claudeCodeHooks: true,   // Recommended
     unitTesting: true,       // Quality requirement
   };
   ```

3. **Check validation report:**
   ```bash
   # Read detailed validation results
   cat preset-validation-report.md
   ```

## ⚙️ TypeScript Issues

### Type Errors

**Problem:** TypeScript compilation fails

**Solutions:**

1. **Run type checking:**
   ```bash
   bun run typecheck
   # Fix reported errors
   ```

2. **Update TypeScript:**
   ```bash
   bun add -D typescript@latest
   ```

3. **Check tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "skipLibCheck": true
     }
   }
   ```

### Module Resolution Issues

**Problem:** Cannot resolve module imports

**Solutions:**

1. **Check import paths:**
   ```typescript
   // Use relative paths
   import { PresetConfig } from '../types';

   // Not absolute paths
   import { PresetConfig } from '@/types';
   ```

2. **Verify file extensions:**
   ```typescript
   // Include .js extension in imports
   import { util } from './util.js';
   ```

3. **Check module configuration:**
   ```json
   // package.json
   {
     "type": "module",
     "exports": {
       ".": {
         "import": "./dist/index.js",
         "require": "./dist/index.cjs"
       }
     }
   }
   ```

## 🎨 Preset Issues

### Preset Not Found

**Problem:** `Unknown preset: preset-name`

**Solutions:**

1. **Check available presets:**
   ```bash
   create-karetech-stack --help
   # Lists available presets
   ```

2. **Use correct preset name:**
   ```bash
   # Available presets
   create-karetech-stack create my-app --preset saas
   create-karetech-stack create my-app --preset ecommerce
   create-karetech-stack create my-app --preset blog
   create-karetech-stack create my-app --preset devtool
   create-karetech-stack create my-app --preset portfolio
   create-karetech-stack create my-app --preset minimal
   ```

3. **Update CLI to latest version:**
   ```bash
   npm install -g create-karetech-stack@latest
   ```

### Preset Configuration Issues

**Problem:** Preset generates unexpected configuration

**Solutions:**

1. **Override preset values:**
   ```bash
   # Override theme and color
   create-karetech-stack create my-app --preset saas --theme nova --color purple
   ```

2. **Use configuration file:**
   ```json
   // config.json
   {
     "preset": "saas",
     "database": "sqlite",
     "auth": ["email"],
     "theme": "custom"
   }
   ```

3. **Create custom preset:**
   ```typescript
   // See API.md for custom preset creation
   ```

## 📄 Template Issues

### Template Rendering Fails

**Problem:** EJS template rendering errors

**Solutions:**

1. **Check template syntax:**
   ```ejs
   <!-- Valid EJS syntax -->
   <%= projectName %>
   <% if (feature) { %>
   <%- content %>
   <% } %>
   ```

2. **Verify template data:**
   ```typescript
   // Ensure all template variables are provided
   const templateData = {
     config,
     projectName: config.projectName,
     // ... other required variables
   };
   ```

3. **Use template debugging:**
   ```bash
   DEBUG=ejs* create-karetech-stack create my-app
   ```

### Generated Files Corrupted

**Problem:** Generated files have syntax errors or missing content

**Solutions:**

1. **Check template files:**
   ```bash
   # Verify template integrity
   cat templates/package.json.ejs
   ```

2. **Validate generated output:**
   ```bash
   # Check syntax of generated files
   node -c generated-file.js
   npx prettier --check generated-file.json
   ```

3. **Regenerate project:**
   ```bash
   # Delete and regenerate
   rm -rf my-app
   create-karetech-stack create my-app --preset saas
   ```

## 🚀 DevOps Issues

### Docker Build Fails

**Problem:** Docker container fails to build

**Solutions:**

1. **Check Dockerfile:**
   ```dockerfile
   # Ensure proper base image
   FROM node:18-alpine
   # or
   FROM oven/bun:latest
   ```

2. **Build locally:**
   ```bash
   cd my-app
   docker build -t my-app .
   docker run -p 3000:3000 my-app
   ```

3. **Check dependencies:**
   ```bash
   # Ensure all deps are in package.json
   bun install
   bun run build
   ```

### CI/CD Pipeline Fails

**Problem:** GitHub Actions or deployment fails

**Solutions:**

1. **Check workflow files:**
   ```yaml
   # .github/workflows/ci.yml
   - name: Setup Node.js
     uses: actions/setup-node@v3
     with:
       node-version: '18'
   ```

2. **Verify environment variables:**
   ```bash
   # Required for deployment
   DATABASE_URL
   NEXTAUTH_SECRET
   # ... other env vars
   ```

3. **Test locally:**
   ```bash
   # Run same commands as CI
   bun install
   bun run typecheck
   bun run lint
   bun test
   bun run build
   ```

### Deployment Issues

**Problem:** Deployment to Vercel/Netlify fails

**Solutions:**

1. **Check build settings:**
   ```json
   // package.json
   {
     "scripts": {
       "build": "next build",
       "start": "next start"
     }
   }
   ```

2. **Verify dependencies:**
   ```bash
   # Ensure production deps are correct
   bun install --production
   bun run build
   ```

3. **Check deployment logs:**
   - Vercel: Check deployment logs in dashboard
   - Netlify: Check deploy logs for errors

## 🤖 AI Workflow Issues

### Beads Integration Fails

**Problem:** Beads CLI not working or issues not syncing

**Solutions:**

1. **Install Beads CLI:**
   ```bash
   # Install Beads
   curl -sSL https://beads.dev/install | bash

   # Initialize in project
   bd init
   bd onboard
   ```

2. **Check Beads configuration:**
   ```bash
   # Verify .beads directory
   ls -la .beads/

   # Test Beads commands
   bd list
   bd ready
   ```

3. **Sync issues manually:**
   ```bash
   bd sync
   bd status
   ```

### Claude Code Hooks Fail

**Problem:** Claude Code hooks not executing

**Solutions:**

1. **Check hooks configuration:**
   ```bash
   # Verify .claude directory
   ls -la .claude/
   cat .claude/settings.json
   ```

2. **Test hooks manually:**
   ```bash
   # Run hook scripts directly
   bash .claude/hooks/pre-commit.sh
   ```

3. **Check permissions:**
   ```bash
   # Make hooks executable
   chmod +x .claude/hooks/*.sh
   ```

### MCP Servers Not Working

**Problem:** MCP servers not connecting or functioning

**Solutions:**

1. **Check server configuration:**
   ```json
   // .claude/settings.json
   {
     "mcpServers": {
       "filesystem": {
         "command": "node",
         "args": ["/path/to/mcp-server-filesystem/dist/index.js"]
       }
     }
   }
   ```

2. **Test server connection:**
   ```bash
   # Test MCP server directly
   node /path/to/mcp-server/dist/index.js
   ```

3. **Update server dependencies:**
   ```bash
   npm install @modelcontextprotocol/sdk@latest
   ```

## ⚡ Performance Issues

### CLI Slow Performance

**Problem:** CLI takes too long to generate projects

**Solutions:**

1. **Skip optional steps:**
   ```bash
   # Skip git and install for speed
   create-karetech-stack create my-app --preset minimal --no-git --no-install
   ```

2. **Use SSD storage:**
   ```bash
   # Generate on faster storage
   cd /path/to/ssd
   create-karetech-stack create my-app
   ```

3. **Check system resources:**
   ```bash
   # Monitor system usage
   top
   df -h
   ```

### Generated Project Slow

**Problem:** Generated project has poor performance

**Solutions:**

1. **Check build configuration:**
   ```bash
   # Optimize build
   bun run build
   bun run start
   ```

2. **Profile performance:**
   ```bash
   # Use development tools
   bun --inspect dev
   ```

3. **Optimize dependencies:**
   ```bash
   # Analyze bundle size
   npx bundle-analyzer
   ```

## 🖥️ Platform-Specific Issues

### Windows Issues

**Common Windows-specific problems:**

1. **Path length limits:**
   ```bash
   # Use shorter project names
   create-karetech-stack create app --preset minimal

   # Enable long paths (Admin PowerShell)
   New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
   ```

2. **PowerShell execution policy:**
   ```powershell
   # Allow script execution
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Line ending issues:**
   ```bash
   # Configure git
   git config --global core.autocrlf true
   ```

### macOS Issues

**Common macOS-specific problems:**

1. **Permission issues:**
   ```bash
   # Fix permissions
   sudo xcode-select --install
   sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
   ```

2. **Homebrew conflicts:**
   ```bash
   # Use system Node.js
   brew unlink node
   # Or use nvm
   nvm use system
   ```

### Linux Issues

**Common Linux-specific problems:**

1. **Missing dependencies:**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install build-essential python3

   # CentOS/RHEL
   sudo yum groupinstall "Development Tools"
   ```

2. **Node.js version:**
   ```bash
   # Use NodeSource repository
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

## 🛠️ General Debugging

### Enable Debug Logging

```bash
# CLI debugging
DEBUG=* create-karetech-stack create my-app

# Component-specific debugging
DEBUG=preset:* create-karetech-stack create my-app --preset saas
DEBUG=template:* create-karetech-stack create my-app
DEBUG=validation:* create-karetech-stack create my-app
```

### Verbose Output

```bash
# Increase verbosity
create-karetech-stack create my-app --verbose

# Or use environment variable
VERBOSE=1 create-karetech-stack create my-app
```

### Clean Slate Testing

```bash
# Complete fresh start
rm -rf node_modules package-lock.json bun.lockb
rm -rf /tmp/karetech-stack-tests
npm cache clean --force
bun pm cache rm

# Reinstall and test
bun install
bun test
```

## 📞 Getting Help

### Community Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/kareemschultz/karetech-stack/issues)
- **GitHub Discussions**: [Ask questions and share solutions](https://github.com/kareemschultz/karetech-stack/discussions)
- **Documentation**: Check `docs/` directory for detailed guides

### Before Reporting Issues

1. **Search existing issues**: Check if the problem is already reported
2. **Provide reproduction steps**: Include minimal example to reproduce
3. **Include environment info**: OS, Node.js version, CLI version
4. **Include logs**: Debug output and error messages

### Issue Template

```markdown
## Problem Description
Brief description of the issue

## Environment
- OS: macOS 13.0
- Node.js: v18.17.0
- CLI Version: 1.0.0
- Package Manager: bun 1.0.0

## Steps to Reproduce
1. Run command: `create-karetech-stack create my-app --preset saas`
2. Select options: [specific choices]
3. Error occurs at: [step where error happens]

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened (include error messages)

## Logs
```
[Include debug logs here]
```

## Additional Context
Any other relevant information
```

---

**Need more help?** Check the [API documentation](./API.md) or [contributing guide](../CONTRIBUTING.md) for detailed technical information.