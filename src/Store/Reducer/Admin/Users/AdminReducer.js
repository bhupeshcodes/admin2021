const initState = [];

const AdminReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_ADMIN":
      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default AdminReducer;
