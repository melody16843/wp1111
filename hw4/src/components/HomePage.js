/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';


const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}

  const detectInvlid = () =>{
    var mine = document.getElementById('mines').value;
    var boardsize = document.getElementById('boardsize').value;
    mineNumOnChange(mine);
    boardSizeOnChange(boardsize);
    if(boardsize*boardsize-mine>0){
      setError(e => {return false})
    }
    else{
      setError(e => {return true})
    }
  }
  const detectPanel = () =>{
    if(showPanel == true){
      setShowPanel(e => {return false});
    }
    else{
      setShowPanel(e =>{return true});
    }
  }
  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      <button className='btn' onClick={error==0 ?startGameOnClick:""}>start game</button>
      <div className='controlContainer'>
        <button className='btn' onClick={detectPanel}>Difficulty Adjustment</button>
        <div className='controlWrapper' style={{"display":showPanel==1 ? "":"none"}}>
          <div className='error' style={{"display":error==1 ? "":"none"}}> ERRORS: Mines number and board size are invalid</div>
          <div className='controlPane'>
            <div className='controlCol'>
              <p className='controlTitle'>Mines Number</p>
              <input id='mines' type={'range'} step="1" min='1' max='100' defaultValue={"10"} onChange={detectInvlid}></input>
              <p className='controlNum' style={{"color": error==1? "#880000":"#0f0f4b"}}>{mineNum}</p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board Size(n*n)</p>
              <input id='boardsize' type={'range'} step="1" min='2' max='20' defaultValue={"10"} onChange={detectInvlid}></input>
              <p className='controlNum' style={{"color": error==1? "#880000":"#0f0f4b"}}>{boardSize}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}
export default HomePage;   