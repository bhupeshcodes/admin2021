import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { mainContext } from "../../../Contexts/MainContext";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "#3C4B64",
    color: "#FFFFFF",
    height: "100%",
  },
});

export default function UsersDrawersMobile() {
  const classes = useStyles();
  const { state, toggleDrawer, Logout } = useContext(mainContext);

  const list = () => (
    <div className={classes.list}>
      <Grid container style={{ padding: 10 }}>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 10,
          }}
        >
          <Typography variant="h6"></Typography>
        </Grid>
      </Grid>
      <Divider />
      <List style={{ backgroundColor: "#3C4B64" }}>
        <ListItem button component={RouterLink} to="/Admin/Users">
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/Admin/Users/User">
          <ListItemText>Users</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/Admin/Users/Staff">
          <ListItemText>Staff</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/Admin/Users/Driver">
          <ListItemText>Driver</ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
