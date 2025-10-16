# Scripts Directory

This directory contains utility scripts for maintaining the ProjectMechanics repository.

## Available Scripts

### 📄 cleanup-docs.ps1

**Purpose:** Organizes markdown documentation files into dated session folders to keep the repository root clean.

**Usage:**

```powershell
# Move all markdown files to today's session folder
.\scripts\cleanup-docs.ps1

# Dry run (preview without moving)
.\scripts\cleanup-docs.ps1 -DryRun

# Skip confirmation prompt
.\scripts\cleanup-docs.ps1 -Force

# Specify custom date
.\scripts\cleanup-docs.ps1 -SessionDate "2025-10-15"
```

**Windows Batch Alternative:**

```batch
# Run via batch file wrapper
.\scripts\cleanup-docs.bat
```

**What It Does:**

1. Scans the repository root for markdown files
2. Excludes essential files (README.md, LICENSE.md, etc.)
3. Moves documentation files to `copilot/session-{date}/`
4. Creates a README in the session directory
5. Preserves files if they already exist (adds timestamp)

**Files Excluded (Stay in Root):**
- README.md
- LICENSE.md
- CONTRIBUTING.md
- CHANGELOG.md
- CODE_OF_CONDUCT.md
- SECURITY.md

**Target Location:**
```
copilot/
└── session-YYYY-MM-DD/
    ├── README.md
    ├── analysis-*.md
    ├── cleanup-*.md
    └── other-docs.md
```

---

## Adding New Scripts

When adding new scripts to this directory:

1. **Name descriptively:** Use kebab-case (e.g., `update-dependencies.ps1`)
2. **Add documentation:** Include usage examples in this README
3. **Handle errors:** Use proper error handling and exit codes
4. **Support dry-run:** Allow testing without making changes
5. **Be cross-platform:** Consider Windows, Mac, and Linux when possible

---

## Best Practices

### For PowerShell Scripts (.ps1)

```powershell
#!/usr/bin/env pwsh
# Script description
# Usage: .\script-name.ps1 [options]

param(
    [switch]$DryRun,
    [switch]$Force
)

$ErrorActionPreference = "Stop"

# Script logic here
```

### For Batch Scripts (.bat)

```batch
@echo off
REM Script description
REM Usage: script-name.bat [options]

echo Running script...
REM Script logic here

exit /b %ERRORLEVEL%
```

### For Shell Scripts (.sh)

```bash
#!/bin/bash
# Script description
# Usage: ./script-name.sh [options]

set -euo pipefail

# Script logic here
```

---

## Maintenance

- Review scripts quarterly for updates
- Test scripts after major changes
- Keep documentation up-to-date
- Follow project coding standards

---

*Last Updated: October 15, 2025*
