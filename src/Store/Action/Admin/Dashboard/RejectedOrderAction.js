import { firestore } from "../../../../Firebase";

export const loadRejectedOrder = (onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("order")
      .orderBy("date", "desc")
      .where("rejected", "==", true)
      .get()
      .then((querySnapshot) => {
        let order = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            order.push(doc.data());
          });
          dispatch({
            type: "LOAD_ORDER_REJECCTED",
            payload: order,
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
