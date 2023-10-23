import React, { createContext, useContext, useEffect, useState } from "react";
import getDbo, { Dbo } from "../data/dbo";
import { Nullable } from "../models/Nullable";

interface Props {
    children: React.ReactNode
}

type AppTitle = string;

export interface GlobalContextValue {
    dbo: Dbo
}

const emptyDbo = getDbo();
const GlobalContext = createContext<GlobalContextValue>({dbo: emptyDbo})

const getDboFromStorage = (): Dbo | null => { 
    const json = localStorage.getItem('dbo');
    if (!json) return null;
    const dboJson: Dbo = JSON.parse(json);
    if (dboJson) return dboJson;

    return null;
}

export default function GlobalContextProvider({ children }: Props) { 
    
    const [dbo, setDbo] = useState(emptyDbo);

    //get dbo from storage
    useEffect(() => { 
        const dboJson = getDboFromStorage();
        if (dboJson) {
            setDbo(dboJson);
        } else { 
            localStorage.setItem('dbo', JSON.stringify(dbo));
        }

    }, [])

    return <GlobalContext.Provider value={{dbo}}>
        {children}
    </GlobalContext.Provider>
}

export function useGlobalContext() { 
    return useContext(GlobalContext);
}