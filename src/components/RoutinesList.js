import Button from "react-bootstrap/Button";
import * as React from "react";
import ListGroup from "react-bootstrap/ListGroup";

let RoutinesList = ({
  routines,
  currentRoutine,
  toggleComplete,
  handleDelete,
}) => {
  if (!routines[currentRoutine]) {
    return <div>No routines found, click the button below to get started!</div>;
  } else {
    return (
      <div>
        <ListGroup>
          <ListGroup.Item variant="dark" style={{ "font-weight": "bold" }}>
            {routines[currentRoutine].node.routineName}
          </ListGroup.Item>
          {routines[currentRoutine].node.routine.map((routine, index) => {
            return (
              <ListGroup.Item>
                <form key={index}>
                  <label
                    style={
                      routine.completed
                        ? { textDecoration: "line-through", fontSize: 16 }
                        : {}
                    }
                  >
                    <span style={{ "font-weight": "bold" }}>
                      {routine.time}:{" "}
                    </span>
                    {routine.task}
                  </label>
                  <div style={{ float: "right" }}>
                    <Button
                      size="sm"
                      onClick={() => toggleComplete(index)}
                      variant="secondary"
                      disabled={routine.completed}
                    >
                      Complete
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      X
                    </Button>
                  </div>
                  <br></br>
                </form>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  }
};

export default RoutinesList;
