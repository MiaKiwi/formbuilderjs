import { Field } from "./Field.mjs";

export class NumberField extends Field {
    constructor(params) {
        super(params);

        this.valueType = Number;
    }

    

    renderInput() {
        return `<input type="number" id="${this.id}" name="${this.name}" class="field-input number-field" ${this.renderAttributes()}>`;
    }
}