var _a;
import { mode } from './mode/mode';
import { checkBindings } from './shortcuts/shortcuts';
import { vim } from './vim';
export class docs {
    static get keyListenerStatus() {
        return docs._hasEventListenerBeenAdded;
    }
    static get docID() {
        return window.location.href.split('/document/d/')[1].split('/')[0];
    }
    static get docName() {
        return ((document.querySelector('.docs-title-input-label-inner')
            .textContent ?? '').trim() ?? '');
    }
    static get getUserCursor() {
        let myCursor = null;
        document.querySelectorAll('.kix-cursor').forEach(El => {
            const caretColor = El.querySelector('.kix-cursor-caret');
            if (caretColor === null)
                return;
            const caretBorderColor = caretColor.style.borderLeftColor
                .replace(/,/g, '')
                .replace(/\s/g, '')
                .toLowerCase();
            const cursorName = (El.querySelector('.kix-cursor-name')?.textContent ?? '').trim();
            if (cursorName.length <= 0)
                myCursor = El;
        });
        if (myCursor !== null)
            return myCursor;
        return document.querySelector('.kix-cursor');
    }
    static get getCursorWidth() {
        return docs._getCursorWidth();
    }
    static set setCursorWidth([width, isInsertMode]) {
        docs._setCursorWidth(width, isInsertMode);
    }
    static get textTarget() {
        return document.querySelector('.docs-texteventtarget-iframe').contentDocument.activeElement;
    }
    static get keyArray() {
        return this._listOfCommands;
    }
    static get isInMotion() {
        return mode.isInMotion;
    }
    static set isInMotion(isInMotion) {
        mode.isInMotion = isInMotion;
    }
    static keydownInit() {
        return !docs._hasEventListenerBeenAdded ? this._keydown() : false;
    }
    static switchToNormalMode() {
        mode.mode = 'normal';
        this._listOfCommands = [];
        return this;
    }
    static switchToInsertMode() {
        mode.mode = 'insert';
        this._listOfCommands = [];
        return this;
    }
    static switchToVisualMode() {
        mode.mode = 'visual';
        this._listOfCommands = [];
        return this;
    }
    static _setCursorWidth(width, isInsertMode) {
        const cursor = this.getUserCursor;
        if (cursor === null)
            return false;
        const caret = cursor.querySelector('.kix-cursor-caret');
        caret.style.borderWidth = width;
        caret.style.borderColor = `rgba(
      ${isInsertMode ? 0 : 255}, 0, 0, ${isInsertMode ? 1 : 0.5})`;
        caret.style.mixBlendMode = 'difference';
        return true;
    }
    static _getCursorWidth() {
        const cursor = this.getUserCursor;
        if (cursor === null)
            return '0px';
        const caret = cursor.querySelector('.kix-cursor-caret');
        return `${parseInt(caret.style.borderLeftWidth) +
            parseInt(caret.style.borderRightWidth)}px`;
    }
    static _keyToArray(keyboardEvent) {
        if (vim.mode === 'normal' || vim.mode === 'visual') {
            keyboardEvent.preventDefault();
            keyboardEvent.stopImmediatePropagation();
        }
        this._listOfCommands.push(keyboardEvent.key);
        checkBindings(vim.mode);
        return this._listOfCommands;
    }
    static _keydown() {
        docs.textTarget.addEventListener('keydown', e => {
            this._keyToArray(e);
            return;
        });
        this._hasEventListenerBeenAdded = true;
        return true;
    }
    _pasteText(text) {
        const el = document.querySelectorAll('docs-texteventtarget-iframe')[0].contentDocument.querySelector('[contenteditable=true]');
        const data = new DataTransfer();
        data.setData('text/plain', text);
        const paste = new ClipboardEvent('paste', {
            clipboardData: data,
            bubbles: true,
            cancelable: true
        });
        el.dispatchEvent(paste);
    }
}
_a = docs;
docs._listOfCommands = [];
docs._hasEventListenerBeenAdded = false;
docs.pressKey = (keyCode, ctrlKey, shiftKey = mode.mode === 'visual') => {
    const element = document.getElementsByClassName('docs-texteventtarget-iframe')[0].contentDocument;
    if (element === null)
        return;
    const data = {
        keyCode: keyCode,
        ctrlKey: ctrlKey ?? false,
        shiftKey: shiftKey ?? false
    };
    const key_event = new KeyboardEvent('keydown', data);
    element.dispatchEvent(key_event);
    return _a;
};
