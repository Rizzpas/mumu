/**
 * Level registry for Mumu.
 * 
 * To add a new level:
 * 1. Create a new level file (e.g., level6.ts) in this directory
 * 2. Import it here and add it to the `levels` array
 * That's it — the game will automatically pick it up.
 */

import type { LevelData } from './types';
import level1 from './level1';
import level2 from './level2';
import level3 from './level3';
import level4 from './level4';
import level5 from './level5';

/** All game levels in order. Add new levels here. */
export const levels: LevelData[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
];

/**
 * Get a specific level by its 1-based ID.
 * @param id - Level number (1-based)
 * @returns The level data, or undefined if not found
 */
export function getLevelById(id: number): LevelData | undefined {
  return levels.find(level => level.id === id);
}

export type { LevelData, Point, Rect } from './types';
