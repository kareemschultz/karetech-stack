
// Development Environment Setup for minimal-preset-test
console.log('🛠️  Setting up minimal-preset-test development environment...');

// Install dependencies
console.log('📦 Installing dependencies...');
await $`bun install`;



// Run database migrations
console.log('📊 Running database migrations...');
try {
  await $`bun run db:generate`;
  await $`bun run db:migrate`;
  console.log('✅ Database migrations completed');
} catch (error) {
  console.log('⚠️  Migration issues - check database configuration');
}



console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('  1. Copy .env.example to .env.local and fill in values');
console.log('  2. Update database connection in .env.local');

console.log('  4. Run "bun dev" to start development server');
console.log('  5. Check CLAUDE.md for full development guide');
