import React from 'react';
import BoardSpace from './BoardSpace.jsx';

const GameBoard = props => (
  <div id="game-board">
    {[0,1,2,3,4,5,6,7].map(row => {
      return [0,1,2,3,4,5,6,7].map(col => <BoardSpace color={(row+col) % 2} piece={props.boardState[row][col]} key={`${row}${col}`}/>)
    })}
  </div>
)

export default GameBoard;