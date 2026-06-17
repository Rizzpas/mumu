/**
 * App — Root component for Mumu.
 * 
 * Renders the appropriate screen based on the current game state.
 * All game state is managed through the GameProvider context.
 */

import { GameProvider, useGameState } from './hooks/useGameState';
import { TitleScreen } from './components/TitleScreen';
import { GameScreen } from './components/GameScreen';
import { Jumpscare } from './components/Jumpscare';

/**
 * Inner app component that reads game state from context.
 * Separated from App to keep the provider at the top level.
 */
function GameRouter() {
  const { state, isJumpscareActive } = useGameState();

  return (
    <>
      {/* Jumpscare overlay — renders on top of everything */}
      {isJumpscareActive && <Jumpscare />}

      {/* Main game screens based on state */}
      {state === 'idle' && <TitleScreen />}
      {state === 'playing' && <GameScreen />}
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
