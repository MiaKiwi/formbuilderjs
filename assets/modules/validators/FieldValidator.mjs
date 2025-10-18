import { Field } from "../fields/Field.mjs";

export class FieldValidator {
    /**
     * @param {Function} script The validation script function
     * @param {String} message The error message to display if validation fails
     */
    constructor(script, message = 'Invalid value.') {
        this.script = script;
        this.message = message;
    }



    /**
     * Evaluates the field against the validation script.
     * @param {Field} field The field to validate
     * @param {String} message The error message to display if validation fails
     * @returns {Boolean} True if the field is valid, false otherwise
     */
    evaluate(field, message = null) {
        let dom = field.dom();
        let result = this.script(field);

        if (typeof result !== "boolean" || result === false) {
            dom?.setCustomValidity('invalid');

            field.errors.push(message !== null ? message : this.message);

            return false;
        }

        return true;
    }
}