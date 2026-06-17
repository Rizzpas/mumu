/**
 * Input tracking hook for Mumu.
 * 
 * Handles both mouse (desktop) and touch (mobile) input,
 * converting pixel positions to percentage coordinates for
 * resolution-independent collision detection.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Point } from '../levels/types';
import { pixelToPercent } from '../game/collision';

interface UseInputTrackingOptions {
  /** Whether tracking is currently active */
  enabled: boolean;
  /** Reference to the maze container element */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Whether we're on a touch device */
  isTouchDevice: boolean;
}

interface UseInputTrackingReturn {
  /** Current position in percentage coords (null if not tracking) */
  position: Point | null;
  /** Whether the user is actively moving/dragging */
  isTracking: boolean;
  /** Reset position (e.g., after wall hit) */
  resetPosition: (pos: Point | null) => void;
}

/**
 * Tracks mouse or touch position relative to the maze container.
 * 
 * Desktop: mousemove events on the container
 * Mobile: touchmove events (drag-based)
 * 
 * Returns position in percentage coordinates (0-100).
 */
export function useInputTracking({
  enabled,
  containerRef,
  isTouchDevice,
}: UseInputTrackingOptions): UseInputTrackingReturn {
  const [position, setPosition] = useState<Point | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const positionRef = useRef<Point | null>(null);

  const resetPosition = useCallback((pos: Point | null) => {
    setPosition(pos);
    positionRef.current = pos;
    if (!pos) {
      setIsTracking(false);
    }
  }, []);

  // Convert a client coordinate to percentage position
  const getPercentPosition = useCallback(
    (clientX: number, clientY: number): Point | null => {
      const container = containerRef.current;
      if (!container) return null;

      const rect = container.getBoundingClientRect();
      const pixelX = clientX - rect.left;
      const pixelY = clientY - rect.top;

      // Check if within bounds
      if (pixelX < 0 || pixelX > rect.width || pixelY < 0 || pixelY > rect.height) {
        return null;
      }

      return pixelToPercent(pixelX, pixelY, rect.width, rect.height);
    },
    [containerRef]
  );

  // Mouse move handler (desktop)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      const pos = getPercentPosition(e.clientX, e.clientY);
      if (pos) {
        positionRef.current = pos;
        setPosition(pos);
        setIsTracking(true);
      }
    },
    [enabled, getPercentPosition]
  );

  // Mouse leave handler — cursor left the maze area
  const handleMouseLeave = useCallback(
    () => {
      if (!enabled || isTouchDevice) return;
      // Don't immediately trigger wall hit when leaving — 
      // let the game component handle this via the null position
      setIsTracking(false);
    },
    [enabled, isTouchDevice]
  );

  // Touch handlers (mobile)
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getPercentPosition(touch.clientX, touch.clientY);
      if (pos) {
        positionRef.current = pos;
        setPosition(pos);
        setIsTracking(true);
      }
    },
    [enabled, getPercentPosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getPercentPosition(touch.clientX, touch.clientY);
      if (pos) {
        positionRef.current = pos;
        setPosition(pos);
      }
    },
    [enabled, getPercentPosition]
  );

  const handleTouchEnd = useCallback(
    () => {
      if (!enabled) return;
      setIsTracking(false);
    },
    [enabled]
  );

  // Attach/detach event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    if (isTouchDevice) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    } else {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (isTouchDevice) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      } else {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [
    containerRef,
    enabled,
    isTouchDevice,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Reset when disabled
  useEffect(() => {
    if (!enabled) {
      setPosition(null);
      setIsTracking(false);
      positionRef.current = null;
    }
  }, [enabled]);

  return { position, isTracking, resetPosition };
}
