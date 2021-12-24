import { db } from "../../../../Firebase";

export const loadblocked = (onSuccess) => {
  return (dispatch) => {
    db.ref("users").on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      
      const userAuth = usersList.filter((person) => person.blocked === true);
      dispatch({
        type: "LOAD_BLOCKED",
        payload: userAuth,
      });
      onSuccess();
    });
  };
};
