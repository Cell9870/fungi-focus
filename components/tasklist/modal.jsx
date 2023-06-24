"use client";

import { useState, useEffect, React } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function TaskModal() {
  const [show, setShow] = useState(false);

  function discard() {
    setShow(false);
  }
  function save() {
    setShow(false);
  }
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)} className="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-plus-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </Button>

      <Modal show={show} onHide={discard} className="mt-3">
        <Modal.Header closeButton>
          <Modal.Title>Pomodoro Personalizado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¡Elija el tiempo de pomodoro y breaks que mas le convengan!
        </Modal.Body>

        <Form className="p-2">
          <div className="form-floating mb-1">
            <input
              type="number"
              className="form-control"
              id="pomodoro"
              placeholder="Enter time"
              name="pomodoro"
            ></input>
            <label htmlFor="pomodoro">Pomodoro</label>
          </div>
          <div className="form-floating mb-3 mt-3">
            <input
              type="number"
              className="form-control"
              id="sbreak"
              placeholder="Short Break"
              name="sbreak"
            ></input>
            <label htmlFor="sbreak">Short Break</label>
          </div>
          <div className="form-floating mb-3 mt-3">
            <input
              type="number"
              className="form-control"
              id="lbreak"
              placeholder="Long Break"
              name="lbreak"
            ></input>
            <label htmlFor="lbreak">Long Break</label>
          </div>
        </Form>

        <Modal.Footer>
          <Button
            className="btn btn-outline rounded"
            variant="secondary"
            onClick={discard}
          >
            Close
          </Button>
          <Button
            className="btn btn-outline rounded"
            variant="secondary"
            onClick={save}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
