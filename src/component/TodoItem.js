import React from 'react'
import './scss/TodoItem.scss'
import { MdDone } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

const TodoItem = () => {
  return (
    <li className='todo-list-item'>
      <div className="check-circle"> <MdDone /> </div>
      <span className='text'>할 일~~</span>
      <div className="remove"> <IoMdTrash /> </div>
    </li>
  )
}

export default TodoItem;