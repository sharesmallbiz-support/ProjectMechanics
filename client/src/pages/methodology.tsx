import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Cog, Youtube, Award, Users, Check, Play } from "lucide-react";
import { METHODOLOGY_CONTENT, YOUTUBE_VIDEO_ID } from "@/lib/constants";

export default function Methodology() {
  const { artVsScience, constituencies, pmiFramework } = METHODOLOGY_CONTENT;

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
              Discover the core principles of Project Mechanics, combining the art of communication with the science of structured project management for superior results.
            </p>
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
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60" 
                        alt="Mark Hazleton profile photo" 
                        className="w-12 h-12 rounded-full mr-3" 
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
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450" 
                        alt="Project Mechanics podcast video thumbnail" 
                        className="w-full h-full object-cover" 
                        data-testid="img-methodology-podcast-thumbnail"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button 
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 flex items-center justify-center transition-colors"
                          data-testid="button-methodology-play-video"
                        >
                          <Play className="w-8 h-8 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
