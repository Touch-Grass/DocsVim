export class docs {
  constructor () { }
  static readonly id = window.location.href.split('/document/d/')[1].split('/')[0];

  /**
   * @returns {string} - The document title
   */
  protected name(): string {
    return (
      (document.querySelector('.docs-title-input-label-inner') as HTMLElement).textContent ?? '').trim() ?? '';
  };

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
  };

  /**
   * Sets the cursors width.
   * @param width {string} - The width of the cursor.
   * @param isInsertMode If the cursor is in insert mode or not.
   */
  protected setCursorWidth(width: string, isInsertMode?: boolean): void {
    console.log(width, isInsertMode);
    // docs.getUserCursor().find('.kix-cursor-caret').css({
    //   'border-left-width': width,
    //   'border-right-width': width,
    //   'border-color': 'rgba(0,0,0,1)',
    // });
  };

};