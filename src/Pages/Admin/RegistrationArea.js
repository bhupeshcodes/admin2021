import React from "react";
import { compose } from "redux";
import StateTable from "../../Tables/Admin/RegistrationAreaTable/StateTable";
import { withFirebase } from "../../UsersComponents/Firebase";
import { withAuthorization } from "../../UsersComponents/Session";
import * as ROLES from "../../UsersComponents/constants/roles";

const RegistrationArea = () => {
  return (
    <div>
      <StateTable />
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(RegistrationArea);
