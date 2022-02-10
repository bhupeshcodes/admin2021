import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { DialogActions, DialogContent } from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import { db } from "../../Firebase";

Geocode.setApiKey("AIzaSyA459ayA_jOL_H0vyt51d0iqSwT_ddcO_I");
Geocode.enableDebug();

class LocationDialog extends React.Component {
  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  };
  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray);
                this.setState({
                  address: address ? address : "",
                  area: area ? area : "",
                  city: city ? city : "",
                  state: state ? state : "",
                });
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }

  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInfoWindowClose = (event) => {};

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    console.log("plc", place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    console.log("city", city);
    console.log("latvalue", latValue);
    console.log("lngValue", lngValue);

    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  render() {
    const {
      handleMapClose,
      map,
      fullWidth,
      maxWidth,
      setUserData,
      userData,
      setAddress,
      setStep,
    } = this.context;

    const DialogTitle = (props) => {
      const { children, classes, onClose, ...other } = props;

      return (
        <MuiDialogTitle disableTypography {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                color: "#000",
              }}
              onClick={handleMapClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    };

    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={this.state.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* InfoWindow on top of marker */}

          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>
          <Marker />
        </GoogleMap>
      ))
    ); 

    const submitLocation = () => {
      setUserData({
        ...userData,
        city: this.state.state,
        address: this.state.address,
        latitude: this.state.markerPosition.lat,
        longitude: this.state.markerPosition.lng,
      });
      setAddress(this.state.city);
      if (JSON.parse(localStorage.getItem("authUser")) !== null) {
        var uid = JSON.parse(localStorage.getItem("authUser")).uid;
        const data = JSON.parse(localStorage.getItem("authUser"));
        const city = this.state.state;
        const address = this.state.address;
        const latitude = this.state.markerPosition.lat;
        const longitude = this.state.markerPosition.lng;
        db.ref(`users/${uid}`).set({
          ...data,
          city,
          address,
          latitude,
          longitude,
        });
      }
      handleMapClose();
      window.location.reload();
      setStep(2);
    };

    return (
      <div>
        <div>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={map}
            onClose={handleMapClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="customized-dialog-title" onClose={handleMapClose}>
              Select Location
            </DialogTitle>
            <DialogContent>
              <AsyncMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA459ayA_jOL_H0vyt51d0iqSwT_ddcO_I&libraries=places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: this.state.height }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={submitLocation} color="primary">
                Select this Address
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

LocationDialog.contextType = mainContext;

export default LocationDialog;
