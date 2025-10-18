import { Field } from "./Field.mjs";

export class FileField extends Field {
    /**
     * @param {String} params.accept The file types that are accepted
     * @param {Boolean} params.multiple Whether multiple files can be selected
     * @param {Number|null} params.min The minimum number of files that must be selected
     * @param {Number|null} params.max The maximum number of files that can be selected
     */
    constructor({
        accept = '',
        multiple = false,
        min = null,
        max = null,
        ...params
    }) {
        super(params);

        this.accept = accept;
        this.multiple = multiple;
        this.min = min;
        this.max = max;

        if (accept) this.attributes.accept = accept;
        if (multiple) this.attributes.multiple = 'multiple';
        if (min !== null) this.attributes['min'] = min;
        if (max !== null) this.attributes['max'] = max;

        this.valueType = multiple ? FileList : File;
        this.valueAttribute = 'files';
    }



    renderInput() {
        return `<input${this.value ? ` value="${this.value}"` : ''} type="file" id="${this.id}" name="${this.name}" class="field-input file-field" ${this.renderAttributes()}>`;
    }



    validate() {
        this.errors = [];



        let element = this.getInputDOMElement();

        if (element && !element.checkValidity()) {
            this.errors.push(element.validationMessage);
        }



        if (this.multiple) {
            if (this.min !== null && this.readValue()?.length < this.min) this.errors.push(`Please select at least ${this.min} files.`);
            if (this.max !== null && this.readValue()?.length > this.max) this.errors.push(`Please select no more than ${this.max} files.`);
        }



        return this.errors.length === 0;
    }
}