import React, { createContext, useState } from "react";
import App from "../App";
import ErorrDrawers from "../Component.js/Drawers/ErrorDrawer";
import HomeDrawers from "../Component.js/Drawers/AdminDrawers/HomeDrawers";
import StaffDrawers from "../Component.js/Drawers/StaffDrawers/HomeDrawers";
import SettingDrawers from "../Component.js/Drawers/AdminDrawers/SettingDrawers";
import UsersDrawers from "../Component.js/Drawers/AdminDrawers/UsersDrawers";
import AdminNavbar from "../Component.js/NavBars/AdminNavbar";
import { auth, firestore } from "../Firebase";
import UserNavbar from "../Component.js/NavBars/UserNavbar";
import UserDrawer from "../Component.js/Drawers/UserDrawer";
import HomeDrawersMobile from "../Component.js/MobileDrawer/AdminDrawers/HomeDrawersMobile";
import StaffDrawersMobile from "../Component.js/MobileDrawer/StaffDrawers/HomeDrawersMobile";
import SettingDrawersMobile from "../Component.js/MobileDrawer/AdminDrawers/SettingDrawersMobile";
import UsersDrawersMobile from "../Component.js/MobileDrawer/AdminDrawers/UsersDrawersMobile";
import UserMobileDrawer from "../Component.js/MobileDrawer/UserMobileDrawer";
import SubAdminNavbar from "../Component.js/NavBars/StaffNavbar";
import DriverHomeDrawers from "../Component.js/Drawers/DriverDrawers/DriverHomeDrawers";
import DriverHomeDrawersMobile from "../Component.js/MobileDrawer/DriverDrawers/DriverHomeDrawersMobile";
import DriverNavbar from "../Component.js/NavBars/DriverNavbar";

export const mainContext = createContext();
const Context = () => {
  const [open, setOpen] = useState(true);
  const [state, setState] = useState(false);
  const [userstate, setUserstate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [formState, setFormState] = useState("");
  const [staff1, SetStaff1] = useState({
    username: "",
  });
  const [staff2, SetStaff2] = useState({
    username: "",
  });
  const [staff3, SetStaff3] = useState({
    username: "",
  });
  const [staff4, SetStaff4] = useState({
    username: "",
  });
  const [staff5, SetStaff5] = useState({
    username: "",
  });
  const [Driver, SetDriver] = useState({
    username: "",
  });
  const [loginType, setLoginType] = useState("IsEditor");
  const [loggedIn, setloggedIn] = useState(null);
  const [step, setStep1] = useState(2);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDetialsPopUp, setOpenDetailsPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(false);
  const [vdata, setVdata] = useState(true);
  const [address, setAddress] = useState("Select Address");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [otpPopup, setOtp] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [email, setEmail] = React.useState("");

  const [SignInForm, setSignInForm] = useState(false);
  const [CleaningType, setCleaningType] = useState("General Cleaning");
  const [frequency, setFrequency] = useState("One-time");
  const [hour, setHour] = useState(2);
  const [time, setTime] = useState("");
  const [NumberofProfessionals, setNumberofProfessionals] = useState(1);
  const [Material, setMaterial] = useState("No");
  const [billing, setBilling] = useState(80);
  const [staffDroped, setStaffDroped] = React.useState(false);
  const [staffPicked, setStaffPicked] = React.useState(false);
  const [dropTime, setDropTime] = React.useState("");
  const [pickUpTime, setPickUpTime] = React.useState("");
  const [CoutPopup, setCoutPopup] = React.useState("");
  const [paymentOptions, setPaymentOptions] = React.useState("");
  const [uid, setUid] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [completeOrder, setCompleteOrder] = React.useState(false);
  const [singleOrderDetails, setSingleOrderDetails] = React.useState("");

  const Logout = () => {
    auth.signOut().catch((err) => {
      console.log(err);
    });
    setloggedIn(null);
    setState(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const toggleUserDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setUserstate(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    setOpenPopUp(false);
  };

  const handlePopupOpen = () => {
    setOpenPopUp(true);
  };
  const handleMapClose = () => {
    setMap(false);
  };

  const handleMapOpen = () => {
    setMap(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleOtpOpen = () => {
    setOtp(true);
  };

  const handleOptClose = () => {
    setOtp(false);
  };

  const checkPage = (props) => {
    const {
      location: { pathname },
    } = props;

    const pathnames = pathname.split("/").filter((x) => x);
    const select = `${pathnames[1]}`;
    if (select === "Users") {
      return <UsersDrawers />;
    } else if (select === "Home") {
      return <HomeDrawers />;
    } else if (select === "Dashboard") {
      return <StaffDrawers />;
    } else if (select === "Settings") {
      return <SettingDrawers />;
    } else if (select === "Dashboards") {
      return <DriverHomeDrawers />;
    } else if (select === "Details") {
      return <UserDrawer />;
    } else if (select === "undefined") {
      return <ErorrDrawers />;
    } else {
      return <ErorrDrawers />;
    }
  };

  const checkPageMobile = (props) => {
    const {
      location: { pathname },
    } = props;

    const pathnames = pathname.split("/").filter((x) => x);
    const select = `${pathnames[1]}`;
    if (select === "Users") {
      return <UsersDrawersMobile />;
    } else if (select === "Home") {
      return <HomeDrawersMobile />;
    } else if (select === "Dashboard") {
      return <StaffDrawersMobile />;
    } else if (select === "Dashboards") {
      return <DriverHomeDrawersMobile />;
    } else if (select === "Settings") {
      return <SettingDrawersMobile />;
    } else if (select === "Details") {
      return <UserMobileDrawer />;
    } else if (select === "undefined") {
      return <ErorrDrawers />;
    } else {
      return <ErorrDrawers />;
    }
  };
  const INITIAL_STATE = {
    username: "",
    fullname: "",
    email: "",
    address: "",
    phoneNumber: "",
    blocked: false,
    isUser: true,
    error: null,
  };
  const [details, setDetails] = React.useState({ ...INITIAL_STATE });
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState({
    CleaningType: "General Cleaning",
    name: "",
    fullname: "",
    phoneNumber: "",
    email: "",
    city: "Abu Dhab",
    frequency: "One-time",
    Duration: "2",
    NumberofProfessionals: 1,
    Material: "No",
    address: "W15-02, Abu Dhabi",
    address1: "",
    address2: "",
    date: "2014-08-18 21:11:54",
    time: "",
    Assinged: false,
    Complete: false,
    Amount: 0,
    paymentOptions: "",
    instructions: "",
    latitude: "",
    longitude: "",
    Driver: "",
    staff1: "",
    staff2: "",
    staff3: "",
    staff4: "",
    staff5: "",
    status: "pending",
    rejected: false,
  });
  const [finalData, setFinalData] = useState([]);

  function submitData() {
    setFinalData((finalData) => [...finalData, userData]);
    let neworder = "";
    let neworder1 = "";
    let data = "";
    let data1 = "";
    let data2 = "";
    let uid = JSON.parse(localStorage.getItem("authUser")).uid;
    neworder = firestore.collection("order").doc();
    neworder1 = neworder.id.substring(0, 6);
    setUid(neworder1);
    data = {
      ...userData,
      uid: neworder1,
      Amount: billing,
      paymentType: paymentOptions,
    };
    firestore
      .collection("count")
      .doc(uid)
      .collection("orderCount")
      .get()
      .then((querySnapshot) => {
        let order = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            let order1 = doc.data();
            order.push(order1);
            const count = order1;
            console.log(count);
            data1 = {
              uid: neworder1,
              count: count.count + 1,
            };
            data2 = {
              count: count.count + 1,
            };
            firestore
              .collection("userorder")
              .doc(uid)
              .collection("orders")
              .doc(neworder1)
              .set(data1);
            firestore
              .collection("count")
              .doc(uid)
              .collection("orderCount")
              .doc("count")
              .set(data2);
          });
        } else {
          console.log("error");
          data1 = {
            uid: neworder1,
            count: 1,
          };
          data2 = {
            count: 1,
          };
          firestore
            .collection("userorder")
            .doc(uid)
            .collection("orders")
            .doc(neworder1)
            .set(data1);
          firestore
            .collection("count")
            .doc(uid)
            .collection("orderCount")
            .doc("count")
            .set(data2);
        }
        firestore.collection("order").doc(neworder1).set(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  }
  const checkNavbar = (props) => {
    const {
      location: { pathname },
    } = props;

    const pathnames = pathname.split("/").filter((x) => x);
    const select = `${pathnames[0]}`;
    if (select === "Admin") {
      return <AdminNavbar />;
    } else if (select === "Users") {
      return <UserNavbar />;
    } else if (select === "Staff") {
      return <SubAdminNavbar />;
    } else if (select === "Driver") {
      return <DriverNavbar />;
    } else if (select === "undefined") {
      return <ErorrDrawers />;
    } else {
      return <ErorrDrawers />;
    }
  };

  return (
    <div>
      <mainContext.Provider
        value={{
          toggleDrawer,
          open,
          setOpen,
          state,
          setState,
          checkPage,
          handleDrawerClose,
          Logout,
          anchorEl,
          setAnchorEl,
          handleClick,
          handleClose,
          userstate,
          toggleUserDrawer,
          checkNavbar,
          formState,
          setFormState,
          handleClickOpen,
          handleClickClose,
          currentStep,
          setStep,
          userData,
          setUserData,
          finalData,
          setFinalData,
          submitData,
          loginType,
          setLoginType,
          loggedIn,
          setloggedIn,
          step,
          setStep1,
          openPopUp,
          setOpenPopUp,
          handlePopupClose,
          handlePopupOpen,
          vdata,
          setVdata,
          checkPageMobile,
          address,
          setAddress,
          billing,
          setBilling,
          hour,
          setHour,
          handleMapOpen,
          handleMapClose,
          map,
          fullWidth,
          setFullWidth,
          maxWidth,
          setMaxWidth,
          handleOtpOpen,
          handleOptClose,
          otpPopup,
          frequency,
          setFrequency,
          NumberofProfessionals,
          setNumberofProfessionals,
          Material,
          setMaterial,
          CleaningType,
          setCleaningType,
          time,
          setTime,
          Driver,
          SetDriver,
          staff1,
          SetStaff1,
          staff2,
          SetStaff2,
          staff3,
          SetStaff3,
          staff4,
          SetStaff4,
          staff5,
          SetStaff5,
          staffDroped,
          setStaffDroped,
          staffPicked,
          setStaffPicked,
          dropTime,
          setDropTime,
          pickUpTime,
          setPickUpTime,
          CoutPopup,
          setCoutPopup,
          email,
          setEmail,
          loading,
          setLoading,
          paymentOptions,
          setPaymentOptions,
          uid,
          setUid,
          openDetialsPopUp,
          setOpenDetailsPopUp,
          duration,
          setDuration,
          SignInForm,
          setSignInForm,
          details,
          setDetails,
          uid,
          setUid,
          completeOrder,
          setCompleteOrder,
          singleOrderDetails,
          setSingleOrderDetails,
        }}
      >
        <App />
      </mainContext.Provider>
    </div>
  );
};

export default Context;
