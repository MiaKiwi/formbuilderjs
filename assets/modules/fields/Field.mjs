import { Form } from "../form.mjs";
import { Option } from "../options/Option.mjs";
import { FieldValidator } from "../validators/FieldValidator.mjs";

export class Field {
    /**
     * @param {String} params.id The unique identifier for the field
     * @param {String} params.name The name attribute for the field (defaults to id if not provided)
     * @param {String} params.label The label text for the field
     * @param {String} params.helper Helper text displayed below the field
     * @param {Object} params.attributes Additional HTML attributes for the input element
     * @param {Array<FieldValidator>} params.validators An array of validators for the field
     * @param {Array<Option>} params.datalist The datalist options for the field
     * @param {Form} params.form The form that this field belongs to
     */
    constructor({
        id,
        name = null,
        label = null,
        helper = null,
        attributes = {},
        validators = [],
        datalist = [],
        form = null
    }) {
        if (document.getElementById(id)) throw new Error(`Element with id "${id}" already exists in the DOM.`);

        this.id = id;
        this.name = name || id;
        this.label = label;
        this.helper = helper;
        this.attributes = attributes;
        this.validators = validators;
        this.datalist = datalist;
        this.form = form;

        this.errors = [];
        this.valueType = String;
        this.valueAttribute = 'value';

        if (this.datalist.length > 0) {
            this.attributes.list = `datalist-${this.id}`;
        }
    }



    /**
     * Add this field to a form
     * @param {Form} form The form to add this field to
     */
    addToForm(form) {
        form.addField(this);
    }



    /**
     * Remove this field from its form
     */
    removeFromForm() {
        if (this.form) {
            this.form.removeField(this);
        }
    }



    /**
     * Get the container element from the DOM for this field
     * @returns {HTMLElement|null} The container DOM element or null if not found
     */
    getContainerDOMElement() {
        return document.getElementById(`field-${this.id}-container`);
    }



    /**
     * Get the label element from the DOM for this field
     * @returns {HTMLElement|null} The label DOM element or null if not found
     */
    getLabelDOMElement() {
        return document.getElementById(`field-${this.id}-label`);
    }



    /**
     * Get the datalist element from the DOM for this field
     * @returns {HTMLElement|null} The datalist DOM element or null if not found
     */
    getDataListDOMElement() {
        return document.getElementById(`datalist-${this.id}`);
    }



    /**
     * Get the helper element from the DOM for this field
     * @returns {HTMLElement|null} The helper DOM element or null if not found
     */
    getHelperDOMElement() {
        return document.getElementById(`field-${this.id}-helper`);
    }



    /**
     * Get the errors element from the DOM for this field
     * @returns {HTMLElement|null} The errors DOM element or null if not found
     */
    getErrorsDOMElement() {
        return document.getElementById(`field-${this.id}-errors`);
    }



    /**
     * Get the input element from the DOM for this field
     * @returns {HTMLElement|null} The input DOM element or null if not found
     */
    getInputDOMElement() {
        return document.getElementById(this.id);
    }



    /**
     * Alias for getInputDOMElement()
     * @returns {HTMLElement|null} The input DOM element or null if not found
     */
    dom() {
        return this.getInputDOMElement();
    }



    /**
     * Cast the input value to the appropriate type
     * @param {*} value The value to cast
     * @returns {*} The casted value
     */
    cast(value) {
        switch (this.valueType) {
            case Boolean:
                return Boolean(value);

            case Number:
                return parseFloat(value);

            case Date:

                return new Date(value);
            case 'Option[]':
                value = Array.prototype.slice.call(value || []);
                return this.getOptionsRecursively().filter(opt => value.map(v => v.value).includes(opt.value));

            case Option:
                return this.getOptionsRecursively().find(opt => opt.value === value) || null;

            case FileList:
                return value.length > 0 ? value : null;

            case File:
                return value.length > 0 ? value[0] : null;


            case String:
            default:
                return String(value) || '';
        }
    }


    /**
     * Get the current value of the field
     * @returns {*} The current value of the field
     */
    readValue() {
        let value = this.getInputDOMElement() ? this.getInputDOMElement()[this.valueAttribute] : this.value;

        return this.cast(value);
    }



    /**
     * Get the attributes for the input element
     * @returns {String} A string of HTML attributes
     */
    renderAttributes() {
        return Object.entries(this.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
    }



    /**
     * Get the label HTML for the field
     * @returns {String} The label HTML for the field
     */
    renderLabel() {
        return this.label ? `<label id="field-${this.id}-label" for="${this.id}" class="field-label">${this.label}</label>` : '';
    }



    /**
     * Get the datalist HTML for the field
     * @returns {String} The datalist HTML for the field
     */
    renderDatalist() {
        if (this.datalist.length === 0) return '';

        let optionsHTML = this.datalist.map(option => {
            return option.render();
        }).join('');

        return `<datalist id="datalist-${this.id}">
            ${optionsHTML}
        </datalist>`;
    }



    /**
     * Get the helper text HTML for the field
     * @returns {String} The helper text HTML for the field
     */
    renderHelper() {
        return this.helper ? `<small id="field-${this.id}-helper" class="field-helper">${this.helper}</small>` : '';
    }



    /**
     * Get the errors list HTML for the field
     * @returns {String} The errors list HTML for the field
     */
    renderErrors() {
        return `<ul id="field-${this.id}-errors" class="field-errors">${this.errors.map(e => `<li class="field-error">${e}</li>`).join('')}</ul>`;
    }



    /**
     * Get the input HTML for the field
     * @returns {String} The input HTML for the field
     */
    renderInput() {
        throw new Error('renderInput() must be implemented in subclasses');
    }



    /**
     * Get the full HTML for the field
     * @returns {String} The full HTML for the field
     */
    render() {
        return `<div class="field" id="field-${this.id}">${this.renderLabel()}${this.renderInput()}${this.renderDatalist()}${this.renderHelper()}${this.renderErrors()}</div>`;
    }



    /**
     * Get the HTML element for the field
     * @returns {HTMLElement} The HTML element for the field
     */
    html() {
        let parser = new DOMParser();

        let doc = parser.parseFromString(this.render(), 'text/html');

        return doc.body.firstChild;
    }



    /**
     * Validate the current value of the field
     * @returns {Boolean} True if the field is valid, false otherwise
     */
    validate() {
        // Reset errors and validity
        this.errors = [];
        this.dom()?.setCustomValidity('');



        // Validate HTML5 constraints
        let element = this.getInputDOMElement();

        if (element && !element.checkValidity()) {
            this.errors.push(element.validationMessage);
        }


        // Run custom validators
        this.validators.forEach(validator => {
            validator.evaluate(this);
        });

        return this.errors.length === 0;
    }



    /**
     * Display the current errors in the DOM
     */
    showErrors() {
        let errorsElement = this.getErrorsDOMElement();

        let errorsHTML = this.renderErrors();

        if (errorsElement) {
            errorsElement.outerHTML = errorsHTML;
        } else {
            let container = this.getContainerDOMElement();
            container.insertAdjacentHTML('beforeend', errorsHTML);
        }
    }



    /**
     * Validate the field and update the DOM with any errors
     * @returns {Boolean} True if the field is valid, false otherwise
     */
    validateAndShow() {
        let isValid = this.validate();

        this.showErrors();

        return isValid;
    }



    /**
     * Update the label text in the DOM
     */
    updateLabel() {
        let labelElement = this.getLabelDOMElement();

        if (labelElement) {
            labelElement.textContent = this.label;
        }
    }



    /**
     * Update the helper text in the DOM
     */
    updateHelper() {
        let helperElement = this.getHelperDOMElement();

        if (helperElement) {
            helperElement.textContent = this.helper;
        }
    }
}