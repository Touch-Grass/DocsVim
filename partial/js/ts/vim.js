import { mode } from './mode/mode';
export class vim extends mode {
    static get mode() {
        return this._mode;
    }
    static set mode(mode) {
        this._mode = mode;
    }
    static get number() {
        return this._number;
    }
    static set number(number) {
        this._number = number;
    }
}
vim._mode = 'insert';
vim._number = 1;
