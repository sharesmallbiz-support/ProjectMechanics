/**
 * Sitemap generator for Project Mechanics
 * Creates sitemap.xml for all routes with proper SEO metadata
 */

import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(__dirname, '../../docs');

const BASE_URL = 'https://sharesmallbiz-support.github.io/ProjectMechanics';
const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// Route configuration - must match routes in App.tsx and prerender.js
const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'monthly',
  },
  {
    path: '/methodology.html',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/project-management.html',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/portfolio-management.html',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/change-management.html',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/conflict-management.html',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/leadership.html',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/glossary.html',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/history.html',
    priority: '0.6',
    changefreq: 'yearly',
  },
];

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const urlEntries = routes.map(route => {
    const loc = route.path === '/' 
      ? BASE_URL 
      : `${BASE_URL}${route.path}`;
    
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

/**
 * Main function
 */
async function generateSitemapFile() {
  console.log('🗺️  Generating sitemap.xml...\n');

  try {
    const sitemap = generateSitemap();
    const outputPath = resolve(docsDir, 'sitemap.xml');
    
    await writeFile(outputPath, sitemap, 'utf-8');
    
    console.log('✨ Sitemap generated successfully!');
    console.log('📁 Location:', outputPath);
    console.log('📄 URLs included:', routes.length);
    console.log('\n📋 Sitemap entries:');
    routes.forEach(route => {
      const url = route.path === '/' ? BASE_URL : `${BASE_URL}${route.path}`;
      console.log(`   - ${url} (priority: ${route.priority})`);
    });
    console.log('\n✓ Submit this sitemap to Google Search Console and Bing Webmaster Tools');
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemapFile();
