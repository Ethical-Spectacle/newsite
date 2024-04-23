'use client';
import { createContext, useContext, useState } from "react";

const LoggedContext = createContext(false);

export const LoggedContextProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  return (
    <LoggedContext.Provider value={{ logged, setLogged }}>
      {children}
    </LoggedContext.Provider>
  );
}

export const useLogged = () => useContext(LoggedContext);