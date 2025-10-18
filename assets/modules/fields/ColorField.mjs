import { Field } from "./Field.mjs";

export class ColorField extends Field {
    constructor(params) {
        super(params);
    }

    

    renderInput() {
        return `<input type="color" id="${this.id}" name="${this.name}" class="field-input color-field" ${this.renderAttributes()}>`;
    }
}