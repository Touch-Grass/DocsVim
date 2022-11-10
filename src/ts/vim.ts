import { mode } from "./mode/mode";

export class vim extends mode {
  static mode: "insert" | "visual" | "normal" = "insert";
  static number = 1;
}
