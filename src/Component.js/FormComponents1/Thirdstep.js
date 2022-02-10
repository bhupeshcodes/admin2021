import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, TextField } from "@material-ui/core";
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
import DialogNotice from "../../Component.js/DiologNotice";
import OtpDialog from "../Dialog/otpDialog";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TimeSlot from "../FormComponents/TimeSlot";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper1: {
    position: "relative",
    height: 750,
    width: 600,
    paddingTop: 3,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 30,
  },
  paper2: {
    height: 600,
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
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

export default function Thirdstep() {
  const classes = useStyles();
  const {
    setStep,
    userData,
    setUserData,
    setOpenPopUp,
    handleOtpOpen,
    hour,
    handleMapOpen,
    time,
    setTime,
  } = useContext(mainContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDays, setSelectedDays] = useState(new Date());
  const [userId, setUserId] = useState("dujgkghl");
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
    <Grid container className={classes.root} spacing={2} justify="center">
      <OtpDialog />
      <DialogNotice>Please Select Available time slot</DialogNotice>
      <Grid item xs={6}>
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper1} elevation={2}>
              <div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#333D47",
                    marginTop: "20px",
                  }}
                >
                  {" "}
                  When would you like your service?{" "}
                </h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <Grid item xs={12}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        shouldDisableDate={disableWeekends}
                        onChange={handleDateChange}
                        disablePast
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
                <h4
                  style={{
                    fontWeight: "600",
                    color: "#333D47",
                  }}
                >
                  {" "}
                  Select a time slot:{" "}
                </h4>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
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
                        <TimeSlot Hour={2} Time={"08am - 10am"} TodayHour={7} />
                        <TimeSlot Hour={2} Time={"10am - 12pm"} TodayHour={9} />
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
                <Grid item xs={12} style={{ marginTop: "20px" }}>
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
                        <TimeSlot Hour={3} Time={"08am - 11am"} TodayHour={7} />
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
                        <TimeSlot Hour={4} Time={"08am - 12pm"} TodayHour={7} />
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
                            setTime("12pm - 04pm");
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
                    ? hour === 5
                      ? todayHour >= 12
                        ? "No avalaible time slot for today. Please Select another date to continue."
                        : null
                      : null
                    : null}
                  {selectedDay === today ? (
                    hour === 5 ? (
                      <div>
                        <TimeSlot Hour={5} Time={"08am - 01pm"} TodayHour={7} />
                        <TimeSlot
                          Hour={5}
                          Time={"01pm - 06pm"}
                          TodayHour={12}
                        />
                      </div>
                    ) : null
                  ) : null}
                  {selectedDay !== today ? (
                    hour === 5 ? (
                      <div>
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          className={
                            time === "08am - 01pm"
                              ? classes.DeactivatedButton
                              : classes.activeButton
                          }
                          onClick={() => {
                            setUserData({
                              ...userData,
                              time: "08am - 01pm",
                            });
                            setTime("08am - 01pm");
                          }}
                        >
                          08am - 01pm
                        </Button>
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          className={
                            time === "01pm - 06pm"
                              ? classes.DeactivatedButton
                              : classes.activeButton
                          }
                          onClick={() => {
                            setUserData({
                              ...userData,
                              time: "01pm - 06pm",
                            });
                            setTime("01am - 06pm");
                          }}
                        >
                          01pm - 06pm
                        </Button>
                      </div>
                    ) : null
                  ) : null}
                  {selectedDay === today
                    ? hour === 6
                      ? todayHour >= 13
                        ? "No avalaible time slot for today. Please Select another date to continue."
                        : null
                      : null
                    : null}
                  {selectedDay === today ? (
                    hour === 6 ? (
                      <div>
                        <TimeSlot Hour={3} Time={"08am - 02pm"} TodayHour={7} />
                        <TimeSlot
                          Hour={3}
                          Time={"02pm - 08pm"}
                          TodayHour={13}
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
                    ? hour === 7
                      ? todayHour >= 7
                        ? "No avalaible time slot for today. Please Select another date to continue."
                        : null
                      : null
                    : null}
                  {selectedDay === today ? (
                    hour === 7 ? (
                      <div>
                        <TimeSlot Hour={7} Time={"08am - 03pm"} TodayHour={7} />
                      </div>
                    ) : null
                  ) : null}
                  {selectedDay !== today ? (
                    hour === 7 ? (
                      <div>
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          className={
                            time === "08am - 03pm"
                              ? classes.DeactivatedButton
                              : classes.activeButton
                          }
                          onClick={() => {
                            setUserData({
                              ...userData,
                              time: "08am - 03pm",
                            });
                            setTime("08am - 03pm");
                          }}
                        >
                          08am - 03pm
                        </Button>
                      </div>
                    ) : null
                  ) : null}
                  {selectedDay === today
                    ? hour === 8
                      ? todayHour >= 7
                        ? "No avalaible time slot for today. Please Select another date to continue."
                        : null
                      : null
                    : null}
                  {selectedDay === today ? (
                    hour === 8 ? (
                      <div>
                        <TimeSlot Hour={8} Time={"08am - 04pm"} TodayHour={7} />
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
                <h4
                  style={{
                    fontWeight: "600",
                    color: "#333D47",
                  }}
                >
                  {" "}
                  Area/Street No. (Optional){" "}
                </h4>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Area/Street No."
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        address1: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <h4
                  style={{
                    fontWeight: "600",
                    color: "#333D47",
                  }}
                >
                  {" "}
                  Villa/Flat No. (Optional){" "}
                </h4>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Villa/Flat No."
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        address2: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <h4
                      style={{
                        fontWeight: "600",
                        color: "#333D47",
                        paddingTop: "10px",
                      }}
                    >
                      Do you want to change your address?
                    </h4>
                  </Grid>
                  <Grid
                    item
                    xs={6}
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
                <Divider style={{ marginTop: 20 }} light />
                <div
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    width: "80%",
                  }}
                >
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          style={{ paddingLeft: 50, paddingRight: 50 }}
                          variant="contained"
                          size="large"
                          onClick={() => {
                            setStep(2);
                            setUserData({ ...userData, time: "Select Time" });
                            setTime("Select Time");
                          }}
                        >
                          Previous
                        </Button>
                        <span></span>
                      </Grid>
                      <Grid item xs={6} style={{ paddingLeft: 120 }}>
                        <Button
                          style={{ paddingLeft: 62, paddingRight: 62 }}
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
                            }else if (
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
      <Grid item xs={4}>
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper2} elevation={2}>
              <div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        CITY
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.city}</h5>
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
                  <h3 style={{ fontWeight: "600", color: "#333D47" }}>
                    SERVICE DETAILS
                  </h3>
                </div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "200", color: "#8CA0B3" }}>
                        Cleaning Type
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.CleaningType}
                      </h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Frequency
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.frequency}</h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Duration
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.Duration} Hours
                      </h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={8}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Number of Professionals
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.NumberofProfessionals}
                      </h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Material
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.Material}</h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Date
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Time
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      {userData.date === "2014-08-18 21:11:54" ? (
                        <h5 style={{ color: "#333D47" }}></h5>
                      ) : (
                        <h5 style={{ color: "#333D47" }}>{userData.time}</h5>
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
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Address
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.address}</h5>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
