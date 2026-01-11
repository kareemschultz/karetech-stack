#!/bin/bash
# GitHub Issues Creation Script for KareTech Stack
# Run this script with: bash .github/ISSUES/create-issues.sh
#
# Prerequisites:
# - GitHub CLI (gh) installed: https://cli.github.com/
# - Authenticated: gh auth login
# - In the repository root directory

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="kareemschultz/karetech-stack"

echo "=============================================="
echo "  KareTech Stack - GitHub Issues Creator"
echo "=============================================="
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "Error: Not authenticated with GitHub CLI."
    echo "Run: gh auth login"
    exit 1
fi

echo "Creating GitHub issues for community engagement..."
echo ""

# Function to create an issue
create_issue() {
    local title="$1"
    local labels="$2"
    local body_file="$3"

    echo "Creating: $title"

    if gh issue create \
        --repo "$REPO" \
        --title "$title" \
        --label "$labels" \
        --body-file "$SCRIPT_DIR/$body_file"; then
        echo "  -> Created successfully"
    else
        echo "  -> Failed to create (may already exist or label doesn't exist)"
    fi
    echo ""
}

# First, create labels that may not exist
echo "Ensuring required labels exist..."
echo ""

create_label() {
    local name="$1"
    local color="$2"
    local description="$3"

    if gh label create "$name" --repo "$REPO" --color "$color" --description "$description" 2>/dev/null; then
        echo "  Created label: $name"
    else
        echo "  Label exists: $name"
    fi
}

# Create milestone labels
create_label "milestone" "5319E7" "Major version milestone"
create_label "v0.2.0" "0E8A16" "Version 0.2.0 milestone"
create_label "v0.3.0" "0E8A16" "Version 0.3.0 milestone"
create_label "v0.4.0" "0E8A16" "Version 0.4.0 milestone"
create_label "v0.5.0" "0E8A16" "Version 0.5.0 milestone"

# Create feature labels
create_label "beads-integration" "1D76DB" "Beads issue tracking integration"
create_label "ai-agents" "D93F0B" "AI agents and automation"
create_label "skills-library" "D93F0B" "Pre-built skills library"
create_label "pbs-automation" "5319E7" "Plan-Build-Ship automation"
create_label "ai-orchestration" "5319E7" "AI workflow orchestration"
create_label "themes" "FBCA04" "Theme and styling features"
create_label "developer-experience" "C5DEF5" "Developer experience improvements"
create_label "analytics" "1D76DB" "Analytics and metrics"
create_label "plugins" "D4C5F9" "Plugin ecosystem"
create_label "ecosystem" "D4C5F9" "Ecosystem and integrations"
create_label "architecture" "BFD4F2" "Architecture decisions"
create_label "tutorial" "0075CA" "Tutorials and guides"
create_label "beginner-friendly" "7057FF" "Good for beginners"

echo ""
echo "----------------------------------------------"
echo "Creating Milestone Issues (4)"
echo "----------------------------------------------"
echo ""

# Milestone issues
create_issue \
    "v0.2.0: Automated MCP Server Integration" \
    "milestone,enhancement,v0.2.0" \
    "v0.2.0-mcp-integration.md"

create_issue \
    "v0.3.0: Automated Issue Tracking with Beads" \
    "milestone,enhancement,v0.3.0,beads-integration" \
    "v0.3.0-beads-integration.md"

create_issue \
    "v0.4.0: Skills Library & Pre-built Agents" \
    "milestone,enhancement,v0.4.0,ai-agents,skills-library" \
    "v0.4.0-skills-agents.md"

create_issue \
    "v0.5.0: Complete Plan-Build-Ship Automation" \
    "milestone,enhancement,v0.5.0,pbs-automation,ai-orchestration" \
    "v0.5.0-pbs-automation.md"

echo "----------------------------------------------"
echo "Creating Enhancement Issues (3)"
echo "----------------------------------------------"
echo ""

# Enhancement issues
create_issue \
    "Enhanced Theme Customization Interface" \
    "enhancement,themes,developer-experience,good first issue" \
    "enhancement-theme-customization.md"

create_issue \
    "Project Analytics Dashboard" \
    "enhancement,analytics,developer-experience" \
    "enhancement-analytics-dashboard.md"

create_issue \
    "Plugin Ecosystem for Custom Integrations" \
    "enhancement,plugins,ecosystem,architecture" \
    "enhancement-plugin-ecosystem.md"

echo "----------------------------------------------"
echo "Creating Documentation Issues (1)"
echo "----------------------------------------------"
echo ""

# Documentation issues
create_issue \
    "Interactive Getting Started Tutorial" \
    "documentation,tutorial,beginner-friendly,good first issue" \
    "documentation-interactive-tutorial.md"

echo "=============================================="
echo "  Issue Creation Complete!"
echo "=============================================="
echo ""
echo "View issues at: https://github.com/$REPO/issues"
echo ""
