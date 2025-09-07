import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ClipboardList, PenTool, Check } from "lucide-react";

export function DomainOverview() {
  const domains = [
    {
      icon: Lightbulb,
      title: "Project Management Methodology",
      description: "Discover the core principles of Project Mechanics, combining the art of communication with the science of structured project management.",
      features: [
        "Art vs Mechanics Framework",
        "PMI Framework Integration", 
        "Communication Strategies",
        "Resource Materials"
      ],
      buttonText: "Explore Methodology",
      testId: "card-methodology"
    },
    {
      icon: ClipboardList,
      title: "PMO Application",
      description: "Comprehensive project management office application with program management, task tracking, and status reporting capabilities.",
      features: [
        "Programs & Projects Dashboard",
        "Task Management System",
        "Status Reporting Tools", 
        "Media Integration"
      ],
      buttonText: "Access PMO Tools",
      testId: "card-pmo"
    },
    {
      icon: PenTool,
      title: "Blog Engine",
      description: "Rich content management system for sharing project management insights, case studies, and best practices with integrated media support.",
      features: [
        "Rich Text Editor",
        "Category Management",
        "YouTube Integration",
        "Unsplash Photos"
      ],
      buttonText: "Start Writing",
      testId: "card-blog"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-domain-title">
            Three Integrated Domains
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-domain-description">
            Project Mechanics provides a comprehensive ecosystem for project management, from methodology to execution and knowledge sharing.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => (
            <Card key={index} className="domain-card bg-card rounded-xl p-8 border border-border" data-testid={domain.testId}>
              <CardContent className="p-0">
                <div className="text-primary text-4xl mb-6">
                  <domain.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4" data-testid={`text-${domain.testId}-title`}>
                  {domain.title}
                </h3>
                <p className="text-muted-foreground mb-6" data-testid={`text-${domain.testId}-description`}>
                  {domain.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {domain.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm" data-testid={`text-${domain.testId}-feature-${featureIndex}`}>
                      <Check className="text-primary mr-2 h-4 w-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors w-full"
                  data-testid={`button-${domain.testId}`}
                >
                  {domain.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
