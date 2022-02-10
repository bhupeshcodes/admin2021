import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { mainContext } from "../../Contexts/MainContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import OtpDialog from "../Dialog/otpDialog";
import DialogNotice from "../DiologNotice";
import TimeSlot from "../FormComponents/TimeSlot";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    position: "relative",
  },
  paper1: {
    position: "relative",
    height: 800,
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
  activeButton: {
    margin: "3px",
  },
  DeactivatedButton: {
    backgroundColor: "#3C4B64",
    color: "#fff",
    margin: "3px",
    "&:hover": {
      backgroundColor: "#3C4B64",
      color: "#fff",
      margin: "3px",
    },
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

export default function Thirdstep() {
  const classes = useStyles();
  const {
    setStep,
    userData,
    setUserData,
    openDetialsPopUp,
    setOpenDetailsPopUp,
    handleOtpOpen,
    setTime,
    time,
    hour,
    handleMapOpen,
    setOpenPopUp,
  } = useContext(mainContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDays, setSelectedDays] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTime("")
    setUserData({
      ...userData,
      date: `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )}`,
      time: ""
    });
  };
  const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);

  function disableWeekends(date) {
    return date.getDay() === 6;
  }

  const [userId, setUserId] = useState("dujgkghl");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authUser")) && userId === "dujgkghl") {
      setUserId(JSON.parse(localStorage.getItem("authUser")).uid);
    }
    if (selectedDate !== "") {
      setUserData({
        ...userData,
        date: `${pad(selectedDate.getFullYear(), 4)}-${pad(
          selectedDate.getMonth() + 1
        )}-${pad(selectedDate.getDate())}`,
      });
      setSelectedDays(String(selectedDate.getDate()).padStart(2, "0"));
    }
  }, [userId, selectedDate, selectedDays]);

  const todayHour = new Date().getHours();
  const today = String(new Date().getDate()).padStart(2, "0");
  const selectedDay = selectedDays;
  const input = userData.date;
  const [date, time1] = input.split(" ");
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <OtpDialog />
        <DialogNotice>Please enter valid date and time</DialogNotice>
        <Grid item xs={7}>
          <Grid container justify="center">
            <Grid item>
              <Paper className={classes.paper1} elevation={2}>
                <div>
                  <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>
                    {" "}
                    When would you like your service?{" "}
                  </h4>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label=""
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        shouldDisableDate={disableWeekends}
                        onChange={handleDateChange}
                        disablePast
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: "20px", marginLeft: "50px" }}
                      >
                        {selectedDay === today
                          ? hour === 2
                            ? todayHour >= 17
                              ? "No avalaible time slot for today. Please Select another date to continue."
                              : null
                            : null
                          : null}
                        {selectedDay === today ? (
                          hour === 2 ? (
                            <div>
                              <TimeSlot
                                Hour={2}
                                Time={"08am - 10am"}
                                TodayHour={7}
                              />
                              <TimeSlot
                                Hour={2}
                                Time={"10am - 12pm"}
                                TodayHour={9}
                              />
                              <TimeSlot
                                Hour={2}
                                Time={"12pm - 02pm"}
                                TodayHour={11}
                              />
                              <TimeSlot
                                Hour={2}
                                Time={"02pm - 04pm"}
                                TodayHour={13}
                              />
                              <TimeSlot
                                Hour={2}
                                Time={"04pm - 06pm"}
                                TodayHour={15}
                              />
                              <TimeSlot
                                Hour={2}
                                Time={"06pm - 08pm"}
                                TodayHour={17}
                              />
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay !== today ? (
                          hour === 2 ? (
                            <div>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "08am - 10am"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "08am - 10am",
                                  });
                                  setTime("08am - 10am");
                                }}
                              >
                                08am - 10am
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "10am - 12pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "10am - 12pm",
                                  });
                                  setTime("10am - 12pm");
                                }}
                              >
                                10am - 12pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "12pm - 02pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "12pm - 02pm",
                                  });
                                  setTime("12pm - 02pm");
                                }}
                              >
                                12pm - 02pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "02pm - 04pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "02pm - 04pm",
                                  });
                                  setTime("02pm - 04pm");
                                }}
                              >
                                02pm - 04pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "04pm - 06pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "04pm - 06pm",
                                  });
                                  setTime("04pm - 06pm");
                                }}
                              >
                                04pm - 06pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "06pm - 08pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "06pm - 08pm",
                                  });
                                  setTime("06pm - 08pm");
                                }}
                              >
                                06pm - 08pm
                              </Button>
                            </div>
                          ) : null
                        ) : null}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: "20px", marginLeft: "50px" }}
                      >
                        {selectedDay === today
                          ? hour === 3
                            ? todayHour >= 16
                              ? "No avalaible time slot for today. Please Select another date to continue."
                              : null
                            : null
                          : null}
                        {selectedDay === today ? (
                          hour === 3 ? (
                            <div>
                              <TimeSlot
                                Hour={3}
                                Time={"08am - 11am"}
                                TodayHour={7}
                              />
                              <TimeSlot
                                Hour={3}
                                Time={"11am - 02pm"}
                                TodayHour={10}
                              />
                              <TimeSlot
                                Hour={3}
                                Time={"02pm - 05pm"}
                                TodayHour={13}
                              />
                              <TimeSlot
                                Hour={3}
                                Time={"05pm - 08pm"}
                                TodayHour={16}
                              />
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay !== today ? (
                          hour === 3 ? (
                            <div>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "08am - 11am"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "08am - 11am",
                                  });
                                  setTime("08am - 11am");
                                }}
                              >
                                08am - 11am
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "11am - 02pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "11am - 02pm",
                                  });
                                  setTime("11am - 02pm");
                                }}
                              >
                                11am - 02pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "02pm - 05pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "02pm - 05pm",
                                  });
                                  setTime("02pm - 05pm");
                                }}
                              >
                                02pm - 05pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "05pm - 08pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "05pm - 08pm",
                                  });
                                  setTime("05pm - 08pm");
                                }}
                              >
                                05pm - 08pm
                              </Button>
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay === today
                          ? hour === 4
                            ? todayHour >= 15
                              ? "No avalaible time slot for today. Please Select another date to continue."
                              : null
                            : null
                          : null}
                        {selectedDay === today ? (
                          hour === 4 ? (
                            <div>
                              <TimeSlot
                                Hour={4}
                                Time={"08am - 12pm"}
                                TodayHour={7}
                              />
                              <TimeSlot
                                Hour={4}
                                Time={"12pm - 04pm"}
                                TodayHour={11}
                              />
                              <TimeSlot
                                Hour={4}
                                Time={"04pm - 08pm"}
                                TodayHour={15}
                              />
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay !== today ? (
                          hour === 4 ? (
                            <div>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "08am - 12pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "08am - 12pm",
                                  });
                                  setTime("08am - 12pm");
                                }}
                              >
                                08am - 12pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "12pm - 04pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "12pm - 04pm",
                                  });
                                  setTime("08am - 12pm");
                                }}
                              >
                                12pm - 04pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "04pm - 08pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "04pm - 08pm",
                                  });
                                  setTime("04pm - 08pm");
                                }}
                              >
                                04pm - 08pm
                              </Button>
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay === today
                          ? hour === 6
                            ? todayHour >= 11
                              ? "No avalaible time slot for today. Please Select another date to continue."
                              : null
                            : null
                          : null}
                        {selectedDay === today ? (
                          hour === 6 ? (
                            <div>
                              <TimeSlot
                                Hour={3}
                                Time={"08am - 02pm"}
                                TodayHour={7}
                              />
                              <TimeSlot
                                Hour={3}
                                Time={"02pm - 08pm"}
                                TodayHour={11}
                              />
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay !== today ? (
                          hour === 6 ? (
                            <div>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "08am - 02pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "08am - 02pm",
                                  });
                                  setTime("08am - 02pm");
                                }}
                              >
                                08am - 02pm
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "02pm - 08pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "02pm - 08pm",
                                  });
                                  setTime("02pm - 08pm");
                                }}
                              >
                                02pm - 08pm
                              </Button>
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay === today
                          ? hour === 8
                            ? todayHour >= 15
                              ? "No avalaible time slot for today. Please Select another date to continue."
                              : null
                            : null
                          : null}
                        {selectedDay === today ? (
                          hour === 8 ? (
                            <div>
                              <TimeSlot
                                Hour={8}
                                Time={"08am - 04pm"}
                                TodayHour={7}
                              />
                            </div>
                          ) : null
                        ) : null}
                        {selectedDay !== today ? (
                          hour === 8 ? (
                            <div>
                              <Button
                                variant="outlined"
                                size="large"
                                color="primary"
                                className={
                                  time === "08am - 02pm"
                                    ? classes.DeactivatedButton
                                    : classes.activeButton
                                }
                                onClick={() => {
                                  setUserData({
                                    ...userData,
                                    time: "08am - 02pm",
                                  });
                                  setTime("08am - 02pm");
                                }}
                              >
                                08am - 04pm
                              </Button>
                            </div>
                          ) : null
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <h4
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            paddingLeft: 30,
                          }}
                        >
                          Area/Street No. (Optional)
                        </h4>
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              address1: e.target.value,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <h4
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            paddingLeft: 30,
                          }}
                        >
                          Villa/Flat No. (Optional)
                        </h4>
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              address2: e.target.value,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <h4
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            paddingLeft: 30,
                          }}
                        >
                          Do you want to change your address?
                        </h4>
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          endIcon={<ArrowDropDownIcon />}
                          onClick={handleMapOpen}
                        >
                          Click Here
                        </Button>
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>

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
                            onClick={() => {
                              setOpenDetailsPopUp(true);
                            }}
                          >
                            Booking Details
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ marginRight: -50 }}>
                          <Button
                            style={{ paddingLeft: 50, paddingRight: 50 }}
                            variant="contained"
                            size="large"
                            onClick={() => {
                              setStep(2);
                              setUserData({ ...userData, time: "Select Time" });
                              setTime("Select Time");
                            }}
                            color="secoundary"
                          >
                            Prev
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 50 }}>
                          <Button
                            style={{ paddingLeft: 50, paddingRight: 50 }}
                            variant="contained"
                            size="large"
                            onClick={() => {
                              if (
                                userData.date === "2014-08-18 21:11:54" &&
                                userData.time === ""
                              ) {
                                setOpenPopUp(true);
                              } else if (
                                userData.date !== "2014-08-18 21:11:54" &&
                                userData.time === ""
                              ) {
                                setOpenPopUp(true);
                              } else if (
                                userData.date === "2014-08-18 21:11:54" &&
                                userData.time !== ""
                              ) {
                                setOpenPopUp(true);
                              } else {
                                if (userId !== "dujgkghl") {
                                  setStep(4);
                                } else {
                                  handleOtpOpen();
                                }
                              }
                            }}
                            color="primary"
                          >
                            Next
                          </Button>
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
        onClose={() => {
          setOpenDetailsPopUp(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openDetialsPopUp}
      >
        <DialogTitle
          id="customized-dialog-title"
          handlePopupClose={() => {
            setOpenDetailsPopUp(false);
          }}
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
                            <h5 style={{ color: "#333D47" }}>Select a date</h5>
                          ) : (
                            <h5 style={{ color: "#333D47" }}>{date}</h5>
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
                            <h5>{userData.time}</h5>
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
