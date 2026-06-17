/**
 * Level 5: The Labyrinth (JUMPSCARE LEVEL)
 * 
 * Complex maze with narrow paths, zigzag teeth pattern, and intersections.
 * Any wall collision on this level triggers the jumpscare effect.
 * 
 * Layout (from image):
 * - Start (red) at top-left — but in our game Start=green, Finish=red
 *   The image shows: Start at top-left, zigzag teeth → through intersections → Finish at bottom-right
 * - Narrow winding paths with a teeth/saw pattern
 * - Multiple turns and dead-end traps
 */

import type { LevelData } from './types';

const level5: LevelData = {
  id: 5,
  name: 'Stage 5',
  start: { x: 40, y: 40, width: 20, height: 20 },
  finish: { x: 80, y: 80, width: 20, height: 20 },
  paths: [
    // Down from Start
    [
      { x: 47, y: 40 },
      { x: 53, y: 40 },
      { x: 53, y: 80 },
      { x: 47, y: 80 },
    ],
    // Left
    [
      { x: 10, y: 74 },
      { x: 53, y: 74 },
      { x: 53, y: 80 },
      { x: 10, y: 80 },
    ],
    // Up
    [
      { x: 10, y: 10 },
      { x: 16, y: 10 },
      { x: 16, y: 80 },
      { x: 10, y: 80 },
    ],
    // Right
    [
      { x: 10, y: 10 },
      { x: 90, y: 10 },
      { x: 90, y: 16 },
      { x: 10, y: 16 },
    ],
    // Down
    [
      { x: 84, y: 10 },
      { x: 90, y: 10 },
      { x: 90, y: 60 },
      { x: 84, y: 60 },
    ],
    // Left
    [
      { x: 65, y: 54 },
      { x: 90, y: 54 },
      { x: 90, y: 60 },
      { x: 65, y: 60 },
    ],
    // Down
    [
      { x: 65, y: 54 },
      { x: 71, y: 54 },
      { x: 71, y: 85 },
      { x: 65, y: 85 },
    ],
    // The Trap (Right into Finish, width 2!)
    [
      { x: 65, y: 81 },
      { x: 80, y: 81 },
      { x: 80, y: 83 },
      { x: 65, y: 83 },
    ],
  ],
};

export default level5;
