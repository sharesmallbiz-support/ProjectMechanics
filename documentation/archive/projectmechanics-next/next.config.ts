import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ProjectMechanics",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Strict mode
  reactStrictMode: true,

  // Optional: Uncomment to minimize JavaScript further
  // compiler: {
  //   removeConsole: true,
  // },
};

export default nextConfig;
