import { firestore } from "../../../../Firebase";

export const loadStates = (onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("States")
      .get()
      .then((querySnapshot) => {
        let states = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            states.push(doc.data());
          });
          dispatch({
            type: "LOAD_STATES",
            payload: states,
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

export const addStates = (data, onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("States")
      .doc(data.uid)
      .set(data)
      .then(function (doc) {
        dispatch({ type: "ADD_STATES", payload: data });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};

export const updateStates = (data, onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("States")
      .doc(data.uid)
      .update(data)
      .then(function (doc) {
        dispatch({ type: "UPDATE_STATES", payload: data });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};
