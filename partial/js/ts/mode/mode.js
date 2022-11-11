import { docs } from '../docs';
import { vim } from '../vim';
export class mode extends docs {
    static _switchToMode(mode) {
        vim.number = 1;
        console.log(mode + " mode123");
        switch (mode) {
            case "insert":
                if (mode === "insert")
                    return;
                console.log("Setting mode to insert");
                vim.mode = "insert";
                this.setCursorWidth = ["9px", true];
                break;
            case "normal":
                if (mode === "normal")
                    return;
                console.log("Setting the mode to normal");
                vim.mode = "normal";
                this.setCursorWidth = ["9px", false];
                break;
            case "visual":
                if (mode === "visual")
                    return;
                console.log("Setting the mode to visual");
                vim.mode = "visual";
                this.setCursorWidth = ["", false];
                break;
            default:
                break;
        }
    }
    static get mode() {
        return vim.mode;
    }
    static set mode(mode) {
        this._switchToMode(mode);
    }
}
