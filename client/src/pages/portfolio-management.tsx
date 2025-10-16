import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Target, TrendingUp, Users, Building, UserCheck, BarChart3, Zap, Shield, Globe, Headphones, Presentation } from "lucide-react";
import { Link } from "wouter";

export default function PortfolioManagement() {
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
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-portfolio-management-hero-title">
              Portfolio Management & <span className="text-yellow-300">PMO</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-portfolio-management-hero-description">
              Comprehensive Program Management Office (PMO) framework combining strategic portfolio management with client delivery excellence and structured operational processes.
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

      {/* PMO Structure Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-pmo-structure-title">
              Program Management Office Structure
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-pmo-structure-description">
              A centralized operations unit providing defined organization rather than temporary project teams, partnering with client management through set processes.
            </p>
          </div>
          
          {/* PMO Organizational Chart */}
          <div className="mb-16">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-org-chart-title">PMO Organizational Structure</h3>
                
                {/* Executive Level */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-primary/5 border-primary/20 text-center p-6">
                    <CardContent className="p-0">
                      <Presentation className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h4 className="font-bold text-primary mb-2">Sales Executive</h4>
                      <p className="text-sm text-muted-foreground">Pursuit leadership, C-Level contact, Contract negotiation</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-primary/20 text-center p-6">
                    <CardContent className="p-0">
                      <Building className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h4 className="font-bold text-primary mb-2">Delivery Executive</h4>
                      <p className="text-sm text-muted-foreground">Project estimation, delivery oversight, P&L management</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-primary/20 text-center p-6">
                    <CardContent className="p-0">
                      <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h4 className="font-bold text-primary mb-2">Strategy Executive</h4>
                      <p className="text-sm text-muted-foreground">Business case development, strategic planning</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Delivery Lead Level */}
                <div className="text-center mb-8">
                  <Card className="bg-green-50 border-green-200 inline-block p-6">
                    <CardContent className="p-0">
                      <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-3" />
                      <h4 className="font-bold text-green-800 mb-2">Delivery Lead</h4>
                      <p className="text-sm text-green-700">Day-to-day client satisfaction, task delivery coordination</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Service Teams */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[
                    { name: "Paid Media", icon: BarChart3 },
                    { name: "Design/Dev", icon: Zap },
                    { name: "SEO/Local", icon: Globe },
                    { name: "Social", icon: Users },
                    { name: "Content", icon: Presentation },
                    { name: "Analytics", icon: TrendingUp },
                    { name: "CRO", icon: Target }
                  ].map((service, index) => (
                    <Card key={index} className="bg-blue-50 border-blue-200 text-center p-4">
                      <CardContent className="p-0">
                        <service.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <h5 className="font-semibold text-blue-800 text-sm">{service.name}</h5>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Account Management Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-account-management-title">
              Digital Account Management
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-account-management-description">
              The ability to keep clients consistently happy, own the account, care about the client, and know what they need while constantly identifying revenue growth opportunities.
            </p>
          </div>
          
          {/* Account Management Expectations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6" data-testid="text-expectations-title">Account Management Expectations</h3>
                <div className="space-y-4">
                  {[
                    "Take on and own the client as a new account",
                    "Build rapport and trust with the client",
                    "Deal with any non-project related requests",
                    "Pro-actively spot opportunities and suggest useful solutions",
                    "Sell genuinely valuable solutions to the client"
                  ].map((expectation, index) => (
                    <div key={index} className="flex items-start" data-testid={`expectation-${index}`}>
                      <Check className="text-green-600 mr-3 h-5 w-5 mt-0.5" />
                      <span className="text-muted-foreground">{expectation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6" data-testid="text-role-responsibilities-title">Role Responsibilities</h3>
                <div className="space-y-4">
                  {[
                    "Identify KPIs and plan strategy",
                    "Develop briefs and manage research resources",
                    "Ideate with creative and media partners",
                    "Leverage insights and provide expertise on brand",
                    "Uncover opportunities and grow business",
                    "Champion new initiatives"
                  ].map((responsibility, index) => (
                    <div key={index} className="flex items-start" data-testid={`responsibility-${index}`}>
                      <Check className="text-blue-600 mr-3 h-5 w-5 mt-0.5" />
                      <span className="text-muted-foreground">{responsibility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skill Set Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-skill-set-title">
              Digital Account Management Skill Set
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Client Management",
                icon: Users,
                color: "blue",
                skills: [
                  "Build and maintain client relationships as primary contact",
                  "Responsible for day-to-day management of clients and requests",
                  "Define, plan, and ideate solutions"
                ]
              },
              {
                title: "Tactical and Strategic Sales",
                icon: TrendingUp,
                color: "green",
                skills: [
                  "Identify new sales opportunities within existing accounts",
                  "Spearhead client meetings, presentations and pitches",
                  "Provide sales documentation: proposals, quotes, contracts",
                  "Lead, write and present client account strategy"
                ]
              },
              {
                title: "Analysis and Reporting",
                icon: BarChart3,
                color: "purple",
                skills: [
                  "In-depth web analytics analysis with monthly reports",
                  "Key recommendations for client improvement",
                  "Monitor and understand client markets",
                  "Track competitive activity and market issues"
                ]
              },
              {
                title: "Consultancy",
                icon: Headphones,
                color: "orange",
                skills: [
                  "Information Architecture, SEO, PPC consultancy",
                  "Social Media strategy and implementation",
                  "Serve as their most trusted advisor",
                  "Provide expert guidance across digital channels"
                ]
              }
            ].map((skillGroup, index) => (
              <Card key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`skill-group-${index}`}>
                <CardContent className="p-0">
                  <div className={`bg-${skillGroup.color}-100 p-4 rounded-lg w-16 h-16 mb-6`}>
                    <skillGroup.icon className={`text-${skillGroup.color}-600 h-8 w-8`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4" data-testid={`skill-title-${index}`}>
                    {skillGroup.title}
                  </h3>
                  <div className="space-y-3">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-start" data-testid={`skill-${index}-${skillIndex}`}>
                        <Check className={`text-${skillGroup.color}-600 mr-3 h-4 w-4 mt-0.5`} />
                        <span className="text-muted-foreground text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Skills & Passion Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <div className="bg-red-100 p-4 rounded-lg w-16 h-16 mb-6">
                  <Shield className="text-red-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-internal-skills-title">Internal & Personal Skills</h3>
                <div className="space-y-3">
                  {[
                    "Proven digital creative and technical experience",
                    "Manage production teams for on-time, on-budget delivery",
                    "Monthly reporting to agency management team",
                    "Coordinate across internal departments effectively"
                  ].map((skill, index) => (
                    <div key={index} className="flex items-start" data-testid={`internal-skill-${index}`}>
                      <Check className="text-red-600 mr-3 h-4 w-4 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <div className="bg-yellow-100 p-4 rounded-lg w-16 h-16 mb-6">
                  <Zap className="text-yellow-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-passion-title">Great Digital Account Management</h3>
                <blockquote className="text-lg italic text-muted-foreground mb-6">
                  "A burning passion for all things web. They live and breathe it, during the day and when they go home – they absolutely love it and can't get enough."
                </blockquote>
                <div className="space-y-3">
                  {[
                    "Quality solutions that align with business strategy",
                    "Honest addiction to web that enables cutting-edge suggestions",
                    "Sufficient technical knowledge to earn team respect",
                    "Ability to handle the whole process up to production",
                    "Willingness to research any digital topic independently"
                  ].map((trait, index) => (
                    <div key={index} className="flex items-start" data-testid={`passion-trait-${index}`}>
                      <Check className="text-yellow-600 mr-3 h-4 w-4 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Structured Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-structured-process-title">
              Structured Process Implementation
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-structured-process-description">
              Following structured processes prevents over-selling, under-quoting, and missing critical requirements that result in costly fixes.
            </p>
          </div>
          
          {/* Process Ideas */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6" data-testid="text-process-ideas-title">Process Implementation Ideas</h3>
                <div className="space-y-4">
                  {[
                    "Weekly account management meetings",
                    "Documented monthly client calls",
                    "Personal notes with monthly reports",
                    "Google alerts for client industry and competitors",
                    "Monthly social media engagement as yourself",
                    "Regular analytics review for opportunities",
                    "Relationship building with client staff",
                    "Birthday cards to clients and staff"
                  ].map((idea, index) => (
                    <div key={index} className="flex items-start" data-testid={`process-idea-${index}`}>
                      <Check className="text-green-600 mr-3 h-5 w-5 mt-0.5" />
                      <span className="text-muted-foreground">{idea}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6" data-testid="text-deliverables-title">Required Deliverables</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Formal Process for Account Managers",
                      description: "Standardized procedures and workflows"
                    },
                    {
                      title: "Client Profile Sheet",
                      description: "Comprehensive client information filled by account managers"
                    },
                    {
                      title: "Monthly Client Contact Report",
                      description: "Call details, social shares, email correspondence, opportunities identified"
                    }
                  ].map((deliverable, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4" data-testid={`deliverable-${index}`}>
                      <h4 className="font-semibold text-blue-800 mb-1">{deliverable.title}</h4>
                      <p className="text-muted-foreground text-sm">{deliverable.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sales and Delivery Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-sales-delivery-title">
              Sales & Delivery Process Flow
            </h2>
          </div>
          
          <Card className="bg-card rounded-xl p-8 border border-border">
            <CardContent className="p-0">
              <div className="space-y-8">
                {[
                  {
                    phase: "Prospect Identification",
                    focus: "Marketing",
                    team: "Sales Channel Partners, Marketing, Business Development",
                    color: "blue"
                  },
                  {
                    phase: "Lead Qualification", 
                    focus: "Marketing",
                    team: "Sales + Marketing",
                    color: "green"
                  },
                  {
                    phase: "Consultation",
                    focus: "Sales Focus",
                    team: "Sales + Delivery",
                    color: "purple"
                  },
                  {
                    phase: "Presentation(s)",
                    focus: "Sales Focus",
                    team: "Sales + Delivery + PMO Members as needed",
                    color: "orange"
                  },
                  {
                    phase: "Justification",
                    focus: "Delivery Focus",
                    team: "Sales + Finance + Delivery",
                    color: "red"
                  },
                  {
                    phase: "Proposal",
                    focus: "Delivery Focus", 
                    team: "Delivery + Sales + PMO Members as needed",
                    color: "yellow"
                  },
                  {
                    phase: "Schedule & Execute",
                    focus: "Delivery Focus",
                    team: "Sales + Delivery, Transition to PMO",
                    color: "indigo"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-6" data-testid={`process-step-${index}`}>
                    <div className={`bg-${step.color}-100 p-3 rounded-full w-12 h-12 flex items-center justify-center`}>
                      <span className={`text-${step.color}-600 font-bold`}>{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="grid lg:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-bold text-lg">{step.phase}</h4>
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${step.color}-100 text-${step.color}-800`}>
                            {step.focus}
                          </span>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">{step.team}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-benefits-title">
              PMO Implementation Benefits
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Centralized oversight of all client work",
              "Consistent quality across delivered projects",
              "Improved client satisfaction and retention",
              "Standardized processes and deliverables",
              "Better resource allocation and utilization",
              "Enhanced project delivery and communication",
              "Effective risk management and issue resolution",
              "Scalable approach for current and future clients"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start" data-testid={`pmo-benefit-${index}`}>
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