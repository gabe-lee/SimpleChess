import React from 'react';
import GameBoard from './GameBoard.jsx';
import M from './Map.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [
        [M.B_ROOK,M.B_KNIT,M.B_BISH,M.B_QUEN,M.B_KING,M.B_BISH,M.B_KNIT,M.B_ROOK],
        [M.B_PAWN,M.B_PAWN,M.B_PAWN,M.B_PAWN,M.B_PAWN,M.B_PAWN,M.B_PAWN,M.B_PAWN],
        [M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_],
        [M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_],
        [M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_],
        [M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_,M._NONE_],
        [M.W_PAWN,M.W_PAWN,M.W_PAWN,M.W_PAWN,M.W_PAWN,M.W_PAWN,M.W_PAWN,M.W_PAWN],
        [M.W_ROOK,M.W_KNIT,M.W_BISH,M.W_QUEN,M.W_KING,M.W_BISH,M.W_KNIT,M.W_ROOK]
      ],
      turn: M.WHITE,
      selectedPiece: M._NONE_,
      selectedCoord: [],
      pieceMoves: [
        [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
      ],
      winner: M._NONE_
    }

    this.onSpaceClick = event => {
      if (this.state.winner) return;
      let data = event.target.dataset;
      let piece = Number(data.piece);
      let row = Number(data.loc.charAt(0));
      let col = Number(data.loc.charAt(1))
      if (piece !== 0 && this.state.turn < 0 === piece < 0) {
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
        this.state.winner = 
        newBoard[row][col] === 6 ? M.BLACK :
        newBoard[row][col] === -6 ? M.WHITE : M._NONE_;
        newBoard[row][col] = this.state.selectedPiece;
        let [oldRow, oldCol] = this.state.selectedCoord;
        newBoard[oldRow][oldCol] = M._NONE_;
        this.setState({
          board: newBoard,
          turn: this.state.turn === M.WHITE ? M.BLACK : M.WHITE,
          selectedPiece: M._NONE_,
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
    if ([M.W_ROOK, M.W_QUEN].includes(Math.abs(piece))) {
      moves = this.setLinearMoves(moves, false);
    }
    if ([M.W_BISH, M.W_QUEN].includes(Math.abs(piece))) {
      moves = this.setLinearMoves(moves, true);
    }
    if (M.W_KNIT === Math.abs(piece)) {
      moves = this.setKnightMoves(moves);
    }
    if (M.W_KING === Math.abs(piece)) {
      moves = this.setLinearMoves(moves, false, 2);
      moves = this.setLinearMoves(moves, true, 2);
    }
    if (M.W_PAWN === Math.abs(piece)) {
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
    if ((piece === M.W_PAWN && row === 6) || (piece === M.B_PAWN && row === 1)) {
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