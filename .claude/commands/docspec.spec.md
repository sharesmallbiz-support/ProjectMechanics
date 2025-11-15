# Document Specification Command

You are helping the user create a comprehensive specification for a business document using the Business Document Spec Kit methodology.

## Context

The Business Document Spec Kit uses a four-phase workflow:
1. **SPEC** - Define requirements and scope (current phase)
2. **PLAN** - Create detailed outline and structure
3. **TASK** - Break into actionable items
4. **PRODUCE** - Generate and refine the document

You are currently in the **SPEC phase**.

## Your Role

Help the user create a complete, thorough specification document that will serve as the foundation for all subsequent work. The spec must answer all critical questions about what the document is, who it's for, and what it must accomplish.

## Constitution Principles

All documents must adhere to the principles in `.spec-kit/constitution.md`:
- Clarity above all
- Audience-first design
- Data-driven content
- Professional quality
- Structured approach

Review the constitution before beginning.

## Instructions

1. **Read the template**: Review `.spec-kit/templates/spec-template.md` to understand the complete specification structure.

2. **Understand the user's need**: The user will describe what document they need. Ask clarifying questions to understand:
   - The document's purpose and business context
   - Who will read it and what they need from it
   - What constraints exist (timeline, length, format)
   - What the successful outcome looks like

3. **Create the specification**:
   - Create a new directory under `business-docs/[document-name]/`
   - Copy the template to `business-docs/[document-name]/spec.md`
   - Work through each section of the template with the user
   - Fill in all sections thoroughly - do not skip or leave vague
   - Ask questions when information is missing or unclear

4. **Ensure completeness**: Before finishing, validate that:
   - All spec template sections are completed
   - Audience is clearly identified and characterized
   - Scope has clear boundaries (in-scope and out-of-scope)
   - Success criteria are defined and measurable
   - Timeline and resources are realistic
   - All constraints are documented

5. **Quality gates**: Review the Specification Gate checklist from the constitution:
   - [ ] Purpose clearly defined
   - [ ] Audience identified and characterized
   - [ ] Scope boundaries established
   - [ ] Success criteria defined
   - [ ] Constraints documented
   - [ ] Deliverable format specified

6. **Get approval**: Once complete, confirm with the user that the spec accurately captures their requirements and is ready for the planning phase.

## Key Principles for This Phase

- **Be thorough**: A complete spec prevents rework later. Take time to get it right.
- **Ask questions**: Don't assume. Clarify ambiguities now, not during production.
- **Think critically**: Challenge vague requirements. Push for specificity.
- **Document constraints**: Especially timeline, budget, and format requirements.
- **Identify risks early**: Note potential challenges in the spec.

## What NOT to Do

- Don't skip sections thinking they're "optional" - all sections serve a purpose
- Don't accept vague statements like "make it good" - push for concrete criteria
- Don't move to planning until the spec is complete and approved
- Don't let the spec become too abstract - keep it practical and actionable

## After Completion

Once the specification is complete and approved:
1. Save the spec.md file
2. Inform the user that the SPEC phase is complete
3. Suggest next step: `/docspec.plan` to create the implementation plan

## Example Interaction Flow

**User:** "I need to create a quarterly business review report"

**You:** "I'll help you create a specification for your quarterly business review. Let me ask some clarifying questions:

1. Who is the primary audience for this report?
2. What time period does this cover?
3. What are the key metrics or topics that must be included?
4. What format should the final document be in?
5. When do you need this delivered?
6. Are there any existing templates or prior reports I should reference?"

[After gathering information, create the spec file and work through each section]

**You:** "I've created the specification at `business-docs/q1-2025-business-review/spec.md`. Let's work through each section..."

[Fill in template sections with user input]

**You:** "The specification is now complete. Let me validate it against the quality gates... ✓ All gates passed.

The spec is ready for approval. Does this accurately capture your requirements for the quarterly business review?

Once you approve, we can move to `/docspec.plan` to create the detailed implementation plan."

## Remember

The specification is the foundation. Invest time here to save time later. A good spec makes planning, tasking, and production much smoother.
