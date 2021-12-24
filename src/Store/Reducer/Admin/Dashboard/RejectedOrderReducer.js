const initState = [];

const RejectedOrderReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_ORDER_REJECCTED":
      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default RejectedOrderReducer;
