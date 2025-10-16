import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata("leadership");

export default function Leadership() {
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
              data-testid="text-leadership-hero-title"
            >
              Project <span className="text-yellow-300">Leadership</span>
            </h1>
            <p
              className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto"
              data-testid="text-leadership-hero-description"
            >
              Develop essential leadership skills to inspire teams, drive
              results, and navigate complex project challenges with confidence
              and vision.
            </p>
          </div>
        </div>
      </section>

      {/* Setting Up a Team for Success */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              data-testid="text-team-success-title"
            >
              Setting Up a Team for Success
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12"
              data-testid="text-team-success-description"
            >
              It is important to create the appropriate &quot;team&quot;
              environment. The project manager is the focal point for creating a
              strong team environment by emphasizing core values that produce
              quality results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "Trust",
              "Fairness",
              "Assumed Competence",
              "Respect",
              "Mentoring Approach",
              "Lead from the Front, Not from the Rear",
              "Stress Quality",
              "Stress the Assumption of Responsibility",
              "Reach Consensus on Goals and Obtain Commitment to Meet Them",
            ].map((value, index) => (
              <div
                key={index}
                className="flex items-start"
                data-testid={`core-value-${index}`}
              >
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Through Empowerment Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              data-testid="text-empowerment-title"
            >
              Leadership Through Empowerment
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12"
              data-testid="text-empowerment-description"
            >
              An effective leader is an individual who leads others to lead
              themselves. The key tools used by an effective leader are
              delegation and empowerment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3
                  className="text-2xl font-bold mb-6"
                  data-testid="text-empowerment-principles-title"
                >
                  Empowerment Principles
                </h3>
                <p
                  className="text-muted-foreground mb-6"
                  data-testid="text-empowerment-principles-description"
                >
                  The goal should be to remove inadequate performers and, through
                  mentoring, elevate others to top performer status. Without
                  delegation and empowerment, it is impossible for an organization
                  to reach its full potential.
                </p>
                <div className="space-y-3">
                  {[
                    "Be fair and just in all dealings",
                    "Emphasize freedom as part of growth",
                    "Make commitments and keep them",
                    "Consult with associates before adverse actions",
                    "Remove inadequate performers without hesitation",
                  ].map((principle, index) => (
                    <div
                      key={index}
                      className="flex items-start"
                      data-testid={`empowerment-principle-${index}`}
                    >
                      <Check className="text-green-600 mr-3 h-5 w-5 mt-0.5" />
                      <span className="text-muted-foreground">{principle}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3
                  className="text-2xl font-bold mb-6"
                  data-testid="text-delegation-title"
                >
                  Delegation Capabilities
                </h3>
                <p
                  className="text-muted-foreground mb-6"
                  data-testid="text-delegation-description"
                >
                  The two key aspects of delegation are monitoring and mentoring.
                  Changes in direction are suggested instead of dictated, and
                  courses of action are encouraged instead of forced.
                </p>
                <div className="space-y-3">
                  {[
                    "Suggest changes instead of dictating them",
                    "Encourage courses of action instead of forcing them",
                    "Monitor performance through guidance",
                    "Mentor team members for growth",
                    "Identify and address inadequate performers",
                  ].map((capability, index) => (
                    <div
                      key={index}
                      className="flex items-start"
                      data-testid={`delegation-capability-${index}`}
                    >
                      <Check className="text-green-600 mr-3 h-5 w-5 mt-0.5" />
                      <span className="text-muted-foreground">{capability}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Environment Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              data-testid="text-project-atmosphere-title"
            >
              Project Atmosphere & Environment
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12"
              data-testid="text-project-atmosphere-description"
            >
              One key to the operation of a successful team environment is
              providing the appropriate physical and collaborative environment for
              performing tasks.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <h3
                  className="text-2xl font-bold mb-6"
                  data-testid="text-physical-environment-title"
                >
                  Physical Environment
                </h3>
                <p
                  className="text-muted-foreground mb-6"
                  data-testid="text-physical-environment-description"
                >
                  The environment should be free of noise and outside distractions
                  and provide appropriate space for project tasks. Proper
                  lighting, equipment, and air-conditioning are critical.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Noise-free workspace with minimal distractions",
                    "Proper lighting and air-conditioning",
                    "Sufficient space for storage and retrieval of resources",
                    "Immediate access to required tools and equipment",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start"
                      data-testid={`physical-env-${index}`}
                    >
                      <Check className="text-green-600 mr-3 h-5 w-5 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="bg-card rounded-xl p-8 border border-border">
                <CardContent className="p-0">
                  <h3
                    className="text-xl font-bold mb-4"
                    data-testid="text-individual-tasks-title"
                  >
                    Individual Tasks
                  </h3>
                  <p
                    className="text-muted-foreground mb-4"
                    data-testid="text-individual-tasks-description"
                  >
                    Team members should have well-defined and distinctly scheduled
                    tasks with minimal overlap.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Well-defined task assignments",
                      "Minimal task overlap",
                      "Clear focus on critical tasks",
                      "Sense of ownership over work",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start text-sm"
                        data-testid={`individual-task-${index}`}
                      >
                        <Check className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card rounded-xl p-8 border border-border">
                <CardContent className="p-0">
                  <h3
                    className="text-xl font-bold mb-4"
                    data-testid="text-knowledge-sharing-title"
                  >
                    Knowledge Sharing
                  </h3>
                  <p
                    className="text-muted-foreground mb-4"
                    data-testid="text-knowledge-sharing-description"
                  >
                    Team members should exchange knowledge and benefit from
                    informal training and learning opportunities.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Open knowledge exchange",
                      "Informal training opportunities",
                      "Mentoring and ad hoc reviews",
                      "Respect for skill differences",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start text-sm"
                        data-testid={`knowledge-sharing-${index}`}
                      >
                        <Check className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card rounded-xl p-8 border border-border">
                <CardContent className="p-0">
                  <h3
                    className="text-xl font-bold mb-4"
                    data-testid="text-quality-work-title"
                  >
                    Quality Work
                  </h3>
                  <p
                    className="text-muted-foreground mb-4"
                    data-testid="text-quality-work-description"
                  >
                    All team members should produce work at the best of their
                    ability and have their abilities mature over the project.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Focus on quality environment",
                      "Attention to quantity and quality",
                      "Integral part of the project",
                      "Continuous ability development",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start text-sm"
                        data-testid={`quality-work-${index}`}
                      >
                        <Check className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hallmarks of a Good Leader Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              data-testid="text-hallmarks-title"
            >
              Hallmarks of a Good Leader
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12"
              data-testid="text-hallmarks-description"
            >
              Key behaviors and practices that distinguish effective project
              leaders and create strong team environments.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Conduct Periodic Project Team Outings",
                description:
                  "It is critical that team members be treated to periodic outings where they may blow off steam and spend time together outside of the work environment.",
                details: [
                  "Lunches, dinners, happy hours",
                  "Builds team relationships",
                  "Provides stress relief",
                  "Creates positive memories",
                ],
              },
              {
                title: "Celebrate Team Member Departures When Appropriate",
                description:
                  "When long-term team members move off the project, provide a celebration to recognize them for their accomplishments.",
                details: [
                  "Boosts departing individual's morale",
                  "Social interaction opportunity",
                  "Recognition of contributions",
                  "Positive closure experience",
                ],
              },
              {
                title: "Celebrate Successful Project Completion",
                description:
                  "Even after highly successful projects, team members often feel a profound sense of loss that must be brought to ceremonial conclusion.",
                details: [
                  "Ceremonial project closure",
                  "Lasting positive memories",
                  "Recognition of success",
                  "Team bonding conclusion",
                ],
              },
              {
                title: 'Address "What was learned" for Unsuccessful Projects',
                description:
                  "It is important to bring closure to unsuccessful projects with a discussion to facilitate learning from the experience.",
                details: [
                  "Cathartic closure process",
                  "Open discussion environment",
                  "Learning opportunity",
                  "Improvement identification",
                ],
              },
            ].map((hallmark, index) => (
              <Card
                key={index}
                className="bg-card rounded-xl p-8 border border-border"
                data-testid={`hallmark-${index}`}
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <h3
                        className="text-xl font-bold mb-4"
                        data-testid={`hallmark-title-${index}`}
                      >
                        {hallmark.title}
                      </h3>
                    </div>

                    <div>
                      <p
                        className="text-muted-foreground mb-4"
                        data-testid={`hallmark-description-${index}`}
                      >
                        {hallmark.description}
                      </p>
                    </div>

                    <div>
                      <div className="space-y-2">
                        {hallmark.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start"
                            data-testid={`hallmark-detail-${index}-${detailIndex}`}
                          >
                            <Check className="text-green-600 mr-3 h-4 w-4 mt-0.5" />
                            <span className="text-muted-foreground text-sm">
                              {detail}
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

      {/* Leadership Best Practices Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                data-testid="text-leadership-practices-title"
              >
                Essential Leadership Practices
              </h2>
              <p
                className="text-lg text-muted-foreground mb-8"
                data-testid="text-leadership-practices-description"
              >
                Critical behaviors that effective project managers must embrace to
                lead successfully.
              </p>
              <div className="space-y-4">
                {[
                  'Do not be "One of the Guys" - maintain hierarchical authority',
                  "Always attend meetings to influence and lead effectively",
                  "Remember to delegate responsibilities on larger projects",
                  "Make tough decisions when necessary",
                  "Handle personnel problems decisively",
                  "Assure overall project success through leadership",
                ].map((practice, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    data-testid={`leadership-practice-${index}`}
                  >
                    <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">{practice}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                data-testid="text-communication-title"
              >
                Communication & Collaboration
              </h2>
              <p
                className="text-lg text-muted-foreground mb-8"
                data-testid="text-communication-description"
              >
                Utilize collaborative tools and forums to enhance team
                communication and knowledge sharing.
              </p>
              <div className="space-y-4">
                {[
                  "Implement multi-access forums for open communication",
                  "Create rapid, repeatable implementation environments",
                  "Promote and simplify project documentation",
                  "Increase team bonding through discussion databases",
                  "Provide outlets for team members to share concerns",
                  "Build stronger relationships through collaboration tools",
                ].map((communication, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    data-testid={`communication-${index}`}
                  >
                    <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">{communication}</span>
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
