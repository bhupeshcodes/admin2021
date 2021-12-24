import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 300,
    backgroundColor: "#ffffff",
    color: "#3C4B64",
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 10,
  },
});

const HomeCard = (props) => {
  const classes = useStyles();

  const handleClick = () => {
    props.history.push(props.push);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.title}
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          {props.subtitle}
        </Typography>
        <Typography variant="h3" component="h2">
          {props.value}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(HomeCard);
