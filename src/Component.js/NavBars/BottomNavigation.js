import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import EmailIcon from "@material-ui/icons/Email";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginLeft: "-20px",
    position: "fixed",
    bottom: 0,
    overflow: "hidden",
  },
});

const BottomNav = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("BookNow");
  if (value === "Account") {
    props.history.push("/Users/Details");
  } else if (value === "ContactUs") {
    props.history.push("/contact-us");
  } else if (value === "Home") {
    props.history.push("/Home");
  }
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Account"
        value="Account"
        icon={<PersonIcon />}
      />
      <BottomNavigationAction
        label="Book Now"
        value="BookNow"
        icon={<ShoppingCartIcon />}
      />
      <BottomNavigationAction
        label="Contact us"
        value="ContactUs"
        icon={<EmailIcon />}
      />
    </BottomNavigation>
  );
};

export default withRouter(BottomNav);
