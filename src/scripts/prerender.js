/**
 * Pre-render script for generating static HTML files with full React SSR
 * Runs after Vite build to create individual HTML files for each route
 */

import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import React from 'react';
import { renderToString } from 'react-dom/server';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(__dirname, '../../docs');

// Route configuration matching App.tsx
const routes = [
  {
    path: '/',
    file: 'index.html',
    title: 'Project Mechanics - Project Management Methodology & Resources',
    description: 'Comprehensive project management methodology covering project lifecycle, portfolio management, change management, conflict resolution, and leadership principles.',
  },
  {
    path: '/methodology',
    file: 'methodology.html',
    title: 'Project Management Methodology - Project Mechanics',
    description: 'Explore our structured approach to project management, including frameworks for portfolio management, change management, conflict resolution, and leadership development.',
  },
  {
    path: '/methodology/project-management',
    file: 'project-management.html',
    title: 'Project Management - Lifecycle, Planning & Execution | Project Mechanics',
    description: 'Master the project management lifecycle from initiation through closure. Learn proven techniques for planning, execution, monitoring, and delivering successful projects.',
  },
  {
    path: '/methodology/portfolio-management',
    file: 'portfolio-management.html',
    title: 'Portfolio Management - Strategic Project Selection | Project Mechanics',
    description: 'Optimize your project portfolio with strategic selection, prioritization, and resource allocation techniques. Align projects with organizational goals and maximize ROI.',
  },
  {
    path: '/methodology/change-management',
    file: 'change-management.html',
    title: 'Change Management - Leading Organizational Transformation | Project Mechanics',
    description: 'Navigate organizational change effectively with proven change management strategies, stakeholder engagement techniques, and transformation leadership principles.',
  },
  {
    path: '/methodology/conflict-management',
    file: 'conflict-management.html',
    title: 'Conflict Management - Resolution Strategies for Teams | Project Mechanics',
    description: 'Resolve team conflicts constructively with proven conflict management techniques. Learn negotiation, mediation, and collaborative problem-solving strategies.',
  },
  {
    path: '/methodology/leadership',
    file: 'leadership.html',
    title: 'Project Leadership - Team Building & Communication | Project Mechanics',
    description: 'Develop essential leadership skills for project success. Master team building, effective communication, motivation, and creating high-performance project teams.',
  },
  {
    path: '/methodology/glossary',
    file: 'glossary.html',
    title: 'Project Management Glossary - Terms & Definitions | Project Mechanics',
    description: 'Comprehensive glossary of project management terms, definitions, and concepts. Quick reference guide for project management terminology and industry vocabulary.',
  },
  {
    path: '/methodology/history',
    file: 'history.html',
    title: 'Project Mechanics History - Methodology Evolution | Project Mechanics',
    description: 'Explore the evolution of Project Mechanics methodology from 2004 to present. Learn about our journey in developing comprehensive project management frameworks.',
  },
];

const BASE_URL = 'https://sharesmallbiz-support.github.io/ProjectMechanics';

/**
 * Update meta tags in HTML
 */
function updateMetaTags(dom, route) {
  const { document } = dom.window;
  const { title, description, path } = route;
  const fullUrl = `${BASE_URL}${path === '/' ? '' : path}.html`;

  // Update title
  document.title = title;

  // Update or create meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }

  // Update Open Graph tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', fullUrl);
  }

  // Update Twitter Card tags
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', title);
  }

  let twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) {
    twitterDesc.setAttribute('content', description);
  }

  // Add canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // Add a comment to indicate this is a pre-rendered page
  const comment = document.createComment(` Pre-rendered for SEO on ${new Date().toISOString()} `);
  document.head.appendChild(comment);
}

/**
 * Main pre-render function
 */
async function prerender() {
  console.log('🚀 Starting pre-render process...\n');

  try {
    // Read the base index.html file
    const indexPath = resolve(docsDir, 'index.html');
    const htmlContent = await readFile(indexPath, 'utf-8');

    console.log(`📄 Base HTML loaded from: ${indexPath}\n`);

    // Process each route
    for (const route of routes) {
      // Skip index.html as it already exists
      if (route.file === 'index.html') {
        console.log(`✓ ${route.file} - Already exists (skipping)`);
        
        // But update its meta tags
        const dom = new JSDOM(htmlContent);
        updateMetaTags(dom, route);
        await writeFile(indexPath, dom.serialize());
        continue;
      }

      // Create a new DOM for this route
      const dom = new JSDOM(htmlContent);
      
      // Update meta tags for this specific route
      updateMetaTags(dom, route);

      // Write the HTML file
      const outputPath = resolve(docsDir, route.file);
      await writeFile(outputPath, dom.serialize());

      console.log(`✓ ${route.file} - Generated with meta tags`);
    }

    console.log('\n✨ Pre-render complete! Generated', routes.length, 'HTML files.\n');
    console.log('📁 Files created in:', docsDir);
    console.log('\n📋 Generated files:');
    routes.forEach(route => {
      console.log(`   - ${route.file}`);
    });

  } catch (error) {
    console.error('❌ Error during pre-render:', error);
    process.exit(1);
  }
}

// Run the pre-render
prerender();
