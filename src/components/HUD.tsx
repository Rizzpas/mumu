/**
 * HUD (Heads-Up Display) component.
 * 
 * Shows current level number.
 * Positioned as a non-interactive overlay above the maze.
 */

import { useGameState } from '../hooks/useGameState';
import styles from './HUD.module.css';

export function HUD() {
  const { currentLevel } = useGameState();

  return (
    <div className={styles.hud} role="status" aria-label="Game status">
      <div className={styles.levelInfo}>
        <span>Level</span>
        <span className={styles.levelNumber}>{currentLevel}</span>
      </div>
    </div>
  );
}
