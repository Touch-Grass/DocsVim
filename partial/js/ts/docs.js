var _a;
import { mode } from './mode/mode';
import { checkBindings } from './shortcuts/shortcuts';
import { vim } from './vim';
import { keys } from './shortcuts/keymap';
import { statusLine } from './statusLine';
export class docs {
    static get keyListenerStatus() {
        return docs._keyListener;
    }
    static get clickListenerStatus() {
        return docs._mouseListener;
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
        return async () => (await this._waitForElm('.docs-texteventtarget-iframe')).contentDocument.activeElement;
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
    static pressHTMLElement(selector, type = 'id', clickingMenuItem = false, addNewLine = false) {
        const elSelector = document.querySelector(`[${type}="${selector}"]`);
        if (!elSelector)
            return;
        if (!clickingMenuItem)
            elSelector.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        if (clickingMenuItem) {
            elSelector.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            elSelector.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            elSelector.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            elSelector.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            elSelector.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        }
        if (addNewLine) {
            try {
                navigator.clipboard.readText().then(clipboardText => {
                    console.log(`"${clipboardText.trim()}"`);
                    navigator.clipboard.writeText(`${clipboardText.trim()}\n`);
                });
            }
            catch (e) {
                console.error(e);
            }
        }
        return this;
    }
    static keydownInit() {
        return !docs._keyListener ? this._keydown() : false;
    }
    static clickInit() {
        return !docs._mouseListener ? this._clickEvent() : false;
    }
    static switchToMode(setMode) {
        mode.mode = setMode;
        this._listOfCommands = [];
        this.correctCursor();
        return this;
    }
    static correctCursor() {
        switch (mode.mode) {
            case 'normal':
                this._setCursorWidth('7px', false);
                break;
            case 'insert':
                this._setCursorWidth('2px', true);
                break;
            case 'visual':
                this._setCursorWidth('2px', true);
                break;
            default:
                break;
        }
    }
    static _waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector))
                return resolve(document.querySelector(selector));
            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    static _setCursorWidth(width, isInsertMode) {
        const cursor = this.getUserCursor;
        if (cursor === null)
            return false;
        const caret = cursor.querySelector('.kix-cursor-caret');
        caret.style.borderWidth = width;
        const cursorColor = `rgba(${isInsertMode ? 0 : 255}, 0, 0, ${isInsertMode ? 1 : 0.5})`;
        caret.style.setProperty('border-color', cursorColor, 'important');
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
        if (vim.mode === 'normal' ||
            vim.mode === 'visual' ||
            vim.mode === 'visualLine') {
            keyboardEvent.preventDefault();
            keyboardEvent.stopImmediatePropagation();
        }
        const key = keyboardEvent.key;
        if (key === 'Control' || key === 'Shift' || key === 'Alt')
            return this._listOfCommands;
        this._listOfCommands.push(keyboardEvent.key);
        statusLine.updateKeyArray(vim.mode);
        checkBindings(vim.mode);
        return this._listOfCommands;
    }
    static _keydown() {
        docs.textTarget().then(target => {
            target.addEventListener('keydown', e => {
                this._keyToArray(e);
                return;
            });
            this._keyListener = true;
        });
        return true;
    }
    static _clickEvent() {
        document.addEventListener('click', e => {
            this.correctCursor();
            this._mouseListener = true;
        });
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
docs._keyListener = false;
docs._mouseListener = false;
docs.pressKey = (keyCode, ctrlKey, shiftKey = mode.mode === 'visual' || mode.mode === 'visualLine') => {
    const element = document.getElementsByClassName('docs-texteventtarget-iframe')[0].contentDocument;
    const data = {
        keyCode: keyCode,
        ctrlKey: ctrlKey ?? false,
        shiftKey: shiftKey ?? false
    };
    const key_event = new KeyboardEvent('keydown', data);
    element.dispatchEvent(key_event);
    _a.correctCursor();
    return _a;
};
docs.copyText = (clickingMenuItem = true) => {
    console.log('copying text');
    return docs.pressHTMLElement(':77', 'id', clickingMenuItem, false);
};
docs.pasteText = () => {
    return docs.pressHTMLElement(':78', 'id', true);
};
docs.selectLine = () => {
    return (docs
        .pressKey(keys['home'])
        ?.pressKey(keys['end'], false, true));
};
docs.stopSelecting = () => {
    return docs
        .pressKey(keys['arrowRight'], false, false)
        ?.pressKey(keys['ArrowLeft'], false, false);
};
