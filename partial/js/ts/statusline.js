import { docs } from './docs';
import { vim } from './vim';
export class statusLine extends docs {
    static async initStatusLine() {
        this._addClass(this._statusLineWrapper, ['vim_statusbar']);
        this._addClass(this._docId, ['vim_statusbar_child']);
        this._addClass(this._docsMode, ['vim_statusbar_child']);
        this._addClass(this._keystrokes, ['vim_statusbar_child']);
        const style = document.createElement('style');
        style.textContent = `
        .vim_statusbar {
            background-color: transparent;
            width: 100%;
            height: 50px;
            bottom: 10px;
            left: 7px;
            position: absolute;
            padding: 0.25rem 0.5rem;

            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            flex-direction: column;

            font-family: monospace;
            font-size: 13px;
            color: grey;
            font-weight: bold;
          }
        `;
        document.body.append(this._statusLineWrapper);
        document.body.append(style);
        this._statusLineWrapper.append(this._keystrokes);
        this._statusLineWrapper.append(this._docsMode);
        this._statusLineWrapper.append(this._docId);
        this.updateStatusbar(vim.mode);
        this.updateKeyArray();
        this._docId.innerHTML = `${this.docID ?? ''}`;
    }
    static updateStatusbar(mode) {
        this._docsMode.innerHTML = mode
            ? `-- ${mode.toUpperCase()} --`
            : '-- NORMAL --';
    }
    static updateKeyArray() {
        const betterKeyArray = this.keyArray
            .map(key => {
            if (key === 'Escape')
                return 'Esc';
            if (key === 'Control')
                return 'Ctrl';
            if (key === 'ArrowLeft')
                return '←';
            if (key === 'ArrowRight')
                return '→';
            if (key === 'ArrowUp')
                return '↑';
            if (key === 'ArrowDown')
                return '↓';
            if (key === 'Backspace')
                return '⌫';
            if (key === 'Delete')
                return '⌦';
            if (key === 'Enter')
                return '⏎';
            if (key === 'Tab')
                return '⇥';
            if (key === 'Shift')
                return '⇧';
            if (key === 'Alt')
                return '⌥';
            if (key === 'Meta')
                return '⌘';
            if (key === 'CapsLock')
                return '⇪';
            if (key === 'PageUp')
                return '⇞';
            if (key === 'PageDown')
                return '⇟';
            if (key === 'Home')
                return '↖';
            if (key === 'End')
                return '↘';
            if (key === 'Insert')
                return 'Ins';
            if (key === 'ContextMenu')
                return '⌘';
            else
                return key;
        })
            .join('');
        this._keystrokes.innerHTML = `${betterKeyArray ?? ''}`;
    }
    static _addClass(elem, className) {
        elem.classList.add(...className);
    }
    static _waitForElement(selector) {
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
}
statusLine._statusLineWrapper = document.createElement('div');
statusLine._docId = document.createElement('div');
statusLine._docsMode = document.createElement('div');
statusLine._keystrokes = document.createElement('div');
