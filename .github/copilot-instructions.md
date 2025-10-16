# GitHub Copilot Instructions for ProjectMechanics

## Project Overview

This is a **static website** built for GitHub Pages - a pure frontend React application with no backend, API, or server components.

**Key Characteristics:**

- Static site deployment via GitHub Pages
- Content-focused documentation and methodology site
- No user authentication, forms, or data persistence
- No API calls or external integrations
- Built with Vite + React + TypeScript + Tailwind CSS

---

## 🎯 Development Guidelines

### 1. Static Site Principles

**Always Remember:**

- ✅ This is a static site - no server-side code
- ✅ No database, authentication, or API endpoints
- ✅ All content is client-side rendered
- ✅ Deployed to GitHub Pages (static hosting only)

**Never Suggest:**

- ❌ Server-side code or Express.js endpoints
- ❌ Database connections or ORMs
- ❌ Backend authentication or sessions
- ❌ File uploads or server processing
- ❌ Environment variables for secrets (client-side visible)

### 2. Technology Stack

**Core Dependencies (Keep):**

- React 18.3+ (UI framework)
- Wouter 3.7+ (client-side routing with hash history)
- TypeScript 5.9+ (type safety)
- Tailwind CSS 3.4+ (styling)
- Vite 5.4+ (build tool)
- Lucide React (icons)

**UI Components:**

- Radix UI primitives (only slot & tooltip)
- Custom components in `client/src/components/ui/`
- Badge, Button, Card, Tooltip (actively used)

**Do Not Add:**

- Server-side packages (Express, Fastify, etc.)
- Database libraries (Drizzle, Prisma, etc.)
- Heavy animation libraries (framer-motion, GSAP)
- Unused UI component libraries
- Form validation libraries unless specifically needed

### 3. Code Organization

```
client/src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components (4 files only)
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   └── ...
├── pages/              # Route pages
├── lib/                # Utilities (utils.ts, constants.ts)
├── hooks/              # Custom React hooks (currently empty)
└── App.tsx             # Main router
```

**Guidelines:**

- Place UI components in `components/ui/` only if shadcn-compatible
- Create feature components in `components/`
- Pages go in `pages/` directory
- Utilities in `lib/`
- Keep components focused and single-purpose

### 4. Routing

**Use Hash-based Routing:**

```typescript
import { useHashLocation } from "wouter/use-hash-location";

<Router hook={useHashLocation}>
  <Route path="/" component={Home} />
  <Route path="/methodology" component={Methodology} />
</Router>;
```

**Why Hash Routing:**

- GitHub Pages doesn't support SPA fallback
- Hash routing works without server configuration
- URLs: `/#/`, `/#/methodology`, etc.

### 5. Styling Guidelines

**Use Tailwind CSS:**

- Utility-first approach
- Responsive design with `sm:`, `md:`, `lg:` breakpoints
- Use design tokens from `index.css`

**Component Styling:**

```typescript
// Good - Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-lg bg-card">

// Good - Conditional classes with clsx
className={cn("base-class", condition && "active-class")}

// Avoid - Inline styles unless absolutely necessary
style={{ color: 'red' }}
```

### 6. TypeScript Best Practices

**Strict Mode:**

- Enable strict type checking
- Avoid `any` types
- Use proper interfaces and types
- Leverage React.FC or function components with explicit types

**Example:**

```typescript
interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  // Component implementation
}
```

### 7. Performance Optimization

**Bundle Size:**

- This project was optimized from 500→293 packages
- Only add dependencies if absolutely necessary
- Check bundle impact before adding packages

**Code Splitting:**

- Use dynamic imports for large components
- Lazy load routes if needed

**Assets:**

- Optimize images before committing
- Use appropriate formats (WebP, PNG)
- Consider lazy loading for images

---

## 📁 File Organization & Documentation

### Session Documentation

**All analysis, cleanup, and session markdown files should be stored in:**

```
copilot/
└── session-YYYY-MM-DD/
    ├── analysis-{topic}.md
    ├── cleanup-report.md
    ├── implementation-notes.md
    └── ...
```

**Root Directory Rules:**

- ❌ Do not create markdown files in root directory
- ✅ Use `copilot/session-{date}/` for all session documentation
- ✅ Keep root clean and organized
- ✅ Exception: README.md and essential project docs only

**Running Cleanup:**

```powershell
# Move markdown files to copilot folder
.\scripts\cleanup-docs.ps1
```

### Git Commit Guidelines

**Commit Message Format:**

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test changes
- `chore:` Maintenance tasks

**Examples:**

```
feat: add project lifecycle methodology page
fix: correct navigation links for methodology section
docs: update README with deployment instructions
chore: Phase 4 cleanup - remove unused dependencies
```

---

## 🚫 What NOT to Suggest

### Backend/Server Code

- No Express.js, Fastify, or Node.js servers
- No API endpoints or middleware
- No server-side rendering (SSR)
- No serverless functions

### Database & Storage

- No database connections (PostgreSQL, MongoDB, etc.)
- No ORMs (Drizzle, Prisma, TypeORM)
- No cloud storage integration (AWS S3, Google Cloud)
- No session stores or caching

### Authentication

- No Passport.js or authentication libraries
- No OAuth providers
- No JWT tokens or session management
- All content is public

### Forms & File Upload

- No file upload libraries (Uppy, Dropzone)
- No form builders (React Hook Form) unless specifically requested
- No server-side form processing

### Heavy Libraries

- No framer-motion (removed in Phase 4)
- No chart libraries unless specifically needed
- No date pickers or calendars
- Keep bundle size minimal

---

## ✅ What TO Suggest

### Content & UI

- New methodology pages or sections
- Improved navigation and user experience
- Accessible components (ARIA labels, keyboard navigation)
- Responsive design improvements
- SEO optimizations (meta tags, semantic HTML)

### Performance

- Code splitting strategies
- Image optimization techniques
- Bundle size reduction tips
- Loading state improvements

### Developer Experience

- TypeScript type improvements
- Component refactoring for reusability
- Better code organization
- Documentation improvements

### Static Site Features

- Client-side search functionality
- Table of contents generation
- Breadcrumb navigation
- Print-friendly styles
- Dark/light mode (if requested)

---

## 🏗️ Adding New Features

### New Page Checklist

1. **Create Page Component:**

   ```typescript
   // client/src/pages/new-page.tsx
   import { Navigation } from "@/components/navigation";
   import { Footer } from "@/components/footer";

   export default function NewPage() {
     return (
       <div className="min-h-screen bg-background">
         <Navigation />
         <main className="container mx-auto px-4 py-8">{/* Content */}</main>
         <Footer />
       </div>
     );
   }
   ```

2. **Add Route:**

   ```typescript
   // client/src/App.tsx
   import NewPage from "@/pages/new-page";

   <Route path="/new-page" component={NewPage} />;
   ```

3. **Update Navigation:**

   ```typescript
   // client/src/components/navigation.tsx
   <Link href="/#/new-page">New Page</Link>
   ```

4. **Build & Test:**
   ```bash
   npm run check        # TypeScript
   npm run build        # Production build
   ```

### New Component Checklist

1. Place in appropriate directory (`components/` or `components/ui/`)
2. Use TypeScript with proper interfaces
3. Follow Tailwind CSS styling conventions
4. Ensure responsive design
5. Add JSDoc comments for complex logic
6. Test across breakpoints

---

## 🧪 Testing & Validation

### Before Committing

```bash
# Type check
npm run check

# Build for production
npm run build:gh-pages

# Verify output in docs/ folder
```

### Build Output Location

```
docs/                    # GitHub Pages serves from here
├── index.html
├── assets/
│   ├── index-{hash}.css
│   └── index-{hash}.js
└── ...
```

---

## 📦 Package Management

### Before Adding Dependencies

**Ask These Questions:**

1. Is this necessary for a static site?
2. Will it work without a backend?
3. What's the bundle size impact?
4. Can we achieve this with existing tools?
5. Is there a lighter alternative?

### Preferred Alternatives

| Instead of | Use                     |
| ---------- | ----------------------- |
| Axios      | Fetch API (native)      |
| Moment.js  | date-fns or native Intl |
| Lodash     | Native ES6+ methods     |
| UUID       | crypto.randomUUID()     |
| jQuery     | Native DOM/React        |

### Adding Packages

```bash
# Check size before installing
npm view {package} dist.dist-unpackedSize

# Install only if necessary
npm install {package}

# Update documentation
```

---

## 🎨 Design System

### Colors (Tailwind)

- Background: `bg-background`
- Foreground: `text-foreground`
- Primary: `bg-primary text-primary-foreground`
- Card: `bg-card text-card-foreground`
- Muted: `bg-muted text-muted-foreground`

### Spacing

- Container: `container mx-auto px-4`
- Sections: `py-12 md:py-16 lg:py-24`
- Cards: `p-6`
- Gaps: `gap-4`, `gap-6`, `gap-8`

### Typography

- Headings: Use semantic HTML (`h1`, `h2`, etc.)
- Body: Default to `text-base` or `text-sm`
- Lead text: `text-lg text-muted-foreground`

---

## 🚀 Deployment

### Build Process

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Output goes to docs/ folder
# Committed and pushed to main branch
```

### GitHub Pages Settings

- Source: Deploy from `main` branch
- Folder: `/docs`
- Custom domain: Optional
- HTTPS: Enforced

### Post-Deployment

1. Verify site loads: `https://{username}.github.io/ProjectMechanics/`
2. Test all routes work with hash routing
3. Check assets load correctly
4. Verify responsive design
5. Test on mobile devices

---

## 📚 Documentation Standards

### Code Comments

```typescript
// Good - Explains WHY
// Using hash routing for GitHub Pages compatibility
const router = useHashLocation();

// Avoid - Explains WHAT (obvious)
// Set title to "Home"
const title = "Home";
```

### Component Documentation

```typescript
/**
 * Card component for displaying methodology content.
 * Includes title, description, and children content.
 *
 * @param title - Card heading text
 * @param description - Optional subtitle
 * @param children - Card content
 */
export function Card({ title, description, children }: CardProps) {
  // Implementation
}
```

---

## 🔧 Common Tasks

### Update Content

- Edit markdown in page components
- Update constants in `lib/constants.ts`
- Modify navigation links in `components/navigation.tsx`

### Change Styling

- Update Tailwind classes in components
- Modify CSS variables in `index.css`
- Adjust responsive breakpoints

### Fix TypeScript Errors

```bash
npm run check
```

### Optimize Bundle

```bash
npm run build
# Check output sizes in terminal
```

---

## 📞 Getting Help

### Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Wouter Routing](https://github.com/molefrog/wouter)
- [Vite Guide](https://vitejs.dev/guide/)
- [GitHub Pages](https://docs.github.com/pages)

### Project History

- See `PHASE1-4_CLEANUP_COMPLETE.md` for optimization history
- Check `copilot/session-*/` for previous session notes
- Review git history for implementation details

---

## ✨ Summary

**Remember:** This is a **static documentation site** for GitHub Pages. Focus on:

- ✅ Content clarity and organization
- ✅ User experience and navigation
- ✅ Performance and bundle size
- ✅ Accessibility and responsive design
- ✅ Clean, maintainable code

**Avoid:** Anything requiring a backend, database, or server-side processing.

**Keep Clean:** Store all session documentation in `copilot/session-{date}/` folders, not in the root directory.

---

_Last Updated: October 15, 2025_  
_Project: ProjectMechanics - Static GitHub Pages Site_
