import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { withFirebase } from "../../../UsersComponents/Firebase";
import { withAuthorization } from "../../../UsersComponents/Session";
import { compose } from "redux";
import * as ROLES from "../../../UsersComponents/constants/roles";
import DriverTableFragment from "../../../Tables/Admin/UserTables/DriverTableFragment";
import DriverSignUpFragment from "../../../UsersComponents/SignUpFragments/DriverSignUpFragment";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DriverFragment = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginLeft: 30 }}
      >
        Add Driver
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DriverSignUpFragment />
      </Dialog>
      <br />
      <br />
      <br />
      <DriverTableFragment />
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(DriverFragment);
