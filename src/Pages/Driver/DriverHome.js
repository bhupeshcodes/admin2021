import React from "react";
import { compose } from "redux";
import { withFirebase } from "../../UsersComponents/Firebase";
import { withAuthorization } from "../../UsersComponents/Session";
import * as ROLES from "../../UsersComponents/constants/roles";
import DriverOrderTable from "../../Tables/Driver/DriverOrderTable";

const DriverHome = () => {
  return (
    <div>
      <DriverOrderTable />
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.DRIVER];
export default compose(withAuthorization(condition), withFirebase)(DriverHome);
