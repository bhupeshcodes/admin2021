import { Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { mainContext } from "../../Contexts/MainContext";

const useStyles = makeStyles(() => ({
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
  DeactivatedButton2: {
    backgroundColor: "#f7f7f7",
    color: "#E0E0E0",
    margin: "3px",
    "&:hover": {
      backgroundColor: "#f7f7f7",
      color: "#E0E0E0",
      margin: "3px",
    },
  },
}));

const TimeSlot = (props) => {
  const classes = useStyles();
  const todayHour = new Date().getHours();
  const { userData, setUserData, setTime, hour, time } =
    useContext(mainContext);
  return hour === props.Hour ? (
    todayHour < props.TodayHour ? (
      <Button
        variant="outlined"
        size="large"
        color="primary"
        className={
          time === props.Time ? classes.DeactivatedButton : classes.activeButton
        }
        onClick={() => {
          setUserData({ ...userData, time: props.Time });
          setTime(props.Time);
        }}
      >
        {props.Time}
      </Button>
    ) : <Button
    variant="outlined"
    size="large"
    className={classes.DeactivatedButton2}
  >
    {props.Time}
  </Button>
  ) : null;
};

export default TimeSlot;
