#!/bin/bash
# generate-tasks.sh
# Helper script to analyze plan and suggest task breakdown structure

set -e

# Usage
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <project-directory>"
    echo "Example: $0 business-docs/quarterly-review"
    exit 1
fi

PROJECT_DIR="$1"
PLAN_FILE="$PROJECT_DIR/plan.md"
SPEC_FILE="$PROJECT_DIR/spec.md"

echo "==================================="
echo "Task Generation Helper"
echo "==================================="
echo ""
echo "Project: $PROJECT_DIR"
echo ""

# Check if plan file exists
if [ ! -f "$PLAN_FILE" ]; then
    echo "ERROR: plan.md not found at $PLAN_FILE"
    echo "Please complete /docspec.plan before generating tasks."
    exit 1
fi

# Check if spec file exists
if [ ! -f "$SPEC_FILE" ]; then
    echo "ERROR: spec.md not found at $SPEC_FILE"
    echo "Please complete /docspec.spec first."
    exit 1
fi

echo "✓ Required files found"
echo ""

# Analyze plan and provide task suggestions
echo "Analyzing plan.md..."
echo ""

# Count sections in plan
SECTION_COUNT=$(grep -c "^**Section [0-9]" "$PLAN_FILE" || echo "0")
echo "Sections to write: $SECTION_COUNT"

# Count visual elements
CHART_COUNT=$(grep -c "^**Chart [0-9]" "$PLAN_FILE" || echo "0")
TABLE_COUNT=$(grep -c "^**Table [0-9]" "$PLAN_FILE" || echo "0")
DIAGRAM_COUNT=$(grep -c "^**Diagram [0-9]" "$PLAN_FILE" || echo "0")
TOTAL_VISUALS=$((CHART_COUNT + TABLE_COUNT + DIAGRAM_COUNT))

echo "Visual elements planned:"
echo "  - Charts: $CHART_COUNT"
echo "  - Tables: $TABLE_COUNT"
echo "  - Diagrams: $DIAGRAM_COUNT"
echo "  - Total: $TOTAL_VISUALS"
echo ""

# Count research items
RESEARCH_COUNT=$(grep -c "^[0-9]\. \[Research" "$PLAN_FILE" || echo "0")
echo "Research items: $RESEARCH_COUNT"
echo ""

# Estimate total tasks
WRITING_TASKS=$((SECTION_COUNT + 1))  # +1 for executive summary
VISUAL_TASKS=$TOTAL_VISUALS
RESEARCH_TASKS=$RESEARCH_COUNT
ASSEMBLY_TASKS=4  # Template, assembly, TOC, cross-refs
REVIEW_TASKS=6    # Peer, SME, Stakeholder, Incorporate x2, Final
FINALIZATION_TASKS=4  # Copyedit, proofread, format, deliver

TOTAL_TASKS=$((WRITING_TASKS + VISUAL_TASKS + RESEARCH_TASKS + ASSEMBLY_TASKS + REVIEW_TASKS + FINALIZATION_TASKS))

echo "==================================="
echo "Estimated Task Breakdown"
echo "==================================="
echo ""
echo "Phase 1: Research & Data Collection"
echo "  Tasks: ~$RESEARCH_TASKS"
echo "  Estimated hours: ~$((RESEARCH_TASKS * 3))"
echo ""
echo "Phase 2: Content Development"
echo "  Tasks: ~$WRITING_TASKS"
echo "  Estimated hours: ~$((WRITING_TASKS * 5))"
echo ""
echo "Phase 3: Visual Element Creation"
echo "  Tasks: ~$VISUAL_TASKS"
echo "  Estimated hours: ~$((VISUAL_TASKS * 2))"
echo ""
echo "Phase 4: Document Assembly"
echo "  Tasks: ~$ASSEMBLY_TASKS"
echo "  Estimated hours: ~$((ASSEMBLY_TASKS * 2))"
echo ""
echo "Phase 5: Review & Refinement"
echo "  Tasks: ~$REVIEW_TASKS"
echo "  Estimated hours: ~$((REVIEW_TASKS * 3))"
echo ""
echo "Phase 6: Finalization"
echo "  Tasks: ~$FINALIZATION_TASKS"
echo "  Estimated hours: ~$((FINALIZATION_TASKS * 2))"
echo ""
echo "-----------------------------------"
echo "TOTAL ESTIMATED TASKS: $TOTAL_TASKS"
echo "TOTAL ESTIMATED HOURS: ~$(( (RESEARCH_TASKS * 3) + (WRITING_TASKS * 5) + (VISUAL_TASKS * 2) + (ASSEMBLY_TASKS * 2) + (REVIEW_TASKS * 3) + (FINALIZATION_TASKS * 2) ))"
echo ""
echo "==================================="
echo "Next Steps"
echo "==================================="
echo ""
echo "Use /docspec.tasks to create the detailed task breakdown."
echo "This analysis provides estimates for your task planning."
echo ""
echo "Key considerations for task breakdown:"
echo "  - Each writing task should be 4-8 hours"
echo "  - Complex sections may need multiple tasks"
echo "  - Build in 15-20% buffer for revisions"
echo "  - Identify dependencies clearly"
echo "  - Plan for parallel tasks where possible"
echo ""
