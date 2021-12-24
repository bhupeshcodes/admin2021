import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { UseForm, Form } from "./UseForm";
import { addDistricts } from "../../../Store/Action/Admin/RegistrationArea/DistrictAction";
import Input from "../../../Component.js/AdminFormComponents/InputComponent";
import Button from "../../../Component.js/AdminFormComponents/ButtonComponent";
import { firestore } from "../../../Firebase";

const intialFValues = {
  title: "District",
};

function StateForm(props) {
  const { district, addDistricts } = props;

  const { values, handleInputChange } = UseForm(intialFValues);

  const handleSubmit = (newDistrictRef, data, newData) => {
    newDistrictRef = firestore
      .collection("States")
      .doc(district)
      .collection("Districts")
      .doc();
    console.log(newDistrictRef);
    newData = values;
    data = { ...newData, uid: newDistrictRef.id };
    addDistricts(
      district,
      data,
      () => {},
      () => {}
    );
  };

  return (
    <>
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <Input
              name="title"
              label="Title"
              value={values.title}
              onChange={handleInputChange}
            />
          </Grid>
          <div>
            <Button text="Submit" type="Submit" onClick={handleSubmit} />
          </div>
        </Grid>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDistricts: (Districts, data, onSuccess, onError) =>
      dispatch(addDistricts(Districts, data, onSuccess, onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateForm);
