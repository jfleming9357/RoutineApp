import DropdownRoutines from "../components/dropdown.js";
import { graphql } from "gatsby";
import * as React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { submitChanges, addToDb } from "../components/submitChanges.js";
import RoutinesList from "../components/RoutinesList.js";
import AddToDoModal from "../components/addToDoModal.js";
import AddRoutineModal from "../components/addRoutineModal.js";
import SharingList from "../components/sharingList.js";
import ShareModal from "../components/shareModal.js";
import FriendRoutines from "../components/friendRoutines.js";
import Chat from "../components/chat.js";

let tempRoutines = [];

const IndexPage = (props) => {
  const [username, setUsername] = useState(undefined);
  if (!username) {
    setUsername(prompt("enter your username"));
  }
  const [routines, setRoutines] = useState(
    tempRoutines.length ? tempRoutines : []
  );
  console.log(routines);
  useEffect(() => {
    tempRoutines = props.data.allMongodbGatsbyRoutines.edges;
    tempRoutines = tempRoutines.filter((item) => {
      return item.node.userID === username;
    });
    setRoutines(tempRoutines);
  }, [username]);

  const [currentRoutine, setCurrentRoutine] = useState(0);

  const handleRoutineSelect = (e) => {
    setCurrentRoutine(e.target.id);
  };

  const toggleComplete = (index) => {
    let tempRoutines = [...routines];
    tempRoutines[currentRoutine].node.routine[index].completed = !tempRoutines[
      currentRoutine
    ].node.routine[index].completed;
    setRoutines(tempRoutines);
  };

  const handleModalSubmit = (newTask, time) => {
    let routineTemp = [...routines];
    let taskObject = {
      task: newTask,
      completed: false,
      time: time,
    };
    routineTemp[currentRoutine].node.routine.push(taskObject);
    setRoutines(routineTemp);
  };

  const handleDelete = (index) => {
    console.log(index);
    let routineTemp = [...routines];
    routineTemp[currentRoutine].node.routine.splice(index, 1);
    setRoutines(routineTemp);
  };

  const handleRoutineSubmit = (title) => {
    let routineObject = {
      node: {
        routineID: props.data.allMongodbGatsbyRoutines.edges.length + 1,
        userID: username,
        routine: [],
        routineName: title,
        shared: [],
      },
    };
    addToDb(routineObject);
    let tempRoutines = [...routines];
    tempRoutines.push(routineObject);
    props.data.allMongodbGatsbyRoutines.edges.push(routineObject);
    setRoutines(tempRoutines);
  };

  const handleModalShare = function (name) {
    let tempRoutines = [...routines];
    tempRoutines[currentRoutine].node.shared.push(name);
    setRoutines(tempRoutines);
  };

  if (!routines.length) {
    return (
      <main>
        <h1>Routine Accountability App</h1>
        <h2>Add a routine to get started!</h2>
        <AddRoutineModal handleRoutineSubmit={handleRoutineSubmit} />
      </main>
    );
  } else {
    console.log(routines[currentRoutine]);
    return (
      <main>
        <h1>Routine Accountability App</h1>
        <div className="grid-container">
          <div className="User">
            <h2>
              Your routines
              <div className="d-flex align-items-center">
                <DropdownRoutines
                  list={routines}
                  handleRoutineSelect={handleRoutineSelect}
                />{" "}
                <AddRoutineModal handleRoutineSubmit={handleRoutineSubmit} />
              </div>
              <br></br>
            </h2>
            <div>
              <RoutinesList
                routines={routines}
                currentRoutine={currentRoutine}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
              ></RoutinesList>
              <br></br>
              <AddToDoModal handleModalSubmit={handleModalSubmit} />
            </div>
            <br></br>
            <h5 className="d-flex align-items-center">
              {routines[currentRoutine].node.shared ? (
                <SharingList sharing={routines[currentRoutine].node.shared} />
              ) : (
                <div>Not currently sharing this routine</div>
              )}
              <ShareModal handleModalShare={handleModalShare} />
            </h5>
            <h2>
              <br></br>
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  let routineId = routines[currentRoutine].node.routineID;
                  submitChanges(routines[currentRoutine].node, routineId);
                }}
              >
                Submit Changes
              </Button>
            </h2>
          </div>
          <div className="shared" style={{ float: "right" }}>
            <div className="grid-container2">
              <div className="sharedContents">
                <div className="Friends">
                  <h2>Friends' routines</h2>
                  <FriendRoutines
                    allRoutines={props.data.allMongodbGatsbyRoutines.edges}
                    username={username}
                  ></FriendRoutines>
                </div>
              </div>
              <div className="Chat">
                <Chat username={username} />
              </div>
              ;
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default IndexPage;

export const routineQuery = graphql`
  query {
    allMongodbGatsbyRoutines {
      edges {
        node {
          routineID
          userID
          routine {
            task
            completed
            time
          }
          routineName
          shared
        }
      }
    }
  }
`;
