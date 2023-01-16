import React from 'react'
import { useAppSelector } from 'src/redux/hooks'
import { Tag, Tracks } from 'types'

interface HeatmapDayProps {
	date: Date
	tracks: Tracks
	isToday: boolean
}

export default function HeatmapDay({ date, tracks, isToday }: HeatmapDayProps) {
	const tags = useAppSelector((state) => state.app.tags)
	return (
		<div className={`${isToday ? 'bg-slate-400' : 'bg-slate-200'} aspect-square rounded overflow-hidden p-4`}>
			<div className="flex flex-col items-center justify-between h-full">
				<div className="flex flex-col items-center">
					<p>{date.toLocaleDateString('en-EN', { weekday: 'short' })}</p>
					<h2 className="font-bold text-5xl">{date.getDate()}</h2>
				</div>
				<div
					className="flex
					"
				>
					{tracks.map((track) => {
						const trackTag: Tag = tags.find((tag) => tag.name === track.tag)
						return (
							<div
								key={track.id}
								className="p-2 m-1 inline-block rounded-full w-fit"
								style={{ backgroundColor: `${trackTag ? `#${trackTag.color}` : 'transparent'}` }}
							></div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
