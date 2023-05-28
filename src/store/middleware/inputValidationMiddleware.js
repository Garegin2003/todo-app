const inputValidationMiddleware = (store) => (next) => (action) => {
  if (action.type === 'todo/addTodo') {
    const { payload } = action;

    if (payload.date.trim() === '' || payload.txt.trim() === '') return;
  }

  return next(action);
};

export default inputValidationMiddleware;
