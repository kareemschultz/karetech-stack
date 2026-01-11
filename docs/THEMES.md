# 🎨 Theme System Guide

> **Complete guide to the KareTech Stack theming system - create beautiful, consistent designs with shadcn/ui variants.**

---

## 🚀 Quick Start

```bash
# Choose theme during project creation
bunx create-karetech-stack my-app --theme nova --color green

# Available themes: vega, nova, maia, lyra, default
# Available colors: blue, green, orange, purple, red, yellow, zinc
```

---

## 🎨 Available Themes

### 🌟 **Vega** - Modern Minimalist
**Perfect for:** SaaS dashboards, professional applications, enterprise tools

**Characteristics:**
- Clean, spacious layouts
- Subtle shadows and borders
- Professional color palette
- Excellent readability

```bash
# Use Vega theme
bunx create-karetech-stack my-app --theme vega
```

**Visual Style:**
- **Border Radius:** Subtle (4px)
- **Shadows:** Soft, elevated
- **Typography:** Clean, modern
- **Spacing:** Generous whitespace
- **Best With:** Blue, Zinc, Slate colors

---

### ✨ **Nova** - Bold & Vibrant
**Perfect for:** E-commerce, creative platforms, marketing sites

**Characteristics:**
- Strong visual hierarchy
- Bold color usage
- Dynamic gradients
- Eye-catching elements

```bash
# Use Nova theme
bunx create-karetech-stack my-app --theme nova --color green
```

**Visual Style:**
- **Border Radius:** Rounded (8px)
- **Shadows:** Strong, dramatic
- **Typography:** Bold, impactful
- **Spacing:** Tight, content-dense
- **Best With:** Green, Purple, Orange colors

---

### 🔮 **Maia** - Elegant Professional
**Perfect for:** Corporate sites, portfolios, consulting firms

**Characteristics:**
- Sophisticated aesthetics
- Balanced proportions
- Premium feel
- Classic design principles

```bash
# Use Maia theme
bunx create-karetech-stack my-app --theme maia --color zinc
```

**Visual Style:**
- **Border Radius:** Balanced (6px)
- **Shadows:** Refined, subtle
- **Typography:** Elegant, readable
- **Spacing:** Harmonious rhythm
- **Best With:** Zinc, Blue, Neutral colors

---

### 🎼 **Lyra** - Creative Expression
**Perfect for:** Blogs, content sites, creative portfolios

**Characteristics:**
- Artistic flair
- Unique layouts
- Expressive typography
- Creative color usage

```bash
# Use Lyra theme
bunx create-karetech-stack my-app --theme lyra --color orange
```

**Visual Style:**
- **Border Radius:** Varied (2-12px)
- **Shadows:** Artistic, layered
- **Typography:** Expressive, varied
- **Spacing:** Dynamic, organic
- **Best With:** Orange, Purple, Red colors

---

### 🎯 **Default** - Classic shadcn/ui
**Perfect for:** Rapid prototyping, learning, standard applications

**Characteristics:**
- Standard shadcn/ui styling
- Proven design patterns
- Familiar interactions
- Developer-friendly

```bash
# Use Default theme (no --theme flag needed)
bunx create-karetech-stack my-app
```

---

## 🌈 Color Palettes

### Primary Colors

| Color | Theme Compatibility | Use Cases |
|-------|-------------------|-----------|
| **Blue** 🔵 | Vega, Maia, Default | Trust, professionalism, SaaS |
| **Green** 🟢 | Nova, All themes | Growth, e-commerce, success |
| **Orange** 🟠 | Lyra, Nova | Energy, creativity, blogs |
| **Purple** 🟣 | Nova, Lyra | Innovation, creative platforms |
| **Red** 🔴 | Lyra, Nova | Urgency, alerts, bold statements |
| **Yellow** 🟡 | Lyra | Optimism, attention, warnings |
| **Zinc** ⚫ | Vega, Maia | Neutral, professional, minimal |

### Color Customization

```typescript
// tailwind.config.js (auto-generated based on theme selection)
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // ... additional color definitions
      }
    }
  }
}
```

---

## 🔧 Theme Configuration

### CSS Variables (Auto-Generated)

Each theme generates a unique `globals.css` with CSS custom properties:

```css
/* Example: Nova theme with Green accent */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 142.1 76.2% 36.3%;        /* Green accent */
  --primary-foreground: 355.7 100% 97.3%;
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
  --ring: 142.1 76.2% 36.3%;           /* Matches primary */
  --radius: 0.75rem;                    /* Nova style: 12px */
}

.dark {
  /* Dark mode variants */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode color definitions */
}
```

### Component Theming

**Automatic Component Styling:**

```typescript
// src/components/ui/button.tsx (auto-generated with theme)
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

---

## 🎭 Dark Mode

### Automatic Dark Mode Support

Every theme includes comprehensive dark mode support:

```typescript
// src/components/theme-provider.tsx (auto-generated)
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

const ThemeProviderContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
```

### Dark Mode Toggle Component

```typescript
// src/components/theme-toggle.tsx (auto-generated)
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

---

## 🎨 Typography System

### Font Options

| Font | Style | Best With | Use Cases |
|------|-------|-----------|-----------|
| **Figtree** | Modern, friendly | Vega, Nova | SaaS, tech products |
| **Inter** | Professional | Maia, Default | Corporate, enterprise |
| **Manrope** | Rounded, approachable | Nova, Lyra | Creative, lifestyle |
| **Geist** | Technical, clean | Vega, Default | Developer tools, tech |

### Typography Configuration

```css
/* Example: Figtree font configuration */
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --font-sans: 'Figtree', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.font-sans {
  font-family: var(--font-sans);
}
```

**Generated Typography Classes:**
```typescript
// Automatic responsive typography scale
const typography = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground"
}
```

---

## 🎯 Icon Libraries

### Available Icon Sets

| Library | Count | Style | Best With |
|---------|-------|-------|-----------|
| **Huge Icons** | 3,000+ | Consistent, modern | Nova, Vega |
| **Lucide** | 1,000+ | Simple, elegant | Maia, Default |
| **Heroicons** | 400+ | Tailwind-native | All themes |
| **Tabler** | 4,000+ | Stroke-based | Lyra, artistic |

### Icon Usage Example

```typescript
// Auto-generated icon imports based on selection
import { 
  ArrowRight, 
  Check, 
  X, 
  Github,
  Mail
} from "lucide-react"  // or chosen icon library

// Consistent icon sizing
const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5", 
  lg: "h-6 w-6",
  xl: "h-8 w-8"
}
```

---

## 🎛️ Advanced Customization

### Custom Theme Creation

**1. Create Custom CSS Variables:**

```css
/* src/styles/custom-theme.css */
:root {
  /* Define your custom colors */
  --custom-primary: 280 100% 65%;
  --custom-secondary: 280 50% 90%;
  
  /* Override default variables */
  --primary: var(--custom-primary);
  --secondary: var(--custom-secondary);
}
```

**2. Extend Tailwind Configuration:**

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-brand': 'hsl(var(--custom-primary))',
      },
      animation: {
        'custom-bounce': 'bounce 2s infinite',
      }
    }
  }
}
```

**3. Create Custom Components:**

```typescript
// src/components/ui/custom-card.tsx
export function CustomCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-custom-brand/20 bg-gradient-to-br from-custom-brand/5 to-secondary p-6 shadow-lg">
      {children}
    </div>
  )
}
```

### Theme Switching at Runtime

```typescript
// src/hooks/use-theme-switcher.ts
export function useThemeSwitcher() {
  const switchTheme = (newTheme: string) => {
    document.documentElement.className = `theme-${newTheme}`
    localStorage.setItem('selected-theme', newTheme)
  }

  const getAvailableThemes = () => [
    'vega', 'nova', 'maia', 'lyra', 'default'
  ]

  return { switchTheme, getAvailableThemes }
}
```

---

## 📱 Responsive Design

### Breakpoint System

```typescript
// Auto-generated responsive utilities
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Laptop  
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
}
```

### Mobile-First Components

```typescript
// Example responsive component (auto-generated)
export function ResponsiveCard() {
  return (
    <div className="
      p-4 sm:p-6 md:p-8 
      text-sm sm:text-base md:text-lg
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
      gap-4 md:gap-6 lg:gap-8
    ">
      {/* Mobile-first responsive design */}
    </div>
  )
}
```

---

## 🔍 Theme Debugging

### Development Tools

```typescript
// src/components/theme-debugger.tsx (development only)
export function ThemeDebugger() {
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-4">
      <h3 className="font-semibold mb-2">Theme Debug</h3>
      <div className="space-y-1 text-xs">
        <div>Primary: <span style={{color: 'hsl(var(--primary))'}>●</span></div>
        <div>Secondary: <span style={{color: 'hsl(var(--secondary))'}>●</span></div>
        <div>Accent: <span style={{color: 'hsl(var(--accent))'}>●</span></div>
      </div>
    </div>
  )
}
```

### Color Contrast Checker

```typescript
// Automatic accessibility validation
const checkContrast = (foreground: string, background: string) => {
  // WCAG contrast ratio calculation
  const ratio = calculateContrastRatio(foreground, background)
  return {
    aa: ratio >= 4.5,      // AA compliance
    aaa: ratio >= 7,       // AAA compliance
    ratio
  }
}
```

---

## 📋 Theme Checklist

### Design Consistency

- [ ] ✅ Colors follow theme palette
- [ ] 🎨 Typography scales properly
- [ ] 📱 Responsive on all devices  
- [ ] 🌙 Dark mode fully supported
- [ ] ♿ Accessibility standards met
- [ ] 🎯 Icons consistent throughout
- [ ] 📏 Spacing follows design system

### Technical Requirements

- [ ] 🔧 CSS variables properly defined
- [ ] 📦 Components use theme tokens
- [ ] 🎭 Theme switching functional
- [ ] 🧪 Cross-browser compatibility
- [ ] ⚡ Performance optimized
- [ ] 🔍 No hardcoded colors in components

---

**Create beautiful, consistent designs!** ✨

---

*Need help? Check out our [Component Library Guide](COMPONENTS.md) or [Configuration Guide](CONFIG.md)*