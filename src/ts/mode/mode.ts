import { vim } from "../vim";

export default class mode {
    constructor () { }

    protected switchToInsertMode(): void {
        vim.mode = 'visual';
        vim.number = 1;
        docs.setCursorWidth('9px');
    }

    protected switchToNormalMode(): void {
        vim.mode = 'visual';
        vim.number = 1;
        docs.setCursorWidth('9px');
    }

    protected switchToVisualMode(): void {
        vim.mode = 'insert';
        vim.number = 1;
        docs.setCursorWidth('2px', true);
    }
}