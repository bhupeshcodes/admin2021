import React, { Component, forwardRef } from "react";
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
import { connect } from "react-redux";
import { loadUser } from "../../../Store/Action/Admin/Users/UserAction";
import { db } from "../../../Firebase";

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

class UserTableFragment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: "Block User", field: "blocked", type: "boolean" },
        { title: "E-mail", field: "email" },
        { title: "Phone Number", field: "phoneNumber", editable: "never" },
        { title: "username", field: "username" },
      ],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.loadUser(() => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        <Backdrop
          style={{ zIndex: 1500, color: "#ffffff" }}
          open={this.state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container maxWidth="lg" fixed>
          <MaterialTable
            icons={tableIcons}
            title="Registration Details"
            columns={this.state.columns}
            data={this.props.user}
            options={{
              search: true,
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  if (newData === oldData) {
                    resolve();
                  } else {
                    db.ref("users/" + newData.uid + "/").update(newData);
                    resolve();
                  }
                }),
            }}
          />
        </Container>
      </div>
    );
  }
} 
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (onSuccess, onError) => dispatch(loadUser(onSuccess, onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTableFragment);
