'use client';

import { useEffect, useRef, useState } from "react";
import TaskForm from "./forms/taskform";
import { useGlobalContext } from "../context/globalstates";

interface ITask {
    nameTarea: string
    estado: string
    descripcion: string
}

interface IFocusTime {
    task: number
    time: number
    date: string
}

export default function TasksList() {
    const {timerActive} = useGlobalContext()

    
    const [tasks, setTasks] = useState<ITask[]>([])
    const [focusTime, setFocusTime] = useState<IFocusTime[]>([])
    const [currentTime, setCurrentTime] = useState(Number.parseInt((Date.now()/1000).toFixed()))
    const [activeTask, setActiveTask] = useState(-1)
    const prevTaskRef = useRef<number>(-1)
    const prevTimerRef = useRef<boolean>(false)

    function addFocusTime(taskIndex: number) {
        let newArray = [...focusTime]
        let time = Number.parseInt((Date.now()/1000).toFixed()) - currentTime
        let date = new Date().toLocaleString()
        newArray.push({ task:taskIndex, time, date })
        console.log(`task: ${taskIndex}, time: ${time}, date: ${date}`)

        setFocusTime(newArray)
    }

    useEffect(() => {
        console.log(`CurrTask: ${activeTask}, PrevTask: ${prevTaskRef.current}, CurrTimer:${timerActive}, PrevTimer:${prevTimerRef.current}`)
        
        //Btn start presionado con una tarea seleccionada: empezar a contar desde ahora.
        if ((timerActive && !prevTimerRef.current) && activeTask != -1 && activeTask === prevTaskRef.current) {
            setCurrentTime(Number.parseInt((Date.now()/1000).toFixed()))
            console.log(`start: contar desde ahora para ${activeTask} `)
        }
        // Btn pause con una tarea seleccionada: añadir tiempo de concentracion
        if ((!timerActive && prevTimerRef.current) && activeTask != -1 && activeTask === prevTaskRef.current) {
            addFocusTime(activeTask)
            console.log(`pause: añadir para ${activeTask}`)
        }
        
        //seleccionó otra tarea con el timer activado: guardar tiempo de concentracion a la anterior, y comenzar a contar para la nueva
        if ((timerActive && prevTimerRef.current) && activeTask != -1 && prevTaskRef.current != -1 && activeTask != prevTaskRef.current) {
            addFocusTime(prevTaskRef.current)
            setCurrentTime(Number.parseInt((Date.now()/1000).toFixed()))
            console.log(`seleccionar tarea: añadir a ${prevTaskRef.current} y contar para ${activeTask}`)
        }
        //seleccionó una tarea por primera vez, con el timer activado: empezar a contar desde ahora
        if ((timerActive && prevTimerRef.current) && activeTask != -1 && prevTaskRef.current == -1) {
            setCurrentTime(Number.parseInt((Date.now()/1000).toFixed()))
            console.log(`seleccionar tarea: contar desde ahora para ${activeTask}`)
        }

        prevTaskRef.current = activeTask
        prevTimerRef.current = timerActive
        

    }, [timerActive, activeTask]);


    useEffect( () => {
        getTasksData()
      }, [])

    async function getTasksData() {
        const urlEndPoint = `http://localhost:3000/api/tasks`
        const response = await fetch(urlEndPoint)
        const res = await response.json()
        setTasks(res.tasks)
    }

      async function postTask(nameTarea:string, estado:string, descripcion?:string) {
        // De momento todas a idUser 1
        const idUser = 1
        if (descripcion === undefined) descripcion = ''
        const urlEndPoint = `http://localhost:3000/api/tasks`
        const response = await fetch(urlEndPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nameTarea,
                estado,
                descripcion,
                idUser
            })
        })
        getTasksData()
    }

    return (

        <div 
            className="card bg-indigo-950"
            style={{
                display: 'flex',
                width: '45%',
                justifyContent: 'center',
                border: '1px dotted white',
                position: 'relative',
                left: '32.5%',
                padding: '15px',
                margin: '10px'
            }}
        >
            <div className="card">
                <div 
                    className="card-header text-center"
                    style={{border:"1px solid green"}}
                >
                    <TaskForm onNewTask={postTask} />
                </div>
                <div 
                    className="card-body text-center"
                    style={{
                        border:"1px solid blue"
                    }}
                >
                    <ul className="list-group">
                        {
                            tasks.map(({ nameTarea, estado, descripcion }, index) => { 
                                return <li
                                    style={{ textAlign: 'left', border: '1px dotted white ' }}
                                    className={activeTask != index ? 'list-group-item' : 'list-group-item active bg-slate-400'}
                                    key={index}
                                    onClick={
                                        () => {
                                            setActiveTask(index);
                                        }
                                    }
                                >
                                    {nameTarea}, {estado}, {descripcion || 'Sin Descripcion'},
                                    {
                                        focusTime.map(({task, time, date}, indexFocus) => {
                                            if (activeTask === index && task === index) {
                                                return `${time}seg+`
                                            }
                                            return ''
                                        })
                                    }
                                </li>
                        })
                        
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
