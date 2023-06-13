'use client';

import BasicModal from "./containers/basicmodal";
import CircleTimer from "./circletimer";
import { useEffect, useState } from "react";
import TimerForm from "./forms/timerform";
import { useGlobalContext } from "../context/globalstates";

export default function Timer() {

    let {timerActive, setTimerActive} = useGlobalContext()

    const [durations, setDurations] = useState({pomodoro: 25, shortBreak: 5, longBreak: 15});
    const [started, setStarted] = useState(false);
    const [duration, setDuration] = useState(25 * 60);
    const [key, setKey] = useState(0);
    const [isDurationModalOpen, setDurationModalOpen] = useState(false);
    const [pomodoroActive, isPomodoroActive] = useState(true);

    function setTimer(duration: number) {
        isPomodoroActive(duration == durations.pomodoro) 
        setStarted(false);
        setKey(key + 1);
        setDuration(duration * 60);
    }

    useEffect( () => {
        /* Si uso setTimerActive(started), por algun motivo el valor no es el correcto */
        //pomodoroActive ? timerActive = started : timerActive = false
        if (pomodoroActive) setTimerActive(started)
        //console.log(`timerActive: ${timerActive}, started: ${started}, pomodoroActive: ${pomodoroActive}`)
    }, [started])

    return (
        <>
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
                        <button onClick={() => setTimer(durations.pomodoro)}>Pomodoro |</button>
                        <button onClick={() => setTimer(durations.shortBreak)}>| Short Break |</button>
                        <button onClick={() => setTimer(durations.longBreak)}>| Long Break |</button>
                        <button onClick={() => setDurationModalOpen(true)}>| Personalizar Pomodoro</button>
                    </div>
                    <div 
                        className="card-body text-center"
                        style={{
                            border:"1px solid blue"
                        }}
                    >
                        <CircleTimer myKey={key} duration={duration} started={started}/>
                    </div>
                    <div 
                        className="card-footer text-center"
                        style={{
                            border:"1px solid red"
                        }}
                    >
                        <button onClick={() => setStarted(!started)}>{started ? "PAUSE " : "START"}</button>
                    </div>
                </div>
            </div>

            <div className="flex ml-auto mr-auto" style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                {
                    isDurationModalOpen && (
                        <BasicModal 
                        isOpen={isDurationModalOpen} 
                        handleClose={() => setDurationModalOpen(!isDurationModalOpen)}>
                            <TimerForm 
                                setDurations={(durations) => {setDurations(durations)}}
                                setOpen={(setOpen:boolean)=>{setDurationModalOpen(setOpen)}}
                                />
                        </BasicModal>
                    )
                }
            </div>
        </>
    )
}
