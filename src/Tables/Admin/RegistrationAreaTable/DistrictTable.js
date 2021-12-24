import React, { Component, forwardRef } from "react";
import { styled } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { loadStates } from "../../../Store/Action/Admin/RegistrationArea/StateAction";
import {
  addDistricts,
  loadDistricts,
  updateDistricts,
} from "../../../Store/Action/Admin/RegistrationArea/DistrictAction";
import { firestore } from "../../../Firebase";
import StateForm from "../../../Forms/Admin/RegistrationArea/StateForm";

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

const MyFormControl = styled(FormControl)({
  minWidth: 120,
});

export class DistrictTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: "Districts", field: "title", initialEditValue: "City" },
      ],
      loading: true,
      open: false,
      popup: false,
      reload: true,
      district: "Init",
    };
  }

  handleClickOpen = (open) => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClickPopup = () => {
    this.setState({
      popup: true,
    });
  };

  handleClosePopup = () => {
    this.setState({
      popup: false,
    });
  };

  componentDidMount() {
    this.props.loadStates(
      () => {
        this.setState({ loading: false });
      },
      () => {
        //error
        this.setState({ loading: false });
      }
    );
    this.props.loadDistricts(
      "Init",
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
    const { states } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Container>
          <Backdrop
            style={{ zIndex: 500, color: "#ffffff" }}
            open={this.state.loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Button onClick={this.handleClickOpen}>Select State</Button>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={this.handleClose}
          >
            <DialogTitle>Fill the form</DialogTitle>
            <DialogContent>
              <MyFormControl>
                <InputLabel htmlFor="States">Select State</InputLabel>
                <Select value={states.title} name="States" id="grouped-select">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <ListSubheader>states</ListSubheader>
                  {this.props.states ? (
                    states.map((states) => {
                      return (
                        <MenuItem
                          value={states.title}
                          key={states.title}
                          name="States"
                          onClick={(e) => {
                            if (this.props.district === "") {
                              this.setState({
                                district: states.title,
                              });
                            } else {
                              this.setState({ loading: true });
                              this.props.loadDistricts(
                                states.title,
                                (querySnapshot) => {
                                  if (querySnapshot === true) {
                                    this.setState({
                                      district: states.title,
                                      popup: true,
                                      loading: false,
                                    });
                                  } else {
                                    this.setState({
                                      district: states.title,
                                      loading: false,
                                      open: false,
                                    });
                                  }
                                },
                                () => {
                                  //error
                                  this.setState({ loading: false });
                                },
                                true
                              );
                            }
                          }}
                        >
                          {states.title}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <div className="center">No results Yet</div>
                  )}
                </Select>
              </MyFormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
        <br />
        <br />
        <br />
        <div>
          <div>
            <Container maxWidth="lg" fixed>
              <MaterialTable
                icons={tableIcons}
                title="Districts"
                columns={this.state.columns}
                data={this.props.districts}
                editable={{
                  onRowAdd: (newData, data, newDistrictRef) =>
                    new Promise((resolve) => {
                      if (newData.title) {
                        newDistrictRef = firestore
                          .collection("States")
                          .doc(this.state.district)
                          .collection("Districts")
                          .doc();
                        data = { ...newData, uid: newDistrictRef.id };
                        this.props.addDistricts(
                          this.state.district,
                          data,
                          () => {
                            this.props.loadDistricts(
                              this.state.district,
                              () => resolve(),
                              () => resolve()
                            );
                          },
                          () =>
                            this.props.loadDistricts(
                              this.state.district,
                              () => resolve(),
                              () => resolve()
                            )
                        );
                      }
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      if (newData === oldData) {
                        resolve();
                      } else {
                        this.props.updateDistricts(
                          this.state.district,
                          newData,
                          () =>
                            this.props.loadDistricts(
                              this.state.district,

                              () => resolve(),
                              () => resolve()
                            ),
                          () =>
                            this.props.loadDistricts(
                              this.state.district,
                              () => resolve(),
                              () => resolve()
                            )
                        );
                      }
                    }),
                }}
              />
            </Container>
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.popup}
            onClose={this.handleClosePopup}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <StateForm
                district={this.state.district}
                onClick={this.handleClosePopup}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClosePopup} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    states: state.states,
    districts: state.districts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStates: (onSuccess, onError) =>
      dispatch(loadStates(onSuccess, onError)),
    loadDistricts: (Districts, onSuccess, onError, empty) =>
      dispatch(loadDistricts(Districts, onSuccess, onError, empty)),
    addDistricts: (Districts, data, onSuccess, onError) =>
      dispatch(addDistricts(Districts, data, onSuccess, onError)),
    updateDistricts: (Districts, data, onSuccess, onError) =>
      dispatch(updateDistricts(Districts, data, onSuccess, onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DistrictTable);
