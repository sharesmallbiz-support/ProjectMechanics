import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { DomainOverview } from "@/components/domain-overview";
import { MethodologySection } from "@/components/methodology-section";
import { PMODashboard } from "@/components/pmo-dashboard";
import { BlogEngine } from "@/components/blog-engine";
import { ResourcesSection } from "@/components/resources-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <DomainOverview />
      <MethodologySection />
      <PMODashboard />
      <BlogEngine />
      <ResourcesSection />
      <Footer />
    </div>
  );
}
