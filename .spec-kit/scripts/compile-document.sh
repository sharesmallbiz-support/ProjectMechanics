#!/bin/bash
# compile-document.sh
# Simple script to compile markdown sections into a single document

set -e

# Usage
if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <project-directory> <output-filename>"
    echo "Example: $0 business-docs/quarterly-review Q1_Business_Review.md"
    exit 1
fi

PROJECT_DIR="$1"
OUTPUT_FILE="$PROJECT_DIR/output/$2"

echo "==================================="
echo "Document Compiler"
echo "==================================="
echo ""
echo "Project: $PROJECT_DIR"
echo "Output: $OUTPUT_FILE"
echo ""

# Create output directory if it doesn't exist
mkdir -p "$PROJECT_DIR/output"

# Check if we're using individual section files or a master document
if [ -d "$PROJECT_DIR/sections" ]; then
    echo "Compiling from section files..."
    echo ""

    # Initialize output file
    > "$OUTPUT_FILE"

    # Add title page if exists
    if [ -f "$PROJECT_DIR/sections/00-title.md" ]; then
        echo "Adding: Title page"
        cat "$PROJECT_DIR/sections/00-title.md" >> "$OUTPUT_FILE"
        echo -e "\n\n---\n\n" >> "$OUTPUT_FILE"
    fi

    # Add executive summary if exists
    if [ -f "$PROJECT_DIR/sections/01-executive-summary.md" ]; then
        echo "Adding: Executive summary"
        cat "$PROJECT_DIR/sections/01-executive-summary.md" >> "$OUTPUT_FILE"
        echo -e "\n\n---\n\n" >> "$OUTPUT_FILE"
    fi

    # Add all numbered section files in order
    for section_file in "$PROJECT_DIR/sections/"*-*.md; do
        if [ -f "$section_file" ]; then
            filename=$(basename "$section_file")
            if [[ ! "$filename" =~ ^0[01]- ]]; then
                echo "Adding: $filename"
                cat "$section_file" >> "$OUTPUT_FILE"
                echo -e "\n\n---\n\n" >> "$OUTPUT_FILE"
            fi
        fi
    done

    # Add appendices if exist
    if [ -d "$PROJECT_DIR/sections/appendices" ]; then
        for appendix_file in "$PROJECT_DIR/sections/appendices/"*.md; do
            if [ -f "$appendix_file" ]; then
                filename=$(basename "$appendix_file")
                echo "Adding: Appendix - $filename"
                cat "$appendix_file" >> "$OUTPUT_FILE"
                echo -e "\n\n---\n\n" >> "$OUTPUT_FILE"
            fi
        done
    fi

else
    echo "Section directory not found. Looking for master document..."

    # Look for common document file names
    if [ -f "$PROJECT_DIR/document.md" ]; then
        echo "Copying: document.md"
        cp "$PROJECT_DIR/document.md" "$OUTPUT_FILE"
    elif [ -f "$PROJECT_DIR/draft.md" ]; then
        echo "Copying: draft.md"
        cp "$PROJECT_DIR/draft.md" "$OUTPUT_FILE"
    else
        echo "ERROR: No source document found"
        echo ""
        echo "Expected either:"
        echo "  - $PROJECT_DIR/sections/ directory with numbered section files"
        echo "  - $PROJECT_DIR/document.md master file"
        echo "  - $PROJECT_DIR/draft.md master file"
        exit 1
    fi
fi

echo ""
echo "==================================="
echo "Compilation Complete"
echo "==================================="
echo ""
echo "Output file: $OUTPUT_FILE"

# Get file size and line count
FILE_SIZE=$(wc -c < "$OUTPUT_FILE" | awk '{print int($1/1024)}')
LINE_COUNT=$(wc -l < "$OUTPUT_FILE")
WORD_COUNT=$(wc -w < "$OUTPUT_FILE")

echo "File size: ${FILE_SIZE}KB"
echo "Lines: $LINE_COUNT"
echo "Words: $WORD_COUNT"
echo "Estimated pages (250 words/page): ~$((WORD_COUNT / 250))"
echo ""

# Suggest next steps
echo "Next steps:"
echo "  1. Review compiled document: $OUTPUT_FILE"
echo "  2. Convert to desired format (DOCX, PDF):"
echo "     - Use pandoc: pandoc $OUTPUT_FILE -o ${OUTPUT_FILE%.md}.docx"
echo "     - Or use online converter"
echo "  3. Run /docspec.validate to check quality"
echo ""
