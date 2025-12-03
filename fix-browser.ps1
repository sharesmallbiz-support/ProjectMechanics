#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Quick fix for service worker and CSP issues.

.DESCRIPTION
    This script helps clear browser cache and service workers that may be
    blocking API connections.
#>

Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Yellow
Write-Host "║   Service Worker / CSP Fix                    ║" -ForegroundColor Yellow
Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Yellow

Write-Host "If you're seeing CSP or 408 timeout errors, follow these steps:`n" -ForegroundColor Cyan

Write-Host "1. Open your browser DevTools (F12)" -ForegroundColor White
Write-Host "   Press F12 in your browser`n" -ForegroundColor Gray

Write-Host "2. Go to the Application tab" -ForegroundColor White
Write-Host "   Click on 'Application' in the top menu`n" -ForegroundColor Gray

Write-Host "3. Clear Service Workers" -ForegroundColor White
Write-Host "   - In the left sidebar, click 'Service Workers'" -ForegroundColor Gray
Write-Host "   - Click 'Unregister' for any service workers`n" -ForegroundColor Gray

Write-Host "4. Clear Storage" -ForegroundColor White
Write-Host "   - In the left sidebar, click 'Storage'" -ForegroundColor Gray
Write-Host "   - Click 'Clear site data' button`n" -ForegroundColor Gray

Write-Host "5. Hard Refresh" -ForegroundColor White
Write-Host "   - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)`n" -ForegroundColor Gray

Write-Host "6. Verify API Connection" -ForegroundColor White
Write-Host "   - In the Console tab, you should see successful API calls" -ForegroundColor Gray
Write-Host "   - No more CSP errors`n" -ForegroundColor Gray

Write-Host "═══════════════════════════════════════════════════`n" -ForegroundColor Yellow

Write-Host "Checking services..." -ForegroundColor Cyan

# Check if API is running
$apiRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/v1/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ API is running on http://localhost:8000" -ForegroundColor Green
        $apiRunning = $true
    }
}
catch {
    Write-Host "✗ API is not running" -ForegroundColor Red
}

# Check if Web is running
$webRunning = $false
try {
    $connection = Test-NetConnection -ComputerName localhost -Port 5173 -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($connection) {
        Write-Host "✓ Web is running on http://localhost:5173" -ForegroundColor Green
        $webRunning = $true
    }
}
catch {
    Write-Host "✗ Web is not running" -ForegroundColor Red
}

if (-not $apiRunning -or -not $webRunning) {
    Write-Host "`nServices not running. Start them with:" -ForegroundColor Yellow
    Write-Host "  .\start.ps1`n" -ForegroundColor Cyan
}
else {
    Write-Host "`n✓ All services are running!" -ForegroundColor Green
    Write-Host "  Open http://localhost:5173 and follow steps above`n" -ForegroundColor Cyan
}
