"use client";

import { useEffect, useRef, useState } from "react";
import TaskForm from "./taskform";
import { useGlobalContext } from "../../context/store";

export default function TasksList() {
  const { timerActive, timerState } = useGlobalContext();

  const initialTasks = [
    { name: "tarea 1", state: "done", description: "" },
    { name: "tarea 2", state: "pending", description: "descrip 2" },
    { name: "tarea 3", state: "notStarted", description: "descrip 3" },
    { name: "tarea 4", state: "done", description: "" },
  ];
  const initialFocusTime = [
    { task: 0, time: 5, date: "" },
    { task: 1, time: 0, date: "" },
    { task: 2, time: 5, date: "" },
    { task: 2, time: 10, date: "" },
    { task: 3, time: 15, date: "" },
    { task: 3, time: 20, date: "" },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [focusTime, setFocusTime] = useState<
    { task: number; time: number; date: string }[]
  >([]);
  const [currentTime, setCurrentTime] = useState(
    Number.parseInt((Date.now() / 1000).toFixed())
  );
  const [activeTask, setActiveTask] = useState(-1);
  const prevTaskRef = useRef<number>(-1);
  const prevTimerRef = useRef<boolean>(false);

  function addTask(name: string, state: string, description?: string) {
    let newArray = [...tasks];
    if (description === undefined) description = "";
    newArray.push({ name, state, description });

    setTasks(newArray);
  }

  function addFocusTime(taskIndex: number) {
    let newArray = [...focusTime];
    let time = Number.parseInt((Date.now() / 1000).toFixed()) - currentTime;
    let date = new Date().toLocaleString();
    newArray.push({ task: taskIndex, time, date });
    console.log(`task: ${taskIndex}, time: ${time}, date: ${date}`);

    setFocusTime(newArray);
  }
  useEffect(() => {
    //console.log(`CurrTask: ${activeTask}, PrevTask: ${prevTaskRef.current}, CurrTimer:${timerActive}, PrevTimer:${prevTimerRef.current}, Actual: ${timerState.current}`)

    //Btn start presionado con una tarea seleccionada: empezar a contar desde ahora.
    if (
      timerState.current === 'pomodoro' &&
      timerActive && 
      !prevTimerRef.current &&
      activeTask != -1 &&
      activeTask === prevTaskRef.current
    ) {
      setCurrentTime(Number.parseInt((Date.now() / 1000).toFixed()));
      console.log(`start: contar desde ahora para ${activeTask} `);
    }
    // Btn pause con una tarea seleccionada: añadir tiempo de concentracion
    if (
      timerState.current === 'pomodoro' && 
      !timerActive &&
      prevTimerRef.current &&
      activeTask != -1 &&
      activeTask === prevTaskRef.current
    ) {
      addFocusTime(activeTask);
      console.log(`pause: añadir para ${activeTask}`);
    }

    //seleccionó otra tarea con el timer activado: guardar tiempo de concentracion a la anterior, y comenzar a contar para la nueva
    if (
      timerState.current === 'pomodoro' && 
      timerActive &&
      prevTimerRef.current &&
      activeTask != -1 &&
      prevTaskRef.current != -1 &&
      activeTask != prevTaskRef.current
    ) {
      addFocusTime(prevTaskRef.current);
      setCurrentTime(Number.parseInt((Date.now() / 1000).toFixed()));
      console.log(
        `seleccionar tarea: añadir a ${prevTaskRef.current} y contar para ${activeTask}`
      );
    }
    //seleccionó una tarea por primera vez, con el timer activado: empezar a contar desde ahora
    if (
      timerState.current === 'pomodoro' && 
      timerActive &&
      prevTimerRef.current &&
      activeTask != -1 &&
      prevTaskRef.current == -1
    ) {
      setCurrentTime(Number.parseInt((Date.now() / 1000).toFixed()));
      console.log(`seleccionar tarea: contar desde ahora para ${activeTask}`);
    }

    prevTaskRef.current = activeTask;
    prevTimerRef.current = timerState.current === 'pomodoro' && timerActive;
  }, [timerActive, activeTask]);

  useEffect(() => {
    //console.log(`tasks: ${tasks.length}`)
    /*CONSULTAR TAREAS A BASE DE DATOS*/
  }, [setTasks]);

  return (
    <div className="bg-indigo-950 w-1/2 m-5">
      <div className="card-header text-center">
        <TaskForm onNewTask={addTask} />
      </div>
      <div className="card-body text-center flex justify-center">
        <ul className="list-group w-1/2 ">
          {tasks.map(({ name, state, description }, index) => {
            return (
              <li
                className={
                  activeTask != index
                    ? "list-group-item p-1"
                    : "list-group-item active bg-slate-400 p-1"
                }
                key={index}
                onClick={() => {
                  setActiveTask(index);
                }}
              >
                {name}, {state}, {description || "Sin Descripcion"},
                {focusTime.map(({ task, time, date }, indexFocus) => {
                  if (activeTask === index && task === index) {
                    return `${time}seg+`;
                  }
                  return "";
                })}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
