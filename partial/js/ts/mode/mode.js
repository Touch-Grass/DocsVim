import { docs } from "../docs";
import { vim } from "../vim";
export class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        console.log(mode + " mode123");
        switch (mode) {
            case 'insert':
                this.setCursorWidth = ['9px', true];
                vim.mode = 'insert';
                break;
            case 'normal':
                vim.mode = 'normal';
                this.setCursorWidth = ['9px', false];
                break;
            case 'visual':
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
