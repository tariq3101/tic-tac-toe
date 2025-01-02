import { useState } from 'react';
import './App.css';

function App() {
  const initialState = () => Array(9).fill(null);
  const [board, setBoard] = useState(initialState);
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || checkWinner() || isDraw()) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isDraw = () => {
    return board.every((cell) => cell !== null) && !checkWinner();
  };

  return (
    <div className="game">
      <div className="status">
        {checkWinner() ? `Winner: ${checkWinner()}` : isDraw() ? "It's a Draw!" : `Player ${isXNext ? 'X' : 'O'}'s Turn`}
        <button onClick={() => { setBoard(initialState); setIsXNext(true); }}>
          Reset
        </button>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button className="cell" key={index} onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;