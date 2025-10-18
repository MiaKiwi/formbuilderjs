import { Field } from "./Field.mjs";

export class WeekField extends Field {
    constructor(params) {
        super(params);
    }

    

    renderInput() {
        return `<input type="week" id="${this.id}" name="${this.name}" class="field-input week-field" ${this.renderAttributes()}>`;
    }
}