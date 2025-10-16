import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, RefreshCw, Users, Target } from "lucide-react";
import { Link } from "wouter";

export default function ChangeManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button variant="outline" className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20" data-testid="button-back-to-methodology" asChild>
              <Link href="/methodology">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Methodology
              </Link>
            </Button>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-change-management-hero-title">
              Change <span className="text-yellow-300">Management</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-change-management-hero-description">
              Navigate organizational transformation successfully through structured change management processes and stakeholder engagement strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Change Management Framework Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-framework-title">
              Change Management Framework
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-framework-description">
              A structured approach to managing organizational change that addresses both the technical and human aspects of transformation.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <RefreshCw className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-process-focus-title">Process Focus</h3>
                <p className="text-muted-foreground" data-testid="text-process-focus-description">
                  Structured methodology for implementing change initiatives with clear phases and deliverables.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Users className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-people-focus-title">People Focus</h3>
                <p className="text-muted-foreground" data-testid="text-people-focus-description">
                  Address the human side of change through communication, training, and support mechanisms.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Target className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-results-focus-title">Results Focus</h3>
                <p className="text-muted-foreground" data-testid="text-results-focus-description">
                  Measure and track change adoption to ensure objectives are met and benefits are realized.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Change Process Steps Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-process-steps-title">
              Change Management Process
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "Assess Change Readiness",
                description: "Evaluate the organization's readiness for change and identify potential barriers and enablers.",
                activities: ["Current state assessment", "Stakeholder analysis", "Change readiness survey", "Risk identification"]
              },
              {
                step: "Create Change Strategy",
                description: "Develop a comprehensive change management strategy aligned with project objectives.",
                activities: ["Change vision and objectives", "Communication strategy", "Training strategy", "Resistance management plan"]
              },
              {
                step: "Build Change Coalition",
                description: "Identify and engage key stakeholders and change champions throughout the organization.",
                activities: ["Sponsor engagement", "Change champion network", "Stakeholder mapping", "Coalition building"]
              },
              {
                step: "Develop Change Plan",
                description: "Create detailed plans for communication, training, and change implementation activities.",
                activities: ["Communication plan", "Training plan", "Implementation timeline", "Resource allocation"]
              },
              {
                step: "Implement Change",
                description: "Execute the change plan while monitoring progress and adjusting as needed.",
                activities: ["Change communication", "Training delivery", "Support mechanisms", "Progress monitoring"]
              },
              {
                step: "Sustain Change",
                description: "Reinforce new behaviors and processes to ensure long-term adoption and success.",
                activities: ["Performance monitoring", "Course correction", "Recognition programs", "Continuous improvement"]
              }
            ].map((step, index) => (
              <Card key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`change-step-${index}`}>
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg mr-4">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold" data-testid={`step-title-${index}`}>
                          {step.step}
                        </h3>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground mb-4" data-testid={`step-description-${index}`}>
                        {step.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Key Activities:</h4>
                      <div className="space-y-2">
                        {step.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-center" data-testid={`step-activity-${index}-${activityIndex}`}>
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

      {/* Success Factors Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-success-factors-title">
              Critical Success Factors
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Strong leadership commitment and visible sponsorship",
              "Clear and consistent communication throughout the process",
              "Active stakeholder engagement and participation",
              "Comprehensive training and support programs",
              "Proactive resistance management strategies",
              "Regular monitoring and course correction",
              "Celebration of early wins and achievements",
              "Sustained reinforcement of new behaviors"
            ].map((factor, index) => (
              <div key={index} className="flex items-start" data-testid={`success-factor-${index}`}>
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="text-muted-foreground">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}