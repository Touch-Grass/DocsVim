var _a;
export class docs {
    static get docID() {
        return window.location.href
            .split("/document/d/")[1]
            .split("/")[0];
    }
    static get docName() {
        return ((document.querySelector(".docs-title-input-label-inner")
            .textContent ?? "").trim() ?? "");
    }
    static pasteText(text) {
        const el = document.querySelectorAll("docs-texteventtarget-iframe")[0].contentDocument.querySelector("[contenteditable=true]");
        const data = new DataTransfer();
        data.setData("text/plain", text);
        const paste = new ClipboardEvent("paste", {
            clipboardData: data,
            bubbles: true,
            cancelable: true,
        });
        el.dispatchEvent(paste);
    }
    static get getUserCursor() {
        let myCursor = null;
        document.querySelectorAll(".kix-cursor").forEach((El) => {
            const caretColor = El.querySelector(".kix-cursor-caret");
            if (caretColor === null)
                return;
            const caretBorderColor = caretColor.style.borderLeftColor
                .replace(/,/g, "")
                .replace(/\s/g, "")
                .toLowerCase();
            console.log(caretBorderColor);
            const cursorName = (El.querySelector(".kix-cursor-name")?.textContent ?? "").trim();
            if (cursorName.length <= 0)
                myCursor = El;
        });
        if (myCursor !== null)
            return myCursor;
        console.error("Couldn't locate the cursor!");
        return document.querySelector(".kix-cursor");
    }
    static _setCursorWidth(width, isInsertMode) {
        const cursor = this.getUserCursor;
        if (cursor === null)
            return false;
        const caret = cursor.querySelector(".kix-cursor-caret");
        caret.style.borderLeftWidth = width;
        caret.style.borderRightWidth = width;
        caret.style.borderColor = `rgba(${isInsertMode ? 255 : 0}, 0, 0, 1)`;
        return true;
    }
    static _getCursorWidth() {
        const cursor = this.getUserCursor;
        if (cursor === null)
            return "0px";
        const caret = cursor.querySelector(".kix-cursor-caret");
        return `${parseInt(caret.style.borderLeftWidth) + parseInt(caret.style.borderRightWidth)}px`;
    }
    static get getCursorWidth() {
        return docs._getCursorWidth();
    }
    static set setCursorWidth([width, isInsertMode]) {
        docs._setCursorWidth(width, isInsertMode);
    }
    static get textTarget() {
        return document.querySelector(".docs-texteventtarget-iframe").contentDocument.activeElement;
    }
    static keydown() {
        document.addEventListener("keydown", (e) => {
            console.log(`Key down: ${e.key} `);
        });
        return true;
    }
}
_a = docs;
docs.keydownInit = () => {
    if (!_a.keydown)
        return;
    return _a.keydown();
};
