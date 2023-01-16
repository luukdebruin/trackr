import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { bindActionCreators } from 'redux'
import { BiPlus } from 'react-icons/bi'
import { allActionCreators } from 'src/redux'
import { Tag } from 'types'

export default function TagList() {
	const dispatch = useAppDispatch()
	const { setActiveTag } = bindActionCreators(
		{
			setActiveTag: allActionCreators.setActiveTag,
		},
		dispatch,
	)

	const tags = useAppSelector((state) => state.app.tags)
	const activeTag = useAppSelector((state) => state.app.activeTag)
	const [insertTag, setInsertTag] = useState<boolean>(false)
	const [newTag, setNewTag] = useState<string>('')

	function createTag() {
		setInsertTag(false)
	}

	return (
		<div>
			<div className="flex flex-wrap">
				{tags.map((tag: Tag) => {
					return (
						<div
							className={`text-white rounded px-2 mr-1 mb-1 w-fit cursor-pointer hover:opacity-100 ${
								tag === activeTag ? 'opacity-100' : 'opacity-50'
							}`}
							style={{ backgroundColor: `#${tag.color}` }}
							key={tag.id}
							onClick={() => setActiveTag(tag)}
						>
							<h1>{tag.name}</h1>
						</div>
					)
				})}
			</div>
			<div>
				<div className="flex justify-center item-center text-white rounded px-2 w-fit cursor-pointer bg-slate-400 hover:bg-slate-500">
					{insertTag ? (
						<div className="flex flex-row items-center" onClick={() => createTag()}>
							<div className="flex flex-row items-center mr-2">
								<BiPlus className="py-1 mr-2" size={24} />
								<p className="text-gray-100">Create</p>
							</div>
							<input
								autoFocus
								id="tag"
								size={10}
								type="text"
								value={newTag}
								className="appearance-none text-gray-100 leading-tight focus:outline-none bg-transparent"
								placeholder="Tag"
								onChange={(e) => setNewTag(e.target.value)}
								onKeyDown={(e) => {
									if (e.keyCode === 13) {
										createTag()
									}
								}}
							/>
						</div>
					) : (
						<BiPlus className="py-1" size={24} onClick={() => setInsertTag(true)} />
					)}
				</div>
			</div>
		</div>
	)
}
