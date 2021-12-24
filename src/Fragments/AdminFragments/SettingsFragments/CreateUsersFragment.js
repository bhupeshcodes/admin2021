import React from "react";
import { compose } from "redux";
import * as ROLES from "../../../UsersComponents/constants/roles";
import { withFirebase } from "../../../UsersComponents/Firebase";
import { withAuthorization } from "../../../UsersComponents/Session";

const CreateUsersFragment = () => {
  return <div>CreateUsersFragment</div>;
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(CreateUsersFragment);
