import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  TextField,
} from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    position: "relative",
  },
  paper1: {
    position: "relative",
    height: 900,
    width: 380,
    paddingRight: 20,
    paddingBottom: 50,
  },
  paper2: {
    height: 600,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
  closeButton: {
    color: "#f7f7f7",
  },
}));

const DialogTitle = (props) => {
  const { children, handlePopupClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={10}>
          <Typography variant="h6">{children}</Typography>
        </Grid>
        <Grid item xs={2}>
          {handlePopupClose ? (
            <IconButton aria-label="close" onClick={handlePopupClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </MuiDialogTitle>
  );
};

export default function Secoundstep() {
  const classes = useStyles();
  const {
    setStep,
    userData,
    setUserData,
    handlePopupOpen,
    handlePopupClose,
    openPopUp,
    hour,
    setHour,
    setNumberofProfessionals,
    NumberofProfessionals,
    setMaterial,
  } = useContext(mainContext);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={7}>
          <Grid container justify="center">
            <Grid item>
              <Paper className={classes.paper1} elevation={2}>
                <div>
                  <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>
                    {" "}
                    How many hours do you need your professional to stay?{" "}
                  </h4>
                  <div className="togglebutton" style={{ paddingLeft: "30px" }}>
                    {hour === 2 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        2
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          margin: "3px",
                        }}
                        onClick={() => {
                          setUserData({ ...userData, Duration: 2 });
                          setHour(2);
                        }}
                      >
                        2
                      </Button>
                    )}
                    {hour === 3 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        3
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          margin: "3px",
                        }}
                        onClick={() => {
                          setUserData({ ...userData, Duration: 3 });
                          setHour(3);
                        }}
                      >
                        3
                      </Button>
                    )}
                    {hour === 4 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        4
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          margin: "3px",
                        }}
                        onClick={() => {
                          setUserData({ ...userData, Duration: 4 });
                          setHour(4);
                        }}
                      >
                        4
                      </Button>
                    )}
                    {hour === 5 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        5
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          margin: "3px",
                        }}
                        onClick={() => {
                          setUserData({ ...userData, Duration: 5 });
                          setHour(5);
                        }}
                      >
                        5
                      </Button>
                    )}
                    {hour === 6 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        6
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          margin: "3px",
                        }}
                        onClick={() => {
                          setUserData({ ...userData, Duration: 6 });
                          setHour(6);
                        }}
                      >
                        6
                      </Button>
                    )}
                    {hour === 7 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        7
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          margin: "3px",
                        }}
                        onClick={() => {
                          setUserData({ ...userData, Duration: 7 });
                          setHour(7);
                        }}
                      >
                        7
                      </Button>
                    )}
                    {hour === 8 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        8
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          margin: "3px",
                        }}
                        onClick={() => {
                          setUserData({ ...userData, Duration: 8 });
                          setHour(8);
                        }}
                      >
                        8
                      </Button>
                    )}
                  </div>
                  <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>
                    {" "}
                    How many professionals do you need?{" "}
                  </h4>
                  <div style={{ paddingLeft: "30px" }}>
                    <div className="togglebutton">
                      {NumberofProfessionals === 1 ? (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          disabled
                          style={{
                            backgroundColor: "#3C4B64",
                            color: "#fff",
                            margin: "3px",
                          }}
                        >
                          1
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          style={{
                            margin: "3px",
                          }}
                          onClick={() => {
                            setUserData({
                              ...userData,
                              NumberofProfessionals: 1,
                            });
                            setNumberofProfessionals(1);
                          }}
                        >
                          1
                        </Button>
                      )}
                      {NumberofProfessionals === 2 ? (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          disabled
                          style={{
                            backgroundColor: "#3C4B64",
                            color: "#fff",
                            margin: "3px",
                          }}
                        >
                          2
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          style={{
                            margin: "3px",
                          }}
                          onClick={() => {
                            setUserData({
                              ...userData,
                              NumberofProfessionals: 2,
                            });
                            setNumberofProfessionals(2);
                          }}
                        >
                          2
                        </Button>
                      )}
                      {NumberofProfessionals === 3 ? (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          disabled
                          style={{
                            backgroundColor: "#3C4B64",
                            color: "#fff",
                            margin: "3px",
                          }}
                        >
                          3
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          style={{
                            margin: "3px",
                          }}
                          onClick={() => {
                            setUserData({
                              ...userData,
                              NumberofProfessionals: 3,
                            });
                            setNumberofProfessionals(3);
                          }}
                        >
                          3
                        </Button>
                      )}
                      {NumberofProfessionals === 4 ? (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          disabled
                          style={{
                            backgroundColor: "#3C4B64",
                            color: "#fff",
                            margin: "3px",
                          }}
                        >
                          4
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          style={{
                            margin: "3px",
                          }}
                          onClick={() => {
                            setUserData({
                              ...userData,
                              NumberofProfessionals: 4,
                            });
                            setNumberofProfessionals(4);
                          }}
                        >
                          4
                        </Button>
                      )}
                      {NumberofProfessionals === 5 ? (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          disabled
                          style={{
                            backgroundColor: "#3C4B64",
                            color: "#fff",
                            margin: "3px",
                          }}
                        >
                          5
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          style={{
                            margin: "3px",
                          }}
                          onClick={() => {
                            setUserData({
                              ...userData,
                              NumberofProfessionals: 5,
                            });
                            setNumberofProfessionals(5);
                          }}
                        >
                          5
                        </Button>
                      )}
                    </div>
                  </div>
                  <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>
                    {" "}
                    Do you require cleaning materials?{" "}
                  </h4>
                  <div style={{ paddingLeft: "30px" }}>
                    {userData.Material === "No" ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        No, I have them.
                      </Button>
                    ) : hour === 0 || hour === 2 || hour === 3 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        onClick={() => {
                          setUserData({ ...userData, Material: "No" });
                          setMaterial("No");
                        }}
                      >
                        No, I have them.
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        onClick={() => {
                          setUserData({ ...userData, Material: "No" });
                          setMaterial("No");
                        }}
                      >
                        No, I have them.
                      </Button>
                    )}
                    {userData.Material === "Yes" ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        style={{
                          backgroundColor: "#3C4B64",
                          color: "#fff",
                          margin: "3px",
                        }}
                      >
                        Yes, Please.
                      </Button>
                    ) : hour === 0 || hour === 2 || hour === 3 ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        onClick={() => {
                          setUserData({ ...userData, Material: "Yes" });
                          setMaterial("Yes");
                        }}
                      >
                        Yes, Please.
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        onClick={() => {
                          setUserData({ ...userData, Material: "Yes" });
                          setMaterial("Yes");
                        }}
                      >
                        Yes, Please.
                      </Button>
                    )}

                    <Grid item xs={12}>
                      <h4 style={{ paddingTop: "20px" }}>
                        {" "}
                        Instructions if any (Optional)
                      </h4>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={userData.instructions}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            instructions: e.target.value,
                          });
                        }}
                      />
                    </Grid>
                  </div>
                  <div
                    style={{
                      position: "fixed",
                      bottom: 0,
                      overflow: "hidden",
                      width: "100%",
                      marginLeft: "-20px",
                      paddingRight: "30px",
                      paddingLeft: "30px",
                      paddingTop: "10px",
                      paddingBottom: "60px",
                      backgroundColor: "#fff",
                      color: "#fff",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid
                        container
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            endIcon={<ArrowDropDownIcon />}
                            onClick={handlePopupOpen}
                          >
                            Booking Details
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ marginRight: -50 }}>
                          <Button
                            style={{ paddingLeft: 50, paddingRight: 50 }}
                            variant="contained"
                            size="large"
                            onClick={() => setStep(1)}
                            color="secoundary"
                          >
                            Prev
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 50 }}>
                          {hour === 0 || hour === 2 || hour === 3 ? (
                            <Button
                              style={{ paddingLeft: 50, paddingRight: 50 }}
                              variant="contained"
                              size="large"
                              onClick={() => {
                                setStep(3);
                              }}
                              color="primary"
                            >
                              Next
                            </Button>
                          ) : (
                            <Button
                              style={{ paddingLeft: 50, paddingRight: 50 }}
                              variant="contained"
                              size="large"
                              onClick={() => {
                                setStep(3);
                              }}
                              color="primary"
                            >
                              Next
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        onClose={handlePopupClose}
        aria-labelledby="customized-dialog-title"
        open={openPopUp}
      >
        <DialogTitle
          id="customized-dialog-title"
          handlePopupClose={handlePopupClose}
        >
          Order Details
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <div>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>CITY</h5>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          <h5>{userData.city}</h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <div
                      style={{
                        marginTop: -5,
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h4>SERVICE DETAILS</h4>
                    </div>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>Cleaning Type</h5>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          <h5>{userData.CleaningType}</h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>Frequency</h5>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          <h5>{userData.frequency}</h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>Duration</h5>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          <h5>{userData.Duration} Hours</h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>Number of Professionals</h5>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          <h5>{userData.NumberofProfessionals}</h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>Material</h5>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          <h5>{userData.Material}</h5>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={5}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>DATE</h5>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          {userData.date === "2014-08-18 21:11:54" ? (
                            <h5></h5>
                          ) : (
                            <h5></h5>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid
                          item
                          xs={5}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>TIME</h5>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          style={{
                            textAlign: "right",
                            marginTop: 10,
                            marginBottom: 5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          {userData.date === "2014-08-18 21:11:54" ? (
                            <h5></h5>
                          ) : (
                            <h5></h5>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "left",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                            textDecoration: "bold",
                          }}
                        >
                          <h5>ADDRESS</h5>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          style={{
                            textAlign: "right",
                            marginTop: -5,
                            marginBottom: -5,
                            paddingRight: 50,
                            paddingLeft: 50,
                          }}
                        >
                          <h5>{userData.address}</h5>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
