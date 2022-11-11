import { docs } from '../docs';
import { vim } from '../vim';
export class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        switch (mode) {
            case 'insert':
                if (mode === 'insert')
                    return;
                vim.mode = 'insert';
                this.setCursorWidth = ['9px', true];
                break;
            case 'normal':
                if (mode === 'normal')
                    return;
                vim.mode = 'normal';
                this.setCursorWidth = ['9px', false];
                break;
            case 'visual':
                if (mode === 'visual')
                    return;
                vim.mode = 'visual';
                this.setCursorWidth = ['', false];
                break;
            default:
                break;
        }
    }
    static get mode() {
        return vim.mode;
    }
    static set mode(mode) {
        this._switchToMode(mode);
    }
}
