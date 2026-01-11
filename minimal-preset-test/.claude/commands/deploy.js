
// Build and Deploy minimal-preset-test
console.log('🚀 Building minimal-preset-test for deployment...');

// Run full validation
console.log('✅ Running pre-deployment validation...');

console.log('📝 TypeScript validation...');
await $`bun run typecheck`;

console.log('🧹 Code linting...');
await $`bun run lint`;


console.log('🧪 Running tests...');
await $`bun run test`;




// Build application
console.log('🔨 Building application...');
await $`bun run build`;



console.log('✅ Build completed successfully!');


console.log('🌐 Ready for Vercel deployment');
console.log('Run: vercel --prod');

