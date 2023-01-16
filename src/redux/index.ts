import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import app, { AppState, appActionCreators, AppMiddleware } from './app'
import auth, { AuthState, authActionCreators, AuthMiddleware } from './auth'

export interface RootState {
	auth: AuthState
	app: AppState
}

export const allActionCreators = {
	...authActionCreators,
	...appActionCreators,
}

const persistConfig = {
	key: 'root',
	storage: storageSession,
}

export const connector = connect(
	(state: RootState) => state,
	(dispatch) => ({
		actions: bindActionCreators(allActionCreators, dispatch),
	}),
)

export type PageProps = ConnectedProps<typeof connector> & { params?: any }

export const authMiddleware = AuthMiddleware()
export const appMiddleware = AppMiddleware()

const reducer = combineReducers({
	auth,
	app,
})

export const persistedReducer = persistReducer(persistConfig, reducer)
