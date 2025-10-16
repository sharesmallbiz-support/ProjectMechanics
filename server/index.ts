import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from the docs folder
app.use(express.static(path.join(__dirname, "..", "docs")));

// SPA fallback - serve index.html for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "docs", "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`\n✅ Static site server running!`);
  console.log(`📁 Serving from: /docs folder`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`\nThis is a preview server for the static GitHub Pages site.`);
  console.log(`To rebuild: ./build-static.sh\n`);
});

// Handle errors
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`\n❌ Error: Port ${PORT} is already in use.`);
    console.error(`Please close the other application or change the port.\n`);
  } else {
    console.error(`\n❌ Server error:`, error);
  }
  process.exit(1);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\n👋 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed successfully");
    process.exit(0);
  });
});
