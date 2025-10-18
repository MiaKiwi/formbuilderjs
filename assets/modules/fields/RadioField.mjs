import { Option } from "../options/Option.mjs";
import { Field } from "./Field.mjs";

export class RadioField extends Field {
    /**
     * @param {Array<Option>} params.options The options for the radio field
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
        let optionsHTML = this.options.map((option, index) => {
            let optionId = `${this.id}-option-${index}`;
            return `<div class="radio-option">
                <input type="radio" id="${optionId}" name="${this.name}" class="field-input radio-field" value="${option.value}" ${this.renderAttributes()}>
                <label for="${optionId}">${option.label}</label>
            </div>`;
        }).join('');

        return `<div class="radio-options">
            ${optionsHTML}
        </div>`;
    }



    getInputDOMElement() {
        let inputs = document.querySelectorAll(`input[name="${this.name}"]`);

        // Get the selected radio input
        for (let input of inputs) {
            if (input.checked) {
                return input;
            }
        }
    }



    /**
     * Get all options for the select field, including nested options from groups
     * @returns {Array<Option>} An array of all options
     */
    getOptionsRecursively() {
        return this.options;
    }
}