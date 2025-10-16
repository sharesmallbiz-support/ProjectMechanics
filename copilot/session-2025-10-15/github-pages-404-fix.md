# GitHub Pages 404 Fix - Asset Path Issue

**Date:** October 16, 2025  
**Issue:** Assets returning 404 on GitHub Pages deployment  
**Status:** ✅ RESOLVED

---

## 🐛 Problem

When deployed to GitHub Pages, the site showed a blank page with these errors:

```
GET https://sharesmallbiz-support.github.io/assets/index-DRjoctjW.js 404 (Not Found)
GET https://sharesmallbiz-support.github.io/assets/index-CdPprG3o.css 404 (Not Found)
GET https://sharesmallbiz-support.github.io/android-chrome-192x192.png 404 (Not Found)
```

---

## 🔍 Root Cause

**Absolute vs. Relative Paths:**

- Site is hosted at: `https://sharesmallbiz-support.github.io/ProjectMechanics/`
- Assets were referenced with **absolute paths** from root: `/assets/...`
- Browser looked for: `https://sharesmallbiz-support.github.io/assets/...` ❌
- Should look for: `https://sharesmallbiz-support.github.io/ProjectMechanics/assets/...` ✅

**Why This Happened:**

- Used `npm run build` instead of `npm run build:gh-pages`
- Regular build doesn't include `--base ./` flag
- This flag tells Vite to use relative paths

---

## ✅ Solution

### 1. Always Use GitHub Pages Build Command

**Wrong:**

```bash
npm run build
```

**Correct:**

```bash
npm run build:gh-pages
```

This command includes `--base ./` which generates relative paths.

### 2. Fixed Webmanifest Paths

**Before (`client/public/site.webmanifest`):**

```json
{
  "icons": [
    {
      "src": "/android-chrome-192x192.png",  // ❌ Absolute path
      ...
    }
  ],
  "start_url": "/",  // ❌ Absolute path
  ...
}
```

**After:**

```json
{
  "icons": [
    {
      "src": "./android-chrome-192x192.png",  // ✅ Relative path
      ...
    }
  ],
  "start_url": "./",  // ✅ Relative path
  ...
}
```

---

## 📝 Package.json Commands Explained

```json
{
  "scripts": {
    "build": "vite build && npm run prerender && npm run sitemap",
    // ☝️ For local testing - uses absolute paths
    
    "build:gh-pages": "vite build --base ./ --emptyOutDir && npm run prerender && npm run sitemap"
    // ☝️ For GitHub Pages - uses RELATIVE paths (correct!)
  }
}
```

**The `--base ./` flag is critical** for GitHub Pages deployment!

---

## 🔧 Files Modified

1. **`client/public/site.webmanifest`**
   - Changed icon `src` from `/android-chrome-*.png` → `./android-chrome-*.png`
   - Changed `start_url` from `/` → `./`

2. **Rebuild with correct command**
   - Ran `npm run build:gh-pages` instead of `npm run build`

---

## ✅ Verification

After fix, asset paths in `docs/index.html`:

```html
<!-- ✅ Relative paths - correct! -->
<link rel="manifest" href="./site.webmanifest">
<script type="module" src="./assets/index-BG-0tmCB.js"></script>
<link rel="stylesheet" href="./assets/index-CdPprG3o.css">
```

All 9 pre-rendered HTML files also have correct relative paths.

---

## 🚀 Deployment Checklist

When deploying to GitHub Pages, **always**:

1. ✅ Use `npm run build:gh-pages` (not `npm run build`)
2. ✅ Verify `docs/` folder has relative paths (`./assets/...`)
3. ✅ Commit all changes in `docs/` folder
4. ✅ Push to `main` branch
5. ✅ Wait 1-2 minutes for GitHub Pages to rebuild
6. ✅ Test at: `https://sharesmallbiz-support.github.io/ProjectMechanics/`

---

## 🎯 Key Takeaways

1. **GitHub Pages subfolder hosting** requires relative paths
2. **Vite's `--base ./` flag** generates relative paths
3. **Always use `build:gh-pages`** for production deployment
4. **Webmanifest paths** must also be relative
5. **Test locally with relative paths** by running `npm run preview` after build

---

## 📚 Related Documentation

- Vite Base Public Path: <https://vitejs.dev/config/shared-options.html#base>
- GitHub Pages Docs: <https://docs.github.com/pages>

---

**Status:** ✅ Fixed and ready for deployment  
**Next Action:** Commit and push `docs/` folder to GitHub
