/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { firestore } from "../../Firebase";

const SelectDistrict = () => {
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

  return (
    <Autocomplete
      id="combo-box-demo"
      options={Districts}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
      )}
    />
  );
};

export default SelectDistrict;
