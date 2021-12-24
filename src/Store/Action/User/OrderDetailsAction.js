import { firestore } from "../../../Firebase";

export const loadOrderDetailsAction = (order, onSuccess, onError) => {
  return (dispatch, getState) => {
    for (var i = 0; i < order.length; ++i) {
      const result = order[i].uid;
      firestore
      .collection("order")
      .where("uid", "==", result)
      .get()
      .then((querySnapshot) => {
        let order = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              order.push(doc.data());
            });
            dispatch({
              type: "LOAD_ORDER_DETAILS",
              payload: order,
            });
            onSuccess();
          } else {
            console.log("error");
            onSuccess();
          }
        })
        .catch((error) => {
          console.log(error);
          onError();
        });
    }
  };
};
