# Next.js Migration Guide - Step by Step

**Date:** October 15, 2025  
**Project:** ProjectMechanics  
**Goal:** Migrate React SPA to Next.js Static Export

---

## 🚀 Phase 1: Project Setup

### Step 1: Create Next.js App

We'll create the Next.js app in a subdirectory first, then migrate content.

```bash
# Create new Next.js app
npx create-next-app@latest projectmechanics-next --typescript --tailwind --app --no-src-dir

# Navigate to new project
cd projectmechanics-next
```

**Configuration choices:**

- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ App Router (not Pages Router)
- ❌ No src/ directory (keep it simple)
- ❌ No import alias customization (use default @/)

---

## 📝 Configuration Files

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ProjectMechanics',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Strict mode
  reactStrictMode: true,
  
  // Optional: Disable runtime JavaScript (progressive enhancement)
  // Uncomment if you want ZERO JavaScript
  // experimental: {
  //   disableOptimizedLoading: true,
  // },
}

module.exports = nextConfig
```

### tailwind.config.ts

Copy from current project, adjust paths:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ... rest of colors from current config
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:gh-pages": "next build",
    "start": "next start",
    "lint": "next lint",
    "check": "tsc --noEmit"
  }
}
```

---

## 📂 Directory Structure

```
projectmechanics-next/
├── app/
│   ├── layout.tsx           # Root layout (Navigation + Footer)
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── methodology/
│   │   └── page.tsx
│   ├── project-management/
│   │   └── page.tsx
│   ├── portfolio-management/
│   │   └── page.tsx
│   ├── change-management/
│   │   └── page.tsx
│   ├── conflict-management/
│   │   └── page.tsx
│   ├── leadership/
│   │   └── page.tsx
│   ├── glossary/
│   │   └── page.tsx
│   └── history/
│       └── page.tsx
├── components/
│   ├── ui/                  # shadcn components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── tooltip.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── MethodologySection.tsx
│   ├── DomainOverview.tsx
│   └── ResourcesSection.tsx
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   └── metadata.ts
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap-html.html
└── ...config files
```

---

## 🔧 Migration Steps

### 1. Install Dependencies

```bash
npm install lucide-react @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge tailwindcss-animate
```

### 2. Copy Global Styles

Copy `client/src/index.css` to `app/globals.css`:

- Keep CSS variables
- Keep Tailwind directives
- Keep custom styles

### 3. Migrate Components

**Navigation Component:**

```typescript
// components/Navigation.tsx
import Link from 'next/link'
import { Menu } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Project Mechanics
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/methodology">Methodology</Link>
            <Link href="/glossary">Glossary</Link>
            {/* ... other links */}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

**Key Changes:**

- Replace `import { Link } from "wouter"` with `import Link from 'next/link'`
- Replace `href="/#/methodology"` with `href="/methodology"`
- Remove `useHashLocation` hooks

### 4. Create Root Layout

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sharesmallbiz-support.github.io/ProjectMechanics'),
  title: {
    default: 'Project Mechanics',
    template: '%s | Project Mechanics',
  },
  description: 'Comprehensive project management methodology and framework for successful project delivery.',
  keywords: ['project management', 'methodology', 'project lifecycle', 'portfolio management'],
  authors: [{ name: 'Project Mechanics' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sharesmallbiz-support.github.io/ProjectMechanics/',
    siteName: 'Project Mechanics',
    title: 'Project Mechanics',
    description: 'Comprehensive project management methodology and framework.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### 5. Create Pages

**Home Page Example:**

```typescript
// app/page.tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import MethodologySection from '@/components/MethodologySection'
import DomainOverview from '@/components/DomainOverview'
import ResourcesSection from '@/components/ResourcesSection'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Project Mechanics - Comprehensive project management methodology for successful delivery.',
  openGraph: {
    title: 'Project Mechanics',
    description: 'Comprehensive project management methodology for successful delivery.',
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <MethodologySection />
      <DomainOverview />
      <ResourcesSection />
    </main>
  )
}
```

**Methodology Page Example:**

```typescript
// app/methodology/page.tsx
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Methodology',
  description: 'Explore our comprehensive project management methodology covering lifecycle, planning, execution, and control.',
  openGraph: {
    title: 'Project Management Methodology | Project Mechanics',
    description: 'Comprehensive framework for successful project delivery.',
  },
}

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Methodology</h1>
        {/* Content from current methodology page */}
      </div>
    </main>
  )
}
```

---

## ✅ Testing Checklist

### Development Testing

```bash
npm run dev
```

Visit each route:

- [ ] <http://localhost:3000/ProjectMechanics/>
- [ ] <http://localhost:3000/ProjectMechanics/methodology>
- [ ] <http://localhost:3000/ProjectMechanics/project-management>
- [ ] <http://localhost:3000/ProjectMechanics/portfolio-management>
- [ ] <http://localhost:3000/ProjectMechanics/change-management>
- [ ] <http://localhost:3000/ProjectMechanics/conflict-management>
- [ ] <http://localhost:3000/ProjectMechanics/leadership>
- [ ] <http://localhost:3000/ProjectMechanics/glossary>
- [ ] <http://localhost:3000/ProjectMechanics/history>

**Verify:**

- [ ] Navigation links work
- [ ] Styles applied correctly
- [ ] Images load
- [ ] Responsive design works
- [ ] No console errors

### Build Testing

```bash
npm run build
```

**Check output folder structure:**

```
out/
├── index.html                      # Full HTML with content!
├── methodology.html
├── project-management.html
├── portfolio-management.html
├── change-management.html
├── conflict-management.html
├── leadership.html
├── glossary.html
├── history.html
├── _next/
│   └── static/
│       ├── css/
│       └── chunks/
└── ...
```

**Validate static HTML:**

```bash
# View source - should see full content, not empty div!
cat out/index.html

# Look for:
# - <h1>Project Mechanics</h1>
# - Full page content in HTML
# - Meta tags in <head>
# - NOT just <div id="__next"></div>
```

### SEO Validation

- [ ] View source shows full content
- [ ] Meta tags present in each page
- [ ] Open Graph tags correct
- [ ] Canonical URLs set
- [ ] Title tags unique per page
- [ ] Description tags 150-160 chars

### Crawler Testing

```bash
# Disable JavaScript in browser
# Navigate to each page
# Verify content visible
```

---

## 🚀 Deployment

### Option 1: Build to docs/ folder

Modify package.json:

```json
{
  "scripts": {
    "build:gh-pages": "next build && mv out docs"
  }
}
```

Or create post-build script:

```bash
# scripts/move-to-docs.sh
#!/bin/bash
rm -rf docs
mv out docs
echo "Build moved to docs/ folder"
```

### Option 2: GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Next.js
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

---

## 📊 Expected Results

**Before (React SPA):**

- HTML: 3.45 KB (empty shell)
- CSS: 28.99 KB
- JS: 358.89 KB
- Content: Client-side rendered

**After (Next.js Static):**

- HTML: ~15-25 KB per page (full content!)
- CSS: ~30 KB (similar)
- JS: 0-20 KB (optional hydration)
- Content: In HTML source

**Performance Improvements:**

- ✅ First Contentful Paint: Instant
- ✅ Time to Interactive: Instant (no JS parsing)
- ✅ SEO: Perfect (all content in HTML)
- ✅ Crawlability: 100% (works without JS)

---

## 🎯 Success Metrics

After migration is complete:

1. **SEO:** Lighthouse SEO score 95+
2. **Performance:** Lighthouse Performance 90+
3. **HTML Source:** View source shows full page content
4. **Crawlers:** Screaming Frog sees all pages without JS
5. **Bundle Size:** JavaScript <20 KB (or 0 KB)
6. **Load Time:** First Contentful Paint <0.5s

---

## 🐛 Troubleshooting

### Issue: Images not loading

**Solution:** Make sure images are in `public/` folder and use relative paths:

```typescript
<img src="/ProjectMechanics/image.png" alt="..." />
```

### Issue: CSS not applied

**Solution:** Check `globals.css` imported in `app/layout.tsx`:

```typescript
import './globals.css'
```

### Issue: 404 on GitHub Pages

**Solution:** Verify `basePath` in `next.config.js`:

```javascript
basePath: '/ProjectMechanics',
```

### Issue: Links not working

**Solution:** Use Next.js Link component, not anchor tags:

```typescript
import Link from 'next/link'
<Link href="/methodology">Methodology</Link>
```

---

**Status:** Ready to begin migration  
**Next Step:** Create Next.js project with `npx create-next-app`
