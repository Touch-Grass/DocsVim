import { docs } from "../docs";
import { vim } from "../vim";

export class mode extends docs {
    constructor () {
        super();
    }

    /**
     * Switches the mode to the given mode.
     * @param mode {string} - The mode to set the editor to.
     */
    private switchToMode(mode: 'insert' | 'normal' | 'visual'): void {
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

    get mode(): string {
        return vim.mode;
    }

    set mode(mode: string) {
        console.log('switching', mode);
        this.switchToMode(mode as 'insert' | 'normal' | 'visual');
    }
}
