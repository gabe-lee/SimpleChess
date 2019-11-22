import React from 'react';
import GamePiece from './GamePiece.jsx';

const BoardSpace = props => (
  <div className={`board-space color-${props.color}`}>
    <GamePiece type={props.piece} />
  </div>
)

export default BoardSpace;