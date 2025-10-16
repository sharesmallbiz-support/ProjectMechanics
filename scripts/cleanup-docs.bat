@echo off
REM cleanup-docs.bat
REM Wrapper script to run the PowerShell cleanup script
REM Usage: cleanup-docs.bat [options]

echo.
echo Markdown Documentation Cleanup
echo ================================
echo.

REM Check if PowerShell is available
where pwsh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using PowerShell Core...
    pwsh -ExecutionPolicy Bypass -File "%~dp0cleanup-docs.ps1" %*
) else (
    where powershell >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Using Windows PowerShell...
        powershell -ExecutionPolicy Bypass -File "%~dp0cleanup-docs.ps1" %*
    ) else (
        echo ERROR: PowerShell not found!
        echo Please install PowerShell to run this script.
        exit /b 1
    )
)

exit /b %ERRORLEVEL%
