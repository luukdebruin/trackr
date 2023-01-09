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
		<div className="w-full h-full flex justify-center items-center">
			<div className="p-8 bg-slate-300 h-fit min-w-[400px] rounded-xl">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col pb-2">
						<label htmlFor="input-email">Email</label>
						<input
							id="input-email"
							type="email"
							ref={emailRef}
							className="appearance-none rounded-md w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div className="flex flex-col py-2">
						<label htmlFor="input-password">Password</label>
						<input
							id="input-password"
							type="password"
							ref={passwordRef}
							className="appearance-none rounded-md w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div>
						<button className="py-2 px-4 mt-4 bg-indigo-500 text-white rounded-md">Sign Up</button>
					</div>
				</form>
				<p className="pt-4">
					Already have an account?{' '}
					<Link to="/login" className="underline text-blue-600">
						Log in
					</Link>
				</p>
			</div>
		</div>
	)
}
