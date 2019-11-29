import React from 'react';
import T from 'prop-types';
import M from './Map';

const BoardSpace = ({
  color, validMove, piece, loc, onSpaceClick,
}) => (
  <button
    type="button"
    className={`board-space color-${color} ${validMove ? 'valid-move-spot' : ''}`}
    data-piece={piece}
    data-loc={loc}
    onClick={onSpaceClick}
  >
    {M.SYMB(piece)}
  </button>
);
BoardSpace.propTypes = {
  color: T.number.isRequired,
  validMove: T.number.isRequired,
  piece: T.number.isRequired,
  loc: T.string.isRequired,
  onSpaceClick: T.func.isRequired,
};
export default BoardSpace;
