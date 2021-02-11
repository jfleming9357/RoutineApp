import Dropdown from "react-bootstrap/Dropdown";
import * as React from "react";

const SharingList = ({ sharing }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Show users currently sharing with
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sharing.map((name, index) => {
          return <Dropdown.Item key={index}>{name}</Dropdown.Item>;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SharingList;
