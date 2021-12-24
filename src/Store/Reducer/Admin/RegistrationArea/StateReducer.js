const initState = [];

const StateReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_STATES":
      state = action.payload;
      break;
    case "ADD_STATES":
      state = [...state, action.payload];
      break;
    case "UPDATE_STATES":
      let list = [...state];
      let index = state.indexOf(
        list.filter((item) => item.uid === action.payload.uid)[0]
      );
      list[index] = action.payload;
      state = list;
      return state;
    default:
      break;
  }
  return state;
};

export default StateReducer;
