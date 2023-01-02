import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { useAuth } from 'src/contexts/Auth'
import { supabase } from 'src/database/supabaseClient'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { Track } from 'types'

export default function TrackList() {
	const dispatch = useAppDispatch()
	const { fetchTracks } = bindActionCreators(
		{
			fetchTracks: allActionCreators.fetchTracks,
		},
		dispatch,
	)
	const tracks = useAppSelector((state) => state.app.tracks)

	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		getTracks()
	}, [])

	async function getTracks() {
		try {
			setLoading(true)

			const { data, error } = await supabase.from('tracks').select().eq('user_id', user.id)
			fetchTracks(data)

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div aria-live="polite">
			{loading
				? 'Loading ...'
				: tracks.map((track: Track) => {
						return (
							<div key={track.id}>
								<h1>{track.name}</h1>
								<h1>{track.description}</h1>
								<h1>{track.tag}</h1>
							</div>
						)
				  })}
		</div>
	)
}
