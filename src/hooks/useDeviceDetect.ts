/**
 * Device detection hook for Mumu.
 * Detects whether the user is on a touch-capable device.
 */

import { useState, useEffect } from 'react';

/**
 * Detects if the current device supports touch input.
 * Used to switch between cursor-tracking (desktop) and
 * draggable character (mobile/tablet) gameplay modes.
 * 
 * @returns true if the device has touch capabilities
 */
export function useDeviceDetect(): { isTouchDevice: boolean } {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();

    // Also listen for first touch event to catch devices that
    // report touch capability only after first interaction
    const handleFirstTouch = () => {
      setIsTouchDevice(true);
      window.removeEventListener('touchstart', handleFirstTouch);
    };

    window.addEventListener('touchstart', handleFirstTouch, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  return { isTouchDevice };
}
