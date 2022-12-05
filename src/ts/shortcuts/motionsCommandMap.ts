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
      ?.copyText(true)
      ?.pressKey(keys['delete']),
  cw: () =>
    docs
      .pressKey(keys['ArrowRight'], true, true)
      ?.pressKey(keys['delete'], false, false)
      ?.copyText()
      ?.switchToMode('insert'),
  dw: () => {
    docs
      .pressKey(keys['ArrowRight'], true, true)
      ?.copyText()
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
      ?.pressKey(keys['ArrowDown'], true, true)
      ?.pressKey(keys['ArrowDown'], true, true)
      ?.copyText()
      ?.pressKey(keys['delete']),
  dk: () =>
    docs
      .pressKey(keys['ArrowDown'], true, false)
      ?.pressKey(keys['ArrowUp'], true, true)
      ?.pressKey(keys['ArrowUp'], true, true)
      ?.copyText()
      ?.pressKey(keys['delete'])
  // .pressKey(keys['home'])
  // ?.pressKey(keys['shift'])
  // ?.pressKey(keys['end'], false, true)
  // ?.pressKey(keys['ArrowDown'])
  // ?.pressKey(keys['ArrowUp'], true, true)
  // ?.pressKey(keys['ArrowUp'], true, true)
  // ?.pressKey(keys['ArrowUp'], true, true)
  // ?.pressKey(keys['delete']),
};
