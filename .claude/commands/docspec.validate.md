# Validate Document Against Specification

You are helping the user validate their business document against its specification to ensure all requirements are met.

## Purpose

This command performs a comprehensive validation of the document against:
- The original specification requirements
- Constitution quality standards
- Plan commitments
- Professional quality standards

## When to Use

Run this validation:
- After completing first draft (before reviews)
- After major revisions
- Before final approval
- Before delivery
- Anytime you want to check compliance

## Instructions

1. **Locate project files**:
   Ask user for the document project name, or list available projects in `business-docs/`

2. **Load all reference documents**:
   - Read `spec.md` - The requirements
   - Read `plan.md` - The blueprint
   - Read `tasks.md` - The execution plan
   - Read `produce.md` - The production log
   - Read `.spec-kit/constitution.md` - The standards

3. **Check for document file**:
   Look in `business-docs/[project]/output/` for the document file(s)
   Or ask user where the current draft is located

4. **Perform validation across all dimensions**:

### A. Specification Compliance

Go through spec.md section by section:

**Section 1: Document Overview**
- [ ] Document achieves stated purpose
- [ ] Appropriate for target audience
- [ ] Within defined scope (in-scope items included, out-of-scope excluded)
- [ ] Document type matches specification

**Section 3: Key Messages**
- [ ] Core thesis is clearly presented
- [ ] All supporting messages are included
- [ ] Call to action is clear and prominent

**Section 4: Content Requirements**
- [ ] All required sections present
- [ ] All data requirements met
- [ ] All visual requirements present
- [ ] Research incorporated

**Section 5: Constraints**
- [ ] Format matches requirements
- [ ] Page count within specified range
- [ ] Template/branding applied correctly

**Section 6: Quality Standards**
- [ ] All acceptance criteria met
- [ ] Review process completed as specified

**Section 8: Compliance**
- [ ] Meets all policy requirements
- [ ] Confidentiality handled correctly
- [ ] Required approvals obtained

### B. Plan Compliance

**Document Structure:**
- [ ] Follows the planned outline
- [ ] All planned sections present
- [ ] Section order matches plan
- [ ] Page budget followed (±15% acceptable)

**Content Strategy:**
- [ ] All planned research incorporated
- [ ] Data from specified sources included
- [ ] SMEs consulted as planned

**Visual Elements:**
- [ ] All planned visuals present
- [ ] Visuals match specifications
- [ ] Style guide followed

**Tone and Style:**
- [ ] Overall tone matches plan
- [ ] Section-specific tones appropriate
- [ ] Voice and perspective consistent

**Review Process:**
- [ ] All planned review rounds completed
- [ ] Feedback incorporated

### C. Constitution Standards

**Core Principles:**
- [ ] Clarity: Language is clear and concise
- [ ] Audience-first: Serves intended readers well
- [ ] Data-driven: Claims supported by evidence
- [ ] Professional quality: Free of errors, well-formatted
- [ ] Structured approach: Follows proper workflow

**Required Sections:**
- [ ] Title page
- [ ] Executive summary (1-2 pages)
- [ ] Table of contents (if >5 pages)
- [ ] Main content with clear sections
- [ ] Conclusion/recommendations
- [ ] Appendices (if needed)
- [ ] References/citations

**Formatting Standards:**
- [ ] Professional fonts
- [ ] Consistent heading hierarchy
- [ ] Proper margins and spacing
- [ ] Page numbers on all pages (except title)
- [ ] Headers/footers present

**Visual Standards:**
- [ ] Tables for structured data
- [ ] Appropriate chart types
- [ ] High-resolution images
- [ ] Clear labels and legends
- [ ] Accessible colors (WCAG AA)

**Ethical Standards:**
- [ ] No fabricated data
- [ ] Limitations acknowledged
- [ ] Sources cited properly
- [ ] Contributors credited

**Accessibility:**
- [ ] Alt text for images
- [ ] Sufficient contrast
- [ ] Clear heading hierarchy
- [ ] Readable fonts

### D. Quality Checks

**Content Quality:**
- [ ] No spelling errors
- [ ] No grammar errors
- [ ] Consistent terminology
- [ ] Acronyms defined on first use
- [ ] Logical flow and transitions
- [ ] Active voice predominant
- [ ] No jargon without explanation

**Technical Accuracy:**
- [ ] Data is accurate
- [ ] Citations are complete and correct
- [ ] Cross-references work
- [ ] Calculations are correct
- [ ] Charts match source data

**Format Quality:**
- [ ] No widows or orphans
- [ ] No awkward page breaks
- [ ] Images high resolution (300+ DPI)
- [ ] Tables formatted consistently
- [ ] TOC accurate
- [ ] Page numbers correct

5. **Generate validation report**:

Create a validation report with:

```markdown
# Validation Report: [Document Title]

**Validated:** [Date]
**Validator:** [Your name or "AI Assistant"]
**Document Version:** [Version]
**Status:** PASS | PASS WITH NOTES | FAIL

---

## Executive Summary

[Overall assessment in 2-3 sentences]

**Key Findings:**
- [Major finding 1]
- [Major finding 2]

**Recommendation:** APPROVE | REVISE | REJECT

---

## Detailed Findings

### Specification Compliance: PASS | FAIL
[Details of compliance checks]

**Issues Found:**
1. [Issue if any]

### Plan Compliance: PASS | FAIL
[Details]

### Constitution Standards: PASS | FAIL
[Details]

### Quality Checks: PASS | FAIL
[Details]

---

## Critical Issues (Must Fix)

1. [Critical issue 1]
   - Location: [Where in document]
   - Requirement: [What spec/constitution requires]
   - Current state: [What document has]
   - Fix: [What needs to change]

---

## Important Issues (Should Fix)

1. [Important issue 1]
   - [Details]

---

## Minor Issues (Nice to Fix)

1. [Minor issue 1]
   - [Details]

---

## Strengths (What's Working Well)

1. [Strength 1]
2. [Strength 2]

---

## Compliance Summary

| Dimension | Status | Score | Notes |
|-----------|--------|-------|-------|
| Spec Compliance | ✓/✗ | X/Y | [Notes] |
| Plan Compliance | ✓/✗ | X/Y | [Notes] |
| Constitution Standards | ✓/✗ | X/Y | [Notes] |
| Quality Checks | ✓/✗ | X/Y | [Notes] |

---

## Recommendations

1. [Recommendation 1]
2. [Recommendation 2]

---

**Next Steps:**

[What should happen based on this validation]
```

6. **Present findings to user**:
   - Share the validation report
   - Highlight critical issues
   - Provide specific guidance on fixes
   - Offer to help address issues

## Example Interaction

**User:** "Can you validate my quarterly business review document?"

**You:** "I'll validate your quarterly business review document against the specification, plan, and constitution standards.

Loading project files...
- ✓ spec.md loaded
- ✓ plan.md loaded
- ✓ constitution.md loaded
- ✓ Document draft located

Performing validation...

**Specification Compliance:** Checking all spec requirements... ✓ PASS
- All required sections present
- Audience and purpose align
- Within scope
- Minor note: Page count is 38 (target was 30-35, max 40)

**Plan Compliance:** Checking against plan... ⚠ PASS WITH NOTES
- Structure follows outline ✓
- All visuals present ✓
- Issue: Chart 3 uses different data source than planned (planned: Q4 2024, actual: Q3 2024)

**Constitution Standards:** Checking quality standards... ⚠ PASS WITH NOTES
- Most standards met
- Found 3 spelling errors
- Found 1 undefined acronym (ROI used without definition)

**Quality Checks:** Comprehensive quality review... ⚠ ISSUES FOUND
- 3 spelling errors (locations: p.12, p.18, p.24)
- 1 broken cross-reference (Section 3 references "Table 5.2" which doesn't exist)
- TOC has incorrect page number for Appendix B

---

**Overall Assessment:** PASS WITH NOTES

**Critical Issues:** 0
**Important Issues:** 2
- Chart 3 data source discrepancy needs explanation or correction
- Broken cross-reference must be fixed

**Minor Issues:** 4
- 3 spelling errors
- 1 undefined acronym

I've generated a full validation report. Would you like me to:
1. Show you the complete report?
2. Help fix the identified issues?
3. Create a task list for addressing the issues?"

## Key Principles

- **Be thorough**: Check everything, don't skip sections
- **Be specific**: Identify exact locations of issues
- **Be constructive**: Frame issues as opportunities to improve
- **Prioritize**: Distinguish critical from minor issues
- **Recognize strengths**: Note what's working well, not just problems

## Remember

Validation is not about finding fault—it's about ensuring excellence. A good validation:
- Catches issues before stakeholders do
- Provides clear guidance for improvement
- Confirms what's working well
- Ensures requirements are met
- Builds confidence in the final product

"Trust, but verify." - Russian proverb

The spec, plan, and constitution are your verification criteria. The document should match them precisely.
