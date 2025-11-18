import { useEffect, useState } from 'react';
import { getContentMetadata } from '../utils/contentLoader';

export default function MarkdownRenderer({ slug }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const metadata = getContentMetadata(slug);

  useEffect(() => {
    // Load markdown content
    async function loadContent() {
      try {
        setLoading(true);
        const response = await fetch(`/src/content/${slug}.md`);
        if (!response.ok) {
          // Try alternative filename format
          const altResponse = await fetch(`/src/content/projectmechanics-${slug}.md`);
          if (altResponse.ok) {
            const text = await altResponse.text();
            // Remove frontmatter
            const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n/, '');
            setContent(contentWithoutFrontmatter);
          } else {
            setContent('Content not found.');
          }
        } else {
          const text = await response.text();
          // Remove frontmatter
          const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n/, '');
          setContent(contentWithoutFrontmatter);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        setContent('Error loading content.');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Simple markdown to HTML converter (basic implementation)
  const convertMarkdown = (md) => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline">$1</a>');

    // Lists
    html = html.replace(/^\* (.+)$/gim, '<li class="ml-6 mb-2">$1</li>');
    html = html.replace(/^- (.+)$/gim, '<li class="ml-6 mb-2">$1</li>');
    html = html.replace(/(<li class="ml-6 mb-2">.*<\/li>\n?)+/g, '<ul class="list-disc mb-4">$&</ul>');

    // Paragraphs
    html = html.split('\n\n').map(para => {
      if (para.trim() && !para.startsWith('<')) {
        return `<p class="text-gray-700 leading-relaxed mb-4">${para.trim()}</p>`;
      }
      return para;
    }).join('\n');

    return html;
  };

  return (
    <article
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
    />
  );
}
