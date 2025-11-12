import { Card, CardContent } from "@/components/ui/card";
import { Palette, Cog } from "lucide-react";
import { METHODOLOGY_CONTENT } from "@/lib/constants";

export function MethodologySection() {
  const { artVsScience, constituencies } = METHODOLOGY_CONTENT;

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
              <Card 
                key={index}
                className="p-6"
                data-testid={`card-constituency-${constituency.name.toLowerCase()}`}
              >
                <CardContent className="p-0">
                  <h4 className="font-semibold mb-2" data-testid={`text-constituency-${constituency.name.toLowerCase()}-name`}>
                    {constituency.name}
                  </h4>
                  <p className="text-muted-foreground" data-testid={`text-constituency-${constituency.name.toLowerCase()}-description`}>
                    {constituency.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
