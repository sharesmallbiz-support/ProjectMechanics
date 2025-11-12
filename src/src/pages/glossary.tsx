import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";
import { updatePageMetadata } from "@/lib/metadata";

const glossaryTerms = [
  {
    term: "Accountability",
    definition: "Accountability is when an individual is the ultimate point of responsibility for the successful completion of a task or assignment. In other words, \"The buck stops here.\""
  },
  {
    term: "Authority",
    definition: "For decisions to be made, authority must be granted to individuals. Authority is the power that enables individuals to provide directions and structure to others. The levels of authority should be well defined before any project effort, particularly when the organization participating in the effort utilizes a flat organization structure. In this case, individuals cannot defer to titles and established hierarchical structure to determine degrees of authority."
  },
  {
    term: "Chargeability",
    definition: "The Chargeability percentage is the number of billable hours divided by a standard 40/hr week. (i.e. 40 hours billed is 100% chargeable, 20 hours is 50% chargeable)"
  },
  {
    term: "On-time",
    definition: "When deliverables are produced on the schedule communicated to the customer. This communicated time can be the original date, or a mutually determined revised date."
  },
  {
    term: "Project Charter",
    definition: "A document to ensure that the project work plan lists all tasks necessary to deliver the scope of work that was sold. Ensure that the customer is referenceable during and after the project."
  },
  {
    term: "Project End",
    definition: "A project ends when the mutually recognized solution has been reached, tested, reviewed, and finalized. Only after project-closing procedures have been completed does the project truly end."
  },
  {
    term: "Project Management",
    definition: "Project Management is a set of principles, methods, and techniques for effectively planning, organizing, directing, and controlling projects."
  },
  {
    term: "Project Mechanics",
    definition: "The purpose of Project Mechanics is to allow the project team to get a comprehensive view of the project. On this page you will find links to project documents and reports of the project requirements, issues, status, and time entry."
  },
  {
    term: "Project Start",
    definition: "A project begins when a particular need is identified, and the necessity for further investigation of that need is authorized."
  },
  {
    term: "Project Team",
    definition: "A Project Team is temporary organization comprised of varying resources. This organization is guided by a set of well-defined objectives and confined by a structure of cost, schedule, and quality parameters. Specifically, in the consulting environment a project will likely include both client and consultant personnel working together to achieve a well-defined objective intended to serve the client."
  },
  {
    term: "Quality",
    definition: "To be considered a quality solution, a system must meet or exceed customer expectations in respect to its usability, scalability, and maintainability."
  },
  {
    term: "Realization Rate",
    definition: "The Realization rate is a measure of the ability to get paid for recorded hours and takes into account hours that had to be written off. It is a dollar per hour number and calculated by taking the total dollars paid by the total hours charged to a project."
  },
  {
    term: "Responsibility",
    definition: "The obligation incurred by individuals in their roles in formal organizations in order to effectively performs assignments. Ultimately, Project Managers are responsible for the work of all individuals performing tasks under their supervision, but each individual assigned a task has the specific responsibility for the attainment of a quality completion of the task."
  },
  {
    term: "Utilization",
    definition: "The Utilization percentage is the total number of non-administrative hours against a standard. The use of utilization was to measure how much work a consultant is doing using both internal and external projects. You do not factor in Admin, Sick, or Vacation time into utilization."
  },
  {
    term: "Within Budget",
    definition: "A project is within budget when costs do not exceed the previously agreed upon amount for delivery of the solution."
  }
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    updatePageMetadata("glossary");
  }, []);

  const filteredTerms = glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-glossary-hero-title">
              Project Mechanics <span className="text-yellow-300">Glossary</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-glossary-hero-description">
              Essential terms and definitions for understanding and implementing the Project Mechanics methodology.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search glossary terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              data-testid="input-glossary-search"
            />
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredTerms.map((item, index) => (
              <Card key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`glossary-term-${index}`}>
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-4 text-primary" data-testid={`term-title-${index}`}>
                    {item.term}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`term-definition-${index}`}>
                    {item.definition}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12" data-testid="no-results">
              <p className="text-muted-foreground text-lg">
                No terms found matching "{searchTerm}". Try a different search term.
              </p>
            </div>
          )}

          {/* Terms Count */}
          <div className="text-center mt-12" data-testid="terms-count">
            <p className="text-muted-foreground">
              Showing {filteredTerms.length} of {glossaryTerms.length} terms
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}