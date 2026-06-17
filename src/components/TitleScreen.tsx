/**
 * TitleScreen component for Mumu.
 * 
 * Displays the game title, instructions for both desktop and mobile,
 * and a start button. Detects device type to show relevant instructions.
 */

import { useGameActions } from '../hooks/useGameState';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import styles from './TitleScreen.module.css';

export function TitleScreen() {
  const { startGame } = useGameActions();
  const { isTouchDevice } = useDeviceDetect();

  return (
    <div className={styles.container} role="main">
      <div className={styles.mazeSizer}>
        <div className={styles.content}>
          <h1 className={styles.title}>Mumu</h1>

          <p className={styles.subtitle}>
            Navigate through the maze without touching the walls.
            Precision is everything.
          </p>

          <div className={styles.instructions} aria-label="Game instructions">
            {isTouchDevice ? (
              <>
                <span className={styles.instructionLine}>
                  <span className={styles.instructionIcon}>👆</span>
                  Drag the character through the maze
                </span>
                <span className={styles.instructionLine}>
                  <span className={styles.instructionIcon}>🚫</span>
                  Don't touch the walls!
                </span>
              </>
            ) : (
              <>
                <span className={styles.instructionLine}>
                  <span className={styles.instructionIcon}>🖱️</span>
                  Move your cursor through the maze
                </span>
                <span className={styles.instructionLine}>
                  <span className={styles.instructionIcon}>🟢</span>
                  Hover over Start to begin each level
                </span>
              </>
            )}
          </div>
        </div>

        <button
          className={styles.startButton}
          onClick={startGame}
          aria-label="Start the game"
          id="start-game-button"
        >
          Start Game
        </button>
      </div>

      {isTouchDevice && (
        <p className={styles.mobileNote}>
          Touch & drag to play on mobile
        </p>
      )}

      <span className={styles.version}>v1.0</span>
    </div>
  );
}
