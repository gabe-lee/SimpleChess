import React from 'react';
import GamePiece from './GamePiece.jsx';

const BoardSpace = props => (
  <div 
    className={`board-space color-${props.color}`}
    data-piece={props.piece}
    data-loc={props.loc}
    onClick={props.onSpaceClick}
  >
  </div>
)

export default BoardSpace;