import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Durations({ durations, setDurations }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.getElementById("pomodoro").value = durations.pomodoro;
      document.getElementById("sbreak").value = durations.shortBreak;
      document.getElementById("lbreak").value = durations.longBreak;
    }
  }, [show]);

  function discard() {
    setShow(false);
  }
  function save() {
    let pomodoro = document.getElementById("pomodoro").value;
    let shortBreak = document.getElementById("sbreak").value;
    let longBreak = document.getElementById("lbreak").value;

    setDurations({
      pomodoro: pomodoro > 0 ? pomodoro : durations.pomodoro,
      shortBreak: shortBreak > 0 ? shortBreak : durations.shortBreak,
      longBreak: longBreak > 0 ? longBreak : durations.longBreak,
    });
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)} className="btn">
        Tiempo Personalizado
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
