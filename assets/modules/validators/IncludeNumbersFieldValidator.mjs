import { FieldValidator } from "./FieldValidator.mjs";

export class IncludeNumbersFieldValidator extends FieldValidator {
    constructor(numberOfNumbers = 1, message = "This field must include numbers.") {
        let script = (field) => {
            let value = field.readValue() || "";

            let match = value.match(/\d/g);

            return match !== null && match.length >= this.numberOfNumbers;
        };
        
        super(script, message);

        this.numberOfNumbers = numberOfNumbers;
    }
}