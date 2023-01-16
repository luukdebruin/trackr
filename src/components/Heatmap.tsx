import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useAppSelector } from 'src/redux/hooks'
import { Track } from 'types'
import HeatmapDay from './HeatmapDay'
import TagFilter from './TagFilter'

export default function Heatmap() {
	const tracks = useAppSelector((state) => state.app.tracks)
	const [gridSize, setGridSize] = useState<number>(12)
	const daysByMonths: any[] = []

	function generateCalendar() {
		const currentYear = new Date().getFullYear()
		const startDate = new Date(`01/01/${currentYear}`)
		const endDate = new Date(`12/31/${currentYear}`)
		const monthsInYear = endDate.getMonth() - startDate.getMonth() + 1
		const today = new Date().toISOString().slice(0, 10)
		let currentDate
		// console.log(currentDate.toUTCString())
		let key = 1
		for (let i = 1; i < monthsInYear + 1; i++) {
			const daysForMonth = []
			const daysInMonth = new Date(currentYear, i, 0).getDate()
			for (let j = 1; j < daysInMonth + 1; j++) {
				currentDate = new Date(`${i}/${j}/${currentYear}`)
				const todayCurrentDate = currentDate.getDate() - 1
				console.log(todayCurrentDate)
				// console.log(currentDate.toISOString().split('T')[0], today)
				const isToday = currentDate.toISOString().split('T')[0] === today
				const filteredTracks = tracks.filter((track: Track) => {
					return track.date.toLocaleString() === currentDate.toISOString().split('T')[0]
				})
				daysForMonth.push(<HeatmapDay key={key} date={currentDate} tracks={filteredTracks} isToday={isToday} />)
				key++
			}
			daysByMonths.push(
				<div key={i}>
					<h1 className="font-bold text-5xl py-8 w-full">
						{currentDate.toLocaleDateString('en-EN', { month: 'long' })}
					</h1>
					<div
						className="w-full grid gap-4 auto-rows-max overflow-auto overflow-x-hidden"
						style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
					>
						{daysForMonth}
					</div>
				</div>,
			)
		}
		return daysByMonths
	}

	return (
		<div className="flex flex-col w-full">
			<div className="w-full py-4 flex flex-row justify-between">
				<TagFilter />
				<div className="flex">
					<AiOutlineMinus
						className="mr-4 p-2 bg-indigo-200 rounded text-slate-600 hover:bg-indigo-400 hover:text-slate-200 cursor-pointer ease-in-out duration-200"
						onClick={() => setGridSize(gridSize + 1)}
						size={30}
					/>
					<AiOutlinePlus
						className="p-2 bg-indigo-200 rounded text-slate-600 hover:bg-indigo-400 hover:text-slate-200 cursor-pointer ease-in-out duration-200"
						onClick={() => setGridSize(gridSize - 1)}
						size={30}
					/>
				</div>
			</div>
			<div className="overflow-scroll">
				{/* <div
				className="w-full grid gap-4 auto-rows-max overflow-auto overflow-x-hidden"
				style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
			> */}
				{/* {days.map((day: Day) => (
					<HeatmapDay key={day.key} date={day.date} tracks={day.tracks} isToday={day.isToday} />
				))} */}
				{generateCalendar()}
				{/* </div> */}
			</div>
		</div>
	)
}
