#!/usr/bin/env bun
/**
 * Claude Code Pre-session Hook for saas-preset-test
 * Prepares workspace for AI-assisted development session
 */

console.log('🚀 Starting Claude Code session for saas-preset-test');

// Check project status
console.log('📊 Checking project status...');
try {
  if (existsSync('docs/PROJECT_STATUS.md')) {
    const status = await Bun.file('docs/PROJECT_STATUS.md').text();
    const phaseMatch = status.match(/\*\*Phase\*\*.*\|(.*?)\|/);
    if (phaseMatch) {
      console.log(`📈 Current phase: ${phaseMatch[1].trim()}`);
    }
  }
} catch (error) {
  console.warn('⚠️  Could not read project status');
}


// Show ready work from Beads
console.log('📋 Checking Beads for ready work...');
try {
  const readyWork = await $`bd ready --json`.json();
  if (readyWork.length > 0) {
    console.log(`✨ ${readyWork.length} items ready to work on:`);
    readyWork.slice(0, 3).forEach(item => {
      console.log(`  - ${item.title} (${item.id})`);
    });
  } else {
    console.log('📝 No items ready - check bd list for available work');
  }
} catch (error) {
  console.warn('⚠️  Could not check Beads status');
}


// Environment validation
console.log('🔧 Validating development environment...');
try {
  await $`bun run typecheck`;
  console.log('✅ TypeScript environment ready');
} catch (error) {
  console.error('❌ TypeScript compilation issues - run bun run typecheck');
}

console.log('\n🎯 Session ready! Remember to:');
console.log('  • Update docs/PROJECT_STATUS.md at start and end');
console.log('  • Follow constitutional principles (strict TypeScript)');
console.log('  • Use bd commands for issue tracking');
console.log('  • Commit with conventional format');
console.log('\n💡 Happy coding! 🚀\n');
