import React from 'react'
import Header from './Header'
import InsertTag from './InsertTag'
import InsertTrack from './InsertTrack'
import TagList from './TagList'
import TrackList from './TrackList'

export default function Dashboard() {
	return (
		<div className="px-4">
			<Header />
			<div className="w-full flex">
				<InsertTrack />
				<TrackList />
				<InsertTag />
				<TagList />
			</div>
		</div>
	)
}
