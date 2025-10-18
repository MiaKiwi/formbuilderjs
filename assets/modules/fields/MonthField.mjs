import { Field } from "./Field.mjs";

export class MonthField extends Field {
    constructor(params) {
        super(params);

        this.valueType = Date;
    }

    

    renderInput() {
        return `<input type="month" id="${this.id}" name="${this.name}" class="field-input month-field" ${this.renderAttributes()}>`;
    }
}