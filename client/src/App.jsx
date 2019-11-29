import React from 'react';
import GameBoard from './GameBoard';
import M from './Map';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: M.NEW_BOARD,
      turn: M.WHITE,
      selectedPiece: M.NONE,
      selectedCoord: [],
      pieceMoves: M.EMPTY_BOARD,
      winner: M.NONE,
    };

    this.onSpaceClick = (event) => {
      const {
        winner, turn, pieceMoves, board, selectedPiece, selectedCoord,
      } = this.state;
      if (winner) return;
      const data = event.target.dataset;
      const piece = Number(data.piece);
      const row = Number(data.loc.charAt(0));
      const col = Number(data.loc.charAt(1));
      if (piece !== 0 && turn < 0 === piece < 0) {
        this.setState({
          selectedPiece: piece,
          selectedCoord: [row, col],
        }, () => {
          const validMoves = this.getValidMoves();
          this.setState({
            pieceMoves: validMoves,
          });
        });
      } else if (pieceMoves[row][col] === 1) {
        const newBoard = board.slice();
        this.state.winner = { 6: M.BLACK, '-6': M.WHITE }[newBoard[row][col]] || M.NONE;
        newBoard[row][col] = selectedPiece;
        const [oldRow, oldCol] = selectedCoord;
        newBoard[oldRow][oldCol] = M.NONE;
        this.setState({
          board: newBoard,
          turn: turn === M.WHITE ? M.BLACK : M.WHITE,
          selectedPiece: M.NONE,
          selectedCoord: [],
          pieceMoves: M.EMPTY_BOARD,
        });
      }
    };
  }

  getValidMoves() {
    let moves = M.EMPTY_BOARD;
    const { selectedPiece } = this.state;
    if ([M.W_ROOK, M.W_QUEN].includes(Math.abs(selectedPiece))) {
      moves = this.setLinearMoves(moves, false);
    }
    if ([M.W_BISH, M.W_QUEN].includes(Math.abs(selectedPiece))) {
      moves = this.setLinearMoves(moves, true);
    }
    if (M.W_KNIT === Math.abs(selectedPiece)) {
      moves = this.setKnightMoves(moves);
    }
    if (M.W_KING === Math.abs(selectedPiece)) {
      moves = this.setLinearMoves(moves, false, 2);
      moves = this.setLinearMoves(moves, true, 2);
    }
    if (M.W_PAWN === Math.abs(selectedPiece)) {
      moves = this.setPawnMoves(moves);
    }
    return moves;
  }

  setLinearMoves(moves, diag = false, dist = 8) {
    const { selectedCoord, selectedPiece, board } = this.state;
    const newMoves = moves.slice();
    const row = selectedCoord[0];
    const col = selectedCoord[1];
    const mods = diag ? [[1, 1], [1, -1], [-1, -1], [-1, 1]] : [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let m = 0; m < mods.length; m += 1) {
      const [x, y] = mods[m];
      for (let [r, c, d] = [row, col, dist]; App.inRange(r, c) && d > 0; r += y, c += x, d -= 1) {
        if (d !== dist) {
          if (board[r][c] === 0) {
            newMoves[r][c] = 1;
          } else if (board[r][c] < 0 !== selectedPiece < 0) {
            newMoves[r][c] = 1;
            break;
          } else {
            break;
          }
        }
      }
    }
    return newMoves;
  }

  setKnightMoves(moves) {
    const { selectedCoord, selectedPiece, board } = this.state;
    const newMoves = moves.slice();
    const row = selectedCoord[0];
    const col = selectedCoord[1];
    const mods = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
    for (let m = 0; m < mods.length; m += 1) {
      const [x, y] = mods[m];
      const r = row + y;
      const c = col + x;
      if (App.inRange(r, c) && (board[r][c] === 0 || (board[r][c] < 0 !== selectedPiece < 0))) {
        newMoves[r][c] = 1;
      }
    }
    return newMoves;
  }

  setPawnMoves(moves) {
    const { selectedCoord, selectedPiece, board } = this.state;
    const newMoves = moves.slice();
    const row = selectedCoord[0];
    const col = selectedCoord[1];
    let dist = 1;
    if ((selectedPiece === M.W_PAWN && row === 6) || (selectedPiece === M.B_PAWN && row === 1)) {
      dist = 2;
    }
    for (let i = 1; i <= dist; i += 1) {
      if (!App.inRange(row - (i * selectedPiece), col)) {
        break;
      }
      const space = board[row - (i * selectedPiece)][col];
      if (space === 0) {
        newMoves[row - (i * selectedPiece)][col] = 1;
      } else {
        break;
      }
    }
    const left = board[row - selectedPiece][col - 1];
    if (left !== 0 && left < 0 !== selectedPiece < 0) {
      newMoves[row - selectedPiece][col - 1] = 1;
    }
    const right = board[row - selectedPiece][col + 1];
    if (right !== 0 && right < 0 !== selectedPiece < 0) {
      newMoves[row - selectedPiece][col + 1] = 1;
    }
    return newMoves;
  }

  render() {
    const { board, pieceMoves } = this.state;
    return (
      <>
        <GameBoard
          boardState={board}
          moveState={pieceMoves}
          onSpaceClick={this.onSpaceClick}
        />
      </>
    );
  }
}
App.inRange = (row, col) => row >= 0 && row <= 7 && col >= 0 && col <= 7;
