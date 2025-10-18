import { Field } from "./Field.mjs";

export class URLField extends Field {
    constructor(params) {
        super(params);
    }

    

    renderInput() {
        return `<input type="url" id="${this.id}" name="${this.name}" class="field-input url-field" ${this.renderAttributes()}>`;
    }
}