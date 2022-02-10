import React, { useContext, useEffect } from "react";
import * as ROLES from "../../UsersComponents/constants/roles";
import { withAuthorization } from "../../UsersComponents/Session";
import { compose } from "redux";
import { withFirebase } from "../../UsersComponents/Firebase";
import {
  Avatar,
  Backdrop,
  Badge,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  TextField,
  withStyles,
} from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import firebase from "firebase/app";
import { db } from "../../Firebase";
import LocationDialog from "../../Component.js/Dialog/LocationDialog2";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper1: {
    position: "relative",
    height: 600,
    width: 600,
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 20,
    [theme.breakpoints.down("md")]: {
      width: 800,
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: 350,
    },
  },
  paper2: {
    height: 600,
    width: 600,
    paddingTop: "50px",
    paddingBottom: "50px",
    paddingLeft: "100px",
    paddingRight: "100px",
    [theme.breakpoints.down("md")]: {
      width: 800,
    },
    [theme.breakpoints.down("sm")]: {
      width: 350,
    paddingLeft: "20px",
    paddingRight: "20px",
    },
  },
  control: {
    padding: theme.spacing(2),
  },
  Avatar: {
    height: "200px",
    width: "200px",
    boxShadow: "0 2px 2px 0 #9E9E9E",
    border: "10px solid #f7f7f7",
  },
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: "50px",
    height: "50px",
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const UserDetails = () => {
  const classes = useStyles();
  const { handleMapOpen, details, setDetails, loading, setLoading } =
    useContext(mainContext);

  useEffect(() => {
    var userId = JSON.parse(localStorage.getItem("authUser")).uid;
    const dbRef = firebase.database().ref();
    dbRef
      .child("users")
      .child(userId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDetails(snapshot.val());
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleSubmit = (values) => {
    var uid = JSON.parse(localStorage.getItem("authUser")).uid;
    const data = JSON.parse(localStorage.getItem("authUser"));
    db.ref(`users/${uid}`).set({
      ...data,
      ...values,
    });

    window.location.reload();
  };

  const onSubmit = (values, props) => {
    setTimeout(() => {
      handleSubmit(values);
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

  console.log(details);
  return (
    <div>
      {details.email === "" ? (
        "loading..."
      ) : (
        <div>
          <Backdrop style={{ zIndex: 500, color: "#ffffff" }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container className={classes.root} spacing={2} justify="center">
            <LocationDialog />
            <Grid item lg={6} xs={12}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Paper className={classes.paper1} elevation={2}>
                    <Grid container>
                      <Grid item xs={12}>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <h2>User Profile</h2>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            display: "flex",
                            "& > *": {
                              margin: "10px",
                            },
                          }}
                        >
                          <Badge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://image.shutterstock.com/image-vector/add-icon-260nw-571594759.jpg"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                              className={classes.Avatar}
                            />
                          </Badge>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            display: "flex",
                            "& > *": {
                              margin: "10px",
                            },
                          }}
                        >
                          <h3>Welcome {details.username}</h3>
                        </div>
                      </Grid>

                      <Grid item xs={12}>
                        <div
                          style={{
                            width: "100%",
                            marginTop: "20px",
                            marginBottom: "20px",
                            marginLeft: "20px",
                            "& > *": {
                              margin: "10px",
                            },
                            position: "absolute",
                            bottom: "0",
                          }}
                        >
                          <Grid container>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}></Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid container>
                <Grid item>
                  <Paper className={classes.paper2} elevation={2}>
                    <div>
                      <Grid container>
                        <Grid item xs={12}>
                          <Formik
                            initialValues={details}
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
                                      {(msg) => (
                                        <div style={{ color: "red" }}>
                                          {msg}
                                        </div>
                                      )}
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
                                      {(msg) => (
                                        <div style={{ color: "red" }}>
                                          {msg}
                                        </div>
                                      )}
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
                                      {(msg) => (
                                        <div style={{ color: "red" }}>
                                          {msg}
                                        </div>
                                      )}
                                    </ErrorMessage>
                                  }
                                />
                                <Grid container>
                                  <Grid item xs={12}>
                                    <div
                                      style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        display: "flex",
                                      }}
                                    >
                                      <Grid item xs={4}>
                                        <h4
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          Address
                                        </h4>
                                      </Grid>
                                      <Grid item xs={8}>
                                        {details.address}
                                      </Grid>
                                    </div>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <div
                                      style={{
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        display: "flex",
                                        "& > *": {
                                          margin: "10px",
                                        },
                                      }}
                                    >
                                      <Button
                                        endIcon={<ArrowDropDownIcon />}
                                        onClick={() => {
                                          handleMapOpen()
                                        }}
                                      >
                                        Change Address
                                      </Button>
                                    </div>
                                  </Grid>
                                </Grid>
                                <div
                                  style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "10px",
                                    display: "flex",
                                  }}
                                >
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    type="submit"
                                    disabled={props.isSubmitting}
                                  >
                                    {props.isSubmitting
                                      ? "Loading..."
                                      : "Save Changes"}
                                  </Button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.USER];
export default compose(withAuthorization(condition), withFirebase)(UserDetails);
