import { Field } from "./Field.mjs";

export class EmailField extends Field {
    constructor(params) {
        super(params);
    }

    

    renderInput() {
        return `<input type="email" id="${this.id}" name="${this.name}" class="field-input email-field" ${this.renderAttributes()}>`;
    }
}