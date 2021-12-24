import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid } from "@material-ui/core";
import ReorderIcon from "@material-ui/icons/Reorder";
import { Link as RouterLink } from "react-router-dom";
import { mainContext } from "../../Contexts/MainContext";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileMenuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: {
    minHeight: 60,
  },
  subToolbar: {
    minHeight: 50,
  },
  toolbarHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
  },
  avtar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "flex-end",
  },
  hide: {
    display: "none",
  },
}));

const DriverNavbar = () => {
  const classes = useStyles();
  const { open, setOpen, toggleDrawer } = useContext(mainContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container>
      <Grid
        item
        xs={6}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          style={{ color: "#000000", fontSize: 30 }}
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          aria-label="MobileNav"
          onClick={toggleDrawer(true)}
          className={classes.mobileMenuButton}
        >
          <ReorderIcon />
        </IconButton>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RouterLink
              to="/Driver/Dashboards"
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="subtitle2"
                noWrap
                className={classes.toolbarHeader}
                style={{ color: "#A5A5AD" }}
              >
                Home
              </Typography>
            </RouterLink>
          </div>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default DriverNavbar;
