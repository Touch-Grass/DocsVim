import { docs } from '../docs';
import { mode } from '../mode/mode';
import { clearArray, fancyLogError, fancyLogSuccess } from './shortcutHelper';
if (docs.keyListenerStatus === false)
    docs.keydownInit();
export const checkBindings = (currentMode) => {
    console.log(currentMode);
    const keyArray = docs.keyArray;
    console.log(keyArray, 'keyArray');
    console.log(keyArray.includes('Escape'), 'Escape');
    if (keyArray.includes('Escape')) {
        if (currentMode === 'normal') {
            fancyLogError("Already in normal mode");
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
            console.log(mode.mode, 'mode.mode');
            clearArray(keyArray);
            console.log(mode.mode, 'mode.mode');
        }
    }
    if (currentMode === 'visual') {
    }
};
