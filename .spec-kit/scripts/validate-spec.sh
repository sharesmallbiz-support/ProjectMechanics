#!/bin/bash
# validate-spec.sh
# Validates a document specification against constitution requirements

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Usage
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <project-directory>"
    echo "Example: $0 business-docs/quarterly-review"
    exit 1
fi

PROJECT_DIR="$1"
SPEC_FILE="$PROJECT_DIR/spec.md"

echo "==================================="
echo "Document Spec Validation"
echo "==================================="
echo ""
echo "Project: $PROJECT_DIR"
echo ""

# Check if spec file exists
if [ ! -f "$SPEC_FILE" ]; then
    echo -e "${RED}✗ FAIL: spec.md not found${NC}"
    echo "Expected location: $SPEC_FILE"
    exit 1
fi

echo -e "${GREEN}✓ spec.md found${NC}"
echo ""

# Initialize counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Function to check if section exists in spec
check_section() {
    local section_name="$1"
    local section_pattern="$2"

    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

    if grep -q "$section_pattern" "$SPEC_FILE"; then
        echo -e "${GREEN}✓${NC} Section present: $section_name"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        return 0
    else
        echo -e "${RED}✗${NC} Section missing: $section_name"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        return 1
    fi
}

# Function to check if field has content (not just empty brackets or placeholders)
check_field_content() {
    local field_name="$1"
    local field_pattern="$2"

    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

    # Extract the content after the field pattern
    if grep -A 3 "$field_pattern" "$SPEC_FILE" | grep -v "^\[" | grep -v "^#" | grep -q "[a-zA-Z]"; then
        echo -e "${GREEN}✓${NC} Content provided: $field_name"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Content may be missing: $field_name"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        return 1
    fi
}

echo "Checking required sections..."
echo "-----------------------------------"

# Check all major sections
check_section "Document Overview" "## 1. Document Overview"
check_section "Audience Analysis" "## 2. Audience Analysis"
check_section "Key Messages" "## 3. Key Messages"
check_section "Content Requirements" "## 4. Content Requirements"
check_section "Constraints and Requirements" "## 5. Constraints and Requirements"
check_section "Quality Standards" "## 6. Quality Standards"

echo ""
echo "Checking critical fields..."
echo "-----------------------------------"

# Check critical fields have content
check_field_content "Document Purpose" "\*\*Document Purpose:\*\*"
check_field_content "Primary Audience" "### 2.1 Primary Audience"
check_field_content "Core Thesis" "### 3.1 Core Thesis"
check_field_content "Timeline" "### 5.2 Timeline"
check_field_content "Acceptance Criteria" "### 6.1 Acceptance Criteria"

echo ""
echo "Checking Constitution compliance..."
echo "-----------------------------------"

# Check for spec gate checklist
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if grep -q "Purpose clearly defined" "$SPEC_FILE" && \
   grep -q "Audience identified and characterized" "$SPEC_FILE" && \
   grep -q "Scope boundaries established" "$SPEC_FILE"; then
    echo -e "${GREEN}✓${NC} Specification gate checklist present"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}✗${NC} Specification gate checklist incomplete"
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
fi

echo ""
echo "==================================="
echo "Validation Summary"
echo "==================================="
echo "Total checks: $TOTAL_CHECKS"
echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC}"
echo -e "Failed: ${RED}$FAILED_CHECKS${NC}"
echo ""

# Calculate pass percentage
PASS_PERCENTAGE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))

if [ $PASS_PERCENTAGE -eq 100 ]; then
    echo -e "${GREEN}✓ VALIDATION PASSED${NC}"
    echo "Specification is complete and ready for planning phase."
    exit 0
elif [ $PASS_PERCENTAGE -ge 80 ]; then
    echo -e "${YELLOW}⚠ VALIDATION PASSED WITH WARNINGS${NC}"
    echo "Specification is mostly complete but some sections need attention."
    exit 0
else
    echo -e "${RED}✗ VALIDATION FAILED${NC}"
    echo "Specification is incomplete. Address failed checks before proceeding."
    exit 1
fi
