import type { Metadata } from "next";

/**
 * SEO Metadata Configuration for Next.js
 * Defines unique titles, descriptions, and Open Graph data for all pages
 */

const BASE_URL = "https://sharesmallbiz-support.github.io/ProjectMechanics";

export interface PageMetadataConfig {
  title: string;
  description: string;
  keywords: string[];
}

export const pageMetadata: Record<string, PageMetadataConfig> = {
  home: {
    title: "Project Mechanics - Project Management Methodology & Resources",
    description:
      "Comprehensive project management methodology covering project lifecycle, portfolio management, change management, conflict resolution, and leadership principles.",
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
    title: "Project Management Methodology",
    description:
      "Explore our structured approach to project management, including frameworks for portfolio management, change management, conflict resolution, and leadership development.",
    keywords: [
      "project management methodology",
      "project framework",
      "management approach",
      "project domains",
    ],
  },

  projectManagement: {
    title: "Project Management - Lifecycle, Planning & Execution",
    description:
      "Master the project management lifecycle from initiation through closure. Learn proven techniques for planning, execution, monitoring, and delivering successful projects.",
    keywords: [
      "project lifecycle",
      "project planning",
      "project execution",
      "project monitoring",
      "project closure",
    ],
  },

  portfolioManagement: {
    title: "Portfolio Management - Strategic Project Selection",
    description:
      "Optimize your project portfolio with strategic selection, prioritization, and resource allocation techniques. Align projects with organizational goals and maximize ROI.",
    keywords: [
      "portfolio management",
      "project prioritization",
      "resource allocation",
      "strategic planning",
      "portfolio optimization",
    ],
  },

  changeManagement: {
    title: "Change Management - Leading Organizational Transformation",
    description:
      "Navigate organizational change effectively with proven change management strategies, stakeholder engagement techniques, and transformation leadership principles.",
    keywords: [
      "change management",
      "organizational change",
      "transformation",
      "change leadership",
      "stakeholder management",
    ],
  },

  conflictManagement: {
    title: "Conflict Management - Resolution Strategies for Teams",
    description:
      "Resolve team conflicts constructively with proven conflict management techniques. Learn negotiation, mediation, and collaborative problem-solving strategies.",
    keywords: [
      "conflict resolution",
      "conflict management",
      "team dynamics",
      "negotiation",
      "mediation",
    ],
  },

  leadership: {
    title: "Project Leadership - Team Building & Communication",
    description:
      "Develop essential leadership skills for project success. Master team building, effective communication, motivation, and creating high-performance project teams.",
    keywords: [
      "project leadership",
      "team building",
      "leadership skills",
      "team management",
      "effective communication",
    ],
  },

  glossary: {
    title: "Project Management Glossary - Terms & Definitions",
    description:
      "Comprehensive glossary of project management terms, definitions, and concepts. Quick reference guide for project management terminology and industry vocabulary.",
    keywords: [
      "project management glossary",
      "PM terminology",
      "project management terms",
      "definitions",
      "vocabulary",
    ],
  },

  history: {
    title: "Project Mechanics History - Methodology Evolution",
    description:
      "Explore the evolution of Project Mechanics methodology from 2004 to present. Learn about our journey in developing comprehensive project management frameworks.",
    keywords: [
      "project mechanics history",
      "methodology evolution",
      "project management history",
      "framework development",
    ],
  },
};

/**
 * Generate Next.js Metadata object for a page
 */
export function generateMetadata(pageKey: keyof typeof pageMetadata): Metadata {
  const config = pageMetadata[pageKey] || pageMetadata.home;

  // Generate canonical URL
  const pageUrls: Record<string, string> = {
    home: "/",
    methodology: "/methodology",
    projectManagement: "/project-management",
    portfolioManagement: "/portfolio-management",
    changeManagement: "/change-management",
    conflictManagement: "/conflict-management",
    leadership: "/leadership",
    glossary: "/glossary",
    history: "/history",
  };

  const canonicalPath = pageUrls[pageKey] || "/";
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      type: "website",
      siteName: "Project Mechanics",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
  };
}
