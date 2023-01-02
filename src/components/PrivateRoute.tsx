import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function PrivateRoute({ component: Component, ...rest }: any) {
	const { user } = useAuth()

	return (
		<Route
			{...rest}
			render={(props) => {
				return user ? <Component {...props} /> : <Redirect to="/login" />
			}}
		></Route>
	)
}
