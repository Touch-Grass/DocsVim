export class docs {
    constructor() { }
    name() {
        return (document.querySelector('.docs-title-input-label-inner').textContent ?? '').trim() ?? '';
    }
    ;
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
    ;
    setCursorWidth(width, isInsertMode) {
        console.log(width, isInsertMode);
    }
    ;
}
docs.id = window.location.href.split('/document/d/')[1].split('/')[0];
;
