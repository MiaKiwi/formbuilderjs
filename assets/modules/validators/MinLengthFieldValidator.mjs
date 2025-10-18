import { FieldValidator } from "./FieldValidator.mjs";

export class MinLengthFieldValidator extends FieldValidator {
    constructor(minLength = 8, message = "This field must be at least 8 characters long.") {
        let script = (field) => {
            let value = field.readValue() || "";
            return value.length >= minLength;
        };

        super(script, message);

        this.minLength = minLength;
    }
}