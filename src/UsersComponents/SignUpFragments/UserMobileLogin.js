import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "firebase/app";
import { auth, db } from "../../Firebase";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import * as ROLES from "../constants/roles";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserMobileLogin = (props) => {
  const classes = useStyles();
  const [phoneNum, setPhoneNum] = React.useState(0);
  const [otp, setOtp] = React.useState(0);
  const onChangeHandler1 = (event) => {
    const { value } = event.target;
    setPhoneNum(value);
  };
  const [open, setOpen] = React.useState(false);

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
  const INITIAL_STATE = {
    blocked: false,
    isUser: true,
    error: null,
  };
  const [details, setDetails] = React.useState({ ...INITIAL_STATE });
  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        const isUser = details.isUser;
        const auth = ROLES.USER;
        const blocked = details.blocked;
        const roles = {};
        if (isUser) {
          roles[ROLES.USER] = ROLES.USER;
        }
        let user = result.user;
        db.ref(`users/${user.uid}`).set({
          blocked,
          roles,
          auth,
        });
        handleClose()
        props.history.push("/Users/Details");
        setDetails({ ...INITIAL_STATE })
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
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
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setUpRecaptcha();
    let phoneNumber = "+91" + phoneNum;
    let appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
        handleClickOpen()
        appVerifier.clear();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
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
            color="secondary"
            onClick={onSubmitOtp}
          >
            Sign In
          </Button>
        </DialogContent>
      </Dialog>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={onChangeHandler1}
            label="Enter Phone Number"
          />
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
      </div>
    </Container>
  );
};

export default withRouter(UserMobileLogin);
