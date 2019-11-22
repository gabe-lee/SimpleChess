import React from 'react';
import BoardSpace from './BoardSpace.jsx';

export default GameBoard = props => (
  <div id="game-board">
    {[8,7,6,5,4,3,2,1].map(row => {
      [1,2,3,4,5,6,7,8].map(col => <BoardSpace color={(row+col) % 2} piece={props.boardState[row][col]} key={`${col}${row}`}/>)
    })}
  </div>
)