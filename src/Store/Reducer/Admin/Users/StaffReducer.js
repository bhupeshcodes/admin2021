const initState = [];

const StaffReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_STAFF":
      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default StaffReducer;
