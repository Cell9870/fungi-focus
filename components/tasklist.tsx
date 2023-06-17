'use client';

import { useEffect, useRef, useState } from "react";
import TaskForm from "./forms/taskform";
import { useGlobalContext } from "../context/globalstates";

interface ITask {
    id: number
    nameTarea: string
    estado: string
    descripcion: string
}

interface IFocusTime {
    id: number
    concentracionTime: number
    horaAndFecha: string
    idUser: number
    idTarea: number
}

export default function TasksList() {
    const {timerActive} = useGlobalContext()

    
    const [tasks, setTasks] = useState<ITask[]>([])
    const [focusTime, setFocusTime] = useState<IFocusTime[]>([])
    const [currentTime, setCurrentTime] = useState(Number.parseInt((Date.now()/1000).toFixed()))
    const [activeTask, setActiveTask] = useState(-1)
    const prevTaskRef = useRef<number>(-1)
    const prevTimerRef = useRef<boolean>(false)

    function getFocusTimeForTask(id:number) {
        let resul = 0
        if (activeTask === id) {
            focusTime.forEach(({concentracionTime, idTarea}) => {
                if (idTarea === id)
                    resul += concentracionTime
            })

            const hour = Math.floor(resul / 3600)
            const min = Math.floor((resul % 3600) / 60)
            const sec = resul % 60

            const strHour = hour ? ((hour < 10 ? "0" : "") + hour + ":") : ""
            const strMin = min ? ((min < 10 ? "0" : "") + min + ":") : "0:" 
            return strHour + strMin
                + (sec < 10 ? "0" : "") + sec
        } else return ""
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
            postFocusTime(activeTask)
            console.log(`pause: añadir para ${activeTask}`)
        }
        
        //seleccionó otra tarea con el timer activado: guardar tiempo de concentracion a la anterior, y comenzar a contar para la nueva
        if ((timerActive && prevTimerRef.current) && activeTask != -1 && prevTaskRef.current != -1 && activeTask != prevTaskRef.current) {
            postFocusTime(prevTaskRef.current)
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
        let urlEndPoint = `http://localhost:3000/api/tasks`
        let response = await fetch(urlEndPoint)
        let res = await response.json()
        setTasks(res.tasks)

        urlEndPoint = `http://localhost:3000/api/tasks/focusTimes`
        response = await fetch(urlEndPoint)
        res = await response.json()
        setFocusTime(res.focusTime)
    }

    async function postFocusTime(idTarea:number) {
        const idUser = 1
        const concentracionTime = Number.parseInt((Date.now()/1000).toFixed()) - currentTime

        if (concentracionTime > 4) { // arbitrario, lo podemos cambiar despues (ej 1 minuto minimo)
            const urlEndPoint = `http://localhost:3000/api/tasks/focusTimes`
            const response = await fetch(urlEndPoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // id : AutoIncrement
                    concentracionTime,
                    // horaAndFecha : now() en sql
                    idUser, // Por ahora id=1
                    idTarea
                })
            }
            )
            getTasksData()
        }
        else console.log("logitud de concentracion muy corta")
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
                // id : AutoIncrement
                nameTarea,
                estado,
                descripcion,
                idUser // Por ahora id=1
            })
        })
        getTasksData()
    }

    async function updateTaskState(id:number, state:string) {
        const urlEndPoint = `http://localhost:3000/api/tasks`
        const response = await fetch(urlEndPoint, {
            method: "PATCH", 
            headers: {
                "Content-Type": "applications/json"
            },
            body: JSON.stringify({
                id,
                state
            })
        })
        //getTasksData()
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
                    className="card-body text-center"
                    style={{
                        border:"1px solid blue"
                    }}
                >
                    <ul className="list-group" >
                        {
                            tasks.map(({ nameTarea, estado, descripcion, id }, index) => { 
                                return (
                                <li
                                    style={{ textAlign: 'left', border: '1px dotted white ' }}
                                    className={activeTask != id ? 'list-group-item' : 'list-group-item active bg-gray-800'}
                                    key={id}
                                    onClick={
                                        () => {
                                            setActiveTask(id);
                                        }
                                    }
                                >
                                    <dl>
                                        <dt style={{display:'block', float:'right'}}>
                                            <small>Nombre de la Tarea</small>
                                        </dt>
                                            <dd style={{color:'lime'}}>{nameTarea}</dd>
                                        <dt style={{display:'block', float:'right'}}>
                                            <small>Estado</small>
                                        </dt>
                                            <dd style={{color:'green'}}>{(estado=='done'?'Finalizada':(estado=='notStarted'?'No empezada':'Pendiente')) }</dd>
                                        <dt style={{display:'block', float:'right'}}>
                                            <small>{activeTask==id?'Descripcion':''}</small>
                                        </dt>
                                            <dd style={{color:'gray'}}>{activeTask==id?(descripcion || 'Sin Descripcion'):''}</dd>
                                        <dt style={{display:'block', float:'right'}}>
                                            <small>{activeTask==id?'Tiempo dedicado':''}</small>
                                        </dt>
                                            <dd style={{color:'yellow'}}>{getFocusTimeForTask(id)}</dd>
                                        <dt style={{display:'block', float:'right', color:'red'}}>
                                            {(activeTask==id && estado==='pending')?<button onClick={()=>{updateTaskState(id, 'done')}}>Finalizar</button>:''} 
                                        </dt>
                                            <dd style={{color:'red'}}>
                                                {(activeTask==id && estado==='pending')?'-':''}
                                            </dd>
                                    </dl>
                                    
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div 
                    className="card-footer text-center"
                    style={{border:"1px solid green"}}
                    onClick={
                        () => {
                            setActiveTask(-1)
                        }
                    }
                >
                    <TaskForm onNewTask={postTask} />
                </div>
            </div>
        </div>
    );
}
