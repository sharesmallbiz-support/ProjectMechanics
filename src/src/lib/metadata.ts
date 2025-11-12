/**
 * SEO Metadata Configuration
 * Defines unique titles, descriptions, and Open Graph data for all pages
 */

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
}

const BASE_URL = "https://sharesmallbiz-support.github.io/ProjectMechanics";

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: "Project Mechanics - Project Management Methodology & Resources",
    description:
      "Comprehensive project management methodology covering project lifecycle, portfolio management, change management, conflict resolution, and leadership principles.",
    path: "/",
    keywords: [
      "project management",
      "methodology",
      "portfolio management",
      "change management",
      "leadership",
      "project lifecycle",
    ],
  },

  methodology: {
    title: "Project Management Methodology - Project Mechanics",
    description:
      "Explore our structured approach to project management, including frameworks for portfolio management, change management, conflict resolution, and leadership development.",
    path: "/methodology",
    keywords: [
      "project management methodology",
      "project framework",
      "management approach",
      "project domains",
    ],
  },

  projectManagement: {
    title:
      "Project Management - Lifecycle, Planning & Execution | Project Mechanics",
    description:
      "Master the project management lifecycle from initiation through closure. Learn proven techniques for planning, execution, monitoring, and delivering successful projects.",
    path: "/methodology/project-management",
    keywords: [
      "project lifecycle",
      "project planning",
      "project execution",
      "project monitoring",
      "project closure",
    ],
  },

  portfolioManagement: {
    title:
      "Portfolio Management - Strategic Project Selection | Project Mechanics",
    description:
      "Optimize your project portfolio with strategic selection, prioritization, and resource allocation techniques. Align projects with organizational goals and maximize ROI.",
    path: "/methodology/portfolio-management",
    keywords: [
      "portfolio management",
      "project prioritization",
      "resource allocation",
      "strategic planning",
      "portfolio optimization",
    ],
  },

  changeManagement: {
    title:
      "Change Management - Leading Organizational Transformation | Project Mechanics",
    description:
      "Navigate organizational change effectively with proven change management strategies, stakeholder engagement techniques, and transformation leadership principles.",
    path: "/methodology/change-management",
    keywords: [
      "change management",
      "organizational change",
      "transformation",
      "change leadership",
      "stakeholder management",
    ],
  },

  conflictManagement: {
    title:
      "Conflict Management - Resolution Strategies for Teams | Project Mechanics",
    description:
      "Resolve team conflicts constructively with proven conflict management techniques. Learn negotiation, mediation, and collaborative problem-solving strategies.",
    path: "/methodology/conflict-management",
    keywords: [
      "conflict resolution",
      "conflict management",
      "team dynamics",
      "negotiation",
      "mediation",
    ],
  },

  leadership: {
    title:
      "Project Leadership - Team Building & Communication | Project Mechanics",
    description:
      "Develop essential leadership skills for project success. Master team building, effective communication, motivation, and creating high-performance project teams.",
    path: "/methodology/leadership",
    keywords: [
      "project leadership",
      "team building",
      "leadership skills",
      "team management",
      "effective communication",
    ],
  },

  glossary: {
    title:
      "Project Management Glossary - Terms & Definitions | Project Mechanics",
    description:
      "Comprehensive glossary of project management terms, definitions, and concepts. Quick reference guide for project management terminology and industry vocabulary.",
    path: "/methodology/glossary",
    keywords: [
      "project management glossary",
      "PM terminology",
      "project management terms",
      "definitions",
      "vocabulary",
    ],
  },

  history: {
    title:
      "Project Mechanics History - Methodology Evolution | Project Mechanics",
    description:
      "Explore the evolution of Project Mechanics methodology from 2004 to present. Learn about our journey in developing comprehensive project management frameworks.",
    path: "/methodology/history",
    keywords: [
      "project mechanics history",
      "methodology evolution",
      "project management history",
      "framework development",
    ],
  },
};

/**
 * Get metadata for a specific page
 */
export function getPageMetadata(
  pageKey: keyof typeof pageMetadata
): PageMetadata {
  return pageMetadata[pageKey] || pageMetadata.home;
}

/**
 * Get full URL for a page
 */
export function getPageUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

/**
 * Update document head with page-specific metadata
 */
export function updatePageMetadata(pageKey: keyof typeof pageMetadata): void {
  const metadata = getPageMetadata(pageKey);
  const fullUrl = getPageUrl(metadata.path);

  // Update title
  document.title = metadata.title;

  // Update or create meta description
  updateMetaTag("name", "description", metadata.description);

  // Update or create Open Graph tags
  updateMetaTag("property", "og:title", metadata.ogTitle || metadata.title);
  updateMetaTag(
    "property",
    "og:description",
    metadata.ogDescription || metadata.description
  );
  updateMetaTag("property", "og:url", fullUrl);
  updateMetaTag("property", "og:type", "website");

  // Update or create Twitter Card tags
  updateMetaTag("name", "twitter:card", "summary_large_image");
  updateMetaTag("name", "twitter:title", metadata.ogTitle || metadata.title);
  updateMetaTag(
    "name",
    "twitter:description",
    metadata.ogDescription || metadata.description
  );

  // Update or create canonical link
  updateCanonicalLink(fullUrl);

  // Update or create keywords (optional, low SEO value but doesn't hurt)
  if (metadata.keywords && metadata.keywords.length > 0) {
    updateMetaTag("name", "keywords", metadata.keywords.join(", "));
  }
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(attribute: string, key: string, content: string): void {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

/**
 * Helper function to update or create canonical link
 */
function updateCanonicalLink(url: string): void {
  let element = document.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}
