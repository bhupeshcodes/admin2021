import React, { useContext } from "react";
import { mainContext } from "../../Contexts/MainContext";
import DistrictAutocomplete from "./DistrictAutocomplete";
import TextField from "./TextField";

const ViewDistrict = (props) => {
  const { step } = useContext(mainContext);

  const showDistrict = (step) => {
    switch (step) {
      case 1:
        return <DistrictAutocomplete name="district" label="District" />;
      case 2:
        return (
          <TextField
            name="district"
            label="District"
            disabled={true}
            fullWidth={false}
            helperText="Please, Select State First"
          />
        );
      default:
        return (
          <TextField
            name="district"
            label="District"
            disabled={true}
            fullWidth={false}
            helperText="Please, Select State First"
          />
        );
    }
  };
  return <div>{showDistrict(step)}</div>;
};

export default ViewDistrict;
