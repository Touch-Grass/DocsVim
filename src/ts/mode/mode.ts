import { docs } from '../docs';
import { vimModeType } from '../types/types';
import { vim } from '../vim';

export class mode extends docs {
  /**
   * @param mode {string} - The mode to set the editor to.
   */
  private static _switchToMode(mode: vimModeType): void {
    vim.number = 1;
    console.log("switching to mode: ", mode);

    switch (mode) {
      case 'insert':
        if (mode === 'insert') return;
        vim.Mode = 'insert';
        this.setCursorWidth = ['9px', true];
        break;

      case 'normal':
        if (mode === 'normal') return;
        vim.Mode = 'normal';
        this.setCursorWidth = ['9px', false];
        break;

      case 'visual':
        if (mode === 'visual') return;
        vim.Mode = 'visual';
        this.setCursorWidth = ['', false];
        break;

      default:
        break;
    }
  }

  /**
   * Returns the mode that vim is in.
   */
  static get mode(): vimModeType {
    return vim.Mode;
  }

  /**
   * Sets the mode that vim is in.
   */
  static set mode(mode: vimModeType) {
    this._switchToMode(mode);
  }
}
