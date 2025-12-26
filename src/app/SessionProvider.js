'use client';
import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export default function SessionProvider({ children, session }) {
    const [sessionData, setSessionData] = useState(session);

    const updateSession = (newData) => {
        setSessionData(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <SessionContext.Provider value={{sessionData, updateSession}}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);