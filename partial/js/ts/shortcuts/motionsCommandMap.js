import { docs } from '../docs';
import { keys } from './keymap';
export const motionsCommandMap = {
    diw: () => {
        docs
            .pressKey(keys['ArrowLeft'], true, false)
            ?.pressKey(keys['ArrowRight'], true, true)
            ?.pressKey(keys['delete'], false, false);
    },
    ciw: () => docs
        .pressKey(keys['ArrowLeft'], true, false)
        ?.pressKey(keys['ArrowRight'], true, true)
        ?.pressKey(keys['delete'], false, false)
        ?.switchToMode('insert'),
    gg: () => docs.pressKey(keys['home'], true, false),
    dd: () => docs
        .pressKey(keys['home'])
        ?.pressKey(keys['shift'])
        ?.pressKey(keys['end'], false, true)
        ?.pressKey(keys['delete'])
        ?.pressKey(keys['delete']),
    cw: () => docs
        .pressKey(keys['ArrowRight'], true, true)
        ?.pressKey(keys['delete'], false, false)
        ?.switchToMode('insert'),
    dw: () => {
        docs
            .pressKey(keys['ArrowRight'], true, true)
            ?.pressKey(keys['delete'], false, false);
    },
};
