import BasicModal from "../containers/basicmodal";
import CircleTimer from "./circletimer";
import { useEffect, useState } from "react";
import TimerForm from "./timerform";
import { useGlobalContext } from "../../context/store";
import React from "react";

export default function Timer() {
  let { timerActive, setTimerActive, timerState, setTimerState } = useGlobalContext();

  // Podria ser un parametro mas
  let maxLaps = 4;

  const [durations, setDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [modalOpen, setModalOpen] = useState(false);

  function setTimer(timerName) {
    setTimerActive(false);
    setTimerState({
      current: timerName,
      key: timerState.key + 1,
      laps: 0,
    });
  }

  function onComplete() {
    let current;
    let { laps, key } = timerState;

    switch (timerState.current) {
      case "pomodoro":
        current = "shortbreak";
        if (laps < maxLaps) {
          current = "shortBreak";
          laps += 1;
        } else {
          current = "longBreak";
          laps = 0;
        }
        break;
      case "shortBreak":
        current = "pomodoro";
        break;
      case "longBreak":
        current = "pomodoro";
    }

    setTimerActive(false);
    setTimerState({
      current: current,
      key: key + 1,
      laps: laps,
    });

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
            myKey={timerState.key}
            duration={durations[timerState.current]} // TODO * 60
            started={timerActive}
            onComplete={onComplete}
          />
        </div>
        <div className="card-footer text-center p-6">
          <button
            onClick={() => {
              setTimerActive(!timerActive);
              setTimerState({
                current: timerState.current,
                key: timerState.key,
                laps: timerState.laps,
              });
            }}
          >
            {timerActive ? "PAUSE " : "START"}
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
              durations={durations}
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
