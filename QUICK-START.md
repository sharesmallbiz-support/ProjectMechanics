# 🚀 Document Agent - Quick Reference

## Setup (First Time Only)

```powershell
.\setup.ps1
# Then edit document-agent-api/.env with your API keys
```

## Daily Usage

### Start Both Services

```powershell
.\start.ps1
```

- API: <http://localhost:8000>
- API Docs: <http://localhost:8000/docs>
- Web: <http://localhost:5173>

### Stop Services

```powershell
.\stop-services.ps1
```

Or close the PowerShell windows.

## Advanced Options

### Start with Options

```powershell
# Both in separate windows (default)
.\start-services.ps1

# Both in same window
.\start-services.ps1 -SingleWindow

# Only API
.\start-services.ps1 -ApiOnly

# Only Web
.\start-services.ps1 -WebOnly
```

## Troubleshooting

### Port Already in Use

```powershell
.\stop-services.ps1
.\start.ps1
```

### Dependencies Missing

```powershell
.\setup.ps1
```

### Check if Services are Running

```powershell
# Check port 8000 (API)
Test-NetConnection localhost -Port 8000

# Check port 5173 (Web)
Test-NetConnection localhost -Port 5173
```

## Files

- `setup.ps1` - First-time setup (creates venv, installs deps)
- `start.ps1` - Quick launcher (simple, recommended)
- `start-services.ps1` - Advanced launcher (multiple modes)
- `stop-services.ps1` - Stop all services
- `SCRIPTS-README.md` - Full documentation

## Environment

- **API**: Python 3.14, FastAPI, uvicorn
- **Web**: Node.js 25, Vite, React
- **Ports**: 8000 (API), 5173 (Web)

---

**Quick Start:** `.\setup.ps1` (once) → `.\start.ps1` (daily)
