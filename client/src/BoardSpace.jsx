import React from 'react';
import GamePiece from './GamePiece.jsx';

export default BoardSpace = props => (
  <div className={`board-space color-${props.color}`}>
    <GamePiece type={props.pieceType} />
  </div>
)