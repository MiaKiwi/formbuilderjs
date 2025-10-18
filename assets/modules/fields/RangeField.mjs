import { Field } from "./Field.mjs";

export class RangeField extends Field {
    constructor(params) {
        super(params);

        this.valueType = Number;
    }



    renderInput() {
        return `<input type="range" id="${this.id}" name="${this.name}" class="field-input range-field" ${this.renderAttributes()}>`;
    }
}