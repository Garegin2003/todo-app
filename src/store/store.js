import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './slices/todoSlice';
import inputValidationMiddleware from './middleware/inputValidationMiddleware';
import emptyTextMiddleware from './middleware/emptyTextMiddleware';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), inputValidationMiddleware, emptyTextMiddleware];
  },
});

export default store;
