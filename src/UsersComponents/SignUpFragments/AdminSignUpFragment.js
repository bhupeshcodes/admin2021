import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { withFirebase } from "../Firebase/index";

import * as ROLES from "../constants/roles";

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
    width: "80%", // Fix IE 11 issue.
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

const AdminSignUpFragment = () => <SignUpForm />;

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  blocked: false,
  isAdmin: true,
  error: null,
};

const SignUpFormBase = (props) => {
  const classes = useStyles();
  const [details, setDetails] = React.useState({ ...INITIAL_STATE });

  const handleChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const onChangeCheckbox = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.checked });
  };

  const isInvalid =
    details.password === "" || details.email === "" || details.auth === "";

  const onSubmit = (event) => {
    const passwordOne = details.passwordOne;
    const email = details.email;
    const isAdmin = details.isAdmin;
    const username = details.username;
    const auth = ROLES.ADMIN;
    const blocked = details.blocked;

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return props.firebase.user(authUser.user.uid).set({
          username,
          blocked,
          email,
          roles,
          auth,
        });
      })
      .then(() => {
        setDetails({ ...INITIAL_STATE });
        props.firebase.auth.signOut().catch((err) => {
          console.log(err);
        });
      })
      .catch((error) => {
        setDetails({ ...details, error: error });
      });
    event.preventDefault();
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordOne"
              label="Password"
              type="passwordOne"
              id="passwordOne"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordTwo"
              label="Re-enter Password"
              type="passwordTwo"
              id="passwordTwo"
              onChange={handleChange}
            />

            <label>
              Admin:
              <input
                name="isAdmin"
                type="checkbox"
                checked={details.isAdmin}
                onChange={onChangeCheckbox}
              />
            </label>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid}
              type="submit"
            >
              Sign Up
            </Button>
            {details.error && <p>{details.error.message}</p>}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default AdminSignUpFragment;
export { SignUpForm };
