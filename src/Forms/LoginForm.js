import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress, FormControl } from "@material-ui/core";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { withFirebase } from "../UsersComponents/Firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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

const LogInForm = () => <SignInForm />;

const SignInFormBase = (props) => {
  const classes = useStyles();
  const INITIAL_STATE = {
    email: "",
    password: "",
    auth: "User",
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firebase1 = (values) => {
    const password = values.password;
    const email = values.email;
    const auth = values.auth;
    setLoading(true);
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        var userId = firebase.auth().currentUser.uid;

        db.ref("/users/" + userId)
          .once("value")
          .then((snapshot) => {
            var username = snapshot.val().blocked;
            if (username) {
              firebase
                .auth()
                .signOut()
                .catch((err) => {
                  console.log(err);
                  setError(err);
                  setLoading(false);
                });
            }
            setLoading(false);
          });
      })
      .then(() => {
        if (auth === "Admin") {
          props.history.push("/Admin/Home");
        } else if (auth === "Account") {
          props.history.push("/Accounts/DRF");
        } else if (auth === "BackOffice") {
          props.history.push("/BackOffice/DUF");
        } else if (auth === "User") {
          props.history.push("/Users/Details");
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);

        console.log(error);
      });
  };
  const onSubmit = (values, props) => {
    setTimeout(() => {
      firebase1(values);
      props.resetForm();
      props.setSubmitting(false);
    }, 1000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string().required("Required"),
    auth: Yup.string().required("Required"),
  });

  console.log(props);
  return (
    <div>
      <Backdrop style={{ zIndex: 500, color: "#ffffff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={<ErrorMessage name="password" />}
                  />
                  <Field
                    as={FormControl}
                    className={classes.margin}
                    name="auth"
                  >
                    <div className="ErrMsg">
                      <ErrorMessage name="auth" />
                    </div>
                  </Field>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Loading..." : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>
            <Grid item xs={12} style={{ alignItem: "left" }}>
              <Link to="/Forgetpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {error && <h6>{error.message}</h6>}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default LogInForm;
export { SignInForm };
