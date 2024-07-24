import React from 'react'

const Todo = ({ todo, index, onDelete, onUpdate }) => {
	return (
		<tr className="bg-white border-b ">
			<th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${todo.isCompleted ? 'line-through' : ''}`}>
				{index + 1}
			</th>
			<td className={`px-6 py-4 ${todo.isCompleted ? 'line-through' : ''}`}>
				{todo.title}
			</td>
			<td className={`px-6 py-4 ${todo.isCompleted ? 'line-through' : ''}`}>
				{todo.description}
			</td>
			<td className='px-6 py-4'>
				{todo.isCompleted ? 'Completed' : 'Pending'}
			</td>
			<td className="px-6 py-4 flex gap-2">
				<button className='py-2 px-4 bg-red-500 text-white rounded-sm' onClick={() => onDelete(todo._id)}>Delete</button>
				{
					todo.isCompleted
						? null
						: <button className='py-2 px-4 bg-green-500 text-white rounded-sm' onClick={() => onUpdate(todo._id)}>Done</button>
				}
			</td>
		</tr>
	)
}

export default Todo