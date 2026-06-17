/**
 * GameScreen component — main gameplay container.
 * 
 * Orchestrates the maze rendering, input tracking, collision detection,
 * and game state transitions. This is the core gameplay loop.
 * 
 * Collision detection flow:
 * 1. Input tracking provides position in percentage coordinates
 * 2. Each position change, we check if position is in a walkable path
 * 3. If not → wall hit (dispatch HIT_WALL)
 * 4. If in finish zone → level complete (dispatch REACH_FINISH)
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { useGameState, useGameActions } from '../hooks/useGameState';
import { useInputTracking } from '../hooks/useInputTracking';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { getLevelById } from '../levels';
import { isPointInWalkableArea, isPointInRect } from '../game/collision';
import { COLLISION_COOLDOWN_MS, JUMPSCARE_LEVEL } from '../game/constants';
import { Maze } from './Maze';
import { HUD } from './HUD';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const { currentLevel, state, resetCounter, isJumpscareActive } = useGameState();
  const { hitWall, reachFinish, triggerJumpscare } = useGameActions();
  const { isTouchDevice } = useDeviceDetect();

  // This ref is forwarded to the Maze component's outer container div,
  // so input tracking calculates coordinates relative to the actual maze area
  const mazeContainerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [showHitFlash, setShowHitFlash] = useState(false);
  const lastCollisionTime = useRef(0);
  const hasEnteredStart = useRef(false);

  // Get current level data
  const level = getLevelById(currentLevel);

  // Input tracking — only track when game is playing
  const { position, resetPosition } = useInputTracking({
    enabled: state === 'playing' && !isJumpscareActive,
    containerRef: mazeContainerRef,
    isTouchDevice,
  });

  // Reset active state when level changes or position resets
  useEffect(() => {
    setIsActive(false);
    hasEnteredStart.current = false;
    resetPosition(null);
  }, [currentLevel, resetCounter, resetPosition]);

  // Show wall hit flash effect briefly
  const flashWallHit = useCallback(() => {
    setShowHitFlash(true);
    setTimeout(() => setShowHitFlash(false), 300);
  }, []);

  /**
   * Main collision detection loop.
   * Runs whenever the player position changes.
   * 
   * Logic:
   * - If player hasn't entered start zone yet → wait for them
   * - If player is in finish zone → level complete
   * - If player is NOT in any walkable path → wall hit
   */
  useEffect(() => {
    if (!position || !level || state !== 'playing' || isJumpscareActive) return;

    // Check if player has entered the start zone
    if (!hasEnteredStart.current) {
      if (isPointInRect(position, level.start)) {
        hasEnteredStart.current = true;
        setIsActive(true);
      }
      return; // Don't check collisions until player enters start
    }

    // Check if player reached the finish zone
    if (isPointInRect(position, level.finish)) {
      reachFinish();
      return;
    }

    // Check if player is in a walkable area
    const inWalkableArea = isPointInWalkableArea(position, level.paths);

    if (!inWalkableArea) {
      // Collision cooldown to prevent rapid-fire wall hits
      const now = Date.now();
      if (now - lastCollisionTime.current < COLLISION_COOLDOWN_MS) return;
      lastCollisionTime.current = now;

      flashWallHit();

      // On jumpscare level, trigger jumpscare instead of normal wall hit
      if (currentLevel === JUMPSCARE_LEVEL) {
        triggerJumpscare();
      } else {
        hitWall();
        hasEnteredStart.current = false;
        setIsActive(false);
      }
    }
  }, [
    position,
    level,
    state,
    isJumpscareActive,
    currentLevel,
    hitWall,
    reachFinish,
    triggerJumpscare,
    flashWallHit,
  ]);

  if (!level) {
    return <div>Level not found</div>;
  }

  return (
    <div className={`${styles.gameContainer} no-select`} role="main">
      <HUD />

      <div className={styles.mazeWrapper}>
        <p className={styles.levelTitle}>{level.name}</p>

        {/* The ref is forwarded to Maze's container div for input coordinate tracking */}
        <Maze
          ref={mazeContainerRef}
          level={level}
          playerPosition={position}
          isActive={isActive}
          isTouchDevice={isTouchDevice}
          showHitFlash={showHitFlash}
        />
      </div>
    </div>
  );
}
