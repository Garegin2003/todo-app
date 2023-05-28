import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkTodo,
  delTodo,
  editTodo,
  selectTodo,
  editConfirm,
} from '../../store/slices/todoSlice';
import { useParams, useNavigate } from 'react-router-dom';
import style from './Uniq.module.css';

const Uniq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector(selectTodo);
  const todoItem = todo.find((item) => item.id === id);
  const [editedText, setEditedText] = useState({});
  const [originalText, setOriginalText] = useState({});

  const handleEditToggle = (txtId) => {
    if (!editedText[txtId]) {
      setOriginalText((prevOriginalText) => ({
        ...prevOriginalText,
        [txtId]: todoItem.text.find((item) => item.id === txtId).txt,
      }));
    }
    dispatch(
      editTodo({
        id,
        txtId,
      })
    );
  };

  const confirmHandler = (txtId, txt) => {
    dispatch(
      editConfirm({
        id,
        txtId,
        txt,
      })
    );
    setEditedText((prevEditedText) => ({
      ...prevEditedText,
      [txtId]: '',
    }));
    setOriginalText((prevOriginalText) => ({
      ...prevOriginalText,
      [txtId]: '',
    }));
  };

  const cancelHandler = (txtId) => {
    dispatch(
      editConfirm({
        id,
        txtId,
        txt: originalText[txtId],
      })
    );
    setEditedText((prevEditedText) => ({
      ...prevEditedText,
      [txtId]: '',
    }));
    setOriginalText((prevOriginalText) => ({
      ...prevOriginalText,
      [txtId]: '',
    }));
  };

  const handleDelete = (txtId) => {
    dispatch(
      delTodo({
        id,
        txtId,
      })
    );
  };

  const handleCheckboxChange = (txtId) => {
    dispatch(
      checkTodo({
        id,
        txtId,
      })
    );
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleTextChange = (txtId, txt) => {
    setEditedText((prevEditedText) => ({
      ...prevEditedText,
      [txtId]: txt,
    }));
  };

  return (
    <div className={style.uniq}>
      <div className={style.back}>
        <button onClick={handleBackClick}>Back</button>
        <h1>
          {todoItem.date} ({todoItem.text.length})
        </h1>
      </div>
      <div className={style.todos}>
        {todoItem.text.map((textItem) => (
          <div key={textItem.id}>
            <input
              onChange={() => handleCheckboxChange(textItem.id)}
              type="checkbox"
            />
            <h1
              contentEditable={textItem.edit}
              style={{ color: textItem.done ? 'grey' : '#4848db' }}
              onBlur={(e) =>
                handleTextChange(textItem.id, e.target.textContent)
              }
              suppressContentEditableWarning={true}
            >
              {textItem.edit
                ? editedText[textItem.id] || textItem.txt
                : textItem.txt}
            </h1>
            <p
              onClick={() =>
                textItem.edit
                  ? confirmHandler(textItem.id, editedText[textItem.id])
                  : handleEditToggle(textItem.id)
              }
            >
              {textItem.edit ? 'Confirm' : 'Edit'}
            </p>
            <p
              onClick={() =>
                textItem.edit
                  ? cancelHandler(textItem.id)
                  : handleDelete(textItem.id)
              }
            >
              {textItem.edit ? 'Cancel' : 'Delete'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uniq;
