import Modal from "react-bootstrap/Modal";
import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

let AddRoutineModal = ({ handleRoutineSubmit }) => {
  const [show, setShow] = useState(false);
  const [newRoutine, setNewRoutine] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a routine!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start another routine</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setNewRoutine(e.target.value)}
              type="email"
              placeholder="Enter task here"
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleRoutineSubmit(newRoutine);
              handleClose();
            }}
          >
            Add routine!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRoutineModal;
