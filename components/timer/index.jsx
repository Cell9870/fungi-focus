"use client";

import BasicModal from "../containers/basicmodal";
import CircleTimer from "./circletimer";
import { useEffect, useState } from "react";
import TimerForm from "./timerform";
import { useGlobalContext } from "../../context/globalstates";
import React from "react";

export default function Timer() {
  let { timerActive, setTimerActive } = useGlobalContext();

  const [durations, setDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [state, setState] = useState({
    started: false,
    current: "pomodoro",
    key: 0,
    laps: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [pomodoroActive, isPomodoroActive] = useState(true);

  function setTimer(timerName) {
    setState({
      started: false,
      current: timerName,
      key: state.key + 1,
      laps: 0,
    });
  }

  useEffect(() => {
    /* Si uso setTimerActive(started), por algun motivo el valor no es el correcto */
    //pomodoroActive ? timerActive = started : timerActive = false
    if (pomodoroActive) setTimerActive(state.started);
    //console.log(`timerActive: ${timerActive}, started: ${started}, pomodoroActive: ${pomodoroActive}`)
  }, [state]);

  function onComplete() {
    console.log("terminado");
    setState({
      started: false,
      current: state.current,
      key: state.key,
      laps: state.laps,
    });
    // Pasar al estado siguiente
    // Iniciar nuevo temporizador
    // Guardar informacion sobre intervalo completado
  }

  return (
    <React.Fragment>
      <div className="bg-indigo-950 w-1/2">
        <div className="card-header text-center space-x-6 p-6">
          <button onClick={() => setTimer("pomodoro")}>Pomodoro</button>
          <button onClick={() => setTimer("shortBreak")}>Short Break</button>
          <button onClick={() => setTimer("longBreak")}>Long Break</button>
          <button onClick={() => setModalOpen(true)}>
            Personalizar Pomodoro
          </button>
        </div>
        <div className="card-body text-center">
          <CircleTimer
            myKey={state.key}
            duration={durations[state.current]} // TODO * 60
            started={state.started}
            onComplete={() => onComplete()}
          />
        </div>
        <div className="card-footer text-center p-6">
          <button
            onClick={() => {
              setState({
                started: !state.started,
                current: state.current,
                key: state.key,
                laps: state.laps,
              });
            }}
          >
            {state.started ? "PAUSE " : "START"}
          </button>
        </div>
      </div>

      <div className="flex ml-auto mr-auto">
        {modalOpen && (
          <BasicModal
            isOpen={modalOpen}
            handleClose={() => setModalOpen(false)}
          >
            <TimerForm
              setDurations={(durations) => {
                setDurations(durations);
              }}
              setOpen={(setOpen) => {
                setModalOpen(setOpen);
              }}
            />
          </BasicModal>
        )}
      </div>
    </React.Fragment>
  );
}
