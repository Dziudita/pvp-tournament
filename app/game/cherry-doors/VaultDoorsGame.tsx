'use client';

import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const doorLabels = ['Door 1', 'Door 2', 'Door 3', 'Door 4', 'Door 5'];

export default function VaultDoorsGame() {
  const [step, setStep] = useState(0);
  const [playerOneChoice, setPlayerOneChoice] = useState<number | null>(null);
  const [playerTwoChoice, setPlayerTwoChoice] = useState<number | null>(null);
  const [winnerDoor, setWinnerDoor] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState('');
  const [confettiEnabled, setConfettiEnabled] = useState(false);

  const { width, height } = useWindowSize();
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const openSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      clickSoundRef.current = new Audio('/sounds/click-door.mp3');
      openSoundRef.current = new Audio('/sounds/open-door.mp3');
    }
  }, []);

  const handleStart = () => {
    setStep(1);
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setWinnerDoor(null);
    setResultMessage('');
    setConfettiEnabled(false);
  };

  const handleDoorClick = (index: number) => {
    clickSoundRef.current?.play();

    if (step === 1) {
      setPlayerOneChoice(index);
      setStep(2);
    } else if (step === 2) {
      setPlayerTwoChoice(index);
      const newWinner = Math.floor(Math.random() * 5);
      setWinnerDoor(newWinner);

      setTimeout(() => {
        openSoundRef.current?.play();
      }, 300);

      setStep(3);

      if (
        (playerOneChoice === newWinner && index === newWinner) ||
        playerOneChoice === newWinner ||
        index === newWinner
      ) {
        setConfettiEnabled(true);
      }

      setTimeout(() => setConfettiEnabled(false), 5000);

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
    <div className="w-full flex flex-col items-center mt-4 relative">
      {confettiEnabled && <Confetti width={width} height={height} numberOfPieces={250} />}

      {/* Result Message */}
      {step === 3 && resultMessage && (
        <div className="text-2xl font-bold text-yellow-300 mt-4 mb-2 text-center">
          {resultMessage}
        </div>
      )}

      {/* Restart button only when step === 3 */}
      {step === 3 && (
        <button
          onClick={handleStart}
          className="mb-6 px-8 py-3 bg-green-500 text-white text-xl rounded shadow-lg hover:bg-green-600"
        >
          RESTART
        </button>
      )}

      {/* Player instructions */}
      {step === 1 && <p className="mb-4 text-white">🎮 Player One, choose a door</p>}
      {step === 2 && <p className="mb-4 text-white">⏳ Waiting for Player Two to choose...</p>}

      {/* Doors */}
      <div className="flex gap-10 justify-center items-end mt-4 mb-2">
        {doorLabels.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDoorClick(index)}
            disabled={
              (step === 1 && playerOneChoice !== null) ||
              (step === 2 && playerTwoChoice !== null) ||
              step === 0 ||
              step === 3
            }
            className="h-[280px] w-auto transition-transform transform hover:scale-105"
          >
            <img
              src={
                winnerDoor !== null && winnerDoor === index
                  ? '/assets/cherry-doors/door-open.png'
                  : '/assets/cherry-doors/door.png'
              }
              alt={`Door ${index + 1}`}
              className={`h-full drop-shadow-lg ${
                winnerDoor === index
                  ? 'animate-pulse shadow-[0_0_25px_rgba(255,255,0,0.8)]'
                  : ''
              }`}
            />
          </button>
        ))}
      </div>

      {/* Vault chest */}
      <img
        src="/assets/cherry-doors/vault.png"
        alt="Vault"
        className="absolute top-[-160px] right-10 w-56 h-auto drop-shadow-2xl animate-pulse"
      />
    </div>
  );
}
