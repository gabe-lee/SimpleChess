import React from 'react';
import GameBoard from './GameBoard.jsx';

const _NONE_ = 0, 
  B_PAWN = 1, B_ROOK = 2, B_KNIT = 3, B_BISH = 4, B_QUEN = 5, B_KING = 6,
  W_PAWN = -1, W_ROOK = -2, W_KNIT = -3, W_BISH = -4, W_QUEN = -5, W_KING = -6;
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.pieces = {

    }

    this.state = {
      board: [
        [B_ROOK,B_KNIT,B_BISH,B_QUEN,B_KING,B_BISH,B_KNIT,B_ROOK],
        [B_PAWN,B_PAWN,B_PAWN,B_PAWN,B_PAWN,B_PAWN,B_PAWN,B_PAWN],
        [_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_],
        [_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_],
        [_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_],
        [_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_,_NONE_],
        [W_PAWN,W_PAWN,W_PAWN,W_PAWN,W_PAWN,W_PAWN,W_PAWN,W_PAWN],
        [W_ROOK,W_KNIT,W_BISH,W_QUEN,W_KING,W_BISH,W_KNIT,W_ROOK]
      ]
    }
  }

  render() {
    return (
      <>
        <GameBoard boardState={this.state.board}/>
      </>
    );
  }
}