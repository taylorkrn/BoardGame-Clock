import React from 'react';
import './App.css';
import Player from './Player.js'

export default function PlayerList({ Players, HandleOrderChange, HandleNextTurn, HandleNameChange, HandleInternalPosition}){

    return(
        <div>
            {Players.map(player => {
                return <Player key={player.Id} player={player} HandleNextTurn={HandleNextTurn} HandleNameChange={HandleNameChange} HandleInternalPosition={HandleInternalPosition}/>
            })}
            <div className='changeOrder' style={{display: 'none'}}>
                <p>Change Player Order</p>
                <button onClick={HandleOrderChange}>Confirm Order</button>
            </div>
        </div>
    )
}
