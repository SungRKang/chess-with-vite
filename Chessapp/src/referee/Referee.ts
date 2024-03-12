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
  switchTurn(currentTurn: TeamType): TeamType {
    return currentTurn === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE;
  }

  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[],
    lastMove: { piece: Piece; from: Position; to: Position } | null
  ): boolean {
    // En passant is only valid for pawn pieces
    if (type !== PieceType.PAWN) {
      return false;
    }
  
    // Direction pawns move, depending on their team
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;
  
    // Check if the move is a diagonal move to an empty tile (typical of en passant)
    if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) &&
      desiredPosition.y - initialPosition.y === pawnDirection) {
      
      // Check if the last move was a two-square pawn advance adjacent to the initialPosition
      if (lastMove &&
          lastMove.piece.type === PieceType.PAWN &&
          Math.abs(lastMove.from.y - lastMove.to.y) === 2 &&
          lastMove.to.y === initialPosition.y &&  // Must be the same row as the attacking pawn
          Math.abs(lastMove.to.x - initialPosition.x) === 1) {  // Must be adjacent column
  
        // If all conditions are met, it's a valid en passant move
        return true;
      }
    }
  
    return false;
  }
  


  isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[], currentTurn: TeamType) : boolean {
    if (team !== currentTurn) {
      return false;
    }
    
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