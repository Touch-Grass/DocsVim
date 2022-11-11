import { docs } from '../docs';
import { vimModeType } from '../types/types';
import { vim } from '../vim';

export class mode extends docs {
  /**
   * @param mode {string} - The mode to set the editor to.
   */
  private static _switchToMode(mode: vimModeType): void {
    vim.number = 1;
    console.log(mode + ' mode123');

    switch (mode) {
      case 'insert':
        if (mode === 'insert') return;
        console.log('Setting mode to insert');
        vim.mode = 'insert';
        this.setCursorWidth = ['9px', true];
        break;

      case 'normal':
        if (mode === 'normal') return;
        console.log('Setting the mode to normal');
        vim.mode = 'normal';
        this.setCursorWidth = ['9px', false];
        break;

      case 'visual':
        if (mode === 'visual') return;
        console.log('Setting the mode to visual');
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
  static get mode(): vimModeType {
    return vim.mode;
  }

  /**
   * Sets the mode that vim is in.
   */
  static set mode(mode: vimModeType) {
    this._switchToMode(mode);
  }
}
