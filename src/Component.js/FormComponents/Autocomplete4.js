import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, TextField } from "@material-ui/core";
import { db } from "../../Firebase";
import { mainContext } from "../../Contexts/MainContext";

const AutocompleteWrapper4 = (props) => {
  const [options, setOptions] = useState([]);
  const { SetStaff4 } = useContext(mainContext);

  const handleClick = (value) => {
    db.ref("users").on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      const userAuth = usersList.filter((person) => person.auth === "Staff");
      const userAuth1 = userAuth.filter((person) => person.blocked === false);
      const userAuth2 = userAuth1.filter((person) => person.username === value);
      console.log(userAuth2);
      SetStaff4(...userAuth2);
    });
  };
  console.log(props.AssignTask);
  useEffect(() => {
    setOptions([]);

    db.ref("users").on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      const userAuth = usersList.filter((person) => person.auth === "Staff");
      const userAuth1 = userAuth.filter((person) => person.blocked === false);

      setOptions(userAuth1);
    });
  }, []);

  console.log();
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.username}
      id="controlled-demo"
      onChange={(event, newValue) => {
        if (newValue) {
          handleClick(newValue.username);
        }
      }}
      renderOption={(option) => {
        const AssignTask2 = props.AssignTask.filter((Assign) => {
          return Assign.staff1 || Assign.staff2 || Assign.staff3 || Assign.staff4 || Assign.staff5 === option.username;
        });
        console.log(AssignTask2);
        return (
          <React.Fragment>
            <h4 style={{ paddingRight: "30px" }}>{option.username}</h4>
            {AssignTask2.filter((Assign) => {
              return (
                Assign.date.split(" ")[0] === props.value.date.split(" ")[0]
              );
            }).map((task) => (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                key={task.uid}
              >
                {task.time}
              </Button>
            ))}
          </React.Fragment>
        );
      }}
      renderInput={(params) => (
        <TextField
          style={{ width: "100%", margin: "10px" }}
          {...params}
          label={props.value.staff4}
          variant="outlined"
        />
      )}
    />
  );
};

export default AutocompleteWrapper4;
