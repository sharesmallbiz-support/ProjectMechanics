#!/usr/bin/env pwsh
# cleanup-docs.ps1
# Script to organize markdown documentation files into copilot/session-{date} folders
# This keeps the repository root clean and organized

param(
    [switch]$DryRun,
    [switch]$Force,
    [string]$SessionDate = (Get-Date -Format "yyyy-MM-dd")
)

# Set error action preference
$ErrorActionPreference = "Stop"

# Define the project root
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$CopilotBaseDir = Join-Path $ProjectRoot "copilot"
$SessionDir = Join-Path $CopilotBaseDir "session-$SessionDate"

# Define patterns to exclude (files that should stay in root)
$ExcludePatterns = @(
    "README.md",
    "LICENSE.md",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md"
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Markdown Documentation Cleanup Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project Root: $ProjectRoot" -ForegroundColor Gray
Write-Host "Target Directory: $SessionDir" -ForegroundColor Gray
Write-Host "Dry Run: $($DryRun -eq $true)" -ForegroundColor $(if ($DryRun) { "Yellow" } else { "Green" })
Write-Host ""

# Function to check if file should be excluded
function Should-Exclude {
    param([string]$FileName)
    
    foreach ($pattern in $ExcludePatterns) {
        if ($FileName -like $pattern) {
            return $true
        }
    }
    return $false
}

# Find all markdown files in root directory
$MarkdownFiles = Get-ChildItem -Path $ProjectRoot -Filter "*.md" -File | Where-Object {
    -not (Should-Exclude $_.Name)
}

if ($MarkdownFiles.Count -eq 0) {
    Write-Host "✅ No markdown files found to move. Repository is already clean!" -ForegroundColor Green
    Write-Host ""
    exit 0
}

Write-Host "Found $($MarkdownFiles.Count) markdown file(s) to organize:" -ForegroundColor Yellow
Write-Host ""

# Display files that will be moved
$MarkdownFiles | ForEach-Object {
    $fileSize = [math]::Round($_.Length / 1KB, 2)
    Write-Host "  📄 $($_.Name)" -ForegroundColor White -NoNewline
    Write-Host " ($fileSize KB)" -ForegroundColor Gray
}

Write-Host ""

# Ask for confirmation if not dry run and not forced
if (-not $DryRun -and -not $Force) {
    $confirmation = Read-Host "Move these files to $SessionDir? (Y/N)"
    if ($confirmation -ne 'Y' -and $confirmation -ne 'y') {
        Write-Host "❌ Operation cancelled by user." -ForegroundColor Red
        exit 0
    }
}

# Create copilot directory structure if it doesn't exist
if (-not $DryRun) {
    if (-not (Test-Path $CopilotBaseDir)) {
        Write-Host "📁 Creating copilot directory..." -ForegroundColor Cyan
        New-Item -ItemType Directory -Path $CopilotBaseDir -Force | Out-Null
    }
    
    if (-not (Test-Path $SessionDir)) {
        Write-Host "📁 Creating session directory: session-$SessionDate..." -ForegroundColor Cyan
        New-Item -ItemType Directory -Path $SessionDir -Force | Out-Null
    }
}

Write-Host ""
Write-Host "Moving files..." -ForegroundColor Cyan
Write-Host ""

# Move each file
$MovedCount = 0
$ErrorCount = 0

foreach ($file in $MarkdownFiles) {
    $DestinationPath = Join-Path $SessionDir $file.Name
    
    try {
        if ($DryRun) {
            Write-Host "  [DRY RUN] Would move: $($file.Name) → copilot/session-$SessionDate/" -ForegroundColor Yellow
        } else {
            # Check if file already exists at destination
            if (Test-Path $DestinationPath) {
                $timestamp = Get-Date -Format "HHmmss"
                $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
                $extension = [System.IO.Path]::GetExtension($file.Name)
                $newName = "$baseName-$timestamp$extension"
                $DestinationPath = Join-Path $SessionDir $newName
                Write-Host "  ⚠️  File exists, renaming to: $newName" -ForegroundColor Yellow
            }
            
            Move-Item -Path $file.FullName -Destination $DestinationPath -Force
            Write-Host "  ✅ Moved: $($file.Name)" -ForegroundColor Green
        }
        $MovedCount++
    }
    catch {
        Write-Host "  ❌ Error moving $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
        $ErrorCount++
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "This was a DRY RUN. No files were actually moved." -ForegroundColor Yellow
    Write-Host "Files that would be moved: $MovedCount" -ForegroundColor Yellow
} else {
    Write-Host "✅ Successfully moved: $MovedCount file(s)" -ForegroundColor Green
    if ($ErrorCount -gt 0) {
        Write-Host "❌ Errors encountered: $ErrorCount file(s)" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Location: $SessionDir" -ForegroundColor Gray
}

Write-Host ""

# Create a README in the session directory
if (-not $DryRun -and $MovedCount -gt 0) {
    $ReadmePath = Join-Path $SessionDir "README.md"
    if (-not (Test-Path $ReadmePath)) {
        $ReadmeContent = @"
# Session Documentation - $SessionDate

This folder contains markdown documentation generated during the development session on **$SessionDate**.

## Files in This Session

$(($MarkdownFiles | ForEach-Object { "- $($_.Name)" }) -join "`n")

## Purpose

These files are archived here to keep the repository root clean and organized. They contain:
- Analysis reports
- Cleanup documentation
- Implementation notes
- Decision records
- Session summaries

## Organization

All session documentation should be stored in dated folders under `/copilot/` to maintain a clean project structure.

---

*Generated automatically by cleanup-docs.ps1*  
*Session Date: $SessionDate*
"@
        
        Set-Content -Path $ReadmePath -Value $ReadmeContent
        Write-Host "📝 Created README.md in session directory" -ForegroundColor Cyan
        Write-Host ""
    }
}

# Display next steps
if (-not $DryRun -and $MovedCount -gt 0) {
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Review moved files in: copilot/session-$SessionDate/" -ForegroundColor White
    Write-Host "  2. Commit changes:" -ForegroundColor White
    Write-Host "     git add copilot/" -ForegroundColor Gray
    Write-Host "     git commit -m 'docs: organize session documentation'" -ForegroundColor Gray
    Write-Host "  3. Update .gitignore if needed" -ForegroundColor White
    Write-Host ""
}

exit $(if ($ErrorCount -gt 0) { 1 } else { 0 })
