import { docs } from '../docs';
import { statusLine } from '../statusLine';
import { vimModeType } from '../types/types';
import { vim } from '../vim';

export class mode extends docs {
  /**
   * @param mode {string} - The mode to set the editor to.
   */
  private static _switchToMode(mode: vimModeType): void {
    // The number before a method. Ex: 5dd will delete 5 lines.
    vim.number = 1;
    // Updates the statusbar to display the current mode ect.
    statusLine.updateStatusbar(mode);

    // Handles the cursor and vim Mode login when switching modes.
    switch (mode) {
      case 'insert':
        console.log('Switching to insert mode.');
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

  static get number(): number {
    return vim.number;
  }

  static set number(number: number) {
    if (isNaN(number)) {
      vim.number = 1;
      return;
    }
    vim.number = number;
  }

  /**
   * If you are currently in a motion such as diw or daw.
   */
  static get isInMotion(): boolean {
    return vim.isInMotion;
  }

  /**
   * Sets if you are in a motion or not.
   * @param isInMotion {boolean} - If you are in a motion or not.
   */
  static set isInMotion(isInMotion: boolean) {
    vim.isInMotion = isInMotion;
  }

  /**
   * Switches the mode to insert
   */
  public static switchToNormalMode() {
    this.mode = 'normal';

    return this;
  }

  /**
   * Switches the mode to insert
   */
  public static switchToInsertMode() {
    this.mode = 'insert';

    return this;
  }

  /**
   * Switches the mode to visual
   */
  public static switchToVisualMode() {
    this.mode = 'visual';

    return this;
  }
}
