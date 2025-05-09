// utils/playSound.ts

export const playSound = (path: string) => {
  const audio = new Audio(path);
  audio.volume = 0.8; // (nebūtina) – reguliuoja garsumą
  audio.play();
};
