# Business Document Projects

This directory contains business document projects created using the Business Document Spec Kit methodology.

## About Business Document Spec Kit

The Business Document Spec Kit provides a systematic four-phase workflow for creating professional business documents:

1. **SPEC** - Define requirements and scope
2. **PLAN** - Create detailed outline and structure
3. **TASK** - Break into actionable items
4. **PRODUCE** - Generate and refine the document

Each project follows this workflow to ensure consistency, completeness, and quality.

## Current Projects

| Project | Status | Started | Owner | Next Milestone |
|---------|--------|---------|-------|----------------|
| *No projects yet* | - | - | - | - |

## Getting Started

### Create a New Document Project

To start a new business document:

```bash
# Use the init command (recommended)
/docspec.init

# Or manually create structure
mkdir business-docs/[project-name]
mkdir business-docs/[project-name]/output
```

Then follow the four-phase workflow:

1. `/docspec.spec` - Define your document requirements
2. `/docspec.plan` - Create implementation plan
3. `/docspec.tasks` - Break into actionable tasks
4. `/docspec.produce` - Execute and deliver

### Validate Document Quality

```bash
# Validate specification completeness
.spec-kit/scripts/validate-spec.sh business-docs/[project-name]

# Get task breakdown analysis
.spec-kit/scripts/generate-tasks.sh business-docs/[project-name]

# Compile document from sections
.spec-kit/scripts/compile-document.sh business-docs/[project-name] output.md
```

## Project Structure

Each document project follows this structure:

```
business-docs/[project-name]/
├── README.md              # Project overview
├── spec.md                # Document specification (SPEC phase)
├── plan.md                # Implementation plan (PLAN phase)
├── tasks.md               # Task breakdown (TASK phase)
├── produce.md             # Production log (PRODUCE phase)
├── requirements.md        # Quality gate tracking
└── output/                # Final documents
    ├── [document].docx    # Final Word document
    ├── [document].pdf     # Final PDF
    └── [document].md      # Compiled markdown
```

## Document Types

The toolkit supports various business document types:

- **Strategic Reports** - Quarterly reviews, annual reports, strategic analysis
- **Proposals** - Client, project, partnership, investment proposals
- **Policy Documents** - Procedures, guidelines, standards
- **Analysis Reports** - Market, risk, financial, technical analysis
- **Planning Documents** - Budgets, roadmaps, strategies
- **Compliance Documents** - Audit reports, certifications
- **Executive Communications** - Speeches, announcements, memos
- **Training Materials** - Guides, manuals, curricula

## Resources

### Core Files

- **Constitution:** `.spec-kit/constitution.md` - Non-negotiable principles
- **Templates:** `.spec-kit/templates/` - All phase templates
- **Commands:** `.claude/commands/docspec.*` - Workflow commands
- **Scripts:** `.spec-kit/scripts/` - Utility scripts

### Example Usage

See the main README.md for complete workflow examples and best practices.

## Best Practices

### Start with a Complete Spec

The specification is the foundation. Invest time to make it complete and clear:
- Define purpose precisely
- Characterize audience thoroughly
- Set clear scope boundaries
- Establish measurable success criteria

### Plan in Detail

A detailed plan makes execution smooth:
- Create comprehensive outline
- Plan all visual elements
- Identify data sources upfront
- Build in adequate review time

### Break Tasks Down

Granular tasks are easier to execute and track:
- Tasks should be 1-8 hours each
- Define clear acceptance criteria
- Identify dependencies explicitly
- Leave buffer time (15-20%)

### Quality Throughout

Don't wait until the end for quality checks:
- Spell check as you write
- Validate data immediately
- Review sections incrementally
- Catch errors early

## Quality Standards

All documents must meet constitution standards:

- ✓ Clear and concise language
- ✓ Audience-appropriate content
- ✓ Data-backed claims
- ✓ Professional formatting
- ✓ Error-free text
- ✓ Proper citations
- ✓ Accessible design

## Common Workflows

### Solo Author

For individual document creation:

1. `/docspec.init` - Initialize project
2. `/docspec.spec` - Define requirements (30-60 min)
3. `/docspec.plan` - Create blueprint (1-2 hours)
4. `/docspec.tasks` - Task breakdown (30-60 min)
5. `/docspec.produce` - Write and refine (varies)
6. `/docspec.validate` - Quality check (30 min)

Total planning time: ~3-4 hours before writing begins

### Team Collaboration

For team-authored documents:

1. Lead creates spec and plan collaboratively
2. Lead generates task breakdown
3. Tasks assigned to team members
4. Team executes tasks independently
5. Lead compiles and reviews
6. Iterate based on feedback

Use version control (Git) to track contributions.

### Executive Documents

For high-stakes executive documents:

1. Extra time on spec to align stakeholders
2. Multiple review rounds in plan
3. Build in generous review time
4. Plan for multiple revisions
5. Schedule approval meetings in advance

## Support

For issues or questions about the Business Document Spec Kit:

- Review the constitution: `.spec-kit/constitution.md`
- Check command documentation: `.claude/commands/docspec.*`
- Refer to template comments: `.spec-kit/templates/`

## Contributing Improvements

If you discover improvements to templates, commands, or workflows:

1. Document the improvement
2. Test it on a real project
3. Update relevant template or documentation
4. Share lessons learned in project retrospectives

## Version History

- **v1.0** (2025-11-15) - Initial Business Document Spec Kit implementation
  - Four-phase workflow established
  - Core templates created
  - Slash commands implemented
  - Utility scripts added

---

**Ready to create better business documents?**

Start with `/docspec.init` and let the toolkit guide you through creating professional, complete, and high-quality business documents.
