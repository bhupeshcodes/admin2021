import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { mainContext } from "../../../Contexts/MainContext";
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    minWidth: "80%",
    backgroundColor: "#ffffff",
    color: "#3C4B64",
    margin: "30px",
  },
  title1: {
    fontSize: 14,
    color: "#3C4B64",
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 10,
  },
});

const DetailsCard = (props) => {
  const classes = useStyles();
  const { orderList } = props;

  const { setSingleOrderDetails } = useContext(mainContext);
  const handleClick = (userData) => {
    setSingleOrderDetails(userData);
    props.history.push("/Users/Details/SingleOrderDetails");
  };
  return (
    <div className="users">
      {orderList !== []
        ? orderList.map((userData) => (
            <Card className={classes.root} key={userData.uid}>
              <CardContent>
                <Grid container>
                  <Grid item lg={2} xs={6}>
                    <Typography
                      className={classes.title1}
                      color="textSecondary"
                      gutterBottom
                    >
                      {userData.uid}
                    </Typography>
                  </Grid>
                  <Grid item lg={3} xs={6}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {userData.city}
                    </Typography>
                  </Grid>
                  <Grid item  lg={2} xs={6}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {userData.date}
                    </Typography>
                  </Grid>
                  <Grid item  lg={2} xs={6}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {userData.time}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {userData.status === "pending" ? (
                      <FiberManualRecordIcon style={{ color: "orange" }} />
                    ) : userData.status === "active" ? (
                      <FiberManualRecordIcon style={{ color: "green" }} />
                    ) : userData.status === "working" ? (
                      <FiberManualRecordIcon style={{ color: "blue" }} />
                    ) : userData.status === "completed" ? (
                      <FiberManualRecordIcon />
                    ) : userData.status === "rejected" ? (
                      <FiberManualRecordIcon style={{ color: "red" }} />
                    ) : null}
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {userData.status}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleClick(userData)} size="small">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))
        : null}
    </div>
  );
};

export default withRouter(DetailsCard);
