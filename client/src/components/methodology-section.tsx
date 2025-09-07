import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Cog, Youtube } from "lucide-react";
import { METHODOLOGY_CONTENT, YOUTUBE_VIDEO_ID } from "@/lib/constants";

export function MethodologySection() {
  const { artVsScience, constituencies, pmiFramework } = METHODOLOGY_CONTENT;

  return (
    <section id="methodology" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-methodology-title">
              {artVsScience.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-methodology-description">
              {artVsScience.content}
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Palette className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">The Art: Communication</h4>
                  <p className="text-muted-foreground">{artVsScience.artDescription}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Cog className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">The Science: Mechanics</h4>
                  <p className="text-muted-foreground">{artVsScience.scienceDescription}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Project management workflow diagrams and charts" 
              className="rounded-xl shadow-lg w-full h-auto" 
              data-testid="img-methodology"
            />
          </div>
        </div>

        {/* Three Constituencies */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-constituencies-title">
            Three Key Constituencies
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {constituencies.map((constituency, index) => (
              <div 
                key={index}
                className={`bg-${constituency.color}-50 p-6 rounded-lg`}
                data-testid={`card-constituency-${constituency.name.toLowerCase()}`}
              >
                <h4 className={`font-semibold text-${constituency.color}-900 mb-2`} data-testid={`text-constituency-${constituency.name.toLowerCase()}-name`}>
                  {constituency.name}
                </h4>
                <p className={`text-${constituency.color}-800`} data-testid={`text-constituency-${constituency.name.toLowerCase()}-description`}>
                  {constituency.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Podcast Section */}
        <Card className="bg-card rounded-xl p-8 border border-border">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4" data-testid="text-podcast-title">
                  Deep Dive: Project Mechanics Podcast
                </h3>
                <p className="text-muted-foreground mb-6" data-testid="text-podcast-description">
                  Join the deep dive podcast team in their discussion on Project Mechanics. Exploring both the art and the science behind successful project execution with Mark Hazleton.
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60" 
                      alt="Mark Hazleton profile photo" 
                      className="w-12 h-12 rounded-full mr-3" 
                      data-testid="img-author"
                    />
                    <div>
                      <p className="font-semibold" data-testid="text-author-name">Mark Hazleton</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-author-subscribers">24 subscribers</p>
                    </div>
                  </div>
                </div>
                <Button 
                  className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors flex items-center"
                  data-testid="button-watch-youtube"
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Watch on YouTube
                </Button>
              </div>
              <div className="relative">
                <div className="bg-black rounded-xl overflow-hidden aspect-video">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450" 
                      alt="Project Mechanics podcast video thumbnail" 
                      className="w-full h-full object-cover" 
                      data-testid="img-podcast-thumbnail"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center transition-colors"
                        data-testid="button-play-video"
                      >
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
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
  );
}
