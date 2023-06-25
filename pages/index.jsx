import { useState } from "react";
import { useGlobalContext } from "../context/store";
import React from "react";
import Info from "@/components/info";
import Timer from "@/components/timer";
import Tasklist from "@/components/tasklist";
import Modal from "@/components/modal";

export default function Home() {
  let { timerActive, setTimerActive, timerState, setTimerState } =
    useGlobalContext();

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
        current = "shortBreak";
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
  }
  const isBrowser = () => typeof windows !== 'undefined';
  function scrollToTop() {
    if (!isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <React.Fragment>
      <div className="container w-75 my-3 rounded rounded-2 shadow shadow-lg col bg1 fg1">
        <div className="row align-items-stretch">
          <div className="col p-5 rounded">
            <div className="px-4">
              <h3>Fungi Focus</h3>
              <p>
                ¿Que estas esperando para comenzar tu tiempo de productividad?
                Adelante! Be focus, be fungi
              </p>
            </div>
            <hr
              className="my-4 mx-auto rounded"
              style={{ color: "#0c3e74", width: "80%" }}
            ></hr>

            <div className="px-4">
              <div className="d-flex justify-content-center gap-3">
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                  onClick={() => setTimer("pomodoro")}
                >
                  <div
                    className="p-2 rounded text-center"
                    style={{ width: "8rem" }}
                  >
                    <button className="btn text-white btn-outline ">
                      Pomodoro
                    </button>

                  </div>
                </a>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                  onClick={() => setTimer("shortBreak")}
                >
                  <div
                    className="p-2  rounded text-center"
                    style={{ width: "8rem" }}
                  >
                    <button className="btn text-white btn-outline" style={{ backgroundColor: "#bd8159" }}>
                      Short Break
                    </button>

                  </div>
                </a>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                  onClick={() => setTimer("longBreak")}
                >
                  <div
                    className="p-2 rounded text-center"
                    style={{ width: "8rem" }}
                  >
                    <button className="btn text-white btn-outline" style={{ backgroundColor: "#3b6aa8" }}>
                      Long Break
                    </button>

                  </div>
                </a>
                <Modal durations={durations} setDurations={setDurations} />
              </div>
              <div className="p-3">
                <Timer
                  myKey={timerState.key}
                  duration={durations[timerState.current]} // TODO * 60
                  started={timerActive}
                  onComplete={onComplete}
                />
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button
                  className="btn text-white mt-1 mb-4 p-2 w-25"
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
              <Tasklist />
              <hr
                className="mx-auto rounded"
                style={{ color: "#0c3e74", width: "80%" }}
              ></hr>
            </div>
          </div>
          <Info />
        </div>
        <div className="w-50 mx-auto d-grid">
          <button
            type="submit"
            className="btn botonCerrar text-white mt-1 mb-2 p-2"
            id="logInBtnConfirm"
            onClick={scrollToTop}
          >
            Volver hacia arriba
          </button>
        </div>
      </div>
    </React.Fragment >
  );
}
