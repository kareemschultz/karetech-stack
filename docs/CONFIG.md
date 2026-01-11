# ⚙️ Configuration Guide

> **Complete reference for KareTech Stack configuration options, environment variables, and customization settings.**

---

## 🚀 Quick Start

```bash
# Interactive configuration (recommended)
bunx create-karetech-stack my-app

# CLI with specific options
bunx create-karetech-stack my-app \
  --preset saas \
  --database postgresql \
  --auth email,github \
  --theme nova \
  --color green
```

---

## 📋 CLI Options Reference

### Core Project Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--preset` | `saas`, `ecommerce`, `blog`, `devtool`, `portfolio`, `minimal` | Interactive | Pre-configured stack combination |
| `--no-git` | boolean | `false` | Skip git repository initialization |
| `--no-install` | boolean | `false` | Skip dependency installation |
| `--force` | boolean | `false` | Overwrite existing directory |
| `--verbose` | boolean | `false` | Detailed output during generation |
| `--debug` | boolean | `false` | Debug mode with extra logging |

### Database Configuration

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--database` | `postgresql`, `turso`, `sqlite`, `none` | Interactive | Database type |
| `--db-host` | string | `localhost` | Database host (PostgreSQL) |
| `--db-port` | number | `5432` | Database port (PostgreSQL) |
| `--db-name` | string | `{project_name}` | Database name |

**Examples:**

```bash
# PostgreSQL with custom settings
bunx create-karetech-stack my-app \
  --database postgresql \
  --db-host db.example.com \
  --db-port 5433

# Turso serverless SQLite
bunx create-karetech-stack my-app \
  --database turso

# No database (static/serverless)
bunx create-karetech-stack my-app \
  --database none
```

### Authentication Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--auth` | `email`, `github`, `google`, `discord`, `microsoft` | Interactive | Authentication providers (comma-separated) |
| `--no-auth` | boolean | `false` | Skip authentication setup |

**Examples:**

```bash
# Multiple auth providers
bunx create-karetech-stack my-app \
  --auth email,github,google

# GitHub only (developer tools)
bunx create-karetech-stack my-app \
  --auth github

# No authentication
bunx create-karetech-stack my-app \
  --no-auth
```

### Theme & Design Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--theme` | `vega`, `nova`, `maia`, `lyra`, `default` | Interactive | Visual style theme |
| `--color` | `blue`, `green`, `orange`, `purple`, `red`, `yellow`, `zinc` | `blue` | Accent color |
| `--font` | `figtree`, `inter`, `manrope`, `geist` | `figtree` | Typography |
| `--icons` | `hugeicons`, `lucide`, `heroicons`, `tabler` | `hugeicons` | Icon library |
| `--radius` | `none`, `small`, `default`, `medium`, `large` | `default` | Border radius |

**Examples:**

```bash
# Creative blog theme
bunx create-karetech-stack my-blog \
  --theme lyra \
  --color orange \
  --font manrope \
  --icons tabler

# Professional corporate theme  
bunx create-karetech-stack my-corp \
  --theme maia \
  --color zinc \
  --font inter \
  --icons lucide
```

### Testing Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--testing` | `playwright`, `puppeteer`, `vitest` | Interactive | Testing frameworks (comma-separated) |
| `--no-e2e` | boolean | `false` | Skip E2E testing setup |
| `--no-unit` | boolean | `false` | Skip unit testing setup |
| `--no-examples` | boolean | `false` | Skip example test files |

**Examples:**

```bash
# Full testing suite
bunx create-karetech-stack my-app \
  --testing playwright,puppeteer,vitest

# Unit tests only
bunx create-karetech-stack my-app \
  --testing vitest \
  --no-e2e

# No testing
bunx create-karetech-stack my-app \
  --no-e2e \
  --no-unit
```

### DevOps Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--no-docker` | boolean | `false` | Skip Docker configuration |
| `--no-ci` | boolean | `false` | Skip CI/CD setup |
| `--deploy` | `vercel`, `netlify`, `railway` | `vercel` | Deployment target |
| `--registry` | string | `ghcr.io` | Container registry |

**Examples:**

```bash
# Full DevOps with Railway
bunx create-karetech-stack my-app \
  --deploy railway \
  --registry registry.railway.app

# No Docker, Netlify deploy
bunx create-karetech-stack my-app \
  --no-docker \
  --deploy netlify

# Development only (no CI/CD)
bunx create-karetech-stack my-app \
  --no-ci \
  --no-docker
```

### AI Workflow Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `--pbs` | `none`, `basic`, `full` | `basic` | PBS integration level |
| `--no-claude` | boolean | `false` | Skip Claude Code setup |
| `--no-beads` | boolean | `false` | Skip Beads integration |
| `--mcp-servers` | string | Interactive | MCP servers (comma-separated) |

**Examples:**

```bash
# Full AI workflow setup
bunx create-karetech-stack my-app \
  --pbs full \
  --mcp-servers postgres,github,filesystem

# Minimal AI setup
bunx create-karetech-stack my-app \
  --pbs basic \
  --no-beads

# No AI integration
bunx create-karetech-stack my-app \
  --pbs none \
  --no-claude \
  --no-beads
```

---

## 📄 Configuration Files

### Project Configuration (`karetech.config.js`)

Generated configuration file for project-specific settings:

```javascript
// karetech.config.js (auto-generated)
export default {
  // Project metadata
  name: "my-app",
  version: "1.0.0",
  description: "My awesome application",
  
  // Stack configuration
  preset: "saas",
  database: "postgresql",
  auth: ["email", "github"],
  
  // Design system
  theme: {
    style: "nova",
    baseColor: "zinc",
    accentColor: "green",
    font: "figtree",
    icons: "hugeicons",
    borderRadius: "default",
    menuAccent: "subtle"
  },
  
  // Features
  features: {
    testing: ["playwright", "vitest"],
    docker: true,
    cicd: "github-actions",
    deployment: "vercel",
    pbs: "full",
    claudeCode: true,
    beads: true
  },
  
  // Advanced options
  advanced: {
    bundler: "vite",
    runtime: "bun",
    orm: "drizzle",
    apiStyle: "orpc",
    errorTracking: "sentry",
    analytics: "vercel",
    email: "resend"
  }
}
```

### Environment Variables

#### Development (`.env.development`)

```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp_dev
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-token

# Authentication
BETTER_AUTH_SECRET=dev-secret-change-in-production-min-32-chars
BETTER_AUTH_URL=http://localhost:3000

# OAuth Development Apps
GITHUB_CLIENT_ID=your-github-dev-client-id
GITHUB_CLIENT_SECRET=your-github-dev-secret
GOOGLE_CLIENT_ID=your-google-dev-client-id
GOOGLE_CLIENT_SECRET=your-google-dev-secret
DISCORD_CLIENT_ID=your-discord-dev-client-id
DISCORD_CLIENT_SECRET=your-discord-dev-secret
MICROSOFT_CLIENT_ID=your-microsoft-dev-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-dev-secret

# Email Service
RESEND_API_KEY=re_your-development-key

# Error Tracking & Analytics
SENTRY_DSN=your-development-sentry-dsn
VERCEL_ANALYTICS_ID=your-analytics-id

# MCP Servers
GITHUB_TOKEN=your-github-personal-access-token
GREPTILE_API_KEY=your-greptile-api-key

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_ERROR_TRACKING=true
ENABLE_EXPERIMENTAL_FEATURES=false
```

#### Production (`.env.production`)

```bash
# Database (Use strong credentials!)
DATABASE_URL=postgresql://user:secure-password@host:5432/production_db

# Authentication (Generate secure secrets!)
BETTER_AUTH_SECRET=super-secure-random-string-minimum-32-characters-long
BETTER_AUTH_URL=https://yourdomain.com

# OAuth Production Apps
GITHUB_CLIENT_ID=your-github-prod-client-id
GITHUB_CLIENT_SECRET=your-github-prod-secret
GOOGLE_CLIENT_ID=your-google-prod-client-id  
GOOGLE_CLIENT_SECRET=your-google-prod-secret

# Email Service (Production keys)
RESEND_API_KEY=re_your-production-key

# Monitoring & Analytics
SENTRY_DSN=your-production-sentry-dsn
VERCEL_ANALYTICS_ID=your-production-analytics-id

# Security
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_ERROR_TRACKING=true
```

### Package.json Configuration

Auto-generated with optimized scripts and dependencies:

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "start": "bun run src/server/index.ts",
    
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate", 
    "db:studio": "drizzle-kit studio",
    "db:seed": "bun run scripts/seed.ts",
    
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "typecheck": "tsc --noEmit",
    
    "docker:build": "docker build -t my-app .",
    "docker:run": "docker run -p 3000:3000 my-app",
    "docker:dev": "docker-compose up --build"
  }
}
```

---

## 🔧 Advanced Configuration

### Database Configuration

#### PostgreSQL Setup

```typescript
// drizzle.config.ts (auto-generated)
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
```

#### Turso Configuration

```typescript
// drizzle.config.ts for Turso
export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
```

### Authentication Configuration

#### Better Auth Setup

```typescript
// src/lib/auth.ts (auto-generated based on selections)
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db"
import * as schema from "@/db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "sqlite"
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verificationTokens,
    }
  }),
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  }
})
```

### Testing Configuration

#### Playwright Config

```typescript
// playwright.config.ts (auto-generated)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### Vitest Config

```typescript
// vitest.config.ts (auto-generated)
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## 🎨 Theme System Configuration

### CSS Variables

```css
/* src/styles/globals.css (theme-specific) */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Generated based on theme selection */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}
```

### Tailwind Configuration

```typescript
// tailwind.config.js (auto-generated)
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... additional color definitions
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

---

## 🔒 Security Configuration

### Content Security Policy

```typescript
// src/lib/security.ts (auto-generated for production)
export const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https://avatars.githubusercontent.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.github.com https://api.resend.com;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();
```

### Rate Limiting

```typescript
// src/lib/rate-limit.ts (auto-generated)
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '15 m'),
  analytics: true,
});
```

---

## 📋 Configuration Validation

### Environment Validation

```typescript
// src/lib/env.ts (auto-generated)
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

### Configuration Validation

```typescript
// src/lib/config-validator.ts (auto-generated)
export function validateConfig(config: any) {
  const errors: string[] = [];
  
  // Check required OAuth credentials
  if (config.auth.includes('github') && !process.env.GITHUB_CLIENT_ID) {
    errors.push('GitHub OAuth requires GITHUB_CLIENT_ID');
  }
  
  // Check database configuration
  if (config.database !== 'none' && !process.env.DATABASE_URL) {
    errors.push('Database configuration requires DATABASE_URL');
  }
  
  // Check email service
  if (config.auth.includes('email') && !process.env.RESEND_API_KEY) {
    errors.push('Email authentication requires RESEND_API_KEY');
  }
  
  return errors;
}
```

---

## 🚨 Common Configuration Issues

### Environment Variables Not Loading

```bash
# ❌ Common mistakes
GITHUB_CLIENT_ID = "your-id"    # Spaces around =
export GITHUB_CLIENT_ID=your-id  # Missing quotes

# ✅ Correct format
GITHUB_CLIENT_ID="your-client-id"
```

### Database Connection Issues

```bash
# ❌ Wrong format
DATABASE_URL=postgres://user:pass@host/db

# ✅ Correct format
DATABASE_URL=postgresql://user:pass@host:5432/db
```

### Authentication Secret Issues

```bash
# ❌ Too short (security risk)
BETTER_AUTH_SECRET="short-secret"

# ✅ Secure (32+ characters)
BETTER_AUTH_SECRET="super-secure-random-string-32-chars-minimum"

# Generate secure secret
openssl rand -base64 32
```

---

## 🔧 Configuration Export/Import

### Export Configuration

```typescript
// src/lib/config-export.ts (auto-generated)
export function exportConfig() {
  return {
    project: {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    },
    database: {
      type: getDatabaseType(),
      url: process.env.DATABASE_URL ? '[CONFIGURED]' : '[NOT_SET]',
    },
    auth: {
      providers: getConfiguredAuthProviders(),
      secret: process.env.BETTER_AUTH_SECRET ? '[CONFIGURED]' : '[NOT_SET]',
    },
    // ... additional config
  };
}
```

### Import Configuration

```bash
# Generate configuration file
bunx create-karetech-stack export-config > karetech.config.json

# Use configuration file
bunx create-karetech-stack my-new-app --config karetech.config.json
```

---

**Configure with confidence!** ⚙️

---

*Need help? Check out our [Environment Setup Guide](../README.md#environment-setup) or [Deployment Guide](DEPLOYMENT.md)*