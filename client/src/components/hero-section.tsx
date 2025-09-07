import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="gradient-bg text-primary-foreground py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Master the <span className="text-yellow-300">Art and Science</span> of Project Management
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed">
              Project Mechanics is a proven methodology that combines structured project management techniques with flexible, adaptive problem-solving approaches. Built on clear communication, efficient planning, and agile response to change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-primary-foreground text-primary px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
                data-testid="button-explore-methodology"
              >
                Explore Methodology
              </Button>
              <Button 
                variant="outline"
                className="border border-primary-foreground text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
                data-testid="button-watch-podcast"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Podcast
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional team meeting discussing project management" 
              className="rounded-xl shadow-2xl w-full h-auto" 
              data-testid="img-hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
