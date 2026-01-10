# 🚀 Quick Start Guide

<div align="center">

![KareTech Stack](https://img.shields.io/badge/🔧_KareTech-Stack-4F46E5?style=for-the-badge&labelColor=1e293b&color=4F46E5)

**Get up and running with KareTech Stack in 5 minutes**

[![NPM Version](https://img.shields.io/npm/v/create-karetech-stack?style=flat-square&color=4F46E5&logo=npm)](https://npmjs.com/package/create-karetech-stack)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kareemschultz/karetech-stack/ci.yml?style=flat-square&logo=github)](https://github.com/kareemschultz/karetech-stack/actions)

</div>

---

## ⚡ **30-Second Start**

```bash
# 🚀 Create your app
bunx create-karetech-stack my-awesome-app

# 📁 Navigate to project
cd my-awesome-app

# 🔥 Start developing
bun dev
```

**🎉 That's it!** Your app is now running on [localhost:3000](http://localhost:3000)

---

## 🎯 **Choose Your Path**

<table>
<tr>
<td width="33%" align="center">

**🎨 Interactive Wizard**
<br>
![Wizard](https://img.shields.io/badge/⭐-Recommended-10B981?style=for-the-badge)
<br>
<small>Perfect for first-time users</small>

```bash
bunx create-karetech-stack my-app
```

</td>
<td width="33%" align="center">

**⚡ Quick Preset**
<br>
![Speed](https://img.shields.io/badge/🚀-Fastest-4F46E5?style=for-the-badge)
<br>
<small>Skip questions, start coding</small>

```bash
bunx create-karetech-stack my-app \
  --preset saas
```

</td>
<td width="33%" align="center">

**🛠️ Custom Build**
<br>
![Custom](https://img.shields.io/badge/⚙️-Advanced-F59E0B?style=for-the-badge)
<br>
<small>Full control over setup</small>

```bash
bunx create-karetech-stack my-app \
  --theme maia --color blue
```

</td>
</tr>
</table>

---

## 📋 **Step-by-Step Walkthrough**

### 1. **Create Your Project**

```bash
# 🎨 Start the wizard
bunx create-karetech-stack my-first-app
```

You'll see an interactive wizard like this:

```
┌   create-karetech-stack
│
◆  What's your project name?
│  my-first-app
│
◆  What are you building?
│  ● SaaS application (recommended)
│  ○ E-commerce store
│  ○ Blog/Publishing platform
│  ○ Developer tool
│  ○ Portfolio website
│  ○ Something else (custom)
│
◆  Choose your theme style:
│  ● Maia (soft, rounded, professional)
│  ○ Nova (bold, sharp, modern)
│  ○ Lyra (elegant, serif, publishing)
│  ○ Vega (creative, unique, portfolio)
│  ○ Default (clean, minimal)
│
◆  Pick your colors:
│  ● Blue (trust, reliability)
│  ○ Green (growth, nature)
│  ○ Purple (creative, tech)
│  ○ Orange (energy, creativity)
│  ○ Custom...
│
└  ✨ Generating your project...
```

### 2. **Navigate and Install**

```bash
# 📁 Enter your project directory
cd my-first-app

# 📦 Install dependencies (if not done automatically)
bun install

# ✅ Verify installation
ls -la
```

You'll see a structure like:

```
📦 my-first-app/
├── 🎨 src/
│   ├── 🧭 routes/           # Your app pages
│   ├── 🎛️ components/      # Reusable UI components
│   ├── 🎨 styles/          # CSS and themes
│   └── 🔧 lib/             # Utilities
├── 🧪 tests/               # Test files
├── 🐳 Dockerfile           # Production container
├── 📋 CLAUDE.md            # AI workflow entry point
└── 📖 README.md            # Project documentation
```

### 3. **Start Development**

```bash
# 🔥 Start the development server
bun dev
```

You'll see output like:

```
$ vite

  VITE v5.4.21  ready in 420ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
  ➜  press h to show help
```

### 4. **Open in Browser**

Open [http://localhost:3000](http://localhost:3000) to see:

```
🎉 Welcome to my-first-app!

🚀 Getting Started
✅ Framework: React + TypeScript + Vite
✅ Routing: TanStack Router
✅ Styling: Tailwind CSS + shadcn/ui (maia)
✅ State: TanStack Query
✅ Database: PostgreSQL + Drizzle ORM
✅ Auth: Better Auth with email, oauth
✅ Testing: Playwright + Vitest
✅ API: oRPC (type-safe API calls)
✅ Docker: Production-ready containerization
✅ AI Workflow: PBS (Plan-Build-Ship) system

🔌 API Connection Test
✅ API Response: {"message": "Hello World!"}
```

---

## 🎨 **Explore Your Theme**

Your chosen theme is fully applied! Let's see what you get:

### Maia Theme (Example)

<table>
<tr>
<td width="50%">

**🎨 Visual Style**
- Soft, rounded corners
- Professional blue accents
- Zinc-based neutral colors
- Figtree typography
- Subtle shadows and borders

</td>
<td width="50%">

**🧩 Components Ready**
- Buttons with hover effects
- Form inputs with validation
- Cards with soft shadows
- Navigation with smooth transitions
- Loading states and animations

</td>
</tr>
</table>

### Test Your Theme

Try these components in your app:

```tsx
// Add to src/routes/index.tsx
<div className="space-y-4 max-w-md mx-auto mt-8">
  <button className="btn-primary">
    Primary Button
  </button>

  <button className="btn-secondary">
    Secondary Button
  </button>

  <div className="card p-6">
    <h3 className="text-lg font-semibold mb-2">Card Component</h3>
    <p className="text-muted-foreground">
      This card uses your theme's styling automatically.
    </p>
  </div>
</div>
```

---

## 🧪 **Test Your Setup**

### Run the Built-in Tests

```bash
# 🧪 Run unit tests
bun test:unit

# 🎭 Run E2E tests
bun test:e2e

# 📊 Check test coverage
bun test:coverage
```

### Verify Production Build

```bash
# 🏗️ Build for production
bun run build

# ✅ Should output
# dist/
# ├── index.html
# ├── assets/
# └── ...

# 🚀 Test production build
bun run preview
# Serves on http://localhost:4173
```

---

## 🔧 **Make Your First Changes**

### 1. **Update the Homepage**

Edit `src/routes/index.tsx`:

```tsx
function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gradient-primary">
            Welcome to My Amazing App! 🚀
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with KareTech Stack - the fastest way to create
            production-ready TypeScript applications.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="btn-primary">
              Get Started
            </button>
            <button className="btn-outline">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 2. **Add a New Page**

Create `src/routes/about.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="card max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-muted-foreground">
          This is your new about page! The routing is automatically
          handled by TanStack Router.
        </p>
      </div>
    </div>
  )
}
```

### 3. **Add a Component**

Create `src/components/hero-section.tsx`:

```tsx
interface HeroSectionProps {
  title: string
  subtitle: string
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6 text-gradient-primary">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
```

---

## 🚀 **Deploy Your App**

### Vercel (Recommended)

```bash
# 📦 Install Vercel CLI
npm i -g vercel

# 🚀 Deploy
vercel

# Follow the prompts:
# ? Set up and deploy? Yes
# ? Which scope? Your username
# ? Link to existing project? No
# ? What's your project's name? my-first-app
# ? In which directory is your code located? ./
```

### Netlify

```bash
# 📦 Install Netlify CLI
npm install -g netlify-cli

# 🏗️ Build your app
bun run build

# 🚀 Deploy
netlify deploy --prod --dir=dist
```

### Docker

```bash
# 🐳 Build production image
docker build -t my-first-app .

# 🚀 Run locally
docker run -p 3000:3000 my-first-app

# 📊 Check image size (should be ~180MB)
docker images my-first-app
```

---

## 🎯 **Common Next Steps**

<table>
<tr>
<td width="50%">

**🗄️ Database Setup**
1. Set up your database schema in `src/db/schema.ts`
2. Configure your database connection
3. Run migrations with `bun run db:migrate`

**🔐 Authentication**
1. Configure auth providers in `src/auth/config.ts`
2. Add login/signup forms
3. Protect routes with auth middleware

</td>
<td width="50%">

**🧪 Testing**
1. Write your first test in `tests/`
2. Set up component testing
3. Add E2E test scenarios

**🎨 Customization**
1. Modify your theme in `src/styles/`
2. Add new components to `src/components/`
3. Configure your build in `vite.config.ts`

</td>
</tr>
</table>

---

## 📚 **Learn More**

<table>
<tr>
<td width="25%" align="center">

**📖 Documentation**
<br>
[![Docs](https://img.shields.io/badge/📖-Read_Docs-4F46E5?style=for-the-badge)](../README.md)
<br>
<small>Complete guides and references</small>

</td>
<td width="25%" align="center">

**🎨 Themes**
<br>
[![Themes](https://img.shields.io/badge/🎨-Theme_Guide-10B981?style=for-the-badge)](THEMES.md)
<br>
<small>Customize your visual style</small>

</td>
<td width="25%" align="center">

**🧪 Testing**
<br>
[![Testing](https://img.shields.io/badge/🧪-Test_Guide-F59E0B?style=for-the-badge)](TESTING.md)
<br>
<small>Write robust test suites</small>

</td>
<td width="25%" align="center">

**🚀 Deploy**
<br>
[![Deploy](https://img.shields.io/badge/🚀-Deploy_Guide-8B5CF6?style=for-the-badge)](DEPLOYMENT.md)
<br>
<small>Go to production</small>

</td>
</tr>
</table>

---

## 💬 **Get Help**

<table>
<tr>
<td width="33%" align="center">

**💬 Discord Community**
<br>
[![Discord](https://img.shields.io/badge/Join-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/karetech)
<br>
<small>Chat with developers, get instant help</small>

</td>
<td width="33%" align="center">

**📖 Documentation**
<br>
[![Docs](https://img.shields.io/badge/Browse-Docs-4F46E5?style=for-the-badge&logo=gitbook&logoColor=white)](https://github.com/kareemschultz/karetech-stack)
<br>
<small>Comprehensive guides and examples</small>

</td>
<td width="33%" align="center">

**🐛 Report Issues**
<br>
[![Issues](https://img.shields.io/badge/Report-Issue-red?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kareemschultz/karetech-stack/issues)
<br>
<small>Found a bug? Let us know!</small>

</td>
</tr>
</table>

---

## ✅ **Quick Checklist**

After following this guide, you should have:

- [ ] ✅ **Project Created** - KareTech Stack app generated
- [ ] ✅ **Dependencies Installed** - All packages installed successfully
- [ ] ✅ **Development Server Running** - App accessible at localhost:3000
- [ ] ✅ **Theme Applied** - Visual styling looks great
- [ ] ✅ **Tests Passing** - Both unit and E2E tests working
- [ ] ✅ **Build Working** - Production build completes successfully
- [ ] ✅ **First Changes Made** - You've customized something
- [ ] ✅ **Ready to Deploy** - App is production-ready

---

<div align="center">

**🎉 Congratulations!**

You've successfully set up your KareTech Stack application.
Now go build something amazing! 🚀

[![Start Building](https://img.shields.io/badge/🚀-Start_Building-4F46E5?style=for-the-badge)](../README.md)
[![Join Community](https://img.shields.io/badge/💬-Join_Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/karetech)

</div>