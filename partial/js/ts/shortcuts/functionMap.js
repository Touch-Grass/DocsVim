import { docs } from '../docs';
import { keys } from './keymap';

export const functionMap = {
  k: {
    normal: () => docs.pressKey(keys['ArrowUp']),
    visual: () => docs.pressKey(keys['ArrowUp'])
  },
  j: {
    normal: () => docs.pressKey(keys['ArrowDown']),
    visual: () => docs.pressKey(keys['ArrowDown'])
  },
  l: {
    normal: () => docs.pressKey(keys['ArrowRight']),
    visual: () => docs.pressKey(keys['ArrowRight'])
  },
  h: {
    normal: () => docs.pressKey(keys['ArrowLeft']),
    visual: () => docs.pressKey(keys['ArrowLeft'])
  },
  w: {
    normal: () => docs
      .pressKey(keys['ArrowRight'], true)
      ?.pressKey(keys['ArrowRight'], true)
      ?.pressKey(keys['ArrowLeft'], true),
    visual: () => docs
      .pressKey(keys['ArrowRight'], true)
      ?.pressKey(keys['ArrowRight'], true)
      ?.pressKey(keys['ArrowLeft'], true)
  },
  e: {
    normal: () => docs.pressKey(keys['ArrowRight'], true),
    visual: () => docs.pressKey(keys['ArrowRight'], true)
  },
  b: {
    normal: () => docs.pressKey(keys['ArrowLeft'], true),
    visual: () => docs.pressKey(keys['ArrowLeft'], true)
  },
  i: {
    normal: () => docs.switchToInsertMode(),
    visual: () => docs.switchToInsertMode()
  },
  a: {
    normal: () => docs.pressKey(keys['ArrowRight'])?.switchToMode(),
    visual: () => docs.pressKey(keys['ArrowRight'])?.switchToMode()
  },
  Escape: {
    normal: () => (docs.switchToNormalMode().isInMotion = false),
    visual: () => (docs.switchToNormalMode().isInMotion = false),
    insert: () => (docs.switchToNormalMode().isInMotion = false)
  },
  v: {
    normal: () => docs.pressKey(keys['shift'])?.switchToVisualMode()
  },
  x: {
    normal: () => docs.pressKey(keys['delete'], false, false),
    visual: () => docs.pressKey(keys['delete'], false, false)
  },
  u: {
    normal: () => docs.pressKey(keys['z'], true),
    visual: () => docs.pressKey(keys['z'], true)
  }
};
