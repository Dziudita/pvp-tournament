// TowerLogic.ts

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

const collapseChance = 0.25; // 25% šansas kad blokas grius

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

  const updatedPlayer1 = tower.currentPlayer === 1
    ? [...tower.player1Blocks, newBlock]
    : tower.player1Blocks;

  const updatedPlayer2 = tower.currentPlayer === 2
    ? [...tower.player2Blocks, newBlock]
    : tower.player2Blocks;

  let gameOver = false;
  let winner: 1 | 2 | null = null;

  if (collapsed) {
    gameOver = true;
    winner = tower.currentPlayer === 1 ? 2 : 1;
  } else if (
    updatedPlayer1.length === 6 ||
    updatedPlayer2.length === 6
  ) {
    gameOver = true;
    winner = updatedPlayer1.length === 6 ? 1 : 2;
  }

  return {
    player1Blocks: updatedPlayer1,
    player2Blocks: updatedPlayer2,
    currentPlayer: tower.currentPlayer === 1 ? 2 : 1,
    gameOver,
    winner,
  };
}
