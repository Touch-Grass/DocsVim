import { docs } from '../docs';
import { keys } from './keymap';

export const motionsCommandMap: Record<string, () => any> = {
  diw: () =>
    docs
      .pressKey(keys['ArrowLeft'], true)
      ?.pressKey(keys['ArrowRight'], true, true)
      ?.pressKey(keys['delete'], false, false)
};
