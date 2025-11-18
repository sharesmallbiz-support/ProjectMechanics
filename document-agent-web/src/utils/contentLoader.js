/**
 * Content loader utility for markdown files
 * Maps slugs to content files and metadata
 */

// Content metadata extracted from markdown frontmatter
export const contentMetadata = {
  'index': {
    title: 'Project Mechanics',
    description: 'Master project management with Project Mechanics - a proven methodology combining structured techniques and adaptive problem-solving for software development success.',
    keywords: 'project management methodology, project mechanics, software project management, PMI, PMP',
    author: 'Mark Hazleton',
    slug: 'index'
  },
  'overview': {
    title: 'Project Mechanics Overview',
    description: 'An introduction to Project Mechanics methodology - combining art and science of project management for successful software delivery.',
    keywords: 'project mechanics, project management framework, software development methodology',
    slug: 'overview'
  },
  'project-life-cycle': {
    title: 'Project Life Cycle: 7 Stages of Project Management',
    description: 'Understand the complete project life cycle from initiation to closure. Learn the 7 stages of effective project management.',
    keywords: 'project life cycle, project phases, project stages, PPM',
    slug: 'project-life-cycle'
  },
  'project-meetings': {
    title: 'Effective Project Meetings',
    description: 'Run more effective project meetings with proven strategies to boost team productivity.',
    keywords: 'project meetings, effective meetings, team productivity',
    slug: 'project-meetings'
  },
  'program-management-office': {
    title: 'PMO Best Practices: Program Management Office',
    description: 'Establish a high-performing Program Management Office with best practices for governance.',
    keywords: 'PMO, program management office, project governance',
    slug: 'program-management-office'
  },
  'leadership-skills': {
    title: 'Leadership Skills for Project Managers',
    description: 'Develop essential leadership skills for project success including emotional intelligence and team motivation.',
    keywords: 'project management leadership, leadership skills, PM leadership',
    slug: 'leadership-skills'
  },
  'leadership-accountability-and-authority': {
    title: 'Leadership: Accountability and Authority',
    description: 'Understanding the balance between accountability and authority in project leadership.',
    keywords: 'leadership, accountability, authority, project management',
    slug: 'leadership-accountability-and-authority'
  },
  'leadership-evolution-over-revolution': {
    title: 'Leadership: Evolution Over Revolution',
    description: 'Leading change through evolutionary rather than revolutionary approaches.',
    keywords: 'leadership, change management, evolution, project strategy',
    slug: 'leadership-evolution-over-revolution'
  },
  'leadership-from-features-to-outcomes': {
    title: 'Leadership: From Features to Outcomes',
    description: 'Shifting focus from feature delivery to outcome achievement in project leadership.',
    keywords: 'leadership, outcomes, features, product management',
    slug: 'leadership-from-features-to-outcomes'
  },
  'change-management-strategies': {
    title: 'Change Management Strategies for Projects',
    description: 'Master project change management with proven strategies for managing changes effectively.',
    keywords: 'change management, project change management, change control',
    slug: 'change-management-strategies'
  },
  'change-management-issue-management': {
    title: 'Change Management: Issue Management',
    description: 'Effective strategies for managing issues within change management processes.',
    keywords: 'change management, issue management, project issues',
    slug: 'change-management-issue-management'
  },
  'conflict-management-strategies': {
    title: 'Conflict Resolution for Project Teams',
    description: 'Essential strategies for managing conflicts in project teams to improve dynamics and productivity.',
    keywords: 'conflict management, conflict resolution, team conflict',
    slug: 'conflict-management-strategies'
  },
  'solution-architect-technology-decisions-that-impact-business': {
    title: 'Solution Architecture: Technology Decisions',
    description: 'Make better technology decisions as a solution architect and understand business impact.',
    keywords: 'solution architect, technology decisions, architecture decisions',
    slug: 'solution-architect-technology-decisions-that-impact-business'
  }
};

// Get metadata for a specific slug
export function getContentMetadata(slug) {
  return contentMetadata[slug] || {
    title: 'Project Mechanics',
    description: 'Project management methodology and best practices',
    keywords: 'project management',
    slug: slug
  };
}

// Get all content metadata for sitemap generation
export function getAllContentMetadata() {
  return Object.values(contentMetadata);
}

// Get navigation items for homepage cards
export function getNavigationCards() {
  const cardOrder = [
    'overview',
    'project-life-cycle',
    'project-meetings',
    'program-management-office',
    'leadership-skills',
    'change-management-strategies',
    'conflict-management-strategies',
    'solution-architect-technology-decisions-that-impact-business'
  ];

  return cardOrder.map(slug => contentMetadata[slug]).filter(Boolean);
}
