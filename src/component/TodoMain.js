import React from 'react'
import TodoItem from './TodoItem';
import './scss/TodoMain.scss'

// props가 아닌 todoList 바로 받아오기. = props.todoList로 
const TodoMain = ({todoList}) => {

  console.log(todoList);

  return (
    <ul className='todo-list'>
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
    </ul>
  )
}

export default TodoMain;