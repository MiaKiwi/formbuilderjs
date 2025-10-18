import { Field } from "./Field.mjs";

export class TelephoneField extends Field {
    constructor(params) {
        super(params);
    }

    

    renderInput() {
        return `<input type="tel" id="${this.id}" name="${this.name}" class="field-input telephone-field" ${this.renderAttributes()}>`;
    }
}