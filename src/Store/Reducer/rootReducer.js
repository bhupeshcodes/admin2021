import { combineReducers } from "redux";
import CompleteOrderReducer from "./Admin/Dashboard/CompleteOrderReducer";
import OrderDetailsReducer from "./Admin/Dashboard/OrderDetailsReducer";
import OrderReducer from "./Admin/Dashboard/OrderReducer";
import RejectedOrderReducer from "./Admin/Dashboard/RejectedOrderReducer";
import AdminReducer from "./Admin/Users/AdminReducer";
import BlockedReducer from "./Admin/Users/BlockedReducer";
import DriverReducer from "./Admin/Users/DriverReducer";
import StaffReducer from "./Admin/Users/StaffReducer";
import UserReducer from "./Admin/Users/UserReducer";
import SubCompleteOrderReducer from "./SubAdmin/SubCompleteOrderReducer";
import SubOrderReducer from "./SubAdmin/SubOrderReducer";
import OrderDetailReducer from "./User/OrderDetailReducer";
import OrderDetailUidReducer from "./User/OrderDetailUidReducer";

const DEFAULT_REDUCER = (initstate, action) => {
  return {
    key: "hello World",
  };
};

const rootReducer = combineReducers({
  DEFAULT: DEFAULT_REDUCER,
  order: OrderReducer,
  orderDetail: OrderDetailsReducer,
  completeOrder: CompleteOrderReducer,
  RejectedOrder: RejectedOrderReducer,
  suborder: SubOrderReducer,
  subcompleteOrder: SubCompleteOrderReducer,
  user: UserReducer,
  admin: AdminReducer,
  staff: StaffReducer,
  driver: DriverReducer,
  blocked: BlockedReducer,
  orderDetails: OrderDetailReducer,
  orderDetailsUid: OrderDetailUidReducer,
});

export default rootReducer;
