# Document Agent - Service Scripts

This directory contains PowerShell scripts to easily start and stop both the document-agent-api and document-agent-web services.

## 📜 Available Scripts

### `start.ps1` - Quick Start (Recommended)

The simplest way to launch both services in separate windows:

```powershell
.\start.ps1
```

This will:

- Start the FastAPI backend on <http://localhost:8000>
- Start the Vite/React frontend on <http://localhost:5173>
- Open both in separate PowerShell windows for easy monitoring

### `start-services.ps1` - Advanced Launcher

Full-featured launcher with multiple options:

```powershell
# Default: Start both in separate windows
.\start-services.ps1

# Start both in same window (background jobs)
.\start-services.ps1 -SingleWindow

# Start only API
.\start-services.ps1 -ApiOnly

# Start only Web
.\start-services.ps1 -WebOnly
```

Features:

- ✓ Port availability checking
- ✓ Python & Node.js version verification
- ✓ Virtual environment validation
- ✓ Dependency checking
- ✓ Color-coded output
- ✓ Background job management

### `stop-services.ps1` - Stop All Services

Stops all running document-agent processes:

```powershell
.\stop-services.ps1
```

This will:

- Find and terminate Python/uvicorn processes (port 8000)
- Find and terminate Node/Vite processes (port 5173)
- Clean up any orphaned processes

## 🚀 Quick Start Guide

### First Time Setup

**Run the automated setup script:**

```powershell
.\setup.ps1
```

This will:

- Create Python virtual environment
- Install API dependencies (FastAPI, uvicorn, etc.)
- Install Web dependencies (React, Vite, etc.)
- Create `.env` file from template
- Guide you through configuration

After setup completes, **edit `document-agent-api/.env`** and add your API keys:

```bash
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...
```

### Daily Development

1. **Start services:**

   ```powershell
   .\start.ps1
   ```

2. **Access the application:**
   - Web UI: <http://localhost:5173>
   - API Docs: <http://localhost:8000/docs>
   - API: <http://localhost:8000>

3. **Stop services when done:**

   ```powershell
   .\stop-services.ps1
   ```

   Or simply close the PowerShell windows.

## 📋 Prerequisites

- **Python 3.11+** (for API)
- **Node.js 18+** (for Web)
- **PowerShell 7+** (recommended)

## 🔧 Troubleshooting

### Port Already in Use

If you see "Port already in use" errors:

```powershell
# Stop all services first
.\stop-services.ps1

# Then restart
.\start.ps1
```

### Virtual Environment Not Found

```powershell
cd document-agent-api
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Node Modules Not Found

```powershell
cd document-agent-web
npm install
```

### API Key Missing

Edit `document-agent-api/.env` and add your OpenAI or Anthropic API key:

```bash
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...
```

## 📖 More Information

- API Documentation: See `document-agent-api/README.md`
- Web Documentation: See `document-agent-web/README.md`
- API Specification: See `API-SPECIFICATION.md`

## 🎯 Usage Examples

### Development with Auto-Reload

Both services support hot-reload during development:

- API: Changes to Python files automatically reload
- Web: Changes to React components update instantly

### Background Jobs (Single Window Mode)

```powershell
# Start in single window
.\start-services.ps1 -SingleWindow

# Check job status
Get-Job

# View output
Receive-Job -Id 1  # API
Receive-Job -Id 2  # Web

# Stop specific job
Stop-Job -Id 1
```

### Selective Startup

```powershell
# Only start API (if you have a separate frontend)
.\start-services.ps1 -ApiOnly

# Only start Web (if API is running elsewhere)
.\start-services.ps1 -WebOnly
```

## 🛠️ Manual Commands

If you prefer to run commands manually:

**API:**

```powershell
cd document-agent-api
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Web:**

```powershell
cd document-agent-web
npm run dev
```

---

**Happy Coding! 🚀**
