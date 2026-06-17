/**
 * Level 2: The U-Turn
 * 
 * U-shaped path requiring the player to navigate around the perimeter.
 * 
 * Layout (from image):
 * - Start (green) at bottom-left
 * - Path goes right along bottom, up the right side, left across top
 * - Finish (red) at top-left
 */

import type { LevelData } from './types';

const level2: LevelData = {
  id: 2,
  name: 'Stage 2',
  start: { x: 40, y: 0, width: 20, height: 20 },
  finish: { x: 0, y: 80, width: 20, height: 20 },
  paths: [
    // Top vertical (down from start)
    [
      { x: 40, y: 0 },
      { x: 60, y: 0 },
      { x: 60, y: 40 },
      { x: 40, y: 40 },
    ],
    // Middle horizontal right
    [
      { x: 40, y: 20 },
      { x: 80, y: 20 },
      { x: 80, y: 40 },
      { x: 40, y: 40 },
    ],
    // Right vertical down
    [
      { x: 60, y: 20 },
      { x: 80, y: 20 },
      { x: 80, y: 80 },
      { x: 60, y: 80 },
    ],
    // Bottom horizontal left to finish
    [
      { x: 0, y: 60 },
      { x: 80, y: 60 },
      { x: 80, y: 80 },
      { x: 0, y: 80 },
    ],
    // Finish area drop
    [
      { x: 0, y: 60 },
      { x: 20, y: 60 },
      { x: 20, y: 100 },
      { x: 0, y: 100 },
    ],
  ],
};

export default level2;
