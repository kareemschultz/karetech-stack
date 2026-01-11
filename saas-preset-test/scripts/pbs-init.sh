#!/bin/bash
# PBS Initialization Script for saas-preset-test

echo "🚀 Initializing PBS workflow for saas-preset-test"

# Initialize Beads issue tracking
if command -v bd &> /dev/null; then
    echo "📋 Initializing Beads issue tracking..."
    bd init
    bd onboard
else
    echo "⚠️  Beads CLI not found. Install from: https://github.com/steveyegge/beads"
fi

# Initialize Spec Kit
if command -v specify &> /dev/null; then
    echo "📝 Initializing Spec Kit..."
    specify init . --ai claude
else
    echo "⚠️  Spec Kit CLI not found. Install from: https://github.com/github/spec-kit"
fi

echo "✅ PBS initialization complete!"
echo "📚 Read CLAUDE.md for next steps"
