import { firestore } from "../../../../Firebase";

export const loadDistricts = (Districts, onSuccess, onError, empty) => {
  return (dispatch, getState) => {
    firestore
      .collection("States")
      .doc(Districts)
      .collection("Districts")
      .get()
      .then((querySnapshot) => {
        let Districts = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            Districts.push(doc.data());
          });
          dispatch({ type: "LOAD_DISTRICTS", payload: Districts });
          onSuccess();
        } else if (querySnapshot.empty) {
          querySnapshot = empty;
          onSuccess(querySnapshot);
        }
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};

export const addDistricts = (Districts, data, onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("States")
      .doc(Districts)
      .collection("Districts")
      .doc(data.uid)
      .set(data)
      .then(function (doc) {
        dispatch({ type: "ADD_DISTRICTS", payload: data });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};

export const updateDistricts = (Districts, data, onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("States")
      .doc(Districts)
      .collection("Districts")
      .doc(data.uid)
      .update(data)
      .then(function (doc) {
        dispatch({ type: "UPDATE_DISTRICTS", payload: data });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        onError();
      });
  };
};
