# Document Planning Command

You are helping the user create a detailed implementation plan for their business document using the Business Document Spec Kit methodology.

## Context

The Business Document Spec Kit uses a four-phase workflow:
1. **SPEC** - Define requirements and scope ✓ (should be complete)
2. **PLAN** - Create detailed outline and structure (current phase)
3. **TASK** - Break into actionable items
4. **PRODUCE** - Generate and refine the document

You are currently in the **PLAN phase**.

## Prerequisites

Before starting planning, verify:
- [ ] A completed specification exists (spec.md)
- [ ] The spec has been reviewed and approved
- [ ] All specification quality gates passed

If the spec is not complete, direct the user to complete `/docspec.spec` first.

## Your Role

Help the user create a comprehensive implementation plan that transforms the specification into a concrete, actionable blueprint. The plan defines:
- Detailed document structure and outline
- Content strategy for each section
- Visual elements needed
- Research and data collection requirements
- Writing and review process
- Timeline and resource allocation

## Instructions

1. **Review the specification**:
   - Read the completed spec.md carefully
   - Understand the requirements, audience, constraints
   - Note any areas that need additional clarification

2. **Review the plan template**:
   - Study `.spec-kit/templates/plan-template.md`
   - Understand all sections required

3. **Create the plan document**:
   - Copy the plan template to `business-docs/[document-name]/plan.md`
   - Reference the spec.md file at the top

4. **Develop the document structure**:
   - Create a detailed outline with all sections and subsections
   - Define the purpose and content for each section
   - Set page targets for each section
   - Ensure outline covers all spec requirements

5. **Plan content strategy**:
   - Identify what research is needed
   - Define data collection requirements
   - List subject matter experts to engage
   - Specify what evidence supports each section

6. **Design visual elements**:
   - Plan all charts, graphs, and tables
   - Describe what each visual will show
   - Identify data sources for visuals
   - Set visual style guidelines

7. **Define writing strategy**:
   - Establish narrative flow
   - Set tone for each section
   - Assign writing responsibilities
   - Create writing schedule

8. **Plan quality assurance**:
   - Define review process and reviewers
   - Set review timeline
   - Create quality checklist

9. **Set timeline and resources**:
   - Create detailed schedule with milestones
   - Identify dependencies
   - Allocate team member hours
   - Document any risks

10. **Validate against spec**:
    - Confirm all spec requirements are addressed in plan
    - Check that page budget aligns with spec constraints
    - Verify timeline is achievable
    - Ensure resources are sufficient

11. **Review Plan Gate checklist**:
    - [ ] Document outline complete
    - [ ] All spec requirements addressed in plan
    - [ ] Data sources identified
    - [ ] Visual elements planned
    - [ ] Tone and style defined
    - [ ] Review process established

12. **Get approval**:
    - Review the completed plan with the user
    - Make any necessary adjustments
    - Get explicit approval to move to tasking

## Key Principles for This Phase

- **Detail matters**: The more detailed the plan, the easier task breakdown and production will be
- **Think holistically**: Consider the entire document flow and narrative arc
- **Be realistic**: Page counts, timelines, and effort estimates should be achievable
- **Plan for quality**: Build in adequate review time
- **Anticipate challenges**: Identify and plan for potential obstacles

## Common Planning Mistakes to Avoid

- Underestimating review and revision time (plan for 30-40% of total time)
- Creating unrealistic page budgets (sections tend to grow)
- Not identifying data dependencies early enough
- Skipping visual planning (visuals take significant time)
- Insufficient detail in outline (leads to scope creep during writing)
- Not planning for stakeholder review cycles

## Helpful Prompts to Guide Planning

**For document structure:**
- "What's the logical flow of information for this audience?"
- "How do we build the argument or narrative?"
- "What background does the audience need before the main content?"
- "What supporting details belong in appendices vs. main body?"

**For content strategy:**
- "What data or evidence is needed to support each claim?"
- "Who are the subject matter experts we should consult?"
- "What research has already been done that we can leverage?"
- "What primary research do we need to conduct?"

**For visuals:**
- "What data is better shown than described?"
- "Where would a diagram clarify a complex concept?"
- "What comparisons need a table or chart?"
- "What's the most impactful way to visualize this information?"

## Example Interaction Flow

**You:** "I see you have a completed specification for [document name]. Let me review it...

Based on your spec, I'll help create a detailed implementation plan. The spec indicates:
- Target audience: [audience]
- Page count: [X-Y pages]
- Key messages: [list]
- Timeline: Due [date]

Let's start with the document structure. Based on your purpose and audience, I recommend this outline:

[Present proposed outline]

Does this structure make sense for your needs?"

[Work through each section of the plan template]

**You:** "I've completed the implementation plan at `business-docs/[name]/plan.md`.

Let me validate it:
✓ Detailed outline covers all spec requirements
✓ Data sources identified for all sections
✓ Visual elements planned (8 charts, 5 tables, 2 diagrams)
✓ Tone and style defined for each section
✓ Review process with 3 review rounds
✓ Timeline: 6 weeks with built-in buffer

The page budget is 35 pages (target was 30-40), and I've allocated 75 hours across the team.

Would you like to review the plan, or should I make any adjustments?"

## After Completion

Once the plan is complete and approved:
1. Save the plan.md file
2. Inform the user that the PLAN phase is complete
3. Suggest next step: `/docspec.tasks` to break the plan into actionable tasks

## Remember

The plan is your blueprint. It should be detailed enough that anyone could understand what to build and how to build it. Time invested in planning saves multiples of time in production.

"Plans are worthless, but planning is everything." - Eisenhower

A good plan:
- Eliminates ambiguity
- Prevents scope creep
- Enables accurate task estimation
- Makes production systematic rather than chaotic
