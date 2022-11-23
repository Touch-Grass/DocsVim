import { docs } from '../docs';
import { statusLine } from '../statusLine';
import { vim } from '../vim';
export class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        statusLine.updateStatusbar(mode);
        switch (mode) {
            case 'insert':
                vim.mode = 'insert';
                this.setCursorWidth = ['2px', true];
                break;
            case 'normal':
                vim.mode = 'normal';
                this.setCursorWidth = ['7px', false];
                break;
            case 'visual':
                vim.mode = 'visual';
                this.setCursorWidth = ['7px', false];
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
    static get number() {
        return vim.number;
    }
    static set number(number) {
        console.trace('Setting number to: ' + number);
        if (isNaN(number)) {
            console.log('num is nan, num is: ', number);
            vim.number = 1;
            return;
        }
        vim.number = number;
    }
    static get isInMotion() {
        return vim.isInMotion;
    }
    static set isInMotion(isInMotion) {
        vim.isInMotion = isInMotion;
    }
    static switchToNormalMode() {
        this.mode = 'normal';
        return this;
    }
    static switchToInsertMode() {
        this.mode = 'insert';
        return this;
    }
    static switchToVisualMode() {
        this.mode = 'visual';
        return this;
    }
}
