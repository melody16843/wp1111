import logo from './logo.svg';
import './App.css';
import {guess, startGame, restart}
  from './axios.js'
import React, {useState } from 'react';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const startgame = async () => {
    const response = await startGame();
    if (response === 'The game has started.') setHasStarted(true)
    else{
      setStatus('lost connect with server')
    }
  }

  const startMenu = 
    (<div>
      <button onClick = {startgame} >start game</button>
    </div> )

  const handleGuess = async (event) => {
    const response = await guess(number)
    document.getElementById('number').value = ''
    console.log(response)
    try{
      if (response === 'Equal') setHasWon (true)
      else if (response === 'Larger' || response === 'Smaller') {
        setStatus(response)
        setNumber('')
      }
      else{

        setStatus('Error: '+number.toString()+' is not legal number (1-100).')
        setNumber('')
      }
    }
    catch(error){
      setStatus('lost connect with server')
    }
  }

  const handleInput = (event) => {

    setNumber(event.target.value)

  }

  const gameMode =
    (<>
      <p>Guess a number between 1 to 100</p>
      <input id='number' onChange={handleInput}></input>
      <button onClick={handleGuess} >guess!</button>
      <p>{status}</p>
    </>)

  const handleRestart = async() => {
    const response = await restart();
    try{
      if (response === 'The game has started.') {
        setHasStarted(true)
        setHasWon(false)
        setStatus('')
      }
      else{
        setStatus('lost connect with server')
      }
    }
    catch (error){
      setStatus('lost connect with server')
    }
  }

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
  )
    
  const game = 
    (<div>
      {hasWon ? winningMode:gameMode}
    </div>)

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
