// minimal-preset-test Status Command

// Check and display project status
console.log('📊 minimal-preset-test Status Report');
console.log('================================');

// Git status
console.log('\n📂 Git Status:');
const gitStatus = await $`git status --short`;
console.log(gitStatus.stdout || 'Working directory clean');

// TypeScript compilation
console.log('\n📝 TypeScript Status:');
try {
  await $`bun run typecheck`;
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.log('❌ TypeScript compilation issues');
}


// Test status
console.log('\n🧪 Test Status:');
try {
  await $`bun run test`;
  console.log('✅ All tests passing');
} catch (error) {
  console.log('❌ Test failures detected');
}




// Development server status
console.log('\n🚀 Development Status:');
try {
  const response = await fetch('http://localhost:3000/health');
  if (response.ok) {
    console.log('✅ Development server running');
  } else {
    console.log('⚠️  Development server responding with errors');
  }
} catch (error) {
  console.log('❌ Development server not running');
}

console.log('\n📋 Next Steps:');
console.log('  • Run "bun dev" to start development server');

console.log('  • Check docs/PROJECT_STATUS.md for detailed status');
