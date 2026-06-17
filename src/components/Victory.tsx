/**
 * Victory screen — shown when the player completes all levels.
 * Displays a celebration with a play-again button.
 */

import { useGameActions } from '../hooks/useGameState';
import styles from './Overlay.module.css';

export function Victory() {
  const { restart } = useGameActions();

  return (
    <div className={styles.overlay} role="dialog" aria-label="Victory">
      <div className={styles.emoji} role="img" aria-label="Trophy">🏆</div>
      
      <h2 className={`${styles.title} ${styles.titleVictory}`}>
        You Win!
      </h2>

      <div className={styles.stars}>
        <span className={styles.star}>⭐</span>
        <span className={styles.star}>⭐</span>
        <span className={styles.star}>⭐</span>
      </div>
      
      <p className={styles.subtitle}>
        Incredible! You've conquered all the mazes!
      </p>

      <button
        className={`${styles.actionButton} ${styles.buttonGold}`}
        onClick={restart}
        aria-label="Play again"
        id="play-again-button"
        autoFocus
      >
        Play Again
      </button>
    </div>
  );
}
