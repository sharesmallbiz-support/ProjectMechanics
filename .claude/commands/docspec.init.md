# Initialize New Document Project

You are helping the user initialize a new business document project using the Business Document Spec Kit.

## Purpose

This command sets up the directory structure and initial files for a new document project, preparing the user to begin the SPEC → PLAN → TASK → PRODUCE workflow.

## Instructions

1. **Get document information**:
   Ask the user for:
   - Document name (will be used for directory name)
   - Brief description of what document they want to create

2. **Create project directory**:
   - Sanitize the document name for use as a directory name (lowercase, hyphens instead of spaces)
   - Create directory: `business-docs/[document-name]/`
   - Create subdirectory: `business-docs/[document-name]/output/`

3. **Initialize README**:
   Create `business-docs/[document-name]/README.md` with:
   ```markdown
   # [Document Title]

   **Project Status:** Specification
   **Created:** [Date]
   **Owner:** [User name if available]

   ## Project Overview

   [Brief description from user]

   ## Workflow Status

   - [ ] **SPEC** - Define requirements and scope
   - [ ] **PLAN** - Create detailed outline and structure
   - [ ] **TASK** - Break into actionable items
   - [ ] **PRODUCE** - Generate and refine the document

   ## Project Files

   - `spec.md` - Document specification (not yet created)
   - `plan.md` - Implementation plan (not yet created)
   - `tasks.md` - Task breakdown (not yet created)
   - `produce.md` - Production log (not yet created)
   - `output/` - Final document outputs

   ## Next Steps

   Run `/docspec.spec` to begin creating the document specification.

   ## Constitution

   This document follows the Business Document Spec Kit constitution:
   - Clarity above all
   - Audience-first design
   - Data-driven content
   - Professional quality
   - Structured approach

   See `.spec-kit/constitution.md` for full principles.
   ```

4. **Create requirements tracking file**:
   Create `business-docs/[document-name]/requirements.md` with:
   ```markdown
   # Requirements Validation Checklist

   This file tracks completion of all constitution quality gates.

   ## Specification Gate

   - [ ] Purpose clearly defined
   - [ ] Audience identified and characterized
   - [ ] Scope boundaries established
   - [ ] Success criteria defined
   - [ ] Constraints documented
   - [ ] Deliverable format specified

   ## Plan Gate

   - [ ] Document outline complete
   - [ ] All spec requirements addressed in plan
   - [ ] Data sources identified
   - [ ] Visual elements planned
   - [ ] Tone and style defined
   - [ ] Review process established

   ## Task Gate

   - [ ] All sections have assigned tasks
   - [ ] Dependencies identified
   - [ ] Resources allocated
   - [ ] Timeline established
   - [ ] Tasks properly sequenced
   - [ ] Acceptance criteria defined

   ## Production Gate

   - [ ] All content sections complete
   - [ ] Data verified and accurate
   - [ ] Formatting consistent throughout
   - [ ] Spelling and grammar checked
   - [ ] Peer review completed
   - [ ] Spec requirements validated
   - [ ] Final quality review passed
   ```

5. **Provide summary**:
   Show the user what was created and guide them to next steps:

   ```
   ✓ Document project initialized successfully!

   **Project:** [Document Title]
   **Location:** business-docs/[document-name]/

   **Created:**
   - Project directory
   - README.md with project overview
   - requirements.md for tracking quality gates
   - output/ directory for final documents

   **Next Steps:**

   1. Run `/docspec.spec` to create the document specification
   2. Work through the four-phase workflow:
      - SPEC: Define what you need
      - PLAN: Design how to build it
      - TASK: Break it into steps
      - PRODUCE: Create the document

   **Resources:**
   - Constitution: .spec-kit/constitution.md
   - Templates: .spec-kit/templates/
   - Examples: [if any examples exist]

   Ready to begin? Run `/docspec.spec` when you're ready to define your document requirements.
   ```

6. **Update project tracking** (if a tracking file exists):
   If `business-docs/README.md` exists, add this project to it.
   If not, create `business-docs/README.md`:
   ```markdown
   # Business Document Projects

   Active business document projects using the Business Document Spec Kit.

   ## Active Projects

   | Project | Status | Started | Owner | Next Milestone |
   |---------|--------|---------|-------|----------------|
   | [Document Name] | Specification | [Date] | [Owner] | Complete spec |

   ## Completed Projects

   *(None yet)*

   ## Using the Toolkit

   Each project follows the four-phase workflow:
   1. `/docspec.spec` - Define requirements
   2. `/docspec.plan` - Create implementation plan
   3. `/docspec.tasks` - Break into tasks
   4. `/docspec.produce` - Execute and deliver

   See `.spec-kit/` for templates and guidelines.
   ```

## Example Interaction

**User:** "I want to create a quarterly business review report"

**You:** "I'll initialize a new document project for your quarterly business review report.

Creating project structure...

✓ Document project initialized successfully!

**Project:** Quarterly Business Review Report
**Location:** business-docs/quarterly-business-review/

**Created:**
- Project directory
- README.md with project overview
- requirements.md for tracking quality gates
- output/ directory for final documents

**Next Steps:**

1. Run `/docspec.spec` to create the document specification
2. Work through the four-phase workflow:
   - SPEC: Define what you need
   - PLAN: Design how to build it
   - TASK: Break it into steps
   - PRODUCE: Create the document

Ready to begin? Run `/docspec.spec` when you're ready to define your document requirements."

## Key Principles

- **Clean setup**: Create organized structure from the start
- **Clear next steps**: User knows exactly what to do next
- **Track from beginning**: requirements.md helps validate progress
- **Professional naming**: Use clear, consistent directory naming

## Remember

A good initialization sets the tone for the entire project. It should be:
- Quick and easy
- Create all necessary structure
- Provide clear guidance on next steps
- Set professional standards from the start
