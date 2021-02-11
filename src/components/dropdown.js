import Dropdown from "react-bootstrap/Dropdown";
import * as React from "react";

const DropdownRoutines = ({ list, handleRoutineSelect }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Choose a routine
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {list.map((routine, index) => {
          return (
            <Dropdown.Item key={index} id={index} onClick={handleRoutineSelect}>
              {routine.node.routineName}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownRoutines;
