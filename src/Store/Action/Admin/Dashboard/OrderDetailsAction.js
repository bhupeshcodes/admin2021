import { firestore } from "../../../../Firebase";

export const loadOrderDetails = (onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("order")
      .orderBy("date", "desc")
      .where("Assinged", "==", true)
      .where("Complete", "==", false)
      .get()
      .then((querySnapshot) => {
        let orderDetails = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            orderDetails.push(doc.data());
          });
          dispatch({
            type: "LOAD_ORDERDETAILS",
            payload: orderDetails,
          });
          onSuccess();
        }else {
          onSuccess();
        }
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};

export const loadOrderDetail = (date, onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("order")
      .where("Assinged", "!=", "")
      .where("Complete", "==", false)
      .where("date", "==", date)
      .get()
      .then((querySnapshot) => {
        let orderDetail = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            orderDetail.push(doc.data());
          });
          dispatch({
            type: "LOAD_ORDERDETAIL",
            payload: orderDetail,
          });
          onSuccess();
        }
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};

export const addorder = (data, onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("order")
      .doc(data.VinNumber)
      .set(data)
      .then(function (doc) {
        dispatch({ type: "ADD_ORDER", payload: data });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};

export const updateorder = (data, onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("order")
      .doc(data.VinNumber)
      .update(data)
      .then(function (doc) {
        dispatch({ type: "UPDATE_ORDER", payload: data });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};
