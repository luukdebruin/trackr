import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { Tag, Tags, Track, Tracks } from 'types'
import { RootState } from './index'

export interface AppState {
	tracks: Tracks
	tags: Tags
	activeTag: Tag
}

const initialState: AppState = {
	tracks: [],
	tags: [],
	activeTag: undefined,
}

export enum AppTypeKeys {
	FETCH_TRACKS = 'FETCH_TRACKS',
	UPDATE_TRACKS = 'UPDATE_TRACKS',
	FETCH_TAGS = 'FETCH_TAGS',
	UPDATE_TAGS = 'UPDATE_TAGS',
	SET_ACTIVE_TAG = 'SET_ACTIVE_TAG',
}

export interface FetchTracksAction extends Action {
	type: AppTypeKeys.FETCH_TRACKS
	tracks: Tracks
}

export interface UpdateTracksAction extends Action {
	type: AppTypeKeys.UPDATE_TRACKS
	track: Track
}

export interface FetchTagsAction extends Action {
	type: AppTypeKeys.FETCH_TAGS
	tags: Tags
}

export interface UpdateTagsAction extends Action {
	type: AppTypeKeys.UPDATE_TAGS
	tag: Tag
}

export interface SetActiveTag extends Action {
	type: AppTypeKeys.SET_ACTIVE_TAG
	tag: Tag
}

export type AppActionTypes = UpdateTracksAction | FetchTracksAction | FetchTagsAction | UpdateTagsAction | SetActiveTag

export const appActionCreators = {
	fetchTracks(tracks: Tracks): FetchTracksAction {
		return {
			type: AppTypeKeys.FETCH_TRACKS,
			tracks,
		}
	},
	updateTracks(track: Track): UpdateTracksAction {
		return {
			type: AppTypeKeys.UPDATE_TRACKS,
			track,
		}
	},
	fetchTags(tags: Tags): FetchTagsAction {
		return {
			type: AppTypeKeys.FETCH_TAGS,
			tags,
		}
	},
	updateTags(tag: Tag): UpdateTagsAction {
		return {
			type: AppTypeKeys.UPDATE_TAGS,
			tag,
		}
	},
	setActiveTag(tag: Tag): SetActiveTag {
		return {
			type: AppTypeKeys.SET_ACTIVE_TAG,
			tag,
		}
	},
}

export type AppActionCreators = typeof appActionCreators

export default function AppReducer(state = initialState, action: AppActionTypes) {
	switch (action.type) {
		case AppTypeKeys.FETCH_TRACKS:
			return {
				...state,
				tracks: action.tracks,
			}
		case AppTypeKeys.UPDATE_TRACKS:
			return {
				...state,
				tracks: [...state.tracks, action.track],
			}
		case AppTypeKeys.FETCH_TAGS:
			return {
				...state,
				tags: action.tags,
			}
		case AppTypeKeys.UPDATE_TAGS:
			return {
				...state,
				tags: [...state.tags, action.tag],
			}
		case AppTypeKeys.SET_ACTIVE_TAG:
			return {
				...state,
				activeTag: action.tag,
			}
		default:
			return state
	}
}

export function AppMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		// const prevState = store.getState()
		next(action)
		// const state = store.getState()
		// switch (action.type) {

		// }
	}
}
