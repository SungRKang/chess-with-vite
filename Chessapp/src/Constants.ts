export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const VERTICAL_AXIS = ["1","2","3","4","5","6","7","8"];


export const GRID_SIZE = 100;

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING
}

export enum TeamType {
  WHITE,
  BLACK
}

export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
}


export const initialBoardState: Piece[] = [
  {
    image : "/images/pawn_w.svg",
    position: {
      x: 0,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/pawn_w.svg",
    position: {
      x: 1,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/pawn_w.svg",
    position: { 
      x: 2,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/pawn_w.svg",
    position: {
      x: 3,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/pawn_w.svg",
    position: {
      x: 4,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/pawn_w.svg",
    position: {
      x: 5,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/pawn_w.svg",
    position: {
      x: 6,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/pawn_w.svg",
    position: {
      x: 7,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE
  },
  {
    image : "/images/rook_w.svg",
    position: {
      x: 0,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.WHITE
  },
  {
    image : "/images/rook_w.svg",
    position: {
      x: 7,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.WHITE
  },
  {
    image : "/images/knight_w.svg",
    position: {
      x: 1,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.WHITE
  },
  {
    image : "/images/knight_w.svg",
    position: {
      x: 6,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.WHITE
  },
  {
    image : "/images/bishop_w.svg",
    position: {
      x: 2,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.WHITE
  },
  {
    image : "/images/bishop_w.svg",
    position: {
      x: 5,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.WHITE
  },
  {
    image : "/images/queen_w.svg",
    position: {
      x: 3,
      y: 0,
    },
    type: PieceType.QUEEN,
    team: TeamType.WHITE
  },
  {
    image : "/images/king_w.svg",
    position: {
      x: 4,
      y: 0,
    },
    type: PieceType.KING,
    team: TeamType.WHITE
  },


  {
    image : "/images/pawn_b.svg",
    position: {
      x: 0,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/pawn_b.svg",
    position: {
      x: 1,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/pawn_b.svg",
    position: {
      x: 2,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/pawn_b.svg",
    position: {
      x: 3,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/pawn_b.svg",
    position: {
      x: 4,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/pawn_b.svg",
    position: {
      x: 5,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/pawn_b.svg",
    position: {
      x: 6,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/pawn_b.svg",
    position: {
      x: 7,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK
  },
  {
    image : "/images/rook_b.svg",
    position: {
      x: 0,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.BLACK
  },
  {
    image : "/images/rook_b.svg",
    position: {
      x: 7,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.BLACK
  },
  {
    image : "/images/knight_b.svg",
    position: {
      x: 1,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.BLACK
  },
  {
    image : "/images/knight_b.svg",
    position: {
      x: 6,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.BLACK
  },
  {
    image : "/images/bishop_b.svg",
    position: {
      x: 2,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.BLACK
  },
  {
    image : "/images/bishop_b.svg",
    position: {
      x: 5,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.BLACK
  },
  {
    image : "/images/queen_b.svg",
    position: {
      x: 3,
      y: 7,
    },
    type: PieceType.QUEEN,
    team: TeamType.BLACK
  },
  {
    image : "/images/king_b.svg",
    position: {
      x: 4,
      y: 7,
    },
    type: PieceType.KING,
    team: TeamType.BLACK
  },

];