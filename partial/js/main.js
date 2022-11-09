"use strict";
const docs = {
    id: window.location.href.split('/document/d/')[1].split('/')[0],
    name() {
        var _a;
        return (_a = document.querySelector('.docs-title-input-label-inner').textContent) === null || _a === void 0 ? void 0 : _a.trim();
    },
};
docs.pasteText = function (text) {
    const el = document.querySelectorAll('docs-texteventtarget-iframe')[0].contentDocument.querySelector('[contenteditable=true]');
    const data = new DataTransfer();
    data.setData('text/plain', text);
    const paste = new ClipboardEvent('paste', {
        clipboardData: data,
        bubbles: true,
        cancelable: true,
    });
    el.dispatchEvent(paste);
};
console.log(docs.name());
