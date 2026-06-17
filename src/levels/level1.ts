/**
 * Level 1: The Funnel
 * 
 * Simple vertical path from bottom to top with a diamond/hourglass bottleneck
 * in the middle. Wide path, forgiving — teaches the basic mechanic.
 * 
 * Layout (from image):
 * - Start (green) at bottom center
 * - Straight corridor up with a narrowing diamond shape in the middle
 * - Finish (red) at top center
 */

import type { LevelData } from './types';

const level1: LevelData = {
  id: 1,
  name: 'Stage 1',
  start: { x: 40, y: 80, width: 20, height: 20 },
  finish: { x: 40, y: 0, width: 20, height: 20 },
  paths: [
    // Straight vertical path
    [
      { x: 40, y: 0 },
      { x: 60, y: 0 },
      { x: 60, y: 100 },
      { x: 40, y: 100 },
    ],
  ],
};

export default level1;
