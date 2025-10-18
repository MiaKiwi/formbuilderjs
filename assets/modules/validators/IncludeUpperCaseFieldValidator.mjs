import { FieldValidator } from "./FieldValidator.mjs";

export class IncludeUpperCaseFieldValidator extends FieldValidator {
    constructor(numberOfUpperCase = 1, message = "This field must include uppercase letters.") {
        let script = (field) => {
            let value = field.readValue() || "";

            let match = value.match(/[A-Z]/g);

            return match !== null && match.length >= this.numberOfUpperCase;
        };
        
        super(script, message);

        this.numberOfUpperCase = numberOfUpperCase;
    }
}