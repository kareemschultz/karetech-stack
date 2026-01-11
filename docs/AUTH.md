# 🔐 Authentication Guide

> **Complete authentication setup guide for KareTech Stack applications using Better Auth with email, OAuth providers, and security best practices.**

---

## 🚀 Quick Start

```bash
# Create project with email + GitHub authentication
bunx create-karetech-stack my-app --auth email,github

# Create project with multiple OAuth providers
bunx create-karetech-stack my-app --auth email,github,google,discord
```

---

## 🔑 Authentication Providers

### 📧 **Email Authentication**

**Perfect for:** All applications, primary authentication method

**Features:**
- Email/password login
- Email verification
- Password reset functionality
- Secure password hashing (Argon2)

**Generated Configuration:**
```typescript
// src/lib/auth.ts (auto-generated)
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

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
    sendResetPassword: async ({ user, url, token }) => {
      // Email service integration required
      await sendPasswordResetEmail(user.email, url)
    },
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationEmail(user.email, url)
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  }
})
```

---

### 🐙 **GitHub Authentication**

**Perfect for:** Developer tools, technical platforms, B2B applications

**Setup Instructions:**

1. **Create GitHub OAuth App:**
   ```bash
   # Go to: https://github.com/settings/applications/new
   
   Application name: Your App Name
   Homepage URL: https://yourdomain.com (or http://localhost:3000 for dev)
   Authorization callback URL: https://yourdomain.com/api/auth/callback/github
   ```

2. **Environment Configuration:**
   ```bash
   # .env.development
   GITHUB_CLIENT_ID=your-github-dev-client-id
   GITHUB_CLIENT_SECRET=your-github-dev-secret
   
   # .env.production
   GITHUB_CLIENT_ID=your-github-prod-client-id
   GITHUB_CLIENT_SECRET=your-github-prod-secret
   ```

3. **Generated Configuration:**
   ```typescript
   // src/lib/auth.ts
   export const auth = betterAuth({
     // ... other config
     socialProviders: {
       github: {
         clientId: process.env.GITHUB_CLIENT_ID!,
         clientSecret: process.env.GITHUB_CLIENT_SECRET!,
       },
     },
   })
   ```

---

### 🌐 **Google Authentication**

**Perfect for:** Consumer applications, broad user appeal

**Setup Instructions:**

1. **Create Google OAuth App:**
   ```bash
   # Go to: https://console.cloud.google.com/apis/credentials
   
   1. Create new project or select existing
   2. Enable Google+ API
   3. Create OAuth 2.0 Client ID
   4. Add authorized domains and redirect URIs
   ```

2. **Environment Configuration:**
   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Generated Configuration:**
   ```typescript
   socialProviders: {
     google: {
       clientId: process.env.GOOGLE_CLIENT_ID!,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
     },
   }
   ```

---

### 🎮 **Discord Authentication**

**Perfect for:** Gaming platforms, community applications

**Setup Instructions:**

1. **Create Discord Application:**
   ```bash
   # Go to: https://discord.com/developers/applications
   
   1. Create New Application
   2. Go to OAuth2 settings
   3. Add redirect URLs: https://yourdomain.com/api/auth/callback/discord
   ```

2. **Environment Configuration:**
   ```bash
   DISCORD_CLIENT_ID=your-discord-client-id
   DISCORD_CLIENT_SECRET=your-discord-client-secret
   ```

---

### 🏢 **Microsoft Authentication**

**Perfect for:** Enterprise applications, B2B platforms

**Setup Instructions:**

1. **Create Azure AD App:**
   ```bash
   # Go to: https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps
   
   1. Register new application
   2. Configure redirect URIs
   3. Generate client secret
   ```

2. **Environment Configuration:**
   ```bash
   MICROSOFT_CLIENT_ID=your-microsoft-client-id
   MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
   ```

---

## 🎨 Authentication Components

### Login Form

```typescript
// src/components/auth/login-form.tsx (auto-generated)
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await signIn.email({ email, password })
      // Redirect handled by auth system
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn.social({ provider })
    } catch (error) {
      console.error(`${provider} login failed:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Mail className="mr-2 h-4 w-4" />
            {isLoading ? "Signing in..." : "Sign in with Email"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("github")}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          
          {/* Additional providers based on configuration */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading}
          >
            Continue with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Registration Form

```typescript
// src/components/auth/register-form.tsx (auto-generated)
export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      toast.success("Account created! Check your email for verification.")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### User Menu

```typescript
// src/components/auth/user-menu.tsx (auto-generated)
export function UserMenu() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Button asChild variant="ghost">
        <Link href="/login">Sign In</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
            <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## 🔒 Security Features

### Password Security

```typescript
// src/lib/password-validation.ts (auto-generated)
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  // Check against common passwords
  const commonPasswords = [
    "password", "123456", "password123", "admin", "qwerty"
  ]
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push("Password is too common. Please choose a stronger password")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
```

### Rate Limiting

```typescript
// src/lib/rate-limit.ts (auto-generated)
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Create rate limiters for different endpoints
export const authRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 attempts per 15 minutes
  analytics: true,
})

export const passwordResetRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 attempts per hour
})

// Usage in API routes
export async function checkRateLimit(identifier: string, limiter: Ratelimit) {
  const { success, limit, reset, remaining } = await limiter.limit(identifier)
  
  if (!success) {
    throw new Error(`Rate limit exceeded. Try again in ${Math.round((reset - Date.now()) / 1000)} seconds`)
  }
  
  return { success, limit, reset, remaining }
}
```

### CSRF Protection

```typescript
// src/lib/csrf.ts (auto-generated)
import { csrf } from "@/lib/security"

// CSRF tokens automatically handled by Better Auth
export const csrfProtection = csrf({
  secret: process.env.BETTER_AUTH_SECRET!,
  cookieName: "__Host-authjs.csrf-token",
  secureCookie: process.env.NODE_ENV === "production",
})
```

---

## 📧 Email Integration

### Resend Configuration

```typescript
// src/lib/email.ts (auto-generated for email auth)
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendVerificationEmail(email: string, verificationUrl: string) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h1 style="color: #333;">Verify your email address</h1>
        <p>Click the link below to verify your email address and activate your account:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Verify Email Address
        </a>
        <p style="color: #666; font-size: 14px;">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h1 style="color: #333;">Reset your password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    `,
  })
}
```

### Email Templates

```typescript
// src/components/email/verification-email.tsx
export function VerificationEmailTemplate({ verificationUrl }: { verificationUrl: string }) {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Welcome!</h1>
      <p>Thank you for signing up. Please verify your email address to get started:</p>
      <a
        href={verificationUrl}
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          margin: '16px 0'
        }}
      >
        Verify Email Address
      </a>
    </div>
  )
}
```

---

## 🛡️ Route Protection

### Auth Middleware

```typescript
// src/lib/auth-middleware.ts (auto-generated)
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function authMiddleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
                    request.nextUrl.pathname.startsWith('/register')

  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard') ||
                         request.nextUrl.pathname.startsWith('/profile') ||
                         request.nextUrl.pathname.startsWith('/settings')

  // Redirect to dashboard if logged in and trying to access auth pages
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect to login if not logged in and trying to access protected pages
  if (!session && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

### Protected Route Component

```typescript
// src/components/auth/protected-route.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-4">You need to sign in to access this page.</p>
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
```

### Role-Based Access Control

```typescript
// src/lib/permissions.ts (advanced setup)
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator"
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    [UserRole.ADMIN]: 3,
    [UserRole.MODERATOR]: 2,
    [UserRole.USER]: 1,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

// Usage in components
export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  
  if (!session || !hasPermission(session.user.role as UserRole, UserRole.ADMIN)) {
    return <div>Access denied</div>
  }
  
  return <>{children}</>
}
```

---

## 🔧 Client-Side Hooks

### Session Management

```typescript
// src/hooks/use-auth.ts (auto-generated)
import { useSession } from "@/lib/auth-client"

export function useAuth() {
  const { data: session, isPending } = useSession()

  return {
    user: session?.user,
    session,
    isLoading: isPending,
    isAuthenticated: !!session,
    isAdmin: session?.user.role === "admin",
  }
}
```

### Form Validation Hook

```typescript
// src/hooks/use-auth-form.ts
export function useAuthForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    if (!email) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address"
    return null
  }

  const validatePassword = (password: string) => {
    const validation = validatePassword(password)
    return validation.isValid ? null : validation.errors[0]
  }

  const handleSubmit = async (
    formData: any,
    onSubmit: (data: any) => Promise<void>
  ) => {
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      const newErrors: Record<string, string> = {}
      
      if (formData.email) {
        const emailError = validateEmail(formData.email)
        if (emailError) newErrors.email = emailError
      }

      if (formData.password) {
        const passwordError = validatePassword(formData.password)
        if (passwordError) newErrors.password = passwordError
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      await onSubmit(formData)
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "An error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    errors,
    isSubmitting,
    handleSubmit,
    setErrors,
  }
}
```

---

## 📊 Session Management

### Session Configuration

```typescript
// src/lib/auth.ts (session settings)
export const auth = betterAuth({
  // ... other config
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // Cache for 5 minutes
    },
  },

  user: {
    additionalFields: {
      emailVerified: "email_verified",
      image: "image",
      role: "role",
    },
  },

  advanced: {
    generateId: () => crypto.randomUUID(),
    cookiePrefix: "auth",
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: ".yourdomain.com",
    },
  },
})
```

### Session Persistence

```typescript
// src/components/auth/session-provider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/lib/auth-client"

interface SessionContextType {
  session: any | null
  isLoading: boolean
  refreshSession: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = async () => {
    try {
      const currentSession = await auth.getSession()
      setSession(currentSession)
    } catch (error) {
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshSession()

    // Listen for session changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "session") {
        refreshSession()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <SessionContext.Provider value={{ session, isLoading, refreshSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
```

---

## 🔒 Production Security Checklist

### Environment Security
- [ ] ✅ `BETTER_AUTH_SECRET` is 32+ characters
- [ ] 🔐 OAuth credentials are production apps
- [ ] 🌐 Callback URLs match production domains
- [ ] 📧 Email service configured with production API keys
- [ ] 🔄 Rate limiting enabled
- [ ] 🛡️ CSRF protection active

### Application Security
- [ ] 🔒 Password validation enforced
- [ ] 📧 Email verification required
- [ ] ⏰ Session timeouts configured
- [ ] 🚫 Brute force protection enabled
- [ ] 📊 Security headers configured
- [ ] 🔍 Audit logging implemented

### OAuth Configuration
- [ ] 🐙 GitHub OAuth app configured for production
- [ ] 🌐 Google OAuth configured with correct domains
- [ ] 🎮 Discord OAuth scopes minimal
- [ ] 🏢 Microsoft OAuth tenant configured
- [ ] 🔄 Refresh tokens handled securely
- [ ] 🔒 Client secrets stored securely

---

## 🚨 Troubleshooting

### Common Issues

**OAuth Redirect Mismatch:**
```bash
# Error: redirect_uri_mismatch
# Fix: Check OAuth app settings
Development: http://localhost:3000/api/auth/callback/github
Production: https://yourdomain.com/api/auth/callback/github
```

**Email Verification Not Working:**
```bash
# Check email service configuration
echo $RESEND_API_KEY

# Verify email templates are loading
# Check development console for email URLs
```

**Session Not Persisting:**
```typescript
// Check cookie settings
// Ensure HTTPS in production
// Verify domain settings in auth config
```

**Rate Limit Issues:**
```typescript
// Check Redis connection
// Verify rate limit configuration
// Monitor rate limit headers in network tab
```

---

**Secure your app with confidence!** 🔐

---

*Need help? Check out our [Database Guide](DATABASE.md) or [Configuration Guide](CONFIG.md)*