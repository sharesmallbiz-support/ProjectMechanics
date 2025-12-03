#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Stops all running document-agent services.

.DESCRIPTION
    Finds and terminates Python (uvicorn) and Node (vite) processes
    related to the document-agent services.

.EXAMPLE
    .\stop-services.ps1
#>

$ErrorActionPreference = "Continue"

Write-Host "`n🛑 Stopping Document Agent Services...`n" -ForegroundColor Yellow

# Stop API (Python/uvicorn processes on port 8000)
Write-Host "Stopping API service..." -ForegroundColor Cyan
$apiProcesses = Get-Process -Name python -ErrorAction SilentlyContinue | 
Where-Object { $_.CommandLine -like "*uvicorn*app.main:app*" }

if ($apiProcesses) {
    $apiProcesses | ForEach-Object {
        Write-Host "  Stopping PID: $($_.Id)" -ForegroundColor Gray
        Stop-Process -Id $_.Id -Force
    }
    Write-Host "✓ API stopped" -ForegroundColor Green
}
else {
    Write-Host "  No API processes found" -ForegroundColor Gray
}

# Also try to stop by port 8000
try {
    $port8000 = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
    if ($port8000) {
        $pid = $port8000.OwningProcess
        Write-Host "  Stopping process on port 8000 (PID: $pid)" -ForegroundColor Gray
        Stop-Process -Id $pid -Force
    }
}
catch {
    # Ignore errors
}

# Stop Web (Node/vite processes)
Write-Host "`nStopping Web service..." -ForegroundColor Cyan
$webProcesses = Get-Process -Name node -ErrorAction SilentlyContinue | 
Where-Object { $_.CommandLine -like "*vite*" -or $_.CommandLine -like "*document-agent-web*" }

if ($webProcesses) {
    $webProcesses | ForEach-Object {
        Write-Host "  Stopping PID: $($_.Id)" -ForegroundColor Gray
        Stop-Process -Id $_.Id -Force
    }
    Write-Host "✓ Web stopped" -ForegroundColor Green
}
else {
    Write-Host "  No Web processes found" -ForegroundColor Gray
}

# Also try to stop by port 5173
try {
    $port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
    if ($port5173) {
        $pid = $port5173.OwningProcess
        Write-Host "  Stopping process on port 5173 (PID: $pid)" -ForegroundColor Gray
        Stop-Process -Id $pid -Force
    }
}
catch {
    # Ignore errors
}

Write-Host "`n✓ All services stopped`n" -ForegroundColor Green
