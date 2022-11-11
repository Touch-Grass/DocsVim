import { docs } from '../docs';
import { mode } from '../mode/mode';
console.log(docs.keyListenerStatus);
if (docs.keyListenerStatus === false)
    docs.keydownInit();
const keyArray = docs.keyArray;
if (keyArray.includes('i')) {
    console.log('i was pressed');
    mode.mode = 'insert';
    while (keyArray.length)
        keyArray.pop();
}
if (keyArray.includes('Escape')) {
    console.log('Escape was pressed');
    mode.mode = 'normal';
    while (keyArray.length)
        keyArray.pop();
}
