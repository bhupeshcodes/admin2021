const initState = [];

const BlockedReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_BLOCKED":
      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default BlockedReducer;
