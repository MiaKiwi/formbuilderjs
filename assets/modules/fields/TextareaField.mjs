import { Field } from "./Field.mjs";

export class TextareaField extends Field {
    constructor(params) {
        super(params);
    }



    renderInput() {
        return `<textarea id="${this.id}" name="${this.name}" class="field-input text-field" ${this.renderAttributes()}>${this.value || ''}</textarea>`;
    }
}