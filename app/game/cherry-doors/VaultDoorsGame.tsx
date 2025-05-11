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
  const [isMuted, setIsMuted] = useState(false);

  const { width, height } = useWindowSize();
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const openSoundRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      clickSoundRef.current = new Audio('/sounds/click-door.mp3');
      openSoundRef.current = new Audio('/sounds/open-door.mp3');
    }
  }, []);

  const handleStart = () => {
    // Start music if not muted
    if (bgMusicRef.current && !isMuted) {
      bgMusicRef.current.play();
    }

    setStep(1);
    setPlayerOneChoice(null);
    setPlayerTwoChoice(null);
    setWinnerDoor(null);
    setResultMessage('');
    setConfettiEnabled(false);
  };

  const handleDoorClick = (index: number) => {
    if (!isMuted) {
      clickSoundRef.current?.play();
    }

    if (step === 1) {
      setPlayerOneChoice(index);
      setStep(2);
    } else if (step === 2) {
      setPlayerTwoChoice(index);
      const newWinner = Math.floor(Math.random() * 5);
      setWinnerDoor(newWinner);

      setTimeout(() => {
        if (!isMuted) {
          openSoundRef.current?.play();
        }
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

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (bgMusicRef.current) {
        bgMusicRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  return (
    <div className="w-full flex flex-col items-center mt-4 relative">
      {/* Background Music */}
      <audio ref={bgMusicRef} src="/sounds/bg-music.mp3" loop />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 text-yellow-400 text-2xl z-50 hover:scale-110 transition"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {confettiEnabled && <Confetti width={width} height={height} numberOfPieces={250} />}

      {/* START/RESTART button */}
      {(step === 0 || step === 3) && (
        <button
          onClick={handleStart}
          className="mt-0 mb-4 px-10 py-3 text-2xl font-extrabold text-pink-500 border border-pink-500 rounded-full shadow-[0_0_25px_rgba(255,0,200,0.7)] hover:bg-pink-500 hover:text-black transition-all duration-300"
        >
          {step === 0 ? 'START' : 'RESTART'}
        </button>
      )}

      {/* Result message */}
      {step === 3 && resultMessage && (
        <div className="text-2xl font-bold text-yellow-300 mt-2 mb-2 text-center">
          {resultMessage}
        </div>
      )}

      {/* Player instructions */}
      {step === 1 && <p className="mb-4 text-white">🎮 Player One, choose a door</p>}
      {step === 2 && <p className="mb-4 text-white">⏳ Waiting for Player Two to choose...</p>}

      {/* Doors */}
      <div className="flex gap-10 justify-center items-end mt-[-20px] mb-2">
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
            className="h-[320px] w-auto transition-transform transform hover:scale-110 relative"
          >
            {/* Švytėjimo sluoksnis – tik atidarytoms durims */}
            {winnerDoor === index && (
              <div className="absolute inset-0 bg-yellow-400 opacity-50 blur-lg rounded-lg animate-pulse z-0" />
            )}

            {/* Durų vaizdas virš švytėjimo */}
            <img
              src={
                winnerDoor !== null && winnerDoor === index
                  ? '/assets/cherry-doors/door-open.png'
                  : '/assets/cherry-doors/door.png'
              }
              alt={`Door ${index + 1}`}
              className="h-full relative z-10 drop-shadow-[0_0_25px_rgba(255,0,80,0.9)]"
            />
          </button>
        ))}
      </div>

      {/* Vault chest */}
      <img
        src="/assets/cherry-doors/vault.png"
        alt="Vault"
        className="absolute top-[-230px] right-10 w-64 h-auto rotate-[-15deg] animate-pulse drop-shadow-[0_0_70px_rgba(255,255,100,1)]"
      />
    </div>
  );
}
