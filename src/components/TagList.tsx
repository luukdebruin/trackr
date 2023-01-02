import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAuth } from 'src/contexts/Auth'
import { supabase } from 'src/database/supabaseClient'
import { Tag } from 'types'

export default function TagList() {
	const dispatch = useAppDispatch()
	const { fetchTags, setActiveTag } = bindActionCreators(
		{
			fetchTags: allActionCreators.fetchTags,
			setActiveTag: allActionCreators.setActiveTag,
		},
		dispatch,
	)

	const tags = useAppSelector((state) => state.app.tags)
	const activeTag = useAppSelector((state) => state.app.activeTag)

	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		getTags()
	}, [])

	async function getTags() {
		try {
			setLoading(true)

			const { data, error } = await supabase.from('tags').select().eq('user_id', user.id)
			fetchTags(data)

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div aria-live="polite">
			{loading
				? 'Loading ...'
				: tags.map((tag: Tag) => {
						return (
							<div
								className={`${tag === activeTag ? 'bg-slate-500' : 'bg-slate-100'}`}
								key={tag.id}
								onClick={() => setActiveTag(tag)}
							>
								<h1>{tag.name}</h1>
								<h1>{tag.color}</h1>
							</div>
						)
				  })}
		</div>
	)
}
