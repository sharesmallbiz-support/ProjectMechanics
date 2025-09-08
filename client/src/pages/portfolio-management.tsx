import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";

export default function PortfolioManagement() {
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
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-portfolio-management-hero-title">
              Portfolio <span className="text-yellow-300">Management</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-portfolio-management-hero-description">
              Strategic alignment and optimization of project portfolios to maximize organizational value and achieve strategic objectives.
            </p>
          </div>
        </div>
      </section>

      {/* PPM Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-ppm-overview-title">
              Project Portfolio Management Overview
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-ppm-overview-description">
              Project Portfolio Management (PPM) is a strategic approach that organizations use to prioritize, select, and manage a collection of projects and programs as a unified portfolio.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Target className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-strategic-alignment-title">Strategic Alignment</h3>
                <p className="text-muted-foreground" data-testid="text-strategic-alignment-description">
                  Ensure all projects align with organizational goals and strategic objectives for maximum impact.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <TrendingUp className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-value-optimization-title">Value Optimization</h3>
                <p className="text-muted-foreground" data-testid="text-value-optimization-description">
                  Maximize return on investment through careful selection and prioritization of initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Users className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-resource-optimization-title">Resource Optimization</h3>
                <p className="text-muted-foreground" data-testid="text-resource-optimization-description">
                  Efficiently allocate resources across projects to prevent bottlenecks and maximize utilization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Components Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-key-components-title">
              Key Components of Portfolio Management
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                title: "Portfolio Governance",
                description: "Establish clear governance structures, roles, and responsibilities for portfolio decision-making.",
                components: ["Portfolio Steering Committee", "Portfolio Management Office (PMO)", "Decision-making frameworks", "Governance policies and procedures"]
              },
              {
                title: "Project Selection & Prioritization",
                description: "Systematic approach to evaluating and selecting projects based on strategic value and resource availability.",
                components: ["Business case evaluation", "Scoring and ranking models", "Resource capacity analysis", "Strategic fit assessment"]
              },
              {
                title: "Performance Monitoring",
                description: "Continuous monitoring and reporting of portfolio performance against strategic objectives.",
                components: ["Key Performance Indicators (KPIs)", "Dashboard reporting", "Risk monitoring", "Benefits realization tracking"]
              },
              {
                title: "Resource Management",
                description: "Optimize resource allocation across the portfolio to maximize efficiency and minimize conflicts.",
                components: ["Capacity planning", "Resource allocation models", "Skill gap analysis", "Cross-project resource sharing"]
              }
            ].map((component, index) => (
              <Card key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`portfolio-component-${index}`}>
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4" data-testid={`component-title-${index}`}>
                        {component.title}
                      </h3>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground mb-4" data-testid={`component-description-${index}`}>
                        {component.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Key Elements:</h4>
                      <div className="space-y-2">
                        {component.components.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center" data-testid={`component-item-${index}-${itemIndex}`}>
                            <Check className="text-green-600 mr-3 h-4 w-4" />
                            <span className="text-muted-foreground text-sm">{item}</span>
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-benefits-title">
              Benefits of Effective Portfolio Management
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Improved strategic alignment across all projects",
              "Better resource utilization and reduced conflicts",
              "Enhanced decision-making through data-driven insights",
              "Increased visibility into project performance",
              "Reduced project failures and improved success rates",
              "Optimized return on investment across the portfolio",
              "Better risk management at the portfolio level",
              "Enhanced stakeholder communication and engagement"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start" data-testid={`portfolio-benefit-${index}`}>
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}