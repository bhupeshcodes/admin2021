import React from "react";
import UserTableFragment from "../../../Tables/Admin/UserTables/UserTableFragment";
import { withFirebase } from "../../../UsersComponents/Firebase";
import { withAuthorization } from "../../../UsersComponents/Session";
import { compose } from "redux";
import * as ROLES from "../../../UsersComponents/constants/roles";

const UserFragment = () => {

  return (
    <div>
      <UserTableFragment />
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(UserFragment);
