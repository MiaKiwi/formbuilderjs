import { FieldValidator } from "./FieldValidator.mjs";

export class IncludeLowerCaseFieldValidator extends FieldValidator {
    constructor(numberOfLowerCase = 1, message = "This field must include lowercase letters.") {
        let script = (field) => {
            let value = field.readValue() || "";

            let match = value.match(/[a-z]/g);

            return match !== null && match.length >= this.numberOfLowerCase;
        };
        
        super(script, message);

        this.numberOfLowerCase = numberOfLowerCase;
    }
}