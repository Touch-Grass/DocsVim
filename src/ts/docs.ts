export const docs = {
  id: window.location.href.split('/document/d/')[1].split('/')[0],

  /**
   * @returns {string} - The document title
   */
  name(): string {
    return (
      (document.querySelector('.docs-title-input-label-inner') as HTMLElement).textContent ?? '').trim() ?? '';
  },

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
  },
};
console.log(docs.name());
