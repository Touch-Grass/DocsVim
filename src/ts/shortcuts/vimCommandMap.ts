import { docs } from '../docs';
import { mode } from '../mode/mode';
import { vim } from '../vim';
import { keys } from './keymap';
import { checkBindings } from './shortcuts.js';

export const commandMap = {
  Escape: {
    normal: () => (docs.switchToMode('normal').isInMotion = false),
    visual: () =>
      ((
        docs.switchToMode('insert').pressKey(keys['ArrowLeft']) as typeof docs
      ).isInMotion = false),
    insert: () => (docs.switchToMode('normal').isInMotion = false),
    visualLine: () => (docs.switchToMode('normal').isInMotion = false)
  },
  i: {
    normal: () => docs.switchToMode('insert'),
    visual: () => docs.switchToMode('insert'),
    visualLine: () => docs.switchToMode('insert')
  },
  k: {
    normal: () => docs.pressKey(keys['ArrowUp']),
    visual: () => docs.pressKey(keys['ArrowUp']),
    visualLine: () => docs.pressKey(keys['ArrowUp'], false, true)?.selectLine()
  },
  j: {
    normal: () => docs.pressKey(keys['ArrowDown']),
    visual: () => docs.pressKey(keys['ArrowDown']),
    visualLine: () =>
      docs.pressKey(keys['ArrowDown'], false, true)?.selectLine()
  },
  l: {
    normal: () => docs.pressKey(keys['ArrowRight']),
    visual: () => docs.pressKey(keys['ArrowRight']),
    visualLine: () =>
      docs.pressKey(keys['ArrowRight'], false, true)?.selectLine()
  },
  h: {
    normal: () => docs.pressKey(keys['ArrowLeft']),
    visual: () => docs.pressKey(keys['ArrowLeft']),
    visualLine: () =>
      docs.pressKey(keys['ArrowLeft'], false, true)?.selectLine()
  },
  w: {
    normal: () => docs.pressKey(keys['ArrowRight'], true),
    visual: () => docs.pressKey(keys['ArrowRight'], true),
    visualLine: () => docs.pressKey(keys['ArrowRight'], true)?.selectLine()
  },
  e: {
    normal: () => docs.pressKey(keys['ArrowRight'], true),
    visual: () => docs.pressKey(keys['ArrowRight'], true)
  },

  b: {
    normal: () => docs.pressKey(keys['ArrowLeft'], true),
    visual: () => docs.pressKey(keys['ArrowLeft'], true)
  },
  a: {
    normal: () => docs.pressKey(keys['ArrowRight'])?.switchToMode('insert'),
    visual: () => docs.pressKey(keys['ArrowRight'])?.switchToMode('insert')
  },
  v: {
    normal: () => docs.pressKey(keys['shift'])?.switchToMode('visual')
  },
  V: {
    normal: () =>
      docs
        .pressKey(keys['home'])
        ?.pressKey(keys['shift'])
        ?.pressKey(keys['end'], false, true)
        ?.switchToMode('visualLine')
  },
  x: {
    normal: () => docs.pressKey(keys['delete'], false, false),
    visual: () => docs.pressKey(keys['delete'], false, false)
  },
  u: {
    normal: () =>
      docs
        .pressKey(keys['z'], true)
        ?.switchToMode('normal')
        .pressKey(keys['ArrowRight']),
    visual: () =>
      docs
        .pressKey(keys['z'], true)
        ?.switchToMode('normal')
        .pressKey(keys['ArrowRight'])
  },
  d: {
    normal: () => (mode.isInMotion = true),
    visual: () =>
      docs.pressKey(keys['delete'], false, false)?.switchToMode('normal'),
    visualLine: () => {
      console.log('d');
      return docs
        .pressKey(keys['delete'], false, false)
        ?.switchToMode('normal');
    }
  },
  D: {
    normal: () =>
      docs?.pressKey(keys['end'], false, true)?.pressKey(keys['delete'])
  },
  c: {
    normal: () => (mode.isInMotion = true),
    visual: () =>
      docs.pressKey(keys['delete'], false, false)?.switchToMode('insert')
  },
  $: {
    normal: () => docs.pressKey(keys['end']),
    visual: () => docs.pressKey(keys['end'])
  },
  0: {
    normal: () => {
      if (
        isNaN(mode.number) ||
        (mode.number === 1 && docs.keyArray.length === 0)
      ) {
        docs.pressKey(keys['home']);
      } else {
        console.log('0 is pressed and num is not nan', mode.number);
        console.log('after', mode.number);
      }
    },
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
  y: {
    normal: () => (mode.isInMotion = true),
    visual: () =>
      docs
        .copyText()
        ?.pressKey(keys['arrowRight'], false, false)
        ?.pressKey(keys['ArrowLeft'], false, false)
        ?.switchToMode('normal')
  },
  p: {
    normal: () => {
      docs.pressKey(keys['end'])?.pressKey(keys['enter'])?.pasteText();
    }
  },
  o: {
    normal: () =>
      docs
        .pressKey(keys['end'])
        ?.pressKey(keys['enter'])
        ?.switchToMode('insert')
  },
  O: {
    normal: () =>
      docs
        .pressKey(keys['end'])
        ?.pressKey(keys['ArrowUp'])
        ?.pressKey(keys['enter'])
        ?.switchToMode('insert')
  },
  Backspace: {
    normal: () => docs.pressKey(keys['ArrowLeft']),
    visual: () => docs.pressKey(keys['ArrowLeft'])
  }
};
