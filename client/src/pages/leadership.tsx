import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Users, Target, Lightbulb, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Leadership() {
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
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-leadership-hero-title">
              Project <span className="text-yellow-300">Leadership</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-leadership-hero-description">
              Develop essential leadership skills to inspire teams, drive results, and navigate complex project challenges with confidence and vision.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Foundations Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-leadership-foundations-title">
              Leadership Foundations
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-leadership-foundations-description">
              Effective project leadership combines technical expertise with emotional intelligence to guide teams toward successful outcomes.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Users className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-people-leadership-title">People Leadership</h3>
                <p className="text-muted-foreground mb-6" data-testid="text-people-leadership-description">
                  Building trust, motivating teams, and developing individual potential to create high-performing project teams.
                </p>
                <div className="space-y-3 text-left">
                  {[
                    "Team building and collaboration",
                    "Individual coaching and mentoring",
                    "Performance management",
                    "Conflict resolution and mediation"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center" data-testid={`people-leadership-${index}`}>
                      <Check className="text-green-600 mr-3 h-4 w-4" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Target className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid="text-strategic-leadership-title">Strategic Leadership</h3>
                <p className="text-muted-foreground mb-6" data-testid="text-strategic-leadership-description">
                  Setting direction, making decisions, and aligning project activities with organizational goals and objectives.
                </p>
                <div className="space-y-3 text-left">
                  {[
                    "Vision setting and communication",
                    "Strategic decision making",
                    "Risk assessment and management",
                    "Stakeholder alignment"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center" data-testid={`strategic-leadership-${index}`}>
                      <Check className="text-green-600 mr-3 h-4 w-4" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Styles Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-leadership-styles-title">
              Situational Leadership Styles
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-leadership-styles-description">
              Effective leaders adapt their style based on the situation, team maturity, and project requirements.
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                style: "Directing",
                description: "High directive, low supportive behavior. Appropriate for new teams or critical situations requiring clear guidance.",
                characteristics: ["Clear instructions and expectations", "Close supervision and monitoring", "One-way communication", "Structured approach"],
                whenToUse: "New team members, crisis situations, or highly structured tasks"
              },
              {
                style: "Coaching",
                description: "High directive, high supportive behavior. Combines guidance with encouragement and two-way communication.",
                characteristics: ["Explanation of decisions", "Two-way communication", "Support and encouragement", "Skill development focus"],
                whenToUse: "Team members developing competence but lacking confidence"
              },
              {
                style: "Supporting",
                description: "Low directive, high supportive behavior. Facilitates and supports team members' decisions and problem-solving.",
                characteristics: ["Collaborative decision making", "Active listening and support", "Resource facilitation", "Confidence building"],
                whenToUse: "Competent team members who need motivation and support"
              },
              {
                style: "Delegating",
                description: "Low directive, low supportive behavior. Empowers capable team members to take full ownership.",
                characteristics: ["Minimal supervision", "Empowerment and autonomy", "Results-focused monitoring", "Strategic oversight only"],
                whenToUse: "Highly competent and committed team members"
              }
            ].map((style, index) => (
              <Card key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`leadership-style-${index}`}>
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-4 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-4" data-testid={`style-name-${index}`}>
                        {style.style}
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid={`style-description-${index}`}>
                        {style.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Characteristics:</h4>
                      <div className="space-y-2">
                        {style.characteristics.map((char, charIndex) => (
                          <div key={charIndex} className="flex items-start" data-testid={`style-char-${index}-${charIndex}`}>
                            <Check className="text-green-600 mr-2 h-3 w-3 mt-1" />
                            <span className="text-muted-foreground text-sm">{char}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-3">When to Use:</h4>
                      <p className="text-muted-foreground text-sm" data-testid={`style-when-${index}`}>
                        {style.whenToUse}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Competencies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-leadership-competencies-title">
              Core Leadership Competencies
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Lightbulb className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" data-testid="text-cognitive-competencies-title">Cognitive Competencies</h3>
                    <p className="text-muted-foreground">Mental capabilities and thinking skills</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "Strategic thinking and planning",
                    "Problem-solving and decision making",
                    "Systems thinking and analysis",
                    "Innovation and creativity",
                    "Critical thinking and judgment"
                  ].map((competency, index) => (
                    <div key={index} className="flex items-center" data-testid={`cognitive-competency-${index}`}>
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span className="text-muted-foreground">{competency}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Heart className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" data-testid="text-emotional-competencies-title">Emotional Competencies</h3>
                    <p className="text-muted-foreground">Self-awareness and interpersonal skills</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "Self-awareness and self-regulation",
                    "Empathy and social awareness",
                    "Communication and influence",
                    "Relationship building and networking",
                    "Emotional resilience and adaptability"
                  ].map((competency, index) => (
                    <div key={index} className="flex items-center" data-testid={`emotional-competency-${index}`}>
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span className="text-muted-foreground">{competency}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Development Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-leadership-development-title">
              Continuous Leadership Development
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-leadership-development-description">
              Leadership is a journey of continuous learning and growth. Invest in developing these key areas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Seek feedback from team members and stakeholders",
              "Practice active listening and empathetic communication",
              "Develop cultural intelligence and inclusivity",
              "Build resilience and stress management skills",
              "Enhance emotional intelligence and self-awareness",
              "Learn from failures and celebrate successes",
              "Mentor others and build leadership pipeline",
              "Stay current with industry trends and best practices",
              "Network with other leaders and learn from peers"
            ].map((development, index) => (
              <div key={index} className="flex items-start" data-testid={`leadership-development-${index}`}>
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="text-muted-foreground">{development}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}