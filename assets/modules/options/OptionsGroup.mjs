import { Option } from "./Option.mjs";

export class OptionsGroup {
    /**
     * @param {Array<Option>} options The options in the group
     * @param {String} label The label for the group
     */
    constructor(options = [], label = null) {
        this.options = options;
        this.label = label;
    }



    /**
     * Renders the options group as an HTML string
     * @returns {String} The HTML representation of the options group
     */
    render() {
        let optionsHTML = this.options.map(option => {
            return option.render();
        }).join('');

        return `<optgroup label="${this.label}">
            ${optionsHTML}
        </optgroup>`;
    }
}