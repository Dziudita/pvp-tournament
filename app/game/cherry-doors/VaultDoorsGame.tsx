// VaultDoorsGame.tsx
'use client';

import React, { useState } from 'react';

const doorLabels = ['Door 1', 'Door 2', 'Door 3', 'Door 4', 'Door 5'];

export default function VaultDoorsGame() {
  const [step, setStep] = useState(0); // 0=start, 1=player1, 2=player2, 3=result
  const [playerOneChoice, setPlayerOneChoice] = useState<number | null>(null);
  const [playerTwoChoice, setPlayerTwoChoice] = useState<number | null>(null);
  const [winnerDoor, setWinnerDoor] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState('');

  const handleStart = () => {
    setStep(1);
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setWinnerDoor(null);
    setResultMessage('');
  };

  const handleDoorClick = (index: number) => {
    if (step === 1) {
      setPlayerOneChoice(index);
      setStep(2);
    } else if (step === 2) {
      setPlayerTwoChoice(index);
      const newWinner = Math.floor(Math.random() * 5);
      setWinnerDoor(newWinner);
      setStep(3);

      // Evaluate result
      if (playerOneChoice === newWinner && index === newWinner) {
        setResultMessage('BOOOOM both players WON!');
      } else if (playerOneChoice === newWinner) {
        setResultMessage('BOOOOM Player One WINS!');
      } else if (index === newWinner) {
        setResultMessage('BOOOOM Player Two WINS!');
      } else {
        setResultMessage('BOOOOM both players LOST!');
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-24 relative">
      {/* Boom Message */}
      {step === 3 && resultMessage && (
        <div className="fixed top-10 z-50 text-4xl font-extrabold text-yellow-300 animate-bounce drop-shadow-xl">
          {resultMessage}
        </div>
      )}

      {/* Start or Restart Button */}
      {(step === 0 || step === 3) && (
        <button
          onClick={handleStart}
          className="mb-10 px-8 py-3 bg-green-500 text-white text-xl rounded shadow-lg hover:bg-green-600"
        >
          {step === 0 ? 'START' : 'RESTART'}
        </button>
      )}

      {/* Info Text */}
      {step === 1 && <p className="mb-4 text-white">🎮 Player One, choose a door</p>}
      {step === 2 && <p className="mb-4 text-white">⏳ Waiting for Player Two to choose...</p>}

      {/* Doors */}
      <div className="flex gap-10 justify-center items-end mb-2">
        {doorLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => handleDoorClick(index)}
            disabled={
              (step === 1 && playerOneChoice !== null) ||
              (step === 2 && playerTwoChoice !== null) ||
              step === 0 ||
              step === 3
            }
            className={`h-[280px] w-auto transition-transform transform hover:scale-105`}
          >
            <img
              src={
                winnerDoor !== null && winnerDoor === index
                  ? '/assets/cherry-doors/door-open.png'
                  : '/assets/cherry-doors/door.png'
              }
              alt={`Door ${index + 1}`}
              className="h-full drop-shadow-lg"
            />
          </button>
        ))}
      </div>

      {/* Vault chest at top right */}
      <img
        src="/assets/cherry-doors/vault.png"
        alt="Vault"
        className="absolute top-[-160px] right-10 w-56 h-auto drop-shadow-2xl animate-pulse"
      />
    </div>
  );
}
