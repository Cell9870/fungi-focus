"use client";
import { useEffect, useRef, useState } from "react";
import TaskForm from "./taskform";
import { useGlobalContext } from "../../context/store";
import { useSession } from "next-auth/react";
import React from "react";

interface ITask {
  id: number;
  nameTarea: string;
  estado: string;
  descripcion: string;
}

interface IFocusTime {
  id: number;
  concentracionTime: number;
  horaAndFecha: string;
  idUser: number;
  idTarea: number;
}

export default function TasksList() {
  const { timerActive, timerState } = useGlobalContext();

  const { data: session } = useSession();
  const idUser = session?.user?.email;

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [focusTime, setFocusTime] = useState<IFocusTime[]>([]);
  const [currentTime, setCurrentTime] = useState(
    Number.parseInt((Date.now() / 1000).toFixed())
  );
  const [activeTask, setActiveTask] = useState(-1);
  const prevTaskRef = useRef<number>(-1);
  const prevTimerRef = useRef<boolean>(false);
  const prevTimerStateRef = useRef<string>("pomodoro");

  async function getTasksData() {
    //let response = await fetch(`${process.env.PUBLIC_URL}/api/tasks/?id=${idUser}`);
    let response = await fetch(`${process.env.PUBLIC_URL}/api/tasks/`);
    console.log(`url: ${process.env.PUBLIC_URL}, response: ${response.json()}`)
    response = await fetch(`./api/tasks/`);
    console.log(`response: ${response.json()}`)
    let res = await response.json();
    setTasks(res.tasks);

    response = await fetch(
      //`${process.env.PUBLIC_URL}/api/tasks/focusTimes/?id=${idUser}`
      `${process.env.PUBLIC_URL}/api/tasks/focusTimes/`
    );
    res = await response.json();
    setFocusTime(res.focusTime);
  }
  
  useEffect(() => {
    getTasksData();
  }, [session]);

  function getFocusTimeForTask(id: number) {
    let resul = 0;
    if (activeTask === id) {
      focusTime.forEach(({ concentracionTime, idTarea }) => {
        if (idTarea === id) resul += concentracionTime;
      });

      const hour = Math.floor(resul / 3600);
      const min = Math.floor((resul % 3600) / 60);
      const sec = resul % 60;

      const strHour = hour ? (hour < 10 ? "0" : "") + hour + ":" : "";
      const strMin = min ? (min < 10 ? "0" : "") + min + ":" : "0:";
      return strHour + strMin + (sec < 10 ? "0" : "") + sec;
    } else return "";
  }

  useEffect(() => {
    //console.log(`CurrTask: ${activeTask}, PrevTask: ${prevTaskRef.current}, CurrTimer:${timerActive}, PrevTimer:${prevTimerRef.current}, timerState: ${timerState.current}, timerStatePrev ${prevTimerStateRef.current}`)
    let pomodoroActive = timerState.current === "pomodoro" && timerActive;
    let startCounting =
      pomodoroActive &&
      !prevTimerRef.current &&
      activeTask != -1 &&
      activeTask === prevTaskRef.current;
    let paused =
      !pomodoroActive &&
      prevTimerRef.current &&
      activeTask != -1 &&
      activeTask === prevTaskRef.current;
    let changedTask =
      pomodoroActive &&
      prevTimerRef.current &&
      activeTask != -1 &&
      prevTaskRef.current != -1 &&
      activeTask != prevTaskRef.current;
    let selectedTask =
      pomodoroActive &&
      prevTimerRef.current &&
      activeTask != -1 &&
      prevTaskRef.current == -1;
    let changedDuration =
      !pomodoroActive &&
      prevTimerStateRef.current === "pomodoro" &&
      timerState.current != "pomodoro" &&
      activeTask != -1 &&
      prevTimerRef.current;
    let unselectedTask =
      pomodoroActive &&
      prevTimerRef.current &&
      activeTask == -1 &&
      prevTaskRef.current != -1;

    if (startCounting) {
      //console.log(`start: contar desde ahora para ${activeTask} `);
      setCurrentTime(Number.parseInt((Date.now() / 1000).toFixed()));
    }
    if (paused) {
      //console.log(`pause: añadir para ${activeTask}`);
      postFocusTime(activeTask);
    }
    if (changedTask) {
      //console.log(`seleccionar tarea: añadir a ${prevTaskRef.current} y contar para ${activeTask}`);
      postFocusTime(prevTaskRef.current);
      setCurrentTime(Number.parseInt((Date.now() / 1000).toFixed()));
    }
    //seleccionó una tarea sin antes tener ninguna seleccionada, con el timer activado: empezar a contar desde ahora
    if (selectedTask) {
      //console.log(`seleccionar tarea: contar desde ahora para ${activeTask}`);
      setCurrentTime(Number.parseInt((Date.now() / 1000).toFixed()));
    }

    if (changedDuration) {
      //console.log(`termino o cambio pomodoro: añadir para ${activeTask}`);
      postFocusTime(activeTask);
    }

    if (unselectedTask) {
      //console.log(`tarea deseleccionada: añadir para ${prevTaskRef.current}`);
      postFocusTime(prevTaskRef.current);
    }

    prevTaskRef.current = activeTask;
    prevTimerRef.current = timerState.current === "pomodoro" && timerActive;
    prevTimerStateRef.current = timerState.current;
  }, [timerActive, activeTask]);

  async function postFocusTime(idTarea: number) {
    const concentracionTime =
      Number.parseInt((Date.now() / 1000).toFixed()) - currentTime;
    const task = tasks.filter((task) => task.id === idTarea)[0];
    const minTime = 4; // arbitrario, lo podemos cambiar despues (ej 1 minuto minimo)

    if (task.estado != "done" && concentracionTime > minTime) {
      if (task.estado === "notStarted") updateTaskState(idTarea, "pending");
      const urlEndPoint = `${process.env.PUBLIC_URL}/api/tasks/focusTimes`;
      const response = await fetch(urlEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // id : AutoIncrement
          concentracionTime,
          // horaAndFecha : now() en sql
          idUser,
          idTarea,
        }),
      });

      getTasksData();
    }
    else
    console.log(
      task.estado === "done"
        ? "No se añade porque la tarea está terminada"
        : `Tiempo de concentracion por debajo del minimo (${minTime}s)`
    );
  }

  async function postTask(
    nameTarea: string,
    estado: string,
    descripcion?: string
  ) {
    if (session != null) {
      if (descripcion === undefined) descripcion = "";
      const urlEndPoint = `${process.env.PUBLIC_URL}/api/tasks`;
      const response = await fetch(urlEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // id : AutoIncrement
          nameTarea,
          estado,
          descripcion,
          idUser,
        }),
      });
      getTasksData();
    } 
    else {
      alert("Funcionalidad solo para usuarios registrados.")
    }
  }

  async function updateTaskState(id: number, state: string) {
    const urlEndPoint = `${process.env.PUBLIC_URL}/api/tasks`;
    const response = await fetch(urlEndPoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        state,
      }),
    });
    getTasksData();
  }

  async function deleteTask(id: number) {
    const urlEndPoint = `${process.env.PUBLIC_URL}/api/tasks/?id=${id}`;
    const response = await fetch(urlEndPoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getTasksData();
  }

  return (
    <div className="bg-indigo-950 w-1/2">
      <div className="card">
        <div className="card-body text-center flex flex-col justify-center space-x-10 p-10">
          <ul className="list-group ">
            {tasks.map(({ nameTarea, estado, descripcion, id }, index) => {

              return (
                <li
                  style={{ textAlign: "left" }}
                  className={
                    activeTask != id
                      ? "list-group-item"
                      : "list-group-item active"
                  }
                  key={id}
                  onClick={() => {
                    activeTask === id ? setActiveTask(-1) : setActiveTask(id)
                  }}
                >
                  <dl>
                    <dt style={{ display: "block", float: "right" }}>
                      <small>Nombre de la Tarea</small>
                    </dt>
                    <dd style={{ color : activeTask === id ? 'white' : 'limegreen', fontWeight : activeTask === id ? 'bold' : 'normal'}}>{nameTarea}</dd>
                    <dt style={{ display: "block", float: "right" }}>
                      <small>Estado</small>
                    </dt>
                    <dd style={{ color: activeTask === id ? 'white' : 'green' }}>
                      {estado == "done"
                        ? "Finalizada"
                        : estado == "notStarted"
                        ? "No empezada"
                        : "Pendiente"}
                    </dd>
                    <dt style={{ display: "block", float: "right" }}>
                      <small>{activeTask == id ? "Descripcion" : ""}</small>
                    </dt>
                    <dd style={{ color: activeTask === id ? 'lightgray' : 'gray' }}>
                      {activeTask == id ? descripcion || "Sin Descripcion" : ""}
                    </dd>
                    <dt style={{ display: "block", float: "right" }}>
                      <small>{activeTask == id ? "Tiempo dedicado" : ""}</small>
                    </dt>
                    <dd style={{ color: "yellow",  fontWeight: "bold"}}>
                      {getFocusTimeForTask(id)}
                    </dd>
                    <dt
                      style={{ display: "block", float: "right", color: "orange" }}
                    >
                      {activeTask == id && estado === "pending" ? (
                        <a
                        href="#"
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          updateTaskState(id, "done");
                        }}
                      >
                        <div
                          className="p-1 bg-info rounded text-center"
                          style={{ width: "5rem", color: 'white'}}
                        >
                          Finalizar
                        </div>
                      </a>
                      ) : ("")}
                    </dt>
                    <dd style={{ color:"orange" }}>
                      {activeTask == id && estado === "pending" ? "-" : ""}
                    </dd>
                    <dt
                      style={{ display: "block", float: "right", color: "red"}}
                    >
                      {activeTask == id ? (
                        <a
                        href="#"
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          deleteTask(id)
                        }}
                      >
                        <div
                          className= {estado === 'done' ? "p-1 bg-info rounded text-center" : "p-1 rounded text-center"}
                          style={{ width: "5rem", color: estado === 'done' ? 'white' : 'orange'}}
                        >
                          Eliminar
                        </div>
                      </a>
                      ) : ("")}
                    </dt>
                    <dd style={{ color:"red" }}>
                      {activeTask == id ? "-" : ""}
                    </dd>
                  </dl>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="card-footer text-center"
          onClick={() => {
            setActiveTask(-1);
          }}
        >
          <TaskForm onNewTask={postTask} />
        </div>
      </div>
    </div>
  );
}
