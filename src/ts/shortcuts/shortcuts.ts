import { docs } from '../docs';
import { mode } from '../mode/mode';
import { clearArray } from './shortcutHelper';

//Adds a the init shortcut once.
if (docs.keyListenerStatus === false) docs.keydownInit();

export const checkBindings = (currentMode: string) => {
  console.log(currentMode);
  const keyArray = docs.keyArray;
  console.log(keyArray, 'keyArray');
  console.log(keyArray.includes('Escape'), 'Escape');

  /**
   * Global shortcuts
   */
  if (keyArray.includes('Escape')) {
    if (currentMode === 'normal') {
      console.log('Already in normal mode');
      clearArray(keyArray);
      return;
    }
    console.log('going to normal');
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
      console.log('Going to insert');
      mode.mode = 'insert';
      clearArray(keyArray);
    }
  }

  /**
   * Visual mode shortcuts
   */
  if (currentMode === 'visual') {
    //
  }
};
