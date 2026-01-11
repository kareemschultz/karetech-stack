
// Development Environment Setup for saas-preset-test
console.log('🛠️  Setting up saas-preset-test development environment...');

// Install dependencies
console.log('📦 Installing dependencies...');
await $`bun install`;


// Setup PostgreSQL database
console.log('🐘 Setting up PostgreSQL...');
try {
  await $`createdb saas-preset-test`;
  console.log('✅ Database created');
} catch (error) {
  console.log('⚠️  Database may already exist');
}


// Run database migrations
console.log('📊 Running database migrations...');
try {
  await $`bun run db:generate`;
  await $`bun run db:migrate`;
  console.log('✅ Database migrations completed');
} catch (error) {
  console.log('⚠️  Migration issues - check database configuration');
}


// Initialize Beads tracking
console.log('📋 Initializing Beads tracking...');
try {
  await $`bd init`;
  await $`bd onboard`;
  console.log('✅ Beads tracking initialized');
} catch (error) {
  console.log('⚠️  Beads CLI not available - install from: https://github.com/steveyegge/beads');
}


console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('  1. Copy .env.example to .env.local and fill in values');
console.log('  2. Update database connection in .env.local');
console.log('  3. Configure OAuth providers in .env.local');
console.log('  4. Run "bun dev" to start development server');
console.log('  5. Check CLAUDE.md for full development guide');
