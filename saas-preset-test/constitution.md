# Constitution — saas-preset-test

> **Immutable principles and non-negotiable standards for saas-preset-test**
> This document establishes the foundational rules that guide all development decisions.

---

## Article I: Core Principles

### 1.1 Type Safety
- **100% TypeScript** — No JavaScript files in source code
- **Strict Mode** — TypeScript strict mode enabled always
- **No `any` Types** — Explicit typing required for all declarations
- **Type Guards** — Proper runtime type validation at boundaries

### 1.2 Code Quality
- **ESLint Compliance** — All code must pass linting
- **Prettier Formatting** — Consistent code formatting enforced
- **Test Coverage** — Minimum 80% test coverage
- **Documentation** — Public APIs must be documented

### 1.3 Performance
- **Bundle Size** — Monitor and optimize bundle sizes
- **Runtime Performance** — Profile critical user journeys
- **Database Efficiency** — Optimize queries and schema design
- **Accessibility** — WCAG 2.1 AA compliance minimum

---

## Article II: Technology Standards

### 2.1 Stack Compliance
- **Better-T-Stack Foundation** — Core stack decisions are immutable
- **Database:** Postgresql as primary data store
- **API Style:** orpc for type-safe client-server communication
- **UI Framework:** React with TanStack Router
- **Styling:** Tailwind CSS with shadcn/ui components

### 2.2 Authentication
- **Providers:** email, oauth only
- **Security:** Implement proper session management
- **Authorization:** Role-based access control where applicable

### 2.3 Testing Standards
- **E2E Testing:** playwright for end-to-end validation
- **Unit Testing:** Comprehensive unit test coverage
- **CI Integration:** All tests must pass before deployment

---

## Article III: Development Workflow

### 3.1 Git Standards
- **Conventional Commits** — Follow conventional commit message format
- **Branch Protection** — Main branch requires PR approval
- **Code Review** — All changes require peer review
- **Linear History** — Prefer rebasing over merge commits

### 3.2 CI/CD Requirements
- **Automated Testing** — All PRs trigger test suites
- **Type Checking** — TypeScript compilation must succeed
- **Linting** — ESLint errors block deployment
- **Security Scanning** — Automated dependency vulnerability checks

### 3.3 PBS Methodology
- **Plan-Build-Ship** — Follow PBS cycles for all features
- **Issue Tracking** — Use Beads for all work items
- **Documentation First** — Update docs before code changes
- **Constitutional Compliance** — All changes must align with constitution

---

## Article IV: Architecture Decisions

### 4.1 File Structure
- **Colocation** — Related files grouped by feature, not type
- **Index Exports** — Clean public APIs through index files
- **Absolute Imports** — Use path mapping for clean imports
- **Component Structure** — Single file per component with tests adjacent

### 4.2 State Management
- **Local State** — useState for component-specific state
- **Server State** — TanStack Query for server data caching
- **Global State** — Context API for truly global application state
- **URL State** — TanStack Router for navigation state

### 4.3 Error Handling
- **Error Boundaries** — React error boundaries for UI failures
- **API Errors** — Structured error responses from server
- **User Feedback** — Clear error messages for user-facing errors
- **Logging** — Structured logging with sentry

---

## Article V: Security Standards

### 5.1 Data Protection
- **Input Validation** — Validate all user inputs
- **SQL Injection** — Use parameterized queries only
- **XSS Prevention** — Escape all dynamic content
- **CSRF Protection** — Implement CSRF tokens for state changes

### 5.2 Authentication Security
- **Password Policy** — Strong password requirements
- **Session Security** — Secure session management
- **OAuth Security** — Proper OAuth flow implementation
- **Token Management** — Secure storage and rotation

### 5.3 Deployment Security
- **Environment Variables** — No secrets in source code
- **HTTPS Only** — All production traffic over HTTPS
- **Security Headers** — Implement security headers
- **Dependency Scanning** — Regular security audits

---

## Article VI: Performance Standards

### 6.1 Frontend Performance
- **Core Web Vitals** — Meet Google's Core Web Vitals thresholds
- **Bundle Size** — Optimize JavaScript bundle sizes
- **Image Optimization** — Compress and optimize all images
- **Caching Strategy** — Implement appropriate caching

### 6.2 Backend Performance
- **Response Time** — API responses under 200ms for 95th percentile
- **Database Performance** — Optimize queries and indexes
- **Connection Pooling** — Efficient database connections
- **Caching** — Implement application-level caching where beneficial

---

## Article VII: Monitoring and Observability

### 7.1 Application Monitoring
- **Error Tracking** — sentry integration for error monitoring
- **Performance Monitoring** — Track application performance metrics
- **User Analytics** — vercel for user behavior insights

### 7.2 Infrastructure Monitoring
- **Container Health** — Docker container health checks
- **Database Monitoring** — Track database performance and health
- **API Monitoring** — Monitor API endpoints and response times
- **Deployment Monitoring** — Track deployment success and rollback procedures

---

## Article VIII: Amendment Process

### 8.1 Constitutional Changes
- **Unanimous Consent** — All team members must agree to changes
- **Documentation** — All changes must be documented with reasoning
- **Version Control** — Constitution changes tracked in git history
- **Impact Assessment** — Evaluate impact of constitutional changes

### 8.2 Emergency Exceptions
- **Security Issues** — Temporary exceptions allowed for critical security fixes
- **Production Incidents** — Expedited process for production issues
- **Documentation Required** — All exceptions must be documented
- **Review Process** — Post-incident review of emergency changes

---

## Ratification

This constitution was established on 1/11/2026 for saas-preset-test.

**Ratified by:** kareemschultz
**Project:** saas-preset-test
**Stack:** Better-T-Stack Enhanced with KareTech
**Generated:** create-karetech-stack v1.0

---

*This constitution is immutable and serves as the foundation for all development decisions.*
*Any changes require unanimous team consent and proper documentation.*
