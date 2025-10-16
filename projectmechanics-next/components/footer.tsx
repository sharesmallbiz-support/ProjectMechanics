import Link from "next/link";
import { Cog } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Learn",
      links: [
        { name: "Methodology Overview", href: "/methodology" },
        { name: "Project Management", href: "/project-management" },
        { name: "Portfolio Management", href: "/portfolio-management" },
        { name: "Leadership", href: "/leadership" }
      ]
    },
    {
      title: "Resources", 
      links: [
        { name: "Glossary", href: "/glossary" },
        { name: "History", href: "/history" },
        { name: "Change Management", href: "/change-management" },
        { name: "Conflict Management", href: "/conflict-management" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "YouTube Channel", href: "https://www.youtube.com/channel/UCWy4-89rNbDI_HGUCB8pkBA" },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/project-mechanics/" },
        { name: "GitHub", href: "https://github.com/sharesmallbiz-support/ProjectMechanics" }
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div data-testid="footer-brand">
            <div className="flex items-center mb-6">
              <Cog className="text-2xl mr-3" />
              <h3 className="text-xl font-bold" data-testid="text-footer-brand">
                Project Mechanics
              </h3>
            </div>
            <p className="text-muted mb-6" data-testid="text-footer-description">
              A static educational resource for project management methodology built from real-world experience. 
              Free, open access to frameworks and best practices — no login, no tracking, just knowledge.
            </p>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index} data-testid={`footer-section-${section.title.toLowerCase()}`}>
              <h4 className="font-semibold mb-4" data-testid={`text-footer-section-title-${index}`}>
                {section.title}
              </h4>
              <ul className="space-y-2 text-muted">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('http') ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-background transition-colors"
                        data-testid={`link-footer-${section.title.toLowerCase()}-${linkIndex}`}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        href={link.href}
                        className="hover:text-background transition-colors"
                        data-testid={`link-footer-${section.title.toLowerCase()}-${linkIndex}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-muted/20 mt-12 pt-8 text-center text-muted">
          <p data-testid="text-footer-copyright">
            &copy; 2025 Project Mechanics. All rights reserved. | Created by Mark Hazleton
          </p>
        </div>
      </div>
    </footer>
  );
}
