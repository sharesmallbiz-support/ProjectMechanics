import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProjectManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/methodology">
              <Button variant="outline" className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20" data-testid="button-back-to-methodology">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Methodology
              </Button>
            </Link>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-project-management-hero-title">
              Project <span className="text-yellow-300">Management</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-project-management-hero-description">
              Master the fundamental principles of project management, from initiation through closure, using proven methodologies and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-core-principles-title">
              Core Project Management Principles
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-core-principles-description">
              Effective project management relies on fundamental principles that guide successful project execution from start to finish.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4" data-testid="text-planning-title">Project Planning & Initiation</h3>
                <p className="text-muted-foreground mb-6" data-testid="text-planning-description">
                  Proper planning sets the foundation for project success. This includes defining scope, objectives, timelines, and resource requirements.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Clear scope definition and requirements gathering</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Stakeholder identification and analysis</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Risk assessment and mitigation planning</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Resource allocation and timeline development</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4" data-testid="text-execution-title">Execution & Monitoring</h3>
                <p className="text-muted-foreground mb-6" data-testid="text-execution-description">
                  Successful execution requires continuous monitoring, communication, and adaptive management to keep projects on track.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Regular progress tracking and reporting</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Quality assurance and control measures</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Change management and scope control</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-green-600 mr-3 h-5 w-5" />
                    <span>Team coordination and communication</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Phases Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-project-phases-title">
              Project Management Phases
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-project-phases-description">
              Every successful project follows a structured approach through distinct phases, each with specific objectives and deliverables.
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                phase: "Initiation",
                description: "Define project purpose, objectives, and high-level scope. Identify stakeholders and obtain project authorization.",
                keyActivities: ["Business case development", "Stakeholder identification", "Project charter creation", "Initial risk assessment"]
              },
              {
                phase: "Planning", 
                description: "Develop comprehensive project plans, including scope, schedule, budget, quality, resources, and communication plans.",
                keyActivities: ["Detailed scope definition", "Work breakdown structure", "Schedule development", "Budget planning"]
              },
              {
                phase: "Execution",
                description: "Coordinate people and resources to carry out the project plan and produce deliverables.",
                keyActivities: ["Team management", "Quality assurance", "Information distribution", "Progress monitoring"]
              },
              {
                phase: "Monitoring & Control",
                description: "Track, review, and regulate project progress and performance to identify variances from the project plan.",
                keyActivities: ["Performance measurement", "Change control", "Risk monitoring", "Quality control"]
              },
              {
                phase: "Closure",
                description: "Finalize all project activities, complete deliverables, and formally close the project.",
                keyActivities: ["Final deliverable acceptance", "Project documentation", "Lessons learned", "Resource release"]
              }
            ].map((phase, index) => (
              <Card key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`project-phase-${index}`}>
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg mr-4">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold" data-testid={`phase-name-${index}`}>
                          {phase.phase}
                        </h3>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground mb-4" data-testid={`phase-description-${index}`}>
                        {phase.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Key Activities:</h4>
                      <div className="space-y-2">
                        {phase.keyActivities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-center" data-testid={`phase-activity-${index}-${activityIndex}`}>
                            <Check className="text-green-600 mr-3 h-4 w-4" />
                            <span className="text-muted-foreground text-sm">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-best-practices-title">
              Project Management Best Practices
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Maintain clear and consistent communication",
              "Document all project decisions and changes",
              "Regularly assess and manage project risks",
              "Keep stakeholders engaged throughout the project",
              "Use appropriate project management tools",
              "Conduct regular project reviews and retrospectives"
            ].map((practice, index) => (
              <div key={index} className="flex items-start" data-testid={`best-practice-${index}`}>
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="text-muted-foreground">{practice}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}