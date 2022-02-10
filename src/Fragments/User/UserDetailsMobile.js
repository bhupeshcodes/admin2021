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
import LocationDialog from "../../Component.js/Dialog/LocationDialog";
import { db } from "../../Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
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

const UserDetailsMobile = () => {
  const classes = useStyles();
  const { handleMapOpen, loading, setLoading } = useContext(mainContext);
  const INITIAL_STATE = {
    username: "",
    email: "",
    phoneNumber: "",
    fullname: "",
    address: "Select Address",
  };
  const [details, setDetails] = React.useState({ ...INITIAL_STATE });

  useEffect(() => {
    var userId = JSON.parse(localStorage.getItem("authUser")).uid;
    console.log(userId);
    const dbRef = firebase.database().ref();
    dbRef
      .child("users")
      .child(userId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDetails(snapshot.val());
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    var uid = JSON.parse(localStorage.getItem("authUser")).uid;
    const data = JSON.parse(localStorage.getItem("authUser"));
    db.ref(`users/${uid}`).set({
      ...data,
      ...details,
    });
    var userId = JSON.parse(localStorage.getItem("authUser")).uid;
    const dbRef = firebase.database().ref();
    dbRef
      .child("users")
      .child(userId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDetails(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        position: "relative",
        height: "1100px",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
    <Backdrop style={{ zIndex: 800, color: "#ffffff" }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
      <Grid container className={classes.root} spacing={2} justify="center">
        <LocationDialog />
        <Grid item xs={7}>
          <Grid container justify="center">
            <Grid item xs={12}>
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
                  <h3>Welcome {details.username}</h3>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={2} justify="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Paper className={classes.paper2} elevation={2}>
                <Grid container>
                  <Grid item xs={12}>
                    <div
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "50px",
                        display: "flex",
                        "& > *": {
                          margin: "10px",
                        },
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        value={details.username}
                        onChange={(e) => {
                          setDetails({ ...details, username: e.target.value });
                        }}
                      />
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
                      <TextField
                        label="Full Name"
                        variant="outlined"
                        value={details.fullname}
                        onChange={(e) => {
                          setDetails({ ...details, fullname: e.target.value });
                        }}
                      />
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
                      <TextField
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        value={details.phoneNumber}
                        disabled
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            phoneNumber: e.target.value,
                          });
                        }}
                      />
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
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        value={details.email}
                        onChange={(e) => {
                          setDetails({ ...details, email: e.target.value });
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "10px",
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
                        onClick={handleMapOpen}
                      >
                        Change Address
                      </Button>
                    </div>

                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.USER];
export default compose(
  withAuthorization(condition),
  withFirebase
)(UserDetailsMobile);
