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
    static get isInMotion() {
        return this._isInMotion;
    }
    static set isInMotion(isInMotion) {
        this._isInMotion = isInMotion;
    }
}
vim._mode = 'insert';
vim._number = 1;
vim._isInMotion = false;
