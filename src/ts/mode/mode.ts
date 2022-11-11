import { docs } from '../docs';
import { vimModeType } from '../types/types';
import { vim } from '../vim';

export class mode extends docs {
  /**
   * @param mode {string} - The mode to set the editor to.
   */
  private static _switchToMode(mode: vimModeType): void {
    vim.number = 1;

    switch (mode) {
      case 'insert':
        if (mode === 'insert') return;
        vim.mode = 'insert';
        this.setCursorWidth = ['9px', true];
        break;

      case 'normal':
        if (mode === 'normal') return;
        vim.mode = 'normal';
        this.setCursorWidth = ['9px', false];
        break;

      case 'visual':
        if (mode === 'visual') return;
        vim.mode = 'visual';
        this.setCursorWidth = ['', false];
        break;

      default:
        break;
    }
  }

  /**
   * Returns the mode that vim is in.
   */
  static get setMode(): vimModeType {
    return vim.mode;
  }

  /**
   * Sets the mode that vim is in.
   */
  static set setMode(mode: vimModeType) {
    this._switchToMode(mode);
  }
}
