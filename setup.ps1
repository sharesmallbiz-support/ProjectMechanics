#!/usr/bin/env pwsh

<#
.SYNOPSIS
    First-time setup for Document Agent services.

.DESCRIPTION
    Sets up both API and Web environments:
    - Creates Python virtual environment
    - Installs API dependencies
    - Installs Web dependencies
    - Creates .env file from template

.EXAMPLE
    .\setup.ps1
#>

$ErrorActionPreference = "Stop"

function Write-Success { param($Message) Write-Host "✓ $Message" -ForegroundColor Green }
function Write-Info { param($Message) Write-Host "ℹ $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠ $Message" -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host "✗ $Message" -ForegroundColor Red }

Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Document Agent - First Time Setup           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

$projectRoot = $PSScriptRoot
$apiPath = Join-Path $projectRoot "document-agent-api"
$webPath = Join-Path $projectRoot "document-agent-web"

# Check prerequisites
Write-Info "Checking prerequisites..."

# Check Python
try {
    $pythonVersion = python --version 2>&1
    Write-Success "Found Python: $pythonVersion"
}
catch {
    Write-Error "Python not found. Please install Python 3.11+ from https://www.python.org/"
    exit 1
}

# Check Node.js
try {
    $nodeVersion = node --version 2>&1
    Write-Success "Found Node.js: $nodeVersion"
}
catch {
    Write-Error "Node.js not found. Please install Node.js from https://nodejs.org/"
    exit 1
}

# Setup API
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Info "Setting up Document Agent API..."
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

Push-Location $apiPath

# Create virtual environment
$venvPath = Join-Path $apiPath "venv"
$needsVenvSetup = $false

if (Test-Path $venvPath) {
    Write-Warning "Virtual environment already exists"
    $recreate = Read-Host "Recreate it? (y/N)"
    if ($recreate -eq 'y' -or $recreate -eq 'Y') {
        Write-Info "Removing old virtual environment..."
        Remove-Item -Recurse -Force $venvPath
        $needsVenvSetup = $true
    }
    else {
        Write-Info "Keeping existing virtual environment"
    }
}
else {
    $needsVenvSetup = $true
}

if ($needsVenvSetup) {
    Write-Info "Creating Python virtual environment..."
    python -m venv venv
    Write-Success "Virtual environment created"
}

# Activate and install dependencies
$activateScript = Join-Path $venvPath "Scripts\Activate.ps1"
Write-Info "Installing Python dependencies..."

& $activateScript
pip install --upgrade pip
pip install -r requirements.txt

Write-Success "Python dependencies installed"

# Setup .env file
$envFile = Join-Path $apiPath ".env"
$envExample = Join-Path $apiPath ".env.example"

if (-not (Test-Path $envFile)) {
    if (Test-Path $envExample) {
        Write-Info "Creating .env file from template..."
        Copy-Item $envExample $envFile
        Write-Warning ".env file created - PLEASE EDIT IT and add your API keys!"
        Write-Info "Edit: $envFile"
    }
    else {
        Write-Info "Creating basic .env file..."
        $envContent = @"
# Security
JWT_SECRET_KEY=your-secret-key-change-this-in-production

# AI Services (add at least one)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DEFAULT_AI_MODEL=gpt-4

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
"@
        $envContent | Out-File -FilePath $envFile -Encoding utf8
        Write-Warning ".env file created - PLEASE EDIT IT and add your API keys!"
        Write-Info "Edit: $envFile"
    }
}
else {
    Write-Success ".env file already exists"
}

Pop-Location

# Setup Web
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Info "Setting up Document Agent Web..."
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

Push-Location $webPath

$nodeModules = Join-Path $webPath "node_modules"
if (Test-Path $nodeModules) {
    Write-Warning "Node modules already installed"
    $reinstall = Read-Host "Reinstall? (y/N)"
    if ($reinstall -eq 'y' -or $reinstall -eq 'Y') {
        Write-Info "Removing old node_modules..."
        Remove-Item -Recurse -Force $nodeModules
        Write-Info "Installing npm dependencies..."
        npm install
    }
    else {
        Write-Info "Keeping existing node_modules"
    }
}
else {
    Write-Info "Installing npm dependencies..."
    npm install
    Write-Success "npm dependencies installed"
}

Pop-Location

# Summary
Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   Setup Complete!                              ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Edit document-agent-api/.env and add your API keys" -ForegroundColor Yellow
Write-Host "  2. Run: .\start.ps1" -ForegroundColor Yellow
Write-Host "  3. Access web UI at: http://localhost:5173`n" -ForegroundColor Yellow

# Ask if user wants to edit .env now
$editNow = Read-Host "Open .env file now? (y/N)"
if ($editNow -eq 'y' -or $editNow -eq 'Y') {
    $envFile = Join-Path $apiPath ".env"
    code $envFile
}
