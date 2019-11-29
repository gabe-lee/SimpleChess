import React from 'react';
import PropTypes from 'prop-types';
import BoardSpace from './BoardSpace';

const GameBoard = ({ moveState, onSpaceClick, boardState }) => (
  <div id="game-board">
    {[0, 1, 2, 3, 4, 5, 6, 7].map(
      (row) => [0, 1, 2, 3, 4, 5, 6, 7].map(
        (col) => <BoardSpace color={(row + col) % 2} validMove={moveState[row][col]} onSpaceClick={onSpaceClick} piece={boardState[row][col]} loc={`${row}${col}`} key={`${row}${col}`} />,
      ),
    )}
  </div>
);
GameBoard.propTypes = {
  moveState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  boardState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onSpaceClick: PropTypes.func.isRequired,
};
export default GameBoard;
