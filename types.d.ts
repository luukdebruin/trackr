export interface Track {
	id: string
	user_id: string
	created_at: Date
	date: Date
	name: string
	description: string
	tag: string
}

export type Tracks = Track[]

export interface Tag {
	id: string
	user_id: string
	created_at: Date
	name: string
	color: string
}

export type Tags = Tag[]

export interface Day {
	key: number
	date: Date
	tracks: Tracks
	isToday: boolean
}

export type Days = Day[]
