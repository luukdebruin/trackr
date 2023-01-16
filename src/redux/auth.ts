import { User } from '@supabase/supabase-js'
import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { supabase } from 'src/database/supabaseClient'
import { RootState, allActionCreators } from './index'
import AppReducer from './app'
import store from './store'

export interface AuthState {
	user: User
}

const initialState: AuthState = {
	user: undefined,
}

export enum AuthTypeKeys {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
}

export interface LoginAction extends Action {
	type: AuthTypeKeys.LOGIN
	user: User
}

export interface LogoutAction extends Action {
	type: AuthTypeKeys.LOGOUT
}

export type AuthActionTypes = LoginAction | LogoutAction

export const authActionCreators = {
	login(user: User): LoginAction {
		return {
			type: AuthTypeKeys.LOGIN,
			user,
		}
	},
	logout(): LogoutAction {
		return {
			type: AuthTypeKeys.LOGOUT,
		}
	},
}

export type AuthActionCreators = typeof authActionCreators

export default function AuthReducer(state = initialState, action: AuthActionTypes) {
	switch (action.type) {
		case AuthTypeKeys.LOGIN:
			return {
				...state,
				user: action.user,
			}
		case AuthTypeKeys.LOGOUT:
			return {
				user: undefined,
			}
		default:
			return state
	}
}

export function AuthMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		next(action)
		switch (action.type) {
			case AuthTypeKeys.LOGIN: {
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
					store.dispatch(allActionCreators.setTagCategories(data))

					if (error) {
						throw error
					}
				} catch (error) {
					alert(error.message)
				}
				return
			}
			case AuthTypeKeys.LOGOUT: {
				return AppReducer(undefined, action)
			}
		}
	}
}
