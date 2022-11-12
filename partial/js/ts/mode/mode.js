import { docs } from '../docs';
import { vim } from '../vim';
export class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        this._updateStatusbar(mode);
        console.log('switching to mode: ', mode);
        switch (mode) {
            case 'insert':
                vim.Mode = 'insert';
                this.setCursorWidth = ['2px', true];
                break;
            case 'normal':
                vim.Mode = 'normal';
                this.setCursorWidth = ['15px', false];
                break;
            case 'visual':
                vim.Mode = 'visual';
                this.setCursorWidth = ['2px', false];
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
