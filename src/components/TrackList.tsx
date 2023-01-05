import React from 'react'
import { useAppSelector } from 'src/redux/hooks'
import { Track } from 'types'

export default function TrackList() {
	const tracks = useAppSelector((state) => state.app.tracks)

	return (
		<div className="mt-4 p-8 bg-slate-300 h-fit rounded-xl">
			{tracks.map((track: Track) => {
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
