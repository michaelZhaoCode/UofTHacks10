import React, { useEffect, useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where, setDoc } from "firebase/firestore";
import Lobby from "./Lobby";
import { AppContext, AppContextProvider } from './Context';

function Dashboard() {
    const { user, loading, error } = useContext(AppContext);
    const [name, setName] = useState("");
    const [pfp, setpfp] = useState("");
    const [docRef, setDocRef] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            setpfp(data.picture);
            setDocRef(doc.docs[0].id);
            console.log(docRef);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <>
            <div className="dashboard">
                <div className="dashboard__container">
                    Logged in as
                    <div>{name}</div>
                    {/* <div>{user?.email}</div> */}
                    <img
                        src={pfp}
                        alt="new"
                        style={{ width: 300, height: 200 }}
                    />
                    <button className="dashboard__btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* display docID of the user */}
            {/* <h1> {docRef}</h1> */}

            {docRef !== "" && < Lobby docID={docRef}  />}
        </>
    );
}
export default Dashboard;
