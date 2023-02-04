//TODO:
import { useContext, useState, useEffect } from 'react'
import Player from './Player'
import { AppContext, AppContextProvider } from './Context';
// import axios from 'axios';
import Speech from './Speech';


const Lobby = ({ docID }) => {
    const { players, setPlayers } = useContext(AppContext)

    return (
        <div>
            <>
                {
                    <Speech />
                /* {players.map((player) => (
                <Player key={player.id} player={player} docID={docID} />
            ))} */
                }
            </>
        </div>
    )
}


export default Lobby;
