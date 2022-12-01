import { docs } from '../docs';
import { keys } from './keymap';

export const motionsCommandMap: Record<string, () => any> = {
  diw: () => {
    docs
      .pressKey(keys['ArrowLeft'], true, false)
      ?.pressKey(keys['ArrowRight'], true, true)
      ?.pressKey(keys['delete'], false, false);
  },
  ciw: () =>
    docs
      .pressKey(keys['ArrowLeft'], true, false)
      ?.pressKey(keys['ArrowRight'], true, true)
      ?.pressKey(keys['delete'], false, false)
      ?.switchToMode('insert'),
  gg: () => docs.pressKey(keys['home'], true, false),
  dd: () =>
    docs
      .pressKey(keys['home'])
      ?.pressKey(keys['shift'])
      ?.pressKey(keys['end'], false, true)
      ?.pressKey(keys['delete']),
  cw: () =>
    docs
      .pressKey(keys['ArrowRight'], true, true)
      ?.pressKey(keys['delete'], false, false)
      ?.switchToMode('insert'),
  dw: () => {
    docs
      .pressKey(keys['ArrowRight'], true, true)
      ?.pressKey(keys['delete'], false, false);
  },
  yy: () =>
    docs
      .pressKey(keys['home'])
      ?.pressKey(keys['shift'])
      ?.pressKey(keys['end'], false, true)
      ?.copyText()
      ?.stopSelecting(),
  yiw: () =>
    docs
      .pressKey(keys['ArrowLeft'], true, false)
      ?.pressKey(keys['ArrowRight'], true, true)
      ?.copyText()
      ?.stopSelecting(),
  yw: () =>
    docs.pressKey(keys['ArrowRight'], true, true)?.copyText()?.stopSelecting(),
  dj: () =>
    docs
      .pressKey(keys['home'])
      ?.pressKey(keys['shift'])
      ?.pressKey(keys['end'], false, true)
      ?.pressKey(keys['delete'])
      ?.pressKey(keys['backspace'])
      ?.pressKey(keys['ArrowDown'], true)
      ?.pressKey(keys['shift'])
      ?.pressKey(keys['end'], false, true)
      ?.pressKey(keys['delete'])
      ?.pressKey(keys['backspace'])
      ?.pressKey(keys['home']),
  dk: () =>
    docs
      .pressKey(keys['home'])
      ?.pressKey(keys['shift'])
      ?.pressKey(keys['end'], false, true)
      ?.pressKey(keys['delete'])
      ?.pressKey(keys['backspace'])
      ?.pressKey(keys['ArrowUp'], true)
      ?.pressKey(keys['shift'])
      ?.pressKey(keys['end'], false, true)
      ?.pressKey(keys['delete'])
      ?.pressKey(keys['backspace'])
      ?.pressKey(keys['home'])
};
