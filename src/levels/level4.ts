/**
 * Level 4: The Zigzag
 * 
 * Tight zigzag path requiring precise navigation through switchbacks.
 * 
 * Layout (from image):
 * - Start (green) at bottom-center
 * - Path zigzags upward through horizontal barriers
 * - Finish (red) at top-left
 */

import type { LevelData } from './types';

const level4: LevelData = {
  id: 4,
  name: 'Stage 4',
  start: { x: 80, y: 0, width: 20, height: 20 },
  finish: { x: 40, y: 40, width: 20, height: 20 },
  paths: [
    // Top edge (Left from Start)
    [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 10 },
      { x: 0, y: 10 },
    ],
    // Left edge (Down)
    [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 100 },
      { x: 0, y: 100 },
    ],
    // Bottom edge (Right)
    [
      { x: 0, y: 90 },
      { x: 100, y: 90 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
    // Right edge (Up, stopping below Start)
    [
      { x: 90, y: 20 },
      { x: 100, y: 20 },
      { x: 100, y: 100 },
      { x: 90, y: 100 },
    ],
    // Inner Top (Left)
    [
      { x: 20, y: 20 },
      { x: 100, y: 20 },
      { x: 100, y: 30 },
      { x: 20, y: 30 },
    ],
    // Inner Left (Down)
    [
      { x: 20, y: 20 },
      { x: 30, y: 20 },
      { x: 30, y: 80 },
      { x: 20, y: 80 },
    ],
    // Inner Bottom (Right)
    [
      { x: 20, y: 70 },
      { x: 80, y: 70 },
      { x: 80, y: 80 },
      { x: 20, y: 80 },
    ],
    // Inner Right (Up)
    [
      { x: 70, y: 40 },
      { x: 80, y: 40 },
      { x: 80, y: 80 },
      { x: 70, y: 80 },
    ],
    // Final stretch (Left into Finish)
    [
      { x: 40, y: 40 },
      { x: 80, y: 40 },
      { x: 80, y: 50 },
      { x: 40, y: 50 },
    ],
  ],
};

export default level4;
