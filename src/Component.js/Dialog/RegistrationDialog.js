import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { mainContext } from "../../Contexts/MainContext";
import { db } from "../../Firebase";
import * as ROLES from "../../UsersComponents/constants/roles";
import { withFirebase } from "../../UsersComponents/Firebase";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  CssBaseline,
  DialogContent,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrationDialog = (props) => {
  const classes = useStyles();
  const { setSignInForm, SignInForm, details, uid } = useContext(mainContext);
  const createNewUser = ({ values }) => {
    const email = values.email;
    const isUser = details.isUser;
    const username = values.username;
    const auth1 = ROLES.USER;
    const blocked = values.blocked;
    const phoneNumber = values.phoneNumber;
    const address = values.address;
    const fullname = values.fullname;
    const roles = {};
    roles[ROLES.USER] = ROLES.USER;

    console.log(values);
    console.log(uid);
    db.ref(`users/${uid}`).set({
      username,
      fullname,
      email,
      phoneNumber,
      address,
      blocked,
      roles,
      auth1,
    });

    props.history.push("/Users/Details");
    window.location.reload();
  };
  const onSubmit = (values, props) => {
    setTimeout(() => {
      createNewUser({ values });
      console.log(values);
      setSignInForm(false);
      props.resetForm();
      props.setSubmitting(false);
    }, 1000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    fullname: Yup.string()
      .matches(/^[a-z, A-Z]+$/, "Must be only text")
      .required("Required"),
    username: Yup.string()
      .matches(/^[a-z, A-Z]+$/, "Must be only text")
      .required("Required"),
  });

  const INITIAL_STATE = {
    email: "",
    username: "",
    blocked: "false",
    fullname: "",
    auth1: ROLES.USER,
    phoneNumber: details.phoneNumber,
    address: details.address,
    roles: {},
    latitude: "",
    longitude: "",
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={SignInForm}
        onClose={() => setSignInForm(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setSignInForm(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sign Up Form
            </Typography>
          </Toolbar>
        </AppBar>
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
              src="https://diola.ae/wp-content/uploads/2021/08/1-diola-logo-new.png"
              className={classes.image}
              alt="Logo"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Formik
                initialValues={INITIAL_STATE}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {(props) => (
                  <Form>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoFocus
                      helperText={
                        <ErrorMessage name="username">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="fullname"
                      label="fullname"
                      type="fullname"
                      id="fullname"
                      autoFocus
                      helperText={
                        <ErrorMessage name="fullname">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      helperText={
                        <ErrorMessage name="email">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      }
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      type="submit"
                      disabled={props.isSubmitting}
                    >
                      {props.isSubmitting ? "Loading..." : "Sign Up"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default compose(withRouter, withFirebase)(RegistrationDialog);
