import { mode } from './mode/mode';
import { vimModeType } from './types/types';

/**
 * The vim class handles variables related to vim and the editor.
 */
export class vim extends mode {
  static Mode: vimModeType = 'insert';
  static number = 1;
}
