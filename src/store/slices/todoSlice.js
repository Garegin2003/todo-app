import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo(state, { payload }) {
      const existingTodo = state.find((e) => e.date === payload.date);
      if (!existingTodo) {
        state.push({
          id: new Date().getTime().toString(),
          date: payload.date,
          text: [
            {
              id: new Date().getTime().toString(),
              txt: payload.txt,
              done: false,
              edit: false,
            },
          ],
        });
      } else {
        existingTodo.text = [
          ...existingTodo.text,
          {
            id: new Date().getTime().toString(),
            txt: payload.txt,
            done: false,
            edit: false,
          },
        ];
      }
    },
    delTodo(state, { payload }) {
      let idx = state.findIndex((e) => e.id === payload.id);
      state[idx].text = state[idx].text.filter((e) => e.id !== payload.txtId);
      return state;
    },
    checkTodo(state, { payload }) {
      let idx = state.findIndex((e) => e.id === payload.id);
      state[idx].text.find((e) => e.id === payload.txtId).done = !state[
        idx
      ].text.find((e) => e.id === payload.txtId).done;
      return state;
    },
    editTodo(state, { payload }) {
      let idx = state.findIndex((e) => e.id === payload.id);
      let idx2 = state[idx].text.findIndex((e) => e.id === payload.txtId);

      if (idx2 !== -1) {
        state[idx].text[idx2].edit = true;
      }

      return state;
    },
    editConfirm(state, { payload }) {
      const { id, txtId, txt } = payload;
      return state.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: todo.text.map((textItem) => {
              if (textItem.id === txtId) {
                return {
                  ...textItem,
                  txt: txt,
                  edit: false,
                };
              }
              return textItem;
            }),
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, delTodo, checkTodo, editTodo, editConfirm } =
  todoSlice.actions;

export const selectTodo = (state) => state.todo;

export const todoReducer = todoSlice.reducer;
