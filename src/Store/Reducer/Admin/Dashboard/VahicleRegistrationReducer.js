const initState = [];

const VahicleRegistrationReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_VAHICLE_REGISTRATION":
      state = action.payload;
      break;
    case "ADD_VAHICLE_REGISTRATION":
      state = [...state, action.payload];
      break;
    case "UPDATE_VAHICLE_REGISTRATION":
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

export default VahicleRegistrationReducer;
