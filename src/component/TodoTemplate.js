import React from 'react'
import './scss/TodoTemplate.scss'
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';

const TodoTemplate = () => {
  return (
    <div className='TodoTemplate'>
        <TodoHeader />
        <TodoMain />
        <TodoInput />
    </div>
  )
}

export default TodoTemplate;