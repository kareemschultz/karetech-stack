#!/bin/bash
# PBS Status Check Script for saas-preset-test

echo "📊 PBS Status for saas-preset-test"
echo "=================================="

# Check Beads status
if command -v bd &> /dev/null; then
    echo "📋 Beads Issues:"
    bd ready
    echo ""
else
    echo "⚠️  Beads CLI not available"
fi

# Check git status
echo "📂 Git Status:"
git status --short
echo ""

# Check recent commits
echo "📝 Recent Commits:"
git log --oneline -5
echo ""

# Check project status
if [ -f "docs/PROJECT_STATUS.md" ]; then
    echo "📋 Current Phase: $(grep -m1 "Phase" docs/PROJECT_STATUS.md | cut -d'|' -f3 | xargs)"
fi

echo "✅ Status check complete!"
