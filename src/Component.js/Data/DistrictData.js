import { firestore } from "../../Firebase";

const Districts = [];
firestore
  .collection("District")
  .get()
  .then((querySnapshot) => {
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        Districts.push(doc.data());
      });
      console.log(Districts);
    }
  })
  .catch((error) => {
    console.log(error);
  });

export default Districts;
