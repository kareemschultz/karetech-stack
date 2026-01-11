#!/usr/bin/env bun
/**
 * Claude Code Post-commit Hook for saas-preset-test
 * Updates Beads tracking after successful commits
 */

console.log('📋 Updating Beads tracking...');

try {
  // Get the commit message to check for issue references
  const commitMsg = await $`git log -1 --pretty=%B`.text();

  // Check for issue references (bd-XXXX pattern)
  const issueMatch = commitMsg.match(/bd-([a-zA-Z0-9]+)/);

  if (issueMatch) {
    const issueId = 'bd-' + issueMatch[1];
    console.log(`📌 Found issue reference: ${issueId}`);

    // Update issue with commit reference
    await $`bd update ${issueId} --comment "Commit: ${process.env.GIT_COMMIT || 'latest'}"`;
    console.log('✅ Issue updated with commit reference');
  }

  // Sync all tracking
  await $`bd sync`;
  console.log('✅ Beads tracking synchronized');

} catch (error) {
  console.warn('⚠️  Post-commit Beads sync failed:', error.message);
  // Don't fail the commit for tracking issues
}
