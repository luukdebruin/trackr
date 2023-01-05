declare namespace NodeJS {
	interface ProcessEnv {
		//types of envs
		NODE_ENV: 'development' | 'production' | 'test'
		REACT_APP_SUPABASE_URL: string
		REACT_APP_SUPABASE_ANON_KEY: string
		REACT_APP_SUPABASE_SERVICE_ROLE: string
	}
}
