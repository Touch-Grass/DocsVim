import { docs } from "./docs";
import { vim } from "./vim";
export class statusline extends docs {
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
