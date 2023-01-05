import { AuthError, AuthResponse, User } from '@supabase/supabase-js'
import React, { useContext, useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch } from 'src/redux/hooks'
import { supabase } from '../database/supabaseClient'

interface AuthContextInterface {
	signUp: (data: any) => Promise<AuthResponse>
	signIn: (data: any) => Promise<AuthResponse>
	signOut: () => Promise<{ error: AuthError }>
	user: User
}

const AuthContext = React.createContext<AuthContextInterface | null>(null)

export function AuthProvider({ children }: any) {
	const dispatch = useAppDispatch()
	const { login, logout } = bindActionCreators(
		{
			login: allActionCreators.login,
			logout: allActionCreators.logout,
		},
		dispatch,
	)
	const [user, setUser] = useState<User>()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser((session?.user as any) ?? null)
			setLoading(false)
		})

		const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
			setLoading(false)
			if (event == 'SIGNED_IN') {
				setUser(session.user)
				login(session.user)
			}
			if (event == 'SIGNED_OUT') {
				setUser(undefined)
				logout()
			}
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
