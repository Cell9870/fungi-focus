"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

/**
 * AGREGAR AQUÍ LOS STATES QUE QUERAMOS USAR GLOBALMENTE
 * PERO PARA USARLOS DEBEN PONER 'use client';
 */

interface ITimerState {
  current: string;
  key: number;
  laps: number;
}

interface ContextProps {
  timerActive: boolean;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  timerState: ITimerState;
  setTimerState: Dispatch<SetStateAction<ITimerState>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  baseUrl: string
}

//valores iniciales
const GlobalContext = createContext<ContextProps>({
  timerActive: false,
  setTimerActive: (): boolean => false,
  timerState: { current: "pomodoro", key: 0, laps: 0 },
  setTimerState: (): ITimerState => {
    return { current: "pomodoro", key: 0, laps: 0 };
  },
  theme: "dark",
  setTheme: (): string => "dark",
  baseUrl : process.env.PUBLIC_URL as string
});

export const GlobalContextProvider = ({ children }: any) => {
  const [timerActive, setTimerActive] = useState(false);
  const [timerState, setTimerState] = useState({
    current: "pomodoro",
    key: 0,
    laps: 0,
  });
  const [theme, setTheme] = useState("dark");
  const baseUrl = process.env.PUBLIC_URL as string

  return (
    <GlobalContext.Provider
      value={{
        timerActive,
        setTimerActive,
        timerState,
        setTimerState,
        theme,
        setTheme,
        baseUrl
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
