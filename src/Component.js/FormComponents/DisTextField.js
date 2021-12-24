import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

const TextFielWrapper = ({ name, value, ...otherProps }) => {
  const [field] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    value: value,
    fullWidth: true,
    variant: "outlined",
  };
  return (
    <div>
      <TextField {...configTextField} />
    </div>
  );
};

export default TextFielWrapper;
