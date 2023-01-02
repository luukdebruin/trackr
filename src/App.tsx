import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { AuthProvider } from './contexts/Auth'
import { PrivateRoute } from './components/PrivateRoute'

export default function App() {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<PrivateRoute exact path="/" component={Dashboard} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
				</Switch>
			</AuthProvider>
		</Router>
	)
}
