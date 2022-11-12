import { docs } from '../docs';
import { mode } from '../mode/mode';
import { clearArray, fancyLogError, fancyLogSuccess } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';
if (docs.keyListenerStatus === false)
    docs.keydownInit();
export const checkBindings = (currentMode) => {
    const keyArray = docs.keyArray;
    const hasInvalidChar = keyArray.some(key => !keysThatAreUsed.includes(key.toString()));
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
        if (hasInvalidChar) {
            clearArray(keyArray);
            fancyLogError('Not a valid key');
            return;
        }
    }
    if (currentMode === 'visual') {
    }
};
