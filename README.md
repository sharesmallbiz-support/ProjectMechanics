# Project Mechanics

> A comprehensive project management methodology and educational resource

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://sharesmallbiz-support.github.io/ProjectMechanics/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)

---

## 📖 About

**Project Mechanics** is a static educational website providing free access to a comprehensive project management methodology built from decades of real-world experience. This site offers structured frameworks, best practices, and practical guidance for mastering the art and science of project management.

### What This Site Is

- ✅ **Static Educational Resource** - Pure information site with no backend
- ✅ **Free & Open Access** - No login, no registration, no paywalls
- ✅ **Comprehensive Methodology** - Structured frameworks and best practices
- ✅ **Privacy Focused** - No data collection, no tracking, no cookies
- ✅ **Fast & Lightweight** - Optimized static site hosted on GitHub Pages

### What This Site Is NOT

- ❌ **Not a SaaS Platform** - No project management software or tools
- ❌ **Not a Consulting Service** - Educational content only
- ❌ **No User Accounts** - No login, profiles, or user data
- ❌ **No Interactive Features** - No forms, uploads, or data submission
- ❌ **No API Integration** - Static content only, no external APIs

---

## 🎯 Purpose

Project Mechanics was created to share project management knowledge openly and freely. The methodology combines:

- **Structured Discipline** - Proven frameworks and processes
- **Adaptive Problem-Solving** - Practical approaches for real-world challenges
- **Experience-Based Wisdom** - Lessons learned from decades of project delivery
- **PMI Framework Integration** - Aligned with industry standards

---

## 🏗️ Architecture

### Technology Stack

This is a **100% static site** with zero backend requirements:

```
Frontend Stack:
├── React 18.3.1          - UI framework
├── TypeScript 5.9.3      - Type safety
├── Vite 5.4.20          - Build tool & dev server
├── Wouter 3.7.1         - Client-side routing (hash-based)
├── Tailwind CSS 3.4.18   - Styling framework
├── Radix UI             - UI primitives (7 components)
├── Lucide React         - Icon library
└── Framer Motion        - Animations

No Backend:
❌ No server-side code
❌ No database
❌ No API endpoints
❌ No authentication
❌ No user data storage
```

### Build Output

```
Optimized Static Bundle:
├── index.html           - 2.83 KB
├── CSS Bundle          - 36.31 KB (7.10 KB gzipped)
├── JS Bundle           - 353.66 KB (98.99 KB gzipped)
└── Assets              - Images and favicons

Total: ~426 KB uncompressed, ~140 KB gzipped
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/sharesmallbiz-support/ProjectMechanics.git
cd ProjectMechanics

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build for Production

```bash
# Build for local testing (uses absolute paths)
npm run build

# Build for GitHub Pages deployment (uses relative paths) ⭐ RECOMMENDED
npm run build:gh-pages

# Preview production build
npm run preview
```

> **⚠️ IMPORTANT:** Always use `npm run build:gh-pages` when deploying to GitHub Pages!  
> The standard `npm run build` uses absolute paths which will cause 404 errors on GitHub Pages.

### TypeScript Check

```bash
# Run type checking
npm run check
```

---

## 📁 Project Structure

```
ProjectMechanics/
├── client/                  # Frontend application
│   ├── index.html          # Entry point
│   ├── public/             # Static assets
│   └── src/
│       ├── App.tsx         # Main app component
│       ├── main.tsx        # React entry point
│       ├── components/     # React components
│       │   ├── domain-overview.tsx
│       │   ├── footer.tsx
│       │   ├── hero-section.tsx
│       │   ├── navigation.tsx
│       │   └── ui/         # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utilities and constants
│       ├── pages/          # Route pages
│       │   ├── home.tsx
│       │   ├── methodology.tsx
│       │   ├── project-management.tsx
│       │   └── ...
│       └── services/       # (None - no API calls)
├── docs/                   # GitHub Pages build output
├── attached_assets/        # Source images and media
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
└── tsconfig.json          # TypeScript configuration
```

---

## 🎨 Features

### Current Features

✅ **Comprehensive Methodology Documentation**

- Project Management frameworks
- Portfolio Management guidance
- Leadership principles
- Change Management strategies
- Conflict Management approaches

✅ **Responsive Design**

- Mobile-first approach
- Optimized for all screen sizes
- Fast loading on any device

✅ **Modern UI/UX**

- Clean, professional design
- Smooth animations
- Accessible components
- Intuitive navigation

✅ **SEO Optimized**

- Semantic HTML
- Proper meta tags
- Fast page loads
- Static site benefits

### Explicitly Removed Features

❌ **Rich Text Editor** - Not needed for static site
❌ **File Upload** - No backend to receive files
❌ **Forms & Validation** - No data submission
❌ **User Authentication** - No user accounts
❌ **API Integration** - No external API calls
❌ **Database** - No data storage
❌ **Charts & Dashboards** - Static content only
❌ **Media Browser** - Not implemented

---

## 📊 Recent Optimizations

The site was recently optimized through a comprehensive 3-phase cleanup:

### Phase 1: Remove API-Dependent Code

- Removed 121 packages incompatible with static sites
- Deleted editor components and API services
- Removed file upload, forms, and data fetching libraries
- **Savings:** ~110MB, ~61KB bundle reduction

### Phase 2: Remove Unused UI Components

- Removed 20 unused Radix UI packages
- Deleted 28 unused component files
- **Savings:** ~120MB, CSS 41% smaller

### Phase 3: Remove Unused Utilities

- Removed validation, theming, and duplicate icon libraries
- **Savings:** ~15MB additional

### Total Impact

- **152 packages removed** (30% reduction)
- **41 files deleted**
- **CSS: 41.6% smaller**
- **JS: 15% smaller**
- **~245MB node_modules saved**

See [STATIC_SITE_CLEANUP_SUMMARY.md](STATIC_SITE_CLEANUP_SUMMARY.md) for full details.

---

## 🌐 Deployment

### GitHub Pages

This site is automatically deployed to GitHub Pages:

1. **Production URL:** <https://sharesmallbiz-support.github.io/ProjectMechanics/>
2. **Build Output:** `/docs` folder (configured for GitHub Pages)
3. **Routing:** Hash-based routing (works with GitHub Pages)

### Deploy Process

```bash
# 1. Build for GitHub Pages (CRITICAL: use build:gh-pages, not build!)
npm run build:gh-pages

# 2. Verify build output has relative paths
# Check docs/index.html - should see "./assets/..." not "/assets/..."

# 3. Commit changes
git add .
git commit -m "Deploy to GitHub Pages"

# 4. Push to GitHub
git push origin main

# 5. Wait 1-2 minutes for GitHub Pages to rebuild

# 6. Test deployment
# https://sharesmallbiz-support.github.io/ProjectMechanics/
```

> **⚠️ Common Deployment Issue:**  
> If you see a blank page with 404 errors for assets, you likely used `npm run build` instead of `npm run build:gh-pages`.  
> The `--base ./` flag in `build:gh-pages` is essential for GitHub Pages subfolder hosting.

GitHub Pages will automatically serve from the `/docs` folder on the `main` branch.

---

## 🧪 Testing

### Development Testing

```bash
# Start dev server
npm run dev

# Open http://localhost:5173/
# Test all routes:
# - / (home)
# - /methodology
# - /methodology/project-management
# - /methodology/portfolio-management
# - /methodology/leadership
# - /methodology/change-management
# - /methodology/conflict-management
# - /methodology/glossary
# - /methodology/history
```

### Build Testing

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173/
```

### Type Checking

```bash
# Run TypeScript checks
npm run check
```

---

## 📝 Content Management

### Adding New Content

All content is statically defined in React components. To add new content:

1. **New Page:**
   - Create component in `client/src/pages/`
   - Add route in `client/src/App.tsx`
   - Add navigation link in `client/src/components/navigation.tsx`

2. **Update Content:**
   - Edit existing component files
   - Update constants in `client/src/lib/constants.ts`

3. **Images:**
   - Add to `client/public/` or `attached_assets/`
   - Reference in components with absolute paths

### No CMS or Database

This site has **no content management system**. All content is:

- Hardcoded in React components
- Version controlled in Git
- Deployed as static HTML/CSS/JS

---

## 🤝 Contributing

This is a personal educational project by Mark Hazleton. While it's open source for transparency, it's not actively seeking contributions.

If you find this methodology helpful and want to:

- Share your own project management experiences
- Suggest improvements to the methodology
- Report issues with the site

Feel free to open an issue on GitHub.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💼 Author

**Mark Hazleton**

- Project Mechanics Methodology Creator
- LinkedIn: [company/project-mechanics](https://www.linkedin.com/company/project-mechanics/)

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)

---

## 📚 Related Documentation

- [STATIC_SITE_CLEANUP_SUMMARY.md](STATIC_SITE_CLEANUP_SUMMARY.md) - Optimization details
- [PHASE1_CLEANUP_COMPLETE.md](PHASE1_CLEANUP_COMPLETE.md) - Phase 1 cleanup report
- [PHASE2_CLEANUP_COMPLETE.md](PHASE2_CLEANUP_COMPLETE.md) - Phase 2 cleanup report
- [PHASE3_CLEANUP_COMPLETE.md](PHASE3_CLEANUP_COMPLETE.md) - Phase 3 cleanup report
- [STATIC_SITE_CLEANUP.md](STATIC_SITE_CLEANUP.md) - Cleanup analysis

---

## 🔮 Future Considerations

**This site will remain static.** No plans to add:

- User accounts or authentication
- Backend API or database
- Interactive tools or calculators
- Form submissions or data collection
- Third-party integrations

The focus is on providing high-quality educational content in a fast, accessible, privacy-respecting format.

---

**Version:** 1.0.0  
**Last Updated:** October 15, 2025  
**Status:** ✅ Production Ready - Fully Optimized Static Site
