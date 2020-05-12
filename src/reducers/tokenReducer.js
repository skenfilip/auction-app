const tokenReducer = (state = "", action) => {
  if (action.type === "SET_TOKEN") {
    state = action;
  }
  return state;
};

export default tokenReducer;
