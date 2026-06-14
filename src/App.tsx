import { useState, useEffect } from "react";
import PuzzleBoard from "./components/PuzzleBoard";
import { puzzles } from "./data/puzzles";
import "./App.css"

function App() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
const [bootText, setBootText] = useState("BOOTING CHESS TERMINAL...");


useEffect(() => {
  const messages = [
    "BOOTING CHESS TERMINAL...",
    "LOADING BOARD RENDERER...",
    "LOADING RETRO ASSETS...",
    "LOADING PUZZLE DATABASE...",
    "20 PUZZLES LOADED",
    "READY."
  ];

  let index = 0;

  const interval = setInterval(() => {
    index++;

    if (index < messages.length) {
      setBootText(messages[index]);
    } else {
      setBootComplete(true);
      clearInterval(interval);
    }
  }, 700);

  return () => clearInterval(interval);
}, []);


if (!gameStarted) {
  return (
    <div className="terminal-screen">

      <div className="scanlines"></div>
      <div className="scanline"></div>

      <div className="terminal-container">

        <div className="terminal-header">
          <span>PAWNED ARCHIVES</span>

          <div className="terminal-stats">
            <span>STATUS: ONLINE</span>
            <span>PUZZLES: 20</span>
          </div>
        </div>

        <div className="terminal-body">

          <div className="king-radar">
            ♔
          </div>

          <h1 className="terminal-title">
            PAWNED
          </h1>

          <h2>
            PUZZLE ARCHIVES
          </h2>

          <p>
            MATE IN 1 CHALLENGE
          </p>

          <div className="boot-text">
  {bootText}
</div>

          <button
  disabled={!bootComplete}
  className="start-button"
  onClick={() => setGameStarted(true)}
>
  {bootComplete
    ? "▶ ENTER ARCHIVE"
    : "LOADING..."}
</button>

        </div>
      </div>
    </div>
  );
}

  function nextPuzzle() {
 setCurrentPuzzle(prev => prev + 1);
}

if (currentPuzzle >= puzzles.length) {
  return (
    <div className="terminal-screen">

      <div className="scanlines"></div>
      <div className="scanline"></div>

      <div className="terminal-container">

        <div className="terminal-body">

          <div className="king-radar">
            ♕
          </div>

          <h1 className="terminal-title">
            ARCHIVE RESTORED
          </h1>

          <p>
            You have survived the archive.
          </p>

          <p>
           The Pawned archives have been recovered.
          </p>

<p style={{
  color: "#7ddf7d",
  marginTop: "20px"
}}>
  STATUS: GRANDMASTER VERIFIED
</p>

          <button
            className="start-button"
            onClick={() => {
              setCurrentPuzzle(0);
              setGameStarted(false);
            }}
          >
            ▶ RESTART ARCHIVE
          </button>

        </div>

      </div>

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
  <div className="game-screen">

    <div className="scanlines"></div>
    <div className="scanline"></div>

    <div className="status-bar">

      <span className="status-online">
        STATUS: ONLINE
      </span>

      <span>
        PUZZLE {currentPuzzle + 1}/{puzzles.length}
      </span>

    </div>

    <PuzzleBoard
      puzzle={puzzles[currentPuzzle]}
      onSolved={nextPuzzle}
      onPrevious={previousPuzzle}
      onNext={nextPuzzle}
    />

  </div>
);
}

export default App;