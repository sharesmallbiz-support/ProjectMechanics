# Static Site Cleanup Analysis

## Project Mechanics - GitHub Pages Optimization

**Date:** October 15, 2025  
**Context:** Static site deployed to GitHub Pages with NO backend/API

---

## 🔴 **CRITICAL: Unused Components for Static Site**

### 1. **RichTextEditor & MediaBrowser Components** - ❌ NOT USED

**Files to Remove:**

- `client/src/components/rich-text-editor.tsx`
- `client/src/components/media-browser.tsx`
- `client/src/services/youtube.ts`
- `client/src/services/unsplash.ts`

**Why They're Not Used:**

- These are **editor components** mentioned in `domain-overview.tsx` as features
- **NOT imported or used anywhere** in the actual application pages
- They're just **listed as features** in the marketing copy
- They require **backend API endpoints** (`/api/youtube`, `/api/unsplash`) that don't exist

**Impact:**

- Removes dependencies on external APIs (YouTube, Unsplash)
- Reduces bundle size significantly
- Eliminates dead code

---

## 🔴 **CRITICAL: API-Dependent Packages** - ❌ CANNOT WORK

Since this is a **static site with NO backend**, these packages are **completely unusable**:

### File Upload Libraries - **REMOVE ALL**

```json
"@uppy/aws-s3": "^5.0.1",
"@uppy/core": "^5.1.0", 
"@uppy/dashboard": "^5.0.2",
"@uppy/drag-drop": "^5.0.2",
"@uppy/file-input": "^4.2.2",
"@uppy/progress-bar": "^4.3.2",
"@uppy/react": "^5.1.0"
```

**Reason:** File uploads require a backend server. Static sites can't upload files.

### React Query - **REMOVE**

```json
"@tanstack/react-query": "^5.90.3"
```

**Reason:** No API calls found in codebase. No server to query.

### React Hook Form - **REMOVE**

```json
"@hookform/resolvers": "^5.2.2",
"react-hook-form": "^7.65.0"
```

**Reason:** Form component exists but never used. No form submissions (requires backend).

### Input OTP - **REMOVE**

```json
"input-otp": "^1.4.2"
```

**Reason:** OTP requires authentication backend. Only used in unused `input-otp.tsx` component.

### Drawer (Vaul) - **REMOVE**

```json
"vaul": "^1.1.2"
```

**Reason:** Only used in `drawer.tsx` component which is never imported anywhere.

---

## 🟡 **POTENTIALLY UNUSED: Radix UI Components**

Many Radix UI components are installed but **never used** in the application:

### Never Imported or Used

```json
"@radix-ui/react-accordion": "^1.2.12",        // ❌ Not used
"@radix-ui/react-alert-dialog": "^1.1.15",     // ❌ Not used
"@radix-ui/react-aspect-ratio": "^1.1.7",      // ❌ Not used
"@radix-ui/react-avatar": "^1.1.10",           // ❌ Not used
"@radix-ui/react-checkbox": "^1.3.3",          // ❌ Not used
"@radix-ui/react-collapsible": "^1.1.12",      // ❌ Not used
"@radix-ui/react-context-menu": "^2.2.16",     // ❌ Not used
"@radix-ui/react-dropdown-menu": "^2.1.16",    // ❌ Not used
"@radix-ui/react-hover-card": "^1.1.15",       // ❌ Not used
"@radix-ui/react-menubar": "^1.1.16",          // ❌ Not used
"@radix-ui/react-navigation-menu": "^1.2.14",  // ❌ Not used
"@radix-ui/react-popover": "^1.1.15",          // ❌ Not used
"@radix-ui/react-progress": "^1.1.7",          // ❌ Not used
"@radix-ui/react-radio-group": "^1.3.8",       // ❌ Not used
"@radix-ui/react-scroll-area": "^1.2.10",      // ❌ Not used
"@radix-ui/react-select": "^2.2.6",            // ❌ Not used
"@radix-ui/react-slider": "^1.3.6",            // ❌ Not used
"@radix-ui/react-switch": "^1.2.6",            // ❌ Not used
"@radix-ui/react-toggle": "^1.1.10",           // ❌ Not used
"@radix-ui/react-toggle-group": "^1.1.11",     // ❌ Not used
```

### Actually Used

```json
"@radix-ui/react-dialog": "^1.1.15",           // ✅ Used (dialog.tsx)
"@radix-ui/react-label": "^2.1.7",             // ✅ Used (label.tsx)
"@radix-ui/react-separator": "^1.1.7",         // ✅ Used (separator.tsx)
"@radix-ui/react-slot": "^1.2.3",              // ✅ Used (button.tsx, multiple)
"@radix-ui/react-tabs": "^1.1.13",             // ✅ Used (tabs.tsx)
"@radix-ui/react-toast": "^1.2.15",            // ✅ Used (toast.tsx, media-browser)
"@radix-ui/react-tooltip": "^1.2.8"            // ✅ Used (tooltip.tsx, App.tsx)
```

---

## 🟢 **VERIFY BEFORE REMOVING: Feature Components**

### Charts (Recharts) - ⚠️ **VERIFY USAGE**

```json
"recharts": "^3.2.1"
```

**Status:** Chart component exists in `client/src/components/ui/chart.tsx`  
**Action:** Search codebase to confirm if used in any pages

### Calendar (React Day Picker) - ⚠️ **VERIFY USAGE**

```json
"react-day-picker": "^9.11.1",
"date-fns": "^4.1.0"
```

**Status:** Calendar component exists in `client/src/components/ui/calendar.tsx`  
**Action:** Search codebase to confirm if used in any pages

### Carousel (Embla) - ⚠️ **VERIFY USAGE**

```json
"embla-carousel-react": "^8.6.0"
```

**Status:** Carousel component exists in `client/src/components/ui/carousel.tsx`  
**Action:** Search codebase to confirm if used in any pages

---

## 📋 **Cleanup Action Plan**

### **Phase 1: Remove Unused Editor Components** ✅ COMPLETED

**Deleted these files:**

- ✅ `client/src/components/rich-text-editor.tsx`
- ✅ `client/src/components/media-browser.tsx`
- ✅ `client/src/services/youtube.ts`
- ✅ `client/src/services/unsplash.ts`
- ✅ `client/src/components/ui/form.tsx`
- ✅ `client/src/components/ui/input-otp.tsx`
- ✅ `client/src/components/ui/drawer.tsx`
- ✅ `client/src/components/ui/chart.tsx`
- ✅ `client/src/components/ui/calendar.tsx`
- ✅ `client/src/components/ui/carousel.tsx`

**Removed packages:** 121 packages

- All @uppy/* packages (7)
- @tanstack/react-query, react-hook-form, @hookform/resolvers
- recharts, react-day-picker, date-fns, embla-carousel-react
- input-otp, vaul

**Actual Savings:**

- ~110MB node_modules
- ~61KB bundle size
- Build time: 2.09s

**Status:** ✅ **COMPLETE** - See PHASE1_CLEANUP_COMPLETE.md for details

---

### **Phase 2: Remove Unused Radix UI Components** ✅ COMPLETED

**Removed 20 Radix UI packages:**

- ✅ @radix-ui/react-accordion
- ✅ @radix-ui/react-alert-dialog
- ✅ @radix-ui/react-aspect-ratio
- ✅ @radix-ui/react-avatar
- ✅ @radix-ui/react-checkbox
- ✅ @radix-ui/react-collapsible
- ✅ @radix-ui/react-context-menu
- ✅ @radix-ui/react-dropdown-menu
- ✅ @radix-ui/react-hover-card
- ✅ @radix-ui/react-menubar
- ✅ @radix-ui/react-navigation-menu
- ✅ @radix-ui/react-popover
- ✅ @radix-ui/react-progress
- ✅ @radix-ui/react-radio-group
- ✅ @radix-ui/react-scroll-area
- ✅ @radix-ui/react-select
- ✅ @radix-ui/react-slider
- ✅ @radix-ui/react-switch
- ✅ @radix-ui/react-toggle
- ✅ @radix-ui/react-toggle-group

**Deleted 28 component files:**

- 20 Radix UI components (accordion, avatar, select, etc.)
- 8 additional unused components (command, breadcrumb, pagination, sidebar, sheet, sonner, table, textarea)

**Removed additional packages:** 27 packages total

- 20 @radix-ui packages
- cmdk, react-resizable-panels, sonner

**Actual Savings:**

- ~120MB node_modules
- CSS: 25.77 KB (41% reduction!)
- Build time: 2.00s

**Status:** ✅ **COMPLETE** - See PHASE2_CLEANUP_COMPLETE.md for details

---

### **Phase 3: Additional Optimization Opportunities** 🔍 ANALYSIS

Let's identify remaining unused packages and components...

---

## 🎯 **Additional Optimizations**

### Unused Shadcn UI Components

Many UI component files exist but are never imported:

```bash
# Check each component's usage
grep -r "sidebar.tsx\|Sidebar" client/src/pages/
grep -r "command.tsx\|Command" client/src/pages/
grep -r "breadcrumb.tsx\|Breadcrumb" client/src/pages/
grep -r "pagination.tsx\|Pagination" client/src/pages/
grep -r "resizable.tsx\|Resizable" client/src/pages/
grep -r "sheet.tsx\|Sheet" client/src/pages/
grep -r "sonner.tsx\|Sonner" client/src/pages/
grep -r "table.tsx\|Table" client/src/pages/
grep -r "textarea.tsx\|Textarea" client/src/pages/
```

If not found, these can be safely deleted.

---

## ✅ **Safe to Keep**

These are **actively used** in the application:

```json
// Core Libraries
"react": "^18.3.1",
"react-dom": "^18.3.1",
"wouter": "^3.7.1",                    // Routing
"lucide-react": "^0.545.0",            // Icons everywhere
"framer-motion": "^12.23.24",          // Animations
"next-themes": "^0.4.6",               // Theme switching (if used)

// UI Utilities
"class-variance-authority": "^0.7.1",   // CVA for variants
"clsx": "^2.1.1",                      // Class merging
"tailwind-merge": "^3.3.1",            // Tailwind class merging
"tailwindcss-animate": "^1.0.7",       // Animations

// Actually Used Radix Components
"@radix-ui/react-dialog": "^1.1.15",
"@radix-ui/react-label": "^2.1.7",
"@radix-ui/react-separator": "^1.1.7",
"@radix-ui/react-slot": "^1.2.3",
"@radix-ui/react-tabs": "^1.1.13",
"@radix-ui/react-toast": "^1.2.15",
"@radix-ui/react-tooltip": "^1.2.8"
```

---

## 📊 **Expected Savings Summary**

| Phase | Packages Removed | Node Modules | Bundle Size | Risk |
|-------|-----------------|--------------|-------------|------|
| Phase 1: Editor Files | 0 | ~0MB | ~50KB | ✅ None |
| Phase 2: API Packages | 12 | ~80MB | ~150KB | ✅ None |
| Phase 3: Radix UI | 20 | ~100MB | ~250KB | ⚠️ Low |
| Phase 4: Charts/Cal/Car | 4 | ~40MB | ~200KB | ⚠️ Medium |
| **TOTAL** | **36 packages** | **~220MB** | **~650KB** | - |

---

## 🚀 **Execution Commands**

### Quick Start: Phase 1 + 2 (Safest)

```powershell
# Phase 1: Delete unused files
Remove-Item client/src/components/rich-text-editor.tsx
Remove-Item client/src/components/media-browser.tsx
Remove-Item client/src/services/youtube.ts
Remove-Item client/src/services/unsplash.ts

# Phase 2: Remove API packages
npm uninstall @uppy/aws-s3 @uppy/core @uppy/dashboard @uppy/drag-drop @uppy/file-input @uppy/progress-bar @uppy/react @tanstack/react-query @hookform/resolvers react-hook-form input-otp vaul

# Delete unused UI files
Remove-Item client/src/components/ui/form.tsx
Remove-Item client/src/components/ui/input-otp.tsx
Remove-Item client/src/components/ui/drawer.tsx

# Test
npm run check
npm run build:gh-pages
```

---

## ⚠️ **Important Notes**

1. **Marketing vs. Reality:** The `domain-overview.tsx` mentions features like "Rich Text Editor" and "YouTube Integration" - these are **aspirational features**, not actually implemented.

2. **Static Site Limitations:** As a static GitHub Pages site with NO backend:
   - No file uploads possible
   - No form submissions (unless using external services)
   - No API endpoints
   - No database
   - No authentication

3. **Current Working Features:**
   - Navigation and routing (Wouter)
   - Static content pages
   - Toast notifications (local state)
   - Tabs, dialogs, buttons, cards
   - Responsive design

4. **Before Removing Charts/Calendar:** These components were recently updated for breaking changes. Verify they're not used before removing.

---

## 📝 **Next Steps**

1. ✅ Review this document
2. ⚠️ Verify chart/calendar/carousel usage
3. 🚀 Execute Phase 1 + 2 (safest cleanup)
4. ✅ Test build and deployment
5. 🔄 Optional: Execute Phase 3 + 4 after verification
6. 💾 Commit changes with clear message
7. 🚀 Deploy to GitHub Pages

---

**Status:** Ready for cleanup - All analysis complete  
**Recommendation:** Start with Phase 1 + 2 for immediate ~230KB bundle reduction
