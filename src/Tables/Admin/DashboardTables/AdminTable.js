import React, { Component, forwardRef } from "react";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Grid,
  Button,
  Slide,
  Divider,
  TextField,
} from "@material-ui/core";
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
import { loadOrder } from "../../../Store/Action/Admin/Dashboard/OrderAction";

import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { mainContext } from "../../../Contexts/MainContext";
import AutocompleteWrapper1 from "../../../Component.js/FormComponents/Autocomplete1";
import { firestore } from "../../../Firebase";
import { loadOrderDetails } from "../../../Store/Action/Admin/Dashboard/OrderDetailsAction";
import DriverAutocompleteWrapper from "../../../Component.js/FormComponents/DriverAutocomplete";
import AutocompleteWrapper2 from "../../../Component.js/FormComponents/Autocomplete2";
import AutocompleteWrapper3 from "../../../Component.js/FormComponents/Autocomplete3";
import AutocompleteWrapper4 from "../../../Component.js/FormComponents/Autocomplete4";
import AutocompleteWrapper5 from "../../../Component.js/FormComponents/Autocomplete5";
import LocationDialog1 from "../../../Component.js/Dialog/LocationDialog1";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
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

class AdminTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: "RefID", field: "uid" },
        { title: "Customer Name", field: "name" },
        { title: "Duration", field: "Duration" },
        { title: "Material", field: "Material" },
        { title: "Number of Professionals", field: "NumberofProfessionals" },
        { title: "city", field: "city" },
        { title: "Frequency", field: "frequency" },
        { title: "Amount", field: "Amount" },
      ],
      loading: true,
      open: false,
      rejectMsg: "",
      dialogData: [],
      AssignTask: [],
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  componentDidMount() {
    this.props.loadOrder(
      () => {
        this.setState({ loading: false });
      },
      () => {
        //error
        this.setState({ loading: false });
      }
    );
    this.props.loadOrderDetails(
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
    const { setStep, staff1, staff2, staff3, staff4, staff5, Driver } =
      this.context;
    const { dialogData } = this.state;
    const { orderDetails } = this.props;

    return (
      <div>
        <Backdrop
          style={{ zIndex: 500, color: "#ffffff" }}
          open={this.state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.Transition}
          style={{ backgroundColor: "#f7f7f7", width: "100vw" }}
        >
          <AppBar
            style={{
              position: "relative",
              width: "100vw",
              backgroundColor: "#3C4B64",
            }}
          >
            <Toolbar>
              <Grid container>
                <Grid item xs={4} style={{ textAlign: "left" }}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => {
                      this.handleClose();
                      setStep(1);
                    }}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ textAlign: "center", paddingTop: 10 }}
                >
                  <Typography variant="h6">Order Details</Typography>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}></Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {this.state.dialogData.status === "pending" ? (
            <Grid
              container
              style={{
                width: "100%",
                height: "100%",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3>Do you want to accept this Job</h3>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                  onClick={(data) => {
                    data = {
                      ...this.state.dialogData,
                      status: "active",
                    };
                    firestore
                      .collection("order")
                      .doc(data.uid)
                      .update(data)
                      .then(() => {
                        this.handleClose();
                        this.props.loadOrder(
                          () => {
                            this.setState({ loading: false });
                          },
                          () => {
                            //error
                            this.setState({ loading: false });
                          }
                        );
                        this.props.loadOrderDetails(
                          () => {
                            this.setState({ loading: false });
                          },
                          () => {
                            //error
                            this.setState({ loading: false });
                          }
                        );
                      })
                      .catch(() => {
                        console.log("error");
                      });
                  }}
                >
                  Accept
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                  onClick={(data) => {
                    data = {
                      ...this.state.dialogData,
                      status: "rejected",
                    };
                    firestore
                      .collection("order")
                      .doc(data.uid)
                      .update(data)
                      .then(() => {
                        this.handleClose();
                        this.props.loadOrder(
                          () => {
                            this.setState({ loading: false });
                          },
                          () => {
                            //error
                            this.setState({ loading: false });
                          }
                        );
                        this.props.loadOrderDetails(
                          () => {
                            this.setState({ loading: false });
                          },
                          () => {
                            //error
                            this.setState({ loading: false });
                          }
                        );
                      })
                      .catch(() => {
                        console.log("error");
                      });
                  }}
                >
                  Reject
                </Button>
              </Grid>
            </Grid>
          ) : null}
          <Grid
            container
            style={{
              flexGrow: 1,
              width: "80vw",
              hight: "100%",
              marginLeft: "50px",
            }}
            spacing={2}
            justify="center"
          >
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  {this.state.dialogData.status === "pending" ? null : this
                      .state.dialogData.status === "active" ? (
                    <div>
                      <Grid container>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                          <h2>Assigned Staff</h2>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              style={{
                                marginTop: "20px",
                              }}
                            >
                              {this.state.dialogData.NumberofProfessionals ===
                              1 ? (
                                <AutocompleteWrapper1
                                  value={dialogData}
                                  AssignTask={orderDetails}
                                />
                              ) : null}
                              {this.state.dialogData.NumberofProfessionals ===
                              2 ? (
                                <>
                                  <AutocompleteWrapper1
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper2
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                </>
                              ) : null}
                              {this.state.dialogData.NumberofProfessionals ===
                              3 ? (
                                <>
                                  <AutocompleteWrapper1
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper2
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper3
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                </>
                              ) : null}
                              {this.state.dialogData.NumberofProfessionals ===
                              4 ? (
                                <>
                                  <AutocompleteWrapper1
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper2
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper3
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper4
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                </>
                              ) : null}
                              {this.state.dialogData.NumberofProfessionals ===
                              5 ? (
                                <>
                                  <AutocompleteWrapper1
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper2
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper3
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper4
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                  <AutocompleteWrapper5
                                    value={dialogData}
                                    AssignTask={orderDetails}
                                  />
                                </>
                              ) : null}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <h2>Assign Driver</h2>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          <DriverAutocompleteWrapper
                            value={dialogData}
                            AssignTask={orderDetails}
                          />
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={10}>
                          <div
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            <Grid container>
                              <Grid item xs={6}></Grid>
                              {this.state.dialogData.status !== "pending" ? (
                                <Grid item xs={6}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                      paddingLeft: "50px",
                                      paddingRight: "50px",
                                      paddingBottom: "10px",
                                      paddingTop: "10px",
                                    }}
                                    onClick={(data) => {
                                      data = {
                                        ...this.state.dialogData,
                                        Assinged: true,
                                        staff1: staff1.username,
                                        staff2: staff2.username,
                                        staff3: staff3.username,
                                        staff4: staff4.username,
                                        staff5: staff5.username,
                                        Driver: Driver.username,
                                      };
                                      firestore
                                        .collection("order")
                                        .doc(data.uid)
                                        .update(data)
                                        .then(() => {
                                          this.handleClose();
                                          this.props.loadOrder(
                                            () => {
                                              this.setState({ loading: false });
                                            },
                                            () => {
                                              //error
                                              this.setState({ loading: false });
                                            }
                                          );
                                          this.props.loadOrderDetails(
                                            () => {
                                              this.setState({ loading: false });
                                            },
                                            () => {
                                              //error
                                              this.setState({ loading: false });
                                            }
                                          );
                                        })
                                        .catch(() => {
                                          console.log("error");
                                        });
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </Grid>
                              ) : (
                                <Grid item xs={6}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                      paddingLeft: "50px",
                                      paddingRight: "50px",
                                      paddingBottom: "10px",
                                      paddingTop: "10px",
                                    }}
                                    disabled={true}
                                  >
                                    Save Changes
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ) : this.state.dialogData.status === "rejected" ? (
                    <div
                      style={{
                        paddingTop: "40px",
                        paddingBottom: "40px",
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                          }}
                        >
                          <h3>Enter a message for the client</h3>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} style={{ marginLeft: 100 }}>
                          <TextField
                            id="outlined-multiline-static"
                            label="Rejection Message"
                            multiline
                            fullWidth
                            rows={4}
                            value={this.state.rejectMsg}
                            onChange={(event) => {
                              this.setState({ rejectMsg: event.target.value });
                            }}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={10}>
                          <div
                            style={{
                              width: "100%",
                              marginTop: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            <Grid container>
                              <Grid item xs={6}></Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{
                                    paddingLeft: "50px",
                                    paddingRight: "50px",
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                  }}
                                  onClick={(data) => {
                                    data = {
                                      ...this.state.dialogData,
                                      rejectMsg: this.state.rejectMsg,
                                      rejected: true,
                                    };
                                    firestore
                                      .collection("order")
                                      .doc(data.uid)
                                      .update(data)
                                      .then(() => {
                                        this.handleClose();
                                        this.props.loadOrder(
                                          () => {
                                            this.setState({ loading: false });
                                          },
                                          () => {
                                            //error
                                            this.setState({ loading: false });
                                          }
                                        );
                                        this.props.loadOrderDetails(
                                          () => {
                                            this.setState({ loading: false });
                                          },
                                          () => {
                                            //error
                                            this.setState({ loading: false });
                                          }
                                        );
                                      })
                                      .catch(() => {
                                        console.log("error");
                                      });
                                  }}
                                >
                                  Save Changes
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <h3
                style={{
                  color: "#333D47",
                  paddingLeft: "50px",
                  paddingTop: "30px",
                }}
              >
                Payment Details
              </h3>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid
                  item
                  xs={3}
                  style={{
                    textAlign: "left",
                    marginBottom: -5,
                    paddingRight: 50,
                    paddingLeft: 50,
                    color: "#8CA0B3",
                  }}
                >
                  <h4>Amount</h4>
                </Grid>
                <Grid
                  item
                  xs={9}
                  style={{
                    marginBottom: -5,
                    paddingRight: 50,
                    paddingLeft: 50,
                    color: "#333D47",
                  }}
                >
                  <h4>{dialogData.Amount}</h4>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid
                  item
                  xs={3}
                  style={{
                    textAlign: "left",
                    marginBottom: -5,
                    paddingRight: 50,
                    paddingLeft: 50,
                    color: "#8CA0B3",
                  }}
                >
                  <h4>Payment Options:</h4>
                </Grid>
                <Grid
                  item
                  xs={9}
                  style={{
                    marginBottom: -5,
                    paddingRight: 50,
                    paddingLeft: 50,
                    color: "#333D47",
                  }}
                >
                  <h4>{dialogData.paymentOptions}</h4>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Grid item xs={12}>
                  <h3
                    style={{
                      color: "#333D47",
                      paddingLeft: "50px",
                      paddingTop: "30px",
                    }}
                  >
                    Order Summary
                  </h3>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Ref ID:</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.uid}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Name:</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.name}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Phone Number:</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.phoneNumber}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Email:</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.email}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <div
                  style={{
                    marginTop: -5,
                    marginBottom: -5,
                    paddingRight: 50,
                    paddingLeft: 50,
                  }}
                >
                  <h3 style={{ fontWeight: "600", color: "#333D47" }}>
                    SERVICE DETAILS
                  </h3>
                </div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Cleaning Type</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.CleaningType}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Frequency</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.frequency}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Duration</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.Duration}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Number of Professionals</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.NumberofProfessionals}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Material</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.Material}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Payment Options</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.paymentOptions}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Instructions (Optional)</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.instructions}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>DATE</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.date}</h4>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>TIME</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      {dialogData.date === "2014-08-18 21:11:54" ? (
                        <h4>Select Time</h4>
                      ) : (
                        <h4>{dialogData.time}</h4>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>ADDRESS</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.address}</h4>
                      <a
                        href={`http://maps.google.com/maps?&z=15&mrt=loc&t=m&q=${dialogData.latitude}+${dialogData.longitude}`}
                        target="_blank"
                      >
                        Click here to see location{" "}
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4> Area/Street No. (Optional)</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.address1}</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#8CA0B3",
                      }}
                    >
                      <h4>Villa/Flat No. (Optional)</h4>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      style={{
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        color: "#333D47",
                      }}
                    >
                      <h4>{dialogData.address2}</h4>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Dialog>
        <MaterialTable
          icons={tableIcons}
          title=""
          columns={this.state.columns}
          data={this.props.order}
          options={{
            search: true,
          }}
          actions={[
            {
              icon: () => <AssignmentIndIcon />,

              tooltip: "Assign Job",
              onClick: (event, rowData) => {
                this.handleClickOpen();
                this.setState({ dialogData: { ...rowData } });
              },
            },
          ]}
        />
      </div>
    );
  }
}

AdminTable.contextType = mainContext;

const mapStateToProps = (state) => {
  return {
    order: state.order,
    orderDetails: state.orderDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrder: (onSuccess, onError) => dispatch(loadOrder(onSuccess, onError)),
    loadOrderDetails: (onSuccess, onError) =>
      dispatch(loadOrderDetails(onSuccess, onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);
