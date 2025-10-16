import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  Users,
  Code,
  type LucideIcon,
} from "lucide-react";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata("history");

interface TimelineEvent {
  year: string;
  period: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

interface BusinessTheme {
  period: string;
  focus: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2004",
    period: "December 2004",
    title: "Foundation & Early Structure",
    description:
      "Basic website structure with simple navigation. Core sections established: Home, Project Mechanics, Guestbook, Site Map. Copyright: 2002-2004.",
    category: "foundation",
    icon: Calendar,
  },
  {
    year: "2006",
    period: "February 2006 - August 2006",
    title: "Partnership with DeNovaCo",
    description:
      "Site hosted under DeNovaCo branding. Expanded navigation with lifestyle categories (Offices, Adventure, Organizing, Projects, Living, Home Improvements, Learning, Fitness). Enhanced project management focus with topic links and feature links for project lifecycle phases.",
    category: "partnership",
    icon: Users,
  },
  {
    year: "2008",
    period: "September 2008 - December 2008",
    title: "Independent Operations Return",
    description:
      "Project Mechanics LLC branding returns with founder Mark Hazleton prominently featured. Introduction of web publishing services focus. Case studies and portfolio websites showcased. Community and Resources sections established with social media integration beginning.",
    category: "independence",
    icon: TrendingUp,
  },
  {
    year: "2010",
    period: "November 2010 - March 2011",
    title: "Integrated Web Publishing Focus",
    description:
      "'Integrated And Distributed Web Publishing' becomes primary focus. Real-time Twitter feed integration and enhanced social media presence (Facebook Connect). Web 2.0 features prominently displayed with expanded project management articles and resources.",
    category: "integration",
    icon: Code,
  },
  {
    year: "2011",
    period: "May 2011 - January 2012",
    title: "Microsoft SharePoint Integration",
    description:
      "Microsoft SharePoint integration added as key service. Web Project Mechanics platform development with continued Twitter buzz integration. Blog section enhanced with technical content and PMP certification highlighted.",
    category: "technical",
    icon: Code,
  },
  {
    year: "2013",
    period: "June 2013 - February 2015",
    title: "Comprehensive Resource Hub",
    description:
      "Streamlined design with cleaner navigation and integrated social media feeds. Real-time analytics focus (Chartbeat) and content marketing emphasis. Comprehensive project management resource hub with detailed navigation structure, enhanced leadership sections, video content integration, and Amazon affiliate bookstore.",
    category: "expansion",
    icon: TrendingUp,
  },
  {
    year: "2015",
    period: "December 2015 - November 2016",
    title: "Modern Responsive Design",
    description:
      "Modern responsive design with toggle navigation. Expanded web publishing services and API development services added. Requirements analysis and design sections enhanced while maintaining comprehensive project management framework.",
    category: "modernization",
    icon: Code,
  },
  {
    year: "2017",
    period: "June 2017",
    title: "Building Web APIs",
    description:
      "Building Web APIs service added with further expansion of technical services. Continued focus on project management fundamentals and enhanced case studies section.",
    category: "technical",
    icon: Code,
  },
  {
    year: "2019",
    period: "January 2019 - June 2019",
    title: "Technical Transition",
    description:
      "Technical transition period - site becomes non-functional with JavaScript and cookies requirement message only. Possible platform migration or maintenance issues leading to end of active website presence.",
    category: "transition",
    icon: Calendar,
  },
];

const businessThemes: BusinessTheme[] = [
  {
    period: "2004-2005",
    focus: "PM Portal Vision",
    description: "Integrated project management tool development",
  },
  {
    period: "2006",
    focus: "Partnership & Lifestyle Expansion",
    description: "DeNovaCo hosting arrangement with expanded lifestyle content",
  },
  {
    period: "2006-2008",
    focus: "Independent Operations",
    description: "Return to independent operations with theory-based consulting",
  },
  {
    period: "2008-2011",
    focus: "Web Services Integration",
    description: "Web services integration with project management expertise",
  },
  {
    period: "2011-2017",
    focus: "Integrated Publishing",
    description: "Integrated web publishing and SharePoint specialization",
  },
  {
    period: "2017-2019",
    focus: "API Development",
    description: "API development and technical services until site closure",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "foundation":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "partnership":
      return "bg-green-100 text-green-800 border-green-200";
    case "independence":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "integration":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "technical":
      return "bg-red-100 text-red-800 border-red-200";
    case "expansion":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "modernization":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "transition":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function History() {
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
              data-testid="text-history-hero-title"
            >
              Project Mechanics <span className="text-yellow-300">History</span>
            </h1>
            <p
              className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto"
              data-testid="text-history-hero-description"
            >
              The evolution of Project Mechanics methodology from 2002 to 2019 —
              tracing the development of our approach to project management, web
              publishing, and technical services.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              data-testid="text-timeline-title"
            >
              Evolution Timeline
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-timeline-description"
            >
              A chronological journey through the development of Project
              Mechanics methodology and platform evolution.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div
                    key={index}
                    className="relative flex items-start"
                    data-testid={`timeline-event-${index}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                    {/* Content */}
                    <div className="ml-20">
                      <Card className="bg-card rounded-xl border border-border">
                        <CardContent className="p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                                    event.category
                                  )}`}
                                  data-testid={`event-category-${index}`}
                                >
                                  {event.category.charAt(0).toUpperCase() +
                                    event.category.slice(1)}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className="text-2xl font-bold text-primary"
                                data-testid={`event-year-${index}`}
                              >
                                {event.year}
                              </div>
                              <div
                                className="text-sm text-muted-foreground"
                                data-testid={`event-period-${index}`}
                              >
                                {event.period}
                              </div>
                            </div>
                          </div>
                          <h3
                            className="text-xl font-bold mb-3"
                            data-testid={`event-title-${index}`}
                          >
                            {event.title}
                          </h3>
                          <p
                            className="text-muted-foreground leading-relaxed"
                            data-testid={`event-description-${index}`}
                          >
                            {event.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Business Focus Evolution */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              data-testid="text-business-evolution-title"
            >
              Business Focus Evolution
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-business-evolution-description"
            >
              How Project Mechanics evolved from a simple project management
              portal to an integrated web publishing and technical services
              platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessThemes.map((theme, index) => (
              <Card
                key={index}
                className="bg-card rounded-xl border border-border"
                data-testid={`business-theme-${index}`}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div
                      className="text-sm font-medium text-primary mb-2"
                      data-testid={`theme-period-${index}`}
                    >
                      {theme.period}
                    </div>
                    <h3
                      className="text-lg font-bold mb-3"
                      data-testid={`theme-focus-${index}`}
                    >
                      {theme.focus}
                    </h3>
                    <p
                      className="text-muted-foreground text-sm"
                      data-testid={`theme-description-${index}`}
                    >
                      {theme.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4"
              data-testid="text-insights-title"
            >
              Key Evolution Insights
            </h2>
          </div>

          <div className="space-y-8">
            <Card className="bg-card rounded-xl border border-border">
              <CardContent className="p-8">
                <h3
                  className="text-xl font-bold mb-4"
                  data-testid="text-consistency-title"
                >
                  Consistent Foundation
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  data-testid="text-consistency-description"
                >
                  Throughout all iterations, Project Mechanics maintained its
                  core focus on project management fundamentals and PMP
                  certification, demonstrating the enduring value of structured
                  project management methodology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl border border-border">
              <CardContent className="p-8">
                <h3
                  className="text-xl font-bold mb-4"
                  data-testid="text-adaptation-title"
                >
                  Adaptive Evolution
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  data-testid="text-adaptation-description"
                >
                  The platform evolved from basic consulting to integrated web
                  publishing to technical services, showing how methodology can
                  adapt to changing market needs while maintaining core
                  principles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl border border-border">
              <CardContent className="p-8">
                <h3
                  className="text-xl font-bold mb-4"
                  data-testid="text-community-title"
                >
                  Community Building
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  data-testid="text-community-description"
                >
                  From early guestbooks to social media integration, Project
                  Mechanics consistently emphasized community building and
                  knowledge sharing as essential components of project success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
