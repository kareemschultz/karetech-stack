#!/usr/bin/env bun
/**
 * Claude Code Pre-commit Hook for saas-preset-test
 * Runs quality checks before each commit
 */

console.log('🔍 Running pre-commit checks...');

let hasErrors = false;

// TypeScript type checking
console.log('📝 Type checking...');
try {
  await $`bun run typecheck`;
  console.log('✅ TypeScript compilation passed');
} catch (error) {
  console.error('❌ TypeScript compilation failed');
  hasErrors = true;
}

// ESLint checking
console.log('🧹 Linting...');
try {
  await $`bun run lint`;
  console.log('✅ Linting passed');
} catch (error) {
  console.error('❌ Linting failed');
  hasErrors = true;
}


// Run tests
console.log('🧪 Running tests...');
try {
  await $`bun run test`;
  console.log('✅ Tests passed');
} catch (error) {
  console.error('❌ Tests failed');
  hasErrors = true;
}



// Beads tracking sync
console.log('📋 Syncing Beads tracking...');
try {
  await $`bd sync`;
  console.log('✅ Beads sync completed');
} catch (error) {
  console.warn('⚠️  Beads sync failed - continuing anyway');
}


if (hasErrors) {
  console.error('\n❌ Pre-commit checks failed. Fix issues before committing.');
  process.exit(1);
} else {
  console.log('\n✅ All pre-commit checks passed!');
  process.exit(0);
}
