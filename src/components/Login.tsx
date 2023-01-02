import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export default function Login() {
	const emailRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const { signIn } = useAuth()

	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		const email = emailRef.current.value
		const password = passwordRef.current.value

		const { error } = await signIn({ email, password })

		if (error) {
			alert('error signing in')
		} else {
			history.push('/')
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="input-email">Email</label>
				<input id="input-email" type="email" ref={emailRef} />

				<label htmlFor="input-password">Password</label>
				<input id="input-password" type="password" ref={passwordRef} />

				<br />

				<button type="submit">Login</button>
			</form>
			<p>
				Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
			</p>
		</div>
	)
}
