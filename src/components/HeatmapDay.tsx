import React from 'react'
import { useAppSelector } from 'src/redux/hooks'
import { Tag, Tracks } from 'types'

interface HeatmapDayProps {
	date: Date
	tracks: Tracks
	today: boolean
}

export default function HeatmapDay({ tracks, today }: HeatmapDayProps) {
	const tags = useAppSelector((state) => state.app.tags)
	return (
		<div className={`${today ? 'bg-slate-400' : 'bg-slate-200'} aspect-square rounded overflow-hidden`}>
			{tracks.map((track) => {
				const trackTag: Tag = tags.find((tag) => tag.name === track.tag)
				return (
					<div
						key={track.id}
						className="p-2 inline-block rounded-full"
						style={{ backgroundColor: `${trackTag ? `#${trackTag.color}` : 'transparent'}` }}
					></div>
				)
			})}
		</div>
	)
}
