import React, { useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';
import Referee from '../../referee/Referee';
import { VERTICAL_AXIS, HORIZONTAL_AXIS, Piece, TeamType, initialBoardState, Position, GRID_SIZE, samePosition, PieceType } from '../../Constants';


export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null >(null);
  const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y:-1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [currentTurn, setCurrentTurn] = useState<TeamType>(TeamType.WHITE);
  const [lastMove, setLastMove] = useState<{piece: Piece, from: Position, to: Position} | null>(null);

  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if(element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
      const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE))
      setGrabPosition({x:grabX, y:grabY});

      const x = e.clientX - GRID_SIZE/2;
      const y = e.clientY - GRID_SIZE/2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if(activePiece && chessboard) {
      const minX = chessboard.offsetLeft-25;
      const minY = chessboard.offsetTop-25; 
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 80;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      //binding pieces inside the board
      if(x< minX) {
        activePiece.style.left = `${minX}px`
      } else if(x > maxX) {
        activePiece.style.left = `${maxX}px`
      } else {
        activePiece.style.left = `${x}px`
      }
      if(y< minY) {
        activePiece.style.top = `${minY}px`
      } else if(y > maxY) {
        activePiece.style.top = `${maxY}px`
      } else {
        activePiece.style.top = `${y}px`
      }
    }
  } 

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
  
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));
  
      const currentPiece = pieces.find((p) => samePosition(p.position, grabPosition));
  
      if (currentPiece && currentPiece.team === currentTurn) {
        const tentativePieces = pieces.map(p => {
          if (samePosition(p.position, grabPosition)) {
            return { ...p, position: { x, y } };
          }
          return p;
        });
  
        const myKingPosition = tentativePieces.find(p => p.type === PieceType.KING && p.team === currentTurn)?.position;
        const movePutsKingInCheck = myKingPosition && referee.isKingInCheck(myKingPosition, currentTurn, tentativePieces);
        const validMove = referee.isValidMove(grabPosition, { x, y }, currentPiece.type, currentPiece.team, pieces, currentTurn);
        const isEnPassantMove = referee.isEnPassantMove(grabPosition, { x, y }, currentPiece.type, currentPiece.team, lastMove);
  
        let updatedPieces = [...tentativePieces];
  
        if (!movePutsKingInCheck) {
          if (isEnPassantMove) {
            // Handle en passant move
            const pawnDirection = currentPiece.team === TeamType.WHITE ? 1 : -1;
            updatedPieces = updatedPieces.filter(p => !samePosition(p.position, { x, y: y - pawnDirection }));
          } else if (currentPiece.type === PieceType.KING && Math.abs(grabPosition.x - x) === 2) {
            // Castling attempt detected
            const isKingSide = x === 6;
            const rookInitialX = isKingSide ? 7 : 0; // If king side castling, use H-file rook, else A-file rook
            const rook = pieces.find(p => p.type === PieceType.ROOK && p.position.x === rookInitialX && p.team === currentTurn);
            const rookDesiredX = isKingSide ? 5 : 3; // King side castling moves rook to F-file, Queen side to D-file
  
            if (rook && referee.canCastle(currentPiece, rook, pieces, { x, y })) {
              // Perform castling
              updatedPieces = updatedPieces.map(p => {
                if (p === currentPiece) {
                  return { ...p, position: { x, y }, hasMoved: true };
                } else if (p === rook) {
                  return { ...p, position: { x: rookDesiredX, y: rook.position.y }, hasMoved: true };
                }
                return p;
              });
            }
          } else if (validMove) {
            // Handle normal move and capture
            updatedPieces = updatedPieces.filter(p => !samePosition(p.position, { x, y }));
            if (currentPiece.type === PieceType.KING || currentPiece.type === PieceType.ROOK) {
              updatedPieces.push({ ...currentPiece, position: { x, y }, hasMoved: true });
            } else {
              updatedPieces.push({ ...currentPiece, position: { x, y } });
            }
          }
          
          // Check again if the move or capture does not put your king in check
          if (!referee.isKingInCheck(myKingPosition!, currentTurn, updatedPieces)) {
            setPieces(updatedPieces);
            setLastMove({ piece: currentPiece, from: grabPosition, to: { x, y } });
            setCurrentTurn(nextTurn => nextTurn === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE);
          } else {
            // If the move puts the king in check, reset the piece's position
            resetPiecePosition();
          }
        } else {
          // If the move is not valid or puts the king in check, reset the piece's position
          resetPiecePosition();
        }
      } else {
        // If it's not the current player's turn, reset the piece
        resetPiecePosition();
      }
  
      setActivePiece(null);
    }
  }
  
  // Other functions remain unchanged...
  
  
  
  function resetPiecePosition() {
    if (activePiece) {
      activePiece.style.position = 'relative';
      activePiece.style.removeProperty('top');
      activePiece.style.removeProperty('left');
    }
  }

  const board = [];
  // render pieces based on boardstate
  for(let j=VERTICAL_AXIS.length-1; j>=0; j--) {
    for(let i=0; i<HORIZONTAL_AXIS.length; i++) {
      const number = j+i+2;
      const piece = pieces.find((p) => samePosition(p.position, {x:i,y:j}));
      const image = piece ? piece.image : undefined;

      board.push(<Tile key={`${i},${j}`}image={image} number={number}/>)
    }
  }
  // post render save current boardstate
  return (
  <div 
    onMouseMove={(e) => movePiece(e)} 
    onMouseDown={(e) => grabPiece(e)}
    onMouseUp={(e) => dropPiece(e)}  
    id="chessboard"
    ref={chessboardRef}
    > 
      {board}
    </div>
  );
}
