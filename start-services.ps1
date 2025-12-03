#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Starts both document-agent-api (Python/FastAPI) and document-agent-web (Vite/React) services.

.DESCRIPTION
    This script starts both the backend API and frontend web application in separate
    PowerShell windows so you can monitor both services simultaneously.
    
    Requirements:
    - Python 3.11+ with virtual environment
    - Node.js and npm
    - .env file configured in document-agent-api

.PARAMETER SingleWindow
    Run both services in the same terminal using background jobs

.PARAMETER ApiOnly
    Start only the API service

.PARAMETER WebOnly
    Start only the web service

.EXAMPLE
    .\start-services.ps1
    Starts both services in separate windows

.EXAMPLE
    .\start-services.ps1 -SingleWindow
    Starts both services in the same terminal window

.EXAMPLE
    .\start-services.ps1 -ApiOnly
    Starts only the API service
#>

param(
    [switch]$SingleWindow,
    [switch]$ApiOnly,
    [switch]$WebOnly
)

# Script configuration
$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
$ApiPath = Join-Path $ProjectRoot "document-agent-api"
$WebPath = Join-Path $ProjectRoot "document-agent-web"
$VenvPath = Join-Path $ApiPath "venv"

# Color functions
function Write-Success { param($Message) Write-Host "✓ $Message" -ForegroundColor Green }
function Write-Info { param($Message) Write-Host "ℹ $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠ $Message" -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host "✗ $Message" -ForegroundColor Red }

# Banner
Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Document Agent - Service Launcher           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Validate paths
if (-not (Test-Path $ApiPath)) {
    Write-Error "API directory not found: $ApiPath"
    exit 1
}

if (-not (Test-Path $WebPath)) {
    Write-Error "Web directory not found: $WebPath"
    exit 1
}

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
        return $connection
    }
    catch {
        return $false
    }
}

# Function to start API service
function Start-ApiService {
    Write-Info "Starting Document Agent API (FastAPI)..."
    
    # Check Python
    try {
        $pythonVersion = python --version 2>&1
        Write-Success "Found Python: $pythonVersion"
    }
    catch {
        Write-Error "Python not found. Please install Python 3.11+"
        exit 1
    }

    # Check virtual environment
    if (-not (Test-Path $VenvPath)) {
        Write-Warning "Virtual environment not found. Creating one..."
        Push-Location $ApiPath
        python -m venv venv
        Pop-Location
    }

    # Check .env file
    $envFile = Join-Path $ApiPath ".env"
    if (-not (Test-Path $envFile)) {
        Write-Warning ".env file not found. Please configure your environment variables."
        $envExample = Join-Path $ApiPath ".env.example"
        if (Test-Path $envExample) {
            Write-Info "Copy .env.example to .env and configure your API keys"
        }
    }

    # Check if port 8000 is available
    if (Test-Port -Port 8000) {
        Write-Warning "Port 8000 is already in use. API might already be running."
        $continue = Read-Host "Continue anyway? (y/N)"
        if ($continue -ne 'y' -and $continue -ne 'Y') {
            return
        }
    }

    # Activate venv and start server
    $activateScript = Join-Path $VenvPath "Scripts\Activate.ps1"
    
    if ($SingleWindow) {
        # Start as background job
        Write-Info "Starting API in background..."
        $apiJob = Start-Job -ScriptBlock {
            param($ApiPath, $ActivateScript)
            Set-Location $ApiPath
            & $ActivateScript
            python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
        } -ArgumentList $ApiPath, $activateScript
        
        Write-Success "API job started (Job ID: $($apiJob.Id))"
        Start-Sleep -Seconds 3
    }
    else {
        # Start in new window
        $apiCommand = "Set-Location '$ApiPath'; & '$activateScript'; python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
        Start-Process pwsh -ArgumentList "-NoExit", "-Command", $apiCommand
        Write-Success "API started in new window"
        Start-Sleep -Seconds 5
    }

    Write-Info "API should be available at: http://localhost:8000"
    Write-Info "API docs available at: http://localhost:8000/docs"
}

# Function to start Web service
function Start-WebService {
    Write-Info "Starting Document Agent Web (Vite + React)..."
    
    # Check Node.js
    try {
        $nodeVersion = node --version 2>&1
        Write-Success "Found Node.js: $nodeVersion"
    }
    catch {
        Write-Error "Node.js not found. Please install Node.js"
        exit 1
    }

    # Check if node_modules exists
    $nodeModules = Join-Path $WebPath "node_modules"
    if (-not (Test-Path $nodeModules)) {
        Write-Warning "Dependencies not installed. Running npm install..."
        Push-Location $WebPath
        npm install
        Pop-Location
    }

    # Check if port 5173 is available
    if (Test-Port -Port 5173) {
        Write-Warning "Port 5173 is already in use. Web app might already be running."
        $continue = Read-Host "Continue anyway? (y/N)"
        if ($continue -ne 'y' -and $continue -ne 'Y') {
            return
        }
    }

    if ($SingleWindow) {
        # Start as background job
        Write-Info "Starting Web in background..."
        $webJob = Start-Job -ScriptBlock {
            param($WebPath)
            Set-Location $WebPath
            npm run dev
        } -ArgumentList $WebPath
        
        Write-Success "Web job started (Job ID: $($webJob.Id))"
        Start-Sleep -Seconds 3
    }
    else {
        # Start in new window
        $webCommand = "Set-Location '$WebPath'; npm run dev"
        Start-Process pwsh -ArgumentList "-NoExit", "-Command", $webCommand
        Write-Success "Web started in new window"
        Start-Sleep -Seconds 3
    }

    Write-Info "Web app should be available at: http://localhost:5173"
}

# Check setup
$setupComplete = $true
if (-not (Test-Path $VenvPath)) {
    Write-Warning "Virtual environment not found at: $VenvPath"
    $setupComplete = $false
}

$nodeModules = Join-Path $WebPath "node_modules"
if (-not (Test-Path $nodeModules)) {
    Write-Warning "Node modules not found at: $nodeModules"
    $setupComplete = $false
}

if (-not $setupComplete) {
    Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Yellow
    Write-Host "║   Setup Required                               ║" -ForegroundColor Yellow
    Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Yellow
    Write-Info "Please run: .\setup.ps1`n"
    exit 1
}

# Main execution
try {
    if ($ApiOnly) {
        Start-ApiService
    }
    elseif ($WebOnly) {
        Start-WebService
    }
    else {
        # Start both services
        Start-ApiService
        Write-Host ""
        Start-WebService
    }

    Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║   Services Started Successfully!               ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Green

    Write-Info "API:  http://localhost:8000"
    Write-Info "Docs: http://localhost:8000/docs"
    Write-Info "Web:  http://localhost:5173`n"

    if ($SingleWindow) {
        Write-Host "Services are running as background jobs." -ForegroundColor Yellow
        Write-Host "Use 'Get-Job' to check status" -ForegroundColor Yellow
        Write-Host "Use 'Receive-Job -Id <id>' to see output" -ForegroundColor Yellow
        Write-Host "Use 'Stop-Job -Id <id>' to stop a service`n" -ForegroundColor Yellow
        
        # Show running jobs
        Get-Job | Format-Table -AutoSize
        
        Write-Host "`nPress Ctrl+C to stop all services and exit..." -ForegroundColor Yellow
        
        # Wait for Ctrl+C
        try {
            while ($true) {
                Start-Sleep -Seconds 1
            }
        }
        finally {
            Write-Info "Stopping all services..."
            Get-Job | Stop-Job
            Get-Job | Remove-Job
            Write-Success "All services stopped"
        }
    }
    else {
        Write-Host "Services are running in separate windows." -ForegroundColor Yellow
        Write-Host "Close the windows to stop the services.`n" -ForegroundColor Yellow
    }

}
catch {
    Write-Error "An error occurred: $_"
    exit 1
}
