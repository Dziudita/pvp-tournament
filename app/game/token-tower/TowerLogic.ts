// game/token-tower/TowerLogic.ts

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
}

const collapseChance = 0.25; // 25% tikimybė, kad blokas sugrius

export function createInitialTower(): TowerState {
  return {
    player1Blocks: [],
    player2Blocks: [],
    currentPlayer: 1,
    gameOver: false,
    winner: null,
  };
}

export function placeBlock(tower: TowerState): TowerState {
  if (tower.gameOver) return tower;

  const collapsed = Math.random() < collapseChance;

  const newBlock: Block = {
    type: tower.currentPlayer === 1 ? 'stable' : 'risky',
    collapsed,
  };

  // Pridedam bloką žaidėjui
  const updatedPlayer1 = tower.currentPlayer === 1
    ? [...tower.player1Blocks, newBlock]
    : tower.player1Blocks;

  const updatedPlayer2 = tower.currentPlayer === 2
    ? [...tower.player2Blocks, newBlock]
    : tower.player2Blocks;

  let gameOver = false;
  let winner: 1 | 2 | null = null;

  // Jei blokas sugriuvo – pralaimi jį statęs žaidėjas
  if (collapsed) {
    gameOver = true;
    winner = tower.currentPlayer === 1 ? 2 : 1;
  }

  // Jei vienas žaidėjas pasiekia 6 nesugriuvusius blokus – jis laimi
  if (!gameOver) {
    const p1Healthy = updatedPlayer1.filter(b => !b.collapsed).length;
    const p2Healthy = updatedPlayer2.filter(b => !b.collapsed).length;

    if (p1Healthy >= 6) {
      gameOver = true;
      winner = 1;
    } else if (p2Healthy >= 6) {
      gameOver = true;
      winner = 2;
    }
  }

  return {
    player1Blocks: updatedPlayer1,
    player2Blocks: updatedPlayer2,
    currentPlayer: tower.currentPlayer === 1 ? 2 : 1,
    gameOver,
    winner,
  };
}
