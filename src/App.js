import React from 'react';
import './App.css';
import PlayerSetup from './PlayerSetup.js';


function App() {

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <header className="App-header">
        <h1>Board Game Clock</h1>
      </header>
      <div>
        <PlayerSetup />
      </div>
      <div style={{margin: '20px'}}>
        <button onClick={refreshPage}>Restart Game!</button>
      </div>
    </div>
  );
}

export default App;
