import { useState } from "react";
import PuzzleBoard from "./components/PuzzleBoard";
import { puzzles } from "./data/puzzles";
import "./App.css"

function App() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);


  if (!gameStarted) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1512",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "4px solid #f4d9a8",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1 style={{textShadow:
"4px 4px 0px #7481ca"}}>
♔ RETRO CHESS PUZZLES ♚
</h1>

        <h2>Mate in 1 Challenge</h2>

        <p>20 puzzles await.</p>

        <button
          onClick={() => setGameStarted(true)}
        >
          START GAME
        </button>
      </div>
    </div>
  );
}


  function nextPuzzle() {
  setCurrentPuzzle(prev => {
    if (prev >= puzzles.length - 1) {
      return prev;
    }

    return prev + 1;
  });
}
if (currentPuzzle >= puzzles.length) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1512",
        color: "#f4d9a8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>🏆 All Puzzles Complete!</h1>
      <p>You solved every puzzle.</p>
    </div>
  );
}

function previousPuzzle() {
  setCurrentPuzzle(prev => {
    if (prev <= 0) {
      return 0;
    }

    return prev - 1;
  });
}

  return (
    
   <>
   
  <div
    style={{
      minHeight: "100vh",
      background: "#1a1512",
      color: "#f4d9a8",
      textAlign: "center",
      paddingTop: "20px",
    }}
  >
  <h1>Retro Chess Puzzles</h1>

  <p>
    Puzzle {currentPuzzle + 1} / {puzzles.length}
  </p>

  <PuzzleBoard
    puzzle={puzzles[currentPuzzle]}
    onSolved={nextPuzzle}
     onPrevious={previousPuzzle}
     onNext={nextPuzzle}
  />

  
  </div>
</>
  );
}

export default App;