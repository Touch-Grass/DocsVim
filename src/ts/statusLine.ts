import { docs } from './docs';
import { vim } from './vim';

/**
 * This class handles the statusbar and updating it.
 */
export class statusLine extends docs {
  private static readonly _statusLine = document.createElement('div');
  private static readonly _docId = document.createElement('div');
  private static readonly _docName = document.createElement('div');

  /**
   * Initializes the statusline, and adds it to the DOM.
   */
  public static async initStatusLine(): Promise<void> {
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

  /**
   * Updates the statusline with the current mode.
   * @param mode Mode that the statusline will display
   */
  public static updateStatusbar(mode: string): void {
    this._statusLine.innerHTML = `-- ${mode} --`;
  }

  private static _addClass(elem: HTMLElement, className: string): void {
    elem.classList.add(className);
  }

  /**
   * https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
   * @param selector - The selector of the element that you want to select.
   * @returns { Promise<HTMLElement> } - The element you selected once it's loaded.
   */
  private static _waitForElement(selector: string): Promise<HTMLElement> {
    return new Promise(resolve => {
      if (document.querySelector(selector))
        return resolve(document.querySelector(selector) as HTMLElement);

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector) as HTMLElement);
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
