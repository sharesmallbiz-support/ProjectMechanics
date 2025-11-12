import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, MessageSquare, Scale, Heart } from "lucide-react";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata("conflictManagement");

export default function ConflictManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button
              variant="outline"
              className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
              data-testid="button-back-to-methodology"
              asChild
            >
              <Link href="/methodology">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Methodology
              </Link>
            </Button>
            <h1
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
              data-testid="text-conflict-management-hero-title"
            >
              Conflict <span className="text-yellow-300">Management</span>
            </h1>
            <p
              className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto"
              data-testid="text-conflict-management-hero-description"
            >
              Transform conflicts into opportunities for collaboration and
              innovation through proven conflict resolution strategies and
              techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding Conflict Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              data-testid="text-understanding-conflict-title"
            >
              Understanding Conflict in Projects
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12"
              data-testid="text-understanding-conflict-description"
            >
              Conflict is a natural part of project work. When managed
              effectively, it can lead to better solutions, stronger
              relationships, and improved outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <MessageSquare className="text-primary h-8 w-8" />
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  data-testid="text-communication-conflicts-title"
                >
                  Communication Conflicts
                </h3>
                <p
                  className="text-muted-foreground"
                  data-testid="text-communication-conflicts-description"
                >
                  Misunderstandings and poor communication leading to conflicts
                  over requirements, expectations, and deliverables.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Scale className="text-primary h-8 w-8" />
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  data-testid="text-resource-conflicts-title"
                >
                  Resource Conflicts
                </h3>
                <p
                  className="text-muted-foreground"
                  data-testid="text-resource-conflicts-description"
                >
                  Competition for limited resources, including time, budget,
                  personnel, and equipment across projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border text-center">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 rounded-lg w-16 h-16 mx-auto mb-6">
                  <Heart className="text-primary h-8 w-8" />
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  data-testid="text-interpersonal-conflicts-title"
                >
                  Interpersonal Conflicts
                </h3>
                <p
                  className="text-muted-foreground"
                  data-testid="text-interpersonal-conflicts-description"
                >
                  Personal differences, working styles, and personality clashes
                  affecting team dynamics and productivity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conflict Resolution Strategies Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              data-testid="text-resolution-strategies-title"
            >
              Conflict Resolution Strategies
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                strategy: "Collaborating",
                description:
                  "Work together to find a win-win solution that satisfies all parties' interests and needs.",
                whenToUse:
                  "When issues are too important to compromise, and you need buy-in from all parties",
                techniques: [
                  "Joint problem-solving sessions",
                  "Brainstorming alternative solutions",
                  "Interest-based negotiation",
                  "Creating shared objectives",
                ],
              },
              {
                strategy: "Accommodating",
                description:
                  "One party gives in to the other's needs, typically when maintaining relationships is most important.",
                whenToUse:
                  "When the issue is more important to the other party, or to preserve harmony",
                techniques: [
                  "Active listening",
                  "Empathy demonstration",
                  "Graceful yielding",
                  "Relationship preservation",
                ],
              },
              {
                strategy: "Competing",
                description:
                  "Pursue your own interests without regard for others, typically in urgent or critical situations.",
                whenToUse:
                  "When quick decisions are needed, or when defending important principles",
                techniques: [
                  "Assertive communication",
                  "Clear position statements",
                  "Decisive action",
                  "Authority use",
                ],
              },
              {
                strategy: "Compromising",
                description:
                  "Find a middle ground where all parties give up something to reach an acceptable solution.",
                whenToUse:
                  "When goals are moderately important, and time is limited",
                techniques: [
                  "Trade-off negotiations",
                  "Middle ground seeking",
                  "Partial satisfaction",
                  "Give-and-take discussions",
                ],
              },
              {
                strategy: "Avoiding",
                description:
                  "Withdraw from or postpone dealing with the conflict situation entirely.",
                whenToUse:
                  "When issues are trivial, or when tension needs to cool down",
                techniques: [
                  "Strategic withdrawal",
                  "Issue postponement",
                  "Cooling-off periods",
                  "Topic redirection",
                ],
              },
            ].map((strategy, index) => (
              <Card
                key={index}
                className="bg-card rounded-xl p-8 border border-border"
                data-testid={`resolution-strategy-${index}`}
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-4 gap-6">
                    <div>
                      <h3
                        className="text-2xl font-bold mb-4"
                        data-testid={`strategy-name-${index}`}
                      >
                        {strategy.strategy}
                      </h3>
                      <p
                        className="text-muted-foreground text-sm"
                        data-testid={`strategy-description-${index}`}
                      >
                        {strategy.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">When to Use:</h4>
                      <p
                        className="text-muted-foreground text-sm"
                        data-testid={`strategy-when-${index}`}
                      >
                        {strategy.whenToUse}
                      </p>
                    </div>

                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-3">Key Techniques:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {strategy.techniques.map((technique, techniqueIndex) => (
                          <div
                            key={techniqueIndex}
                            className="flex items-center"
                            data-testid={`strategy-technique-${index}-${techniqueIndex}`}
                          >
                            <Check className="text-green-600 mr-3 h-4 w-4" />
                            <span className="text-muted-foreground text-sm">
                              {technique}
                            </span>
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

      {/* Prevention and Best Practices Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                data-testid="text-prevention-title"
              >
                Conflict Prevention
              </h2>
              <p
                className="text-lg text-muted-foreground mb-8"
                data-testid="text-prevention-description"
              >
                Proactive measures to minimize conflicts before they escalate.
              </p>
              <div className="space-y-4">
                {[
                  "Establish clear roles and responsibilities",
                  "Set expectations early and communicate regularly",
                  "Create open communication channels",
                  "Build strong relationships and trust",
                  "Implement fair resource allocation processes",
                  "Address issues early before they escalate",
                ].map((prevention, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    data-testid={`prevention-${index}`}
                  >
                    <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">{prevention}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                data-testid="text-best-practices-title"
              >
                Resolution Best Practices
              </h2>
              <p
                className="text-lg text-muted-foreground mb-8"
                data-testid="text-best-practices-description"
              >
                Effective approaches when conflicts do arise.
              </p>
              <div className="space-y-4">
                {[
                  "Address conflicts promptly and directly",
                  "Focus on interests, not positions",
                  "Listen actively to all perspectives",
                  "Separate people from problems",
                  "Generate multiple solution options",
                  "Document agreements and follow up",
                ].map((practice, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    data-testid={`best-practice-${index}`}
                  >
                    <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">{practice}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
