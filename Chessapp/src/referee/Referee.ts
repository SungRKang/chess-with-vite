import { TeamType, PieceType, Piece, Position, samePosition } from "../Constants";

export default class Referee {
  tileIsEmptyOrOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType) : boolean {
    return (!this.tileIsOccupied(position, boardState) || this.tileIsOccupiedByOpponent(position, boardState, team));
  }
  tileIsOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position) && p.team !== team);
    if (piece) {
      return true;
    } else {
      return false;
    }
  } 

  isEnPassantMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
    const pawnDirection = (team === TeamType.WHITE) ? 1 : -1;
    
    if(type === PieceType.PAWN) {
      if((desiredPosition.x-initialPosition.x === -1 || desiredPosition.x-initialPosition.x === 1) && desiredPosition.y-initialPosition.y === pawnDirection) {
        const piece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant);
        if(piece) {
          return true;
        }
      }
    }
    //if the attacking piece is a pawn

    //upper left / upper right || bottom left / bottom right
    //if a piece is under  / above the attacked tile
    //if the attacked piece has made an en passant move in the previous turn

    //put the piece in correct position
    //remove en passanted piece
    return false;
    
  }


  isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
    if (type === PieceType.PAWN) {
      const startingRow = (team === TeamType.WHITE) ? 1 : 6;
      const pawnDirection = (team === TeamType.WHITE) ? 1 : -1;

      //movement logic
      if(initialPosition.x === desiredPosition.x && initialPosition.y === startingRow && desiredPosition.y-initialPosition.y === 2*pawnDirection) {
        if(!this.tileIsOccupied(desiredPosition,boardState) && !this.tileIsOccupied({x:desiredPosition.x, y:desiredPosition.y-pawnDirection},boardState)){
          return true;
        }
      } else if(initialPosition.x === desiredPosition.x && desiredPosition.y-initialPosition.y === pawnDirection){
        if(!this.tileIsOccupied(desiredPosition,boardState)){
          return true;
        } 
      }
      //attack logic
      else if(desiredPosition.x-initialPosition.x === -1 && desiredPosition.y-initialPosition.y === pawnDirection) {
        //attacking upper left or bottom left corner
        if(this.tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
          return true;
        } 
      } else if (desiredPosition.x-initialPosition.x === 1 && desiredPosition.y-initialPosition.y === pawnDirection) {
        //attacking upper right or bottom right corner
        if(this.tileIsOccupiedByOpponent(desiredPosition,boardState,team)){
          return true; 
        }
      } 
    } else if(type === PieceType.KNIGHT) {
      //Moving Logic 
      //8 different moving patterns

      for (let i=-1; i< 2; i+=2) {
        for (let j=-1; j< 2; j+=2) {
          //Top bottom side movement
          if(desiredPosition.y - initialPosition.y === 2*i) {
            if(desiredPosition.x - initialPosition.x === j){
              if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                return true;
              }
              console.log("top/bottom left/right knight");
            } 
          } 

          //left and right side movement
          else if(desiredPosition.x - initialPosition.x === 2*i){
            if(desiredPosition.y - initialPosition.y === j){
              if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                return true;
              }
              console.log("right/left top/bottom knight");
            } 
          }
        }
        
      }
    }
  return false;
  }
}