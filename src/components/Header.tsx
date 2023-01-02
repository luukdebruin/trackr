import React from 'react'
import { useHistory } from 'react-router'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { BiWindow, BiUser, BiWrench, BiLogOut } from 'react-icons/bi'

export default function Header() {
	const { signOut } = useAuth()
	const history = useHistory()
	const location = useLocation()

	async function handleSignOut() {
		await signOut()
		history.push('/login')
	}

	const navigation = [
		{
			name: 'Home',
			icon: <BiWindow size={24} />,
			link: '/',
		},
		{
			name: 'Profile',
			icon: <BiUser size={24} />,
			link: '/profile',
		},
		{
			name: 'Settings',
			icon: <BiWrench size={24} />,
			link: '/settings',
		},
	]

	return (
		<div className="h-screen p-2 py-4 flex flex-col justify-between w-full flex-1 bg-slate-200">
			<div>
				{navigation.map((item: any) => {
					return (
						<Link
							to={item.link}
							key={item.name}
							className={`flex p-2 mb-2 rounded-md hover:bg-slate-300 ${
								location.pathname === item.link ? 'bg-slate-300' : ''
							}`}
						>
							<span>{item.icon}</span>
						</Link>
					)
				})}
			</div>
			<div className="flex p-2 rounded-md hover:bg-slate-300" onClick={handleSignOut}>
				<span>
					<BiLogOut size={24} />
				</span>
			</div>
		</div>
	)
}
