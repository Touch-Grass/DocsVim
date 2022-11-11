import { docs } from '../docs';
console.log(docs.textTarget, 'Text target');
docs.textTarget.addEventListener('keydown', docs.keydownInit);
