export class docs {
  constructor () { }
  private static readonly id = window.location.href
    .split('/document/d/')[1]
    .split('/')[0];

  /**
   * @returns {string} - The document title
   */
  protected name(): string {
    return (
      (
        (document.querySelector('.docs-title-input-label-inner') as HTMLElement)
          .textContent ?? ''
      ).trim() ?? ''
    );
  }

  /**
   * Pastes the given text into the document.
   * @param {string} text - Text that will be pasted into the document.
   */
  pasteText(text: string): void {
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

  protected getUserCursor(): Element | null {
    let myCursor: Element | null = null;

    document.querySelectorAll('.kix-cursor').forEach(El => {
      const caretColor = El.querySelector(
        '.kix-cursor-caret'
      ) as HTMLElement | null;
      caretColor?.style.borderLeftColor
        .replace(/,/g, '')
        .replace(/\s/g, '')
        .toLowerCase();

      const cursor_name = (
        (El.querySelector('.kix-cursor-name') as HTMLElement | null)
          ?.textContent ?? ''
      ).trim();

      if (cursor_name.length <= 0) myCursor = El;
    });

    if (myCursor !== null) return myCursor;

    console.error("Couldn't locate the cursor!");
    return document.querySelector('.kix-cursor');
  }

  /**
   * Sets the cursors width.
   * @param width {string} - The width of the cursor.
   * @param isInsertMode If the cursor is in insert mode or not.
   */
  protected setCursorWidth(width: string, isInsertMode?: boolean): void {
    const cursor = this.getUserCursor();

    if (cursor === null) return;
    const caret = cursor.querySelector('.kix-cursor-caret') as HTMLElement;
    caret.style.borderLeftWidth = width;
    caret.style.borderRightWidth = width;
    caret.style.borderColor = 'rgba(${isInsertMode ?? 255 : 0},0,0,1)';
  }

  /**
   * Gets the users input
   */
  // texttarget = $('.docs-texteventtarget-iframe').contents().find('[contenteditable="true"]');
  // static texttarget =
  //   (document.querySelectorAll('.docs-texteventtarget-iframe') as NodeListOf<HTMLIFrameElement>)

  // https://stackoverflow.com/questions/27291021/google-docs-simulate-keyboard/63595176#63595176
  static texttarget = (
    (
      document.querySelector(
        '.docs-texteventtarget-iframe'
      ) as HTMLIFrameElement
    ).contentDocument as Document
  ).activeElement as HTMLElement;

  // Insert the character in the document and trigger the save API call

  /**
   * Gets the users input
   */
  static keydown() {
    document.addEventListener('keydown', e => {
      console.log(`Key down: ${e.key}`);
    });
    return true;
  }

  /**
   * Helper function to initialize the keydown event listener.
   */
  static keydownInit = e => {
    if (!this.keydown) return;

    return this.keydown();
  };
};