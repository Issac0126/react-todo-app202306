import React, { useState, useEffect } from 'react'
import './scss/TodoTemplate.scss'
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';
import { API_BASE_URL as BASE, TODO } from '../../config/host-config';

const TodoTemplate = () => {

  // 서버에 할일 목록(json)을 요청(fetch)해서 받아와야 한다.
  const API_BASE_URL = BASE + TODO;

  // 원래는 fetch로 가져와야하지만 지금은 가져왔다는 가정으로 작업한다.
  // todos 배열의 상태 관리
  const [todos, setTodos] = useState([]);
  

  /*
  // id값 시퀀스 생성 함수
  const makeNewId = () => {
    return todos.length === 0 ? 1 : todos[todos.length-1].id+1;
  }
  */

  // todoInput에게 todoText를 받아오는 함수
  // 자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달할 때는
  // props 사용이 불가능하다.
  // 부모 컴포넌트에서 함수를 선언 (매개변수 꼭 선언하기!) -> props로 함수를 전달
  // 자식 컴포넌트에서 전달받은 함수를 호출하면서 매개값으로 데이터를 전달한다.
  const addTodo = todoText => {
    const newTodo = {
      title: todoText
    }

    // 리액트의 상태변수는 setter를 통한 변경만 렌더링에 적용된다.
    // 다만, 상태변수가 불변성(immutable)을 가지기 때문에 
    // 기존 상태에서 변경은 불가능하고, 새로운 상태를 만들어서 변경해야 한다.
    // setTodos(todos.concat([newTodo]));

    fetch(API_BASE_URL, {
      method : 'POST',
      headers : { 'content-type' : 'application/json'},
      body : JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(json =>  setTodos(json.todos) )
      // setTodos([...todos, newTodo]) 원래는 새 배열 만들어서 추가해줬지만 json이 와서 필요없어짐!

  }


  // 할 일 삭제 처리 함수
  const removeTodo = id => {
    console.log("삭제 요청 url: "+API_BASE_URL+"/"+id);
    
    fetch(API_BASE_URL+"/"+id, { method : "DELETE"})
      .then(res => res.json())
      .then(json => {
        setTodos(json.todos);
      })

    /*
      # .filter( ?? =? ~~~ )
      주어진 배열의 값들을 순회하여 조건에 맞는 요소들만 모아
      새로운 배열로 리턴해 주는 함수
      setTodos(todos.filter(todo => todo.id !== id ));
    */
  }


  // 할 일 체크 처리 함수
  const checkTodo = (id, done) => {

    //맵이 대신 복사본을 만들어 반복문을 돌려준다.
    fetch(API_BASE_URL, { 
      method : 'PUT', 
      headers : { 'content-type' : 'application/json' },
      body : JSON.stringify({
        'done': !done,
        'id': id
      })
    })
      .then(res => res.json())
      .then(json => setTodos(json.todos) );

    // 아래는 fetch 이전에 사용하던 공식
    // setTodos(todos.map( todo => todo.id === id ? {...todo, done: !todo.done} : todo));
  }


  //할 일 n개 세기 함수
  const countRestTodo = () => todos.filter(todo => !todo.done).length;

  
  // todos에 변화가 있으면 재렌더링을 한다.
  useEffect(() => { 
      console.log(API_BASE_URL);

      //페이지가 렌더링 됨과 동시에 할 일 목록을 요청해서 뿌려주겠다.
      fetch(API_BASE_URL)
        .then(res => res.json())
        .then(json => {
          console.log(json.todos);

          //fetch를 통해 받아온 데이터를 상태 변수에 넣기
          setTodos(json.todos);
        });

   }, [])



  return (
    <div className='TodoTemplate'>
        <TodoHeader count={countRestTodo} />
        <TodoMain todoList={todos} remove={removeTodo} check={checkTodo}/>
        <TodoInput addTodo={ addTodo }/>
    </div>
  )
}

export default TodoTemplate;