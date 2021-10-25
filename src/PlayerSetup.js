import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import PlayerList from './PlayerList.js';

function PlayerSetup(){

    const [players, setPlayers] = useState([]);
    const [counter, setCounter] = useState(0);

    const colors = ['red', 'green', 'yellow', 'blue', 'white', 'black'];

    // Ref so that UseEffect is not run when the page is first loaded
    const firstLoad = useRef(true);

    useEffect(() => {
        if (firstLoad.current){
            firstLoad.current = false;
            return;
        }
        const myCounter = counter;
        if (!players[counter].Active){
            return;
        }
        const now = Date.now();
        const then = now + players[myCounter].TimeAllowed * 1000;
        const timer = setTimeout(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            setPlayers(previousPlayers => previousPlayers.map(player => player.Id === myCounter ? {...player, TimeAllowed: secondsLeft} : {...player}));
        }, 1000);
        return () => clearTimeout(timer);
    }, [players, counter]);

    let numPlayers = 0;
    let timeAllowed = 0;

    // Ref to save and use the input for amount of time
    const noPlayersRef = useRef();

    //Set number of players based on Input
    function handlePlayers(e) {
        e.preventDefault();
        numPlayers = noPlayersRef.current.value;
        if (!(numPlayers > 1 && numPlayers <= 6)) {
            alert('Invalid amount of Players, must be between 2 and 6');
            return;
        };
        const myArray = [];
        for (let i=0; i<numPlayers; i++){
            myArray.push({Id: i, Name: `Player ${i+1}`, Position: i, TimeAllowed: timeAllowed, Active: false, Color: colors[i]});
        }
        setPlayers(myArray);
        document.querySelector('#StartForm').style.display = 'none';
        document.querySelector('#TimeForm').style.display = 'block';
    }

    // Ref to save and use the input for amount of time
    const timeAllowedRef = useRef();

    //Set amount of time allowed based on input
    function handleTime(e) {
        e.preventDefault();
        timeAllowed = timeAllowedRef.current.value;
        if (!(timeAllowed => 1 && timeAllowed <= 300)) {
            alert('Invalid amount of Time, must be between 1 and 300');
            return;
        };
        setPlayers(oldPlayers => oldPlayers.map(player => {
            return {...player, TimeAllowed: timeAllowed*60};
        }))
        document.querySelector('#TimeForm').style.display = 'none';
        document.querySelector('#StartGame').style.display = 'block';
        const names = document.querySelectorAll('.name');
        names.forEach(name => name.disabled = false);
    }

    //Function to start the game
    function handleStartGame(e){
        setPlayers(oldPlayers => oldPlayers.map(player => player.Id === 0 ? {...player, Active: true} : {...player}));
        document.querySelector('#StartGame').style.display = 'none';
        const names = document.querySelectorAll('.name');
        names.forEach(name => name.disabled = true);
        document.getElementById('0').style.visibility="visible";
    }

    //Function to move onto the next player's turn
    function handleNextTurn(){
        document.getElementById(`${counter}`).style.visibility="hidden";
        const nextCounter = (counter + 1) % players.length;
        if (nextCounter === 0){
            setPlayers(oldPlayers => oldPlayers.map(player => {
                if (player.Id === counter){
                    return {...player, Active: false, AlreadyCounting: false}
                } else {
                    return {...player};
                }
            }));
            setCounter(counter => nextCounter);
            checkForOrderChange();
        } else {
            document.getElementById(`${nextCounter}`).style.visibility="visible";
            setPlayers(oldPlayers => oldPlayers.map(player => {
                if (player.Id === nextCounter){
                    return {...player, Active: true}
                } else if (player.Id === counter){
                    return {...player, Active: false, AlreadyCounting: false}
                } else {
                    return {...player};
                }
            }));
            setCounter(counter => nextCounter);
        }
    }

    //Function to allow players to change their order
    function checkForOrderChange(){
        const positions = document.querySelectorAll('.position');
        positions.forEach(pos => pos.disabled = false);
        document.querySelector('.changeOrder').style.display = 'block';
    }

    //Reordering players based on input
    function handleOrderChange(){
        const myArray = [...players];
        myArray.sort((a,b) => a.Position > b.Position ? 1 : -1);
        myArray[0].Active = true;
        for (let i = 0; i < myArray.length; i++){
            myArray[i].Id = i;
        }
        setPlayers(myArray);
        const positions = document.querySelectorAll('.position');
        positions.forEach(pos => pos.disabled = true);
        document.querySelector('.changeOrder').style.display = 'none';
        document.getElementById('0').style.visibility="visible";
    }

    //Function to change the individual players 'position' (The position attribute will then be used to order the players)
    function handleInternalPosition(oldPos, newPos) {
        setPlayers((oldPlayers) => oldPlayers.map(player => player.Id === oldPos ? {...player, Position: newPos} : {...player}));
    }

    //Function to change the individual players' names
    function handleNameChange(newName, position){
        setPlayers((oldPlayers) => oldPlayers.map(player => player.Id === position ? {...player, Name: newName} : {...player}));
    }

    function endGame(){
        document.getElementById(`${counter}`).style.visibility="hidden";
    }

    return(
        <div className="HoldingDiv" style={{margin: '10px'}}>
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
