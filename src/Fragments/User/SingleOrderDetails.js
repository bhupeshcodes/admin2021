import React, { useContext, useEffect } from "react";
import { Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper2: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
}));

const SingleOrderDetails = (props) => {
  const classes = useStyles();
  const { singleOrderDetails } = useContext(mainContext);

  useEffect(() => {
    if (singleOrderDetails === "") {
      console.log(singleOrderDetails);
      props.history.push("/Users/Details/OrderDetails");
    }
  }, []);
  console.log(singleOrderDetails);
  return (
    <div>
      <h1
        style={{
          color: "#333D47",
          paddingTop: "30px",
        }}
      >
        Order Detail : {singleOrderDetails.uid}
      </h1>
      <Paper className={classes.paper2} elevation={2}>
        <Grid container>
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
                <h4>{singleOrderDetails.Amount}</h4>
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
                <h4>{singleOrderDetails.paymentOptions}</h4>
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
                    <h4>{singleOrderDetails.uid}</h4>
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
                    <h4>{singleOrderDetails.name}</h4>
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
                    <h4>{singleOrderDetails.phoneNumber}</h4>
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
                    <h4>{singleOrderDetails.email}</h4>
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
                    <h4>{singleOrderDetails.CleaningType}</h4>
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
                    <h4>{singleOrderDetails.frequency}</h4>
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
                    <h4>{singleOrderDetails.Duration}</h4>
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
                    <h4>{singleOrderDetails.NumberofProfessionals}</h4>
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
                    <h4>{singleOrderDetails.Material}</h4>
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
                    <h4>{singleOrderDetails.paymentOptions}</h4>
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
                    <h4>{singleOrderDetails.instructions}</h4>
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
                    <h4>{singleOrderDetails.date}</h4>
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
                    {singleOrderDetails.date === "2014-08-18 21:11:54" ? (
                      <h4>Select Time</h4>
                    ) : (
                      <h4>{singleOrderDetails.time}</h4>
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
                    <h4>{singleOrderDetails.address}</h4>
                    <a
                      href={`http://maps.google.com/maps?&z=15&mrt=loc&t=m&q=${singleOrderDetails.latitude}+${singleOrderDetails.longitude}`}
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
                    <h4>{singleOrderDetails.address1}</h4>
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
                    <h4>{singleOrderDetails.address2}</h4>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withRouter(SingleOrderDetails);
