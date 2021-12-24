import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { mainContext } from "../Contexts/MainContext";

export default function DialogNotice(props) {
  const { openPopUp, handlePopupClose } =
    useContext(mainContext);

  return (
    <div>
      <Dialog
        open={openPopUp}
        onClose={handlePopupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.children}</DialogTitle>
        <DialogActions>
          <Button onClick={handlePopupClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
