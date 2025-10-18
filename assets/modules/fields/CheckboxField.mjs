import { Field } from "./Field.mjs";

export class CheckboxField extends Field {
    constructor(params) {
        super(params);

        this.valueType = Boolean;
        this.valueAttribute = 'checked';
    }



    renderInput() {
        return `<input type="checkbox" id="${this.id}" name="${this.name}" class="field-input checkbox-field" ${this.renderAttributes()}>`;
    }
}