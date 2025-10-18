import { IncludeLowerCaseFieldValidator } from "../validators/IncludeLowerCaseFieldValidator.mjs";
import { IncludeNumbersFieldValidator } from "../validators/IncludeNumbersFieldValidator.mjs";
import { IncludeSymbolsFieldValidator } from "../validators/IncludeSymbolsFieldValidator.mjs";
import { IncludeUpperCaseFieldValidator } from "../validators/IncludeUpperCaseFieldValidator.mjs";
import { MinLengthFieldValidator } from "../validators/MinLengthFieldValidator.mjs";
import { Field } from "./Field.mjs";

export class PasswordField extends Field {
    /**
     * @param {Number} params.includeNumbers Number of numeric characters to include (0 means none required)
     * @param {Number} params.includeSymbols Number of symbol characters to include (0 means none required)
     * @param {Number} params.includeUppercase Number of uppercase characters to include (0 means none required)
     * @param {Number} params.includeLowercase Number of lowercase characters to include (0 means none required)
     * @param {Array<String>} params.symbols Array of characters that are considered symbols
     * @param {Number} params.min Minimum length of the password
     */
    constructor({
        includeNumbers = 1,
        includeSymbols = 1,
        includeUppercase = 1,
        includeLowercase = 1,
        symbols = '!@#$%^&*()_+{}:"<>?|[];\',./`~-=\\'.split(''),
        min = 8,
        ...params
    }) {
        super(params);

        this.includeNumbers = includeNumbers;
        this.includeSymbols = includeSymbols;
        this.includeUppercase = includeUppercase;
        this.includeLowercase = includeLowercase;
        this.symbols = symbols;
        this.min = min;
        this.attributes.minLength = min;

        // Add validators
        if (this.includeNumbers > 0) this.validators.push(new IncludeNumbersFieldValidator(this.includeNumbers, `Password must include at least ${this.includeNumbers} numeric character(s).`));
        if (this.includeSymbols > 0) this.validators.push(new IncludeSymbolsFieldValidator(this.includeSymbols, this.symbols, `Password must include at least ${this.includeSymbols} symbol character(s): ${this.symbols.join('')}`));
        if (this.includeUppercase > 0) this.validators.push(new IncludeUpperCaseFieldValidator(this.includeUppercase, `Password must include at least ${this.includeUppercase} uppercase character(s).`));
        if (this.includeLowercase > 0) this.validators.push(new IncludeLowerCaseFieldValidator(this.includeLowercase, `Password must include at least ${this.includeLowercase} lowercase character(s).`));
    }



    renderInput() {
        return `<input type="password" id="${this.id}" name="${this.name}" class="field-input password-field" ${this.renderAttributes()}>`;
    }
}