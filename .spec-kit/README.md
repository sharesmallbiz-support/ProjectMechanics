# Business Document Spec Kit

This directory contains the core components of the Business Document Spec Kit - a systematic methodology for creating professional business documents.

## Overview

The Business Document Spec Kit provides templates, commands, and tools to guide you through creating high-quality business documents using a structured four-phase workflow:

1. **SPEC** - Define requirements and scope
2. **PLAN** - Create detailed outline and structure
3. **TASK** - Break into actionable items
4. **PRODUCE** - Generate and refine the document

## Directory Structure

```
.spec-kit/
├── constitution.md        # Non-negotiable principles
├── README.md             # This file
├── templates/            # Phase templates
│   ├── spec-template.md
│   ├── plan-template.md
│   ├── task-template.md
│   └── produce-template.md
├── commands/             # Slash command implementations (in .claude/commands/)
│   ├── docspec.init.md
│   ├── docspec.spec.md
│   ├── docspec.plan.md
│   ├── docspec.tasks.md
│   ├── docspec.produce.md
│   └── docspec.validate.md
└── scripts/              # Utility scripts
    ├── validate-spec.sh
    ├── generate-tasks.sh
    └── compile-document.sh
```

## Core Files

### constitution.md

The constitution defines non-negotiable principles that govern all documents:

- **Core Principles:** Clarity, audience-first, data-driven, professional quality, structured approach
- **Document Standards:** Required sections, formatting, visual standards
- **Quality Gates:** Validation checkpoints for each phase
- **Ethical Standards:** Honesty, confidentiality, attribution
- **Compliance:** Accessibility, legal requirements

**Everyone creating documents should read the constitution first.**

### Templates

Located in `templates/`, these provide the structure for each workflow phase:

**spec-template.md**
- Document overview and purpose
- Audience analysis
- Key messages
- Content requirements
- Constraints and timeline
- Quality standards

**plan-template.md**
- Detailed document outline
- Content strategy
- Visual element planning
- Research and data plan
- Writing strategy
- Quality assurance approach

**task-template.md**
- Complete task breakdown
- Phase organization
- Dependencies and sequencing
- Resource allocation
- Progress tracking

**produce-template.md**
- Production log
- Progress tracking
- Review management
- Quality checklists
- Version history
- Lessons learned

### Commands

Slash commands (in `.claude/commands/`) guide AI-assisted document creation:

- `/docspec.init` - Initialize new document project
- `/docspec.spec` - Create specification
- `/docspec.plan` - Create implementation plan
- `/docspec.tasks` - Generate task breakdown
- `/docspec.produce` - Execute production
- `/docspec.validate` - Validate against requirements

These commands provide AI assistants (like Claude) with detailed instructions for helping users through each phase.

### Scripts

Utility bash scripts in `scripts/`:

**validate-spec.sh**
```bash
./spec-kit/scripts/validate-spec.sh business-docs/[project-name]
```
Validates specification completeness and constitution compliance.

**generate-tasks.sh**
```bash
./.spec-kit/scripts/generate-tasks.sh business-docs/[project-name]
```
Analyzes plan and provides task breakdown estimates.

**compile-document.sh**
```bash
./.spec-kit/scripts/compile-document.sh business-docs/[project-name] output.md
```
Compiles document sections into single file.

## Using the Toolkit

### 1. Read the Constitution

Start by reading `constitution.md` to understand the quality standards and principles.

### 2. Initialize a Project

Use `/docspec.init` to create a new document project with proper structure.

### 3. Follow the Workflow

Work through each phase in order:
- **SPEC** - Use `/docspec.spec` to create thorough specification
- **PLAN** - Use `/docspec.plan` to design document structure
- **TASK** - Use `/docspec.tasks` to break into actionable items
- **PRODUCE** - Use `/docspec.produce` to execute and deliver

### 4. Validate Quality

Use `/docspec.validate` at any point to check compliance with spec and constitution.

### 5. Learn and Improve

After each project, update `lessons learned` in produce.md and consider improving templates.

## Quality Gates

Each phase has a quality gate that must pass before proceeding:

**Specification Gate:**
- Purpose clearly defined ✓
- Audience identified ✓
- Scope established ✓
- Success criteria defined ✓
- Constraints documented ✓
- Format specified ✓

**Plan Gate:**
- Outline complete ✓
- Spec requirements addressed ✓
- Data sources identified ✓
- Visuals planned ✓
- Tone defined ✓
- Review process established ✓

**Task Gate:**
- Sections have tasks ✓
- Dependencies identified ✓
- Resources allocated ✓
- Timeline established ✓
- Tasks sequenced ✓
- Acceptance criteria defined ✓

**Production Gate:**
- Content complete ✓
- Data verified ✓
- Formatting consistent ✓
- Spelling/grammar checked ✓
- Reviews completed ✓
- Spec validated ✓
- Final quality passed ✓

## Customization

The toolkit is designed to be customized for your organization:

### Customize the Constitution

Edit `constitution.md` to reflect:
- Your organization's writing standards
- Your brand guidelines
- Your compliance requirements
- Your quality standards

### Customize Templates

Modify templates in `templates/` to:
- Add organization-specific sections
- Adjust to your workflow
- Include your standard boilerplate
- Match your approval processes

### Customize Commands

Edit commands in `.claude/commands/` to:
- Match your team's process
- Add domain-specific guidance
- Integrate with your tools
- Reflect your terminology

### Add Scripts

Create new scripts in `scripts/` for:
- Integration with your document management system
- Custom validation rules
- Automated formatting
- Report generation

## Best Practices

### Template Usage

1. **Always start from template** - Don't create documents from scratch
2. **Fill in all sections** - Even if brief, complete every section
3. **Don't skip phases** - Each phase builds on the previous
4. **Document deviations** - If you must skip something, note why

### Quality Assurance

1. **Early and often** - Don't wait until the end for quality checks
2. **Multiple reviewers** - Get fresh eyes on the document
3. **Use checklists** - Constitution provides quality checklists
4. **Validate regularly** - Run validation before each phase transition

### Process Improvement

1. **Capture lessons** - Document what worked and what didn't
2. **Update templates** - Improve templates based on experience
3. **Share learnings** - Help others benefit from your experience
4. **Iterate methodology** - The process should evolve

## Common Pitfalls

❌ **Skipping the spec** - "I know what I need, let's just start writing"
  - Result: Scope creep, rework, unclear purpose

❌ **Vague planning** - "We'll figure it out as we go"
  - Result: Structural problems, missed requirements

❌ **No task breakdown** - "This isn't complicated, we don't need tasks"
  - Result: Missed steps, unclear progress, resource issues

❌ **Rushing production** - "We're behind, skip the reviews"
  - Result: Quality problems, stakeholder rejection

❌ **Ignoring quality gates** - "We don't have time for validation"
  - Result: Deliverable that doesn't meet requirements

## Success Factors

✅ **Invest in planning** - Time spent in SPEC and PLAN saves multiples in PRODUCE

✅ **Be thorough** - Complete specifications prevent problems later

✅ **Follow the process** - The workflow exists for a reason

✅ **Use quality gates** - They catch problems early when fixing is easier

✅ **Capture learnings** - Each project should improve the next

## Getting Help

### Documentation

- **Constitution:** Read for principles and standards
- **Templates:** Use comments and examples within templates
- **Commands:** Review command files for detailed guidance
- **Main README:** See project root for overall documentation

### Examples

Look at completed projects in `business-docs/` for examples of:
- Well-formed specifications
- Detailed plans
- Proper task breakdowns
- Production logs

### Support

For questions or issues:
1. Review relevant template
2. Check constitution for standards
3. Look at example projects
4. Consult command documentation

## Version History

**v1.0 (2025-11-15)**
- Initial release
- Four-phase workflow
- Core templates for all phases
- Six slash commands
- Three utility scripts
- Constitution established

## Philosophy

The Business Document Spec Kit is based on principles from software engineering:

- **Spec-driven development** - Define before you build
- **Separation of concerns** - Each phase has distinct purpose
- **Quality gates** - Validate before proceeding
- **Iterative refinement** - Review and improve
- **Documentation** - Capture decisions and rationale

Applied to business documents, these principles yield:

✨ **Better documents** - More complete, more professional
✨ **Faster production** - Less rework, clearer direction
✨ **Consistent quality** - Standards applied systematically
✨ **Reduced stress** - Clear process reduces ambiguity
✨ **Reusable knowledge** - Templates and learnings compound

---

**The best time to plan is before you start. The second best time is now.**

Use this toolkit to create better business documents through systematic planning and execution.
