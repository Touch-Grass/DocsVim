import { keys } from "./keymap";
import { vim } from "../vim";
import { docs } from "../docs";

// document.addEventListener('keydown', (e) => {
//     if (e.key === '73') {
//         console.log('i');
//         vimInstance.mode = "insert";
//     }

//     if (e.key === `${keys.esc} `) {
//         console.log('esc');
//         vimInstance.mode = "normal";
//     }
// });

setTimeout(() => {
    console.log('insert mode called');
    document.addEventListener('keydown', (e) => {
        console.log("key pressed", e.code);
    });
}, 1000);

docs.texttarget.addEventListener('keydown', (e: KeyboardEvent) => {
    console.log('keydown', e.code);
});


const vimInstance = new vim();
vimInstance.mode = "normal";
console.log(vim.mode);
setTimeout(() => {
    vimInstance.mode = "insert";
    console.log(vim.mode);
}, 1000)