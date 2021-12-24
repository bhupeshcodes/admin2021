const initState = [];

const DriverReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_DRIVER":
      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default DriverReducer;
