# 🎯 Preset Guide

> **Comprehensive guide to KareTech Stack presets - choose the perfect starting point for your project.**

---

## 🚀 Quick Start

```bash
# Use a preset during project creation
bunx create-karetech-stack my-app --preset saas

# Available presets: saas, ecommerce, blog, devtool, portfolio, minimal
```

---

## 📋 Available Presets

### 🏢 **SaaS Preset** (`--preset saas`)

**Perfect for:** Software-as-a-Service applications, B2B platforms, enterprise dashboards

**What's Included:**
- 🗄️ **Database:** PostgreSQL with Drizzle ORM
- 🔐 **Authentication:** Email + GitHub OAuth
- 🎨 **Theme:** Mira style with Zinc/Blue color scheme
- 🧪 **Testing:** Playwright E2E + Vitest unit tests
- 🐳 **DevOps:** Full Docker setup + GitHub Actions CI/CD
- 🤖 **AI Ready:** Complete PBS system + Claude Code hooks

```bash
# Create a SaaS application
bunx create-karetech-stack my-saas --preset saas
```

**Generated Features:**
- User authentication & management
- Subscription-ready billing structure
- Admin dashboard components
- API rate limiting setup
- Error tracking integration
- Analytics setup (Vercel Analytics)

---

### 🛍️ **E-commerce Preset** (`--preset ecommerce`)

**Perfect for:** Online stores, marketplace platforms, retail applications

**What's Included:**
- 🗄️ **Database:** PostgreSQL with product/order schemas
- 🔐 **Authentication:** Email + Google + Stripe Customer Portal
- 🎨 **Theme:** Nova style with Slate/Green colors
- 🧪 **Testing:** Full test suite (Playwright + Puppeteer + Vitest)
- 🐳 **DevOps:** Production-optimized Docker + CI/CD
- 💳 **Payments:** Stripe integration ready

```bash
# Create an e-commerce platform
bunx create-karetech-stack my-store --preset ecommerce
```

**Generated Features:**
- Product catalog management
- Shopping cart & checkout flow
- Payment processing setup
- Order management system
- Inventory tracking structure
- Customer account pages

---

### 📝 **Blog Preset** (`--preset blog`)

**Perfect for:** Content platforms, documentation sites, personal blogs

**What's Included:**
- 🗄️ **Database:** Turso (serverless SQLite)
- 🔐 **Authentication:** Email + GitHub (for authors)
- 🎨 **Theme:** Lyra style with Stone/Orange colors
- 🧪 **Testing:** Playwright E2E tests
- 📦 **Deployment:** Vercel-optimized
- ✍️ **Content:** MDX blog setup

```bash
# Create a blog platform
bunx create-karetech-stack my-blog --preset blog
```

**Generated Features:**
- MDX content management
- Author profiles & permissions
- Comment system structure
- SEO optimization setup
- RSS feed generation
- Category & tag system

---

### 🛠️ **DevTool Preset** (`--preset devtool`)

**Perfect for:** Developer tools, CLI applications, code utilities

**What's Included:**
- 🗄️ **Database:** SQLite (lightweight)
- 🔐 **Authentication:** GitHub OAuth only
- 🎨 **Theme:** Mira style with Zinc/Green colors
- 🧪 **Testing:** Vitest focus (unit/integration)
- 🤖 **Enhanced:** Extra PBS documentation templates
- 📊 **Analytics:** GitHub-focused metrics

```bash
# Create a developer tool
bunx create-karetech-stack my-devtool --preset devtool
```

**Generated Features:**
- GitHub integration components
- Code syntax highlighting
- API documentation templates
- Developer authentication flows
- Command palette components
- Performance monitoring setup

---

### 🎨 **Portfolio Preset** (`--preset portfolio`)

**Perfect for:** Personal websites, creative portfolios, landing pages

**What's Included:**
- 🗄️ **Database:** None (static-focused)
- 🔐 **Authentication:** Optional contact forms only
- 🎨 **Theme:** Vega style with Neutral/Violet colors
- 🧪 **Testing:** Minimal (focus on design)
- 📦 **Deployment:** Vercel static deployment
- 🖼️ **Content:** Image optimization setup

```bash
# Create a portfolio site
bunx create-karetech-stack my-portfolio --preset portfolio
```

**Generated Features:**
- Project showcase components
- Contact form setup
- Image gallery components
- Social media links
- SEO optimization
- Performance optimized

---

### ⚡ **Minimal Preset** (`--preset minimal`)

**Perfect for:** Learning, prototyping, custom implementations

**What's Included:**
- 🗄️ **Database:** SQLite (optional)
- 🔐 **Authentication:** Basic email only
- 🎨 **Theme:** Default shadcn/ui
- 🧪 **Testing:** None (add your own)
- 🐳 **DevOps:** Basic Docker only
- 🤖 **AI:** Minimal PBS setup

```bash
# Create a minimal starter
bunx create-karetech-stack my-app --preset minimal
```

**Generated Features:**
- Core Better-T-Stack foundation
- Basic component structure
- Simple routing setup
- Clean starting point

---

## 🔧 Customizing Presets

### Override Preset Options

You can customize any preset with additional CLI options:

```bash
# Use SaaS preset but change theme and database
bunx create-karetech-stack my-app \
  --preset saas \
  --theme nova \
  --database turso \
  --auth email,discord

# Use blog preset but add Docker
bunx create-karetech-stack my-blog \
  --preset blog \
  --docker \
  --testing playwright,vitest
```

### Available Override Options

| Option | Values | Description |
|--------|--------|-------------|
| `--theme` | `vega`, `nova`, `maia`, `lyra`, `default` | Visual style |
| `--database` | `postgresql`, `turso`, `sqlite`, `none` | Database type |
| `--auth` | `email`, `github`, `google`, `discord`, `microsoft` | Auth providers |
| `--testing` | `playwright`, `puppeteer`, `vitest` | Test frameworks |
| `--deploy` | `vercel`, `netlify`, `railway` | Deployment target |

---

## 📊 Preset Comparison

| Feature | Minimal | Portfolio | DevTool | Blog | E-commerce | SaaS |
|---------|---------|-----------|---------|------|------------|------|
| **Setup Time** | 1 min | 1.5 min | 2 min | 2 min | 3 min | 3 min |
| **Database** | SQLite | None | SQLite | Turso | PostgreSQL | PostgreSQL |
| **Authentication** | Basic | Contact | GitHub | Email+GitHub | Email+Google | Email+GitHub |
| **Testing** | None | None | Vitest | Playwright | Full Suite | Playwright+Vitest |
| **Docker** | Basic | None | None | None | Production | Production |
| **CI/CD** | None | None | None | Vercel | GitHub Actions | GitHub Actions |
| **Best For** | Learning | Showcasing | Building Tools | Publishing | Selling | Subscriptions |

---

## 🎯 Choosing the Right Preset

### 💼 **Business Applications**
- **SaaS:** Subscription software, B2B platforms, enterprise tools
- **E-commerce:** Online stores, marketplaces, retail platforms

### 📝 **Content & Publishing**
- **Blog:** Content sites, documentation, news platforms
- **Portfolio:** Personal sites, creative showcases, landing pages

### 🛠️ **Development Tools**
- **DevTool:** CLI tools, developer utilities, code platforms
- **Minimal:** Learning projects, custom implementations

---

## 🚀 Next Steps

After choosing your preset:

1. **📖 Read the generated README** - Specific setup instructions
2. **🔧 Configure environment** - Set up environment variables
3. **🗄️ Setup database** - Initialize your chosen database
4. **🔐 Configure auth** - Set up authentication providers
5. **🎨 Customize theme** - Adjust colors, fonts, and styling
6. **🧪 Run tests** - Verify everything works
7. **🚀 Deploy** - Ship to production

**Happy coding!** 🎉

---

*Need help? Check out our [Configuration Guide](CONFIG.md) or [Architecture Overview](ARCHITECTURE.md)*