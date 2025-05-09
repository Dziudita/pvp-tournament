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

const collapseChance = 0.25; // 25% šansas blokui sugriūti
const MAX_HEALTHY_BLOCKS = 6;

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

  // 💥 Jei blokas griūva – pralaimi dabartinis žaidėjas
  if (collapsed) {
    gameOver = true;
    winner = tower.currentPlayer === 1 ? 2 : 1;
  } else {
    // 🏁 Jei bet kuris žaidėjas pasiekia 6 sveikų blokų
    const p1Healthy = player1Blocks.filter(b => !b.collapsed).length;
    const p2Healthy = player2Blocks.filter(b => !b.collapsed).length;

    if (p1Healthy >= MAX_HEALTHY_BLOCKS && p2Healthy >= MAX_HEALTHY_BLOCKS) {
      // abu pasiekė – pirmas buvęs laimi (nebūtina, bet saugu)
      winner = tower.currentPlayer === 2 ? 1 : 2;
      gameOver = true;
    } else if (p1Healthy >= MAX_HEALTHY_BLOCKS) {
      winner = 1;
      gameOver = true;
    } else if (p2Healthy >= MAX_HEALTHY_BLOCKS) {
      winner = 2;
      gameOver = true;
    }
  }

  return {
    player1Blocks,
    player2Blocks,
    currentPlayer: tower.currentPlayer === 1 ? 2 : 1,
    gameOver,
    winner,
  };
}
