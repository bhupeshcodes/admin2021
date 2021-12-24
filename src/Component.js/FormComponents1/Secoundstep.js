import React, { useContext } from "react";
import { Button, Divider, TextField } from "@material-ui/core";
import { mainContext } from "../../Contexts/MainContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper1: {
    position: "relative",
    height: 860,
    width: 600,
    paddingTop: 3,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 30,
  },
  paper2: {
    height: 600,
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export default function Secoundstep() {
  const classes = useStyles();
  const {
    setStep,
    userData,
    setUserData,
    hour,
    setHour,
    NumberofProfessionals,
    setNumberofProfessionals,
    setMaterial,
  } = useContext(mainContext);

  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <Grid item xs={6}>
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper1} elevation={2}>
              <div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#333D47",
                    marginTop: "40px",
                    paddingBottom: 20
                  }}
                >
                  {" "}
                  How many hours do you need your professional to stay?{" "}
                </h3>
                <div className="togglebutton">
                  {hour === 2 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      2
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Duration: 2 });
                        setHour(2);
                      }}
                    >
                      2
                    </Button>
                  )}
                  {hour === 3 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      3
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Duration: 3 });
                        setHour(3);
                      }}
                    >
                      3
                    </Button>
                  )}
                  {hour === 4 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      4
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Duration: 4 });
                        setHour(4);
                      }}
                    >
                      4
                    </Button>
                  )}
                  {hour === 5 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      5
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Duration: 5 });
                        setHour(5);
                      }}
                    >
                      5
                    </Button>
                  )}
                  {hour === 6 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      6
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Duration: 6 });
                        setHour(6);
                      }}
                    >
                      6
                    </Button>
                  )}
                  {hour === 7 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      7
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Duration: 7 });
                        setHour(7);
                      }}
                    >
                      7
                    </Button>
                  )}
                  {hour === 8 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      8
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Duration: 8 });
                        setHour(8);
                      }}
                    >
                      8
                    </Button>
                  )}
                </div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#333D47",
                    marginTop: "40px",
                    paddingBottom: 20
                  }}
                >
                  {" "}
                  How many professionals do you need?{" "}
                </h3>
                <div className="togglebutton">
                  {NumberofProfessionals === 1 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      1
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, NumberofProfessionals: 1 });
                        setNumberofProfessionals(1);
                      }}
                    >
                      1
                    </Button>
                  )}
                  {NumberofProfessionals === 2 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      2
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, NumberofProfessionals: 2 });
                        setNumberofProfessionals(2);
                      }}
                    >
                      2
                    </Button>
                  )}
                  {NumberofProfessionals === 3 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      3
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, NumberofProfessionals: 3 });
                        setNumberofProfessionals(3);
                      }}
                    >
                      3
                    </Button>
                  )}
                  {NumberofProfessionals === 4 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      4
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, NumberofProfessionals: 4 });
                        setNumberofProfessionals(4);
                      }}
                    >
                      4
                    </Button>
                  )}
                  {NumberofProfessionals === 5 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      5
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, NumberofProfessionals: 5 });
                        setNumberofProfessionals(5);
                      }}
                    >
                      5
                    </Button>
                  )}
                </div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#333D47",
                    marginTop: "40px",
                    paddingBottom: 20
                  }}
                >
                  {" "}
                  Do you require cleaning materials?{" "}
                </h3>
                <div className="togglebutton">
                  {userData.Material === "No" ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      No, I have them.
                    </Button>
                  ) : hour === 0 || hour === 2 || hour === 3 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Material: "No" });
                        setMaterial("No");
                      }}
                    >
                      No, I have them.
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Material: "No" });
                        setMaterial("No");
                      }}
                    >
                      No, I have them.
                    </Button>
                  )}
                  {userData.Material === "Yes" ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        backgroundColor: "#3C4B64",
                        color: "#fff",
                        margin: "3px",
                      }}
                    >
                      Yes, Please.
                    </Button>
                  ) : hour === 0 || hour === 2 || hour === 3 ? (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        setUserData({ ...userData, Material: "Yes" });
                        setMaterial("Yes");
                      }}
                    >
                      Yes, Please.
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      onClick={() => {
                        setUserData({ ...userData, Material: "Yes" });
                        setMaterial("Yes");
                      }}
                    >
                      Yes, Please.
                    </Button>
                  )}
                  <h3
                    style={{
                      fontWeight: "600",
                      color: "#333D47",
                      marginTop: "40px",
                      paddingBottom: 20
                    }}
                  >
                    Do you have any specific cleaning instructions?
                  </h3>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      multiline
                      rows={4}
                      style={{ marginLeft: "-20px" }}
                      label="Instructions if any (Optional)"
                      value={userData.instructions}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          instructions: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                </div>
                <Divider style={{ marginTop: 20 }} />
                <div
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    width: "80%",
                  }}
                >
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          style={{ paddingLeft: 50, paddingRight: 50 }}
                          variant="contained"
                          size="large"
                          onClick={() => setStep(1)}
                        >
                          Previous
                        </Button>
                      </Grid>
                      <Grid item xs={6} style={{ paddingLeft: 120 }}>
                        {hour === 0 || hour === 2 || hour === 3 ? (
                          <Button
                            style={{ paddingLeft: 70, paddingRight: 70 }}
                            variant="contained"
                            size="large"
                            onClick={() => {
                              setStep(3);
                            }}
                            color="primary"
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            style={{ paddingLeft: 70, paddingRight: 70 }}
                            variant="contained"
                            size="large"
                            onClick={() => {
                              setStep(3);
                            }}
                            color="primary"
                          >
                            Next
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper2} elevation={2}>
              <div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        CITY
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.city}</h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <div
                  style={{
                    marginTop: -5,
                    marginBottom: -5,
                    paddingRight: 50,
                    paddingLeft: 50,
                  }}
                >
                  <h3 style={{ fontWeight: "600", color: "#333D47" }}>
                    SERVICE DETAILS
                  </h3>
                </div>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "200", color: "#8CA0B3" }}>
                        Cleaning Type
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.CleaningType}
                      </h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Frequency
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.frequency}</h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Duration
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.Duration} Hours</h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={8}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Number of Professionals
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>
                        {userData.NumberofProfessionals}
                      </h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Material
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.Material}</h5>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={5}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Date
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      {userData.date === "2014-08-18 21:11:54" ? (
                        <h5 style={{ color: "#333D47" }}></h5>
                      ) : (
                        <h5 style={{ color: "#333D47" }}></h5>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      xs={5}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Time
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      {userData.date === "2014-08-18 21:11:54" ? (
                        <h5 style={{ color: "#333D47" }}></h5>
                      ) : (
                        <h5 style={{ color: "#333D47" }}></h5>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                        textDecoration: "bold",
                      }}
                    >
                      <h5 style={{ fontWeight: "500", color: "#8CA0B3" }}>
                        Address
                      </h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginBottom: -5,
                        paddingRight: 50,
                        paddingLeft: 50,
                      }}
                    >
                      <h5 style={{ color: "#333D47" }}>{userData.address}</h5>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
