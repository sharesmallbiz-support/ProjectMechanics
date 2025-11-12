import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const BASE_URL = "https://sharesmallbiz-support.github.io/ProjectMechanics";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Project Mechanics - Project Management Methodology",
    template: "%s | Project Mechanics",
  },
  description: "Comprehensive project management methodology covering project lifecycle, portfolio management, change management, conflict resolution, and leadership principles.",
  keywords: ["project management", "methodology", "portfolio management", "change management", "leadership", "project lifecycle"],
  authors: [{ name: "Mark Hazleton" }],
  creator: "Mark Hazleton",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Project Mechanics",
    title: "Project Mechanics - Project Management Methodology",
    description: "Comprehensive project management methodology for successful project delivery.",
    images: [
      {
        url: `${BASE_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: "Project Mechanics Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Mechanics - Project Management Methodology",
    description: "Comprehensive project management methodology for successful project delivery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
