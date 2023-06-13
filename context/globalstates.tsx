'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState} from 'react'

/**
 * AGREGAR AQUÍ LOS STATES QUE QUERAMOS USAR GLOBALMENTE
 * PERO PARA USARLOS DEBEN PONER 'use client';
 */

interface ContextProps {
    timerActive: boolean,
    setTimerActive: Dispatch<SetStateAction<boolean>>,
}

//valores iniciales
const GlobalContext = createContext<ContextProps>({
    timerActive: false,
    setTimerActive: ():boolean => false,
})

export const GlobalContextProvider = ({ children }: any) => {
    const [timerActive, setTimerActive] = useState(false)
    
    return (
        <GlobalContext.Provider
            value={{timerActive, setTimerActive}}
        >
            {children}
        </GlobalContext.Provider>
    );
}


export const useGlobalContext = () => useContext(GlobalContext)