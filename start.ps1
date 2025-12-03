#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Simple launcher for both document-agent services.

.DESCRIPTION
    Quickly starts both API and Web services in separate windows.
    This is the simplest way to get both services running.

.EXAMPLE
    .\start.ps1
#>

$ErrorActionPreference = "Stop"

Write-Host "`n🚀 Starting Document Agent Services...`n" -ForegroundColor Cyan

# Check if setup is complete
$apiPath = Join-Path $PSScriptRoot "document-agent-api"
$webPath = Join-Path $PSScriptRoot "document-agent-web"
$venvPath = Join-Path $apiPath "venv"
$nodeModules = Join-Path $webPath "node_modules"

if (-not (Test-Path $venvPath) -or -not (Test-Path $nodeModules)) {
    Write-Host "⚠ First time setup required!" -ForegroundColor Yellow
    Write-Host "`nPlease run: .\setup.ps1`n" -ForegroundColor Cyan
    exit 1
}

# Start API
Write-Host "Starting API (FastAPI)..." -ForegroundColor Green
$venvActivate = Join-Path $apiPath "venv\Scripts\Activate.ps1"

Start-Process pwsh -ArgumentList "-NoExit", "-Command", @"
Set-Location '$apiPath'
& '$venvActivate'
Write-Host '🔵 API Server Starting...' -ForegroundColor Cyan
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
"@

Start-Sleep -Seconds 5

# Start Web
Write-Host "Starting Web (Vite + React)..." -ForegroundColor Green
$webPath = Join-Path $PSScriptRoot "document-agent-web"

Start-Process pwsh -ArgumentList "-NoExit", "-Command", @"
Set-Location '$webPath'
Write-Host '🟢 Web App Starting...' -ForegroundColor Cyan
npm run dev
"@

Write-Host "`n✓ Services launched!" -ForegroundColor Green
Write-Host "  API:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "  Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "  Web:  http://localhost:5173`n" -ForegroundColor Cyan
