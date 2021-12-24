import React from "react";
import { useField } from "formik";
import { TextField as DisTextField } from "@material-ui/core";

const TextFielWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <div>
      <DisTextField {...configTextField} />
    </div>
  );
};

export default TextFielWrapper;
