const initState = [];

const OrderDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_ORDER_DETAILS":
      const result = action.payload; 
      state = [...state, ...result];
      break;
    default:
      break;
  }
  return state;
};

export default OrderDetailReducer;
