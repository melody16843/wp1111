/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, gameOver, win, boardSize) => {
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
    let current_xy = [];
    if(board[x][y].value == 0){
      current_xy.push([x,y]);
    }

    var reveal_more = (cx, cy) => {
      if (board[cx][cy].flagged == false){
        board[cx][cy].revealed = true;
        newNonMinesCount--;
        if (board[cx][cy].value == 0){
          current_xy.push([cx, cy]);
        }
      }
      return;
    }
    
    while (current_xy.length != 0){
      console.log(current_xy[0]);
      let current_x = current_xy[0][0];
      let current_y = current_xy[0][1];
      if (current_x>0){
        if(board[current_x-1][current_y].revealed == false){
          reveal_more(current_x-1, current_y);
        }
      }
      if(current_y>0){
        if(board[current_x][current_y-1].revealed == false){
          reveal_more(current_x, current_y-1);
        }
      }
      if (current_x<boardSize-1){
        if(board[current_x+1][current_y].revealed == false){
          reveal_more(current_x+1, current_y);
        }
      }
      if(current_y<boardSize-1){
        if(board[current_x][current_y+1].revealed == false){
          reveal_more(current_x, current_y+1);
        }
      }
      if(current_x>0 &current_y>0){
        if(board[current_x-1][current_y-1].revealed == false){
          reveal_more(current_x-1, current_y-1);
        }
      }
      if(current_x>0 &current_y<boardSize-1){
        if(board[current_x-1][current_y+1].revealed == false){
          reveal_more(current_x-1, current_y+1);
        }
      }
      if(current_x<boardSize-1 &current_y>0){
        if(board[current_x+1][current_y-1].revealed == false){
          reveal_more(current_x+1, current_y-1);
        }
      }
      if(current_x<boardSize-1 & current_y<boardSize-1){
        if(board[current_x+1][current_y+1].revealed == false){
          reveal_more(current_x+1, current_y+1);
        }
      }
      current_xy.shift();
    }
    
  

    return { board, newNonMinesCount, gameOver, win};
};
