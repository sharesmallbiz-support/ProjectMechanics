import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" data-testid="link-home">
              <div className="flex items-center cursor-pointer">
                <h1 className="text-xl font-bold text-foreground">Project Mechanics</h1>
              </div>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/methodology" data-testid="link-methodology">
                <span className="nav-link text-muted-foreground font-medium cursor-pointer">
                  Methodology
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-explore-framework"
              asChild
            >
              <Link href="/methodology">
                Explore Framework
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
