# 🎯 Quick Cleanup Summary - GitHub Pages Static Site

**Project:** ProjectMechanics  
**Date:** October 15, 2025  
**Status:** Additional cleanup opportunities identified

---

## ✅ Already Optimized (Previous Work)

Your site has already been cleaned up significantly:

- ✅ Removed 152 packages (server-side, API-dependent code)
- ✅ Bundle reduced by 41.6% (CSS) and 15% (JS)
- ✅ Saved ~245MB in node_modules

**Great work so far!** 🎉

---

## 🔍 Additional Items Found

### 1️⃣ Unused UI Components (8 files)

These files exist but are **never imported or used**:

```
❌ client/src/components/ui/alert.tsx
❌ client/src/components/ui/dialog.tsx
❌ client/src/components/ui/input.tsx
❌ client/src/components/ui/label.tsx
❌ client/src/components/ui/separator.tsx
❌ client/src/components/ui/tabs.tsx
❌ client/src/components/ui/toast.tsx
❌ client/src/components/ui/toaster.tsx
```

### 2️⃣ Unused Dependencies (13 packages)

```bash
# Radix UI packages for unused components (5)
@radix-ui/react-dialog
@radix-ui/react-label
@radix-ui/react-separator
@radix-ui/react-tabs
@radix-ui/react-toast

# Animation library not used (1)
framer-motion              # ~500KB, zero usage

# Build tools not needed (3)
tsx                        # Server runner
esbuild                    # Included in Vite
cross-env                  # Not used

# Replit-specific (2) - optional
@replit/vite-plugin-cartographer
@replit/vite-plugin-runtime-error-modal
```

### 3️⃣ Unused Hooks (2 files)

```
❌ client/src/hooks/use-mobile.tsx
❌ client/src/hooks/use-toast.ts
```

---

## 🚀 Quick Cleanup Commands

### Remove Packages

```powershell
cd c:\GitHub\ShareSmallBiz-support\ProjectMechanics

# Core unused packages
npm uninstall @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-tabs @radix-ui/react-toast framer-motion tsx esbuild cross-env

# Optional: Remove Replit plugins if not on Replit
npm uninstall @replit/vite-plugin-cartographer @replit/vite-plugin-runtime-error-modal
```

### Delete Files

```powershell
# Remove unused UI components
Remove-Item client/src/components/ui/alert.tsx
Remove-Item client/src/components/ui/dialog.tsx
Remove-Item client/src/components/ui/input.tsx
Remove-Item client/src/components/ui/label.tsx
Remove-Item client/src/components/ui/separator.tsx
Remove-Item client/src/components/ui/tabs.tsx
Remove-Item client/src/components/ui/toast.tsx
Remove-Item client/src/components/ui/toaster.tsx

# Remove unused hooks
Remove-Item client/src/hooks/use-mobile.tsx
Remove-Item client/src/hooks/use-toast.ts
```

### Verify

```powershell
npm run check
npm run build:gh-pages
```

---

## 💰 Expected Benefits

- **~80-100MB** saved in node_modules
- **~50KB** smaller bundle size
- Faster npm installs
- Cleaner codebase

---

## ⚠️ Safety Notes

- ✅ All identified items are genuinely unused (verified by code search)
- ✅ No TypeScript errors expected
- ✅ Site functionality unchanged
- ✅ Can be done incrementally (packages first, then files)

---

## 📋 What to Keep

**Essential UI Components (4):**

- ✅ badge.tsx
- ✅ button.tsx
- ✅ card.tsx
- ✅ tooltip.tsx

**Essential Packages:**

- ✅ React & React DOM
- ✅ Wouter (routing)
- ✅ Lucide React (icons)
- ✅ Tailwind CSS & utilities
- ✅ @radix-ui/react-slot (button dependency)
- ✅ @radix-ui/react-tooltip (used in App)

---

## 🎯 Next Steps

1. **Backup:** Commit current state to git
2. **Execute:** Run cleanup commands above
3. **Verify:** Test build and functionality
4. **Deploy:** Push to GitHub if all works

---

**Full details:** See `FINAL_CLEANUP_RECOMMENDATIONS.md`
