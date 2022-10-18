/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React, { useEffect } from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    const turn_id =[0,1,2,3,4,5]
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {turn_id.map((e) => {
                // console.log(guesses)
                // console.log(curGuess)
                if(turn == e){
                    // console.log(e.toString()+'c');
                    return(
                        <CurRow id={'row_'+turn.toString()} key={'row_'+turn.toString()} rowIdx={e} curGuess={curGuess}></CurRow>
                    )
                }
                else{
                    // console.log(guesses[e]);
                    return(
                        <Row id={'row_'+e.toString()} key={'row_'+e.toString()} rowIdx={e} guess={guesses[e]}></Row>
                    )
                }
            }

            )}
            
        </div>
    )
};
export default Board;
