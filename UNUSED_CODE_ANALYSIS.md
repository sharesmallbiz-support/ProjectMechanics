# Unused Code & Package Analysis

## 📊 Analysis Date: October 15, 2025

This document identifies unused components, packages, and code in the ProjectMechanics static site deployed to GitHub Pages.

---

## 🎯 Summary

**Project Type:** Static site (GitHub Pages)  
**Deployment:** No backend/server needed in production  
**Build Tool:** Vite

---

## 🔴 CRITICAL: Unused Server-Side Packages

These packages are **NOT needed** for a static GitHub Pages site and can be removed:

### Backend/Database (Completely Unused)

```json
"@google-cloud/storage": "^7.17.2",        // Google Cloud Storage - server only
"@neondatabase/serverless": "^1.0.2",      // Neon Database - server only
"connect-pg-simple": "^10.0.0",            // PostgreSQL session store - server only
"drizzle-orm": "^0.44.6",                  // Database ORM - server only
"drizzle-zod": "^0.8.3",                   // Database schema validation - server only
"express": "^4.21.2",                      // Express server - server only
"express-session": "^1.18.2",              // Session middleware - server only
"memorystore": "^1.6.7",                   // Session store - server only
"passport": "^0.7.0",                      // Authentication - server only
"passport-local": "^1.0.0",                // Local auth strategy - server only
"google-auth-library": "^10.4.1",          // Google auth - server only
"ws": "^8.18.3",                           // WebSocket server - server only
```

### Dev Dependencies (Unused)

```json
"@types/connect-pg-simple": "^7.0.3",
"@types/express": "5.0.3",
"@types/express-session": "^1.18.2",
"@types/passport": "^1.0.17",
"@types/passport-local": "^1.0.38",
"@types/ws": "^8.18.1",
"drizzle-kit": "^0.31.5",
"tsx": "^4.20.6",                          // Only needed if server exists
"esbuild": "^0.25.11",                     // Only for server bundling
```

**Estimated Size Reduction:** ~200MB+ in node_modules

---

## 🟡 POTENTIALLY UNUSED: UI Components & Libraries

### File Upload (Uppy) - **NOT USED**

```json
"@uppy/aws-s3": "^5.0.1",
"@uppy/core": "^5.1.0",
"@uppy/dashboard": "^5.0.2",
"@uppy/drag-drop": "^5.0.2",
"@uppy/file-input": "^4.2.2",
"@uppy/progress-bar": "^4.3.2",
"@uppy/react": "^5.1.0",
```

**Reason:** No file uploads in static site. Media browser uses external APIs only.

### React Query - **NOT USED**

```json
"@tanstack/react-query": "^5.90.3",
```

**Reason:** No API calls found using useQuery/useMutation hooks.

### React Hook Form - **ONLY IN FORM.TSX (unused component)**

```json
"@hookform/resolvers": "^5.2.2",
"react-hook-form": "^7.65.0",
```

**Reason:** Form component exists but not used anywhere in the app.

### Additional Utilities - **UNCERTAIN**

```json
"input-otp": "^1.4.2",                     // OTP input - no usage found
"vaul": "^1.1.2",                          // Drawer - only in unused drawer.tsx
"next-themes": "^0.4.6",                   // Theme switching - verify usage
```

---

## 🎨 Unused UI Components (47 files)

### Shadcn/UI Components NOT Used Anywhere

**Form Components:**

- `accordion.tsx` ❌
- `alert.tsx` ❌
- `alert-dialog.tsx` ❌
- `checkbox.tsx` ❌
- `command.tsx` ❌ (cmdk package)
- `form.tsx` ❌ (react-hook-form)
- `input-otp.tsx` ❌
- `input.tsx` ❌ (used only in unused components)
- `label.tsx` ❌ (used only in form.tsx)
- `radio-group.tsx` ❌
- `select.tsx` ❌
- `slider.tsx` ❌
- `switch.tsx` ❌
- `textarea.tsx` ❌

**Navigation Components:**

- `breadcrumb.tsx` ❌
- `context-menu.tsx` ❌
- `dropdown-menu.tsx` ❌
- `hover-card.tsx` ❌
- `menubar.tsx` ❌
- `navigation-menu.tsx` ❌
- `pagination.tsx` ❌
- `popover.tsx` ❌

**Layout Components:**

- `aspect-ratio.tsx` ❌
- `collapsible.tsx` ❌
- `drawer.tsx` ❌
- `resizable.tsx` ❌ (react-resizable-panels)
- `scroll-area.tsx` ❌
- `separator.tsx` ❌ (used only in sidebar.tsx which is unused)
- `sheet.tsx` ❌
- `sidebar.tsx` ❌
- `table.tsx` ❌

**Data Display:**

- `avatar.tsx` ❌
- `calendar.tsx` ❌ (react-day-picker)
- `carousel.tsx` ❌ (embla-carousel-react)
- `chart.tsx` ❌ (recharts)
- `progress.tsx` ❌
- `skeleton.tsx` ❌

**Feedback:**

- `toast.tsx` / `toaster.tsx` ❌ (uses use-toast hook)
- `toggle.tsx` ❌
- `toggle-group.tsx` ❌

### Currently USED Components (7 files)

- ✅ `badge.tsx` - Used in pages
- ✅ `button.tsx` - Used extensively
- ✅ `card.tsx` - Used extensively
- ✅ `dialog.tsx` - Used in rich-text-editor (also unused)
- ✅ `tabs.tsx` - Used in media-browser (also unused)
- ✅ `tooltip.tsx` - Provider in App.tsx
- ✅ (internally) `toggle-group.tsx`, `toaster.tsx` (dependencies)

---

## 🔍 Unused Custom Components

### NOT Imported Anywhere

```
❌ client/src/components/rich-text-editor.tsx
   └─ Also pulls in: Dialog, Input (unused UI components)

❌ client/src/components/media-browser.tsx
   └─ Also pulls in: Tabs, services (YouTube, Unsplash)
```

**Note:** These were likely development/admin tools not meant for the static site.

---

## 📦 Unused Radix UI Packages

All these `@radix-ui/react-*` packages can be removed:

```json
"@radix-ui/react-accordion": "^1.2.12",         ❌
"@radix-ui/react-alert-dialog": "^1.1.15",      ❌
"@radix-ui/react-aspect-ratio": "^1.1.7",       ❌
"@radix-ui/react-avatar": "^1.1.10",            ❌
"@radix-ui/react-checkbox": "^1.3.3",           ❌
"@radix-ui/react-collapsible": "^1.1.12",       ❌
"@radix-ui/react-context-menu": "^2.2.16",      ❌
"@radix-ui/react-dropdown-menu": "^2.1.16",     ❌
"@radix-ui/react-hover-card": "^1.1.15",        ❌
"@radix-ui/react-menubar": "^1.1.16",           ❌
"@radix-ui/react-navigation-menu": "^1.2.14",   ❌
"@radix-ui/react-popover": "^1.1.15",           ❌
"@radix-ui/react-progress": "^1.1.7",           ❌
"@radix-ui/react-radio-group": "^1.3.8",        ❌
"@radix-ui/react-scroll-area": "^1.2.10",       ❌
"@radix-ui/react-select": "^2.2.6",             ❌
"@radix-ui/react-separator": "^1.1.7",          ❌
"@radix-ui/react-slider": "^1.3.6",             ❌
"@radix-ui/react-switch": "^1.2.6",             ❌
"@radix-ui/react-toggle": "^1.1.10",            ❌
"@radix-ui/react-toggle-group": "^1.1.11",      ❌
"@radix-ui/react-toast": "^1.2.15",             ❌

KEEP ONLY:
"@radix-ui/react-dialog": "^1.1.15",            ✅ (if keeping rich-text-editor)
"@radix-ui/react-label": "^2.1.7",              ✅ (button dependency)
"@radix-ui/react-slot": "^1.2.3",               ✅ (button dependency)
"@radix-ui/react-tabs": "^1.1.13",              ✅ (if keeping media-browser)
"@radix-ui/react-tooltip": "^1.2.8",            ✅ (currently used)
```

---

## 🗂️ Unused Services

```
❌ client/src/services/youtube.ts       (only used in media-browser)
❌ client/src/services/unsplash.ts      (only used in media-browser)
```

---

## 🧪 Unused Files/Folders

```
❌ server/                              (entire folder - only for local dev)
❌ client/src/pages/not-found.tsx       (not routed in App.tsx)
❌ client/src/components/rich-text-editor.tsx
❌ client/src/components/media-browser.tsx
❌ client/src/services/                 (entire folder)
```

---

## ✅ Cleanup Recommendations

### Phase 1: Remove Server-Side Code (Safest)

```bash
npm uninstall @google-cloud/storage @neondatabase/serverless connect-pg-simple drizzle-orm drizzle-zod express express-session memorystore passport passport-local google-auth-library ws @types/connect-pg-simple @types/express @types/express-session @types/passport @types/passport-local @types/ws drizzle-kit
```

### Phase 2: Remove Unused File Upload & Form Libraries

```bash
npm uninstall @uppy/aws-s3 @uppy/core @uppy/dashboard @uppy/drag-drop @uppy/file-input @uppy/progress-bar @uppy/react @tanstack/react-query @hookform/resolvers react-hook-form input-otp vaul
```

### Phase 3: Remove Unused Radix UI Components

```bash
npm uninstall @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-toast
```

### Phase 4: Remove Unused Chart/Calendar Libraries

```bash
npm uninstall recharts react-day-picker embla-carousel-react react-resizable-panels cmdk date-fns
```

### Phase 5: Delete Unused Files

```bash
# Delete unused UI components
Remove-Item client/src/components/ui/accordion.tsx
Remove-Item client/src/components/ui/alert.tsx
Remove-Item client/src/components/ui/alert-dialog.tsx
# ... (see full list above)

# Delete unused custom components
Remove-Item client/src/components/rich-text-editor.tsx
Remove-Item client/src/components/media-browser.tsx
Remove-Item client/src/services/ -Recurse

# Delete unused pages
Remove-Item client/src/pages/not-found.tsx

# Delete server folder (keep for local dev if needed)
# Remove-Item server/ -Recurse
```

---

## 💰 Expected Benefits

- **Bundle Size:** Reduce by ~500KB-1MB (gzipped)
- **node_modules:** Reduce by ~200-300MB
- **Install Time:** Faster `npm install`
- **Build Time:** Slightly faster builds
- **Maintenance:** Less packages to update
- **Security:** Fewer packages = fewer vulnerabilities

---

## ⚠️ Before Removing

1. ✅ Commit current working state to git
2. ✅ Test the site thoroughly after each phase
3. ✅ Keep server/ folder if you use local dev server
4. ✅ Verify build still works: `npm run build`
5. ✅ Test deployed site on GitHub Pages

---

## 📝 Notes

- **Server folder:** Keep if you use `npm run dev` for local development
- **Theme switching:** Verify if `next-themes` is used for dark mode
- **React Icons:** Used extensively - keep it
- **Lucide React:** Used for icons - keep it
- **Wouter:** Used for routing - keep it
- **Framer Motion:** Check if animations are actually used
