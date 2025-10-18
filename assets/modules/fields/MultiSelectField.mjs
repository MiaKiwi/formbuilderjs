import { Option } from "../options/Option.mjs";
import { OptionsGroup } from "../options/OptionsGroup.mjs";
import { SelectField } from "./SelectField.mjs";

export class MultiSelectField extends SelectField {
    /**
     * @param {Array<Option|OptionsGroup>} params.options The options for the select field
     */
    constructor({
        options = [],
        ...params
    }) {
        super(params);

        this.options = options;

        this.valueType = 'Options[]';
        this.valueAttribute = 'selectedOptions';
    }



    renderInput() {
        let optionsHTML = this.options.map(option => {
            return option.render();
        }).join('');

        return `<select id="${this.id}" name="${this.name}" class="field-input select-field" ${this.renderAttributes()} multiple>
            ${optionsHTML}
        </select>`;
    }
}