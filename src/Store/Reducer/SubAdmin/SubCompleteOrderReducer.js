const initState = [];

const SubCompleteOrderReducer = (state = initState, action) => {
  switch (action.type) {
      case "LOAD_SUBCOMPLETEORDER":
      state = action.payload;
      break;
    case "ADD_ORDER":
      state = [...state, action.payload];
      break;
    case "UPDATE_ORDER":
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

export default SubCompleteOrderReducer;
