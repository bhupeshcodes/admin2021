import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 120,
  },
}));

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA459ayA_jOL_H0vyt51d0iqSwT_ddcO_I&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px`, width: `600px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.lon }} />
    )}
  </GoogleMap>
));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const LocationDialog1 = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const lat = props.row1.latitude;
  const lng = props.row1.longitude;

  return (
    <div>
      <Typography
        variant="subtitle2"
        className={classes.title}
        onClick={handleClickOpen}
      >
        View Address
      </Typography>
      <Container maxWidth="lg" disableGutters fixed>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
        <MyMapComponent isMarkerShown lat={lat} lon={lng} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close Map
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </div>
  );
};

export default LocationDialog1;
