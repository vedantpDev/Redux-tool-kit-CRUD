import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateTutorial } from "../slices/tutorials";
import { useDispatch, useSelector } from "react-redux";

const Tutorial_component = ({
  updateTutorialState,
  show,
  handleClose,
  setUpdateTutorialState,
}) => {
  const dispatch = useDispatch();

  const updateChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdateTutorialState({ ...updateTutorialState, [name]: value });
  };

  const saveUpdateHandler = () => {
    dispatch(updateTutorial(updateTutorialState));
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update the Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="Title"
                onChange={updateChangeHandler}
                value={updateTutorialState.Title}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="Description"
                onChange={updateChangeHandler}
                value={updateTutorialState.Description}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdateHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tutorial_component;
