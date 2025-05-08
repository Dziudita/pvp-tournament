// TowerLogic.ts

export type BlockType = 'stable' | 'risky';

export interface Block {
  type: BlockType;
  player: number; // 0 or 1
  collapsed: boolean;
}

export interface TowerState {
  blocks: Block[];
  currentPlayer: number; // 0 or 1
  gameOver: boolean;
  winner: number | null;
}

const collapseChances: Record<BlockType, number> = {
  stable: 0.01, // 1% šansas
  risky: 0.3,   // 30% šansas
};

export function createInitialTower(): TowerState {
  return {
    blocks: [],
    currentPlayer: 0,
    gameOver: false,
    winner: null,
  };
}

export function placeBlock(tower: TowerState, type: BlockType): TowerState {
  if (tower.gameOver || tower.blocks.length >= 10) return tower;

  const chance = collapseChances[type];
  const collapsed = Math.random() < chance;

  const newBlock: Block = {
    type,
    player: tower.currentPlayer,
    collapsed,
  };

  const newBlocks = [...tower.blocks, newBlock];

  let gameOver = false;
  let winner: number | null = null;

  if (collapsed) {
    gameOver = true;
    winner = tower.currentPlayer === 0 ? 1 : 0;
  } else if (newBlocks.length >= 10) {
    gameOver = true;

    // Skaičiuojam kiek kiekvienas žaidėjas turi "stable" blokų
    const playerStableCounts = [0, 0];

    newBlocks.forEach((b) => {
      if (!b.collapsed && b.type === 'stable') {
        playerStableCounts[b.player]++;
      }
    });

    if (playerStableCounts[0] > playerStableCounts[1]) {
      winner = 0;
    } else if (playerStableCounts[1] > playerStableCounts[0]) {
      winner = 1;
    } else {
      winner = null; // lygiosios
    }
  }

  return {
    blocks: newBlocks,
    currentPlayer: gameOver ? tower.currentPlayer : (tower.currentPlayer === 0 ? 1 : 0),
    gameOver,
    winner,
  };
}
