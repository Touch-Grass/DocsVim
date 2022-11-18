import { docs } from './docs';
import { vim } from './vim';
export class statusLine extends docs {
    static async initStatusLine() {
        this._addClass(this._statusLine, 'vim_statusbar');
        this._addClass(this._docId, 'vim_statusbar');
        this._addClass(this._docName, 'vim_statusbar');
        this._addClass(this._docId, 'vim_docId');
        this._addClass(this._docName, 'vim_docName');
        const style = document.createElement('style');
        style.textContent = `
        .vim_statusbar {
            background-color: transparent;
            width: 100%;
            height: 50px;
            position: absolute;
            bottom: 10px;
            left: 7px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            font-size: 13px;
            color: black;
            font-weight: bold;
          }
          .vim_docId {
            font-size: 11px;
            bottom: 25px;
            right: 7px;
          }
        `;
        document.body.append(this._statusLine);
        document.body.append(this._docId);
        document.body.append(style);
        this.updateStatusbar(vim.mode);
        this._docId.innerHTML = `${this.docID ?? this.docName ?? ''}`;
    }
    static updateStatusbar(mode) {
        this._statusLine.innerHTML = `-- ${mode} --`;
    }
    static _addClass(elem, className) {
        elem.classList.add(className);
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
statusLine._statusLine = document.createElement('div');
statusLine._docId = document.createElement('div');
statusLine._docName = document.createElement('div');
