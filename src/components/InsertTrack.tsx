import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from 'react-datepicker'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAuth } from 'src/contexts/Auth'
import { supabase } from 'src/database/supabaseClient'
import { Track } from 'types'

export default function InsertTrack() {
	const dispatch = useAppDispatch()
	const { updateTracks, setActiveTag } = bindActionCreators(
		{
			updateTracks: allActionCreators.updateTracks,
			setActiveTag: allActionCreators.setActiveTag,
		},
		dispatch,
	)
	const activeTag = useAppSelector((state) => state.app.activeTag)

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
		}
	}

	return (
		<div aria-live="polite">
			{loading ? (
				'Saving ...'
			) : (
				<form onSubmit={updateProfile}>
					<div>
						<label htmlFor="trackname">Name</label>
						<input id="trackname" type="text" value={trackName || ''} onChange={(e) => setTrackName(e.target.value)} />
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<input
							id="description"
							type="textarea"
							value={description || ''}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<DatePicker id="date" selected={date} onChange={(newDate) => setDate(newDate)} />
					</div>
					<div>
						<button disabled={loading}>Add Track</button>
					</div>
				</form>
			)}
		</div>
	)
}
