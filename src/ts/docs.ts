import { mode } from './mode/mode';
import { checkBindings } from './shortcuts/shortcuts';
import { vim } from './vim';

/**
 * The main class for google docs. This class is used to add event listeners to the document and do other things related to the actual document.
 */
export class docs {
  private static _listOfCommands: (string | number)[] = [];
  private static _hasEventListnerBeenAdded = false;

  /**
   * @returns If the keyboard event listner has been added, it will return true, else false
   */
  static get keyListenerStatus(): boolean {
    return docs._hasEventListnerBeenAdded;
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
      cancelable: true
    });
    el.dispatchEvent(paste);
  }

  /**
   * @returns {Element | null} - The users cursor element. If it can't find one it returns null.
   */
  static get getUserCursor(): Element | null {
    let myCursor: Element | null = null;

    document.querySelectorAll('.kix-cursor').forEach(El => {
      //skipcq JS-0349
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
    caret.style.borderWidth = '15px';
    // caret.style.borderRightWidth = width;
    caret.style.borderColor = `rgba(${isInsertMode ? 0 : 255}, 0, 0, 0.5)`;
    // caret.style.backgroundBlendMode = 'difference';
    caret.style.mixBlendMode = 'difference';
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
    return `${
      parseInt(caret.style.borderLeftWidth) +
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
   * @param {KeyboardEvent} keyboardEvent - The key that will be added to the array
   * @returns {(string | number)[]} - An array with all prior keys including the current one.
   */
  private static _keyToArray(
    keyboardEvent: KeyboardEvent
  ): (string | number)[] {
    // If the mode is not normal then we don't want the keys that you press to be added to the doc.
    if (vim.Mode === 'normal') {
      keyboardEvent.preventDefault();
      keyboardEvent.stopImmediatePropagation();
    }
    this._listOfCommands.push(keyboardEvent.key);
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
    docs.textTarget.addEventListener('keydown', e => {
      this._keyToArray(e);
      return;
    });
    this._hasEventListnerBeenAdded = true;
    return true;
  }

  /**
   * Helper function to initialize the keydown event listener.
   * @returns {boolean} - If the event listener has been added or not.
   */
  public static keydownInit(): boolean {
    return docs._hasEventListnerBeenAdded === false ? this._keydown() : false;
  }

  /**
   * https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
   * @param selector - The selector of the element that you want to select.
   * @returns {Promise<HTMLElement>} - The element you selected once it's loaded.
   */
  private static _waitForElement(selector: string): Promise<HTMLElement> {
    return new Promise(resolve => {
      if (document.querySelector(selector))
        return resolve(document.querySelector(selector) as HTMLElement);

      const observer = new MutationObserver(mutations => {
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

  public static async test(): Promise<void> {
    const barItem = await this._waitForElement(
      '.updating-navigation-item-list'
    );
    const bar = await this._waitForElement('.navigation-widget-content');
    barItem.style.backgroundColor = 'red';
    const statusBar = document.createElement('div');
    statusBar.style.backgroundColor = 'red';
    statusBar.style.width = '100px';
    statusBar.style.height = '100px';
    statusBar.style.position = 'absolute';
    statusBar.style.bottom = '0';
    statusBar.style.left = '0';
    statusBar.style.zIndex = '100000000000000';
    statusBar.style.display = 'flex';
    statusBar.style.justifyContent = 'center';
    statusBar.style.alignItems = 'center';
    statusBar.style.fontSize = '20px';
    statusBar.style.color = 'black';
    statusBar.style.fontWeight = 'bold';
    statusBar.innerHTML = 'HELLO WORLD';
    statusBar.style.marginTop = 'auto';

    bar.append(statusBar);
  }
}
