import { Field } from "./fields/Field.mjs";

export class Form {
    /**
     * @param {String} params.id The unique identifier for the form
     * @param {String} params.action The form action URL
     * @param {String} params.method The form submission method (e.g., 'POST', 'GET')
     * @param {Array<Field>} params.fields An array of Field instances that belong to this form
     * @param {Object} params.attributes Additional HTML attributes for the form element
     */
    constructor({
        id,
        action = '#',
        method = 'POST',
        fields = [],
        attributes = {}
    }) {
        if (document.getElementById(id)) throw new Error(`Element with id "${id}" already exists in the DOM.`);

        this.id = id;
        this.action = action;
        this.method = method;
        this.attributes = attributes;
        this.fields = [];
        for (let field of fields) {
            this.addField(field);
        }
    }



    /**
     * Add a field to the form
     * @param {Field} field The field to add
     */
    addField(field) {
        if (!this.fields.includes(field)) {
            this.fields.push(field);
        }

        if (field.form !== this) {
            field.form = this;
        }
    }



    /**
     * Remove a field from the form
     * @param {Field} field The field to remove
     */
    removeField(field) {
        this.fields = this.fields.filter(f => f !== field);

        if (field.form === this) {
            field.form = null;
        }
    }



    /**
     * Get the DOM element for the form
     * @returns {HTMLElement|null} The form DOM element or null if not found
     */
    getDOMElement() {
        return document.getElementById(this.id);
    }



    /**
     * Alias for getDOMElement()
     * @returns {HTMLElement|null} The form DOM element or null if not found
     */
    dom() {
        return this.getDOMElement();
    }



    /**
     * Get the string of HTML attributes for the form
     * @returns {String} The HTML attributes string
     */
    renderAttributes() {
        return Object.entries(this.attributes).map(([key, value]) => `${key}="${value}"`).join(' ');
    }



    /**
     * Validate the form and all its fields
     * @returns {Boolean} True if the form is valid, false otherwise
     */
    validate() {
        let isValid = true;

        this.fields.forEach(field => {
            if (!field.validate()) {
                isValid = false;
            }
        });

        return isValid;
    }



    /**
     * Validate the form and show errors for all its fields
     * @returns {Boolean} True if the form is valid, false otherwise
     */
    validateAndShow() {
        let isValid = true;

        this.fields.forEach(field => {
            if (!field.validateAndShow()) {
                isValid = false;
            }
        });

        return isValid;
    }



    /**
     * Render the form HTML
     * @returns {String} The HTML string of the form
     */
    render() {
        return `<form id="${this.id}" action="${this.action}" method="${this.method}" class="form" ${this.renderAttributes()}>${this.fields.map(field => field.render()).join('')}</form>`;
    }



    /**
     * Get the form HTML element
     * @returns {HTMLElement} The form HTML element
     */
    html() {
        let parser = new DOMParser();

        let doc = parser.parseFromString(this.render(), 'text/html');

        return doc.body.firstChild;
    }



    /**
     * Get values of all fields in the form
     * @returns {Object} An object containing the field names and their values
     */
    getValues() {
        let values = {};

        this.fields.forEach(field => {
            values[field.name] = field.readValue();
        });

        return values;
    }
}