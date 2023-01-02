import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../redux/hooks'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAuth } from 'src/contexts/Auth'
import { supabase } from 'src/database/supabaseClient'
import { Tag } from 'types'

export default function InsertTag() {
	const dispatch = useAppDispatch()
	const { updateTags } = bindActionCreators(
		{
			updateTags: allActionCreators.updateTags,
		},
		dispatch,
	)

	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>(false)
	const [tagName, setTagName] = useState<string>(null)
	const [color, setTagColor] = useState<string>(null)

	const addTag = async (e) => {
		e.preventDefault()

		const tag: Tag = {
			id: uuidv4(),
			user_id: user.id,
			created_at: new Date(),
			name: tagName,
			color: color,
		}

		try {
			setLoading(true)

			const { error } = await supabase.from('tags').insert(tag)

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setTagName(null)
			setTagColor(null)
			setLoading(false)
			updateTags(tag)
		}
	}

	return (
		<div className="p-4 bg-slate-600 rounded absolute">
			<div>
				<label htmlFor="tagname">Name</label>
				<input id="tagname" type="text" value={tagName || ''} onChange={(e) => setTagName(e.target.value)} />
			</div>
			<div>
				<label htmlFor="color">color</label>
				<input id="color" type="textarea" value={color || ''} onChange={(e) => setTagColor(e.target.value)} />
			</div>
			<div>
				<button disabled={loading} onClick={(e) => addTag(e)}>
					Add Tag
				</button>
			</div>
		</div>
	)
}
