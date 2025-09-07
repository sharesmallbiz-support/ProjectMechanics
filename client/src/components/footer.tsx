import { Cog } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Methodology",
      links: [
        { name: "Art vs Mechanics", href: "#" },
        { name: "Communication Framework", href: "#" },
        { name: "PMI Integration", href: "#" },
        { name: "Best Practices", href: "#" }
      ]
    },
    {
      title: "Tools", 
      links: [
        { name: "PMO Dashboard", href: "#" },
        { name: "Project Tracking", href: "#" },
        { name: "Task Management", href: "#" },
        { name: "Reporting Tools", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Training Materials", href: "#" },
        { name: "Blog Posts", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "YouTube", icon: "📺", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" }
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div data-testid="footer-brand">
            <div className="flex items-center mb-6">
              <Cog className="text-2xl mr-3" />
              <h3 className="text-xl font-bold" data-testid="text-footer-brand">Project Mechanics</h3>
            </div>
            <p className="text-muted mb-6" data-testid="text-footer-description">
              Mastering the art and science of project management through proven methodology and innovative tools.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-muted hover:text-background transition-colors"
                  data-testid={`link-social-${social.name.toLowerCase()}`}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index} data-testid={`footer-section-${section.title.toLowerCase()}`}>
              <h4 className="font-semibold mb-4" data-testid={`text-footer-section-title-${index}`}>
                {section.title}
              </h4>
              <ul className="space-y-2 text-muted">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="hover:text-background transition-colors"
                      data-testid={`link-footer-${section.title.toLowerCase()}-${linkIndex}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-muted/20 mt-12 pt-8 text-center text-muted">
          <p data-testid="text-footer-copyright">
            &copy; 2024 Project Mechanics. All rights reserved. | Created by Mark Hazleton
          </p>
        </div>
      </div>
    </footer>
  );
}
