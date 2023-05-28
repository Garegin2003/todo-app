import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodo } from '../../store/slices/todoSlice';
import { useNavigate } from 'react-router-dom';

const TodoItem = (props) => {
  const todo = useSelector(selectTodo);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/' + props.id);
  };

  return (
    <div>
      <h1 onClick={clickHandler}>
        {todo.find((e) => e.id === props.id).date}(
        {todo.find((e) => e.id === props.id).text.length})
      </h1>
    </div>
  );
};

export default TodoItem;
