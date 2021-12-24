import { firestore } from "../../../Firebase";

export const loadSubOrder = (onSuccess, onError, user) => {
  return (dispatch) => {
    let authUser = JSON.parse(localStorage.getItem("authUser"));
    let auth = authUser.username;
    firestore
      .collection("order")
      .orderBy("date", "desc")
      .where("Assinged", "==", true)
      .where("Driver", "==", auth)
      .where("Complete", "==", false)
      .get()
      .then((querySnapshot) => {
        let suborder = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            suborder.push(doc.data());
          });
          dispatch({
            type: "LOAD_SUBORDER",
            payload: suborder,
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
