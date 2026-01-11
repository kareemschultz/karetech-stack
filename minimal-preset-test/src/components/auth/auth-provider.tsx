import React from 'react'

// Auth provider implementation
// This will be generated with full auth functionality when auth is enabled
export function AuthProvider({ children }: { children: React.ReactNode }) {
// TODO: Implement authentication with Better Auth
return <>{children}</>
}
export function useAuth() {
// TODO: Return auth state and methods
return {
user: null,
isLoading: false,
signIn: async () => {},
signOut: async () => {}
}
}
