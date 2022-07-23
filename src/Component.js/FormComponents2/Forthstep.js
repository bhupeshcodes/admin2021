import React, { useContext, useEffect } from "react";
import { mainContext } from "../../Contexts/MainContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "date-fns";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import DialogNotice from "../DiologNotice";
import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import StripeCheckout from "react-stripe-checkout";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    position: "relative",
  },
  paper1: {
    position: "relative",
    height: 600,
    width: 380,
    paddingRight: 20,
    paddingBottom: 50,
  },
  paper2: {
    height: 600,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
  closeButton: {
    color: "#f7f7f7",
  },
  formControl: {
    minWidth: 200,
  },
}));

const DialogTitle = (props) => {
  const { children, handlePopupClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={10}>
          <Typography variant="h6">{children}</Typography>
        </Grid>
        <Grid item xs={2}>
          {handlePopupClose ? (
            <IconButton aria-label="close" onClick={handlePopupClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </MuiDialogTitle>
  );
};

const Forthstep = (props) => {
  const classes = useStyles();
  const {
    setStep,
    userData,
    setUserData,
    handlePopupOpen,
    handlePopupClose,
    openPopUp,
    submitData,
    billing,
    setOpenPopUp,
    CleaningType,
    frequency,
    NumberofProfessionals,
    hour,
    Material,
    setBilling,
    time,
    paymentOptions,
    setPaymentOptions,
    email,
    setEmail,
    setDuration,
    duration,
  } = useContext(mainContext);
  const [product, setProduct] = React.useState({
    description: "Here Description",
    price: { billing },
    productBy: "Diola",
    email: email,
  });
  const handleChange = (event) => {
    setPaymentOptions(event.target.value);
    setUserData({ ...userData, paymentOptions: event.target.value });
  };

  const bill1 = 30;
  const bill2 = 30;
  const bill3 = 30;
  const material = 5;

  useEffect(() => {
    if (frequency === "One-time") {
      setDuration(hour * NumberofProfessionals);
      setUserData({
        ...userData,
        Duration: hour * NumberofProfessionals,
      });
    } else if (frequency === "Weekly") {
      setDuration(hour * NumberofProfessionals * 7);
      setUserData({
        ...userData,
        Duration: hour * NumberofProfessionals * 7,
      });
    } else if (frequency === "Montly") {
      setDuration(hour * NumberofProfessionals * 30);
      setUserData({
        ...userData,
        Duration: hour * NumberofProfessionals * 30,
      });
    }

    if (JSON.parse(localStorage.getItem("authUser")) !== null) {
      setUserData({
        ...userData,
        name: JSON.parse(localStorage.getItem("authUser")).fullname,
        phoneNumber: JSON.parse(localStorage.getItem("authUser")).phoneNumber,
        email: JSON.parse(localStorage.getItem("authUser")).email,
      });
      setEmail(JSON.parse(localStorage.getItem("authUser")).email);
    }
    if (CleaningType === "General Cleaning") {
      if (frequency === "One-time") {
        if (hour === 2 || hour === 3) {
          if (Material === "Yes") {
            setBilling(
              bill1 * hour * NumberofProfessionals +
                material * hour * NumberofProfessionals
            );
          } else if (Material === "No") {
            setBilling(bill1 * hour * NumberofProfessionals);
          }
        } else if (
          hour === 4 ||
          hour === 5 ||
          hour === 6 ||
          hour === 7 ||
          hour === 8
        ) {
          if (Material === "Yes") {
            setBilling(
              bill2 * hour * NumberofProfessionals +
                material * hour * NumberofProfessionals
            );
          } else if (Material === "No") {
            setBilling(bill2 * hour * NumberofProfessionals);
          }
        }
      } else if (frequency === "Weekly") {
        if (hour === 2 || hour === 3) {
          if (Material === "Yes") {
            setBilling(
              (bill1 * hour * NumberofProfessionals * 7 +
                material * hour * NumberofProfessionals * 7) *
                (1 - 0.05)
            );
          } else if (Material === "No") {
            setBilling(bill1 * hour * NumberofProfessionals * 7 * (1 - 0.05));
          }
        } else if (
          hour === 4 ||
          hour === 5 ||
          hour === 6 ||
          hour === 7 ||
          hour === 8
        ) {
          if (Material === "Yes") {
            setBilling(
              (bill2 * hour * NumberofProfessionals * 7 +
                material * hour * NumberofProfessionals * 7) *
                (1 - 0.05)
            );
          } else if (Material === "No") {
            setBilling(bill2 * hour * NumberofProfessionals * 7 * (1 - 0.05));
          }
        }
      } else if (frequency === "Montly") {
        if (hour === 2 || hour === 3) {
          if (Material === "Yes") {
            setBilling(
              (bill1 * hour * NumberofProfessionals * 30 +
                material * hour * NumberofProfessionals * 30) *
                (1 - 0.1)
            );
          } else if (Material === "No") {
            setBilling(bill1 * hour * NumberofProfessionals * 30 * (1 - 0.1));
          }
        } else if (
          hour === 4 ||
          hour === 5 ||
          hour === 6 ||
          hour === 7 ||
          hour === 8
        ) {
          if (Material === "Yes") {
            setBilling(
              (bill2 * hour * NumberofProfessionals * 30 +
                material * hour * NumberofProfessionals * 30) *
                (1 - 0.1)
            );
          } else if (Material === "No") {
            setBilling(bill2 * hour * NumberofProfessionals * 30 * (1 - 0.1));
          }
        }
      }
    } else if (CleaningType === "Deep Cleaning") {
      if (frequency === "One-time") {
        if (hour * NumberofProfessionals < 10) {
          if (Material === "Yes") {
            setBilling(
              bill3 * hour * NumberofProfessionals +
                material * hour * NumberofProfessionals
            );
          } else if (Material === "No") {
            setBilling(bill3 * hour * NumberofProfessionals);
          }
        } else {
          if (Material === "Yes") {
            setBilling(
              (bill3 * hour * NumberofProfessionals +
                material * hour * NumberofProfessionals) *
                (1 - 0.05)
            );
          } else if (Material === "No") {
            setBilling(bill3 * hour * NumberofProfessionals * (1 - 0.05));
          }
        }
      }
    }
  }, [setEmail, email]);

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(
      `https://us-central1-diola-4f3ff.cloudfunctions.net/app/payment`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify(body),
      }
    )
      .then(() => {
        submitData();
        setStep(5);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <DialogNotice>Please Select Payment Method type</DialogNotice>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Paper className={classes.paper1} elevation={2}>
                <div>
                  <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>
                    {" "}
                    Payment Details{" "}
                  </h4>

                  <Grid
                    container
                    justify="space-around"
                    style={{
                      paddingRight: 20,
                      paddingLeft: 20,
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      Duration
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      {userData.Duration} Hours
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        textDecoration: "bold",
                      }}
                    >
                      Cost:
                      {CleaningType === "General Cleaning"
                        ? duration <= 3
                          ? "40 AED / Hour"
                          : duration > 3
                          ? "40 AED / Hour"
                          : null
                        : CleaningType === "Deep Cleaning"
                        ? "50 AED / Hour"
                        : null}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      Number of Professionals
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      {userData.NumberofProfessionals}
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      Materail
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      {userData.Material}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        textDecoration: "bold",
                      }}
                    >
                      Cost: 5 AED / Hour
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      Discount:
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      {CleaningType === "General Cleaning"
                        ? frequency === "One-time"
                          ? "25%"
                          : frequency === "Weekly"
                          ? "5%"
                          : frequency === "Montly"
                          ? "10%"
                          : null
                        : "0%"}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      Tax
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      0%
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      Total Amount
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      {billing} AED
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      Payment Method
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 5,
                        paddingLeft: 5,
                        textDecoration: "bold",
                      }}
                    >
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Payment Method type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={paymentOptions}
                          onChange={handleChange}
                          label="Payment Method type"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="OnlinePayment">
                            Online Payment
                          </MenuItem>
                          <MenuItem value="COD">COD</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      position: "fixed",
                      bottom: 0,
                      overflow: "hidden",
                      width: "100%",
                      marginLeft: "-20px",
                      paddingRight: "30px",
                      paddingLeft: "30px",
                      paddingTop: "10px",
                      paddingBottom: "60px",
                      backgroundColor: "#fff",
                      color: "#fff",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid
                        container
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            endIcon={<ArrowDropDownIcon />}
                            onClick={handlePopupOpen}
                          >
                            Booking Details
                          </Button>
                        </Grid>
                        <Grid item xs={5}>
                          <Button
                            style={{ paddingLeft: 50, paddingRight: 50 }}
                            variant="contained"
                            size="large"
                            onClick={() => setStep(3)}
                            color="secoundary"
                          >
                            Prev
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 30 }}>
                          {paymentOptions === "OnlinePayment" ? (
                            <StripeCheckout
                              stripeKey="pk_live_51JMxXLGMoJ7zwz1YbeTWY7K1U3OD797GuIANDaZHbWEwb93wycKvpil6DIh9RG1v6pXG61Rj5X0rhjP7SztOjSlh00ooDBvtiV"
                              token={makePayment}
                              name="Pay Now"
                              amount={billing * 100}
                              email={email}
                              currency="AED"
                            >
                              <Button
                                style={{ paddingLeft: 22, paddingRight: 22 }}
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={() => {
                                  setProduct({
                                    price: billing,
                                  });
                                }}
                              >
                                Pay Now
                              </Button>
                            </StripeCheckout>
                          ) : (
                            <Button
                              style={{ paddingLeft: 62, paddingRight: 62 }}
                              variant="contained"
                              size="large"
                              onClick={() => {
                                if (paymentOptions === "") {
                                  setOpenPopUp(true);
                                } else {
                                  submitData();
                                  setStep(5);
                                }
                              }}
                              color="primary"
                            >
                              Next
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        onClose={handlePopupClose}
        aria-labelledby="customized-dialog-title"
        open={openPopUp}
      >
        <DialogTitle
          id="customized-dialog-title"
          handlePopupClose={handlePopupClose}
        >
          Order Details
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Paper className={classes.paper2} elevation={2}>
                    <div>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "left",
                              paddingTop: 10,
                              paddingBottom: 30,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h6>CITY</h6>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "right",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            <h6>{userData.city}</h6>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <div
                        style={{
                          paddingTop: 5,
                          paddingBottom: 5,
                          paddingRight: 50,
                          paddingLeft: 50,
                        }}
                      >
                        <h6>SERVICE DETAILS</h6>
                      </div>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "left",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h7>Frequency</h7>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "right",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            <h7>{userData.frequency}</h7>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "left",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h7>Duration</h7>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "right",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            <h7>{userData.Duration} Hours</h7>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "left",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h7>Number of Professionals</h7>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "right",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            <h7>{userData.NumberofProfessionals}</h7>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "left",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h7>Material</h7>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "right",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            <h7>{userData.Material}</h7>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={5}
                            style={{
                              textAlign: "left",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h6>DATE</h6>
                          </Grid>
                          <Grid
                            item
                            xs={7}
                            style={{
                              textAlign: "right",
                              paddingTop: 10,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            {userData.date === "2014-08-18 21:11:54" ? (
                              <h7></h7>
                            ) : (
                              <h7>{userData.date.split(" ")[0]}</h7>
                            )}
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid
                            item
                            xs={5}
                            style={{
                              textAlign: "left",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h6>TIME</h6>
                          </Grid>
                          <Grid
                            item
                            xs={7}
                            style={{
                              textAlign: "right",
                              paddingTop: 10,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            {userData.date === "2014-08-18 21:11:54" ? (
                              <h7></h7>
                            ) : (
                              <h7>
                                <h5>{time}</h5>
                              </h7>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "left",
                              paddingTop: 5,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                              textDecoration: "bold",
                            }}
                          >
                            <h6>ADDRESS</h6>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              textAlign: "right",
                              paddingTop: 10,
                              paddingBottom: 5,
                              paddingRight: 50,
                              paddingLeft: 50,
                            }}
                          >
                            <h7>{userData.address}</h7>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withRouter(Forthstep);
