"use client";

import { useState, useEffect, React } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TaskForm from "./taskform";


export default function TaskModal({ onNewTask }) {
  const [show, setShow] = useState(false);



  function discard() {
    setShow(false);
  }
  function save() {
    setShow(false);
  }
  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)} className="btn btn-outline p-3">
        Agregar nueva tarea
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          style={{ marginLeft: "1rem" }}
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
          <Modal.Title>Crear nueva tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¡Elija sus tareas personalizadas!

          <div className="p-2 mb-4">
            <TaskForm onNewTask={onNewTask} close={discard} />
          </div>

        </Modal.Body>


      </Modal>
    </>
  );
}
