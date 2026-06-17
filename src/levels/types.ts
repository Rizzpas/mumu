/**
 * Type definitions for Mumu maze level data.
 * 
 * Coordinate system: All positions use percentage-based coordinates (0-100)
 * relative to the maze container. This ensures responsiveness across all
 * screen sizes without manual scaling calculations.
 */

/** A 2D point in percentage coordinates (0-100) */
export interface Point {
  x: number;
  y: number;
}

/** A rectangle defined by position and dimensions (percentage coords) */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** A wall segment defined as a line with thickness */
export interface WallSegment {
  /** Start point of the wall segment */
  start: Point;
  /** End point of the wall segment */
  end: Point;
  /** Thickness of the wall in percentage units */
  thickness: number;
}

/**
 * Complete level data for a single maze level.
 * 
 * Each level defines its maze layout through wall segments and
 * rectangular zones for start/finish areas. New levels can be
 * added by creating a new file that exports a LevelData object
 * and registering it in the levels index.
 */
export interface LevelData {
  /** Unique level identifier (1-based) */
  id: number;
  /** Display name for the level */
  name: string;
  /** The start zone — player must enter here to begin */
  start: Rect;
  /** The finish zone — reaching this completes the level */
  finish: Rect;
  /** 
   * Walkable path polygons defined as arrays of points.
   * The player must stay inside at least one of these polygons.
   * Points should be ordered (clockwise or counter-clockwise).
   */
  paths: Point[][];
  /** Optional outer boundary (defaults to the full 0-100 area) */
  boundary?: Rect;
}

/** Game difficulty metadata */
export interface LevelMeta {
  /** Path width — larger = easier */
  pathWidth: number;
  /** Description of the level for accessibility */
  description: string;
}
