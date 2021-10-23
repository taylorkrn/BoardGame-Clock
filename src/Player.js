import React from 'react';
import './App.css';
import CountdownClock from './CountdownClock.js'


export default function Player({ player, HandleNextTurn, HandleNameChange, HandleInternalPosition}){

    const position = player.Position;

    function handleName(e){
        HandleNameChange(e.target.value, position-1);
    }

    function handlePosition(e){
        HandleInternalPosition(position-1,parseInt(e.target.value));
    }

    return(
        <div>
            <input value={player.Name} onChange={handleName} disabled={true} className='name'/>
            <input type='number' value={player.Position} onChange={handlePosition} disabled={true} className='position'/>
            <CountdownClock
                SecsLeft = {player.TimeAllowed}
            />
            <button onClick={HandleNextTurn} style={{visibility: "hidden"}} className='nextTurn' id={position}> > </button>
        </div>
    )
}


// class Player extends Component{
//     constructor(props){
//         super(props);

//         this.state={
//             playerName: '',
//             position: props.Position,
//             timeAllowed: props.TimeAllowed
//         };
//     };

//     changeName = (e) => {
//         this.setState({
//             playerName: e.target.value
//         })
//     };

//     changePosition = (e) => {
//         this.setState({
//             playerName: e.target.value
//         })
//     };



//     render(){
//         return(
//             <div style={{display: "inline-block"}}>
//                 <form style={{display: "inline-block"}}>
//                     <label>
//                         Name:
//                         <input type="text" value={this.state.playerName} onChange={this.changeName} disabled={true} className='nameInput'/>
//                     </label>
//                     <label>
//                         Position:
//                         <input type="text" value={this.state.position} onChange={this.changePosition} disabled={true} className='positionInput'/>
//                     </label>
//                 </form>
//                 <CountdownClock
//                     TimeAllowed = {props.TimeAllowed}
//                 />
//             </div>
//         );
//     }
// }

// export default Player;
