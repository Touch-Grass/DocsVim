import { docs } from "../docs";
import { vim } from "../vim";
export class mode extends docs {
    constructor() {
        super();
    }
    static _switchToMode(mode) {
        vim.number = 1;
        console.log(mode);
        switch (mode) {
            case 'insert':
                vim.mode = 'insert';
                break;
            case 'normal':
                vim.mode = 'normal';
                break;
            case 'visual':
                vim.mode = 'visual';
                this.setCursorWidth('2px', false);
                break;
        }
    }
    static get mode() {
        return vim.mode;
    }
    static set mode(mode) {
        console.log('switching', mode);
        this._switchToMode(mode);
    }
}
