import { mode } from './mode/mode';
import { vimModeType } from './types/types';

/**
 * The vim class handles variables related to vim and the editor.
 */
export class vim extends mode {
  private static _mode: vimModeType = 'insert';
  private static _number = 1;
  private static _isInMotion = false;

  static get mode(): vimModeType {
    return this._mode;
  }

  static set mode(mode: vimModeType) {
    this._mode = mode;
  }

  static get number(): number {
    return this._number;
  }

  static set number(number: number) {
    this._number = number;
  }

  static get isInMotion(): boolean {
    return this._isInMotion;
  }

  static set isInMotion(isInMotion: boolean) {
    this._isInMotion = isInMotion;
  }
}
