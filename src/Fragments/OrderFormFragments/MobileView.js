import React, { useContext } from "react";
import { Box, Button } from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import Firststep from "../../Component.js/FormComponents2/Firststep";
import Secoundstep from "../../Component.js/FormComponents2/Secoundstep";
import Thirdstep from "../../Component.js/FormComponents2/Thirdstep";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Forthstep from "../../Component.js/FormComponents2/Forthstep";
import BottomNav from "../../Component.js/NavBars/BottomNavigation";
import LocationDialog from "../../Component.js/Dialog/LocationDialog";
import Fifthstep from "../../Component.js/FormComponents2/Fifthstep";

export default function MobileView() {
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
    <div style={{ width: "100%", marginTop: "50px" }}>
      <LocationDialog />
      <div>
        <header className="App-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "80px",
              position: "relative",
              width: "100%",
            }}
          >
            <Button
              style={{ color: "#3C4B64" }}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleMapOpen}
            >
              {address}
            </Button>
          </div>
          <Box>{showStep(currentStep)}</Box>
        </header>
      </div>
      <BottomNav />
    </div>
  );
}
