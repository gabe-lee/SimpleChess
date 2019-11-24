import React from 'react';
import GameBoard from './GameBoard.jsx';

const _NONE_ = 0, WHITE = 10, BLACK = -10,
  B_PAWN = -1, B_ROOK = -2, B_KNIT = -3, B_BISH = -4, B_QUEN = -5, B_KING = -6,
  W_PAWN =  1, W_ROOK =  2, W_KNIT =  3, W_BISH =  4, W_QUEN =  5, W_KING =  6;
export default class App extends React.Component {
  constructor(props) {
    super(props);

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
      ],
      turn: WHITE,
      selectedPiece: _NONE_,
      selectedCoord: [],
      pieceMoves: [
        [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
      ]
    }

    this.onSpaceClick = event => {
      let data = event.target.dataset;
      let piece = Number(data.piece);
      let row = Number(data.loc.charAt(0));
      let col = Number(data.loc.charAt(1))
      console.log('clicked! data.piece:', piece, 'turn: ', this.state.turn)
      console.log(`Logic: (${this.state.turn} < 0 === ${piece} < 0) \n-> (${this.state.turn  < 0} === ${piece < 0}) \n-> ${(this.state.turn  < 0 === piece < 0)}`)
      if (piece !== 0 && this.state.turn < 0 === piece < 0) {
        console.log('clicked piece of same turn color! turn: ', this.state.turn, 'piece: ', piece)
        console.log('clicked piece of same turn color! turn: ', this.state.turn, 'piece: ', piece)
        this.setState({
          selectedPiece: piece,
          selectedCoord: [row, col],
        }, () => {
          let validMoves = this.getValidMoves();
          this.setState({
            pieceMoves: validMoves
          })
        })
      } else if (this.state.pieceMoves[row][col] === 1) {
        let newBoard = this.state.board.slice();
        newBoard[row][col] = this.state.selectedPiece;
        newBoard[this.state.selectedCoord[0]][this.state.selectedCoord[1]] = _NONE_;
        this.setState({
          board: newBoard,
          turn: this.state.turn === WHITE ? BLACK : WHITE,
          selectedPiece: _NONE_,
          selectedCoord: [],
          pieceMoves: [
            [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
          ]
        });
      }
    }
  }

  getValidMoves() {
    let moves = [
      [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
    ];
    let piece = this.state.selectedPiece;
    if ([W_ROOK, W_QUEN].includes(Math.abs(piece))) {
      moves = this.setLinearMoves(moves, false);
    }
    if ([W_BISH, W_QUEN].includes(Math.abs(piece))) {
      moves = this.setLinearMoves(moves, true);
    }
    if (W_KNIT === Math.abs(piece)) {
      moves = this.setKnightMoves(moves);
    }
    if (W_KING === Math.abs(piece)) {
      moves = this.setLinearMoves(moves, false, 2);
      moves = this.setLinearMoves(moves, true, 2);
    }
    if (W_PAWN === Math.abs(piece)) {
      moves = this.setPawnMoves(moves);
    }
    return moves;
  }

  setLinearMoves(moves, diag = false, dist = 8) {
    let row = this.state.selectedCoord[0];
    let col = this.state.selectedCoord[1];
    let piece = this.state.selectedPiece;
    let grid = this.state.board;
    let mods = diag ? [[1,1],[1,-1],[-1,-1],[-1,1]] : [[1,0],[-1,0],[0,1],[0,-1]];
    for (let [x,y] of mods) {
      for (let [r,c,d] = [row,col,dist]; this.inRange(r,c) && d > 0; r += y, c += x, d--) {
        if (d === dist) continue;
        if (grid[r][c] === 0) {
          moves[r][c] = 1;
        } else if (grid[r][c] < 0 !== piece < 0) {
          moves[r][c] = 1;
          break;
        } else {
          break;
        }
      }
    }
    return moves;
  }

  setKnightMoves(moves) {
    let row = this.state.selectedCoord[0];
    let col = this.state.selectedCoord[1];
    let piece = this.state.selectedPiece;
    let grid = this.state.board;
    let mods = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    for (let [x,y] of mods) {
      let r = row + y;
      let c = col + x;
      if (!this.inRange(r, c)) {
        continue;
      }
      if (grid[r][c] === 0 || (grid[r][c] < 0 !== piece < 0)) {
        moves[r][c] = 1;
      }
    }
    return moves;
  }

  setPawnMoves(moves) {
    let row = this.state.selectedCoord[0];
    let col = this.state.selectedCoord[1];
    let piece = this.state.selectedPiece;
    let grid = this.state.board;
    let dist = 1;
    if ((piece === W_PAWN && row === 6) || (piece === B_PAWN && row === 1)) {
      dist = 2;
    }
    for (let i = 1; i <= dist; i++) {
      if (!this.inRange(row-(i*piece), col)) {
        break;
      }
      let space = grid[row-(i*piece)][col];
      if (space === 0) { 
        moves[row-(i*piece)][col] = 1;
      } else {
        break;
      }
    }
    let left = grid[row-piece][col - 1];
    if (left !== 0 && left < 0 !== piece < 0) {
      moves[row-piece][col - 1] = 1;
    }
    let right = grid[row-piece][col + 1];
    if (right !== 0 && right < 0 !== piece < 0) {
      moves[row-piece][col + 1] = 1;
    }
    return moves;
  }

  inRange(row, col) {
    return 0 <= row && row <= 7 && 0 <= col && col<= 7;
  }

  render() {
    return (
      <>
        <GameBoard boardState={this.state.board} moveState={this.state.pieceMoves} onSpaceClick={this.onSpaceClick}/>
      </>
    );
  }
}