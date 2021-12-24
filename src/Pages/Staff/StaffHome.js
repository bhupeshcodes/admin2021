import React from "react";
import { compose } from "redux";
import { withFirebase } from "../../UsersComponents/Firebase";
import { withAuthorization } from "../../UsersComponents/Session";
import * as ROLES from "../../UsersComponents/constants/roles";
import SubOrderTable from "../../Tables/staff/StaffOrderTable";

const StaffHome = () => {
  return (
    <div>
      <SubOrderTable />
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.STAFF];
export default compose(withAuthorization(condition), withFirebase)(StaffHome);
