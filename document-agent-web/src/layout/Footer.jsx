import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Overview', href: '/overview' },
    { name: 'Project Life Cycle', href: '/project-life-cycle' },
    { name: 'Leadership Skills', href: '/leadership-skills' },
    { name: 'Change Management', href: '/change-management-strategies' },
    { name: 'Conflict Management', href: '/conflict-management-strategies' },
    { name: 'Document Agent', href: '/document-agent' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              About Project Mechanics
            </h3>
            <p className="text-sm text-gray-600">
              A proven methodology combining structured project management techniques
              with adaptive problem-solving for software development success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://markhazleton.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Mark's Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/markhazleton/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/markhazleton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            &copy; {currentYear} Mark Hazleton. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
