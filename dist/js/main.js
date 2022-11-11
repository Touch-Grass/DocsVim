var _a;


class docs {
    static get keyListenerStatus() {
        return docs._hasEventListnerBeenAdded;
    }
    static _debounce(func, timeout = docs._fireRate) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
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
            cancelable: true,
        });
        el.dispatchEvent(paste);
    }
    static get getUserCursor() {
        let myCursor = null;
        document.querySelectorAll('.kix-cursor').forEach((El) => {
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
        caret.style.borderLeftWidth = width;
        caret.style.borderRightWidth = width;
        caret.style.borderColor = `rgba(${isInsertMode ? 255 : 0}, 0, 0, 1)`;
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
    static _keyToArray(key) {
        this._listOfCommands.push(key);
        checkBindings(vim.Mode);
        return this._listOfCommands;
    }
    static get keyArray() {
        return this._listOfCommands;
    }
    static _keydown() {
        docs.textTarget.addEventListener('keydown', (e) => {
            this._keyToArray(e.key);
            return;
        });
        this._hasEventListnerBeenAdded = true;
        return true;
    }
}
_a = docs;
docs._listOfCommands = [];
docs._fireRate = 100;
docs._hasEventListnerBeenAdded = false;
docs.keydownInit = () => {
    return docs._hasEventListnerBeenAdded === false
        ? _a._keydown()
        : undefined;
};



class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        console.log("switching to mode: ", mode);
        switch (mode) {
            case 'insert':
                if (mode === 'insert')
                    return;
                vim.Mode = 'insert';
                this.setCursorWidth = ['9px', true];
                break;
            case 'normal':
                if (mode === 'normal')
                    return;
                vim.Mode = 'normal';
                this.setCursorWidth = ['9px', false];
                break;
            case 'visual':
                if (mode === 'visual')
                    return;
                vim.Mode = 'visual';
                this.setCursorWidth = ['', false];
                break;
            default:
                break;
        }
    }
    static get mode() {
        return vim.Mode;
    }
    static set mode(mode) {
        this._switchToMode(mode);
    }
}




class vim extends mode {
}
vim.Mode = 'normal';
vim.number = 1;



const keys = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    pausebreak: 19,
    capslock: 20,
    esc: 27,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    leftarrow: 37,
    uparrow: 38,
    rightarrow: 39,
    downarrow: 40,
    insert: 45,
    delete: 46,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    leftwindowkey: 91,
    rightwindowkey: 92,
    selectkey: 93,
    numpad0: 96,
    numpad1: 97,
    numpad2: 98,
    numpad3: 99,
    numpad4: 100,
    numpad5: 101,
    numpad6: 102,
    numpad7: 103,
    numpad8: 104,
    numpad9: 105,
    multiply: 106,
    add: 107,
    subtract: 109,
    decimalpoint: 110,
    divide: 111,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    numlock: 144,
    scrolllock: 145,
    semicolon: 186,
    equalsign: 187,
    comma: 188,
    dash: 189,
    period: 190,
    forwardslash: 191,
    graveaccent: 192,
    openbracket: 219,
    backslash: 220,
    closebracket: 221,
    singlequote: 222,
};

const clearArray = (array) => {
    while (array.length)
        array.pop();
};




if (docs.keyListenerStatus === false)
    docs.keydownInit();
const checkBindings = (currentMode) => {
    console.log(currentMode);
    const keyArray = docs.keyArray;
    console.log(keyArray, 'keyArray');
    console.log(keyArray.includes('Escape'), 'Escape');
    if (keyArray.includes('Escape')) {
        if (currentMode === 'normal') {
            console.log("Already in normal mode");
            clearArray(keyArray);
            return;
        }
        console.log('going to normal');
        mode.mode = 'normal';
        clearArray(keyArray);
    }
    if (currentMode === 'insert') {
    }
    if (currentMode === 'normal') {
        if (keyArray.includes('i')) {
            console.log('Going to insert');
            mode.mode = 'insert';
            clearArray(keyArray);
        }
    }
    if (currentMode === 'visual') {
    }
};

{};
