import { keys } from "./keymap";
import { vim } from "../vim";
import { docs } from "../docs";

docs.textTarget.addEventListener("keydown", (e: KeyboardEvent) => {
  document.addEventListener("keydown", (e) => {
    console.log("key pressed", e.code);
  });
  if (e.key === "73") {
    console.log("i");
    vim.mode = "insert";
  }

  if (e.key === `${keys.esc} `) {
    console.log("esc");
    vim.mode = "normal";
  }
});
