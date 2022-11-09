import { mode } from "./mode/mode";
export class vim extends mode {
    constructor() {
        super();
    }
}
vim.mode = "insert";
vim.number = 1;
export const vi = new vim();
vi.switchToMode("normal");
