import Modal from "react-bootstrap/Modal";
import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

let ShareModal = ({ handleModalShare }) => {
  const [show, setShow] = useState(false);
  const [newShare, setNewShare] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Share with a friend!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share with a friend!</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Control
              onChange={(e) => setNewShare(e.target.value)}
              placeholder="Enter username of the person you would like to share with"
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
              handleModalShare(newShare);
              handleClose();
            }}
          >
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareModal;
