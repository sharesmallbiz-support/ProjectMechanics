import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "documentation", "assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "src"),
  build: {
    outDir: path.resolve(import.meta.dirname, "docs"),
    emptyOutDir: true,
  },
  server: {
    host: "localhost",
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
