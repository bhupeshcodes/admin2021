import React from "react";
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const CheckboxWrapper = ({ name, label, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };
  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  const configFormControl = {};

  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <div>
      <FormControl {...configFormControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label={label}
            {...configCheckbox}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default CheckboxWrapper;
