import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Cog, Youtube, Award, Users, Check, Play } from "lucide-react";
import { METHODOLOGY_CONTENT, YOUTUBE_VIDEO_ID } from "@/lib/constants";
import { Link } from "wouter";

export default function Methodology() {
  const { overview, projectPortfolioManagement, benefitsOfConsistency, artVsScience, constituencies, projectLifeCycle, kickOffMeeting, pmiFramework } = METHODOLOGY_CONTENT;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-methodology-hero-title">
              Project Management <span className="text-yellow-300">Methodology</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-methodology-hero-description">
              {overview.description}
            </p>
            
            {/* Sub-page Navigation */}
            <div className="mt-12 max-w-5xl mx-auto">
              <p className="text-base opacity-80 mb-6" data-testid="text-explore-sections">
                Explore our comprehensive methodology sections:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                <Link href="/methodology/project-management">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 py-6 px-4" 
                    data-testid="button-nav-project-management"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">Project</div>
                      <div className="text-sm">Management</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/methodology/portfolio-management">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 py-6 px-4" 
                    data-testid="button-nav-portfolio-management"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">Portfolio</div>
                      <div className="text-sm">Management</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/methodology/change-management">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 py-6 px-4" 
                    data-testid="button-nav-change-management"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">Change</div>
                      <div className="text-sm">Management</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/methodology/conflict-management">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 py-6 px-4" 
                    data-testid="button-nav-conflict-management"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">Conflict</div>
                      <div className="text-sm">Management</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/methodology/leadership">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 py-6 px-4" 
                    data-testid="button-nav-leadership"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">Project</div>
                      <div className="text-sm">Leadership</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/methodology/glossary">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 py-6 px-4" 
                    data-testid="button-nav-glossary"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">Glossary</div>
                      <div className="text-sm">& Terms</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/methodology/history">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 py-6 px-4" 
                    data-testid="button-nav-history"
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">History</div>
                      <div className="text-sm">& Evolution</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Podcast Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-card rounded-xl p-8 border border-border">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="bg-red-100 text-red-800 mb-4" data-testid="badge-podcast">
                    Featured Content
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4" data-testid="text-methodology-podcast-title">
                    Deep Dive: Project Mechanics Podcast
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg" data-testid="text-methodology-podcast-description">
                    Join Mark Hazleton and the deep dive podcast team in their comprehensive discussion on Project Mechanics. Explore both the art and the science behind successful project execution with real-world examples and practical insights.
                  </p>
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="flex items-center">
                      <img 
                        src="/attached_assets/MarkHazleton_1757354250316.jpg" 
                        alt="Mark Hazleton profile photo" 
                        className="w-12 h-12 rounded-full mr-3 object-cover" 
                        data-testid="img-methodology-author"
                      />
                      <div>
                        <p className="font-semibold" data-testid="text-methodology-author-name">Mark Hazleton</p>
                        <p className="text-sm text-muted-foreground" data-testid="text-methodology-author-subscribers">24 subscribers</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-red-600 text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors flex items-center text-lg"
                    data-testid="button-methodology-watch-youtube"
                  >
                    <Youtube className="mr-3 h-5 w-5" />
                    Watch Full Episode
                  </Button>
                </div>
                <div className="relative">
                  <div className="bg-black rounded-xl overflow-hidden aspect-video">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?si=kv9FmWXhm1OCRl23`}
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      className="rounded-xl"
                      data-testid="iframe-methodology-podcast-video"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Project Portfolio Management Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-ppm-title">
              {projectPortfolioManagement.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-ppm-description">
              {projectPortfolioManagement.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projectPortfolioManagement.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start" data-testid={`ppm-benefit-${index}`}>
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Consistency Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-consistency-title">
              {benefitsOfConsistency.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-consistency-description">
              {benefitsOfConsistency.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {benefitsOfConsistency.advantages.map((advantage, index) => (
              <div key={index} className="flex items-start" data-testid={`consistency-advantage-${index}`}>
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="text-muted-foreground">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Art vs Science Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-art-science-title">
                {artVsScience.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-art-science-description">
                {artVsScience.content}
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Palette className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" data-testid="text-art-title">The Art: Communication</h4>
                    <p className="text-muted-foreground" data-testid="text-art-description">
                      {artVsScience.artDescription}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Cog className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" data-testid="text-science-title">The Science: Mechanics</h4>
                    <p className="text-muted-foreground" data-testid="text-science-description">
                      {artVsScience.scienceDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Project management workflow diagrams and charts" 
                className="rounded-xl shadow-lg w-full h-auto" 
                data-testid="img-art-science"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three Constituencies Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-constituencies-main-title">
              Three Key Constituencies
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-constituencies-main-description">
              Effective communication with these three groups is essential for project success in any service delivery environment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {constituencies.map((constituency, index) => (
              <Card 
                key={index}
                className={`bg-${constituency.color}-50 border-${constituency.color}-200 p-6`}
                data-testid={`card-constituency-detailed-${constituency.name.toLowerCase()}`}
              >
                <CardContent className="p-0">
                  <h3 className={`text-2xl font-bold text-${constituency.color}-900 mb-4`} data-testid={`text-constituency-detailed-${constituency.name.toLowerCase()}-name`}>
                    {constituency.name}
                  </h3>
                  <p className={`text-${constituency.color}-800 text-lg`} data-testid={`text-constituency-detailed-${constituency.name.toLowerCase()}-description`}>
                    {constituency.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Life Cycle Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-lifecycle-title">
              {projectLifeCycle.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-lifecycle-description">
              {projectLifeCycle.description}
            </p>
          </div>
          
          {/* Project Life Cycle Visual Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6" data-testid="text-lifecycle-states-diagram">
                Project States Overview
              </h3>
              <img 
                src="/attached_assets/MarkHazleton-Project-Life-Cycle_1757354804021.jpg" 
                alt="Project Life Cycle States Diagram showing the circular flow of project states" 
                className="w-full max-w-md mx-auto rounded-xl shadow-lg" 
                data-testid="img-lifecycle-states"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6" data-testid="text-lifecycle-sequence-diagram">
                Project Life Cycle Flow
              </h3>
              <img 
                src="/attached_assets/ProjectLifeCycle_SequenceDiagram_1757354804021.png" 
                alt="Project Life Cycle Sequence Diagram showing decision points and flow paths" 
                className="w-full max-w-lg mx-auto rounded-xl shadow-lg bg-white p-4" 
                data-testid="img-lifecycle-sequence"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            {projectLifeCycle.states.map((state, index) => (
              <Card key={index} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow" data-testid={`lifecycle-state-${index}`}>
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg mr-4">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold" data-testid={`state-name-${index}`}>
                            {state.name}
                          </h3>
                          {state.keyQuestion && (
                            <p className="text-primary font-semibold italic" data-testid={`state-question-${index}`}>
                              "{state.keyQuestion}"
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground font-medium mb-2" data-testid={`state-status-${index}`}>
                        {state.status}
                      </p>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <p className="text-muted-foreground mb-6" data-testid={`state-description-${index}`}>
                        {state.description}
                      </p>
                      
                      {state.keyPoints && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-3">Key Points:</h4>
                          <div className="space-y-2">
                            {state.keyPoints.map((point, pointIndex) => (
                              <div key={pointIndex} className="flex items-center" data-testid={`state-keypoint-${index}-${pointIndex}`}>
                                <Check className="text-green-600 mr-3 h-4 w-4" />
                                <span className="text-muted-foreground">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {state.deliverable && (
                        <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                          <h4 className="font-semibold mb-2">Key Deliverable:</h4>
                          <p className="text-muted-foreground" data-testid={`state-deliverable-${index}`}>
                            {state.deliverable}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Kick-Off Meeting Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-kickoff-title">
              {kickOffMeeting.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12" data-testid="text-kickoff-description">
              {kickOffMeeting.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {kickOffMeeting.agenda.map((item, index) => (
              <div key={index} className="flex items-start" data-testid={`kickoff-agenda-${index}`}>
                <Check className="text-green-600 mr-3 h-5 w-5 mt-1" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PMI Framework Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Award className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" data-testid="text-pmi-methodology-title">
                      {pmiFramework.title}
                    </h3>
                    <p className="text-muted-foreground">Professional alignment with industry standards</p>
                  </div>
                </div>
                <blockquote className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary mb-6">
                  <p className="text-foreground italic mb-4" data-testid="text-pmi-methodology-quote">
                    "{pmiFramework.quote}"
                  </p>
                  <cite className="text-muted-foreground">— PMI Guide to the Project Management Body of Knowledge (PMBOK® Guide)</cite>
                </blockquote>
                <div className="space-y-3">
                  {pmiFramework.processes.map((process, index) => (
                    <div key={index} className="flex items-center" data-testid={`pmi-methodology-process-${index}`}>
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span>{process}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Mechanics Philosophy */}
            <Card className="bg-card rounded-xl p-8 border border-border">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Users className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" data-testid="text-philosophy-title">Project Mechanics Philosophy</h3>
                    <p className="text-muted-foreground">Practical, adaptable framework</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground" data-testid="text-philosophy-description">
                    Project Mechanics is built on the foundation of clear communication, efficient planning, and agile response to change. It emphasizes understanding project scope thoroughly, managing resources efficiently, and maintaining open lines of communication with all stakeholders.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span>Clear Communication Framework</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span>Efficient Planning Methodologies</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span>Agile Response to Change</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-green-600 mr-3 h-5 w-5" />
                      <span>Practical Implementation Focus</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
