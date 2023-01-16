import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from 'react-datepicker'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { bindActionCreators } from 'redux'
import { IoAddOutline } from 'react-icons/io5'
import { allActionCreators } from 'src/redux'
import { useAuth } from 'src/contexts/Auth'
import { supabase } from 'src/database/supabaseClient'
import { Track } from 'types'
import TagList from './TagList'

export default function InsertTrack() {
	const dispatch = useAppDispatch()
	const { updateTracks, setActiveTag, toggleInsertTrackModel } = bindActionCreators(
		{
			updateTracks: allActionCreators.updateTracks,
			setActiveTag: allActionCreators.setActiveTag,
			toggleInsertTrackModel: allActionCreators.toggleInsertTrackModel,
		},
		dispatch,
	)
	const activeTag = useAppSelector((state) => state.app.activeTag)
	const insertTrackModel = useAppSelector((state) => state.app.insertTrackModel)

	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>(false)
	const [trackName, setTrackName] = useState<string>(null)
	const [description, setDescription] = useState<string>(null)
	const [date, setDate] = useState(new Date())

	const updateProfile = async (e) => {
		e.preventDefault()

		const track: Track = {
			id: uuidv4(),
			user_id: user.id,
			created_at: new Date(),
			date: date,
			name: trackName,
			description: description,
			tag: activeTag.name,
		}

		try {
			setLoading(true)

			const { error } = await supabase.from('tracks').insert(track)

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setTrackName(null)
			setDescription(null)
			setLoading(false)
			updateTracks(track)
			setActiveTag(undefined)
			toggleInsertTrackModel(false)
		}
	}

	if (!insertTrackModel) {
		return
	}

	return (
		<div className="p-8 bg-slate-300 h-fit rounded-xl absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] sm:min-w-[60vw] lg:min-w-[40vw] xl:min-w-[30vw]">
			<div className="w-full flex items-center justify-between pb-4">
				<h2 className="text-xl bold">New Track</h2>
				<div className="cursor-pointer p-2 rounded-md hover:bg-slate-200 ease-in-out duration-200">
					<IoAddOutline
						size={24}
						style={{ transform: 'rotate(45deg)' }}
						onClick={() => toggleInsertTrackModel(false)}
					/>
				</div>
			</div>
			<form onSubmit={updateProfile}>
				<div className="flex flex-col pb-2">
					<label htmlFor="trackname">Name</label>
					<input
						autoFocus
						id="trackname"
						type="text"
						value={trackName || ''}
						className="appearance-none rounded-md w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Name"
						onChange={(e) => setTrackName(e.target.value)}
					/>
				</div>
				<div className="flex flex-col py-2">
					<label htmlFor="description">Description</label>
					<input
						id="description"
						type="textarea"
						value={description || ''}
						className="appearance-none rounded-md w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Description"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="flex flex-col py-2">
					<label htmlFor="date">Date</label>
					<DatePicker
						id="date"
						className="appearance-none rounded-md w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						selected={date}
						onChange={(newDate) => setDate(newDate)}
					/>
				</div>
				<div className="flex flex-col py-2">
					<label htmlFor="date" className="mb-1">
						Tag
					</label>
					<TagList />
				</div>
				<div>
					<button
						className={`py-2 px-4 mt-4 bg-indigo-500 hover:bg-indigo-600 ease-in-out duration-200 text-white rounded-md ${
							loading ? 'opacity-50' : 'opacity-100'
						}`}
						disabled={loading}
					>
						Add Track
					</button>
				</div>
			</form>
		</div>
	)
}
