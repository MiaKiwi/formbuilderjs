import { Field } from "./Field.mjs";

export class HiddenField extends Field {
    constructor(params) {
        super(params);
    }



    renderInput() {
        return `<input${this.value ? ` value="${this.value}"` : ''} type="hidden" id="${this.id}" name="${this.name}" class="field-input hidden-field" ${this.renderAttributes()}>`;
    }
}