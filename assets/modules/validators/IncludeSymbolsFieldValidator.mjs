import { FieldValidator } from "./FieldValidator.mjs";

export class IncludeSymbolsFieldValidator extends FieldValidator {
    constructor(numberOfSymbols = 1, symbols = '!@#$%^&*()_+{}:"<>?|[];\',./`~-=\\'.split(''), message = "This field must include symbols.") {
        let script = (field) => {
            let value = field.readValue() || "";

            let match = value.split('').filter(char => symbols.includes(char));

            return match !== null && match.length >= this.numberOfSymbols;
        };
        
        super(script, message);

        this.numberOfSymbols = numberOfSymbols;
        this.symbols = symbols;
    }
}