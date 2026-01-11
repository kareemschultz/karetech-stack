# 🗄️ Database Guide

> **Complete database setup and management guide for KareTech Stack applications with PostgreSQL, Turso, and SQLite support.**

---

## 🚀 Quick Start

```bash
# Create project with PostgreSQL
bunx create-karetech-stack my-app --database postgresql

# Create project with Turso (serverless SQLite)
bunx create-karetech-stack my-app --database turso

# Create project with local SQLite
bunx create-karetech-stack my-app --database sqlite
```

---

## 🗄️ Database Options

### 🐘 **PostgreSQL** (Recommended for Production)

**Perfect for:** Production applications, complex queries, ACID compliance

**What You Get:**
- Full-featured relational database
- Excellent performance and scalability
- Rich ecosystem and tooling
- ACID transactions
- JSON support
- Full-text search capabilities

**Generated Setup:**
```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
})

export const db = drizzle(client, { schema })
```

**Environment Configuration:**
```bash
# .env.development
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp_dev

# .env.production  
DATABASE_URL=postgresql://user:secure-password@host:5432/production_db
```

---

### 🌐 **Turso** (Serverless SQLite)

**Perfect for:** Serverless apps, edge computing, cost optimization

**What You Get:**
- Edge-replicated SQLite
- Sub-millisecond latency globally
- Automatic scaling
- Cost-effective for small-medium apps
- SQLite compatibility

**Generated Setup:**
```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema })
```

**Environment Configuration:**
```bash
# .env.development & .env.production
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

**Setup Instructions:**
```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Create database
turso db create my-app

# Generate auth token
turso db tokens create my-app

# Get database URL
turso db show my-app --url
```

---

### 📁 **SQLite** (Local Development)

**Perfect for:** Development, prototypes, single-user applications

**What You Get:**
- File-based database
- Zero configuration
- Perfect for development
- Lightweight and fast
- No server required

**Generated Setup:**
```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'

const sqlite = new Database('./local.db')
export const db = drizzle(sqlite, { schema })
```

**Environment Configuration:**
```bash
# .env.development
DATABASE_URL=file:./local.db

# Database file will be created automatically
```

---

## 📋 Database Schema

### User Management Schema

Generated authentication schema based on Better Auth:

```typescript
// src/db/schema.ts (auto-generated)
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
// or: import { sqliteTable as pgTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  expiresAt: timestamp('expires_at'),
  password: text('password'),
})

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => users.id),
})

export const verificationTokens = pgTable('verification_tokens', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
})
```

### Application Schema Examples

**Blog Application:**
```typescript
// Additional tables for blog preset
export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  published: boolean('published').default(false),
  authorId: text('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
})

export const tags = pgTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
})
```

**E-commerce Application:**
```typescript
// Additional tables for ecommerce preset
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: text('price').notNull(), // Store as decimal string
  inventory: text('inventory').notNull(),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  status: text('status').notNull(),
  total: text('total').notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

---

## 🔧 Database Operations

### Migration Commands

```bash
# Generate migration from schema changes
bun run db:generate

# Apply migrations to database
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio

# Seed database with initial data
bun run db:seed
```

### Drizzle Configuration

```typescript
// drizzle.config.ts (auto-generated based on database choice)
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg', // or 'turso' or 'better-sqlite'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
    // For Turso:
    // url: process.env.TURSO_DATABASE_URL!,
    // authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
} satisfies Config
```

### Database Queries

**Basic CRUD Operations:**
```typescript
// src/lib/db-operations.ts (example generated helpers)
import { db } from '@/db'
import { users, posts } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'

// Create user
export async function createUser(data: {
  name: string
  email: string
}) {
  return await db.insert(users).values({
    id: crypto.randomUUID(),
    ...data,
  }).returning()
}

// Get user by email
export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email)).limit(1)
}

// Get published posts
export async function getPublishedPosts() {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
}

// Update user
export async function updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
  return await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()
}

// Delete user
export async function deleteUser(id: string) {
  return await db.delete(users).where(eq(users.id, id))
}
```

**Complex Queries:**
```typescript
// Advanced queries with joins and aggregations
export async function getPostsWithAuthor() {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      authorName: users.name,
      authorEmail: users.email,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
}

export async function getUserWithPostCount(userId: string) {
  return await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      postCount: count(posts.id),
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .where(eq(users.id, userId))
    .groupBy(users.id)
}
```

---

## 🔄 Database Migrations

### Creating Migrations

```bash
# 1. Modify your schema in src/db/schema.ts
# 2. Generate migration
bun run db:generate

# This creates a new file in drizzle/ directory
```

**Example Migration:**
```sql
-- drizzle/0001_add_posts_table.sql
CREATE TABLE IF NOT EXISTS "posts" (
  "id" text PRIMARY KEY NOT NULL,
  "title" text NOT NULL,
  "slug" text NOT NULL,
  "content" text NOT NULL,
  "published" boolean DEFAULT false,
  "author_id" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" ("slug");

ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" 
  FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
```

### Applying Migrations

```bash
# Apply all pending migrations
bun run db:migrate

# Check migration status
bunx drizzle-kit up
```

### Rolling Back Migrations

```typescript
// src/scripts/rollback.ts (manual rollback)
import { db } from '@/db'

async function rollback() {
  // Manually reverse changes
  await db.execute(`DROP TABLE IF EXISTS "posts"`)
  console.log('Rolled back posts table')
}

rollback().catch(console.error)
```

---

## 🌱 Database Seeding

### Seed Script

```typescript
// scripts/seed.ts (auto-generated)
import { db } from '@/db'
import { users, posts } from '@/db/schema'
import { hash } from '@node-rs/argon2'

async function seed() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const [adminUser] = await db.insert(users).values({
    id: crypto.randomUUID(),
    name: 'Admin User',
    email: 'admin@example.com',
    emailVerified: true,
  }).returning()

  console.log('✅ Created admin user')

  // Create sample posts (for blog/content presets)
  if (adminUser) {
    await db.insert(posts).values([
      {
        id: crypto.randomUUID(),
        title: 'Welcome to Your New Blog',
        slug: 'welcome-to-your-new-blog',
        content: 'This is your first blog post. Edit or delete it to start blogging!',
        excerpt: 'Welcome post for your new blog',
        published: true,
        authorId: adminUser.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Getting Started Guide',
        slug: 'getting-started-guide',
        content: 'Learn how to customize your blog and add new content.',
        excerpt: 'A guide to help you get started',
        published: true,
        authorId: adminUser.id,
      },
    ])

    console.log('✅ Created sample posts')
  }

  console.log('🎉 Database seeded successfully!')
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
```

### Running Seeds

```bash
# Run seed script
bun run db:seed

# Production seeding (careful!)
NODE_ENV=production bun run db:seed
```

---

## 🐳 Database with Docker

### Development Setup

```yaml
# docker-compose.yml (auto-generated for PostgreSQL)
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=myapp_dev
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-password}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql

  pgadmin:
    image: dpage/pgadmin4:latest
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@example.com
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PASSWORD:-admin}
    ports:
      - "5050:80"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### Database Commands

```bash
# Start database
docker-compose up postgres -d

# Connect to database
docker-compose exec postgres psql -U postgres -d myapp_dev

# Backup database
docker-compose exec postgres pg_dump -U postgres myapp_dev > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres -d myapp_dev < backup.sql

# View logs
docker-compose logs postgres
```

---

## 📊 Database Performance

### Query Optimization

```typescript
// src/lib/db-optimized.ts
import { db } from '@/db'
import { posts, users } from '@/db/schema'

// ❌ N+1 Query Problem
export async function getPostsWithAuthorsSlow() {
  const posts = await db.select().from(posts)
  
  for (const post of posts) {
    // This creates N additional queries!
    const author = await db.select().from(users).where(eq(users.id, post.authorId))
    post.author = author[0]
  }
  
  return posts
}

// ✅ Optimized with JOIN
export async function getPostsWithAuthorsFast() {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .limit(20) // Pagination
}
```

### Indexing Strategy

```sql
-- Database indexes for better performance
CREATE INDEX IF NOT EXISTS "posts_author_id_idx" ON "posts" ("author_id");
CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" ("created_at" DESC);
CREATE INDEX IF NOT EXISTS "posts_published_created_at_idx" ON "posts" ("published", "created_at" DESC);
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
```

### Connection Pooling

```typescript
// src/db/index.ts (production configuration)
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!, {
  max: 20,                    // Maximum connections
  idle_timeout: 20,           // Close idle connections after 20s
  connect_timeout: 30,        // Connection timeout
  prepare: false,             // Disable prepared statements for better compatibility
})

export const db = drizzle(client, { schema })
```

---

## 🔒 Database Security

### Environment Variables

```bash
# ✅ Secure production configuration
DATABASE_URL=postgresql://app_user:ultra-secure-password@db-host:5432/production_db

# ❌ Avoid these patterns
DATABASE_URL=postgresql://postgres:password@localhost:5432/db
DATABASE_URL=postgresql://root:123456@db:5432/myapp
```

### Access Control

```sql
-- Create application-specific database user
CREATE USER app_user WITH PASSWORD 'secure-random-password';

-- Grant only necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- Revoke dangerous permissions
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
```

### SQL Injection Prevention

```typescript
// ✅ Safe with Drizzle ORM
export async function getUserSafe(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}

// ❌ Dangerous raw SQL
export async function getUserUnsafe(email: string) {
  return await db.execute(`SELECT * FROM users WHERE email = '${email}'`)
}

// ✅ Safe raw SQL with parameters
export async function getUserSafeRaw(email: string) {
  return await db.execute(`SELECT * FROM users WHERE email = $1`, [email])
}
```

---

## 📊 Database Monitoring

### Query Logging

```typescript
// src/lib/db-logger.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!, {
  onnotice: process.env.NODE_ENV === 'development' ? console.log : undefined,
})

export const db = drizzle(client, { 
  schema,
  logger: process.env.NODE_ENV === 'development',
})
```

### Health Checks

```typescript
// src/lib/db-health.ts
export async function checkDatabaseHealth() {
  try {
    await db.execute('SELECT 1')
    return { status: 'healthy', timestamp: new Date().toISOString() }
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString() 
    }
  }
}
```

---

## 🚨 Troubleshooting

### Common Issues

**Connection Refused:**
```bash
# Check if database is running
docker-compose ps

# Check connection string format
echo $DATABASE_URL

# Test connection
bunx drizzle-kit studio
```

**Migration Failures:**
```bash
# Check migration status
bunx drizzle-kit up

# Reset database (development only!)
rm -rf drizzle/
bun run db:generate
bun run db:migrate
```

**Performance Issues:**
```typescript
// Enable query logging
const db = drizzle(client, { logger: true })

// Check slow queries
// Add indexes for frequently queried columns
// Use EXPLAIN ANALYZE for query plans
```

**Turso Authentication:**
```bash
# Regenerate auth token
turso db tokens create my-database

# Verify token has correct permissions
turso db tokens list my-database
```

---

## 📋 Database Checklist

### Development Setup
- [ ] ✅ Database running (Docker/local/cloud)
- [ ] 🔐 Environment variables configured
- [ ] 📋 Schema defined and generated
- [ ] 🔄 Migrations applied
- [ ] 🌱 Database seeded with test data
- [ ] 🎯 Drizzle Studio accessible

### Production Setup
- [ ] 🔒 Secure credentials configured
- [ ] 🏗️ Database provisioned with adequate resources
- [ ] 🔄 Migration strategy planned
- [ ] 📊 Monitoring and alerting setup
- [ ] 💾 Backup strategy implemented
- [ ] 🔐 Access controls configured

---

**Build with confidence!** 🗄️

---

*Need help? Check out our [Authentication Guide](AUTH.md) or [Deployment Guide](DEPLOYMENT.md)*