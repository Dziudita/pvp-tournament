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
  if (tower.gameOver) return tower;

  const chance = collapseChances[type];
  const collapsed = Math.random() < chance;

  const newBlock: Block = {
    type,
    player: tower.currentPlayer,
    collapsed,
  };

  const newBlocks = [...tower.blocks, newBlock];
  const gameOver = collapsed;
  const winner = collapsed ? (tower.currentPlayer === 0 ? 1 : 0) : null;

  return {
    blocks: newBlocks,
    currentPlayer: gameOver ? tower.currentPlayer : (tower.currentPlayer === 0 ? 1 : 0),
    gameOver,
    winner,
  };
}
