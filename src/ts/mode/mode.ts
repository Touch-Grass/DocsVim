import { docs } from "../docs";
import { vim } from "../vim";

export class mode extends docs {
  /**
   * Switches the mode to the given mode.
   * @param mode {string} - The mode to set the editor to.
   */
  private static _switchToMode(mode: "insert" | "normal" | "visual"): void {
    vim.number = 1;
    console.log(mode + " mode123");

    switch (mode) {
      case "insert":
        this.setCursorWidth = ["9px", true];
        vim.mode = "insert";
        break;
      case "normal":
        vim.mode = "normal";
        this.setCursorWidth = ["9px", false];
        break;
      case "visual":
        vim.mode = "visual";
        this.setCursorWidth = ["", false];
        break;

      default:
        break;
    }
    switch (mode) {
      case "insert":
        this.setCursorWidth = ["9px", true];
        vim.mode = "insert";
        break;
      case "normal":
        vim.mode = "normal";
        this.setCursorWidth = ["9px", false];
        break;
      case "visual":
        vim.mode = "visual";
        this.setCursorWidth = ["", false];
        break;
    }
  }

  /**
   * Returns the mode that vim is in.
   */
  static get mode(): "insert" | "normal" | "visual" {
    return vim.mode;
  }

  /**
   * Sets the mode that vim is in.
   */
  static set mode(mode: "insert" | "normal" | "visual") {
    this._switchToMode(mode);
  }
}
