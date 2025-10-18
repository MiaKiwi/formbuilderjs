import { Option } from "../options/Option.mjs";
import { OptionsGroup } from "../options/OptionsGroup.mjs";
import { Field } from "./Field.mjs";

export class SelectField extends Field {
    /**
     * @param {Array<Option|OptionsGroup>} params.options The options for the select field
     */
    constructor({
        options = [],
        ...params
    }) {
        super(params);

        this.options = options;

        this.valueType = Option;
    }



    renderInput() {
        let optionsHTML = this.options.map(option => {
            return option.render();
        }).join('');

        return `<select id="${this.id}" name="${this.name}" class="field-input select-field" ${this.renderAttributes()}>
            ${optionsHTML}
        </select>`;
    }



    /**
     * Get all options for the select field, including nested options from groups
     * @returns {Array<Option>} An array of all options
     */
    getOptionsRecursively() {
        let allOptions = [];

        for (let option of this.options) {
            if (option instanceof OptionsGroup) {
                allOptions.push(...option.options);
            } else {
                allOptions.push(option);
            }
        }

        return allOptions;
    }
}