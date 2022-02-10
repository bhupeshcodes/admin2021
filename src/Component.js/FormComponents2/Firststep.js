import React, { useContext, useEffect } from "react";
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
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
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import LocationDialog from "../Dialog/LocationDialog";
import firebase from "firebase/app";

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

export default function Firststep() {
  const classes = useStyles();
  const {
    setStep,
    userData,
    setUserData,
    handlePopupOpen,
    handlePopupClose,
    openPopUp,
    handleMapOpen,
    address,
    setCleaningType,
    setFrequency,
    loading,
    setLoading,
    setAddress,
  } = useContext(mainContext);

  const [userId, setUserId] = React.useState("zdgdsjfy");
  useEffect(() => {
    setLoading(true);
    if (
      JSON.parse(localStorage.getItem("authUser")) !== null &&
      address === "Select Address"
    ) {
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
            console.log(data);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [setAddress, setLoading, setUserData, userData, userId, address]);
  return (
    <div className={classes.root}>
      <LocationDialog />
      <Backdrop style={{ zIndex: 500, color: "#ffffff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Paper className={classes.paper1} elevation={2}>
                <div>
                  <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>
                    {" "}
                    Which type of cleaning you want?{" "}
                  </h4>
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
                  <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>
                    {" "}
                    How often do you need your professional?{" "}
                  </h4>
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
                </div>
              </Paper>
            </Grid>
          </Grid>
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
          paddingTop: "20px",
          paddingBottom: "60px",
          backgroundColor: "#fff",
          color: "#fff",
        }}
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={7}>
              <Button endIcon={<ArrowDropDownIcon />} onClick={handlePopupOpen}>
                Booking Details
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                style={{ paddingLeft: 50, paddingRight: 50 }}
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
              <Grid container justify="center">
                <Grid item>
                  <div>
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
                          <h5>CITY</h5>
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
                          <h5>{userData.city}</h5>
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
                            <h5></h5>
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
                            <h5></h5>
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
