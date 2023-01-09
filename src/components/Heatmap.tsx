import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useAppSelector } from 'src/redux/hooks'
import { Track } from 'types'
import HeatmapDay from './HeatmapDay'
import TagFilter from './TagFilter'

export default function Heatmap() {
	const tracks = useAppSelector((state) => state.app.tracks)
	const [gridSize, setGridSize] = useState<number>(15)

	function generateDays() {
		const days = []
		const currentYear = new Date().getFullYear()
		const startDate = new Date(`01/01/${currentYear}`)
		const endDate = new Date(`12/31/${currentYear}`)
		const today = new Date().toISOString().slice(0, 10)
		let loop = new Date(startDate)
		let key = 1
		while (loop <= endDate) {
			const loopDate = loop.toISOString().split('T')[0]
			const filteredTracks = tracks.filter((track: Track) => {
				return track.date.toLocaleString() === loop.toISOString().split('T')[0]
			})
			days.push(<HeatmapDay key={key} date={loop} tracks={filteredTracks} today={loopDate === today} />)
			const newDate = loop.setDate(loop.getDate() + 1)
			key++
			loop = new Date(newDate)
		}
		return days
	}

	return (
		<div className="flex flex-col w-full">
			<div className="w-full pb-4 pt-2 flex flex-row justify-between">
				<TagFilter />
				<div className="flex">
					<AiOutlineMinus
						className="mr-4 p-2 bg-indigo-200 rounded text-slate-600 hover:bg-indigo-400 hover:text-slate-200 cursor-pointer"
						onClick={() => setGridSize(gridSize + 1)}
						size={30}
					/>
					<AiOutlinePlus
						className="p-2 bg-indigo-200 rounded text-slate-600 hover:bg-indigo-400 hover:text-slate-200 cursor-pointer"
						onClick={() => setGridSize(gridSize - 1)}
						size={30}
					/>
				</div>
			</div>
			<div
				className="w-full grid gap-4 auto-rows-max overflow-scroll"
				style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
			>
				{generateDays()}
			</div>
		</div>
	)
}
