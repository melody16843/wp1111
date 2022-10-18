/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div id={rowIdx.toString()+'0'} key={rowIdx.toString()+'0'} className='Row-wordbox'>{letters.length>0 ? letters[0]:''}</div>
                <div id={rowIdx.toString()+'1'} key={rowIdx.toString()+'1'} className='Row-wordbox'>{letters.length>1 ? letters[1]:''}</div>
                <div id={rowIdx.toString()+'2'} key={rowIdx.toString()+'2'} className='Row-wordbox'>{letters.length>2 ? letters[2]:''}</div>
                <div id={rowIdx.toString()+'3'} key={rowIdx.toString()+'3'} className='Row-wordbox'>{letters.length>3 ? letters[3]:''}</div>
                <div id={rowIdx.toString()+'4'} key={rowIdx.toString()+'4'} className='Row-wordbox'>{letters.length>4 ? letters[4]:''}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
