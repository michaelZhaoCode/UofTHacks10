import { createContext, useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [players, setPlayers] = useState([
        {
            id: 1,
            color: 'white'
        },
        {
            id: 2,
            color: 'white'
        },
        {
            id: 3,
            color: 'white'
        },
        {
            id: 4,
            color: 'white'
        }
    ]);

    const [colors, setColors] = useState([
        { value: 'red', label: 'red', disabled: false },
        { value: 'blue', label: 'blue', disabled: false },
        { value: 'green', label: 'green', disabled: false },
        { value: 'purple', label: 'purple', disabled: false },
        { value: 'white', label: 'Undecided'}
    ]);

    const [user, loading, error] = useAuthState(auth);
    // const [docID, setDocID] = useState('');

    // useEffect(
    // )
    // const [userEmail] = useState(user.email);


    return (
        <AppContext.Provider value={{ players, setPlayers, colors, setColors, user, loading }}>
            {children}
        </AppContext.Provider>
    );
};


export { AppContext, AppContextProvider };
