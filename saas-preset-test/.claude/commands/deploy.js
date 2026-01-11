
// Build and Deploy saas-preset-test
console.log('🚀 Building saas-preset-test for deployment...');

// Run full validation
console.log('✅ Running pre-deployment validation...');

console.log('📝 TypeScript validation...');
await $`bun run typecheck`;

console.log('🧹 Code linting...');
await $`bun run lint`;


console.log('🧪 Running tests...');
await $`bun run test`;



console.log('🎭 Running E2E tests...');
await $`bun run test:e2e`;


// Build application
console.log('🔨 Building application...');
await $`bun run build`;


// Build Docker image
console.log('🐳 Building Docker image...');
await $`docker build -t saas-preset-test .`;


console.log('✅ Build completed successfully!');


console.log('🌐 Ready for Vercel deployment');
console.log('Run: vercel --prod');

