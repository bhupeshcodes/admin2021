const initState = [];

const OrderDetailUidReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_ORDER_DETAILS_UID":
      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default OrderDetailUidReducer;
