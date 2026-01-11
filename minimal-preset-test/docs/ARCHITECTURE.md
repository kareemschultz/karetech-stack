# Architecture — minimal-preset-test

> **System design and architectural decisions**

---

## System Overview

minimal-preset-test is built on the Better-T-Stack foundation with enhancements for minimal setup for simple applications.

### Architecture Principles
- **Type Safety**: 100% TypeScript with strict mode
- **Performance First**: Optimized for speed and efficiency
- **Developer Experience**: Tools and patterns that enhance productivity
- **Maintainability**: Clean, well-documented, testable code

---

## Tech Stack

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
├─────────────────────────────────────────────────────────┤
│  React Components (shadcn/ui + maia)                    │
│  TanStack Router (Client-side routing)                 │
│  TanStack Query (Server state management)              │
│  Tailwind CSS (Styling)                                │
└─────────────────────────────────────────────────────────┘
```

**Key Technologies:**
- **React 18**: Component library with concurrent features
- **TanStack Router**: Type-safe client-side routing
- **shadcn/ui**: Modern component library (maia theme)
- **Tailwind CSS**: Utility-first styling framework
- **figtree**: Primary typography
- **hugeicons**: Icon library

### Backend Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    API Layer                            │
├─────────────────────────────────────────────────────────┤
│  Hono Framework (Web framework)                        │
│  oRPC (Type-safe API layer)                            │
│  Better Auth (Authentication)                          │
│  Drizzle ORM (Database layer)                          │
└─────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────┐
│                 Database Layer                          │
├─────────────────────────────────────────────────────────┤
│  Sqlite (Primary database)                           │
└─────────────────────────────────────────────────────────┘
```

**Key Technologies:**
- **Bun**: JavaScript runtime and package manager
- **Hono**: Lightweight web framework
- **oRPC**: End-to-end type safety for APIs
- **Drizzle**: Type-safe ORM
- **Sqlite**: Database engine

---

## Data Architecture

### Database Design
```sql
-- Core Schema Structure

-- SQLite Schema
-- Users table (if auth enabled)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Example application table
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

```

### Data Flow
1. **Client Request** → TanStack Router → React Component
2. **API Call** → TanStack Query → oRPC Client
3. **Server Processing** → Hono Handler → Business Logic
4. **Data Access** → Drizzle ORM → Sqlite Database
5. **Response Flow** → JSON → oRPC → TanStack Query → Component State

---

## Authentication Architecture


### Auth Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │  Better Auth    │    │  Auth Provider  │
│                 │    │                 │    │  (email)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         │  1. Login Request      │                        │
         ├───────────────────────→│                        │
         │                        │  2. Provider Auth      │
         │                        ├───────────────────────→│
         │                        │                        │
         │                        │  3. Auth Response      │
         │                        │←───────────────────────┤
         │  4. Session Created    │                        │
         │←───────────────────────┤                        │
```

**Authentication Features:**
- **Providers**: email
- **Session Management**: Secure session handling
- **Token Storage**: Secure token management




---

## API Architecture

### oRPC Schema Design
```typescript
// API Route Structure
const appRouter = {
  // Health check
  health: {
    input: z.void(),
    output: z.object({
      status: z.literal('ok'),
      timestamp: z.string()
    })
  },

  // Example CRUD operations
  items: {
    list: {
      input: z.object({
        limit: z.number().optional(),
        offset: z.number().optional()
      }),
      output: z.array(ItemSchema)
    },
    create: {
      input: CreateItemSchema,
      output: ItemSchema
    },
    update: {
      input: UpdateItemSchema,
      output: ItemSchema
    },
    delete: {
      input: z.object({ id: z.number() }),
      output: z.object({ success: z.boolean() })
    }
  }
};
```

### API Patterns
- **RESTful Design**: Resource-based URL structure
- **Type Safety**: End-to-end type checking
- **Error Handling**: Structured error responses
- **Validation**: Input/output schema validation

---

## Frontend Architecture

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── routes/              # Page components
├── lib/                 # Utilities and helpers
├── hooks/               # Custom React hooks
└── styles/              # Global styles and themes
```

### State Management Strategy
- **Local State**: `useState` for component-specific state
- **Server State**: TanStack Query for API data
- **Global State**: React Context for app-wide state
- **URL State**: TanStack Router for navigation state

### Component Patterns
- **Composition**: Favor composition over inheritance
- **Separation of Concerns**: Logic separated from presentation
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and code splitting

---

## Testing Architecture


### Testing Strategy
```
┌─────────────────────────────────────────────────────────┐
│                Testing Pyramid                          │
├─────────────────────────────────────────────────────────┤
│  🔺 E2E Tests (None configured)                    │
│  🔸 Integration Tests (API + Database)                 │
│  🔹 Unit Tests (Components + Logic)                    │
└─────────────────────────────────────────────────────────┘
```

**Testing Tools:**
- **Unit Testing**: Vitest + React Testing Library




### Test Coverage Goals
- **Unit Tests**: 80% code coverage minimum
- **Integration Tests**: All API endpoints covered
- **E2E Tests**: Critical user journeys covered


---

## Deployment Architecture



### Deployment Pipeline
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Git Push  │    │   CI/CD     │    │    Build    │    │   Deploy    │
│             │    │  (none)   │    │             │    │  (vercel)    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
         │                  │                  │                  │
         │  1. Code Push    │                  │                  │
         ├─────────────────→│                  │                  │
         │                  │  2. Run Tests    │                  │
         │                  ├─────────────────→│                  │
         │                  │                  │  3. Build App    │
         │                  │                  ├─────────────────→│
         │                  │                  │                  │  4. Deploy
```

**Deployment Features:**
- **Platform**: vercel
- **CI/CD**: none

- **Environment Management**: Separate dev/staging/prod configs

---

## Security Architecture

### Security Measures
- **Input Validation**: All user inputs validated
- **SQL Injection Prevention**: Parameterized queries only
- **XSS Protection**: Content sanitization
- **HTTPS**: All traffic encrypted in production
- **CORS**: Proper cross-origin resource sharing
- **Session Security**: Secure session management

### Environment Variables
```env
# Application
NODE_ENV=production
PORT=3000
APP_URL=https://example.com

# Database
DATABASE_URL=file:./prod.db

# Authentication
AUTH_SECRET=your-32-character-secret


```

---

## Performance Architecture

### Optimization Strategies
- **Bundle Splitting**: Code splitting for optimal loading
- **Caching**: Strategic caching at multiple levels
- **Database Indexing**: Optimized database queries
- **Image Optimization**: Compressed and optimized assets
- **CDN**: Static asset delivery optimization

### Performance Goals
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **API Response Time**: < 200ms (95th percentile)

---

## Monitoring and Observability

### Monitoring Stack
- **Error Tracking**: Console logging
- **Performance**: No analytics configured
- **Health Checks**: Application health endpoints
- **Logging**: Structured logging in production

### Key Metrics
- **Application Errors**: Error rate and error types
- **Performance**: Response times and throughput
- **User Experience**: Core Web Vitals
- **Business Metrics**: User engagement and conversions

---

## Development Workflow

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automated code formatting
- **Pre-commit Hooks**: Quality checks before commits

### Git Workflow
- **Branch Strategy**: Feature branches from main
- **Code Review**: All changes require review
- **Conventional Commits**: Structured commit messages
- **Automated Testing**: CI runs tests on all PRs

---

## Decision Records

### ADR-001: Database Choice - sqlite
**Decision**: Use sqlite as primary database
**Rationale**: Simple, reliable, and perfect for development and small-scale applications
**Alternatives Considered**: PostgreSQL, MySQL

### ADR-002: Authentication Strategy
**Decision**: Implement authentication with email
**Rationale**: User authentication required for personalized experience and data security

### ADR-003: Testing Approach
**Decision**: Comprehensive testing with  + unit tests
**Rationale**: Simple project scope allows for manual testing approach

---

*Last Updated: 1/11/2026 - Generated by create-karetech-stack v1.0*
