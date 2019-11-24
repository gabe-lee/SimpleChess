const MAP = {
  _NONE_: 0, WHITE: 10, BLACK: -10,
  B_PAWN: -1, B_ROOK: -2, B_KNIT: -3, B_BISH: -4, B_QUEN: -5, B_KING: -6,
  W_PAWN:  1, W_ROOK:  2, W_KNIT:  3, W_BISH:  4, W_QUEN:  5, W_KING:  6,
  SYMB: {
    '0': '\u0020',
    '1': '\u2659', '2': '\u2656', '3': '\u2658', '4': '\u2657', '5': '\u2655', '6': '\u2654',
    '-1': '\u265F', '-2': '\u265C', '-3': '\u265E', '-4': '\u265D', '-5': '\u265B', '-6': '\u265A',
  }
}
export default MAP;