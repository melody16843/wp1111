/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div id={rowIdx.toString()+'-0'} key={rowIdx.toString()+'-0'} className={typeof(guess) != "undefined" ? 'Row-wordbox '+guess[0].color:'Row-wordbox'}>{typeof(guess) != "undefined" ? guess[0].char:''}</div>
                <div id={rowIdx.toString()+'-1'} key={rowIdx.toString()+'-1'} className={typeof(guess) != "undefined" ? 'Row-wordbox '+guess[1].color:'Row-wordbox'}>{typeof(guess) != "undefined" ? guess[1].char:''}</div>
                <div id={rowIdx.toString()+'-2'} key={rowIdx.toString()+'-2'} className={typeof(guess) != "undefined" ? 'Row-wordbox '+guess[2].color:'Row-wordbox'}>{typeof(guess) != "undefined" ? guess[2].char:''}</div>
                <div id={rowIdx.toString()+'-3'} key={rowIdx.toString()+'-3'} className={typeof(guess) != "undefined" ? 'Row-wordbox '+guess[3].color:'Row-wordbox'}>{typeof(guess) != "undefined" ? guess[3].char:''}</div>
                <div id={rowIdx.toString()+'-4'} key={rowIdx.toString()+'-4'} className={typeof(guess) != "undefined" ? 'Row-wordbox '+guess[4].color:'Row-wordbox'}>{typeof(guess) != "undefined" ? guess[4].char:''}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;