"use strict";
const docs = {
    id: window.location.href.split('/document/d/')[1].split('/')[0],
    /**
     * @returns {string} - The document title
     */
    name() {
        var _a, _b;
        return ((_b = (_a = document.querySelector('.docs-title-input-label-inner').textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '');
    },
    /**
     * Pastes the given text into the document.
     * @param {string} text - Text that will be pasted into the document.
     */
    pasteText(text) {
        /** Element to paste text into */
        const el = document.querySelectorAll('docs-texteventtarget-iframe')[0].contentDocument.querySelector('[contenteditable=true]');
        const data = new DataTransfer();
        data.setData('text/plain', text);
        const paste = new ClipboardEvent('paste', {
            clipboardData: data,
            bubbles: true,
            cancelable: true,
        });
        el.dispatchEvent(paste);
    },
};
console.log(docs.name());
