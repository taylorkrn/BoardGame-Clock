import React from 'react';
import './App.css';


export default function CountdownClock({SecsLeft}){
    function toTimeString(secsLeft){
        let newString = '';
        let remainderLeft = secsLeft;
        if (remainderLeft >=3600){
            const hours = Math.floor(remainderLeft / 3600);
            remainderLeft = remainderLeft % 3600;
            newString += `${hours}:`;
        }
        const minutes = Math.floor(remainderLeft / 60);
        remainderLeft = remainderLeft % 60;
        newString += `${minutes < 10 ? '0' : ''}${minutes}:${remainderLeft < 10 ? '0' : ''}${remainderLeft}`;
        return newString;
    };

    return(
        <div style={{display: "inline-block"}}>
            <p style={{display: "inline-block"}} className='time'>{toTimeString(SecsLeft)}</p>
        </div>
    )
}


// class CountdownClock extends Component{
//     constructor(props){
//         super(props);

//         this.state={
//             secsLeft: props.TimeAllowed,
//             stop: true
//         };
//     };

//     setTimer = (e) => {
//         let secs = 0;
//         const myArray = e.target.value.split(':');
//         secs += parseInt(myArray[0]) * 60;
//         this.setState({
//             secsLeft: secs
//         })
//         console.log(this.state.secsLeft);
//     }

//     startTimer = () => {
//         this.setState({
//             stop: false
//         })
//         const now = Date.now();
//         const then = now + this.state.secsLeft * 1000;

//         let countdown;
//         countdown = setInterval(() => {
//             //check if we should stop the timer
//             if(this.state.stop){
//                 clearInterval(countdown);
//                 return;
//             };
//             const secondsLeft = Math.round((then - Date.now()) / 1000);
//             this.setState({
//                 secsLeft: secondsLeft
//             });
//         }, 1000);
//     };

//     displayTime = (secsLeft) => {
//         let string = '';
//         let remainderLeft = secsLeft;
//         if (secsLeft >=3600){
//             const hours = Math.floor(secsLeft / 3600);
//             remainderLeft = remainderLeft % 3600;
//             string += `${hours}:`;
//         }
//         const minutes = Math.floor(remainderLeft / 60);
//         remainderLeft = remainderLeft % 60;
//         string += `${minutes}:${remainderLeft < 10 ? '0' : ''}${remainderLeft}`;
//         return string;
//     }

//     stopTimer = () => {
//         this.setState({
//             stop: true
//         })
//     }

//     render(){
//         return(
//             <div style={{display: "inline-block"}}>
//                 <p style={{display: "inline-block"}} className='time'>{this.displayTime(this.state.secsLeft)}</p>
//             </div>
//         );
//     }
// }

// export default CountdownClock;
