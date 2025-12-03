# Troubleshooting Guide - Document Agent

## Common Issues & Solutions

### 1. API Connection Errors (408 Timeout / CSP Violation)

**Symptoms:**

- Browser console shows "Network timeout" errors
- "Content Security Policy" violations
- Cannot connect to `localhost:8000`

**Solutions:**

#### A. Clear Browser Cache & Service Workers

1. Open browser DevTools (F12)
2. Go to **Application** tab → **Service Workers**
3. Click **Unregister** for any service workers
4. Go to **Application** tab → **Storage** → **Clear site data**
5. Hard refresh the page: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

#### B. Restart Services

```powershell
.\stop-services.ps1
.\start.ps1
```

#### C. Check API is Running

```powershell
# Test API connection
curl.exe http://localhost:8000/api/v1/health
```

Should return: `{"status":"healthy",...}`

### 2. API Server Won't Start

**Symptoms:**

- Error about `CORS_ORIGINS` or JSON parsing
- `pydantic_settings.exceptions.SettingsError`

**Solution:**
Check `document-agent-api/.env` - ensure CORS_ORIGINS is commented out or in JSON format:

```bash
# Use default CORS settings (recommended)
# CORS_ORIGINS=...

# OR use JSON array format:
# CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

### 3. Missing Dependencies

**Symptoms:**

- `ModuleNotFoundError`
- `command not found` errors

**Solution:**

```powershell
.\setup.ps1  # Re-run setup
```

### 4. Virtual Environment Not Found

**Symptoms:**

- `venv\Scripts\Activate.ps1 not found`
- Python packages not found

**Solution:**

```powershell
cd document-agent-api
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 5. Port Already in Use

**Symptoms:**

- `Port 8000 already in use`
- `Port 5173 already in use`

**Solution:**

```powershell
.\stop-services.ps1  # Stop all services
.\start.ps1          # Restart
```

Or manually find and kill processes:

```powershell
# Find process on port 8000
Get-NetTCPConnection -LocalPort 8000 | Select-Object OwningProcess

# Kill process (replace PID)
Stop-Process -Id <PID> -Force
```

### 6. API Keys Not Configured

**Symptoms:**

- API starts but returns errors about AI models
- "API key not configured" messages

**Solution:**
Edit `document-agent-api/.env` and add your API keys:

```bash
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...
```

### 7. CORS Errors in Browser

**Symptoms:**

- "Access to fetch at '<http://localhost:8000>' from origin '<http://localhost:5173>' has been blocked by CORS policy"

**Solution:**
This should be fixed by default settings. If still occurring:

1. Ensure API server restarted after any config changes
2. Check browser console for exact error
3. Clear browser cache and reload

### 8. Web App Shows Blank Page

**Symptoms:**

- White/blank page at `localhost:5173`
- No errors in console

**Solution:**

```powershell
cd document-agent-web
npm install  # Reinstall dependencies
npm run dev  # Restart dev server
```

## Quick Health Check

Run these commands to verify everything is working:

```powershell
# 1. Check API is running
Test-NetConnection localhost -Port 8000

# 2. Test API health endpoint
curl.exe http://localhost:8000/api/v1/health

# 3. Test authentication
curl.exe -X POST http://localhost:8000/api/v1/auth/token -H "Content-Type: application/json" -d '{\"apiKey\":\"demo-api-key\"}'

# 4. Check Web is running
Test-NetConnection localhost -Port 5173
```

## Debug Mode

For more detailed error messages, enable debug mode:

1. Edit `document-agent-api/.env`:

   ```bash
   DEBUG=True
   ```

2. Restart API:

   ```powershell
   .\stop-services.ps1
   .\start.ps1
   ```

3. Check API terminal window for detailed logs

## Getting Help

If issues persist:

1. Check API terminal window for error messages
2. Check Web terminal window for error messages
3. Check browser console (F12) for client-side errors
4. Review this troubleshooting guide
5. Restart everything: `.\stop-services.ps1` then `.\start.ps1`

## Clean Restart

If all else fails, do a complete clean restart:

```powershell
# 1. Stop everything
.\stop-services.ps1

# 2. Remove virtual environment (optional - for serious issues)
Remove-Item -Recurse -Force document-agent-api\venv

# 3. Remove node_modules (optional - for serious issues)
Remove-Item -Recurse -Force document-agent-web\node_modules

# 4. Re-run setup
.\setup.ps1

# 5. Start services
.\start.ps1
```

---

**Last Updated:** December 2, 2025
