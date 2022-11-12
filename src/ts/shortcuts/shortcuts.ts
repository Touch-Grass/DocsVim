import { docs } from '../docs';
import { mode } from '../mode/mode';
import { keys } from './keymap';
import { clearArray, fancyLogError, fancyLogSuccess } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';

//Adds a the init shortcut once.
if (docs.keyListenerStatus === false) docs.keydownInit();

/**
 * Main function that handles all the shortcuts.
 */
export const checkBindings = (currentMode: string) => {
  const keyArray = docs.keyArray;
  const hasInvalidChar = keyArray.some(
    key => !keysThatAreUsed.includes(key.toString())
  );

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
    if (keyArray.includes('i')) {
      fancyLogError('Already in insert mode');
      clearArray(keyArray);
    }
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

    if (keyArray.includes('w')) {
      fancyLogSuccess("Jumping to the next word's start");
      // docs.pressKey(keys['uparrow']);
      const el = (document.querySelectorAll('.docs-texteventtarget-iframe')[0] as HTMLIFrameElement).contentDocument as Document;
      let key_event = new KeyboardEvent('keypress', { code: 'ArrowRight' });

      el.dispatchEvent(key_event);

      console.log(keys['uparrow'], "up arrow's key code");
      console.log(docs.pressKey(keys['uparrow']));
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
    if (keyArray.includes('v')) {
      fancyLogError('Already in visual mode');
      clearArray(keyArray);
    }

    if (keyArray.includes('i')) {
      fancyLogSuccess('Going to insert');
      mode.mode = 'insert';
      clearArray(keyArray);
    }
  }
};
