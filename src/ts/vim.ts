import { mode } from "./mode/mode";

export class vim extends mode {
    constructor () {
        super();
    }
    static mode = "insert";
    static number = 1;
}
