/**
 * Level 3: Diagonal Slash
 * 
 * Features diagonal wall barriers that the player must navigate around.
 * 
 * Layout (from image):
 * - Start (green) at bottom-left
 * - Two large diagonal walls creating a slalom pattern
 * - Finish (red) at top-right
 */

import type { LevelData } from './types';

const level3: LevelData = {
  id: 3,
  name: 'Stage 3',
  start: { x: 0, y: 80, width: 20, height: 20 },
  finish: { x: 80, y: 0, width: 20, height: 20 },
  paths: [
    // Start area going up
    [
      { x: 0, y: 60 },
      { x: 20, y: 60 },
      { x: 20, y: 100 },
      { x: 0, y: 100 },
    ],
    // Move Right 1
    [
      { x: 0, y: 60 },
      { x: 40, y: 60 },
      { x: 40, y: 80 },
      { x: 0, y: 80 },
    ],
    // Move Up 1
    [
      { x: 20, y: 30 },
      { x: 40, y: 30 },
      { x: 40, y: 80 },
      { x: 20, y: 80 },
    ],
    // Move Right 2
    [
      { x: 20, y: 30 },
      { x: 70, y: 30 },
      { x: 70, y: 50 },
      { x: 20, y: 50 },
    ],
    // Move Up 2
    [
      { x: 50, y: 0 },
      { x: 70, y: 0 },
      { x: 70, y: 50 },
      { x: 50, y: 50 },
    ],
    // Move Right to Finish
    [
      { x: 50, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 20 },
      { x: 50, y: 20 },
    ]
  ],
};

export default level3;
