import React from 'react'
import Heatmap from './Heatmap'
import InsertTrack from './InsertTrack'

export default function Dashboard() {
	return (
		<div className="w-full h-screen px-4 relative overflow-hidden">
			<InsertTrack />
			<Heatmap />
		</div>
	)
}
