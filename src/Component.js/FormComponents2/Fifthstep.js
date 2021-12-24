import React, { useContext } from "react";
import { Button, Divider } from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "date-fns";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper1: {
    height: 600,
    width: 700,
    paddingTop: 50,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 80,
  },
  paper2: {
    position: "relative",
    height: 850,
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

const Fifthstep = (props) => {
  const classes = useStyles();
  const { setStep, userData, billing, time, paymentOptions, uid } =
    useContext(mainContext);

  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper2} elevation={2}>
              <div>
                <Grid item xs={12}>
                  <h4 style={{ paddingLeft: "50px", paddingTop: "30px" }}>
                    Order Summary
                  </h4>
                </Grid>
                <Grid item xs={12}>
                  <h1 style={{ paddingLeft: "50px", paddingTop: "10px" }}>
                    Total Price: {billing} AED
                  </h1>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft: "50px" }}>
                  Ref ID:{uid}
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
                  <h4>SERVICE DETAILS</h4>
                </div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>Cleaning Type</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5>{userData.CleaningType}</h5>
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
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>Frequency</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5>{userData.frequency}</h5>
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
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>Duration</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5>{userData.Duration} Hours</h5>
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
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>Number of Professionals</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5>{userData.NumberofProfessionals}</h5>
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
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>Material</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5>{userData.Material}</h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginLeft: "20px" }}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 30,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>Payment Options</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5>{paymentOptions}</h5>
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
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>DATE</h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      {userData.date === "2014-08-18 21:11:54" ? (
                        <h5></h5>
                      ) : (
                        <h5>{userData.date.split(" ")[0]}</h5>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      xs={5}
                      style={{
                        textAlign: "left",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>TIME</h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
                        marginTop: 10,
                        marginBottom: 5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      {userData.date === "2014-08-18 21:11:54" ? (
                        <h5></h5>
                      ) : (
                        <h5>{time}</h5>
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
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5>ADDRESS</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5>{userData.address}</h5>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <Grid xs={12} style={{ marginLeft: 20 }}>
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
                  <Grid container>
                    <Grid item xs={6} style={{ marginRight: -50 }}>
                      <Button
                        style={{ paddingLeft: 50, paddingRight: 50 }}
                        variant="contained"
                        size="large"
                        onClick={() => setStep(1)}
                        color="secoundary"
                      >
                        prev
                      </Button>
                      <span></span>
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: 60 }}>
                      <Button
                        style={{ paddingLeft: 52, paddingRight: 52 }}
                        variant="contained"
                        size="large"
                        onClick={() => {
                          props.history.push("/Home");
                          setStep(1);
                        }}
                        color="primary"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(Fifthstep);
