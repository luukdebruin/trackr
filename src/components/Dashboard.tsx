import React from 'react'
import InsertTrack from './InsertTrack'
import TrackList from './TrackList'

export default function Dashboard() {
	return (
		<div className="w-full flex p-4">
			<InsertTrack />
			<TrackList />
		</div>
	)
}
