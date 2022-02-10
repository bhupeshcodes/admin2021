import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Hidden, makeStyles, Typography } from "@material-ui/core";
import MobileView from "../../Fragments/OrderFormFragments/MobileView";
import MultiStepForm from "../../Forms/MultiStepForm";
import { Grid } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbarHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
  },
}));

export default function OrderForm() {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: "#FAFDFF",
      }}
    >
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#fff", color: "#9A9A9A", width: "100%" }}
      >
        <Toolbar>
          <Hidden mdDown>
            <Grid container>
              <Grid item xs={6}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/diola-4f3ff.appspot.com/o/1-diola-logo-new-600x278.png?alt=media&token=20342a9e-3e59-44f6-a955-4c34864c27f5 "
                  alt="logo"
                  style={{
                    width: "120px",
                    height: "60px",
                    marginLeft: "170px",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RouterLink
                  to="/Home"
                  style={{ textDecoration: "none", paddingRight: "30px" }}
                >
                  <Typography
                    variant="subtitle2"
                    noWrap
                    className={classes.toolbarHeader}
                    style={{ color: "#9A9A9A" }}
                  >
                    Home
                  </Typography>
                </RouterLink>
                <RouterLink
                  to="/About"
                  style={{ textDecoration: "none", paddingRight: "30px" }}
                >
                  <Typography
                    variant="subtitle2"
                    noWrap
                    className={classes.toolbarHeader}
                    style={{ color: "#9A9A9A" }}
                  >
                    About
                  </Typography>
                </RouterLink>
                <RouterLink
                  to="/Users/Details"
                  style={{ textDecoration: "none", paddingRight: "30px" }}
                >
                  <Typography
                    variant="subtitle2"
                    noWrap
                    className={classes.toolbarHeader}
                    style={{ color: "#9A9A9A" }}
                  >
                    Profile
                  </Typography>
                </RouterLink>
                <RouterLink
                  to="/Users/orderform"
                  style={{ textDecoration: "none", paddingRight: "30px" }}
                >
                  <Typography
                    variant="subtitle2"
                    noWrap
                    className={classes.toolbarHeader}
                    style={{ color: "#000" }}
                  >
                    Order Form
                  </Typography>
                </RouterLink>
                <RouterLink
                  to="/contact-us"
                  style={{ textDecoration: "none", paddingRight: "30px" }}
                >
                  <Typography
                    variant="subtitle2"
                    noWrap
                    className={classes.toolbarHeader}
                    style={{ color: "#9A9A9A" }}
                  >
                    Contact Us
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden only={["lg"]}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/diola-4f3ff.appspot.com/o/1-diola-logo-new-600x278.png?alt=media&token=20342a9e-3e59-44f6-a955-4c34864c27f5"
              alt="logo"
              style={{
                width: "120px",
                height: "60px",
                marginLeft: "10px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
          </Hidden>
        </Toolbar>
      </AppBar>
      <Container>
        <Hidden mdDown>
          <Box my={5}>
            <MultiStepForm />
          </Box>
        </Hidden>
        <Hidden only={["lg"]}>
          <MobileView />
        </Hidden>
      </Container>
    </div>
  );
}
