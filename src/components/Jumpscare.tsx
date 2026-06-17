/**
 * Jumpscare component — Level 5 only.
 * 
 * On any wall collision in Level 5, this displays a full-screen
 * red flash with screen shake for 0.5-1 second, then transitions
 * to the Game Over screen.
 * 
 * The jumpscare duration and auto-transition to Game Over are handled
 * by the useGameActions().triggerJumpscare() function, which sets a
 * timeout to dispatch END_JUMPSCARE after JUMPSCARE_DURATION_MS.
 */

import styles from './Jumpscare.module.css';

export function Jumpscare() {
  return (
    <div
      className={styles.jumpscareOverlay}
      role="alert"
      aria-label="Jumpscare effect"
    >
      <div className={styles.jumpscareContent}>
        {/* TODO: Replace with jumpscare video element */}
        {/* 
          To add a jumpscare video:
          1. Import or reference your video file
          2. Replace the text below with:
             <video autoPlay muted playsInline>
               <source src={jumpscareVideoUrl} type="video/mp4" />
             </video>
          3. Adjust the JUMPSCARE_DURATION_MS in constants.ts to match video length
        */}
        <span className={styles.jumpscareText}>!</span>
      </div>
    </div>
  );
}
