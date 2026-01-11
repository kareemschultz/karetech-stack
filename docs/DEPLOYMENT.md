# 🚀 Deployment Guide

> **Production deployment guide for KareTech Stack applications with Vercel, Railway, Netlify, and Docker support.**

---

## 🚀 Quick Deploy

```bash
# Vercel (Recommended)
npx vercel --prod

# Railway
railway up

# Netlify
netlify deploy --prod
```

---

## ▲ Vercel Deployment (Recommended)

**Perfect for:** Full-stack applications, serverless deployments, global CDN

### Automatic Deployment

1. **Connect Repository:**
   ```bash
   # Push your code to GitHub
   git push origin main
   
   # Import to Vercel
   # Go to: https://vercel.com/new
   # Select your repository
   ```

2. **Environment Variables:**
   ```bash
   # Set in Vercel Dashboard > Settings > Environment Variables
   
   # Database
   DATABASE_URL=postgresql://user:pass@host:5432/prod_db
   
   # Authentication
   BETTER_AUTH_SECRET=your-super-secure-32-char-secret
   BETTER_AUTH_URL=https://your-app.vercel.app
   
   # OAuth (Production apps)
   GITHUB_CLIENT_ID=your-github-prod-client
   GITHUB_CLIENT_SECRET=your-github-prod-secret
   GOOGLE_CLIENT_ID=your-google-prod-client  
   GOOGLE_CLIENT_SECRET=your-google-prod-secret
   
   # Email Service
   RESEND_API_KEY=re_your-production-api-key
   
   # Analytics & Monitoring
   VERCEL_ANALYTICS_ID=your-analytics-id
   SENTRY_DSN=your-sentry-production-dsn
   ```

3. **Vercel Configuration:**
   ```json
   // vercel.json (auto-generated)
   {
     "framework": "vite",
     "buildCommand": "bun run build",
     "outputDirectory": "dist",
     "installCommand": "bun install --frozen-lockfile",
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
     ],
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "Referrer-Policy",
             "value": "origin-when-cross-origin"
           }
         ]
       }
     ]
   }
   ```

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add BETTER_AUTH_SECRET production
vercel env add DATABASE_URL production
```

### Custom Domains

```bash
# Add custom domain in Vercel Dashboard
# Or via CLI:
vercel domains add yourdomain.com

# Configure DNS:
# Type: CNAME
# Name: @ (or www)
# Value: cname.vercel-dns.com
```

---

## 🚄 Railway Deployment

**Perfect for:** Database + app hosting, PostgreSQL included, simple scaling

### One-Click Deploy

1. **Connect Repository:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Link project
   railway link
   ```

2. **Environment Setup:**
   ```bash
   # Railway automatically provides PostgreSQL
   # DATABASE_URL is set automatically
   
   # Set additional variables
   railway variables set BETTER_AUTH_SECRET=your-secret
   railway variables set GITHUB_CLIENT_ID=your-client-id
   railway variables set GITHUB_CLIENT_SECRET=your-secret
   ```

3. **Deploy:**
   ```bash
   # Deploy current branch
   railway up
   
   # Deploy with custom domain
   railway domain
   ```

### Railway Configuration

```json
// railway.json (auto-generated)
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "bun run build"
  },
  "deploy": {
    "startCommand": "bun start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### PostgreSQL Setup

```bash
# Railway automatically provisions PostgreSQL
# Access database
railway run psql $DATABASE_URL

# Run migrations
railway run bun run db:migrate

# Seed database  
railway run bun run db:seed
```

---

## 🌐 Netlify Deployment

**Perfect for:** Static sites, JAMstack apps, edge functions

### Automatic Deployment

1. **Connect Repository:**
   ```bash
   # Push to GitHub/GitLab
   git push origin main
   
   # Connect at: https://app.netlify.com/start
   ```

2. **Build Configuration:**
   ```toml
   # netlify.toml (auto-generated)
   [build]
     command = "bun run build"
     publish = "dist"
     
   [build.environment]
     NODE_VERSION = "20"
     BUN_VERSION = "1.1.42"
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   
   [functions]
     directory = "netlify/functions"
     
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
   ```

3. **Environment Variables:**
   ```bash
   # Set in Netlify Dashboard > Site settings > Environment variables
   DATABASE_URL=your-database-url
   BETTER_AUTH_SECRET=your-secret
   NETLIFY_FUNCTIONS_URL=https://your-site.netlify.app/.netlify/functions
   ```

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## 🐳 Docker Deployment

**Perfect for:** Self-hosting, VPS deployment, Kubernetes

### Docker Build

```bash
# Build production image
docker build -t my-app:latest .

# Run locally
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e BETTER_AUTH_SECRET="your-secret" \
  my-app:latest
```

### Multi-stage Dockerfile

```dockerfile
# Dockerfile (auto-generated)
FROM oven/bun:1.1.42-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Build application
FROM base AS build
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Production image
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --from=build /app/package.json ./

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["bun", "start"]
```

### Docker Compose Production

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/production
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=production
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

---

## ☁️ Cloud Platform Specifics

### AWS Deployment

**Using AWS App Runner:**

1. **Create apprunner.yaml:**
   ```yaml
   # apprunner.yaml
   version: 1.0
   runtime: nodejs20
   build:
     commands:
       build:
         - npm install -g bun
         - bun install --frozen-lockfile
         - bun run build
   run:
     runtime-version: 20
     command: bun start
     network:
       port: 3000
       env: PORT
     env:
       - name: NODE_ENV
         value: production
   ```

2. **Deploy via Console:**
   ```bash
   # Connect GitHub repository
   # Configure environment variables
   # Deploy with App Runner service
   ```

**Using AWS ECS:**

```json
// ecs-task-definition.json
{
  "family": "my-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "my-app",
      "image": "my-account.dkr.ecr.region.amazonaws.com/my-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:database-url"
        }
      ]
    }
  ]
}
```

### Google Cloud Run

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA', '.']

  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA']

  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'my-app'
      - '--image'
      - 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA'
      - '--platform'
      - 'managed'
      - '--region'
      - 'us-central1'
      - '--allow-unauthenticated'
```

### DigitalOcean App Platform

```yaml
# .do/app.yaml
name: my-app
services:
- name: web
  source_dir: /
  github:
    repo: your-username/your-repo
    branch: main
  run_command: bun start
  build_command: bun run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
  - key: BETTER_AUTH_SECRET
    value: ${BETTER_AUTH_SECRET}

databases:
- name: db
  engine: PG
  num_nodes: 1
  size: db-s-dev-database
  version: "15"
```

---

## 🌍 CDN & Performance

### Cloudflare Setup

```javascript
// cloudflare-workers-site.js
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // Serve static assets from KV
    return await getAssetFromKV(event, {
      cacheControl: {
        browserTTL: 86400, // 1 day
        edgeTTL: 86400,
      },
    })
  } catch (e) {
    // Fallback to origin
    return fetch(request)
  }
}
```

### Performance Optimization

```javascript
// next.config.js (if using Next.js mode)
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
    ]
  },
}
```

---

## 📊 Monitoring & Observability

### Health Check Endpoint

```typescript
// src/server/routes/health.ts (auto-generated)
import { Hono } from 'hono'
import { db } from '@/db'

const health = new Hono()

health.get('/', async (c) => {
  const startTime = Date.now()
  
  try {
    // Check database connection
    await db.execute('SELECT 1')
    const dbStatus = 'healthy'
    
    // Check external services
    const externalChecks = await Promise.allSettled([
      fetch(`${process.env.BETTER_AUTH_URL}/api/auth/health`),
      // Add other service checks
    ])

    const responseTime = Date.now() - startTime

    return c.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      database: dbStatus,
      responseTime: `${responseTime}ms`,
      external: externalChecks.map(check => ({
        status: check.status === 'fulfilled' ? 'healthy' : 'error'
      }))
    })
  } catch (error) {
    return c.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

export { health }
```

### Sentry Integration

```typescript
// src/lib/sentry.ts (auto-generated)
import * as Sentry from '@sentry/node'

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    beforeSend(event) {
      // Filter out sensitive data
      if (event.request?.headers) {
        delete event.request.headers.authorization
        delete event.request.headers.cookie
      }
      return event
    },
  })
}

export { Sentry }
```

### Performance Monitoring

```typescript
// src/lib/analytics.ts (auto-generated)
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  )
}
```

---

## 🔒 Production Security

### Security Headers

```typescript
// src/lib/security-headers.ts
export const securityHeaders = {
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://avatars.githubusercontent.com https://lh3.googleusercontent.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.github.com https://api.resend.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim(),
  
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}
```

### Environment Validation

```typescript
// src/lib/env-validation.ts (auto-generated)
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  
  // Optional OAuth
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  
  // Optional services
  RESEND_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  VERCEL_ANALYTICS_ID: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

---

## 🚨 Troubleshooting

### Common Deployment Issues

**Build Failures:**
```bash
# Check build logs
vercel logs your-deployment-url

# Common fixes:
1. Verify all environment variables are set
2. Check bun.lockb is committed
3. Ensure build command is correct
4. Verify Node.js version compatibility
```

**Database Connection Issues:**
```bash
# Test database connection locally
bun run db:studio

# Verify DATABASE_URL format
postgresql://user:password@host:5432/database

# Check database server is accessible
telnet your-db-host 5432
```

**OAuth Redirect Errors:**
```bash
# Verify redirect URIs in OAuth apps:
Development: http://localhost:3000/api/auth/callback/github
Production: https://yourdomain.com/api/auth/callback/github

# Check environment variables
echo $GITHUB_CLIENT_ID
echo $BETTER_AUTH_URL
```

**SSL/HTTPS Issues:**
```bash
# Verify custom domain SSL
curl -I https://yourdomain.com

# Check security headers
curl -I https://yourdomain.com | grep -i security
```

### Performance Issues

**Slow Cold Starts:**
```typescript
// Add connection pooling for serverless
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // Single connection for serverless
})
```

**Large Bundle Size:**
```bash
# Analyze bundle
bunx @next/bundle-analyzer

# Common optimizations:
1. Dynamic imports for heavy components
2. Remove unused dependencies  
3. Optimize images and fonts
4. Enable gzip/brotli compression
```

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] ✅ All tests passing
- [ ] 🔍 TypeScript compilation successful
- [ ] 📝 Linting issues resolved
- [ ] 🔒 Security audit completed
- [ ] 📊 Performance benchmarks meet targets

### Environment Setup
- [ ] 🔐 Production environment variables configured
- [ ] 🗄️ Database migrations applied
- [ ] 🌐 OAuth apps configured for production URLs
- [ ] 📧 Email service verified
- [ ] 🔑 SSL certificates configured

### Infrastructure
- [ ] 🌍 Custom domain configured
- [ ] 📈 Analytics and monitoring setup
- [ ] 💾 Database backups configured
- [ ] 🚨 Error tracking active
- [ ] 🔄 CI/CD pipeline tested

### Security
- [ ] 🛡️ Security headers configured
- [ ] 🔐 Secrets properly managed
- [ ] 🚫 No hardcoded credentials
- [ ] 🔒 Rate limiting enabled
- [ ] 🛡️ CSRF protection active

### Performance
- [ ] ⚡ Image optimization enabled
- [ ] 📦 Bundle size optimized
- [ ] 🌐 CDN configured
- [ ] 💾 Caching strategy implemented
- [ ] 📊 Performance monitoring active

---

**Ship with confidence!** 🚀

---

*Need help? Check out our [DevOps Guide](DEVOPS.md) or [Configuration Guide](CONFIG.md)*