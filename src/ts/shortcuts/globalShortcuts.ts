import { docs } from '../docs';
import { mode } from '../mode/mode';

console.log(docs.keyListenerStatus);

//Adds a the init shortcut once.
if (docs.keyListenerStatus === false) docs.keydownInit();

const keyArray = docs.keyArray;

// console.log(keyArray);

if (keyArray.includes('i')) {
  console.log('i was pressed');
  mode.mode = 'insert';
  while (keyArray.length) keyArray.pop();
}

if (keyArray.includes('Escape')) {
  console.log('Escape was pressed');
  mode.mode = 'normal';
  while (keyArray.length) keyArray.pop();
}
