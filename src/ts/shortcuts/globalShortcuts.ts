import { docs } from '../docs';
import { mode } from '../mode/mode';

//Adds a the init shortcut once.
if (docs.keyListenerStatus === false) docs.keydownInit();

const keyArray = docs.keyArray;

// console.log(keyArray);

if (keyArray.includes('i')) {
  mode.mode = 'insert';
  while (keyArray.length) keyArray.pop();
}

if (keyArray.includes('Escape')) {
  mode.mode = 'normal';
  while (keyArray.length) keyArray.pop();
}
