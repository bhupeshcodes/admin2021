import React from "react";
import { compose } from "redux";
import BlockedTableFragment from "../../../Tables/Admin/UserTables/BlockedTableFragment";
import * as ROLES from "../../../UsersComponents/constants/roles";
import { withFirebase } from "../../../UsersComponents/Firebase";
import { withAuthorization } from "../../../UsersComponents/Session";

const BlockedUsersFragment = () => {
  return (
    <div>
      <BlockedTableFragment />
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(BlockedUsersFragment);
