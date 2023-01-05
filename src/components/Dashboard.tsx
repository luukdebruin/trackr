import React from 'react'
import Heatmap from './Heatmap'
import InsertTrack from './InsertTrack'

export default function Dashboard() {
	return (
		<div className="w-full h-screen p-4 overflow-hidden relative">
			<InsertTrack />
			<Heatmap />
		</div>
	)
}
