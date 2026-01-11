import { ORPCRouter } from '@orpc/server'
import { z } from 'zod'
import type { Database } from './db'
interface Context {
db: Database
}
export const router = new ORPCRouter<Context>()
.route('hello', {
input: z.object({
name: z.string().optional().default('World')
}),
output: z.object({
message: z.string(),
project: z.string(),
timestamp: z.string()
}),
handler: async (input) => {
return {
message: `Hello, ${input.name}!`,
project: 'saas-preset-test',
timestamp: new Date().toISOString()
}
}
})
.route('status', {
input: z.void(),
output: z.object({
status: z.literal('ok'),
database: z.string().optional(),
timestamp: z.string()
}),
handler: async (_, { db }) => {
return {
status: 'ok' as const,
database: 'connected',
timestamp: new Date().toISOString()
}
}
})
export type AppRouter = typeof router
