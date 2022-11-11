import { docs } from '../docs';
console.log(docs.textTarget, 'Text target');

docs.textTarget.addEventListener('keydown', docs.keydownInit);
//     if (e.key === '73') {
//         console.log(e.key);
//         vim.mode = "insert";
//     }

//     if (e.key === `${keys.esc} `) {
//         console.log('esc');
//         vim.mode = "normal";
//     }
