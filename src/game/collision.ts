/**
 * Collision detection utilities for Mumu.
 * 
 * Uses the ray-casting algorithm for point-in-polygon testing.
 * All coordinates are in percentage space (0-100) for resolution independence.
 */

import type { Point, Rect } from '../levels/types';

/**
 * Determines if a point lies inside a polygon using the ray-casting algorithm.
 * 
 * How it works: Cast a horizontal ray from the point to the right.
 * Count how many polygon edges the ray crosses. If odd → inside, if even → outside.
 * 
 * @param point - The point to test
 * @param polygon - Array of vertices defining the polygon (ordered)
 * @returns true if the point is inside the polygon
 */
export function isPointInPolygon(point: Point, polygon: Point[]): boolean {
  const { x, y } = point;
  const n = polygon.length;
  let inside = false;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;

    // Check if the ray from (x, y) going right intersects this edge
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

/**
 * Checks if a point is inside a rectangle.
 * 
 * @param point - The point to test
 * @param rect - The rectangle to test against
 * @returns true if the point is inside the rectangle
 */
export function isPointInRect(point: Point, rect: Rect): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

/**
 * Checks if a point is inside any of the walkable path polygons.
 * The player is considered "on a wall" if they are NOT inside any path.
 * 
 * @param point - The player's current position
 * @param paths - Array of walkable path polygons
 * @returns true if the point is in a walkable area
 */
export function isPointInWalkableArea(point: Point, paths: Point[][]): boolean {
  return paths.some(path => isPointInPolygon(point, path));
}

/**
 * Converts pixel coordinates (relative to a container element) to
 * percentage coordinates (0-100) used by the level data.
 * 
 * @param pixelX - X position in pixels relative to container
 * @param pixelY - Y position in pixels relative to container
 * @param containerWidth - Width of the container in pixels
 * @param containerHeight - Height of the container in pixels
 * @returns Point in percentage coordinates
 */
export function pixelToPercent(
  pixelX: number,
  pixelY: number,
  containerWidth: number,
  containerHeight: number
): Point {
  return {
    x: (pixelX / containerWidth) * 100,
    y: (pixelY / containerHeight) * 100,
  };
}

/**
 * Calculates the distance between a point and a line segment.
 * Used for more nuanced collision detection near wall edges.
 * 
 * @param point - The point to measure from
 * @param segStart - Start of the line segment
 * @param segEnd - End of the line segment  
 * @returns The minimum distance from the point to the segment
 */
export function distanceToSegment(
  point: Point,
  segStart: Point,
  segEnd: Point
): number {
  const dx = segEnd.x - segStart.x;
  const dy = segEnd.y - segStart.y;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    // Segment is a point
    const px = point.x - segStart.x;
    const py = point.y - segStart.y;
    return Math.sqrt(px * px + py * py);
  }

  // Project point onto the line, clamping to segment bounds
  let t = ((point.x - segStart.x) * dx + (point.y - segStart.y) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));

  const projX = segStart.x + t * dx;
  const projY = segStart.y + t * dy;
  const distX = point.x - projX;
  const distY = point.y - projY;

  return Math.sqrt(distX * distX + distY * distY);
}
