export type BlockType = 'stable' | 'risky';

export interface Block {
  type: BlockType;
  collapsed: boolean;
}

export interface TowerState {
  player1Blocks: Block[];
  player2Blocks: Block[];
  currentPlayer: 1 | 2;
  gameOver: boolean;
  winner: 1 | 2 | null;
  player1Stopped: boolean;
  player2Stopped: boolean;
}

const collapseChance = 0.25;
const MAX_HEALTHY_BLOCKS = 6;

export function createInitialTower(): TowerState {
  return {
    player1Blocks: [],
    player2Blocks: [],
    currentPlayer: 1,
    gameOver: false,
    winner: null,
    player1Stopped: false,
    player2Stopped: false,
  };
}

export function placeBlock(tower: TowerState): TowerState {
  if (tower.gameOver) return tower;

  // Jei dabartinis žaidėjas jau sustabdė, neleidžiam statyti
  if (
    (tower.currentPlayer === 1 && tower.player1Stopped) ||
    (tower.currentPlayer === 2 && tower.player2Stopped)
  ) {
    return tower;
  }

  const collapsed = Math.random() < collapseChance;
  const currentType: BlockType = tower.currentPlayer === 1 ? 'stable' : 'risky';

  const newBlock: Block = {
    type: currentType,
    collapsed,
  };

  const player1Blocks =
    tower.currentPlayer === 1
      ? [...tower.player1Blocks, newBlock]
      : [...tower.player1Blocks];

  const player2Blocks =
    tower.currentPlayer === 2
      ? [...tower.player2Blocks, newBlock]
      : [...tower.player2Blocks];

  let gameOver = false;
  let winner: 1 | 2 | null = null;

  if (collapsed) {
    gameOver = true;
    winner = tower.currentPlayer === 1 ? 2 : 1;
  } else {
    const p1Healthy = player1Blocks.filter(b => !b.collapsed).length;
    const p2Healthy = player2Blocks.filter(b => !b.collapsed).length;

    if (p1Healthy >= MAX_HEALTHY_BLOCKS && p2Healthy >= MAX_HEALTHY_BLOCKS) {
      winner = tower.currentPlayer === 2 ? 1 : 2;
      gameOver = true;
    } else if (p1Healthy >= MAX_HEALTHY_BLOCKS) {
      winner = 1;
      gameOver = true;
    } else if (p2Healthy >= MAX_HEALTHY_BLOCKS) {
      winner = 2;
      gameOver = true;
    } else if (tower.player1Stopped && tower.player2Stopped) {
      gameOver = true;
      if (p1Healthy > p2Healthy) winner = 1;
      else if (p2Healthy > p1Healthy) winner = 2;
      else winner = null; // lygiosios
    }
  }

  return {
    player1Blocks,
    player2Blocks,
    currentPlayer: tower.currentPlayer === 1 ? 2 : 1,
    gameOver,
    winner,
    player1Stopped: tower.player1Stopped,
    player2Stopped: tower.player2Stopped,
  };
}
