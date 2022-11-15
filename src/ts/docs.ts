import { mode } from './mode/mode';
import { checkBindings } from './shortcuts/shortcuts';
import { vim } from './vim';

/**
 * The main class for Google Docs. This class is used to add event listeners to the document and do other things related to the actual document.
 */
export class docs {
  private static _listOfCommands: (string | number)[] = [];
  private static _hasEventListenerBeenAdded = false;

  /**
   * @returns {boolean} If the keyboard event listener has been added, it will return true, else false
   */
  static get keyListenerStatus(): boolean {
    return docs._hasEventListenerBeenAdded;
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
   * Gets the iframe that Google Docs uses to detect key-presses.
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
   * @returns {(string | number)[]} - An array all the keys that have been pressed.
   */
  static get keyArray(): (string | number)[] {
    return this._listOfCommands;
  }

  /**
   * Gets whether the user is in insert mode or not.
   * @returns {boolean} - If the user is in insert mode or not.
   */
  static get isInMotion(): boolean {
    return mode.isInMotion;
  }

  /**
   * Sets whether the user is in insert mode or not.
   * @param {boolean} isInMotion - If the user is in insert mode or not.
   */
  static set isInMotion(isInMotion: boolean) {
    mode.isInMotion = isInMotion;
  }

  /**
   * Simulates a key press
   * @param keyCode {number} - The key code of the key that was pressed. (Has to be keycode for arrowKeys to work.)
   * @param ctrlKey {boolean} - If the ctrl key was pressed.
   * @param shiftKey {boolean} - If the shift key was pressed.
   */
  public static pressKey = (
    keyCode: number,
    ctrlKey?: boolean,
    shiftKey: boolean = mode.mode === 'visual'
  ) => {
    const element = (
      document.getElementsByClassName(
        'docs-texteventtarget-iframe'
      )[0] as HTMLIFrameElement
    ).contentDocument as Document;

    if (element === null) return;

    const data = {
      keyCode: keyCode,
      ctrlKey: ctrlKey ?? false,
      shiftKey: shiftKey ?? false
    };

    const key_event = new KeyboardEvent('keydown', data);

    element.dispatchEvent(key_event);
    return this;
  };

  /**
   * Helper function to initialize the keydown event listener.
   * @returns {boolean} - If the event listener has been added or not.
   */
  public static keydownInit(): boolean {
    return !docs._hasEventListenerBeenAdded ? this._keydown() : false;
  }

  /**
   * Switches the current mode to normal
   */
  public static switchToNormalMode() {
    mode.mode = 'normal';
    this._listOfCommands = [];

    return this;
  }

  /**
   * Switches the current mode to insert
   */
  public static switchToInsertMode() {
    mode.mode = 'insert';
    this._listOfCommands = [];

    return this;
  }

  /**
   * Switches the current mode to visual
   */
  public static switchToVisualMode() {
    mode.mode = 'visual';
    this._listOfCommands = [];

    return this;
  }


  /**
   * Sets the cursor's width.
   * @param width {string} - The width of the cursor.
   * @param isInsertMode If the cursor is in insert mode or not.
   */
  private static _setCursorWidth(width: string, isInsertMode?: boolean) {
    const cursor = this.getUserCursor;

    if (cursor === null) return false;
    const caret = cursor.querySelector('.kix-cursor-caret') as HTMLElement;
    caret.style.borderWidth = width;
    caret.style.borderColor = `rgba(
      ${isInsertMode ? 0 : 255}, 0, 0, ${isInsertMode ? 1 : 0.5})`;
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
   * Converts and EventListener key (string | number) to an array
   * @param {KeyboardEvent} keyboardEvent - The key that will be added to the array
   * @returns {(string | number)[]} - An array with all prior keys including the current one.
   */
  private static _keyToArray(
    keyboardEvent: KeyboardEvent
  ): (string | number)[] {
    // If the mode is not normal then we don't want the keys that you press to be added to the doc.
    if (vim.mode === 'normal' || vim.mode === 'visual') {
      keyboardEvent.preventDefault();
      keyboardEvent.stopImmediatePropagation();
    }
    this._listOfCommands.push(keyboardEvent.key);
    checkBindings(vim.mode);
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
    this._hasEventListenerBeenAdded = true;
    return true;
  }

  /**
   * @param {string} text - Text that will be pasted into the document.
   */
  private _pasteText(text: string): void {
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
}
