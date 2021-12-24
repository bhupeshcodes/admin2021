import React, { Component, forwardRef } from "react";
import {
  Container,
  Backdrop,
  CircularProgress,
  IconButton,
  Grid,
  Button,
  TextField,
  Paper,
  Slide,
  Divider,
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
import { loadSubOrder } from "../../Store/Action/SubAdmin/SubOrderAction";

import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { mainContext } from "../../Contexts/MainContext";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import WorkIcon from '@material-ui/icons/Work';

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

class StaffOrderTable extends Component {
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
      open: false,
      dialogData: [],
      selectedDate: new Date(),
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
    this.props.loadSubOrder(
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
    const { setStep } = this.context;
    const { dialogData } = this.state;
    return (
      <div style={{ width: "100vw" }}>
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
          <AppBar style={{ backgroundColor: "#3C4B64" }}>
            <Toolbar>
              <Grid container>
                <Grid item xs={4} style={{ textAlign: "left", width: "100vw" }}>
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
          <Grid
            container
            style={{
              flexGrow: 1,
              width: "80%",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "120px",
            }}
            spacing={2}
            justify="center"
          >
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        <h2>Update Completion Date</h2>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "20px",
                          display: "flex",
                          "& > *": {
                            margin: "10px",
                          },
                        }}
                      ></div>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 50 }}>
                      <h1>Driver's Name: {dialogData.Driver}</h1>
                    </Grid>
                  </Grid>
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
        <Container maxWidth="lg" fixed>
          <MaterialTable
            icons={tableIcons}
            title=""
            columns={this.state.columns}
            data={this.props.suborder}
            options={{
              search: true,
            }}
            actions={[
              {
                icon: () => <WorkIcon />,

                tooltip: "Order Details",
                onClick: (event, rowData) => {
                  this.handleClickOpen();
                  this.setState({ dialogData: { ...rowData } });
                },
              },
            ]}
          />
        </Container>
      </div>
    );
  }
}

StaffOrderTable.contextType = mainContext;

const mapStateToProps = (state) => {
  return {
    suborder: state.suborder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSubOrder: (onSuccess, onError) =>
      dispatch(loadSubOrder(onSuccess, onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffOrderTable);
