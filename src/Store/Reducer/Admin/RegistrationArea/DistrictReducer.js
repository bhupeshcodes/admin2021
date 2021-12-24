const initState = [];

const DistrictsReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_DISTRICTS":
      state = action.payload;
      break;
    case "ADD_DISTRICTS":
      state = [...state, action.payload];
      break;
    case "UPDATE_DISTRICTS":
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

export default DistrictsReducer;
