import { AuthError, AuthResponse, User } from '@supabase/supabase-js'
import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'

interface AuthContextInterface {
	signUp: (data: any) => Promise<AuthResponse>
	signIn: (data: any) => Promise<AuthResponse>
	signOut: () => Promise<{ error: AuthError }>
	user: User
}

const AuthContext = React.createContext<AuthContextInterface | null>(null)

export function AuthProvider({ children }: any) {
	const [user, setUser] = useState<User>()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null)
			setLoading(false)
		})

		const { data: listener } = supabase.auth.onAuthStateChange(async (_, session) => {
			setUser(session?.user ?? null)
			setLoading(false)
		})

		return () => {
			listener?.subscription.unsubscribe()
		}
	}, [])

	const value: AuthContextInterface = {
		signUp: (data) => supabase.auth.signUp(data),
		signIn: (data) => supabase.auth.signInWithPassword(data),
		signOut: () => supabase.auth.signOut(),
		user,
	}
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
	return useContext(AuthContext)
}
