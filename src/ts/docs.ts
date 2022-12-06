import { mode } from './mode/mode';
import { checkBindings } from './shortcuts/shortcuts';
import { vim } from './vim';
import { vimModeType } from './types/types.js';
import { keys } from './shortcuts/keymap';

/**
 * The main class for Google Docs. This class is used to add event listeners to the document and do other things related to the actual document.
 */
export class docs {
  private static _listOfCommands: (string | number)[] = [];
  private static _keyListener = false;
  private static _mouseListener = false;

  /**
   * @returns {boolean} If the keyboard event listener has been added, it will return true, else false
   */
  static get keyListenerStatus(): boolean {
    return docs._keyListener;
  }

  /**
   * Adds the keydown event listener to the document.
   * @returns {boolean} If the click event listener has been added, it will return true, else false
   */
  static get clickListenerStatus(): boolean {
    return docs._mouseListener;
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

  /**
   * Gets the docs target for typing into
   * @return {HTMLIFrameElement | Null}
   */
  static get textTarget(): () => Promise<HTMLElement> {
    return async () =>
      (
        (
          (await this._waitForElm(
            '.docs-texteventtarget-iframe'
          )) as HTMLIFrameElement
        ).contentDocument as Document
      ).activeElement as HTMLElement;
    //
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
   * @param {number} keyCode  - The key code of the key that was pressed. (Has to be keycode for arrowKeys to work.)
   * @param {boolean} ctrlKey - If the ctrl key was pressed.
   * @param {boolean} shiftKey - If the shift key was pressed.
   */
  public static pressKey = (
    keyCode: number,
    ctrlKey?: boolean,
    shiftKey: boolean = mode.mode === 'visual' || mode.mode === 'visualLine'
  ) => {
    const element = (
      document.getElementsByClassName(
        'docs-texteventtarget-iframe'
      )[0] as HTMLIFrameElement
    ).contentDocument as Document;

    const data = {
      keyCode: keyCode,
      ctrlKey: ctrlKey ?? false,
      shiftKey: shiftKey ?? false
    };

    const key_event = new KeyboardEvent('keydown', data);

    element.dispatchEvent(key_event);
    this.correctCursor();
    return this;
  };

  /**
   * @param selector - The selector of the element that you want to focus on.
   * @param type type of selection
   * @param clickingMenuItem if you're clicking an item in a menu or not
   * @param addNewLine if you want to add a new line or not
   */
  public static pressHTMLElement(
    selector: string,
    type: 'class' | 'id' | 'tag' = 'id',
    clickingMenuItem: boolean = false,
    addNewLine = false
  ) {
    const elSelector = document.querySelector(
      `[${type}="${selector}"]`
    ) as HTMLElement | null;
    if (!elSelector) return;

    if (!clickingMenuItem)
      elSelector.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    if (clickingMenuItem) {
      elSelector.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      elSelector.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      elSelector.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      elSelector.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      elSelector.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    }

    /**
     * Unused
     */
    if (addNewLine) {
      try {
        navigator.clipboard.readText().then(clipboardText => {
          console.log(`"${clipboardText.trim()}"`);
          navigator.clipboard.writeText(`${clipboardText.trim()}\n`);
        });
      } catch (e) {
        console.error(e);
      }
    }

    return this;
  }

  public static copyText = (clickingMenuItem = true) => {
    console.log('copying text');
    return docs.pressHTMLElement(':77', 'id', clickingMenuItem, false);
  };

  public static pasteText = () => {
    return docs.pressHTMLElement(':78', 'id', true);
  };

  public static selectLine = () => {
    return (
      docs
        // .pressKey(keys['home'], false, true)
        // ?.pressKey(keys['end'], false, true);
        .pressKey(keys['home'])
        ?.pressKey(keys['end'], false, true)
    );
  };

  public static stopSelecting = () => {
    return docs
      .pressKey(keys['arrowRight'], false, false)
      ?.pressKey(keys['ArrowLeft'], false, false);
  };

  /**
   * Helper function to initialize the keydown event listener.
   * @returns {boolean} - If the event listener has been added or not.
   */
  public static keydownInit(): boolean {
    return !docs._keyListener ? this._keydown() : false;
  }

  /**
   * Helper function to initialize the keydown event listener.
   * @returns {boolean} - If the event listener has been added or not.
   */
  public static clickInit(): boolean {
    return !docs._mouseListener ? this._clickEvent() : false;
  }

  /**
   * Switches the current mode to the mode that is passed in.
   */
  public static switchToMode(setMode: vimModeType) {
    mode.mode = setMode;
    this._listOfCommands = [];

    this.correctCursor();
    return this;
  }

  /**
   * Corrects the cursor just incase you went over some colored text.
   */
  public static correctCursor() {
    switch (mode.mode) {
      case 'normal':
        this._setCursorWidth('7px', false);
        break;
      case 'insert':
        this._setCursorWidth('2px', true);
        break;
      case 'visual':
        this._setCursorWidth('2px', true);
        break;
      default:
        break;
    }
  }

  /**
   * Waits for a DOM elem to exist
   * @param {string} selector
   * @return {Promise<HTMLElement>}
   */
  private static _waitForElm(selector: string): Promise<HTMLElement> {
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

  // https://stackoverflow.com/questions/27291021/google-docs-simulate-keyboard/63595176#63595176
  /**
   * Gets the iframe that Google Docs uses to detect key-presses.
   */

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
    const cursorColor = `rgba(${isInsertMode ? 0 : 255}, 0, 0, ${
      isInsertMode ? 1 : 0.5
    })`;
    caret.style.setProperty('border-color', cursorColor, 'important');
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
    if (
      vim.mode === 'normal' ||
      vim.mode === 'visual' ||
      vim.mode === 'visualLine'
    ) {
      keyboardEvent.preventDefault();
      keyboardEvent.stopImmediatePropagation();
    }

    const key = keyboardEvent.key;
    if (key === 'Control' || key === 'Shift' || key === 'Alt')
      return this._listOfCommands;

    this._listOfCommands.push(keyboardEvent.key);
    checkBindings(vim.mode);
    return this._listOfCommands;
  }

  /**
   * Gets the users input
   */
  private static _keydown() {
    docs.textTarget().then(target => {
      target.addEventListener('keydown', e => {
        this._keyToArray(e);
        return;
      });
      this._keyListener = true;
    });
    return true;
  }

  private static _clickEvent() {
    docs.textTarget().then(target => {
      target.addEventListener('click', e => {
        console.log('clicked');
      });
      this._mouseListener = true;
    });
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
