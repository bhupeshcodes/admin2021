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
import { loadSubCompleteOrder } from "../../Store/Action/SubAdmin/SubCompleteOrderAction";

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

class StaffCompleteOrderTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: "Duration", field: "Duration" },
        { title: "Customer Name", field: "name" },
        { title: "Material", field: "Material" },
        { title: "Number of Professionals", field: "NumberofProfessionals" },
        { title: "city", field: "city" },
        { title: "Frequency", field: "frequency" },
        { title: "Amount", field: "Amount" },
        { title: "Area/Street No.", field: "address1" },
        { title: "Villa/Flat No.", field: "address2" },
        { title: "Address", field: "address" },
        { title: "Instructions", field: "instructions" },
      ],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.loadSubCompleteOrder(
      () => {
        this.setState({ loading: false });
      },
      () => {
        //error
        this.setState({ loading: false });
      }
    );
  }
  render() {
    return (
      <div>
        <Backdrop
          style={{ zIndex: 500, color: "#ffffff" }}
          open={this.state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container maxWidth="lg" fixed>
          <MaterialTable
            icons={tableIcons}
            title=""
            columns={this.state.columns}
            data={this.props.subcompleteOrder}
            options={{
              search: true,
            }}
          />
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subcompleteOrder: state.subcompleteOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSubCompleteOrder: (onSuccess, onError) => dispatch(loadSubCompleteOrder(onSuccess, onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffCompleteOrderTable);
