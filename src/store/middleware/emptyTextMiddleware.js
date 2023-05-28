const emptyTextMiddleware = (store) => (next) => (action) => {
  if (action.type === 'todo/editConfirm') {
    const { txt } = action.payload;
    if (txt.trim() === '') {
      return;
    }
  }
  return next(action);
};

export default emptyTextMiddleware;
