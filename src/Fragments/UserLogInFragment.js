import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent } from "@material-ui/core";
import { withRouter } from "react-router";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { compose } from "recompose";
import { withFirebase } from "../UsersComponents/Firebase";
import { db, auth } from "../Firebase";
import firebase from "firebase/app";
import * as ROLES from "../UsersComponents/constants/roles";
import { mainContext } from "../Contexts/MainContext";
import RegistrationDialog from "../Component.js/Dialog/RegistrationDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#fbfbfb",
  },
  image: {
    width: "400px",
    height: "200px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "100px",
    height: "80vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  margin: {
    display: "flex",
    alignItems: "left",
    marginTop: 10,
    paddingBottom: 10,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserLogInFragment = () => <SignInForm />;

const SignInFormBase = (props) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [phoneNum, setPhoneNum] = React.useState(0);
  const [otp, setOtp] = React.useState(0);
  const onChangeHandler1 = (event) => {
    const { value } = event.target;
    setPhoneNum(value);
  };
  const [open, setOpen] = React.useState(false);

  const { setSignInForm, details, setDetails, setUid } =
    useContext(mainContext);

  const DialogTitle = (props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              color: "#000",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeHandler2 = (event) => {
    const { value } = event.target;
    setOtp(value);
  };
  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(() => {
        var userId = firebase.auth().currentUser.uid;
        setUid(userId);
        const dbRef = firebase.database().ref();
        dbRef
          .child("users")
          .child(userId)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              if (snapshot.val().username !== "") {
                props.history.push("/Users/Details");
              } else {
                setSignInForm(true);
              }
            } else {
              const roles = {};
              const username = "";

              const auth1 = ROLES.USER;

              roles[ROLES.USER] = ROLES.USER;
              db.ref(`users/${userId}`).set({
                roles,
                auth1,
                username,
              });
              setSignInForm(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
        console.log(userId);
      })
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          onSignInSubmit();
        },
        defaultCountry: "UAE",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setUpRecaptcha();
    let phoneNumber = "+971" + phoneNum;
    console.log(phoneNumber);
    setDetails({ ...details, phoneNumber: phoneNumber });
    let appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);

        console.log("OTP is sent");
        handleClickOpen();
        appVerifier.clear();
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
      });
  };

  return (
    <div>
      <RegistrationDialog />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Enter OTP"}</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="otp"
            onChange={onChangeHandler2}
            label="Enter Otp"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmitOtp}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diola-4f3ff.appspot.com/o/1-diola-logo-new-600x278.png?alt=media&token=20342a9e-3e59-44f6-a955-4c34864c27f5"
            className={classes.image}
            alt="Logo"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container>
                <Grid item xs={2}>
                  <div style={{display: "flex", alignItem: "center", justifyContent: "center", backgroundColor: "#f7f7f7", marginTop: "15px", borderRadius: "5px", color: "#022949"}}>
                    <h3>+971</h3>
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChangeHandler1}
                    label="Enter Phone Number"
                  />
                </Grid>
              </Grid>
              <div id="recaptcha-container"></div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSignInSubmit}
              >
                Get OTP
              </Button>
            </form>
            {error && (
              <h6>
                {error.message ===
                "reCAPTCHA has already been rendered in this element"
                  ? "Refresh the page"
                  : error.message}
              </h6>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default UserLogInFragment;
export { SignInForm };
