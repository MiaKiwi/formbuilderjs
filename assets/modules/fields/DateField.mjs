import { Field } from "./Field.mjs";

export class DateField extends Field {
    constructor(params) {
        super(params);

        this.valueType = Date;
    }



    renderInput() {
        return `<input type="date" id="${this.id}" name="${this.name}" class="field-input date-field" ${this.renderAttributes()}>`;
    }
}