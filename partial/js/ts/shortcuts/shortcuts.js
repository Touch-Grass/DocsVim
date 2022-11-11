import { docs } from '../docs';
import { mode } from '../mode/mode';
import { clearArray } from './shortcutHelper';
if (docs.keyListenerStatus === false)
    docs.keydownInit();
export const checkBindings = (currentMode) => {
    console.log(currentMode);
    const keyArray = docs.keyArray;
    console.log(keyArray, 'keyArray');
    console.log(keyArray.includes('Escape'), 'Escape');
    if (keyArray.includes('Escape')) {
        if (currentMode === 'normal') {
            console.log("Already in normal mode");
            clearArray(keyArray);
            return;
        }
        console.log('going to normal');
        mode.mode = 'normal';
        clearArray(keyArray);
    }
    if (currentMode === 'insert') {
    }
    if (currentMode === 'normal') {
        if (keyArray.includes('i')) {
            console.log('Going to insert');
            mode.mode = 'insert';
            clearArray(keyArray);
        }
    }
    if (currentMode === 'visual') {
    }
};
