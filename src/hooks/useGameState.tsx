/**
 * Central game state management for Mumu.
 * 
 * Uses React Context + useReducer for predictable state transitions.
 * All game state changes flow through the reducer — no ad-hoc setState calls.
 */

import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import { JUMPSCARE_LEVEL, JUMPSCARE_DURATION_MS, TOTAL_LEVELS } from '../game/constants';

/** Possible game states */
export type GameState = 'idle' | 'playing' | 'lost';

/** All actions that can transition the game state */
export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'HIT_WALL' }
  | { type: 'REACH_FINISH' }
  | { type: 'RESTART' }
  | { type: 'TRIGGER_JUMPSCARE' }
  | { type: 'END_JUMPSCARE' };

/** Complete game state shape */
export interface GameStateData {
  state: GameState;
  currentLevel: number;
  isJumpscareActive: boolean;
  /** Incremented on each wall hit to signal position reset */
  resetCounter: number;
}

/** Context value exposed to consumers */
interface GameContextValue extends GameStateData {
  dispatch: React.Dispatch<GameAction>;
  /** Whether we're on the jumpscare level */
  isJumpscareLevel: boolean;
}

const initialState: GameStateData = {
  state: 'idle',
  currentLevel: 1,
  isJumpscareActive: false,
  resetCounter: 0,
};

/**
 * Game state reducer — handles all state transitions.
 * 
 * State machine:
 *   idle → START_GAME → playing
 *   playing → HIT_WALL → playing (lives > 1, non-jumpscare level)
 *   playing → HIT_WALL → lost (lives = 1 or jumpscare level)
 *   playing → TRIGGER_JUMPSCARE → playing (with jumpscare active)
 *   playing → END_JUMPSCARE → lost
 *   playing → REACH_FINISH → won (level < total) or victory (level = total)
 *   won → NEXT_LEVEL → playing
 *   lost/victory → RESTART → idle
 */
function gameReducer(state: GameStateData, action: GameAction): GameStateData {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        state: 'playing',
      };

    case 'HIT_WALL': {
      // Immediate restart on wall hit
      return { ...initialState };
    }

    case 'TRIGGER_JUMPSCARE':
      return {
        ...state,
        isJumpscareActive: true,
      };

    case 'END_JUMPSCARE':
      // Return to title screen after jumpscare
      return { ...initialState };

    case 'REACH_FINISH': {
      // Final level → jumpscare instead of victory!
      if (state.currentLevel >= TOTAL_LEVELS) {
        return {
          ...state,
          isJumpscareActive: true,
        };
      }
      // Auto-advance to next level
      return {
        ...state,
        state: 'playing',
        currentLevel: state.currentLevel + 1,
        resetCounter: 0,
      };
    }



    case 'RESTART':
      return { ...initialState };

    default:
      return state;
  }
}

// Create the context
const GameContext = createContext<GameContextValue | null>(null);

/**
 * Provider component that wraps the game and provides state + dispatch.
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const value: GameContextValue = {
    ...gameState,
    dispatch,
    isJumpscareLevel: gameState.currentLevel === JUMPSCARE_LEVEL,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

/**
 * Hook to access game state and dispatch actions.
 * Must be used within a GameProvider.
 */
export function useGameState(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}

/**
 * Hook that provides stable callback functions for game events.
 * Uses refs to avoid re-creating callbacks on every render.
 */
export function useGameActions() {
  const { dispatch, isJumpscareActive } = useGameState();
  const jumpscareTimerRef = useRef<number | null>(null);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, [dispatch]);

  const hitWall = useCallback(() => {
    if (isJumpscareActive) return; // Already in jumpscare
    dispatch({ type: 'HIT_WALL' });
  }, [dispatch, isJumpscareActive]);

  const reachFinish = useCallback(() => {
    dispatch({ type: 'REACH_FINISH' });
  }, [dispatch]);



  const restart = useCallback(() => {
    if (jumpscareTimerRef.current) {
      clearTimeout(jumpscareTimerRef.current);
      jumpscareTimerRef.current = null;
    }
    dispatch({ type: 'RESTART' });
  }, [dispatch]);

  const triggerJumpscare = useCallback(() => {
    dispatch({ type: 'TRIGGER_JUMPSCARE' });
    // Auto-end jumpscare after duration
    jumpscareTimerRef.current = window.setTimeout(() => {
      dispatch({ type: 'END_JUMPSCARE' });
      jumpscareTimerRef.current = null;
    }, JUMPSCARE_DURATION_MS);
  }, [dispatch]);

  return {
    startGame,
    hitWall,
    reachFinish,
    restart,
    triggerJumpscare,
  };
}
