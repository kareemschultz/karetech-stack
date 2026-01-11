import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthProvider } from '@/components/auth/auth-provider'
export const Route = createRootRoute({
component: () => (
<AuthProvider>
<div className="p-2 flex gap-2">
<Link to="/" className="[&.active]:font-bold">
Home
</Link>
<Link to="/about" className="[&.active]:font-bold">
About
</Link>
<Link to="/auth" className="[&.active]:font-bold">
Auth
</Link>
</div>
<hr />
<AppContent />
</AuthProvider>
),
})
function AppContent() {
return (
<>
<Outlet />
{import.meta.env.DEV && <TanStackRouterDevtools />}
</>
)
}