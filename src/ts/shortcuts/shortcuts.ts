import { docs } from '../docs';
import { mode } from '../mode/mode';
import { commandMap } from './vimCommandMap';
import { clearArray, fancyLogError } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';
import { motionsCommandMap } from './motionsCommandMap';
import { vimModeType } from '../types/types.js';

//Adds the init shortcut once.
if (!docs.keyListenerStatus) docs.keydownInit();

/**
 * Main function that handles all the shortcuts.
 */
export const checkBindings = (currentMode: vimModeType, overRideModeNumber?: number) => {
  const keyArray = docs.keyArray;
  const hasInvalidChar = keyArray.some(
    key => !keysThatAreUsed.includes(key.toString())
  );

  const initShortcuts = () => {
    const modeNumber = isNaN(mode.number)
      ? 1
      : mode.number < 50
        ? mode.number
        : 1;
    // Loops through nested functionMap object.
    for (const [key, value] of Object.entries(commandMap)) {
      for (const v of Object.entries(value)) {
        if (v[0] === currentMode) {
          // If key is Escape, it can escape out of a motion.
          if (
            keyArray.includes(key) &&
            (key === 'Escape' ? true : !mode.isInMotion)
          ) {
            for (let i = 0; i < modeNumber; i++) v[1]();
            if (!mode.isInMotion) clearArray(keyArray);
          }
        }
      }
    }

    for (const [key, value] of Object.entries(motionsCommandMap)) {
      if (mode.isInMotion) {
        if (keyArray.join('').replace(/,/g, '').includes(key)) {
          for (let i = 0; i < modeNumber; i++) value();
          clearArray(keyArray);
          mode.isInMotion = false;
        }
      }
    }

    if (!overRideModeNumber) {
      let num = '';
      for (let i = 0; i < keyArray.length; i++) {
        if (keyArray[i].toString().match(/[0-9]/g)) {
          console.log('I have a number');
          num += parseInt(keyArray[i].toString());
          console.log('Number is now', num);
        }
      }
      mode.number = parseInt(num);
      console.log(isNaN(mode.number) ? 1 : mode.number, 'mode.number');
    } else {
      console.log('Overriding mode number', mode.number);
      mode.number = overRideModeNumber;
    }
  };

  initShortcuts();
  /**
   * Normal mode shortcuts
   */
  if (currentMode === 'normal') {
    if (hasInvalidChar) {
      fancyLogError('Not a valid key');
      clearArray(keyArray);
      return;
    }
  }
};
