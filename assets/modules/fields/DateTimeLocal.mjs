import { Field } from "./Field.mjs";

export class DateTimeLocalField extends Field {
    constructor(params) {
        super(params);

        this.valueType = Date;
    }

    

    renderInput() {
        return `<input type="datetime-local" id="${this.id}" name="${this.name}" class="field-input datetime-local-field" ${this.renderAttributes()}>`;
    }
}