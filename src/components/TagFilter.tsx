import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { Tag, Tags } from 'types'

export default function TagFilter() {
	const dispatch = useAppDispatch()
	const { setTagCategories } = bindActionCreators(
		{
			setTagCategories: allActionCreators.setTagCategories,
		},
		dispatch,
	)

	const tags = useAppSelector((state) => state.app.tags)
	const tagCategories = useAppSelector((state) => state.app.tagCategories)

	function handleTag(tag: Tag) {
		const tagIndex = tagCategories.indexOf(tag)
		if (tagIndex > -1) {
			const newArray: Tags = tagCategories.filter((category) => category !== tag)
			setTagCategories(newArray)
		} else {
			const newArray: Tags = [...tagCategories, tag]
			setTagCategories(newArray)
		}
	}

	return (
		<div className="flex flex-wrap">
			{tags.map((tag: Tag) => {
				return (
					<div
						className={`text-white rounded px-2 mr-1 mb-1 w-fit cursor-pointer ${
							tagCategories.indexOf(tag) > -1 ? 'opacity-100' : 'opacity-50'
						}`}
						style={{ backgroundColor: `#${tag.color}` }}
						key={tag.id}
						onClick={() => handleTag(tag)}
					>
						<h1>{tag.name}</h1>
					</div>
				)
			})}
		</div>
	)
}
