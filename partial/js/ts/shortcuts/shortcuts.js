import { docs } from '../docs';
import { mode } from '../mode/mode';
import { commandMap } from './vimCommandMap';
import { clearArray, fancyLogError } from './shortcutHelper';
import { keysThatAreUsed } from './usedKeys';
import { motionsCommandMap } from './motionsCommandMap';
if (!docs.keyListenerStatus)
    docs.keydownInit();
if (!docs.clickListenerStatus)
    docs.clickInit();
export const checkBindings = (currentMode, overRideModeNumber) => {
    const keyArray = docs.keyArray;
    const hasInvalidChar = keyArray.some(key => !keysThatAreUsed.includes(key.toString()));
    const initShortcuts = () => {
        const modeNumber = isNaN(mode.number)
            ? 1
            : mode.number < 50
                ? mode.number
                : 1;
        for (const [key, value] of Object.entries(commandMap)) {
            for (const v of Object.entries(value)) {
                if (v[0].includes(currentMode)) {
                    if (keyArray.includes(key) &&
                        (key === 'Escape' ? true : !mode.isInMotion)) {
                        if (currentMode === 'visualLine') {
                            for (let i = 0; i < modeNumber; i++) {
                                console.log('Visual Line Mode');
                                v[1]();
                            }
                            if (!mode.isInMotion && isNaN(parseInt(key)))
                                clearArray(keyArray);
                            return;
                        }
                        for (let i = 0; i < modeNumber; i++)
                            v[1]();
                        if (!mode.isInMotion && isNaN(parseInt(key)))
                            clearArray(keyArray);
                    }
                }
            }
        }
        for (const [key, value] of Object.entries(motionsCommandMap)) {
            if (mode.isInMotion) {
                if (keyArray.join('').replace(/,/g, '').includes(key)) {
                    for (let i = 0; i < modeNumber; i++)
                        value();
                    clearArray(keyArray);
                    mode.isInMotion = false;
                }
                if (keyArray.length >= 4) {
                    clearArray(keyArray);
                    mode.isInMotion = false;
                }
            }
        }
    };
    initShortcuts();
    if (currentMode === 'normal') {
        if (hasInvalidChar) {
            fancyLogError('Not a valid key');
            clearArray(keyArray);
            return;
        }
    }
    let num = '';
    console.log('keyArray', keyArray);
    for (let i = 0; i < keyArray.length; i++) {
        if (keyArray[i].toString().match(/[0-9]/g)) {
            num += parseInt(keyArray[i].toString());
            console.log('Number is now', num);
        }
    }
    isNaN(parseInt(num)) ? (mode.number = 1) : (mode.number = parseInt(num));
};
