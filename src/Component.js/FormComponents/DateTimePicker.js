import { TextField } from "@material-ui/core";
import React from "react";
import { useField } from "formik";

const DateTimePicker = ({ name, initialValue, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <div>
      <TextField {...configDateTimePicker} />
    </div>
  );
};

export default DateTimePicker;
