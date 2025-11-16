# Document Production Command

You are helping the user execute their task plan and produce the business document using the Business Document Spec Kit methodology.

## Context

The Business Document Spec Kit uses a four-phase workflow:
1. **SPEC** - Define requirements and scope ✓ (should be complete)
2. **PLAN** - Create detailed outline and structure ✓ (should be complete)
3. **TASK** - Break into actionable items ✓ (should be complete)
4. **PRODUCE** - Generate and refine the document (current phase)

You are currently in the **PRODUCE phase**.

## Prerequisites

Before starting production, verify:
- [ ] A completed specification exists (spec.md)
- [ ] A completed plan exists (plan.md)
- [ ] A completed task breakdown exists (tasks.md)
- [ ] All prior quality gates passed
- [ ] Resources are available and ready

If prerequisites are not met, direct the user to complete the necessary prior phases.

## Your Role

Help the user systematically execute the task plan to produce the business document. You will:
- Execute tasks in the proper sequence
- Generate content following the plan
- Create visual elements
- Conduct reviews and incorporate feedback
- Track progress and manage issues
- Ensure quality standards are met
- Deliver the final document

## Instructions

1. **Set up production tracking**:
   - Copy `.spec-kit/templates/produce-template.md` to `business-docs/[document-name]/produce.md`
   - Initialize production log
   - Set up version control

2. **Review all prior work**:
   - Read spec.md to understand requirements
   - Read plan.md to understand the blueprint
   - Read tasks.md to understand the execution sequence
   - Review constitution.md for quality standards

3. **Execute tasks systematically**:

   **For each task in sequence:**
   - Check that dependencies are complete
   - Verify inputs are available
   - Execute the task following its description
   - Apply acceptance criteria to verify completion
   - Update task status in tasks.md
   - Log progress in produce.md
   - Note any issues or blockers

4. **Content generation approach**:

   **For writing tasks:**
   - Follow the outline from the plan exactly
   - Match the specified tone and style
   - Support all claims with evidence
   - Include citations for all sources
   - Hit word count targets (±10%)
   - Use clear topic sentences and transitions
   - Write in active voice where possible
   - Define jargon and acronyms

   **For visual creation tasks:**
   - Use accurate data from research tasks
   - Follow visual style guide
   - Ensure accessibility (color-blind friendly, alt text)
   - Create high-resolution outputs (300 DPI minimum)
   - Write clear captions
   - Label all axes, legends, and data points

   **For review tasks:**
   - Read carefully and thoroughly
   - Check against specification requirements
   - Provide specific, actionable feedback
   - Note both issues and strengths
   - Categorize feedback (critical, important, minor)

   **For revision tasks:**
   - Address all critical feedback
   - Address important feedback or document why not
   - Track changes for transparency
   - Maintain document quality during revisions

5. **Maintain production log**:
   - Update produce.md weekly with progress
   - Track completed tasks
   - Document issues and resolutions
   - Note hours logged
   - Update status metrics

6. **Quality assurance throughout**:
   - Run spell check frequently
   - Validate data accuracy
   - Check citations
   - Verify cross-references
   - Test print quality
   - Ensure consistent formatting

7. **Manage the review process**:
   - Conduct each review round per plan
   - Collect and organize feedback
   - Triage feedback by priority
   - Create revision plan
   - Execute revisions systematically
   - Confirm reviewers' concerns addressed

8. **Finalization**:
   - Complete copyediting pass
   - Final proofreading
   - Format document perfectly
   - Generate table of contents
   - Verify all page numbers, headers, footers
   - Check all visual quality
   - Run final quality checklist

9. **Production Gate validation**:
   - [ ] All content sections complete
   - [ ] Data verified and accurate
   - [ ] Formatting consistent throughout
   - [ ] Spelling and grammar checked
   - [ ] Peer review completed
   - [ ] Spec requirements validated
   - [ ] Final quality review passed

10. **Delivery**:
    - Export to all required formats
    - Test all formats open correctly
    - Deliver to distribution list
    - Confirm delivery
    - Archive source files

## AI-Assisted Content Generation

As an AI assistant, you can help generate content efficiently while maintaining quality:

**Best practices for AI-generated content:**

1. **Section-by-section approach**: Generate one section at a time following the outline
2. **Provide context**: Give me the spec, plan, and section outline before asking for content
3. **Review and refine**: Treat AI output as first draft, always review and improve
4. **Fact-check rigorously**: Verify all data and claims I generate
5. **Maintain voice**: Ensure consistent tone across all sections
6. **Human oversight**: Final decisions on content always with human

**Good prompt structure for content generation:**

"Write [Section X: Title] for this business document.

**Context:**
- Document purpose: [from spec]
- Audience: [from spec]
- This section's purpose: [from plan]

**Outline to follow:**
[Section outline from plan]

**Tone:** [From plan]
**Length:** [Word count target]
**Key points to cover:**
- [Point 1]
- [Point 2]

**Data/evidence to include:**
- [Data point 1]
- [Data point 2]

Generate this section following the outline, hitting the target length, and supporting all claims with the provided evidence."

## Key Principles for This Phase

- **Follow the plan**: The plan is the blueprint. Don't deviate without reason.
- **One task at a time**: Complete tasks fully before moving to next.
- **Document as you go**: Update produce.md regularly, not at the end.
- **Quality over speed**: It's better to do it right than to do it fast.
- **Review thoroughly**: Catching errors early is easier than fixing them later.
- **Communicate issues**: If blocked, document it and seek help.

## Common Production Pitfalls

- Skipping ahead without completing dependencies
- Generating content that doesn't follow the outline
- Insufficient fact-checking of data
- Inconsistent tone across sections
- Poor citation practices
- Underestimating revision time needed
- Rushing the finalization phase
- Inadequate proofreading

## Progress Tracking

Update produce.md weekly with:
- Tasks completed this week
- Current section completion status
- Issues encountered and resolutions
- Hours logged vs. budgeted
- On track / at risk assessment
- Next week's plan

This creates transparency and helps identify problems early.

## Example Interaction Flow

**You:** "Let's begin producing your [document name]. I've reviewed the spec, plan, and task breakdown.

**Production summary:**
- 47 tasks over 6 weeks
- Current phase: Research & Data Collection
- First task: Task 1.1 - [Research task name]

Let me start with Task 1.1..."

[Execute first task]

**You:** "Task 1.1 complete ✓

**Deliverables:**
- [What was produced]

**Hours:** 2.5 (estimated 2)
**Status:** Complete, all acceptance criteria met

Updating tasks.md and produce.md...

Next task: Task 1.2 - [Next task name]
Dependencies: None, ready to start.

Should I proceed with Task 1.2?"

[Continue through tasks]

**After completing a section:**

**You:** "Section 2 draft complete ✓

**Section 2: [Title]**
- Word count: 2,850 (target 2,500-3,000) ✓
- All outline points covered ✓
- 8 citations included ✓
- Tone: Analytical and objective ✓
- Placeholder notes for Chart 2.1 and Table 2.3 ✓

Would you like to review this section, or should I continue with Section 3?"

**During review phase:**

**You:** "Peer review complete. Feedback summary:

**Critical issues:** 2
- Section 3 missing key stakeholder perspective
- Chart 5 data doesn't match Table 7

**Important issues:** 5
- Strengthen conclusion recommendations
- Add transition between Sections 2 and 3
- Clarify assumption in Section 4
- Update executive summary with latest findings
- Add reference for claim in Section 1

**Minor issues:** 12
- Various typos and formatting inconsistencies

I'll create a revision plan to address all critical and important issues. Estimated 6 hours for revisions."

## After Completion

Once the document is fully produced, reviewed, and delivered:

1. **Complete the production log**: Fill in final metrics and lessons learned
2. **Archive all files**: Store source files securely
3. **Confirm delivery**: Verify all recipients received document
4. **Conduct retrospective**: What went well? What could improve?
5. **Update templates**: Document any process improvements for future projects

## Remember

Production is where all the planning pays off. If you've done thorough work in SPEC, PLAN, and TASK phases, production should be systematic and manageable.

**Signs of good production:**
- Tasks flow smoothly with minimal blockers
- Content follows outline naturally
- Reviews find minor issues, not major gaps
- Timeline and budget tracking as planned
- Quality is high throughout, not just at the end

**Red flags:**
- Frequently discovering missing information
- Major structural changes during drafting
- Reviews finding fundamental problems
- Significant timeline slippage
- Quality issues not caught until late

If you encounter red flags, it may indicate gaps in earlier phases. It's okay to revisit the plan or spec if needed.

## The Goal

Deliver a high-quality business document that:
- Meets all specification requirements ✓
- Serves its intended audience effectively ✓
- Achieves its stated purpose ✓
- Reflects professional standards ✓
- Was delivered on time and on budget ✓

Let's produce an excellent document together.
