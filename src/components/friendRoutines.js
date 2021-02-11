import Dropdown from "react-bootstrap/Dropdown";
import * as React from "react";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

const FriendRoutines = ({ allRoutines, username }) => {
  const [currentRoutine, setCurrentRoutine] = useState(0);
  let sharedWithUser = allRoutines.filter((routine) => {
    if (!routine.node.shared) {
      return false;
    }
    return routine.node.shared.includes(username);
  });

  const handleClick = (e) => {
    setCurrentRoutine(e.target.id);
  };
  if (!sharedWithUser.length) {
    return <div>You have no friends and will die alone</div>;
  } else {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose a friend's routine
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sharedWithUser.map((routine, index) => {
              return (
                <Dropdown.Item key={index} id={index} onClick={handleClick}>
                  {routine.node.userID}: {routine.node.routineName}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <ListGroup>
          <ListGroup.Item variant="dark" style={{ "font-weight": "bold" }}>
            {sharedWithUser[currentRoutine].node.userID}'s routine:{" "}
            {sharedWithUser[currentRoutine].node.routineName}
          </ListGroup.Item>
          {sharedWithUser[currentRoutine].node.routine.map((task) => {
            console.log(task);
            return (
              <ListGroup.Item
                style={task.completed ? { textDecoration: "line-through" } : {}}
              >
                <span style={{ "font-weight": "bold" }}>{task.time}: </span>
                {task.task}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </>
    );
  }
};

export default FriendRoutines;
