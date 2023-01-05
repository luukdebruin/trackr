import { User } from '@supabase/supabase-js'
import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { supabase } from 'src/database/supabaseClient'
import { Tag, Tags, Track, Tracks } from 'types'
import { allActionCreators, RootState } from './index'
import store from './store'

export interface AppState {
	tracks: Tracks
	tags: Tags
	activeTag: Tag
	user: User
	insertTrackModel: boolean
}

const initialState: AppState = {
	tracks: [],
	tags: [],
	activeTag: undefined,
	user: undefined,
	insertTrackModel: false,
}

export enum AppTypeKeys {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	SET_TRACKS = 'SET_TRACKS',
	UPDATE_TRACKS = 'UPDATE_TRACKS',
	SET_TAGS = 'SET_TAGS',
	UPDATE_TAGS = 'UPDATE_TAGS',
	SET_ACTIVE_TAG = 'SET_ACTIVE_TAG',
	TOGGLE_INSERT_TRACK_MODEL = 'TOGGLE_INSERT_TRACK_MODEL',
}

export interface LoginAction extends Action {
	type: AppTypeKeys.LOGIN
	user: User
}

export interface LogoutAction extends Action {
	type: AppTypeKeys.LOGOUT
}

export interface LoginSuccessAction extends Action {
	type: AppTypeKeys.LOGIN_SUCCESS
	user: User
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

export type AppActionTypes =
	| LoginAction
	| LogoutAction
	| LoginSuccessAction
	| SetTracksAction
	| UpdateTracksAction
	| SetTagsAction
	| UpdateTagsAction
	| SetActiveTag
	| ToggleInsertTrackModel

export const appActionCreators = {
	login(user: User): LoginAction {
		return {
			type: AppTypeKeys.LOGIN,
			user,
		}
	},
	logout(): LogoutAction {
		return {
			type: AppTypeKeys.LOGOUT,
		}
	},
	loginSuccess(user: User): LoginSuccessAction {
		return {
			type: AppTypeKeys.LOGIN_SUCCESS,
			user,
		}
	},
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
}

export type AppActionCreators = typeof appActionCreators

export default function AppReducer(state = initialState, action: AppActionTypes) {
	switch (action.type) {
		case AppTypeKeys.LOGIN:
			return {
				...state,
				user: action.user,
			}
		case AppTypeKeys.LOGOUT:
			return {
				...state,
				tracks: [],
				tags: [],
				activeTag: undefined,
				user: undefined,
			}
		case AppTypeKeys.LOGIN_SUCCESS:
			return {
				...state,
			}
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
		default:
			return state
	}
}

export function AppMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		next(action)
		const state = store.getState()
		switch (action.type) {
			case AppTypeKeys.LOGIN: {
				store.dispatch(allActionCreators.loginSuccess(action.user))
				return
			}
			case AppTypeKeys.LOGIN_SUCCESS: {
				try {
					const { data, error } = await supabase.from('tracks').select().eq('user_id', action.user.id)
					store.dispatch(allActionCreators.setTracks(data))
					if (error) {
						throw error
					}
				} catch (error) {
					alert(error.message)
				}
				try {
					const { data, error } = await supabase.from('tags').select().eq('user_id', action.user.id)
					store.dispatch(allActionCreators.setTags(data))

					if (error) {
						throw error
					}
				} catch (error) {
					alert(error.message)
				}
				return
			}
			case AppTypeKeys.UPDATE_TRACKS: {
				store.dispatch(allActionCreators.setTracks(state.app.tracks))
			}
		}
	}
}
