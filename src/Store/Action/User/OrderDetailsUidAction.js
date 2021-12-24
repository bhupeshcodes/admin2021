import { firestore } from "../../../Firebase";

export const OrderDetailsUidAction = (onSuccess, onError) => {
  return (dispatch, getState) => {
    const uid = JSON.parse(localStorage.getItem("authUser")).uid;
    firestore
      .collection("userorder")
      .doc(uid)
      .collection("orders")
      .orderBy("count", "desc")
      .get()
      .then((querySnapshot) => {
        let order = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            order.push(doc.data());
          });
          dispatch({
            type: "LOAD_ORDER_DETAILS_UID",
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
  };
};
