import { docs } from '../docs';
import { mode } from '../mode/mode';
import { keys } from './keymap';

export const commandMap = {
  $: {
    normal: () => docs.pressKey(keys['end']),
    visual: () => docs.pressKey(keys['end'])
  },
  0: {
    normal: () => {
      if (
        isNaN(mode.number) ||
        (mode.number === 1 && docs.keyArray.length !== 0)
      )
        docs.pressKey(keys['home']);
    },
    visual: () => docs.pressKey(keys['home'])
  },
  Backspace: {
    normal: () => docs.pressKey(keys['ArrowLeft']),
    visual: () => docs.pressKey(keys['ArrowLeft']),
    visualLine: () => docs.pressKey(keys['ArrowLeft'])
  },
  Space: {
    normal: () => docs.pressKey(keys['ArrowRight']),
    visual: () => docs.pressKey(keys['ArrowRight']),
    visualLine: () => docs.pressKey(keys['ArrowRight'])
  },
  D: {
    normal: () =>
      docs?.pressKey(keys['end'], false, true)?.pressKey(keys['delete'])
  },
  C: {
    normal: () =>
      docs
        ?.pressKey(keys['end'], false, true)
        ?.pressKey(keys['delete'])
        ?.switchToMode('insert')
  },
  Escape: {
    normal: () => (docs.switchToMode('normal').isInMotion = false),
    visual: () =>
      ((
        docs.switchToMode('normal').pressKey(keys['ArrowLeft']) as typeof docs
      ).isInMotion = false),
    insert: () => (docs.switchToMode('normal').isInMotion = false),
    visualLine: () => (docs.switchToMode('normal').isInMotion = false)
  },
  G: {
    normal: () => docs.pressKey(keys['end'], true),
    visual: () => docs.pressKey(keys['end'], true),
    visualLine: () => docs.pressKey(keys['end'], true)
  },
  O: {
    normal: () =>
      docs
        .pressKey(keys['end'])
        ?.pressKey(keys['ArrowUp'])
        ?.pressKey(keys['enter'])
        ?.switchToMode('insert')
  },
  V: {
    normal: () =>
      docs
        .pressKey(keys['home'])
        ?.pressKey(keys['shift'])
        ?.pressKey(keys['end'], false, true)
        ?.switchToMode('visualLine')
  },

  '^': {
    normal: () => docs.pressKey(keys['home']),
    visual: () => docs.pressKey(keys['home']),
    visualLine: () => docs.pressKey(keys['home'])
  },
  a: {
    normal: () => docs.pressKey(keys['ArrowRight'])?.switchToMode('insert')
  },
  b: {
    normal: () => docs.pressKey(keys['ArrowLeft'], true),
    visual: () => docs.pressKey(keys['ArrowLeft'], true)
  },
  c: {
    normal: () => (mode.isInMotion = true),
    visual: () =>
      docs.pressKey(keys['delete'], false, false)?.switchToMode('insert')
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
  e: {
    normal: () => docs.pressKey(keys['ArrowRight'], true),
    visual: () => docs.pressKey(keys['ArrowRight'], true)
  },
  g: {
    normal: () => (mode.isInMotion = true),
    visual: () => (mode.isInMotion = true)
  },
  h: {
    normal: () => docs.pressKey(keys['ArrowLeft']),
    visual: () => docs.pressKey(keys['ArrowLeft']),
    visualLine: () =>
      docs.pressKey(keys['ArrowLeft'], false, true)?.selectLine()
  },
  i: {
    normal: () => docs.switchToMode('insert')
  },
  I: {
    normal: () => docs.pressKey(keys['home'])?.switchToMode('insert')
  },
  A: {
    normal: () => docs.pressKey(keys['end'])?.switchToMode('insert')
  },
  j: {
    normal: () => docs.pressKey(keys['ArrowDown']),
    visual: () => docs.pressKey(keys['ArrowDown']),
    visualLine: () =>
      docs.pressKey(keys['ArrowDown'], false, true)?.selectLine()
  },
  k: {
    normal: () => docs.pressKey(keys['ArrowUp']),
    visual: () => docs.pressKey(keys['ArrowUp']),
    visualLine: () => docs.pressKey(keys['ArrowUp'], false, true)?.selectLine()
  },
  l: {
    normal: () => docs.pressKey(keys['ArrowRight']),
    visual: () => docs.pressKey(keys['ArrowRight']),
    visualLine: () =>
      docs.pressKey(keys['ArrowRight'], false, true)?.selectLine()
  },
  o: {
    normal: () =>
      docs
        .pressKey(keys['end'])
        ?.pressKey(keys['enter'])
        ?.switchToMode('insert')
  },
  p: {
    normal: () => {
      docs.pasteText();
    }
  },
  P: {
    normal: () => {
      docs.pressKey(keys['ArrowLeft'], false, false)?.pasteText();
    }
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
  v: {
    normal: () => docs.pressKey(keys['shift'])?.switchToMode('visual')
  },
  w: {
    normal: () => docs.pressKey(keys['ArrowRight'], true),
    visual: () => docs.pressKey(keys['ArrowRight'], true),
    visualLine: () => docs.pressKey(keys['ArrowRight'], true)?.selectLine()
  },
  x: {
    normal: () =>
      docs
        .pressKey(keys['ArrowRight'], false, true)
        ?.copyText()
        ?.pressKey(keys['backspace']),
    visual: () => docs.copyText()?.pressKey(keys['delete'], false, false),
    visualLine: () => docs.copyText()?.pressKey(keys['delete'], false, false)
  },
  y: {
    normal: () => (mode.isInMotion = true),
    visual: () => docs.copyText()?.stopSelecting()?.switchToMode('normal'),
    visualLine: () => docs.copyText()?.stopSelecting()?.switchToMode('normal')
  }
};
