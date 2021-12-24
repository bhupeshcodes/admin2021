import React, { useContext } from "react";
import { Box, Button, Step, StepLabel, Stepper } from "@material-ui/core";
import { mainContext } from "../Contexts/MainContext";
import Firststep from "../Component.js/FormComponents1/Firststep";
import Secoundstep from "../Component.js/FormComponents1/Secoundstep";
import Thirdstep from "../Component.js/FormComponents1/Thirdstep";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Forthstep from "../Component.js/FormComponents1/Forthstep";
import LocationDialog from "../Component.js/Dialog/LocationDialog";
import Fifthstep from "../Component.js/FormComponents1/Fifthstep";

export default function MultiStepForm() {
  const { currentStep } = useContext(mainContext);

  function showStep(step) {
    switch (step) {
      case 1:
        return <Firststep />;
      case 2:
        return <Secoundstep />;
      case 3:
        return <Thirdstep />;
      case 4:
        return <Forthstep />;
      case 5:
        return <Fifthstep />;
      default:
        return <Firststep />;
    }
  }
  const { address, handleMapOpen } = useContext(mainContext);

  return (
    <div
      style={{
        backgroundColor: "#FAFDFF",
      }}
    >
      <LocationDialog />
      <header className="App-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Button endIcon={<ArrowDropDownIcon />} onClick={handleMapOpen}>
            {address}
          </Button>
        </div>
        <div className="center-stepper">
          <Stepper
            style={{ width: "80%", backgroundColor: "#FAFDFF", marginTop: "-10px"}}
            alternativeLabel
            activeStep={currentStep - 1}
            orientation="horizontal"
          >
            <Step>
              <StepLabel>Frequency</StepLabel>
            </Step>
            <Step>
              <StepLabel>Service Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Date and Time</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
            <Step>
              <StepLabel>Order Summary</StepLabel>
            </Step>
          </Stepper>
        </div>
        <Box my={1}>{showStep(currentStep)}</Box>
      </header>
    </div>
  );
}
