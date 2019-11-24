import React from 'react';
import M from './Map.js';

const BoardSpace = props => (
  <div 
    className={`board-space color-${props.color} ${props.validMove ? 'valid-move-spot' : ''}`}
    data-piece={props.piece}
    data-loc={props.loc}
    onClick={props.onSpaceClick}
  >
    {M.SYMB[props.piece]}
  </div>
);

export default BoardSpace;