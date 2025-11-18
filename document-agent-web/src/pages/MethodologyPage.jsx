import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getContentMetadata } from '../utils/contentLoader';
import MarkdownRenderer from '../layout/MarkdownRenderer';
import { useEffect } from 'react';

export default function MethodologyPage() {
  const { slug } = useParams();
  const metadata = getContentMetadata(slug);

  // Update page title and meta tags for SEO
  useEffect(() => {
    document.title = `${metadata.title} | Project Mechanics`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', metadata.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = metadata.keywords;
      document.head.appendChild(meta);
    }
  }, [metadata]);

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </nav>

        {/* Page Header */}
        <header className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {metadata.title}
          </h1>
          <p className="text-xl text-gray-600">
            {metadata.description}
          </p>
        </header>

        {/* Content */}
        <MarkdownRenderer slug={slug} />

        {/* Back to Top / Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all topics
          </Link>
        </div>
      </div>
    </div>
  );
}
