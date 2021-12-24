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
    height: 1100,
    width: 900,
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
  console.log(uid);
  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper2} elevation={2}>
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
              <h1
                style={{
                  color: "#333D47",
                  paddingLeft: "50px",
                  paddingTop: "10px",
                }}
              >
                Total Price: {billing} AED
              </h1>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                color: "#333D47",
                paddingLeft: "50px",
                paddingBottom: "30px",
              }}
            >
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
                  <h4>{userData.CleaningType}</h4>
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
                  <h4>{userData.frequency}</h4>
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
                  <h4>{userData.Duration} Hours</h4>
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
                  <h4>{userData.NumberofProfessionals}</h4>
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
                  <h4>{userData.Material}</h4>
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
                  <h4>{paymentOptions}</h4>
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
                  <h4>{userData.instructions}</h4>
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
                  {userData.date === "2014-08-18 21:11:54" ? (
                    <h4></h4>
                  ) : (
                    <h4>{userData.date.split(" ")[0]}</h4>
                  )}
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
                  {userData.date === "2014-08-18 21:11:54" ? (
                    <h4></h4>
                  ) : (
                    <h4>{time}</h4>
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
                  <h4>{userData.address}</h4>
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
                  <h4>{userData.address1}</h4>
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
                  <h4>{userData.address2}</h4>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Grid
            item
            xs={12}
            style={{
              marginTop: 30,
            }}
          >
            <Divider style={{ marginBottom: 20 }} light />
            <Grid container>
              <Grid item xs={5} style={{ marginLeft: 50 }}>
                <Button
                  style={{ paddingLeft: 50, paddingRight: 50 }}
                  variant="contained"
                  size="large"
                  onClick={() => setStep(1)}
                >
                  Place another order
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{ paddingLeft: 62, paddingRight: 62 }}
                  variant="contained"
                  size="large"
                  onClick={() => {
                    props.history.push("/Home");
                    setStep(1);
                  }}
                  color="primary"
                >
                  go to home
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default withRouter(Fifthstep);
