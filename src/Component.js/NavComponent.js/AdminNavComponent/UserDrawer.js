import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import { mainContext } from "../../../Contexts/MainContext";

const useStyles = makeStyles({
  list: {
    width: 450,
  },
});

export default function UsersDrawer() {
  const classes = useStyles();
  const { userstate, toggleUserDrawer } = useContext(mainContext);

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleUserDrawer(false)}
      onKeyDown={toggleUserDrawer(false)}
    >
      <List></List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="right"
          open={userstate}
          onClose={toggleUserDrawer(false)}
          onOpen={toggleUserDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
