import React from 'react'
import './scss/TodoTemplate.scss'
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';

const TodoTemplate = () => {

  // 서버에 할일 목록(json)을 요청(fetch)해서 받아와야 한다.
  // 원래는 fetch로 가져와야하지만 지금은 가져왔다는 가정으로 작업하낟.
  const todos =[
    { id: 1,
      title: '아침 산책하기',
      done: false
    },
    { id: 2,
      title: '토마토 물 주기',
      done: true
    },
    { id: 3,
      title: '주간 신문 읽기',
      done: false
    },
    { id: 4,
      title: '오리한테 토마토 주기',
      done: false
    },
  ]


  return (
    <div className='TodoTemplate'>
        <TodoHeader />
        <TodoMain todoList={todos} />
        <TodoInput />
    </div>
  )
}

export default TodoTemplate;