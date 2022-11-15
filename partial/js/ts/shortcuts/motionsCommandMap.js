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
        ?.switchToInsertMode(),
    gg: () => docs.pressKey(keys['home'], true, false)
};
