import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import Header from './Header'

export function PrivateRoute({ component: Component, ...rest }: any) {
	const { user } = useAuth()

	return (
		<Route
			{...rest}
			render={(props) => {
				return user ? (
					<div className="flex flex-row overflow-hidden">
						<Header />
						<Component {...props} />
					</div>
				) : (
					<Redirect to="/login" />
				)
			}}
		></Route>
	)
}
