import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { DomainOverview } from "@/components/domain-overview";
import { MethodologySection } from "@/components/methodology-section";
import { ResourcesSection } from "@/components/resources-section";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata("home");

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <DomainOverview />
      <MethodologySection />
      <ResourcesSection />
    </div>
  );
}
