import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export default function Signup() {
	const emailRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const { signUp } = useAuth()

	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		const email = emailRef.current.value
		const password = passwordRef.current.value

		const { error } = await signUp({ email, password })

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

				<button type="submit">Sign up</button>
			</form>
			<p>
				Already have an account? <Link to="/login">Log In</Link>
			</p>
		</div>
	)
}
