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
        if (currentMode === 'normal')
            return;
        console.log('going to normal');
        mode.setMode = 'normal';
        clearArray(keyArray);
    }
    if (currentMode === 'insert') {
    }
    if (currentMode === 'normal') {
        if (keyArray.includes('i')) {
            console.log('Going to insert');
            mode.setMode = 'insert';
            clearArray(keyArray);
        }
    }
    if (currentMode === 'visual') {
    }
};
