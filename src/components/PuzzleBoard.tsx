import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import W_King from "../assets/pieces/W_King.png";
import W_Queen from "../assets/pieces/W_Queen.png";
import W_Rook from "../assets/pieces/W_Rook.png";
import W_Bishop from "../assets/pieces/W_Bishop.png";
import W_Knight from "../assets/pieces/W_Knight.png";
import W_Pawn from "../assets/pieces/W_Pawn.png";

import B_King from "../assets/pieces/B_King.png";
import B_Queen from "../assets/pieces/B_Queen.png";
import B_Rook from "../assets/pieces/B_Rook.png";
import B_Bishop from "../assets/pieces/B_Bishop.png";
import B_Knight from "../assets/pieces/B_Knight.png";
import B_Pawn from "../assets/pieces/B_Pawn.png";

const retroPieces = {
  wK: () => (
    <img src={W_King} alt="White King"  style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  wQ: () => (
    <img src={W_Queen} alt="White Queen" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  wR: () => (
    <img src={W_Rook} alt="White Rook" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  wB: () => (
    <img src={W_Bishop} alt="White Bishop" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  wN: () => (
    <img src={W_Knight} alt="White Knight" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  wP: () => (
    <img src={W_Pawn} alt="White Pawn" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),

  bK: () => (
    <img src={B_King} alt="Black King" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  bQ: () => (
    <img src={B_Queen} alt="Black Queen" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  bR: () => (
    <img src={B_Rook} alt="Black Rook" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  bB: () => (
    <img src={B_Bishop} alt="Black Bishop" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  bN: () => (
    <img src={B_Knight} alt="Black Knight" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
  bP: () => (
    <img src={B_Pawn} alt="Black Pawn" style={{
      width: "50%",
      height: "50%",
      objectFit: "contain",
      display: "block",
      margin: "auto",
    }} />
  ),
};

type Puzzle = {
  id: number;
  title: string;
  fen: string;
  solution: string[];
};

type PuzzleBoardProps = {
  puzzle: Puzzle;
  onSolved: () => void;
  onPrevious: () => void;
   onNext: () => void;
};

type PieceRenderObject = Record<
  string,
  (props?: {
    fill?: string;
    square?: string;
    svgStyle?: React.CSSProperties;
  }) => React.JSX.Element
>;





export default function PuzzleBoard({
  puzzle,
  onSolved,
   onPrevious,
   onNext,
}: PuzzleBoardProps) {
  const [game, setGame] = useState(new Chess(puzzle.fen));
  const [fen, setFen] = useState(puzzle.fen);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showWrongMove, setShowWrongMove] = useState(false);
  
  useEffect(() => {
  const newGame = new Chess(puzzle.fen);

  setGame(newGame);
  setFen(puzzle.fen);
  setSolved(false);
  setMoves(0); // <-- here
}, [puzzle]);
  <p>Moves: {moves}</p>



  function onPieceDrop({ sourceSquare, targetSquare }: any) {
    if (solved) return false;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

  if (!move) {
  console.log("Illegal move");
  return false;
}

    const moveKey = (sourceSquare + targetSquare).toLowerCase();

    setFen(game.fen());
    setGame(new Chess(game.fen()));

    if (puzzle.solution.includes(moveKey)) {
  setSolved(true);

  setTimeout(() => {
    onSolved();
  }, 1000);
} else {
  setShowWrongMove(true);
}

console.log(moveKey);
return true;
  }

  return (
    <div style={{ width: 500, margin: "40px auto" }}>
      <h3 style={{ textAlign: "center" }}>
        {puzzle.title}
      </h3>

     <Chessboard
  options={{
    position: fen,
    onPieceDrop,
    pieces: retroPieces,
    lightSquareStyle: {
      backgroundColor: "#bff0b5",
    },
    darkSquareStyle: {
      backgroundColor: "#636fb5",
    },
  }}
/>
{showWrongMove && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#2d1b12",
      border: "4px solid #c89b5e",
      padding: "20px",
      textAlign: "center",
      zIndex: 999,
    }}
  >
    <h2>WRONG MOVE!</h2>

    <p>Try again, strategist.</p>

    <button
      onClick={() => {
        setShowWrongMove(false);

        const newGame = new Chess(puzzle.fen);

        setGame(newGame);
        setFen(puzzle.fen);
      }}
    >
      Retry
    </button>
  </div>
)}

      {solved && (
        <p style={{ textAlign: "center", color: "lime" }}>
          Solved!
        </p>
      )}

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  }}
>
  <button onClick={onPrevious}>
    ← Previous
  </button>

  <button onClick={onNext}>
    Next →
  </button>
</div>


    </div>
  );
}