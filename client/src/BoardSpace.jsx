import React from 'react';
import GamePiece from './GamePiece.jsx';


const BoardSpace = props => (
  <div 
    className={`board-space color-${props.color} ${props.validMove ? 'valid-move-spot' : ''}`}
    data-piece={props.piece}
    data-loc={props.loc}
    onClick={props.onSpaceClick}
  >
    {BoardSpace.MAP[props.piece]}
  </div>
);
BoardSpace.MAP = {
  '0': '\u0020',
  '1': '\u2659',
  '2': '\u2656',
  '3': '\u2658',
  '4': '\u2657',
  '5': '\u2655',
  '6': '\u2654',
  '-1': '\u265F',
  '-2': '\u265C',
  '-3': '\u265E',
  '-4': '\u265D',
  '-5': '\u265B',
  '-6': '\u265A',
}

export default BoardSpace;