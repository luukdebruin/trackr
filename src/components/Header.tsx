import React from 'react'
import { useHistory } from 'react-router'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { ImQuotesLeft, ImCog } from 'react-icons/im'
import { IoLogOut, IoAddOutline } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'

export default function Header() {
	const { signOut } = useAuth()
	const history = useHistory()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const { toggleInsertTrackModel } = bindActionCreators(
		{
			toggleInsertTrackModel: allActionCreators.toggleInsertTrackModel,
		},
		dispatch,
	)
	const insertTrackModel = useAppSelector((state) => state.app.insertTrackModel)

	async function handleSignOut() {
		await signOut()
		history.push('/login')
	}

	const navigation = [
		{
			name: 'Home',
			icon: <ImQuotesLeft size={24} />,
			link: '/',
		},
		{
			name: 'Settings',
			icon: <ImCog size={24} />,
			link: '/settings',
		},
	]

	return (
		<div className="h-screen p-2 py-4 flex flex-col justify-between w-full flex-1 bg-slate-200">
			<div>
				<div
					className="flex p-2 rounded-md hover:bg-slate-300 cursor-pointer"
					onClick={() => toggleInsertTrackModel(!insertTrackModel)}
				>
					<span>
						<IoAddOutline size={24} />
					</span>
				</div>
				<div className="h-[1px] bg-slate-400 my-2"></div>
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
			</div>
			<div className="flex p-2 rounded-md hover:bg-slate-300 cursor-pointer" onClick={handleSignOut}>
				<span>
					<IoLogOut size={24} />
				</span>
			</div>
		</div>
	)
}
