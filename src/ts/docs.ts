export class docs {
  private static readonly id = window.location.href
    .split("/document/d/")[1]
    .split("/")[0];

  /**
   * @returns {string} - The document title
   */
  get name(): string {
    return (
      (
        (document.querySelector(".docs-title-input-label-inner") as HTMLElement)
          .textContent ?? ""
      ).trim() ?? ""
    );
  }

  /**
   * Pastes the given text into the document.
   * @param {string} text - Text that will be pasted into the document.
   */
  private static pasteText(text: string): void {
    /** Element to paste text into */
    const el = (
      (
        document.querySelectorAll(
          "docs-texteventtarget-iframe"
        )[0] as HTMLIFrameElement
      ).contentDocument as Document
    ).querySelector("[contenteditable=true]") as HTMLElement;
    const data = new DataTransfer();
    data.setData("text/plain", text);
    const paste = new ClipboardEvent("paste", {
      clipboardData: data,
      bubbles: true,
      cancelable: true,
    });
    el.dispatchEvent(paste);
  }

  /**
   * @returns {Element | null} - The users cursor element. If it can't find one it returns null.
   */
  private static _getUserCursor(): Element | null {
    let myCursor: Element | null = null;

    document.querySelectorAll(".kix-cursor").forEach((El) => {
      const caretColor = El.querySelector(
        ".kix-cursor-caret"
      ) as HTMLElement | null;

      if (caretColor === null) return;

      const caretBorderColor = caretColor.style.borderLeftColor
        .replace(/,/g, "")
        .replace(/\s/g, "")
        .toLowerCase();

      console.log(caretBorderColor);

      const cursorName = (
        El.querySelector(".kix-cursor-name")?.textContent ?? ""
      ).trim();

      if (cursorName.length <= 0) myCursor = El;
    });

    if (myCursor !== null) return myCursor;

    console.error("Couldn't locate the cursor!");
    return document.querySelector(".kix-cursor");
  }

  get getUserCursor(): Element | null {
    return docs._getUserCursor();
  }

  /**
   * Sets the cursors width.
   * @param width {string} - The width of the cursor.
   * @param isInsertMode If the cursor is in insert mode or not.
   */
  private static _setCursorWidth(width: string, isInsertMode?: boolean) {
    const cursor = this._getUserCursor();

    if (cursor === null) return false;
    const caret = cursor.querySelector(".kix-cursor-caret") as HTMLElement;
    caret.style.borderLeftWidth = width;
    caret.style.borderRightWidth = width;
    caret.style.borderColor = `rgba(${isInsertMode ? 255 : 0}, 0, 0, 1)`;
    return true;
  }

  private static _getCursorWidth(): string {
    const cursor = this._getUserCursor();
    if (cursor === null) return "0px";
    const caret = cursor.querySelector(".kix-cursor-caret") as HTMLElement;
    return caret.style.borderLeftWidth + caret.style.borderRightWidth;
  }

  static get getCursorWidth(): string {
    return docs._getCursorWidth();
  }

  static set setCursorWidth([width, isInsertMode]: [string, boolean]) {
    docs._setCursorWidth(width, isInsertMode)
  }

  // https://stackoverflow.com/questions/27291021/google-docs-simulate-keyboard/63595176#63595176
  /**
   * Gets the iframe that google docs uses to detects keypresses.
   */
  static get textTarget(): HTMLElement {
    return (
      (
        document.querySelector(
          ".docs-texteventtarget-iframe"
        ) as HTMLIFrameElement
      ).contentDocument as Document
    ).activeElement as HTMLElement;
  }

  /**
   * Gets the users input
   */
  private static keydown(): boolean {
    document.addEventListener('keydown', e => {
      console.log(`Key down: ${e.key} `);
    });
    return true;
  }

  /**
   * Helper function to initialize the keydown event listener.
   */
  private static keydownInit = (): boolean | undefined => {
    if (!this.keydown) return;

    return this.keydown();
  };
}
