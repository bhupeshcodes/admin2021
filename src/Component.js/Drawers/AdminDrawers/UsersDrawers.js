import React, { useContext } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { mainContext } from "../../../Contexts/MainContext";
import { Link as RouterLink } from "react-router-dom";

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const UsersDrawers = () => {
  const { open, handleDrawerClose } = useContext(mainContext);
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
            <Typography variant="h6"></Typography>
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
          <ListItem button component={RouterLink} to="/Admin/Users">
            <ListItemIcon>
              <DashboardIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
          <ListItem button component={RouterLink} to="/Admin/Users/User">
            <ListItemIcon>
              <AccountBoxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Users</ListItemText>
          </ListItem>
          <ListItem button component={RouterLink} to="/Admin/Users/Staff">
            <ListItemIcon>
              <ContactMailIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Staff</ListItemText>
          </ListItem>
          <ListItem button component={RouterLink} to="/Admin/Users/Driver">
            <ListItemIcon>
              <ContactPhoneIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Driver</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default UsersDrawers;
