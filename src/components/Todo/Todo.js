import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, selectTodo } from '../../store/slices/todoSlice';
import TodoItem from '../TodoItems/TodoItem';
import style from './Todo.module.css';

const Todo = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const todo = useSelector(selectTodo);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addTodo({
        date: ref.current[1].value,
        txt: ref.current[0].value,
      })
    );

    console.log(todo);
  };

  return (
    <div className={style.todo_container}>
      <form onSubmit={submitHandler} ref={ref}>
        <input type="text" />
        <input type="date" />
        <button>Add</button>
      </form>
      {todo.map((e) => (
        <TodoItem key={e.id} id={e.id} />
      ))}
    </div>
  );
};

export default Todo;
