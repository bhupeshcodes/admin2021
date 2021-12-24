import { firestore } from "../../../../Firebase";

export const loadOrder = (onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("order")
      .orderBy("date", "desc")
      .where("Assinged", "==", false)
      .where("rejected", "==", false)
      .get()
      .then((querySnapshot) => {
        let order = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            order.push(doc.data());
          });
          dispatch({
            type: "LOAD_ORDER",
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
      .doc(data.uid)
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
