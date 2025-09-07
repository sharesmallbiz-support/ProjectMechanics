import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Check, FileText, FileSpreadsheet, Presentation, File } from "lucide-react";
import { METHODOLOGY_CONTENT } from "@/lib/constants";

export function ResourcesSection() {
  const { constituencies, pmiFramework } = METHODOLOGY_CONTENT;

  const downloadResources = [
    {
      icon: FileText,
      title: "Project Mechanics Guide",
      description: "Complete methodology overview",
      format: "PDF",
      color: "text-red-600"
    },
    {
      icon: FileSpreadsheet,
      title: "Project Templates", 
      description: "Ready-to-use project templates",
      format: "Excel",
      color: "text-green-600"
    },
    {
      icon: Presentation,
      title: "Training Slides",
      description: "Team training presentations", 
      format: "PPT",
      color: "text-orange-600"
    },
    {
      icon: File,
      title: "Checklist Templates",
      description: "Project milestone checklists",
      format: "DOC", 
      color: "text-blue-600"
    }
  ];

  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-resources-title">
            Resources & Materials
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-resources-description">
            Access comprehensive resources, templates, and materials to implement Project Mechanics in your organization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* PMI Framework Integration */}
          <Card className="bg-card rounded-xl p-8 border border-border">
            <CardContent className="p-0">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Award className="text-primary h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" data-testid="text-pmi-title">PMI Framework Integration</h3>
                  <p className="text-muted-foreground">Professional alignment with industry standards</p>
                </div>
              </div>
              <blockquote className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary mb-6">
                <p className="text-foreground italic mb-4" data-testid="text-pmi-quote">
                  "{pmiFramework.quote}"
                </p>
                <cite className="text-muted-foreground">— PMI Guide to the Project Management Body of Knowledge (PMBOK® Guide)</cite>
              </blockquote>
              <div className="space-y-3">
                {pmiFramework.processes.map((process, index) => (
                  <div key={index} className="flex items-center" data-testid={`pmi-process-${index}`}>
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>{process}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Three Constituencies */}
          <Card className="bg-card rounded-xl p-8 border border-border">
            <CardContent className="p-0">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Users className="text-primary h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" data-testid="text-constituencies-title">Three Key Constituencies</h3>
                  <p className="text-muted-foreground">Essential communication framework</p>
                </div>
              </div>
              <div className="space-y-6">
                {constituencies.map((constituency, index) => (
                  <div 
                    key={index}
                    className={`bg-${constituency.color}-50 p-4 rounded-lg`}
                    data-testid={`card-constituency-${constituency.name.toLowerCase()}`}
                  >
                    <h4 className={`font-semibold text-${constituency.color}-900 mb-2`} data-testid={`text-constituency-${constituency.name.toLowerCase()}-name`}>
                      {constituency.name}
                    </h4>
                    <p className={`text-${constituency.color}-800`} data-testid={`text-constituency-${constituency.name.toLowerCase()}-description`}>
                      {constituency.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Downloadable Resources */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-downloads-title">
            Downloadable Resources
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloadResources.map((resource, index) => (
              <Card key={index} className="bg-card rounded-lg p-6 border border-border text-center hover:shadow-lg transition-shadow" data-testid={`card-resource-${index}`}>
                <CardContent className="p-0">
                  <resource.icon className={`${resource.color} text-3xl mb-4 h-12 w-12 mx-auto`} />
                  <h4 className="font-semibold mb-2" data-testid={`text-resource-title-${index}`}>
                    {resource.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`text-resource-description-${index}`}>
                    {resource.description}
                  </p>
                  <Button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors" data-testid={`button-download-${index}`}>
                    Download {resource.format}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
