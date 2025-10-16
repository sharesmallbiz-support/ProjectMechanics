# Copilot Documentation

This directory contains session-based documentation generated during development work on ProjectMechanics.

## 📁 Directory Structure

```
copilot/
├── README.md                    # This file
└── session-YYYY-MM-DD/          # Dated session folders
    ├── README.md                # Session summary
    ├── analysis-*.md            # Analysis documents
    ├── cleanup-*.md             # Cleanup reports
    ├── implementation-*.md      # Implementation notes
    └── *.md                     # Other session docs
```

## 🎯 Purpose

This directory keeps the repository root clean by organizing all session documentation, analysis reports, and working notes into dated folders. This helps:

- **Maintain Organization:** All session docs in one place
- **Track History:** Easy to see what was done when
- **Keep Root Clean:** Only essential files in project root
- **Improve Navigation:** Find specific session work quickly

## 📝 What Goes Here

**Include:**
- Analysis and planning documents
- Cleanup and optimization reports
- Implementation notes and decisions
- Session summaries and retrospectives
- Temporary working documents
- Phase completion reports
- Architecture decision records

**Do Not Include:**
- Essential project documentation (stays in root)
- README.md (project root)
- LICENSE.md, CONTRIBUTING.md
- Code files or components
- Build artifacts

## 🔧 Usage

### Moving Files to Copilot Folder

Use the automated cleanup script:

```powershell
# Run the cleanup script
.\scripts\cleanup-docs.ps1

# Preview without moving files
.\scripts\cleanup-docs.ps1 -DryRun

# Skip confirmation
.\scripts\cleanup-docs.ps1 -Force
```

### Manual Organization

If you prefer manual organization:

1. Create session folder: `copilot/session-YYYY-MM-DD/`
2. Move documentation files into the folder
3. Create a README.md summarizing the session
4. Commit changes

## 📅 Session Naming Convention

Use ISO 8601 date format: `session-YYYY-MM-DD`

**Examples:**
- `session-2025-10-15/` - Session on October 15, 2025
- `session-2025-11-20/` - Session on November 20, 2025

**Benefits:**
- Chronological sorting
- Unambiguous dates
- International standard
- Easy to parse programmatically

## 📋 Session Documentation Best Practices

### Session README Template

Each session folder should include a README.md:

```markdown
# Session Documentation - YYYY-MM-DD

## Summary
Brief overview of what was accomplished.

## Files in This Session
- analysis-feature.md - Feature analysis
- cleanup-report.md - Cleanup results
- implementation.md - Implementation notes

## Key Decisions
- Decision 1: Rationale
- Decision 2: Rationale

## Outcomes
- What was completed
- What was improved
- What was learned

---
*Session Date: YYYY-MM-DD*
```

### File Naming Conventions

Use descriptive, hyphenated names:

- `analysis-{topic}.md` - Analysis documents
- `cleanup-{phase}.md` - Cleanup reports
- `implementation-{feature}.md` - Implementation notes
- `decision-{topic}.md` - Architecture decisions
- `summary-{date}.md` - Session summaries

## 🔍 Finding Documentation

### By Date

```powershell
# List all sessions
Get-ChildItem copilot\session-* -Directory

# Find sessions in October 2025
Get-ChildItem copilot\session-2025-10-* -Directory
```

### By Content

```powershell
# Search for specific topics
Get-ChildItem copilot\session-*\*.md -Recurse | Select-String "cleanup"

# Find files containing "Phase 4"
Get-ChildItem copilot\session-*\*.md -Recurse | Select-String "Phase 4"
```

## 🧹 Maintenance

### Regular Cleanup

- **Weekly:** Move new markdown files to appropriate session folders
- **Monthly:** Review and archive old sessions
- **Quarterly:** Consolidate important decisions into main docs

### Archiving Old Sessions

For sessions older than 6 months:

1. Review for important information
2. Extract key decisions to main documentation
3. Consider archiving or compressing old sessions

## 🤖 GitHub Copilot Integration

This structure follows GitHub Copilot best practices:

- ✅ Keeps root directory clean
- ✅ Organizes documentation chronologically
- ✅ Maintains context for AI assistance
- ✅ Separates working docs from project docs
- ✅ Enables easy reference to past work

GitHub Copilot instructions are configured to automatically use session folders. See `.github/copilot-instructions.md` for details.

## 📊 Example Session

```
copilot/session-2025-10-15/
├── README.md                           # Session summary
├── analysis-unused-components.md       # Initial analysis
├── cleanup-phase4-plan.md              # Cleanup planning
├── cleanup-phase4-results.md           # Results report
└── implementation-notes.md             # Technical details
```

## ✅ Checklist for New Sessions

When starting a new session:

- [ ] Create `session-YYYY-MM-DD/` folder
- [ ] Add README.md with session overview
- [ ] Document decisions and changes
- [ ] Keep files focused and organized
- [ ] Run cleanup script before committing
- [ ] Commit with descriptive message

---

## 🔗 Related Documentation

- `.github/copilot-instructions.md` - Copilot configuration
- `scripts/README.md` - Utility scripts documentation
- `README.md` - Project overview (root)

---

*This directory structure helps maintain a clean, organized repository while preserving important development documentation.*

*Last Updated: October 15, 2025*
