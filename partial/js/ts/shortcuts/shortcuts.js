import { docs } from '../docs';
import { mode } from '../mode/mode';
import { commandMap } from './vimCommandMap';
import { clearArray, fancyLogError, fancyLogSuccess } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';
import { motionsCommandMap } from './motionsCommandMap';
if (docs.keyListenerStatus === false)
    docs.keydownInit();
export const checkBindings = (currentMode) => {
    const keyArray = docs.keyArray;
    const hasInvalidChar = keyArray.some(key => !keysThatAreUsed.includes(key.toString()));
    const initShortcuts = () => {
        for (const [key, value] of Object.entries(commandMap)) {
            for (const v of Object.entries(value)) {
                if (v[0] === currentMode) {
                    if (keyArray.includes(key) &&
                        (key === 'Escape' ? true : mode.isInMotion === false)) {
                        v[1]();
                        clearArray(keyArray);
                    }
                }
            }
        }
        for (const [key, value] of Object.entries(motionsCommandMap)) {
            if (mode.isInMotion === true) {
                console.log("I'm in motion", key, value);
                if (keyArray.join('').replace(/,/g, '') === key) {
                    console.log('I am in motion and I have a match');
                    value();
                    clearArray(keyArray);
                }
            }
        }
    };
    initShortcuts();
    if (currentMode === 'normal') {
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
