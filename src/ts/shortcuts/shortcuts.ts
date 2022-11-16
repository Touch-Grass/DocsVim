import { docs } from '../docs';
import { mode } from '../mode/mode';
import { commandMap } from './vimCommandMap';
import { clearArray, fancyLogError, fancyLogSuccess } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';
import { motionsCommandMap } from './motionsCommandMap';

//Adds the init shortcut once.
if (!docs.keyListenerStatus) docs.keydownInit();

/**
 * Main function that handles all the shortcuts.
 */
export const checkBindings = (currentMode: string) => {
  const keyArray = docs.keyArray;
  const hasInvalidChar = keyArray.some(
    key => !keysThatAreUsed.includes(key.toString())
  );

  const initShortcuts = () => {
    // Loops through nested functionMap object.
    for (const [key, value] of Object.entries(commandMap)) {
      for (const v of Object.entries(value)) {
        if (v[0] === currentMode) {
          // If key is Escape, it can escape out of a motion.
          if (
            keyArray.includes(key) &&
            (key === 'Escape' ? true : !mode.isInMotion)
          ) {
            const modeNumber = isNaN(mode.number)
              ? 1
              : mode.number >= 100
              ? mode.number
              : 1;
            for (let i = 0; i < modeNumber; i++) {
              v[1]();
            }
            console.log('Clearing the array', mode.isInMotion);
            if (!mode.isInMotion) clearArray(keyArray);
          }
        }
      }
    }

    for (const [key, value] of Object.entries(motionsCommandMap)) {
      if (mode.isInMotion) {
        console.log("I'm in motion", keyArray, value);

        if (keyArray.join('').replace(/,/g, '') === key) {
          console.log('I am in motion and I have a match');
          value();
          clearArray(keyArray);
          mode.isInMotion = false;
        }
      }
    }

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
  };

  // Calls every key press.
  initShortcuts();
  /**
   * Normal mode shortcuts
   */
  if (currentMode === 'normal') {
    // if (keyArray.includes('d')) {
    //   fancyLogSuccess('Starting delete motion');
    //   mode.isInMotion = true;
    // }

    if (keyArray.includes('v')) {
      fancyLogSuccess('Starting visual mode');
      mode.mode = 'visual';
    }

    if (hasInvalidChar) {
      fancyLogError('Not a valid key');
      clearArray(keyArray);
      return;
    }
  }
};
