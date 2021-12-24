import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { mainContext } from "../../Contexts/MainContext";
import firebase from "firebase/app";
import { auth, db } from "../../Firebase";
import {
  Container,
  CssBaseline,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as ROLES from "../../UsersComponents/constants/roles";
import RegistrationDialog2 from "./RegistrationDialog2";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

export default function OtpDialog() {
  const {
    handleOptClose,
    otpPopup,
    setStep,
    setSignInForm,
    details,
    setDetails,
    setUid,
  } = React.useContext(mainContext);
  const classes = useStyles();
  const [phoneNum, setPhoneNum] = React.useState(0);
  const [otp, setOtp] = React.useState(0);
  const onChangeHandler1 = (event) => {
    const { value } = event.target;
    setPhoneNum(value);
  };
  const [open, setOpen] = React.useState(false);

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
            onClick={handleOptClose}
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
                setStep(4);
              } else {
                setSignInForm(true);
              }
            } else {
              const isUser = true;
              const roles = {};
              const username = "";
              const fullname = "";
              const latitude = "";
              const longitude = "";

              const auth1 = ROLES.USER;

              if (isUser) {
                roles[ROLES.USER] = ROLES.USER;
              }
              db.ref(`users/${userId}`).set({
                roles,
                auth1,
                username,
                fullname,
                latitude,
                longitude,
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
      });
  };

  return (
    <div>
      <RegistrationDialog2 />
      <Dialog
        onClose={handleOptClose}
        aria-labelledby="customized-dialog-title"
        open={otpPopup}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleOptClose}>
          Verification
        </DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="xs">
            <Dialog
              open={open}
              onClose={handleOptClose}
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
                  Next
                </Button>
              </DialogContent>
            </Dialog>
            <CssBaseline />
            <div className={classes.paper}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
