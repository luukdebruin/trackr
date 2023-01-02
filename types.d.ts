import { RandomUUIDOptions } from "crypto";

interface Track {
    id: string
    user_id: string
    created_at: Date
    date: Date
    name: string
    description: string
    tag: string
}

type Tracks = Track[]

interface Tag {
    id: string
    user_id: string
    created_at: Date
    name: string
    color: string
}

type Tags = Tag[]

