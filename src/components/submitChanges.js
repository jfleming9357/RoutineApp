import axios from "axios";

export const submitChanges = (routines, routineId) => {
  axios
    .put("http://localhost:3002/update", {
      routines: routines,
      routineId: routineId,
    })
    .then(() => {
      console.log("updated");
      axios
        .post("http://localhost:8000/__refresh")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log("err updating", err));
};

export const addToDb = (routineObject) => {
  axios
    .post("http://localhost:3002/addRoutine", routineObject.node)
    .then(() => {
      console.log("added to db");
      axios
        .post("http://localhost:8000/__refresh")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log("err adding to db", err);
    });
};
