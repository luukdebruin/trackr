import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { bindActionCreators } from 'redux'
import { BiPlus } from 'react-icons/bi'
import { allActionCreators } from 'src/redux'
import { useAuth } from 'src/contexts/Auth'
import { supabase } from 'src/database/supabaseClient'
import { Tag } from 'types'
import InsertTag from './InsertTag'

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
	const [openTag, setOpenTag] = useState<boolean>(false)

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
		<div className="flex flex-wrap">
			{loading
				? 'Loading ...'
				: tags.map((tag: Tag) => {
						return (
							<div
								className={`text-white rounded px-2 mr-1 w-fit cursor-pointer hover:opacity-100 ${
									tag === activeTag ? 'opacity-100' : 'opacity-50'
								}`}
								style={{ backgroundColor: tag.color }}
								key={tag.id}
								onClick={() => setActiveTag(tag)}
							>
								<h1>{tag.name}</h1>
							</div>
						)
				  })}
			<div className="relative">
				<div
					className="flex justify-center item-center text-white rounded px-2 py-1 w-fit cursor-pointer bg-slate-400 hover:bg-slate-500"
					onClick={() => setOpenTag(true)}
				>
					<BiPlus size={16} />
				</div>
				{openTag && <InsertTag />}
			</div>
		</div>
	)
}
