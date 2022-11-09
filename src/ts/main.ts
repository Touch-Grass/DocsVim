const docs: Record<string, any> = {
  id: window.location.href.split('/document/d/')[1].split('/')[0],

  name() {
    return (
      document.querySelector('.docs-title-input-label-inner') as HTMLElement
    ).textContent?.trim();
  },
};

docs.pasteText = function (text: string): void {
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
console.log(docs.name());
