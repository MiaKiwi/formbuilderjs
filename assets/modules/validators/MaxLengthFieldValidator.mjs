import { FieldValidator } from "./FieldValidator.mjs";

export class MaxLengthFieldValidator extends FieldValidator {
    constructor(maxLength = 8, message = "This field must be at most 8 characters long.") {
        let script = (field) => {
            let value = field.readValue() || "";
            return value.length <= maxLength;
        };

        super(script, message);

        this.maxLength = maxLength;
    }
}