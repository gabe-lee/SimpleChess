import T from 'prop-types';

const MAP = {
  NONE: 0,
  WHITE: 10,
  BLACK: -10,
  B_PAWN: -1,
  B_ROOK: -2,
  B_KNIT: -3,
  B_BISH: -4,
  B_QUEN: -5,
  B_KING: -6,
  W_PAWN: 1,
  W_ROOK: 2,
  W_KNIT: 3,
  W_BISH: 4,
  W_QUEN: 5,
  W_KING: 6,
  SYMB(piece) {
    return ({
      [this.NONE]: '\u0020',
      [this.W_PAWN]: '\u2659',
      [this.W_ROOK]: '\u2656',
      [this.W_KNIT]: '\u2658',
      [this.W_BISH]: '\u2657',
      [this.W_QUEN]: '\u2655',
      [this.W_KING]: '\u2654',
      [this.B_PAWN]: '\u265F',
      [this.B_ROOK]: '\u265C',
      [this.B_KNIT]: '\u265E',
      [this.B_BISH]: '\u265D',
      [this.B_QUEN]: '\u265B',
      [this.B_KING]: '\u265A',
    }[piece] || '\u0020');
  },
  NOTE(piece) {
    return ({
      [this.NONE]: '_',
      [this.W_PAWN]: 'P',
      [this.W_ROOK]: 'R',
      [this.W_KNIT]: 'N',
      [this.W_BISH]: 'B',
      [this.W_QUEN]: 'Q',
      [this.W_KING]: 'K',
      [this.B_PAWN]: 'P',
      [this.B_ROOK]: 'R',
      [this.B_KNIT]: 'N',
      [this.B_BISH]: 'B',
      [this.B_QUEN]: 'Q',
      [this.B_KING]: 'K',
    }[piece] || '_');
  },
  get EMPTY_BOARD() {
    const { NONE } = this;
    return [
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
    ];
  },
  get NEW_BOARD() {
    const {
      NONE,
      B_PAWN, B_ROOK, B_KNIT, B_BISH, B_QUEN, B_KING,
      W_PAWN, W_ROOK, W_KNIT, W_BISH, W_QUEN, W_KING,
    } = this;
    return [
      [B_ROOK, B_KNIT, B_BISH, B_QUEN, B_KING, B_BISH, B_KNIT, B_ROOK],
      [B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE],
      [W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN],
      [W_ROOK, W_KNIT, W_BISH, W_QUEN, W_KING, W_BISH, W_KNIT, W_ROOK],
    ];
  },
};
export default MAP;
