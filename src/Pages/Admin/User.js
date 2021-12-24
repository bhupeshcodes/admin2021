import React, { forwardRef, useEffect, useState } from "react";
import { Container, Backdrop, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import * as ROLES from "../../UsersComponents/constants/roles";
import { withFirebase } from "../../UsersComponents/Firebase";
import { withAuthorization } from "../../UsersComponents/Session";
import { db } from "../../Firebase";
import { compose } from "redux";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const User = () => {
  const columns = [
    { title: "Name", field: "username" },
    { title: "Role", field: "auth" },
    { title: "Phone Number", field: "phoneNumber" },
    { title: "E-mail", field: "email" },
  ];
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.ref("users").on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Backdrop style={{ zIndex: 500, color: "#ffffff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="lg" fixed>
        <MaterialTable
          icons={tableIcons}
          title="All Users"
          columns={columns}
          data={users}
          options={{
            search: true,
          }}
        />
      </Container>
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(withAuthorization(condition), withFirebase)(User);
