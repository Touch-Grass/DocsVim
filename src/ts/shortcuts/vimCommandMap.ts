import { docs } from '../docs';
import { mode } from '../mode/mode';
import { keys } from './keymap';

export const commandMap = {
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
    normal: () => docs.pressKey(keys['ArrowRight'], true),
    visual: () => docs.pressKey(keys['ArrowRight'], true)
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
    normal: () => docs.pressKey(keys['ArrowRight'])?.switchToInsertMode(),
    visual: () => docs.pressKey(keys['ArrowRight'])?.switchToInsertMode()
  },
  Escape: {
    normal: () => (docs.switchToNormalMode().isInMotion = false),
    visual: () =>
      ((
        docs.switchToInsertMode().pressKey(keys['ArrowLeft']) as typeof docs
      ).isInMotion = false),
    insert: () => (docs.switchToNormalMode().isInMotion = false)
  },
  v: {
    normal: () => docs.pressKey(keys['shift'])?.switchToVisualMode()
  },
  V: {
    normal: () =>
      docs
        .pressKey(keys['home'])
        ?.pressKey(keys['shift'])
        ?.pressKey(keys['end'], false, true)
        ?.switchToVisualMode()
  },
  x: {
    normal: () => docs.pressKey(keys['delete'], false, false),
    visual: () => docs.pressKey(keys['delete'], false, false)
  },
  u: {
    normal: () =>
      docs
        .pressKey(keys['z'], true)
        ?.switchToNormalMode()
        .pressKey(keys['ArrowRight']),
    visual: () =>
      docs
        .pressKey(keys['z'], true)
        ?.switchToNormalMode()
        .pressKey(keys['ArrowRight'])
  },
  d: {
    normal: () => (mode.isInMotion = true),
    visual: () =>
      docs.pressKey(keys['delete'], false, false)?.switchToNormalMode()
  },
  D: {
    normal: () =>
      docs
        .pressKey(keys['home'])
        ?.pressKey(keys['shift'])
        ?.pressKey(keys['end'], false, true)
        ?.pressKey(keys['delete'])
        ?.pressKey(keys['delete'])
  },
  c: {
    normal: () => (mode.isInMotion = true),
    visual: () =>
      docs.pressKey(keys['delete'], false, false)?.switchToInsertMode()
  },
  $: {
    normal: () => docs.pressKey(keys['end']),
    visual: () => docs.pressKey(keys['end'])
  },
  0: {
    normal: () => docs.pressKey(keys['home']),
    visual: () => docs.pressKey(keys['home'])
  },
  '^': {
    normal: () => docs.pressKey(keys['home']),
    visual: () => docs.pressKey(keys['home'])
  },
  g: {
    normal: () => (mode.isInMotion = true),
    visual: () => (mode.isInMotion = true)
  },
  G: {
    normal: () => docs.pressKey(keys['end'], true),
    visual: () => docs.pressKey(keys['end'], true)
  },
  o: {
    normal: () =>
      docs.pressKey(keys['end'])?.pressKey(keys['enter'])?.switchToInsertMode()
  },
  O: {
    normal: () =>
      docs
        .pressKey(keys['end'])
        ?.pressKey(keys['ArrowUp'])
        ?.pressKey(keys['enter'])
        ?.switchToInsertMode()
  }
};
