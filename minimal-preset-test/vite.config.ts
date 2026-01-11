import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
plugins: [
react({
babel: {
plugins: [
]
}
}),
],
resolve: {
alias: {
'@': path.resolve(__dirname, './src'),
'@/components': path.resolve(__dirname, './src/components'),
'@/lib': path.resolve(__dirname, './src/lib'),
'@/utils': path.resolve(__dirname, './src/utils'),
'@/db': path.resolve(__dirname, './src/db'),
'@/auth': path.resolve(__dirname, './src/auth'),
'@/api': path.resolve(__dirname, './src/api')
}
},
build: {
sourcemap: true,
rollupOptions: {
output: {
manualChunks: {
vendor: ['react', 'react-dom'],
api: ['@orpc/client', '@orpc/react-query'],
router: ['@tanstack/react-router'],
auth: ['better-auth'],
db: ['drizzle-orm', 'better-sqlite3']
}
}
}
},
server: {
port: 3000,
host: true
},
preview: {
port: 4173,
host: true
},
define: {
__APP_VERSION__: JSON.stringify(process.env.npm_package_version)
}
})