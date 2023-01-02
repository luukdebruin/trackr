import React from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/Auth'

export default function Header() {
	const { user, signOut } = useAuth()

	const history = useHistory()

	async function handleSignOut() {
		await signOut()
		history.push('/login')
	}

	return (
		<div className="py-4 flex justify-between w-full">
			<p>{user.email}</p>
			<a onClick={handleSignOut}>Sign out</a>
		</div>
	)
}
