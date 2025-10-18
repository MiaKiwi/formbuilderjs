import { Field } from "./Field.mjs";

export class SearchField extends Field {
    constructor(params) {
        super(params);
    }



    renderInput() {
        return `<input${this.value ? ` value="${this.value}"` : ''} type="search" id="${this.id}" name="${this.name}" class="field-input search-field" ${this.renderAttributes()}>`;
    }
}