import { Field } from "./Field.mjs";

export class TimeField extends Field {
    constructor(params) {
        super(params);
    }



    renderInput() {
        return `<input type="time" id="${this.id}" name="${this.name}" class="field-input time-field" ${this.renderAttributes()}>`;
    }
}