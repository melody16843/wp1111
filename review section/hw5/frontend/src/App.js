import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { guess, startGame, restart } from './axios.js'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleGuess = async() => {
    const response = await guess(number);
    if (response === 'Equal') setHasWon(true);
    else {
      setStatus(response);
      setNumber('');
    }
  }

  const handleStartMenu = async() => {
    const response = await startGame();
    if (response === 'The game has started.') setHasStarted(true);
  }

  const handleRestart = async() => {
    const response = await restart();
    if (response === 'The game has restarted.') {
      setHasWon(false);
      setNumber('');
      setStatus('');
    }
  }

  const handleNum = (e) => {
    setNumber(e.target.value);
  }

  const startMenu = (
    <div>
      <button onClick={handleStartMenu}>start game</button>
    </div>
    )

  //
  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={number} onChange={handleNum}></input>
      <button onClick={handleGuess} disabled={!number}>guess!</button>
      <p>{status}</p>
    </>
    )

  //
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
    )

  //
  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
    )

  //
  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
    )
}

export default App;
