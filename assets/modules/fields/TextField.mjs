import { Field } from "./Field.mjs";

export class TextField extends Field {
    constructor(params) {
        super(params);
    }

    

    renderInput() {
        return `<input${this.value ? ` value="${this.value}"` : ''} type="text" id="${this.id}" name="${this.name}" class="field-input text-field" ${this.renderAttributes()}>`;
    }
}