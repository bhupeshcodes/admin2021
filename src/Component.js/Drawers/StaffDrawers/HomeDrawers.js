import React, { useContext } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { mainContext } from "../../../Contexts/MainContext";

import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const HomeDrawers = () => {
  const { open, handleDrawerClose, Logout } = useContext(mainContext);
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      style={{
        width: 240,
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#3C4B64",
          color: "#FFFFFF",
          width: 240,
          height: "100%",
        }}
      >
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
            <Typography variant="h6">Logo Here</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon style={{ color: "white", fontSize: 20 }} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Divider />
        <List style={{ backgroundColor: "#3C4B64" }}>
          <ListItem button component={RouterLink} to="/Staff/Dashboard">
            <ListItemIcon>
              <DashboardIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/Staff/Dashboard/CompleteOrder"
          >
            <ListItemIcon>
              <AssignmentTurnedInIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Complete Order</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List style={{ backgroundColor: "#3C4B64" }}>
          <ListItem button onClick={Logout}>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default HomeDrawers;
