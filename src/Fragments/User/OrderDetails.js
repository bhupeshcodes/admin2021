import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import DetailsCard from "../../Component.js/cards/user/DetailsCard";
import { OrderDetailsUidAction } from "../../Store/Action/User/OrderDetailsUidAction";
import { loadOrderDetailsAction } from "../../Store/Action/User/OrderDetailsAction";
import {
  Backdrop,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    minWidth: "80%",
    color: "#3C4B64",
    marginLeft: "44px",
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 10,
  },
});

const OrderDetails = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState([]);
  const [uid, setUid] = useState([]);
  const [ref, setRef] = useState(true);
  const { orderDetails, orderDetailsUid } = props;
  const loadOrderDetails = () => {
    if (orderDetailsUid.length > 0 && orderDetails.length <= 0) {
      setUid(orderDetailsUid);
      props.loadOrderDetailsAction(
        orderDetailsUid,
        () => {
          setLoading(false);
        },
        () => {
          //error
          setLoading(false);
        }
      );
    } else if (orderDetailsUid.length !== uid.length) {
      window.location.reload();
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    props.OrderDetailsUidAction(
      () => {
        setRef(false);
        loadOrderDetails();
      },
      () => {
        //error
        setLoading(false);
      }
    );
  }, [ref, orderDetails]);

  return (
    <div>
      <Backdrop style={{ zIndex: 500, color: "#ffffff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {orderDetails.length > 0 ? (
        <div>
          <Grid container>
            <Grid container className={classes.root}>
              <Grid item xs={2}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Ref. id
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  City
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Date
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Time
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Status
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DetailsCard orderList={orderDetails} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    orderDetailsUid: state.orderDetailsUid,
    orderDetails: state.orderDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OrderDetailsUidAction: (onSuccess, onError) =>
      dispatch(OrderDetailsUidAction(onSuccess, onError)),
    loadOrderDetailsAction: (onSuccess, onError) =>
      dispatch(loadOrderDetailsAction(onSuccess, onError)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
