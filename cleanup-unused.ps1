# Cleanup Unused Packages Script
# For ProjectMechanics Static Site
# Run with: .\cleanup-unused.ps1 -Phase [1-4]

param(
    [Parameter(Mandatory = $false)]
    [ValidateSet('1', '2', '3', '4', 'all')]
    [string]$Phase = 'ask'
)

Write-Host "`n🧹 ProjectMechanics - Unused Package Cleanup`n" -ForegroundColor Cyan

if ($Phase -eq 'ask') {
    Write-Host "Available cleanup phases:" -ForegroundColor Yellow
    Write-Host "  1 - Remove Server-Side packages (Safest - ~200MB)" -ForegroundColor Green
    Write-Host "  2 - Remove File Upload & Forms libraries" -ForegroundColor Yellow
    Write-Host "  3 - Remove Unused Radix UI components" -ForegroundColor Yellow
    Write-Host "  4 - Remove Chart/Calendar/Carousel libraries" -ForegroundColor Yellow
    Write-Host "  all - Run all phases" -ForegroundColor Red
    Write-Host ""
    $Phase = Read-Host "Which phase would you like to run? (1-4 or 'all')"
}

function Remove-Packages {
    param([string[]]$packages)
    
    Write-Host "`nRemoving packages:" -ForegroundColor Cyan
    $packages | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }
    
    $packageList = $packages -join " "
    npm uninstall $packageList
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Packages removed successfully`n" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Error removing packages`n" -ForegroundColor Red
        exit 1
    }
}

# Phase 1: Server-Side Packages
$phase1Packages = @(
    "@google-cloud/storage",
    "@neondatabase/serverless",
    "connect-pg-simple",
    "drizzle-orm",
    "drizzle-zod",
    "express",
    "express-session",
    "memorystore",
    "passport",
    "passport-local",
    "google-auth-library",
    "ws",
    "@types/connect-pg-simple",
    "@types/express",
    "@types/express-session",
    "@types/passport",
    "@types/passport-local",
    "@types/ws",
    "drizzle-kit",
    "bufferutil"
)

# Phase 2: File Upload & Forms
$phase2Packages = @(
    "@uppy/aws-s3",
    "@uppy/core",
    "@uppy/dashboard",
    "@uppy/drag-drop",
    "@uppy/file-input",
    "@uppy/progress-bar",
    "@uppy/react",
    "@tanstack/react-query",
    "@hookform/resolvers",
    "react-hook-form",
    "input-otp",
    "vaul"
)

# Phase 3: Unused Radix UI
$phase3Packages = @(
    "@radix-ui/react-accordion",
    "@radix-ui/react-alert-dialog",
    "@radix-ui/react-aspect-ratio",
    "@radix-ui/react-avatar",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-collapsible",
    "@radix-ui/react-context-menu",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-hover-card",
    "@radix-ui/react-menubar",
    "@radix-ui/react-navigation-menu",
    "@radix-ui/react-popover",
    "@radix-ui/react-progress",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-scroll-area",
    "@radix-ui/react-select",
    "@radix-ui/react-separator",
    "@radix-ui/react-slider",
    "@radix-ui/react-switch",
    "@radix-ui/react-toggle",
    "@radix-ui/react-toggle-group",
    "@radix-ui/react-toast"
)

# Phase 4: Charts/Calendar/Carousel
$phase4Packages = @(
    "recharts",
    "react-day-picker",
    "embla-carousel-react",
    "react-resizable-panels",
    "cmdk",
    "date-fns"
)

switch ($Phase) {
    '1' {
        Write-Host "`n📦 Phase 1: Removing Server-Side Packages" -ForegroundColor Cyan
        Write-Host "This removes all backend, database, and authentication packages." -ForegroundColor Yellow
        Remove-Packages -packages $phase1Packages
    }
    '2' {
        Write-Host "`n📦 Phase 2: Removing File Upload & Forms Libraries" -ForegroundColor Cyan
        Remove-Packages -packages $phase2Packages
    }
    '3' {
        Write-Host "`n📦 Phase 3: Removing Unused Radix UI Components" -ForegroundColor Cyan
        Remove-Packages -packages $phase3Packages
    }
    '4' {
        Write-Host "`n📦 Phase 4: Removing Chart/Calendar/Carousel Libraries" -ForegroundColor Cyan
        Write-Host "⚠️  WARNING: This removes recharts, calendar, and carousel." -ForegroundColor Yellow
        Write-Host "Make sure you're not using these!" -ForegroundColor Yellow
        $confirm = Read-Host "Continue? (y/n)"
        if ($confirm -eq 'y') {
            Remove-Packages -packages $phase4Packages
        }
        else {
            Write-Host "Skipped Phase 4" -ForegroundColor Yellow
        }
    }
    'all' {
        Write-Host "`n⚠️  WARNING: This will remove ALL unused packages!" -ForegroundColor Red
        $confirm = Read-Host "Are you sure? Type 'yes' to confirm"
        if ($confirm -eq 'yes') {
            Remove-Packages -packages ($phase1Packages + $phase2Packages + $phase3Packages + $phase4Packages)
        }
        else {
            Write-Host "Cleanup cancelled" -ForegroundColor Yellow
            exit 0
        }
    }
}

Write-Host "`n✨ Cleanup complete! Running tests..." -ForegroundColor Cyan
Write-Host "Running TypeScript check..." -ForegroundColor Gray
npm run check

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript check passed" -ForegroundColor Green
}
else {
    Write-Host "❌ TypeScript errors found - please fix before deploying" -ForegroundColor Red
}

Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Test your site: npm run dev" -ForegroundColor Gray
Write-Host "  2. Build for production: npm run build" -ForegroundColor Gray
Write-Host "  3. Test the built site" -ForegroundColor Gray
Write-Host "  4. Commit changes: git add . && git commit -m 'Remove unused packages'" -ForegroundColor Gray
Write-Host ""
