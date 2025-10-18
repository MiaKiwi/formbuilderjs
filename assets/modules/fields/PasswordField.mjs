import { Field } from "./Field.mjs";

export class PasswordField extends Field {
    constructor(params) {
        super(params);
    }

    

    renderInput() {
        return `<input type="password" id="${this.id}" name="${this.name}" class="field-input password-field" ${this.renderAttributes()}>`;
    }
}