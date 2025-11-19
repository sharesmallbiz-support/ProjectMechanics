# ⚠️ DEPRECATED - Project Mechanics Site

**This site has been archived and is no longer maintained.**

## Migration Notice

The `projectmechanics-site` has been unified with `document-agent-web` into a single, modern React application.

### What Happened

- **Old Architecture**: Separate static site generator (Node.js + Marked)
- **New Architecture**: Unified React + Vite application
- **Migration Date**: November 2025

### Where Did Everything Go?

All content and functionality from this site has been migrated to:

**📁 Location**: `/document-agent-web/`

**🔗 Content**: All markdown files → `/document-agent-web/src/content/`

**🎨 Styles**: Tailwind CSS implementation (from custom CSS)

**🔍 SEO**: Enhanced with React Helmet, sitemap generation, and structured data

## New Site Benefits

The unified site provides:

1. ✅ **Single Codebase** - Easier maintenance and deployment
2. ✅ **Modern Stack** - React + Vite for better performance
3. ✅ **Better SEO** - Dynamic meta tags, sitemap, structured data
4. ✅ **Integrated Tool** - Document Agent workflow included
5. ✅ **Responsive Design** - Mobile-first Tailwind CSS
6. ✅ **Azure Ready** - Optimized for Azure App Service

## For Developers

### If You Need to Reference Old Code

The old site structure:
- `build.js` - Static site generator → **Replaced by**: Vite build + React Router
- `seo-improvements.js` - SEO utilities → **Migrated to**: `src/utils/seo/generateSitemap.js`
- `content/*.md` - Markdown files → **Copied to**: `src/content/*.md`
- `public/css/styles.css` - Custom CSS → **Replaced by**: Tailwind CSS

### Migration Mapping

| Old File | New Location | Status |
|----------|--------------|--------|
| `content/index.md` | `src/pages/HomePage.jsx` | ✅ Migrated & Enhanced |
| `content/*.md` | `src/content/*.md` | ✅ Copied |
| `build.js` | `vite.config.js` + React Router | ✅ Replaced |
| `seo-improvements.js` | `src/utils/seo/` | ✅ Migrated |
| `public/css/styles.css` | Tailwind CSS classes | ✅ Converted |
| `templates/` | `src/layout/Layout.jsx` | ✅ Replaced |

### Running the New Site

```bash
cd ../document-agent-web
npm install
npm run dev
```

Visit: `http://localhost:3000`

### Deployment

The new unified site deploys to Azure App Service. See:
- [document-agent-web/README.md](../document-agent-web/README.md)
- [document-agent-web/AZURE-DEPLOYMENT.md](../document-agent-web/AZURE-DEPLOYMENT.md)

## Content Preservation

All content has been preserved:

- ✅ Project Mechanics overview
- ✅ Project Life Cycle
- ✅ Project Meetings
- ✅ Program Management Office
- ✅ Leadership skills articles
- ✅ Change management strategies
- ✅ Conflict management strategies
- ✅ Solution architecture guidance

## Why Deprecated?

1. **Duplication** - Two frontends served similar purposes
2. **Maintenance** - Keeping two builds in sync was inefficient
3. **User Experience** - Unified navigation provides better UX
4. **SEO** - Single domain consolidates search rankings
5. **Deployment** - One deployment pipeline vs. two

## Timeline

- **Before Nov 2025**: Separate `projectmechanics-site` and `document-agent-web`
- **Nov 2025**: Migration completed, unified site deployed
- **Current**: This directory preserved for reference only

## Questions?

For questions about the migration or new site:

- **New Site README**: [document-agent-web/README.md](../document-agent-web/README.md)
- **Deployment Guide**: [document-agent-web/AZURE-DEPLOYMENT.md](../document-agent-web/AZURE-DEPLOYMENT.md)
- **Author**: Mark Hazleton - [markhazleton.com](https://markhazleton.com)

---

**Do not use this directory for new development.**

**All updates should go to**: `/document-agent-web/`
