import { docs } from './docs';
import { vim } from './vim';

/**
 * This class handles the statusbar and updating it.
 */
export class statusLine extends docs {
  private static readonly _statusLineWrapper = document.createElement('div');
  private static readonly _docId = document.createElement('div');
  private static readonly _docsMode = document.createElement('div');
  private static readonly _keystrokes = document.createElement('div');

  /**
   * Initializes the statusline, and adds it to the DOM.
   */
  public static async initStatusLine(): Promise<void> {
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

  /**
   * Updates the statusline with the current mode.
   * @param {string} mode Mode that the statusline will display
   */
  public static updateStatusbar(mode: string): void {
    this._docsMode.innerHTML = mode
      ? `-- ${mode.toUpperCase()} --`
      : '-- NORMAL --';
  }

  public static updateKeyArray(): void {
    const betterKeyArray = this.keyArray
      .map(key => {
        if (key === 'Escape') return 'Esc';
        if (key === 'Control') return 'Ctrl';
        if (key === 'ArrowLeft') return '←';
        if (key === 'ArrowRight') return '→';
        if (key === 'ArrowUp') return '↑';
        if (key === 'ArrowDown') return '↓';
        if (key === 'Backspace') return '⌫';
        if (key === 'Delete') return '⌦';
        if (key === 'Enter') return '⏎';
        if (key === 'Tab') return '⇥';
        if (key === 'Shift') return '⇧';
        if (key === 'Alt') return '⌥';
        if (key === 'Meta') return '⌘';
        if (key === 'CapsLock') return '⇪';
        if (key === 'PageUp') return '⇞';
        if (key === 'PageDown') return '⇟';
        if (key === 'Home') return '↖';
        if (key === 'End') return '↘';
        if (key === 'Insert') return 'Ins';
        if (key === 'ContextMenu') return '⌘';
        else return key;
      })
      .join('');
    this._keystrokes.innerHTML = `${betterKeyArray ?? ''}`;
  }

  /**
   * Adds a class to an element.
   */
  private static _addClass(elem: HTMLElement, className: string[]): void {
    elem.classList.add(...className);
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
