import { checkBindings } from './shortcuts/shortcuts';
import { vim } from './vim';
export class docs {
    static get keyListenerStatus() {
        return docs._hasEventListnerBeenAdded;
    }
    static get docID() {
        return window.location.href.split('/document/d/')[1].split('/')[0];
    }
    static get docName() {
        return ((document.querySelector('.docs-title-input-label-inner')
            .textContent ?? '').trim() ?? '');
    }
    static _pasteText(text) {
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
    static _setCursorWidth(width, isInsertMode) {
        const cursor = this.getUserCursor;
        if (cursor === null)
            return false;
        const caret = cursor.querySelector('.kix-cursor-caret');
        caret.style.borderWidth = width;
        caret.style.borderColor = `rgba(${isInsertMode ? 0 : 255}, 0, 0, 0.5)`;
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
    static get getCursorWidth() {
        return docs._getCursorWidth();
    }
    static set setCursorWidth([width, isInsertMode]) {
        docs._setCursorWidth(width, isInsertMode);
    }
    static get textTarget() {
        return document.querySelector('.docs-texteventtarget-iframe').contentDocument.activeElement;
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
    static get keyArray() {
        return this._listOfCommands;
    }
    static _keydown() {
        docs.textTarget.addEventListener('keydown', e => {
            this._keyToArray(e);
            return;
        });
        this._hasEventListnerBeenAdded = true;
        return true;
    }
    static keydownInit() {
        return docs._hasEventListnerBeenAdded === false ? this._keydown() : false;
    }
}
docs._listOfCommands = [];
docs._hasEventListnerBeenAdded = false;
docs.pressKey = (keyCode, ctrlKey, shiftKey) => {
    const el = document.querySelectorAll('.docs-texteventtarget-iframe')[0].contentDocument;
    const data = {
        keyCode,
        ctrlKey,
        shiftKey
    };
    let key_event = new KeyboardEvent('keypress', data);
    el.dispatchEvent(key_event);
};
