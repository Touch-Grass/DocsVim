import { docs } from '../docs';
import { mode } from '../mode/mode';
import { clearArray, fancyLogError, fancyLogSuccess } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';

//Adds a the init shortcut once.
if (docs.keyListenerStatus === false) docs.keydownInit();

export const checkBindings = (currentMode: string) => {
  const keyArray = docs.keyArray;
  const hasInvalidChar = (keyArray.some((key) => !keysThatAreUsed.includes(key.toString())))

  /**
   * Global shortcuts
   */
  if (keyArray.includes('Escape')) {
    if (currentMode === 'normal') {
      fancyLogError('Already in normal mode');
      clearArray(keyArray);
      return;
    }

    fancyLogSuccess('going to normal');
    mode.mode = 'normal';
    clearArray(keyArray);
  }

  /**
   * Insert mode shortcuts
   */
  if (currentMode === 'insert') {
    //
  }

  /**
   * Normal mode shortcuts
   */
  if (currentMode === 'normal') {
    if (keyArray.includes('i')) {
      fancyLogSuccess('Going to insert');
      mode.mode = 'insert';
      clearArray(keyArray);
    }

    if (keyArray.includes('v')) {
      fancyLogSuccess('Going to visual');
      mode.mode = 'visual';
      clearArray(keyArray);
    }


    if (hasInvalidChar) {
      clearArray(keyArray);
      fancyLogError('Not a valid key');
      return;
    }
  }

  /**
   * Visual mode shortcuts
   */
  if (currentMode === 'visual') {
    //
  }
};
