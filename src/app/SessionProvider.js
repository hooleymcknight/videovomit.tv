'use client';
import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export default function SessionProvider({ children, initialSession }) {
    const [session, setSession] = useState(initialSession);

    const updateSession = (newData) => {
        setSession(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <SessionContext.Provider value={{session, updateSession}}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);