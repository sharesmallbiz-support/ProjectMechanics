import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'docs')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Static site server running at http://0.0.0.0:${PORT}`);
  console.log('Serving static files from /docs folder');
});
