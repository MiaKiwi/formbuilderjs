export class Option {
    /**
     * @param {*} value The value of the option
     * @param {String} label The display label for the option
     */
    constructor(value, label = null, attributes = {}) {
        this.value = value;
        this.label = label !== null ? label : String(value);
        this.attributes = attributes;
    }



    /**
     * Get the string of HTML attributes for the option
     * @returns {String} The HTML attributes for the option
     */
    renderAttributes() {
        return Object.entries(this.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
    }



    /**
     * Gets the string representation of the option
     * @returns {String} The label of the option
     */
    toString() {
        return this.label;
    }



    /**
     * Renders the option as an HTML string
     * @returns {String} The HTML representation of the option
     */
    render() {
        return `<option value="${this.value}" ${this.renderAttributes()}>${this.label}</option>`;
    }
}