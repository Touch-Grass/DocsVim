import { docs } from './docs';
import { vim } from './vim';

export class statusline extends docs {
  /**
   * https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
   * @param selector - The selector of the element that you want to select.
   * @returns { Promise<HTMLElement> } - The element you selected once it's loaded.
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

  private static readonly _statusline = document.createElement('div');

  public static async initStatusLine(): Promise<void> {
    const bar = await this._waitForElement('.navigation-widget-content');
    this._statusline.classList.add('vim_statusbar');
    const style = document.createElement('style');
    style.textContent = `
        .vim_statusbar {
            background-color: transparent;
            width: 100%;
            height: 50px;
            position: absolute;
            bottom: 7px;
            left: 7px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            font-size: 13px;
            color: black;
            font-weight: bold;
        `;
    document.body.append(this._statusline);
    document.body.append(style);
    this.updateStatusbar(vim.mode);
  }

  public static updateStatusbar(mode: string): void {
    this._statusline.innerHTML = `-- ${mode} --`;
  }
}
