import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'
const databaseUrl = process.env.DATABASE_URL || './local.db'
// Create the connection
const connection = new Database(databaseUrl)
// Enable WAL mode for better performance
connection.pragma('journal_mode = WAL')
// Create the database instance
export const db = drizzle(connection, { schema })
export type Database = typeof db
// Export schema for use in other files
export * from './schema'
// Graceful shutdown
process.on('SIGINT', () => {
connection.close()
process.exit(0)
})