import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useField, useFormikContext } from "formik";
import { TextField } from "@material-ui/core";
import { firestore } from "../../Firebase";
import { mainContext } from "../../Contexts/MainContext";

const DistrictAutocomplete = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [options, setOptions] = useState([]);
  const { formState } = useContext(mainContext);

  const [field, meta] = useField(name);
  const handleClick = (value) => {
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
  };
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  useEffect(() => {
    const Districts = [];
    if (formState !== "") {
      firestore
        .collection("States")
        .doc(formState)
        .collection("Districts")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              Districts.push(doc.data());
            });
            setOptions(Districts);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formState]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.title}
      id="controlled-demo"
      onChange={(event, newValue) => {
        if (newValue) {
          handleClick(newValue.title);
        }
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" {...configSelect} />
      )}
    />
  );
};

export default DistrictAutocomplete;
