import React, { useContext, useEffect } from "react";
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocationDialog from "../Dialog/LocationDialog";
import firebase from "firebase/app";

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
    paddingRight: 10,
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
}));

export default function Firststep() {
  const classes = useStyles();
  const {
    setStep,
    userData,
    setUserData,
    handleMapOpen,
    address,
    setFrequency,
    setCleaningType,
    setAddress,
    loading,
    setLoading,
  } = useContext(mainContext);
  const [userId, setUserId] = React.useState("zdhzfkl");
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("authUser")) !== null &&
      address === "Select Address"
    ) {
      setLoading(true);
      setUserId(JSON.parse(localStorage.getItem("authUser")).uid);
      const dbRef = firebase.database().ref();
      dbRef
        .child("users")
        .child(userId)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.val();
            if (data.address !== "") {
              setAddress(data.city);
              setUserData({
                ...userData,
                address: data.address,
                city: data.city,
              });
              setLoading(false);
            } else {
              setLoading(false);
            }
            console.log(data.city);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else if (userData.address !== "W15-02, Abu Dhabi") {
      console.log("error");
    }
  }, [setAddress, setLoading, setUserData, userData, userId, address]);
  return (
    <div>
      <LocationDialog />
      <Backdrop style={{ zIndex: 500, color: "#ffffff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container className={classes.root} spacing={2} justify="center">
        <Grid item xs={6} style={{ width: "80%" }}>
          <Grid container justify="center">
            <Grid item>
              <Paper className={classes.paper1} elevation={2}>
                <div>
                  <h3 style={{ fontWeight: "600", color: "#333D47", marginTop: "20px" }}>
                    {" "}
                    Which type of cleaning you want?{" "}
                  </h3>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Name"
                      name="Name"
                      value={userData["CleaningType"]}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          CleaningType: e.target.value,
                          frequency: "One-time",
                        });
                        setCleaningType(e.target.value);
                      }}
                    >
                      <div className="radio">
                        <FormControlLabel
                          className="form-header"
                          value="General Cleaning"
                          control={<Radio color="primary" />}
                          label="General Cleaning"
                        />
                      </div>
                      <div className="radio">
                        <FormControlLabel
                          value="Deep Cleaning"
                          className="form-header"
                          control={<Radio color="primary" />}
                          label="Deep Cleaning"
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <h3 style={{ fontWeight: "600", color: "#333D47" }}>
                    {" "}
                    How often do you need your professional?{" "}
                  </h3>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Name"
                      name="Name"
                      value={userData["frequency"]}
                      onChange={(e) => {
                        setUserData({ ...userData, frequency: e.target.value });
                        setFrequency(e.target.value);
                      }}
                    >
                      <div className="radio">
                        <FormControlLabel
                          className="form-header"
                          value="One-time"
                          control={<Radio color="primary" />}
                          label="One-time"
                        />
                        <Chip
                          color="primary"
                          size="small"
                          label="25% OFF"
                        />
                      </div>
                      {userData.CleaningType === "General Cleaning" ? (
                        <div>
                          <div className="radio">
                            <FormControlLabel
                              value="Weekly"
                              className="form-header"
                              control={<Radio color="primary" disabled/>}
                              label="Weekly"
                            />
                            <Chip
                              color="primary"
                              size="small"
                              label="Contact Us"
                            />
                          </div>
                          <div className="radio">
                            <FormControlLabel
                              value="Montly"
                              className="form-header"
                              control={<Radio color="primary" disabled/>}
                              label="Montly"
                            />
                            <Chip
                              color="primary"
                              size="small"
                              label="Contact Us"
                            />
                          </div>
                        </div>
                      ) : null}
                    </RadioGroup>
                  </FormControl>
                  <Divider style={{
                      position: "absolute",
                      bottom: "90px",
                      width: "90%", }} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      width: "80%",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={6} ></Grid>
                        <Grid item xs={6} style={{display:"flex", alignItems:"center", justifyContent:"flex-end", paddingLeft: 540  }}>
                          <Button
                            style={{ paddingLeft: 70, paddingRight: 70 }}
                            variant="contained"
                            size="large"
                            onClick={() => {
                              if (address === "Select Address") {
                                handleMapOpen();
                              } else {
                                setStep(2);
                              }
                            }}
                            color="primary"
                          >
                            Next
                          </Button>
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
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>CITY</h5>
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
                        <h5 style={{color: "#333D47"}}>{userData.city}</h5>
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
                    <h3 style={{fontWeight: "600", color: "#333D47"}}>SERVICE DETAILS</h3>
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
                        }}
                      >
                        <h5 style={{fontWeight: "200", color: "#8CA0B3"}}>Cleaning Type</h5>
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
                        <h5 style={{color: "#333D47"}}>{userData.CleaningType}</h5>
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
                        }}
                      >
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>Frequency</h5>
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
                        <h5 style={{color: "#333D47"}}>{userData.frequency}</h5>
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
                        }}
                      >
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>Duration</h5>
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
                        <h5 style={{color: "#333D47"}}>{userData.Duration} Hours</h5>
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
                          marginTop: -5,
                          marginBottom: -5,
                          paddingRight: 50,
                          paddingLeft: 50,
                        }}
                      >
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>Number of Professionals</h5>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          textAlign: "right",
                          marginTop: -5,
                          marginBottom: -5,
                          paddingRight: 50,
                          paddingLeft: 50,
                        }}
                      >
                        <h5 style={{color: "#333D47"}}>{userData.NumberofProfessionals}</h5>
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
                        }}
                      >
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>Material</h5>
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
                        <h5 style={{color: "#333D47"}}>{userData.Material}</h5>
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
                        }}
                      >
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>Date</h5>
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
                          <h5 style={{color: "#333D47"}}></h5>
                        ) : (
                          <h5 style={{color: "#333D47"}}></h5>
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
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>Time</h5>
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
                          <h5 style={{color: "#333D47"}}></h5>
                        ) : (
                          <h5 style={{color: "#333D47"}}></h5>
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
                        <h5 style={{fontWeight: "500", color: "#8CA0B3"}}>Address</h5>
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
                        <h5 style={{color: "#333D47"}}>{userData.address}</h5>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
