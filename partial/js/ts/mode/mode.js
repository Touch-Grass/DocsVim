import { docs } from '../docs';
import { statusline } from '../statusline';
import { vim } from '../vim';
export class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        statusline.updateStatusbar(mode);
        console.log('switching to mode: ', mode);
        switch (mode) {
            case 'insert':
                vim.mode = 'insert';
                this.setCursorWidth = ['2px', true];
                break;
            case 'normal':
                vim.mode = 'normal';
                this.setCursorWidth = ['15px', false];
                break;
            case 'visual':
                vim.mode = 'visual';
                this.setCursorWidth = ['2px', false];
                break;
            default:
                break;
        }
    }
    static get mode() {
        return vim.mode;
    }
    static set mode(mode) {
        console.log('In the setter', mode);
        this._switchToMode(mode);
    }
}
