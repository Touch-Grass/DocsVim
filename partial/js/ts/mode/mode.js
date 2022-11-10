import { docs } from "../docs";
import { vim } from "../vim";
export class mode extends docs {
    constructor() {
        super();
    }
    switchToMode(mode) {
        vim.number = 1;
        console.log(mode);
        switch (mode) {
            case 'insert':
                this.setCursorWidth('9px', true);
                vim.mode = 'insert';
                break;
            case 'normal':
                vim.mode = 'normal';
                this.setCursorWidth('9px', false);
                break;
            case 'visual':
                vim.mode = 'visual';
                this.setCursorWidth('2px', false);
                break;
        }
    }
    get mode() {
        return vim.mode;
    }
    set mode(mode) {
        console.log('switching', mode);
        this.switchToMode(mode);
    }
}
