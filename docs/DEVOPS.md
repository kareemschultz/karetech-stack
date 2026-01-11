# 🐳 DevOps & Deployment Guide

> **Production-ready Docker, CI/CD, and deployment configurations for KareTech Stack applications.**

---

## 🚀 Quick Start

```bash
# Create project with full DevOps setup
bunx create-karetech-stack my-app --preset saas

# Docker development
docker-compose up

# Production deployment
docker build -t my-app .
docker run -p 3000:3000 my-app
```

---

## 🐳 Docker Configuration

### Development Environment

**Docker Compose for Local Development:**

```yaml
# docker-compose.yml (generated)
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"  # Vite dev server
      - "3000:3000"  # Hono API server
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/myapp
    volumes:
      - .:/app
      - /app/node_modules
    
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=myapp_dev
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

**Start Development Environment:**

```bash
# First time setup
cp .env.example .env.development
# Edit environment variables

# Start all services
docker-compose up

# Development with hot reload
docker-compose up --build

# Background mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Dockerfile

**Multi-stage Production Build:**

```dockerfile
# Dockerfile (generated)
FROM oven/bun:1.1.42-alpine AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["bun", "start"]
```

**Production Commands:**

```bash
# Build production image
docker build -t my-app:latest .

# Run production container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-production-db-url" \
  -e BETTER_AUTH_SECRET="your-production-secret" \
  my-app:latest

# Check container size
docker images my-app:latest
# Expected: ~180MB (optimized!)
```

---

## ⚙️ Environment Configuration

### Environment Files

**Development (`.env.development`):**
```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp_dev

# Authentication
BETTER_AUTH_SECRET=dev-secret-change-in-production
BETTER_AUTH_URL=http://localhost:3000

# OAuth (Development)
GITHUB_CLIENT_ID=your-github-dev-client-id
GITHUB_CLIENT_SECRET=your-github-dev-secret

# Optional: Email
RESEND_API_KEY=your-resend-dev-key
```

**Production (`.env.production`):**
```bash
# Database (Use strong credentials!)
DATABASE_URL=postgresql://user:secure-password@host:5432/production_db

# Authentication (Generate secure secret!)
BETTER_AUTH_SECRET=super-secure-random-string-32-chars-min
BETTER_AUTH_URL=https://your-app.com

# OAuth (Production apps)
GITHUB_CLIENT_ID=your-github-prod-client-id
GITHUB_CLIENT_SECRET=your-github-prod-secret

# Services
RESEND_API_KEY=your-resend-prod-key
SENTRY_DSN=your-sentry-dsn
VERCEL_ANALYTICS_ID=your-analytics-id
```

### Security Best Practices

```bash
# ❌ Never commit secrets
echo ".env*" >> .gitignore

# ✅ Use environment-specific files
.env.example          # Template with dummy values
.env.development      # Local development
.env.staging          # Staging environment
.env.production       # Production (never commit!)

# ✅ Generate secure secrets
openssl rand -base64 32  # For BETTER_AUTH_SECRET
```

---

## 🚀 CI/CD Pipelines

### GitHub Actions (Generated)

**Complete CI/CD Pipeline (`.github/workflows/ci-cd.yml`):**

```yaml
name: 🚀 CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # 🔍 Code Quality
  quality:
    name: 🔍 Quality Checks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
          
      - run: bun install --frozen-lockfile
      - run: bun run lint
      - run: bun run typecheck
      - run: bun run test:unit

  # 🧪 E2E Testing
  e2e:
    name: 🧪 E2E Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      
      - run: bun install --frozen-lockfile
      - run: bunx playwright install
      - run: bun run test:e2e

  # 🏗️ Build & Test
  build:
    name: 🏗️ Build Application
    runs-on: ubuntu-latest
    needs: [quality, e2e]
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      
      - run: bun install --frozen-lockfile
      - run: bun run build
      
      # Test production build
      - run: bun start &
      - run: sleep 5 && curl http://localhost:3000

  # 🐳 Docker Build
  docker:
    name: 🐳 Docker Build
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}

  # 🚀 Deploy (Production)
  deploy:
    name: 🚀 Deploy to Production
    runs-on: ubuntu-latest
    needs: docker
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment Secrets Setup

**Required GitHub Secrets:**

```bash
# Repository Settings > Secrets and Variables > Actions

# Vercel Deployment
VERCEL_TOKEN=your-vercel-token
ORG_ID=your-vercel-org-id
PROJECT_ID=your-vercel-project-id

# Database (if using external)
DATABASE_URL=your-production-database-url

# Authentication
BETTER_AUTH_SECRET=your-production-auth-secret

# OAuth Applications (Production)
GITHUB_CLIENT_ID=your-github-prod-client-id
GITHUB_CLIENT_SECRET=your-github-prod-secret
GOOGLE_CLIENT_ID=your-google-prod-client-id
GOOGLE_CLIENT_SECRET=your-google-prod-secret

# Services
RESEND_API_KEY=your-production-resend-key
SENTRY_DSN=your-sentry-production-dsn
```

---

## 🌐 Deployment Targets

### Vercel (Recommended)

**Automatic Deployment:**

```bash
# Connect repository to Vercel
npx vercel link

# Configure environment variables
npx vercel env add BETTER_AUTH_SECRET production
npx vercel env add DATABASE_URL production

# Deploy
npx vercel --prod
```

**Vercel Configuration (`vercel.json`):**

```json
{
  "framework": "vite",
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install",
  "functions": {
    "src/server/**/*.ts": {
      "runtime": "nodejs20.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/src/server/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### Railway

**One-Click Deploy:**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link project
railway login
railway link

# Deploy
railway up
```

### Netlify

**Build Configuration (`netlify.toml`):**

```toml
[build]
  command = "bun run build"
  publish = "dist"

[build.environment]
  BUN_VERSION = "1.1.42"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📊 Monitoring & Observability

### Performance Monitoring

**Sentry Integration (Generated):**

```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/node';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  });
}
```

### Health Checks

**Kubernetes Health Check (`/health`):**

```typescript
// Generated in Hono server
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});
```

### Logging

**Structured Logging:**

```typescript
// Production logging setup
import { logger } from 'hono/logger';

app.use('*', logger((str) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to logging service
    console.log(JSON.stringify({
      message: str,
      timestamp: new Date().toISOString(),
      level: 'info'
    }));
  } else {
    console.log(str);
  }
}));
```

---

## 🔧 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
bun run build:analyze

# Check dependencies
bunx bundle-analyzer

# Size optimization
bun run build --minify --sourcemap=false
```

### Docker Optimization

**Multi-stage Build Benefits:**

| Stage | Size | Purpose |
|-------|------|---------|
| Base | 95MB | Bun runtime |
| Deps | +45MB | Dependencies |
| Build | +200MB | Build tools & source |
| **Production** | **180MB** | **Final optimized image** |

**Optimization Techniques:**
- 🗜️ Multi-stage builds (64% smaller)
- 🚫 `.dockerignore` for unused files
- ⚡ Layer caching for faster rebuilds
- 🔧 Alpine Linux base images
- 📦 Only production dependencies

---

## 🚨 Troubleshooting

### Common Issues

**Docker Build Fails:**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

**Database Connection Issues:**
```bash
# Check database is running
docker-compose ps

# View database logs
docker-compose logs postgres

# Connect to database directly
docker-compose exec postgres psql -U postgres -d myapp_dev
```

**Environment Variables Not Loading:**
```bash
# Check file exists
ls -la .env*

# Verify syntax (no spaces around =)
cat .env.development | grep -v '^#' | grep '='

# Test environment loading
bun run dev --verbose
```

**CI/CD Pipeline Failures:**
```bash
# Check GitHub Actions logs
# Go to: Repository > Actions > Failed workflow

# Common fixes:
1. Update GitHub secrets
2. Check bun version compatibility
3. Verify build command syntax
4. Check environment variables
```

---

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] ✅ All tests passing locally
- [ ] 🔐 Environment variables configured
- [ ] 🗄️ Database migrations ready
- [ ] 📦 Production build successful
- [ ] 🐳 Docker image builds correctly
- [ ] 🔍 Security audit completed

### Post-Deployment

- [ ] 🌐 Application accessible at domain
- [ ] 🗄️ Database connectivity confirmed
- [ ] 🔐 Authentication flows working
- [ ] 📊 Monitoring/logging active
- [ ] 🚨 Error tracking configured
- [ ] 📈 Analytics collecting data

---

**Ready to ship!** 🚀

---

*Need help? Check out our [Configuration Guide](CONFIG.md) or [Database Guide](DATABASE.md)*