'use client';

import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const doorLabels = ['Door 1', 'Door 2', 'Door 3', 'Door 4', 'Door 5'];

function generateMathQuestion() {
  const operations = ['+', '-', '*', '/'];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;

  if (op === '/') {
    a = a * b; // kad rezultatas būtų sveikas
  }

  let correct;
  switch (op) {
    case '+': correct = a + b; break;
    case '-': correct = a - b; break;
    case '*': correct = a * b; break;
    case '/': correct = a / b; break;
  }

  const incorrect1 = correct + Math.floor(Math.random() * 5 + 1);
  const incorrect2 = correct - Math.floor(Math.random() * 3 + 1);

  const answers = [correct, incorrect1, incorrect2].sort(() => Math.random() - 0.5);

  return {
    question: `${a} ${op} ${b} = ?`,
    answers,
    correct
  };
}

export default function VaultDoorsGame() {
  const [step, setStep] = useState(0);
  const [playerOneChoice, setPlayerOneChoice] = useState<number | null>(null);
  const [playerTwoChoice, setPlayerTwoChoice] = useState<number | null>(null);
  const [winnerDoor, setWinnerDoor] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState('');
  const [confettiEnabled, setConfettiEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [round, setRound] = useState(1);
  const [mathQuestion, setMathQuestion] = useState<{ question: string; answers: number[]; correct: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (round === 2 && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (round === 2 && timeLeft === 0) {
      setResultMessage('⏱️ Time is up! You failed the quiz.');
      setStep(3);
    }
    return () => clearTimeout(timer);
  }, [round, timeLeft]);

  const handleStart = () => {
    if (bgMusicRef.current && !isMuted) {
      bgMusicRef.current.play();
    }

    setStep(1);
    setRound(1);
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

      if (
        (playerOneChoice === newWinner && index === newWinner) ||
        playerOneChoice === newWinner ||
        index === newWinner
      ) {
        const q = generateMathQuestion();
        setMathQuestion(q);
        setTimeLeft(10);
        setRound(2);
        setStep(4);
        return;
      }

      setResultMessage('BOOOOM both players LOST!');
      setStep(3);
    }
  };

  const handleAnswer = (ans: number) => {
    if (mathQuestion && ans === mathQuestion.correct) {
      setResultMessage('🎉 Correct! You win this round!');
      setConfettiEnabled(true);
    } else {
      setResultMessage('❌ Wrong answer. You lose.');
    }
    setStep(3);
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
      <audio ref={bgMusicRef} src="/sounds/bg-music.mp3" loop />

      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 text-yellow-400 text-2xl z-50 hover:scale-110 transition"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {confettiEnabled && <Confetti width={width} height={height} numberOfPieces={250} />}

      {(step === 0 || step === 3) && (
        <button
          onClick={handleStart}
          className="mt-0 mb-4 px-10 py-3 text-2xl font-extrabold text-pink-500 border border-pink-500 rounded-full shadow-[0_0_25px_rgba(255,0,200,0.7)] hover:bg-pink-500 hover:text-black transition-all duration-300"
        >
          {step === 0 ? 'START' : 'RESTART'}
        </button>
      )}

      {step === 3 && resultMessage && (
        <div className="text-2xl font-bold text-yellow-300 mt-2 mb-2 text-center">
          {resultMessage}
        </div>
      )}

      {step === 1 && <p className="mb-4 text-white">🎮 Player One, choose a door</p>}
      {step === 2 && <p className="mb-4 text-white">⏳ Waiting for Player Two to choose...</p>}

      {step < 3 && (
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
              {winnerDoor === index && (
                <div className="absolute inset-0 bg-yellow-400 opacity-50 blur-lg rounded-lg animate-pulse z-0" />
              )}

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
      )}

      {step === 4 && mathQuestion && (
        <div className="bg-black/60 p-6 rounded-lg shadow-lg text-white text-center mt-4">
          <p className="text-xl mb-2">🧠 Solve the quiz in {timeLeft}s:</p>
          <p className="text-2xl font-bold mb-4">{mathQuestion.question}</p>
          <div className="flex gap-6 justify-center">
            {mathQuestion.answers.map((ans, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(ans)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg shadow-md"
              >
                {ans}
              </button>
            ))}
          </div>
        </div>
      )}

      <img
        src="/assets/cherry-doors/vault.png"
        alt="Vault"
        className="absolute top-[-230px] right-10 w-64 h-auto rotate-[-15deg] animate-pulse drop-shadow-[0_0_70px_rgba(255,255,100,1)]"
      />
    </div>
  );
}
