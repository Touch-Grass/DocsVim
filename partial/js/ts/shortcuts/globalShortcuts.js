import { docs } from '../docs';
import { mode } from '../mode/mode';
if (docs.keyListenerStatus === false)
    docs.keydownInit();
export const checkBindings = () => {
    const keyArray = docs.keyArray;
    console.log(keyArray, "keyArray");
    if (keyArray.includes('i')) {
        console.log('going to insert');
        mode.mode = 'insert';
        while (keyArray.length)
            keyArray.pop();
    }
    if (keyArray.includes('Escape')) {
        console.log('going to normal');
        mode.mode = 'normal';
        while (keyArray.length)
            keyArray.pop();
    }
};
