import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from the docs folder
app.use(express.static(path.join(__dirname, '..', 'docs')));

// SPA fallback - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'docs', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Static site server running!`);
  console.log(`📁 Serving from: /docs folder`);
  console.log(`🌐 Local: http://0.0.0.0:${PORT}`);
  console.log(`\nThis is a preview server for the static GitHub Pages site.`);
  console.log(`To rebuild: ./build-static.sh\n`);
});
