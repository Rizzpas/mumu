/**
 * Game constants for Mumu.
 * Centralized configuration values for easy tuning.
 */

/** Total number of lives the player starts with */
export const INITIAL_LIVES = 3;

/** The level number that triggers jumpscare behavior */
export const JUMPSCARE_LEVEL = 5;

/** Duration of the jumpscare flash in milliseconds */
export const JUMPSCARE_DURATION_MS = 800;

/** Total number of levels in the game */
export const TOTAL_LEVELS = 5;

/** Size of the player hit point in percentage units (how forgiving collisions are) */
export const PLAYER_HIT_RADIUS = 0.5;

/** Size of the mobile character in percentage units */
export const CHARACTER_SIZE = 4;

/** Debounce time for collision detection (ms) to prevent rapid re-triggers */
export const COLLISION_COOLDOWN_MS = 300;
