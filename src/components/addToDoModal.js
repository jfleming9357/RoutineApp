import Modal from "react-bootstrap/Modal";
import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TimePicker from "react-time-picker";

let AddToDoModal = ({ handleModalSubmit }) => {
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [time, onChange] = useState("10:00");

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a task!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add another task to your routine</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setNewTask(e.target.value)}
              type="email"
              placeholder="Enter task here"
            />
          </Form.Group>
          <TimePicker onChange={onChange} value={time} />
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleModalSubmit(newTask, time);
              handleClose();
            }}
          >
            Add task!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToDoModal;
