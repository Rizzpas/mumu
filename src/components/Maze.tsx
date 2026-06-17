/**
 * Maze component — renders the SVG maze and handles player position display.
 * 
 * The maze is rendered as an SVG with viewBox "0 0 100 100" for percentage
 * coordinate alignment. Walkable paths, start/finish zones, and the player
 * indicator are all rendered as SVG elements.
 * 
 * Accepts a forwarded ref that attaches to the outer container div,
 * allowing the GameScreen to use it for input tracking coordinate conversion.
 */

import { forwardRef, useMemo } from 'react';
import type { LevelData, Point } from '../levels/types';
import styles from './Maze.module.css';

interface MazeProps {
  /** Current level data to render */
  level: LevelData;
  /** Player position in percentage coordinates (null = not tracking) */
  playerPosition: Point | null;
  /** Whether the player has entered the start zone (game active) */
  isActive: boolean;
  /** Whether this is a touch device */
  isTouchDevice: boolean;
  /** Whether to show the wall-hit flash effect */
  showHitFlash: boolean;
}

export const Maze = forwardRef<HTMLDivElement, MazeProps>(
  function Maze(
    { level, playerPosition, isActive, isTouchDevice, showHitFlash },
    ref
  ) {
    // Convert path polygons to SVG polygon point strings
    const pathElements = useMemo(
      () =>
        level.paths.map((path, index) => {
          const pointsStr = path.map(p => `${p.x},${p.y}`).join(' ');
          return (
            <polygon
              key={`path-${index}`}
              points={pointsStr}
              className={styles.pathArea}
            />
          );
        }),
      [level.paths]
    );

    return (
      <div className={styles.mazeContainer} ref={ref}>
        <svg
          className={styles.mazeSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Maze level ${level.id}: ${level.name}`}
        >
          {/* Background (walls) */}
          <rect
            x="0" y="0" width="100" height="100"
            className={styles.mazeBackground}
          />

          {/* Walkable path areas */}
          {pathElements}

          {/* Start zone glow */}
          <rect
            x={level.start.x - 2}
            y={level.start.y - 2}
            width={level.start.width + 4}
            height={level.start.height + 4}
            className={styles.startZoneGlow}
          />
          {/* Start zone */}
          <rect
            x={level.start.x}
            y={level.start.y}
            width={level.start.width}
            height={level.start.height}
            className={styles.startZone}
          />
          <text
            x={level.start.x + level.start.width / 2}
            y={level.start.y + level.start.height / 2}
            className={styles.zoneLabel}
          >
            START
          </text>

          {/* Finish zone glow */}
          <rect
            x={level.finish.x - 2}
            y={level.finish.y - 2}
            width={level.finish.width + 4}
            height={level.finish.height + 4}
            className={styles.finishZoneGlow}
          />
          {/* Finish zone */}
          <rect
            x={level.finish.x}
            y={level.finish.y}
            width={level.finish.width}
            height={level.finish.height}
            className={styles.finishZone}
          />
          <text
            x={level.finish.x + level.finish.width / 2}
            y={level.finish.y + level.finish.height / 2}
            className={styles.zoneLabel}
          >
            FINISH
          </text>

          {/* Player position indicator (rendered for both desktop cursor and mobile character) */}
          {playerPosition && isActive && (
            <>
              {/* Outer glow */}
              <circle
                cx={playerPosition.x}
                cy={playerPosition.y}
                r={isTouchDevice ? 2.5 : 1.8}
                className={styles.playerDotGlow}
              />
              {/* Core dot */}
              <circle
                cx={playerPosition.x}
                cy={playerPosition.y}
                r={isTouchDevice ? 1.5 : 0.8}
                className={styles.playerDot}
              />
            </>
          )}
        </svg>

        {/* Decorative border glow */}
        <div className={styles.mazeBorder} />

        {/* Wall hit flash effect */}
        {showHitFlash && <div className={styles.wallHitFlash} />}

        {/* Start prompt (shown before player enters start zone) */}
        {!isActive && (
          <p className={styles.startPrompt}>
            {isTouchDevice ? 'Tap the START zone to begin' : 'Hover over START to begin'}
          </p>
        )}
      </div>
    );
  }
);
