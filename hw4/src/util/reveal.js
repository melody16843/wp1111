/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, gameOver, win) => {
    if (board[x][y].revealed || gameOver || board[x][y].flagged) return{ board, newNonMinesCount, gameOver, win};
    board[x][y].revealed = true;
    newNonMinesCount--;
    if(board[x][y].value == '💣'){

      gameOver = true;
    }
    else if(newNonMinesCount == 0){
      win = true;
    }
    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    return { board, newNonMinesCount, gameOver, win};
};
