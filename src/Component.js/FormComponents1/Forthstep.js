import React, { useContext, useEffect } from "react";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "date-fns";
import DialogNotice from "../DiologNotice";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import StripeCheckout from "react-stripe-checkout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper1: {
    position: "relative",
    height: 600,
    width: 600,
    paddingTop: 3,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 30,
  },
  paper2: {
    height: 600,
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const Forthstep = () => {
  const classes = useStyles();
  const {
    setStep,
    userData,
    submitData,
    billing,
    setUserData,
    setOpenPopUp,
    CleaningType,
    frequency,
    NumberofProfessionals,
    hour,
    setHour,
    Material,
    setBilling,
    time,
    setTime,
    email,
    setEmail,
    paymentOptions,
    setPaymentOptions,
    setDuration,
    duration,
  } = useContext(mainContext);
  const [product, setProduct] = React.useState({
    description: "Here Description",
    price: billing,
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
        if (duration <= 3) {
          if (Material === "Yes") {
            setBilling(
              bill1 * hour * NumberofProfessionals +
                material * hour * NumberofProfessionals
            );
            console.log("<4");
          } else if (Material === "No") {
            setBilling(bill1 * hour * NumberofProfessionals);
          }
        } else if (duration > 3) {
          if (Material === "Yes") {
            setBilling(
              bill2 * hour * NumberofProfessionals +
                material * hour * NumberofProfessionals
            );
            console.log(">3");
          } else if (Material === "No") {
            setBilling(bill2 * hour * NumberofProfessionals);
            console.log(">3");
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
        if (duration <= 10) {
          if (Material === "Yes") {
            setBilling(
              bill3 * hour * NumberofProfessionals +
                material * hour * NumberofProfessionals
            );
          } else if (Material === "No") {
            setBilling(bill3 * hour * NumberofProfessionals);
          }
        } else if (duration > 10) {
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
  }, [setEmail, email, duration]);

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
  const date = userData.date;

  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <DialogNotice>Please Select Payment Method type</DialogNotice>
      <Grid item xs={6}>
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper1} elevation={2}>
              <div>
                <h3 style={{ fontWeight: "600", color: "#333D47" }}>
                  {" "}
                  Payment Details{" "}
                </h3>

                <Grid container justify="space-around">
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                      Duration
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h4 style={{ fontWeight: "500", color: "#333D47" }}>
                      {userData.Duration} Hours
                    </h4>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h4 style={{ fontWeight: "500", color: "#333D47" }}>
                      Cost:{" "}
                      {CleaningType === "General Cleaning"
                        ? duration <= 3
                          ? "40 AED / Hour"
                          : duration > 3
                          ? "40 AED / Hour"
                          : null
                        : CleaningType === "Deep Cleaning"
                        ? "50 AED / Hour"
                        : null}
                    </h4>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                      Number of Professionals
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#333D47" }}>
                      {userData.NumberofProfessionals}
                    </h3>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                      Materail
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#333D47" }}>
                      {userData.Material}
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h4 style={{ fontWeight: "500", color: "#333D47" }}>
                      Cost: 05 AED / Hour
                    </h4>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                      Discount:
                    </h3>
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#333D47" }}>
                      {CleaningType === "General Cleaning"
                        ? frequency === "One-time"
                          ? "25%"
                          : frequency === "Weekly"
                          ? "5%"
                          : frequency === "Montly"
                          ? "10%"
                          : null
                        : "0%"}
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#8CA0B3" }}>Tax</h3>
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#333D47" }}>0%</h3>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                      Total Amount
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 50,
                      textDecoration: "bold",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#333D47" }}>
                      {billing} AED
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: "left",
                      paddingRight: 50,
                      textDecoration: "bold",
                      paddingTop: "15px",
                    }}
                  >
                    <h3 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                      Payment Method
                    </h3>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: "left",
                      paddingLeft: 20,
                      textDecoration: "bold",
                    }}
                  >
                    <FormControl
                      variant="standard"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Select Payment type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
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
                <Divider style={{ marginTop: 40 }} light />
                <div
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    width: "80%",
                  }}
                >
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          style={{ paddingLeft: 50, paddingRight: 50 }}
                          variant="contained"
                          size="large"
                          onClick={() => {
                            setStep(1);
                            setTime("");
                            setHour(2);
                          }}
                        >
                          Previous
                        </Button>
                        <span></span>
                      </Grid>
                      <Grid item xs={6} style={{ paddingLeft: 120 }}>
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
      <Grid item xs={4}>
        <Grid container justify="center">
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        CITY
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.city}</h5>
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
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "200", color: "#8CA0B3" }}>
                        Cleaning Type
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.CleaningType}
                      </h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Frequency
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.frequency}</h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Duration
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.Duration} Hours
                      </h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={8}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Number of Professionals
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.NumberofProfessionals}
                      </h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Material
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.Material}</h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Date
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      {userData.date === "2014-08-18 21:11:54" ? (
                        <h5 style={{ color: "#333D47" }}>Select a date</h5>
                      ) : (
                        <h5 style={{ color: "#333D47" }}>{date}</h5>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      xs={5}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Time
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      {userData.date === "2014-08-18 21:11:54" ? (
                        <h5></h5>
                      ) : (
                        <h5>{userData.time}</h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Address
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.address}</h5>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Forthstep;
