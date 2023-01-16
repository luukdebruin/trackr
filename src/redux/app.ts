import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { Tag, Tags, Track, Tracks } from 'types'
import { RootState } from './index'
// import store from './store'

export interface AppState {
	tracks: Tracks
	tags: Tags
	activeTag: Tag
	insertTrackModel: boolean
	tagCategories: Tags
}

const initialState: AppState = {
	tracks: [],
	tags: [],
	activeTag: undefined,
	insertTrackModel: false,
	tagCategories: [],
}

export enum AppTypeKeys {
	SET_TRACKS = 'SET_TRACKS',
	UPDATE_TRACKS = 'UPDATE_TRACKS',
	SET_TAGS = 'SET_TAGS',
	UPDATE_TAGS = 'UPDATE_TAGS',
	SET_ACTIVE_TAG = 'SET_ACTIVE_TAG',
	TOGGLE_INSERT_TRACK_MODEL = 'TOGGLE_INSERT_TRACK_MODEL',
	SET_TAG_CATEGORIES = 'SET_TAG_CATEGORIES',
}

export interface SetTracksAction extends Action {
	type: AppTypeKeys.SET_TRACKS
	tracks: Tracks
}

export interface UpdateTracksAction extends Action {
	type: AppTypeKeys.UPDATE_TRACKS
	track: Track
}

export interface SetTagsAction extends Action {
	type: AppTypeKeys.SET_TAGS
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

export interface ToggleInsertTrackModel extends Action {
	type: AppTypeKeys.TOGGLE_INSERT_TRACK_MODEL
	insertTrackModel: boolean
}

export interface SetTagCategories extends Action {
	type: AppTypeKeys.SET_TAG_CATEGORIES
	tagCategories: Tags
}

export type AppActionTypes =
	| SetTracksAction
	| UpdateTracksAction
	| SetTagsAction
	| UpdateTagsAction
	| SetActiveTag
	| ToggleInsertTrackModel
	| SetTagCategories

export const appActionCreators = {
	setTracks(tracks: Tracks): SetTracksAction {
		return {
			type: AppTypeKeys.SET_TRACKS,
			tracks,
		}
	},
	updateTracks(track: Track): UpdateTracksAction {
		return {
			type: AppTypeKeys.UPDATE_TRACKS,
			track,
		}
	},
	setTags(tags: Tags): SetTagsAction {
		return {
			type: AppTypeKeys.SET_TAGS,
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
	toggleInsertTrackModel(insertTrackModel: boolean): ToggleInsertTrackModel {
		return {
			type: AppTypeKeys.TOGGLE_INSERT_TRACK_MODEL,
			insertTrackModel,
		}
	},
	setTagCategories(tagCategories: Tags): SetTagCategories {
		return {
			type: AppTypeKeys.SET_TAG_CATEGORIES,
			tagCategories,
		}
	},
}

export type AppActionCreators = typeof appActionCreators

export default function AppReducer(state = initialState, action: AppActionTypes) {
	switch (action.type) {
		case AppTypeKeys.SET_TRACKS:
			return {
				...state,
				tracks: action.tracks,
			}
		case AppTypeKeys.UPDATE_TRACKS:
			return {
				...state,
				tracks: [...state.tracks, action.track],
			}
		case AppTypeKeys.SET_TAGS:
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
		case AppTypeKeys.TOGGLE_INSERT_TRACK_MODEL:
			return {
				...state,
				insertTrackModel: action.insertTrackModel,
			}
		case AppTypeKeys.SET_TAG_CATEGORIES:
			return {
				...state,
				tagCategories: action.tagCategories,
			}
		default:
			return state
	}
}

export function AppMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		next(action)
		// const state = store.getState()
		// switch (action.type) {
		// 	case AppTypeKeys.UPDATE_TRACKS: {
		// 		store.dispatch(allActionCreators.setTracks(state.app.tracks))
		// 	}
		// }
	}
}
