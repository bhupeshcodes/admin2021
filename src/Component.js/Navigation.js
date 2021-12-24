import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import { Hidden } from "@material-ui/core";
import { mainContext } from "../Contexts/MainContext";
import Breadcrumb from "./BreadCrump";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#FAFDFF",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  appBarShift: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    backgroundColor: "#303C54",
    color: "white",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#FAFDFF",
    [theme.breakpoints.up("sm")]: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
  },
  contentShift: {
    [theme.breakpoints.up("sm")]: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  },
}));

const Navigation = (props) => {
  const classes = useStyles();
  const { checkPage, open, checkNavbar, checkPageMobile } = useContext(
    mainContext
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          className={classes.toolbar}
          style={{ backgroundColor: "#ffffff", paddingTop: 5 }}
        >
          {checkNavbar(props)}
        </Toolbar>
        <Divider style={{ backgroundColor: "#D8DBE0" }} />
        <Toolbar
          className={classes.subToolbar}
          style={{ backgroundColor: "#ffffff", fontSize: 20 }}
        >
          <Breadcrumb />
        </Toolbar>
      </AppBar>
      <Hidden only="xs">{checkPage(props)}</Hidden>
      <Hidden only={["sm", "lg", "md", "xl"]}>{checkPageMobile(props)}</Hidden>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

export default Navigation;
