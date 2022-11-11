import { checkBindings } from './shortcuts/shortcuts';
import { vim } from './vim';

export class docs {
  private static _listOfCommands: (string | number)[] = [];
  private static _fireRate = 100;
  private static _hasEventListnerBeenAdded = false;

  static get keyListenerStatus(): boolean {
    return docs._hasEventListnerBeenAdded;
  }

  private static _debounce(func: any, timeout = docs._fireRate) {
    let timer: NodeJS.Timeout;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  /**
   * @returns {string} The documents ID
   */
  static get docID(): string {
    return window.location.href.split('/document/d/')[1].split('/')[0];
  }

  /**
   * @returns {string} - The document title
   */
  static get docName(): string {
    return (
      (
        (document.querySelector('.docs-title-input-label-inner') as HTMLElement)
          .textContent ?? ''
      ).trim() ?? ''
    );
  }

  /**
   * @param {string} text - Text that will be pasted into the document.
   */
  private static _pasteText(text: string): void {
    /** Element to paste text into */
    const el = (
      (
        document.querySelectorAll(
          'docs-texteventtarget-iframe'
        )[0] as HTMLIFrameElement
      ).contentDocument as Document
    ).querySelector('[contenteditable=true]') as HTMLElement;
    const data = new DataTransfer();
    data.setData('text/plain', text);
    const paste = new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
      cancelable: true,
    });
    el.dispatchEvent(paste);
  }

  /**
   * @returns {Element | null} - The users cursor element. If it can't find one it returns null.
   */
  static get getUserCursor(): Element | null {
    let myCursor: Element | null = null;

    document.querySelectorAll('.kix-cursor').forEach((El) => {
      const caretColor = El.querySelector(
        '.kix-cursor-caret'
      ) as HTMLElement | null;

      if (caretColor === null) return;

      const caretBorderColor = caretColor.style.borderLeftColor
        .replace(/,/g, '')
        .replace(/\s/g, '')
        .toLowerCase();

      const cursorName = (
        El.querySelector('.kix-cursor-name')?.textContent ?? ''
      ).trim();

      if (cursorName.length <= 0) myCursor = El;
    });

    if (myCursor !== null) return myCursor;

    return document.querySelector('.kix-cursor');
  }

  /**
   * Sets the cursors width.
   * @param width {string} - The width of the cursor.
   * @param isInsertMode If the cursor is in insert mode or not.
   */
  private static _setCursorWidth(width: string, isInsertMode?: boolean) {
    const cursor = this.getUserCursor;

    if (cursor === null) return false;
    const caret = cursor.querySelector('.kix-cursor-caret') as HTMLElement;
    caret.style.borderLeftWidth = width;
    caret.style.borderRightWidth = width;
    caret.style.borderColor = `rgba(${isInsertMode ? 0 : 255}, 0, 0, 1)`;
    return true;
  }

  /**
   * Gets the cursor width
   * @returns the width of the cursor in PX
   */
  private static _getCursorWidth(): string {
    const cursor = this.getUserCursor;
    if (cursor === null) return '0px';
    const caret = cursor.querySelector('.kix-cursor-caret') as HTMLElement;
    return `${parseInt(caret.style.borderLeftWidth) +
      parseInt(caret.style.borderRightWidth)
      }px`;
  }

  /**
   * Gets the cursor width
   */
  static get getCursorWidth(): string {
    return docs._getCursorWidth();
  }

  /**
   * Sets the cursors width
   * @param {[string, boolean]} - The width of the cursor (in px) and if it's in insert mode or not.
   */
  //skipcq JS-0041
  static set setCursorWidth([width, isInsertMode]: [string, boolean]) {
    docs._setCursorWidth(width, isInsertMode);
  }

  // https://stackoverflow.com/questions/27291021/google-docs-simulate-keyboard/63595176#63595176
  /**
   * Gets the iframe that google docs uses to detects keypresses.
   */
  static get textTarget(): HTMLElement {
    return (
      (
        document.querySelector(
          '.docs-texteventtarget-iframe'
        ) as HTMLIFrameElement
      ).contentDocument as Document
    ).activeElement as HTMLElement;
  }

  /**
   * Converts and EventListner key (string | number) to an array
   * @param {string | number} key - The key that will be added to the array
   * @returns {(string | number)[]} - An array with all prior keys including the current one.
   */
  private static _keyToArray(key: string | number): (string | number)[] {
    this._listOfCommands.push(key);
    checkBindings(vim.Mode);
    return this._listOfCommands;
  }

  /**
   * @returns {(string | number)[]} - An array all the keys that have been pressed.
   */
  static get keyArray(): (string | number)[] {
    return this._listOfCommands;
  }

  /**
   * Gets the users input
   */
  private static _keydown(): boolean {
    docs.textTarget.addEventListener('keydown', (e) => {
      this._keyToArray(e.key);
      return;
    });
    this._hasEventListnerBeenAdded = true;
    return true;
  }

  /**
   * Helper function to initialize the keydown event listener.
   */
  public static keydownInit = (): boolean | undefined => {
    return docs._hasEventListnerBeenAdded === false
      ? this._keydown()
      : undefined;
  };
}
