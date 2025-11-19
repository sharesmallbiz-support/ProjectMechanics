import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Content metadata from contentLoader
const contentMetadata = {
  'overview': { title: 'Project Mechanics Overview', slug: 'overview' },
  'project-life-cycle': { title: 'Project Life Cycle', slug: 'project-life-cycle' },
  'project-meetings': { title: 'Effective Project Meetings', slug: 'project-meetings' },
  'program-management-office': { title: 'PMO Best Practices', slug: 'program-management-office' },
  'leadership-skills': { title: 'Leadership Skills for Project Managers', slug: 'leadership-skills' },
  'leadership-accountability-and-authority': { title: 'Leadership: Accountability and Authority', slug: 'leadership-accountability-and-authority' },
  'leadership-evolution-over-revolution': { title: 'Leadership: Evolution Over Revolution', slug: 'leadership-evolution-over-revolution' },
  'leadership-from-features-to-outcomes': { title: 'Leadership: From Features to Outcomes', slug: 'leadership-from-features-to-outcomes' },
  'change-management-strategies': { title: 'Change Management Strategies', slug: 'change-management-strategies' },
  'change-management-issue-management': { title: 'Change Management: Issue Management', slug: 'change-management-issue-management' },
  'conflict-management-strategies': { title: 'Conflict Resolution for Project Teams', slug: 'conflict-management-strategies' },
  'solution-architect-technology-decisions-that-impact-business': { title: 'Solution Architecture', slug: 'solution-architect-technology-decisions-that-impact-business' }
};

function generateSitemap() {
  const baseUrl = 'https://projectmechanics.com'; // Update with your actual domain
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    // Homepage
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0'
    },
    // Document Agent
    {
      loc: `${baseUrl}/document-agent`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9'
    },
    // All methodology pages
    ...Object.values(contentMetadata).map(item => ({
      loc: `${baseUrl}/${item.slug}`,
      lastmod: today,
      changefreq: 'monthly',
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

// Generate and write sitemap
const sitemap = generateSitemap();
const distPath = path.join(__dirname, '../dist/sitemap.xml');
const publicPath = path.join(__dirname, '../public/sitemap.xml');

// Write to both public (for dev) and dist (for production)
fs.writeFileSync(publicPath, sitemap);
console.log('✅ Generated sitemap.xml in public/');

// Check if dist exists and write there too
if (fs.existsSync(path.join(__dirname, '../dist'))) {
  fs.writeFileSync(distPath, sitemap);
  console.log('✅ Generated sitemap.xml in dist/');
}
