import React from 'react';

const MAP = {
  // 0: '&nbsp;',
  1: 'B-PAWN',
  2: 'B-ROOK',
  3: 'B-KNIGHT',
  4: 'B-BISHOP',
  5: 'B-QUEEN',
  6: 'B-KING',
  '-1': 'W-PAWN',
  '-2': 'W-ROOK',
  '-3': 'W-KNIGHT',
  '-4': 'W-BISHOP',
  '-5': 'W-QUEEN',
  '-6': 'W-KING'
}
const GamePiece = props => (
  <div>{MAP[props.type]}</div>
);

export default GamePiece