export const vim = {
    mode: "insert",
    number: 1,

    /**
     * Switches to normal mode.
     */
    switchToNormalMode(): void {
        vim.mode = 'normal';
        vim.number = 1;
        docs.setCursorWidth('9px');
    },

    /**
     * Switches to visual mode.
     */
    switchToVisualMode(): void {
        vim.mode = 'visual';
        vim.number = 1;
        docs.setCursorWidth('9px');
    },

    /**
     * Switches to insert mode.
     */
    switchToInsertMode(): void {
        vim.mode = 'insert';
        vim.number = 1;
        docs.setCursorWidth('2px', true);
    },
}