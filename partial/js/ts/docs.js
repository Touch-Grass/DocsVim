var _a;
export class docs {
    constructor() { }
    name() {
        return ((document.querySelector('.docs-title-input-label-inner')
            .textContent ?? '').trim() ?? '');
    }
    pasteText(text) {
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
    getUserCursor() {
        let myCursor = null;
        document.querySelectorAll('.kix-cursor').forEach(El => {
            const caretColor = El.querySelector('.kix-cursor-caret');
            caretColor?.style.borderLeftColor
                .replace(/,/g, '')
                .replace(/\s/g, '')
                .toLowerCase();
            const cursor_name = (El.querySelector('.kix-cursor-name')
                ?.textContent ?? '').trim();
            if (cursor_name.length <= 0)
                myCursor = El;
        });
        if (myCursor !== null)
            return myCursor;
        console.error("Couldn't locate the cursor!");
        return document.querySelector('.kix-cursor');
    }
    setCursorWidth(width, isInsertMode) {
        const cursor = this.getUserCursor();
        if (cursor === null)
            return;
        const caret = cursor.querySelector('.kix-cursor-caret');
        caret.style.borderLeftWidth = width;
        caret.style.borderRightWidth = width;
        caret.style.borderColor = 'rgba(${isInsertMode ?? 255 : 0},0,0,1)';
    }
    static keydown() {
        document.addEventListener('keydown', e => {
            console.log(`Key down: ${e.key}`);
        });
        return true;
    }
}
_a = docs;
docs.id = window.location.href
    .split('/document/d/')[1]
    .split('/')[0];
docs.texttarget = document.querySelector('.docs-texteventtarget-iframe').contentDocument.activeElement;
docs.keydownInit = e => {
    if (!_a.keydown)
        return;
    return _a.keydown();
};
;
