import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { orpcHandler } from '@orpc/server/hono'
import { router } from './router'

import { db } from './db'
const app = new Hono()
// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
origin: ['http://localhost:5173', 'http://localhost:3000'],
credentials: true,
}))
// API Routes
app.route('/api', orpcHandler({
router,
context: async () => ({
db,
// Add other context here
}),
}))


// Serve static files in production
if (process.env.NODE_ENV === 'production') {
app.use('*', serveStatic({
root: './dist',
index: 'index.html',
}))
// Catch all for SPA routing
app.get('*', serveStatic({
path: './dist/index.html',
}))
}
const port = Number(process.env.PORT) || 3000
console.log(`🚀 Server starting on port ${port}`)
serve({
fetch: app.fetch,
port,
})
export type App = typeof app