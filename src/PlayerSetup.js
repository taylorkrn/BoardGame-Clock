import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import PlayerList from './PlayerList.js';

function PlayerSetup(){

    const [numPlayers, setNumPlayers] = useState(0);
    const [timeAllowed, setTimeAllowed] = useState(0);
    const [players, setPlayers] = useState([]);
    const [counter, setCounter] = useState(0);

    const firstLoad = useRef(true);

    const noPlayersRef = useRef();

    let interval;

    function handlePlayers(e) {
        e.preventDefault();
        const noPlayers = noPlayersRef.current.value;
        if (!(noPlayers > 1 && noPlayers <= 6)) {
            alert('Invalid amount of Players, must be between 2 and 6');
            return;
        };
        setNumPlayers(noPlayers);
        const myArray = [];
        for (let i=0; i<noPlayers; i++){
            myArray.push({Id: i, Name: `Player ${i+1}`, Position: i, TimeAllowed: timeAllowed, Active: false, AlreadyCounting: false});
        }
        setPlayers(myArray);
        document.querySelector('#StartForm').style.display = 'none';
        document.querySelector('#TimeForm').style.display = 'block';
    }

    const timeAllowedRef = useRef();

    function handleTime(e) {
        e.preventDefault();
        const timeLimit = timeAllowedRef.current.value;
        if (!(timeLimit => 1 && timeLimit <= 300)) {
            alert('Invalid amount of Time, must be between 1 and 300');
            return;
        };
        setTimeAllowed(timeLimit);
        setPlayers((oldPlayers) => oldPlayers.map(player => {
            return {...player, TimeAllowed: timeLimit*60};
        }))
        document.querySelector('#TimeForm').style.display = 'none';
        document.querySelector('#StartGame').style.display = 'block';
        const names = document.querySelectorAll('.name');
        names.forEach(name => name.disabled = false);
    }

    useEffect(() => {
        if (firstLoad.current){
            firstLoad.current = false;
            return;
        }
        handleCountdown(counter);
    }, [players]);

    function handleStartGame(e){
        // readyForCount.current = true;
        setPlayers((oldPlayers) => oldPlayers.map((player) => player.Id === 0 ? {...player, Active: true} : {...player}));
        document.querySelector('#StartGame').style.display = 'none';
        const names = document.querySelectorAll('.name');
        names.forEach(name => name.disabled = true);
        document.getElementById('0').style.visibility="visible";
        console.log(players);
    }

    function handleNextTurn(){
        clearInterval(interval);
        console.log(counter);
        setPlayers((oldPlayers) => oldPlayers.map((player) => player.Id === counter ? {...player, Active: false, AlreadyCounting: false} : {...player}));
        const nextCounter = (counter + 1) % numPlayers;
        document.getElementById(`${counter}`).style.visibility="hidden";
        setCounter(oldCounter => nextCounter);
        if (nextCounter === 0){
            checkForOrderChange();
            return;
        }
        // readyForCount.current = true;
        setPlayers((oldPlayers) => oldPlayers.map((player) => player.Id === nextCounter ? {...player, Active: true} : {...player}));
        document.getElementById(`${nextCounter}`).style.visibility="visible";
    }

    function handleCountdown(myCounter){
        if (!players[myCounter].Active || players[myCounter].AlreadyCounting){
            return;
        }
        const now = Date.now();
        const then = now + players[myCounter].TimeAllowed * 1000;
        interval = setInterval(() => {
            //check if we should stop the timer
            console.log(players[myCounter].Active);
            if(!players[myCounter].Active){
                console.log("Out!");
                clearInterval(interval);
                return;
            };
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            setPlayers((oldPlayers) => oldPlayers.map((player) => player.Id === myCounter ? {...player, TimeAllowed: secondsLeft, AlreadyCounting: true} : {...player}));
            if (secondsLeft <= 0){
                alert(`${players[myCounter].Name} ran out of time`);
                clearInterval(interval);
                return;
            }
        }, 1000);
    }

    function checkForOrderChange(){
        const positions = document.querySelectorAll('.position');
        positions.forEach(pos => pos.disabled = false);
        document.querySelector('.changeOrder').style.display = 'block';
    }

    function handleOrderChange(){
        // readyForCount.current = true;
        const myArray = [...players];
        myArray.sort((a,b) => a.Position > b.Position ? 1 : -1);
        setPlayers(oldPlayers => {oldPlayers.map((player) => player.Id === 0 ? {...myArray[player.Id], Id: player.Id, Active: true} : {...myArray[player.Id], Id: player.Id})});
        const positions = document.querySelectorAll('.position');
        positions.forEach(pos => pos.disabled = true);
        document.querySelector('.changeOrder').style.display = 'none';
        document.getElementById('0').style.visibility="visible";
    }

    function handleInternalPosition(oldPos, newPos) {
        setPlayers((oldPlayers) => oldPlayers.map((player) => player.Id === oldPos ? {...player, Position: newPos} : {...player}));
    }

    function handleNameChange(newName, position){
        setPlayers((oldPlayers) => oldPlayers.map((player) => player.Id === position ? {...player, Name: newName} : {...player}));
    }

    function endGame(){
        document.getElementById(`${counter}`).style.visibility="hidden";
    }

    return(
        <div style={{margin: '10px'}}>
          <form onSubmit={handlePlayers} id="StartForm">
            <label>
              Number of Players:
              <input type="number" ref={noPlayersRef} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <form onSubmit={handleTime} style={{display: 'none'}} id="TimeForm">
            <label>
              Amount of Time (Minutes):
              <input type="number" ref={timeAllowedRef} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div style={{display: 'none'}} id="StartGame">
              <p>Set Player Names</p>
              <button onClick={handleStartGame}>Start Game</button>
          </div>
          <div>
            <PlayerList
                Players = {players}
                HandleOrderChange = {handleOrderChange}
                HandleNextTurn = {handleNextTurn}
                HandleNameChange = {handleNameChange}
                HandleInternalPosition = {handleInternalPosition}
            />
          </div>
        </div>
    );


}

export default PlayerSetup;



        // document.querySelector('#StartForm').style.display = 'none';
        // document.querySelector('#TimeForm').style.display = 'block';
        // const names = document.querySelectorAll('.nameInput');
        // names.forEach(name => name.disabled = false);
