import { getAllContentMetadata } from '../contentLoader.js';

/**
 * Generate sitemap.xml for SEO
 * This should be run during build or as a post-build step
 */
export function generateSitemap() {
  const baseUrl = 'https://projectmechanics.com'; // Update with your actual domain
  const allContent = getAllContentMetadata();

  const urls = [
    // Homepage
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0'
    },
    // Document Agent
    {
      loc: `${baseUrl}/document-agent`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.9'
    },
    // All methodology pages
    ...allContent
      .filter(item => item.slug !== 'index')
      .map(item => ({
        loc: `${baseUrl}/${item.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: item.slug.includes('project-life-cycle') || item.slug.includes('leadership') ? 'monthly' : 'monthly',
        priority: item.slug.includes('project-life-cycle') || item.slug.includes('overview') ? '0.9' : '0.8'
      }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

/**
 * Generate JSON-LD structured data for a page
 */
export function getStructuredData(pageType = 'article', metadata = {}) {
  const baseUrl = 'https://projectmechanics.com';

  if (pageType === 'homepage') {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Project Mechanics",
      "url": baseUrl,
      "description": metadata.description || "Effective project management methodology for software development",
      "publisher": {
        "@type": "Person",
        "name": "Mark Hazleton",
        "url": "https://markhazleton.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metadata.title,
    "description": metadata.description,
    "author": {
      "@type": "Person",
      "name": metadata.author || "Mark Hazleton",
      "url": "https://markhazleton.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Mark Hazleton"
    },
    "datePublished": metadata.date || new Date().toISOString(),
    "dateModified": metadata.modified || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${metadata.slug || ''}`
    },
    "keywords": metadata.keywords || '',
    "articleSection": metadata.category || "Project Management",
    "inLanguage": "en-US"
  };
}

export default { generateSitemap, getStructuredData };
