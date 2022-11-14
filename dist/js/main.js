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
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
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

var _a;



class docs {
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
    static get isInMotion() {
        return mode.isInMotion;
    }
    static set isInMotion(isInMotion) {
        mode.isInMotion = isInMotion;
    }
}
_a = docs;
docs._listOfCommands = [];
docs._hasEventListnerBeenAdded = false;
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




class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        statusline.updateStatusbar(mode);
        console.log('switching to mode: ', mode);
        switch (mode) {
            case 'insert':
                vim.mode = 'insert';
                this.setCursorWidth = ['2px', true];
                break;
            case 'normal':
                vim.mode = 'normal';
                this.setCursorWidth = ['15px', false];
                break;
            case 'visual':
                vim.mode = 'visual';
                this.setCursorWidth = ['2px', false];
                break;
            default:
                break;
        }
    }
    static get mode() {
        return vim.mode;
    }
    static set mode(mode) {
        console.log('In the setter', mode);
        this._switchToMode(mode);
    }
    static get isInMotion() {
        return vim.isInMotion;
    }
    static set isInMotion(isInMotion) {
        vim.isInMotion = isInMotion;
    }
    static switchToNormalMode() {
        this.mode = 'normal';
        return this;
    }
    static switchToInsertMode() {
        this.mode = 'insert';
        return this;
    }
    static switchToVisualMode() {
        this.mode = 'visual';
        return this;
    }
}





class statusline extends docs {
    static _waitForElement(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector))
                return resolve(document.querySelector(selector));
            const observer = new MutationObserver(mutations => {
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
    static async initStatusLine() {
        const bar = await this._waitForElement('.navigation-widget-content');
        this._statusline.classList.add('vim_statusbar');
        const style = document.createElement('style');
        style.textContent = `
        .vim_statusbar {
            background-color: transparent;
            width: 100%;
            height: 50px;
            position: absolute;
            bottom: 7px;
            left: 7px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            font-size: 13px;
            color: black;
            font-weight: bold;
        `;
        document.body.append(this._statusline);
        document.body.append(style);
        this.updateStatusbar(vim.mode);
    }
    static updateStatusbar(mode) {
        this._statusline.innerHTML = `-- ${mode} --`;
    }
}
statusline._statusline = document.createElement('div');


class vim extends mode {
    static get mode() {
        return this._mode;
    }
    static set mode(mode) {
        this._mode = mode;
    }
    static get number() {
        return this._number;
    }
    static set number(number) {
        this._number = number;
    }
    static get isInMotion() {
        return this._isInMotion;
    }
    static set isInMotion(isInMotion) {
        this._isInMotion = isInMotion;
    }
}
vim._mode = 'insert';
vim._number = 1;
vim._isInMotion = false;



const functionMap = {
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
        normal: () => docs.pressKey(keys['ArrowRight'])?.switchToInsertMode(),
        visual: () => docs.pressKey(keys['ArrowRight'])?.switchToInsertMode()
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





const motionsCommandMap = {
    diw: () => docs
        .pressKey(keys['ArrowLeft'], true)
        ?.pressKey(keys['ArrowRight'], true, true)
        ?.pressKey(keys['delete'], false, false)
};

const clearArray = (array) => {
    while (array.length)
        array.pop();
};
const fancyLogError = (text) => {
    console.log.apply(console, [`%c${text}`, 'font-weight: bold; color: red']);
};
const fancyLogSuccess = (text) => {
    console.log.apply(console, [
        `%c${text}`,
        'font-weight: bold; color: #bada55',
    ]);
};







if (docs.keyListenerStatus === false)
    docs.keydownInit();
const checkBindings = (currentMode) => {
    const keyArray = docs.keyArray;
    const hasInvalidChar = keyArray.some(key => !keysThatAreUsed.includes(key.toString()));
    const initShortcuts = () => {
        for (const [key, value] of Object.entries(commandMap)) {
            for (const v of Object.entries(value)) {
                if (v[0] === currentMode) {
                    if (keyArray.includes(key) &&
                        (key === 'Escape' ? true : mode.isInMotion === false)) {
                        v[1]();
                        clearArray(keyArray);
                    }
                }
            }
        }
        for (const [key, value] of Object.entries(motionsCommandMap)) {
            if (mode.isInMotion === true) {
                console.log("I'm in motion", key, value);
                if (keyArray.join('').replace(/,/g, '') === key) {
                    console.log('I am in motion and I have a match');
                    value();
                    clearArray(keyArray);
                }
            }
        }
    };
    initShortcuts();
    if (currentMode === 'normal') {
        if (keyArray.includes('d')) {
            if (keyArray.includes('v')) {
                fancyLogSuccess('Starting visual mode');
                mode.mode = 'visual';
            }
            if (hasInvalidChar) {
                fancyLogError('Not a valid key');
                clearArray(keyArray);
                return;
            }
        }
    }
    ;
};

const keysThatAreUsed = [
    'i',
    'I',
    'a',
    'A',
    'o',
    'O',
    'v',
    'V',
    'Escape',
    'h',
    'j',
    'k',
    'l',
    'w',
    'W',
    'e',
    'E',
    'b',
    'B',
    '0',
    '$',
    'gg',
    'G',
    'H',
    'M',
    'L',
    'f',
    'F',
    't',
    'T',
    'r',
    'R',
    'x',
    'X',
    's',
    'S',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Backspace',
    'Space',
    'd',
    'D',
    'c',
    'C',
];



const commandMap = {
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
        normal: () => docs.pressKey(keys['ArrowRight'])?.switchToInsertMode(),
        visual: () => docs.pressKey(keys['ArrowRight'])?.switchToInsertMode()
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
    },
    d: {
        i: {
            w: {
                normal: () => docs.pressKey(keys['delete'], true, true),
                visual: () => docs.pressKey(keys['delete'], true, true)
            }
        },
        a: {
            w: {
                normal: () => docs.pressKey(keys['delete'], true, true),
                visual: () => docs.pressKey(keys['delete'], true, true)
            }
        }
    }
};

{};


statusline.initStatusLine();
