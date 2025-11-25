#!/bin/bash

# Complete Refactoring Script
# Run this script to finish the folder structure cleanup
# Usage: bash complete_refactoring.sh

set -e  # Exit on any error

echo "========================================="
echo "Completing Folder Structure Refactoring"
echo "========================================="
echo ""

# Change to repository root
cd "$(dirname "$0")"

echo "Current directory: $(pwd)"
echo ""

# Step 0: Stage the moves first (files are currently untracked)
echo "[0/6] Staging moved files and deletions..."
git add -A
echo "✓ Changes staged"
echo ""

# On macOS, git mv doesn't work for case-only renames on case-insensitive filesystems
# We need to use a two-step process: rename to temp, then rename to final

# Step 1: Rename expert-interviews features to kebab-case (two-step for case changes)
echo "[1/6] Renaming expert-interviews features..."
git mv ui_tests/features/usage-metrics/expert-interviews/All-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/all-expert-interview-temp.feature
git mv ui_tests/features/usage-metrics/expert-interviews/all-expert-interview-temp.feature ui_tests/features/usage-metrics/expert-interviews/all-expert-interview.feature

git mv ui_tests/features/usage-metrics/expert-interviews/Completed-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/completed-expert-interview-temp.feature
git mv ui_tests/features/usage-metrics/expert-interviews/completed-expert-interview-temp.feature ui_tests/features/usage-metrics/expert-interviews/completed-expert-interview.feature

git mv ui_tests/features/usage-metrics/expert-interviews/Scheduled-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/scheduled-expert-interview-temp.feature
git mv ui_tests/features/usage-metrics/expert-interviews/scheduled-expert-interview-temp.feature ui_tests/features/usage-metrics/expert-interviews/scheduled-expert-interview.feature

git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Expert.feature ui_tests/features/usage-metrics/expert-interviews/search-by-expert-temp.feature
git mv ui_tests/features/usage-metrics/expert-interviews/search-by-expert-temp.feature ui_tests/features/usage-metrics/expert-interviews/search-by-expert.feature

git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Student.feature ui_tests/features/usage-metrics/expert-interviews/search-by-student-temp.feature
git mv ui_tests/features/usage-metrics/expert-interviews/search-by-student-temp.feature ui_tests/features/usage-metrics/expert-interviews/search-by-student.feature

git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Topic.feature ui_tests/features/usage-metrics/expert-interviews/search-by-topic-temp.feature
git mv ui_tests/features/usage-metrics/expert-interviews/search-by-topic-temp.feature ui_tests/features/usage-metrics/expert-interviews/search-by-topic.feature
echo "✓ Expert interviews features renamed"
echo ""

# Step 2: Rename dashboard feature
echo "[2/6] Renaming dashboard feature..."
git mv ui_tests/features/dashboard/system.status.feature ui_tests/features/dashboard/system-status.feature
echo "✓ Dashboard feature renamed"
echo ""

# Step 3: Rename interview-questions features (expand "ques" to "questions")
echo "[3/6] Renaming interview-questions features..."
git mv ui_tests/features/interview-questions/ques-preview-with-properties.feature ui_tests/features/interview-questions/question-preview-with-properties.feature
git mv ui_tests/features/interview-questions/filter-ques-by-difficulty.feature ui_tests/features/interview-questions/filter-questions-by-difficulty.feature
git mv ui_tests/features/interview-questions/filter-ques-by-job-title.feature ui_tests/features/interview-questions/filter-questions-by-job-title.feature
git mv ui_tests/features/interview-questions/search-ques-by-keyword.feature ui_tests/features/interview-questions/search-questions-by-keyword.feature
git mv ui_tests/features/interview-questions/total-ques-count-by-difficulty.feature ui_tests/features/interview-questions/total-questions-count-by-difficulty.feature
git mv ui_tests/features/interview-questions/total-ques-count-by-job.feature ui_tests/features/interview-questions/total-questions-count-by-job.feature
echo "✓ Interview questions features renamed"
echo ""

# Step 4: Rename folders
echo "[4/6] Renaming folders..."
git mv ui_tests/features/mentor-list-test ui_tests/features/mentor-list
git mv ui_tests/features/student-readiness-code ui_tests/features/student-readiness-coding
echo "✓ Folders renamed"
echo ""

# Step 5: Clean up temporary scripts
echo "[5/6] Cleaning up temporary files..."
rm -f rename_files.sh
echo "✓ Temporary files removed"
echo ""

# Step 6: Verify git status
echo "[6/6] Checking git status..."
git status --short | head -20
echo ""
echo "(Showing first 20 changes...)"
echo ""

echo "========================================="
echo "✓ Refactoring Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. Verify tests are discovered: cd ui_tests && npm test"
echo "3. Commit the changes:"
echo "   git commit -m 'refactor: clean up folder structure and add multi-externship support"
echo ""
echo "   - Flatten features directory (remove master-list)"
echo "   - Consolidate login features"
echo "   - Standardize file naming to kebab-case"
echo "   - Rename folders for consistency"
echo "   - Fix import paths in step definitions"
echo "   - Add multi-externship environment configuration"
echo "   - Move documentation to ui_tests/docs/'"
echo ""
echo "4. Push to remote: git push -u origin refactor/folder-structure-cleanup"
echo ""
echo "For more information, see:"
echo "- REFACTORING_SUMMARY.md"
echo "- ui_tests/docs/MULTI_EXTERNSHIP_SETUP.md"
