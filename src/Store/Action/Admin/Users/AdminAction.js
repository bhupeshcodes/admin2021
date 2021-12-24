import { db } from "../../../../Firebase";

export const loadAdmin = (onSuccess) => {
  return (dispatch) => {
    db.ref("users").on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      const userAuth = usersList.filter((person) => person.auth1 === "Admin");
      const userAuth1 = userAuth.filter((person) => person.blocked === false);
      dispatch({
        type: "LOAD_ADMIN",
        payload: userAuth1,
      });
      onSuccess();
    });
  };
};
