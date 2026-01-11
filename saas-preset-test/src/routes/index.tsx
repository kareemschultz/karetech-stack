import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/api'
export const Route = createFileRoute('/')({
component: Index,
})
function Index() {
const { data, isLoading, error } = useQuery({
queryKey: ['hello'],
queryFn: () => client.hello({ name: 'World' })
})
return (
<div className="p-2">
<h3 className="text-3xl font-bold">Welcome to saas-preset-test!</h3>
<p className="mt-4 text-gray-600">Full-featured SaaS starter with PostgreSQL, full auth, and complete DevOps</p>
<div className="mt-8">
<h4 className="text-xl font-semibold mb-4">🚀 Getting Started</h4>
<ul className="space-y-2 text-sm">
<li>✅ <strong>Framework:</strong> React + TypeScript + Vite</li>
<li>✅ <strong>Routing:</strong> TanStack Router</li>
<li>✅ <strong>Styling:</strong> Tailwind CSS + shadcn/ui (maia)</li>
<li>✅ <strong>State:</strong> TanStack Query</li>
<li>✅ <strong>Database:</strong> PostgreSQL + Drizzle ORM</li>
<li>✅ <strong>Auth:</strong> Better Auth with email, oauth</li>
<li>✅ <strong>Testing:</strong> playwright + Vitest</li>
<li>✅ <strong>API:</strong> oRPC (type-safe API calls)</li>
<li>✅ <strong>Docker:</strong> Production-ready containerization</li>
<li>✅ <strong>AI Workflow:</strong> PBS (Plan-Build-Ship) system</li>
</ul>
</div>
<div className="mt-8 p-4 bg-gray-50 rounded-lg">
<h4 className="text-lg font-semibold mb-2">🔌 API Connection Test</h4>
{isLoading && <p className="text-blue-600">Loading...</p>}
{error && <p className="text-red-600">Error: {(error as Error).message}</p>}
{data && (
<p className="text-green-600">
✅ API Response: {JSON.stringify(data)}
</p>
)}
</div>
<div className="mt-8">
<h4 className="text-xl font-semibold mb-4">📚 Next Steps</h4>
<ol className="list-decimal list-inside space-y-2 text-sm">
<li>Edit <code className="bg-gray-100 px-1 rounded">src/routes/index.tsx</code> to customize this page</li>
<li>Set up your database schema in <code className="bg-gray-100 px-1 rounded">src/db/schema.ts</code></li>
<li>Configure authentication in <code className="bg-gray-100 px-1 rounded">src/auth/config.ts</code></li>
<li>Add API endpoints in <code className="bg-gray-100 px-1 rounded">src/api/</code></li>
<li>Create new routes in <code className="bg-gray-100 px-1 rounded">src/routes/</code></li>
<li>Add UI components in <code className="bg-gray-100 px-1 rounded">src/components/</code></li>
<li>Run tests with <code className="bg-gray-100 px-1 rounded">bun test</code></li>
<li>Build Docker image with <code className="bg-gray-100 px-1 rounded">bun run docker:build</code></li>
</ol>
</div>
<div className="mt-8 p-4 border border-blue-200 bg-blue-50 rounded-lg">
<p className="text-blue-800">
🎉 <strong>Created with KareTech Stack</strong> - An enhanced Better-T-Stack scaffold with PBS, testing, and DevOps built-in!
</p>
</div>
</div>
)
}