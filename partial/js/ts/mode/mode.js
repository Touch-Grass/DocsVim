import { docs } from '../docs';
import { vim } from '../vim';
export class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        console.log('switching to mode: ', mode);
        switch (mode) {
            case 'insert':
                vim.Mode = 'insert';
                this.setCursorWidth = ['9px', true];
                break;
            case 'normal':
                vim.Mode = 'normal';
                this.setCursorWidth = ['9px', false];
                break;
            case 'visual':
                vim.Mode = 'visual';
                this.setCursorWidth = ['', false];
                break;
            default:
                break;
        }
    }
    static get mode() {
        return vim.Mode;
    }
    static set mode(mode) {
        this._switchToMode(mode);
    }
}
