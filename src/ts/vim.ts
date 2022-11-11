import { mode } from './mode/mode';
import { vimModeType } from './types/types';

export class vim extends mode {
  static Mode: vimModeType = 'insert';
  static number = 1;
}
