import { docs } from '../docs';
import { mode } from '../mode/mode';
import { clearArray, fancyLogError, fancyLogSuccess } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';
if (docs.keyListenerStatus === false)
    docs.keydownInit();
export const checkBindings = (currentMode) => {
    const keyArray = docs.keyArray;
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
    if (currentMode === 'insert') {
    }
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
        let hasInvalidChar = !(keyArray.some(key => keysThatAreUsed.includes(key.toString())));
        console.log(hasInvalidChar, 'invalidChar');
        console.log(keyArray.some(key => keysThatAreUsed.includes(key.toString())), 'some');
        if (hasInvalidChar) {
            console.log(keyArray, 'keyArray');
            clearArray(keyArray);
            fancyLogError("Not a valid key");
            return;
        }
    }
    if (currentMode === 'visual') {
    }
};
