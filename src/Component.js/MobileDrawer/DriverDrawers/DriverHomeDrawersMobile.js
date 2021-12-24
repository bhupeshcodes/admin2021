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

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "#3C4B64",
    color: "#FFFFFF",
    height: "100%",
  },
});

export default function DriverHomeDrawersMobile() {
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
        <ListItem button component={RouterLink} to="/Driver/Dashboards">
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/Driver/Dashboards/CompleteOrders"
        >
          <ListItemText>Complete Order</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List style={{ backgroundColor: "#3C4B64" }}>
        <ListItem button onClick={Logout}>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
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
